import React from 'react'
import { Modal, Tabs, Form, Button } from 'antd'
import StaffInformation from './StaffInformation'
import AssignOutlet from './AssignOutlet'
import './Modal.scss'

const TabPane = Tabs.TabPane

const StaffModal = props => {
  const { roleType, form, activeStaffTab } = props
  const isAssignOutletDisabled = roleType === 'master' || roleType === 'manager'
  return (
    <React.Fragment>
      {props.visible && (
        <Modal
          className="staff-modal"
          title={props.record ? 'Edit Staff' : 'Add Staff'}
          visible={props.visible}
          width={750}
          onCancel={() => props.pm.onStaffModalCancel(form)}
          footer={[
            <Button
              key="back"
              onClick={() => props.pm.onStaffModalCancel(form)}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={e => props.pm.onAddStaff(e, form)}
            >
              Submit
            </Button>
          ]}
        >
          <div>
            <Tabs
              activeKey={activeStaffTab}
              onChange={props.pm.onStaffTabChange}
            >
              <TabPane tab="Staff Information" key="staff-information">
                <Form
                  layout="vertical"
                  className="Staff-Container"
                  onSubmit={e => props.pm.onAddStaff(e, form)}
                >
                  <StaffInformation {...props} />
                </Form>
              </TabPane>
              <TabPane
                tab="Assign Outlet"
                key="assign-outlet"
                disabled={isAssignOutletDisabled}
              >
                <AssignOutlet {...props} />
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      )}
    </React.Fragment>
  )
}

export default Form.create()(StaffModal)
