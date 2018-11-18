import React from 'react'
import presenter from 'hoc/presenter'
import EscalationFlowPM from './escalationFlowPM'
import ContainerHeader from 'components/ContainerHeader'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import { Button, Tooltip, Form } from 'antd'
import * as escalationFlowActions from 'actions/escalationFlow'
import * as staffActions from 'actions/staffManagement'
import columns from './columns'
import AddEditModal from './addEditModal'
import { mappedEsclationFlow } from 'selectors/esclationFlow'
import './escalationFlow.scss'

const EscalationFlow = props => {
  return (
    <div className="escalation-flow-main">
      <ContainerHeader
        title="Escalation Flow"
        extra={
          <Tooltip placement="bottom" title="Add new Escalation">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.pm.showModal(null)}
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <AddEditModal {...props} />
        <TableContainer
          filterByFields={['full_name', 'email', 'hours']}
          tableProps={{
            dataSource: props.escalationFlowlist,
            columns: columns(props.pm),
            rowKey: record => record.s_id,
            pagination: {
              position: 'both',
              defaultPageSize: 20,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
            }
          }}
        />
      </ContainerLayout>
    </div>
  )
}

export default Form.create()(
  presenter(
    store => ({
      escalationFlowlist: mappedEsclationFlow(
        store.escalationFlow.escalationFlowlist
      ),
      visible: store.escalationFlow.visible,
      record: store.escalationFlow.record,
      staff: store.staff.staffs
    }),
    { ...escalationFlowActions, ...staffActions }
  )(EscalationFlowPM, EscalationFlow)
)
