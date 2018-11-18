class WhatsNewPM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getReleaseNoteList()
  }
}
export default WhatsNewPM
