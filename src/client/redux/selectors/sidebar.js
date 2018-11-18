export const activeKeys = (props, contents) => {
  const currentRoute = props.location.pathname.split('/')[1]
  let curretActiveKey = []
  const recursiveGetKey = dataSource => {
    dataSource.forEach(data => {
      if (data.route === currentRoute) {
        curretActiveKey = [data.key]
      }
      if (data.children) {
        recursiveGetKey(data.children)
      }
    })
    return curretActiveKey
  }

  return recursiveGetKey(contents)
}
