import service from 'api/staffManagementService'
import { Modal, message } from 'antd'
const confirm = Modal.confirm

class StaffManagementPM {
  staffInfoForm = null
  showConfirmModal = true
  constructor(props) {
    this.props = props
  }

  fetch() {
    this.props.getStaffList()
    this.props.getZoneList()
    this.props.getCityList()
    this.props.getAllOutletLists()
  }

  shouldComponentUpdate(nextProps) {
    this.props = nextProps
    return true
  }

  showEditPopup = record => {
    const roleType = record ? record.admin_role : null
    this.props.getStaffVisible(true, record)
    record && this.setCityOutletKeys(record.city_ids)
    this.props.setRoleType(roleType)
    this.getActiveOutletTab(record)
    this.props.updateSelectedZoneList(record ? record.zone_ids : [])
    this.props.updateSelectedOutletList(record ? record.apt_ids : [])
    this.showConfirmModal = true
    if (record) {
      this.props.getSelectedCitites(record.person_id)
    }
  }

  setCityOutletKeys = city_ids => {
    let zoneWiseCity = {}
    this.props.cityList
      .filter(elem => city_ids.some(id => id === elem.city_id))
      .forEach(cityOb => {
        if (!zoneWiseCity[cityOb.zone_id]) {
          zoneWiseCity[cityOb.zone_id] = []
        }
        zoneWiseCity[cityOb.zone_id].push(cityOb)
      })
    const keys = Object.entries(zoneWiseCity).map((ele, i) => {
      return {
        key: i + 1,
        zone_id: parseInt(ele[0]),
        city_ids: ele[1].map(e => e.city_id)
      }
    })
    keys.forEach(k => {
      this.props.onAddCityOutlet(this.props.totalCityOutlets, {
        zone_id: k.zone_id,
        city_ids: k.city_ids
      })
    })
  }

  validateEmailFromServer = (rule, value, callback) => {
    const isValidEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(
      value
    )
    if (isValidEmail) {
      service.getPersonByEmail(value).then(resp => {
        if (resp.isEmployee) {
          callback('An employee with this email is already exists')
        } else {
          callback()
        }
      })
    } else {
      callback('')
    }
  }

  getActiveOutletTab = record => {
    let activeOutletTab = 'zonewise-outlets'
    if (record) {
      if (record.zone_ids.length) {
        activeOutletTab = 'zonewise-outlets'
        this.props.updateSelectedOutletList([])
      } else if (record.city_ids.length) {
        activeOutletTab = 'citywise-outlets'
        this.props.updateSelectedOutletList([])
      } else if (record.apt_ids.length) {
        activeOutletTab = 'all-outlets'
      }
    } else {
      activeOutletTab = 'zonewise-outlets'
    }
    this.props.updateActiveOutletTab(activeOutletTab)
  }

  showDeleteConfirm = (that, activeOutletTab) => {
    confirm({
      title: 'If you click on Ok then data from other tabs will be deleted!',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk() {
        that.showConfirmModal = false
        that.onOutletTabChange(activeOutletTab)
      }
    })
  }

  onOutletTabChange = activeOutletTab => {
    const { selectedZonelist, selectedOutletlist, keys } = this.props
    if (
      (selectedOutletlist.length || selectedZonelist.length) &&
      this.showConfirmModal
    ) {
      this.showDeleteConfirm(this, activeOutletTab)
    } else {
      switch (activeOutletTab) {
        case 'zonewise-outlets':
          selectedOutletlist.length && this.props.updateSelectedOutletList([])
          keys.length && this.props.updateKeys([])
          break
        case 'citywise-outlets':
          selectedOutletlist.length && this.props.updateSelectedOutletList([])
          selectedZonelist.length && this.props.updateSelectedZoneList([])
          break
        case 'all-outlets':
          selectedZonelist.length && this.props.updateSelectedZoneList([])
          keys.length && this.props.updateKeys([])
          break
        default:
      }
      this.props.updateActiveOutletTab(activeOutletTab)
    }
  }

  onStaffTabChange = activeStaffTab => {
    this.props.updateActiveStaffTab(activeStaffTab)
  }

  onStaffModalCancel = form => {
    this.props.setRoleType(null)
    form.resetFields()
    this.props.updateActiveOutletTab('zonewise-outlets')
    this.props.getStaffVisible(false, null)
    this.props.updateActiveStaffTab('staff-information')
    this.props.updateKeys([])
  }

  onVerifyModalToggle = async (record, form) => {
    if (record) {
      const data = {
        requestId: record.staff_id,
        token: record.token
      }
      const response = await service.askAuthForVerification(data)
      if (response && response.data && response.data.first_name) {
        this.props.toogleVerifyInvitation(response.data)
      } else {
        message.error(response.msg)
      }
    } else {
      form.resetFields()
      this.props.toogleVerifyInvitation(null)
    }
  }

  confirmForDeleteStaffInvitation = async record => {
    const data = {
      id: record.staff_id
    }
    try {
      const response = await service.removeInvitation(data)
      if (response.success) {
        message.success('Staff Invitation has been deleted', 3)
        document.getElementById('input-search').value = ''
        this.fetch()
      } else message.error('Error!', 3)
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  confirmForDeleteStaff = async ({ person_id }) => {
    try {
      const response = await service.deleteStaff(person_id)
      if (response.success) {
        message.success('Staff has been deleted.', 3)
        document.getElementById('input-search').value = ''
        this.fetch()
      } else message.error('Error!', 3)
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  onRoleChange = (e, form) => {
    this.staffInfoForm = form
    this.props.setRoleType(e.target.value)
    this.staffInfoForm.setFieldsValue({
      role: e.target.value
    })
  }

  zoneOrOutletListChange = (type, selectedRowKeys) => {
    if (type === 'zone') {
      this.props.updateSelectedZoneList(selectedRowKeys)
    } else {
      this.props.updateSelectedOutletList(selectedRowKeys)
    }
  }

  onCityOutletChange = (rowKey, cityId) => {
    const newList = this.props.keys.filter(keyObj => keyObj.key === rowKey)[0]
      .city_ids
    if (!newList.includes(cityId)) {
      newList.push(cityId)
    }
    this.props.updateCityList(rowKey, newList)
  }

  onDeselect = (rowKey, cityId) => {
    let newList = this.props.keys.filter(keyObj => keyObj.key === rowKey)[0]
      .city_ids
    newList = newList.filter(cId => cId !== cityId)
    this.props.updateCityList(rowKey, newList)
  }

  onAddStaff = (e, form) => {
    const { selectedZonelist, selectedOutletlist, record } = this.props
    let apt_ids = selectedOutletlist
    let zone_ids = selectedZonelist
    const city_ids = this.props.keys.reduce((acc, k1) => {
      return acc.concat(k1.city_ids || [])
    }, [])
    if (city_ids.length) {
      apt_ids = []
      zone_ids = []
    }
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const data = {
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          country_code: values.country_code,
          phone: values.phone,
          role: values.role,
          apt_ids,
          zone_ids,
          city_ids
        }
        try {
          const response = !record
            ? await service.addEmployee(data)
            : await service.addStaff(data, record)
          if (response.community_id) {
            message.success('Staff has been updated.', 3)
            this.onReset(form)
          } else if (response.data.community_id) {
            message.success('Staff added successfully.', 3)
            this.onReset(form)
          }
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }

  onReset = form => {
    document.getElementById('input-search').value = ''
    this.props.updateKeys([])
    this.fetch()
    form.resetFields()
    this.props.getStaffVisible(false, null)
    this.props.updateActiveOutletTab('zonewise-outlets')
    this.props.setRoleType(null)
    this.props.updateActiveStaffTab('staff-information')
  }

  validatePasswordLength = (rule, value, callback) => {
    if (value && value.trim().length >= 4) {
      callback()
    } else {
      callback('Password must be at least 4 characters long')
    }
  }

  validateToNextPassword = (rule, value, callback, form) => {
    if (value) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  compareToFirstPassword = (rule, value, callback, form) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  onHandleVerifySubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const {
          verifyInvitation: {
            dept_ids,
            first_name,
            last_name,
            phone,
            admin_role,
            country_code,
            staff_id,
            email
          }
        } = this.props
        const data = {
          email,
          password: values.password,
          confirm_password: values.confirm_password,
          dept_ids,
          country_code,
          first_name,
          last_name,
          phone,
          role: admin_role,
          request_id: staff_id
        }
        try {
          const response = await service.staffVerification(data)
          if (response.success) {
            message.success('Succcessfully verified.')
            document.getElementById('input-search').value = ''
            this.fetch()
          } else {
            message.error('VERIFICATION FAILED')
          }
        } catch (err) {
          message.error('VERIFICATION FAILED')
        }
        form.resetFields()
        this.props.toogleVerifyInvitation(null)
      }
    })
  }

  resendVerificationLink = async record => {
    const data = {
      id: record.staff_id,
      email: record.email
    }
    try {
      const response = await service.resendVerificationLink(data)
      if (response.success) {
        message.success(response.message)
      } else {
        message.error('Resend mail failed')
      }
    } catch (err) {
      message.error('Resend mail failed')
    }
  }

  removeItem = index => {
    this.props.onRemoveCityOutlet(index)
  }

  onZoneListChange = (rowKey, zoneId) => {
    this.props.onChangeZone(rowKey, zoneId)
  }
}

export default StaffManagementPM
