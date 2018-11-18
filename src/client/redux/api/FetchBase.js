/* globals Headers */
// import { isNotLoggedIn, hasError } from './HttpResponse'
import { defaults, omit, toPairs, isEmpty } from 'lodash'

class FetchBase {
  defaultHeaders() {
    return {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  constructor() {
    this.apiFactory().forEach(this.createApi)
  }

  /**
   * @returns {{}}
   */
  targets() {
    return {}
  }

  /**
   * Parses all apis with default processable values
   */
  apiFactory() {
    const targets = this.targets()
    return Object.keys(targets).map(key => {
      const target = {
        request: key,
        method: 'get',
        args: [],
        headers: {},
        mode: 'cors'
      }
      const value = targets[key]
      // if is string, the options should only be a method type such as 'POST'
      if (value && typeof value === 'string') {
        target.method = value.toUpperCase()
      }
      // if is an array, assumed to be an array of required arguments names
      if (Array.isArray(value)) {
        target.args = value
      }
      // if is a json object, just extend the target object with new values
      if (Object.prototype.toString.call(value)) {
        Object.assign(target, value)
      }
      target.method = target.method.toUpperCase()
      return target
    })
  }

  /**
   * @param target
   */
  createApi = target => {
    this[target.request] = (...args) => {
      const url = this.getUrl(target, args)
      const options = this.getOptions(target, args)
      return this.callApi(url, options)
    }
  }

  /**
   * @param url
   * @param opts
   * @returns {*}
   */
  rest(url, opts) {
    opts = defaults(opts, {
      method: 'GET',
      data: {}
    })

    let query = ''
    let suffix = ''

    if (opts.method === 'GET') {
      query = `?${this.serialize(opts.data)}`
      suffix = query === '?' ? '' : query
    }

    const fullUrl = `${this.url}/${url}${suffix}`
    const options = this.getOptions(opts)
    return this.callApi(fullUrl, options)
  }

  /**
   * @param url
   * @param opts
   * @returns {*}
   */
  post(url, opts, withQuery = false, noPayload = false) {
    opts = defaults(opts, {
      method: 'POST',
      data: {}
    })

    let fullUrl = `${this.url}/${url}`
    // api has a post that needs to serialise its data ....
    if (withQuery) {
      const query = `?${this.serialize(opts.data)}`
      const suffix = query === '?' ? '' : query
      fullUrl += suffix
      if (noPayload) delete opts.data
    }

    const options = this.getOptions(opts, {})
    return this.callApi(fullUrl, options)
  }

  /**
   * @param url
   * @param options
   * @returns {Promise}
   */
  callApi(url, options) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(resp => {
          return this.parseJson(resp)
        })
        .then(json => {
          if (!Number.isInteger(json) && !json) {
            // false in the response is valid response so don't reject
            if (json === false) {
              resolve(json)
            }
            reject(json)
          }
          resolve(json)
        })
        .catch(er => reject(er))
    })
  }

  /**
   * @param {*} resp
   */
  parseJson(resp) {
    return resp.text().then(text => {
      return text ? JSON.parse(text) : {}
    })
  }

  /**
   * @param target
   * @param args
   * @returns {string}
   */
  getUrl(target, args) {
    let url = `${this.url}/${target.request}`
    // if we're using get method, we should
    // build a query string of params to append
    // to the requests url
    if (target.method === 'GET' || target.method === 'DELETE') {
      const params = this.getParams(target, args)
      const query = `?${this.serialize(params)}`
      url += query === '?' ? '' : query
    }
    // otherwise just return the url
    return url
  }

  /**
   * @param target
   * @returns {{headers: (*|Headers)}}
   */
  getOptions(target, args) {
    const headers = defaults(target.headers, this.defaultHeaders())
    const options = {
      ...omit(target, 'args', 'request'),
      headers: this.headers(headers),
      credentials: 'same-origin',
      // credentials: 'include',
      secure: true
    }
    // if this is a post request, add form encoded
    // data to the body property of the request
    if (
      target.method === 'POST' ||
      target.method === 'PUT' ||
      target.method === 'DELETE'
    ) {
      if (target.data) {
        // temp fix to skip serialize and send JSON
        options.body = JSON.stringify(target.data)
        delete target.data
      } else {
        const formData = this.getParams(target, args)
        options.body = this.serialize(formData)
      }
    }
    return options
  }

  /**
   * Returns a resolved params object, with all required parameters added
   * @param target
   * @param data
   */
  getParams(target, data) {
    const params = {}
    // iterate through each argument
    ;[].concat(target.args).forEach((arg, index) => {
      // if it's a string, it's an expected arg, so take it from the data array
      if (typeof arg === 'string') {
        params[arg] = data[index]
        // if it's an object, it's either been set with a default
        // value, is optional if no default is specified, or an implicit
        // value.  Should set the default/implicit, before applying user value
      } else if (typeof arg === 'object') {
        const keyValue = toPairs(arg)[0]

        // implicit - as denoted by the 'attr' property

        // the argument value is an 'attr' type object, which denotes an implicit value.
        if (typeof keyValue[1] === 'function') {
          // get and set the implicit value
          params[keyValue[0]] = keyValue[1]()
        } else {
          // default - add default before overwriting with user value
          if (!isEmpty(keyValue[1])) {
            params[keyValue[0]] = keyValue[1]
          }
          // user - overwrite with user value
          if (data.length >= index) {
            const val = data[index]
            if (typeof val === 'string' && !!val.length) {
              params[keyValue[0]] = val
            } else if (typeof val === 'number' && !isNaN(val)) {
              params[keyValue[0]] = val
            } else if (typeof val === 'boolean') {
              params[keyValue[0]] = val
            }
          }
        }
      }
    })
    return params
  }

  /**
   * @param params
   * @returns {string}
   */
  serialize(params) {
    const esc = encodeURIComponent
    return Object.keys(params)
      .map(k => `${esc(k)}=${esc(params[k])}`)
      .join('&')
  }

  /**
   * @param hdrs
   * @returns {*|Headers}
   */
  headers(hdrs) {
    const headers = new Headers()
    Object.keys(hdrs).forEach(h => {
      if (hdrs[h]) {
        headers.append(h, hdrs[h])
      }
    })
    return headers
  }
}

export default FetchBase
