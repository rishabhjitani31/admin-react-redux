import { message } from 'antd'
import service from 'api/profileService'
import { getLocalStorageData, setLocalStorageData } from 'utils/localStorage'

class ProfilePM {
  constructor(props) {
    this.props = props
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await service.saveAdminProfile(values)
          message.success('Profile edited successfully', 3)
          const commonData = getLocalStorageData([])
          setLocalStorageData({ ...commonData, ...values })
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
}
export default ProfilePM
