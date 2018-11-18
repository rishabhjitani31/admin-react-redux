import React from 'react'
import { Input } from 'antd'

class NumericInput extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  onChange = e => {
    const { value } = e.target
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
    // const reg = /^(?:(?:\+|0{0,2})9(\s*[\ -]\s*)?|[0]?)?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value)
    }
  }

  formatNumber = value => {
    value += ''
    const list = value.split('.')
    const prefix = list[0].charAt(0) === '-' ? '-' : ''
    let num = prefix ? list[0].slice(1) : list[0]
    let result = ''
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`
      num = num.slice(0, num.length - 3)
    }
    if (num) {
      result = num + result
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
  }

  render() {
    // const { value } = this.props
    // const title = value ? (
    //   <span className="numeric-input-title">
    //     {value !== '-' ? this.formatNumber(value) : '-'}
    //   </span>
    // ) : (
    //   'Input a number'
    // )
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        placeholder={this.props.placeholder || ''}
        maxLength={this.props.maxLength || '10'}
      />
    )
  }
}

export default NumericInput
