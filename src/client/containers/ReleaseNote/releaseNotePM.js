import { message } from 'antd'
import service from 'api/releaseNoteService'

class ReleaseNotePM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getReleaseNoteList()
  }
  shouldComponentUpdate(props) {
    this.props = props
    return true
  }
  onAddEditModal = (type, record) => {
    if (record) {
      this.props.setReleaseNoteDescription(record.details)
    }
    this.props.getReleaseNoteVisible(true, record)
  }
  handleModalCancel = (e, form) => {
    this.props.getReleaseNoteVisible(false, null)
    this.props.setReleaseNoteDescription(null)
  }
  handleSubmit = (e, form) => {
    let data = {}
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        if (!this.props.record) {
          data = Object.assign({ details: this.props.description }, values)
        } else {
          data = Object.assign(
            { details: this.props.description, id: this.props.record.id },
            values
          )
        }

        service
          .releaseNoteAdd(data)
          .then(resp => {
            form.resetFields()
            if (this.props.record) {
              message.success('Release note Edited Successfully')
            } else {
              message.success('Release note Added Successfully')
            }
            this.props.getReleaseNoteList()
            this.props.getReleaseNoteVisible(false, null)
          })
          .catch(err => message.error('Failed to add release note'))

        this.props.setReleaseNoteDescription(null)
      }
    })
  }
  onChange = event => {
    let description = event.editor.getData()
    this.props.setReleaseNoteDescription(description)
  }
}
export default ReleaseNotePM
