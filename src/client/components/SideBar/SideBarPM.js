class SideBarPM {
  constructor(props) {
    this.props = props
  }

  onCollapse = collapsed => {
    this.props.onCollapse(collapsed)
  }

  fetch() {
    this.props.getChatRooms(true)
    this.props.getOutletGroup()
  }
}
export default SideBarPM
