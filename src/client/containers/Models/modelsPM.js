// import React from 'react'
import service from 'api/modelService'
import { message } from 'antd'
// import { Redirect } from 'react-router'

class ModelsPM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getModelList()
    this.props.getEquipmentsList()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showModal = record => {
    this.props.getModalVisible(true, record)

    if (record) {
      this.props.getBrandsList(record.eq_id)
    }
  }

  hideModal = () => {
    this.props.form.resetFields()
    this.props.getModalVisible(false, null, true)
  }

  modelAddUpdate = record => {
    this.props.form.validateFields(async (error, value) => {
      if (!error) {
        try {
          if (!record) {
            await service.addEquipmentModel(value)
            message.success('Model Added  Successfully', 3)
          } else {
            await service.editEquipmentModel(record, value)
            message.success('Model Edited Successfully', 3)
          }
          this.hideModal()
          this.fetch()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }

  deleteModel = async record => {
    const data = {
      model_id: record.model_id
    }
    try {
      await service.modelDelete(data)
      message.success('Model Deleted  Successfully', 3)
      this.fetch()
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  onselectEquipment = (value, form) => {
    form.resetFields('brand_id')
    this.props.getBrandsList(value)
    this.props.handleSelectEquipmentChange(value)
  }
  handleSelectBrandChange = value => {
    this.props.handleSelectBrandChange(value)
  }
  handleSelectModelChange = value => {
    this.props.handleSelectModelChange(value)
  }
}
export default ModelsPM
