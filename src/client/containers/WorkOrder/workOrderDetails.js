import React from 'react'
import {
  Card,
  Row,
  Col,
  Icon,
  Select,
  Input,
  Steps,
  Button,
  Popconfirm,
  Upload,
  Spin
} from 'antd'
import {
  getEditCondition,
  checkHigherRole,
  getEditCondition2
} from 'selectors/workOrder'
import ManualsModal from './Modal/manualsModal'
import ReportModal from './Modal/reportModal'
const Option = Select.Option
const Step = Steps.Step
const WorkOrderDetails = props => {
  const antIcon = <Icon type="loading" spin />
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  const IssuesData = props.issuesList
    ? props.issuesList.map(({ title, id }) => (
        <Option value={id} key={id}>
          {title}
        </Option>
      ))
    : []
  const CustomerData = props.customerlist
    ? props.customerlist.map(({ customer_id, customer_name }) => (
        <Option value={customer_id} key={customer_id}>
          {customer_name}
        </Option>
      ))
    : []
  const OutletData = props.outletList
    ? props.outletList.map(item => {
        return (
          <Option key={item.apt_id} value={item.apt_id}>
            {item.apt_name}
          </Option>
        )
      })
    : []
  const StaffData = props.staffList
    ? props.staffList.map((item, i) => {
        return (
          <Option key={i} value={item.staff_id}>
            {item.first_name} {item.last_name || null} ({item.user_role})
          </Option>
        )
      })
    : []
  const EquipmentsData = props.equipmentsList
    ? props.equipmentsList.map(({ eq_id, eq_name }) => (
        <Option value={eq_id} key={eq_id}>
          {eq_name}
        </Option>
      ))
    : []
  const BrandsData = props.brandsList
    ? props.brandsList.map(({ brand_id, brand_name }) => (
        <Option value={brand_id} key={brand_id}>
          {brand_name}
        </Option>
      ))
    : []
  const ModelsData = props.modelsList
    ? props.modelsList.map(({ model_id, model_name }) => (
        <Option value={model_id} key={model_id}>
          {model_name}
        </Option>
      ))
    : []
  const SerialNosData = props.srnosList
    ? props.srnosList.map(({ sr_no }) => (
        <Option value={sr_no} key={sr_no}>
          {sr_no}
        </Option>
      ))
    : []
  const editCondition = getEditCondition(
    props.orderDetail.assignee_id,
    props.orderDetail.status
  )
  const editCondition2 = getEditCondition2(props.orderDetail.assignee_id)
  const higherRole = checkHigherRole()
  const call =
    props.orderDetail.assignee_phone &&
    props.orderDetail.assignee_phone !== 'null'
      ? (props.orderDetail.assignee_country_code || '') +
        props.orderDetail.assignee_phone
      : '--'
  const callTo = 'skype:' + call
  const steps = [
    {
      title: 'Pending'
    },
    {
      title: 'In Progress'
    },
    {
      title: 'Completed'
    },
    {
      title: 'Verified'
    }
  ]
  const rows = (
    selectTitle,
    updateFieldsValue,
    newId,
    selectData,
    update,
    updateFlag,
    newInput,
    inputTitle
  ) => {
    return (
      <Row className="bottom-margin">
        <Col span={1} />
        <Col span={10}>
          <Select
            showSearch
            placeholder={selectTitle}
            optionFilterProp="children"
            size="small"
            className="input-select-width"
            onChange={e => updateFieldsValue(false, false, e)}
            value={newId}
          >
            {selectData}
          </Select>
        </Col>
        {inputTitle && <Col span={1}>or</Col>}
        {inputTitle && (
          <Col span={10}>
            <Input
              size="small"
              value={newInput}
              placeholder={inputTitle}
              onChange={e => updateFieldsValue(false, true, e.target.value)}
              className="input-select-width"
            />
          </Col>
        )}
        <Col span={1}>
          <strong className="strong">
            <Icon
              className="i"
              type="check"
              onClick={() => update(props.orderDetail)}
            />
          </strong>
        </Col>
        <Col span={1}>
          <strong className="strong">
            <Icon
              className="i"
              type="close"
              onClick={() => updateFlag(false)}
            />
          </strong>
        </Col>
      </Row>
    )
  }
  return (
    <Spin indicator={antIcon} spinning={props.isOrderFetching}>
      <div className="work-order-details">
        <Card className="bottom-margin">
          <Row className="bottom-border">
            <Col span={10} className="right-border left-padding">
              <h4>
                Issue No.:{' '}
                <strong className="strong">{props.orderDetail.issue_id}</strong>
              </h4>
            </Col>
            <Col span={14} className="left-padding">
              <h4>
                Issue Created By:{' '}
                <strong className="strong">
                  {props.orderDetail.staff_id ? 'Equinox' : 'Guest'}
                </strong>
              </h4>
            </Col>
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Issue title:{' '}
                  <strong className="strong">
                    {props.orderDetail.title &&
                    props.orderDetail.title != 'null'
                      ? props.orderDetail.title
                      : '--'}
                  </strong>
                </h4>
              </Col>
              {!props.changeTitle && editCondition ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateTitle}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeTitle &&
              rows(
                'Select Title',
                props.updateTitleFieldsValue,
                props.newTitleId,
                IssuesData,
                props.pm.updateTitle,
                props.updateChangeTitleFlag,
                props.newTitle,
                'Enter new Issue Title'
              )}
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Customer:{' '}
                  <strong className="strong">
                    {props.orderDetail.customer_name &&
                    props.orderDetail.customer_name != 'null'
                      ? props.orderDetail.customer_name
                      : '--'}
                  </strong>
                </h4>
              </Col>
              {!props.changeCustomer &&
              editCondition &&
              !props.orderDetail.customer_name ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateCustomer}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeCustomer &&
              rows(
                'Select Customer',
                props.updateCustomerFieldsValue,
                props.newCustomerId,
                CustomerData,
                props.pm.updateCustomer,
                props.updateChangeCustomerFlag
              )}
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Outlet Name:{' '}
                  <strong className="strong">
                    {props.orderDetail.apt_name &&
                    props.orderDetail.apt_name != 'null'
                      ? props.orderDetail.apt_name
                      : '--'}
                  </strong>
                </h4>
              </Col>
              {!props.changeOutlet &&
              editCondition &&
              !props.orderDetail.apt_name ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateOutlet}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeOutlet &&
              rows(
                'Select Outlet',
                props.updateOutletFieldsValue,
                props.newOutletId,
                OutletData,
                props.pm.updateOutlet,
                props.updateChangeOutletFlag
              )}
          </Row>
          <Row className="bottom-border left-padding">
            <h4>
              In Warranty:{' '}
              <strong className="strong">
                {props.orderDetail.isWarrenty == 'true' ? (
                  <span className="Active-Cell Active-yes">Yes</span>
                ) : props.orderDetail.isWarrenty == 'false' ? (
                  <span className="Active-Cell Active-no">No</span>
                ) : (
                  <span>--</span>
                )}
              </strong>
            </h4>
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Equipment:{' '}
                  <strong className="strong">
                    {props.orderDetail.eq_name &&
                    props.orderDetail.eq_name != 'null'
                      ? props.orderDetail.eq_name
                      : props.orderDetail.custom_eq_name &&
                        props.orderDetail.custom_eq_name != 'null'
                        ? props.orderDetail.custom_eq_name
                        : '--'}
                  </strong>
                </h4>
              </Col>
              {!props.changeEquipment && editCondition ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateEquipment}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeEquipment &&
              rows(
                'Select Equipment',
                props.updateEquipmentFieldsValue,
                props.newEquipmentId,
                EquipmentsData,
                props.pm.updateEquipment,
                props.updateChangeEquipmentFlag,
                props.newEquipment,
                'Enter new Equipment'
              )}
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Brand:{' '}
                  <strong className="strong">
                    {props.orderDetail.brand_name &&
                    props.orderDetail.brand_name != 'null'
                      ? props.orderDetail.brand_name
                      : props.orderDetail.custom_brand_name &&
                        props.orderDetail.custom_brand_name != 'null'
                        ? props.orderDetail.custom_brand_name
                        : '--'}
                  </strong>
                </h4>
              </Col>
              {!props.changeBrand && editCondition ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateBrand}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeBrand &&
              rows(
                'Select Brand',
                props.updateBrandFieldsValue,
                props.newBrandId,
                BrandsData,
                props.pm.updateBrand,
                props.updateChangeBrandFlag,
                props.newBrand,
                'Enter new Brand'
              )}
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Model:{' '}
                  <strong className="strong">
                    {props.orderDetail.model_name &&
                    props.orderDetail.model_name != 'null'
                      ? props.orderDetail.model_name
                      : props.orderDetail.custom_model_name &&
                        props.orderDetail.custom_model_name != 'null'
                        ? props.orderDetail.custom_model_name
                        : '--'}
                  </strong>
                </h4>
              </Col>
              {!props.changeModel && editCondition ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateModel}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeModel &&
              rows(
                'Select Model',
                props.updateModelFieldsValue,
                props.newModelId,
                ModelsData,
                props.pm.updateModel,
                props.updateChangeModelFlag,
                props.newModel,
                'Enter new Model'
              )}
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Serial No:{' '}
                  <strong className="strong">
                    {props.orderDetail.sr_no &&
                    props.orderDetail.sr_no != 'null'
                      ? props.orderDetail.sr_no
                      : props.orderDetail.custom_sr_no &&
                        props.orderDetail.custom_sr_no != 'null'
                        ? props.orderDetail.custom_sr_no
                        : '--'}
                  </strong>
                </h4>
              </Col>
              {!props.changeSrno && editCondition ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateSrno}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeSrno &&
              rows(
                'Select Serial No',
                props.updateSrnoFieldsValue,
                props.newSrnoId,
                SerialNosData,
                props.pm.updateSrno,
                props.updateChangeSrnoFlag,
                props.newSrno,
                'Enter new Serial No'
              )}
          </Row>
          {higherRole && (
            <Row className="bottom-border left-padding">
              <h4>
                OTP:{' '}
                <strong className="strong">
                  {props.orderDetail.verify_otp || '--'}
                </strong>
              </h4>
            </Row>
          )}
          <Row className="bottom-border left-padding">
            <h4>
              Issue description:{' '}
              {props.orderDetail.description ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.orderDetail.description
                  }}
                />
              ) : (
                '--'
              )}
            </h4>
          </Row>
          <Row className="bottom-border">
            <Row>
              <Col span={21} className="left-padding">
                <h4>
                  Assignee:{' '}
                  <strong className="strong">
                    {(props.orderDetail.assignee_first_name || '--') +
                      ' ' +
                      (props.orderDetail.assignee_last_name || '')}
                  </strong>
                </h4>
              </Col>
              {!props.changeAssignee &&
              higherRole &&
              props.orderDetail.status === 1 ? (
                <Col span={3}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={props.pm.handleUpdateAssignee}
                    />
                  </strong>
                </Col>
              ) : null}
            </Row>
            {props.changeAssignee &&
              rows(
                'Select Assignee',
                props.updateAssigneeFieldsValue,
                props.newAssigneeId,
                StaffData,
                props.pm.updateAssignee,
                props.updateChangeAssigneeFlag
              )}
          </Row>
          <Row className="bottom-border left-padding">
            <h4>
              Assignee Phone#:{' '}
              <strong className="strong">
                {props.orderDetail.assignee_phone &&
                props.orderDetail.assignee_phone !== 'null' ? (
                  <a href={callTo}>
                    <Icon type="phone" />
                    <u>{call}</u>
                  </a>
                ) : (
                  '--'
                )}
              </strong>
            </h4>
          </Row>
          <Row className="bottom-border left-padding">
            <h4>
              {props.orderDetail.manual_url &&
              props.orderDetail.manual_url.length > 0 ? (
                <a
                  style={{ color: 'purple' }}
                  onClick={() => props.getManualsModalVisible(true)}
                >
                  <Icon type="file-markdown" /> View Manuals
                </a>
              ) : (
                'No Manual'
              )}
            </h4>
          </Row>
          <ManualsModal {...props} />
          {props.orderDetail.report_attachment && editCondition2 ? (
            <Row className="bottom-border left-padding">
              <Col span={22}>
                <h4>
                  <a
                    style={{ color: 'red' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={props.orderDetail.report_attachment}
                  >
                    <Icon type="download" /> Download Report
                  </a>
                </h4>
              </Col>
              {props.orderDetail.status !== 5 && (
                <Col span={2}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="edit"
                      onClick={() => {
                        props.pm.editReportForm(props.orderDetail.ticket_id)
                      }}
                    />
                  </strong>
                </Col>
              )}
            </Row>
          ) : !props.orderDetail.report_attachment &&
          editCondition2 &&
          props.orderDetail.status === 4 ? (
            <Row className="bottom-border left-padding">
              <Col span={22}>
                <h4>Create Report:</h4>
              </Col>
              {props.orderDetail.status !== 5 && (
                <Col span={2}>
                  <strong className="strong">
                    <Icon
                      className="i"
                      type="plus-circle-o"
                      onClick={() => {
                        props.showReportForm(true, props.orderDetail)
                      }}
                    />
                  </strong>
                </Col>
              )}
            </Row>
          ) : null}
          <ReportModal {...props} />
          <Row className="steps-margin">
            <Steps
              current={
                props.orderDetail.status === 1
                  ? 0
                  : props.orderDetail.status === 3
                    ? 1
                    : props.orderDetail.status === 4
                      ? 2
                      : props.orderDetail.status === 5 ? 3 : null
              }
            >
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
          </Row>
        </Card>
        <Spin indicator={antIcon} spinning={props.uploading}>
          <Upload
            accept="image/*"
            action=""
            listType="picture-card"
            fileList={props.fileList}
            onChange={props.pm.handleUpload}
            onRemove={props.pm.handleRemove}
            disabled={props.uploading}
          >
            {props.fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </Spin>
        {editCondition2 &&
          props.orderDetail.customer_name &&
          props.orderDetail.apt_name && (
            <div className="status-button">
              {props.orderDetail.status === 1 ? (
                <Button
                  className="start-work"
                  type="primary"
                  onClick={e =>
                    props.pm.handleTicketActions(e, props.orderDetail, 1)
                  }
                >
                  Start Work
                </Button>
              ) : props.orderDetail.status === 3 ? (
                <Button
                  className="stop-work"
                  type="primary"
                  onClick={e =>
                    props.pm.handleTicketActions(e, props.orderDetail, 3)
                  }
                >
                  Stop Work
                </Button>
              ) : null}
              {props.orderDetail.status === 4 ? (
                <Button
                  className="verify-work"
                  type="primary"
                  onClick={e =>
                    props.pm.handleTicketActions(e, props.orderDetail, 4)
                  }
                >
                  Verify Work
                </Button>
              ) : props.orderDetail.status === 5 ? null : (
                <Popconfirm
                  title={'Are you sure you want to complete this work?'}
                  onConfirm={e =>
                    props.pm.handleTicketActions(e, props.orderDetail, 5)
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" className="complete-work">
                    Work Completed
                  </Button>
                </Popconfirm>
              )}
            </div>
          )}
      </div>
    </Spin>
  )
}
export default WorkOrderDetails
