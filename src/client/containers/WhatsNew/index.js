import React from 'react'
import moment from 'moment'
import presenter from 'hoc/presenter'
import WhatsNewPM from './whatsNewPM'
import ContainerHeader from 'components/ContainerHeader'
import * as releaseNoteListActions from 'actions/releaseNote'
import { Card } from 'antd'
import './whatsNew.scss'

const WhatsNew = props => {
  const showActiveStatus = rowData => {
    return (
      <span>
        {rowData ? (
          <span className="Active-Cell Active-yes">Current Active</span>
        ) : null}
      </span>
    )
  }
  return (
    <div className="whatsNew">
      <ContainerHeader title="Whats New" />
      {props.releaseNoteList ? (
        props.releaseNoteList.map(obj => {
          return (
            <Card
              loading={props.isFetching}
              title={obj.title}
              extra={obj.status && showActiveStatus(obj.status)}
              key={obj.id}
              className="card"
            >
              Version No. : {obj.version} <br />
              <br />
              <div dangerouslySetInnerHTML={{ __html: obj.details }} />
              <span className="card-Date">
                Release Date:{' '}
                <strong className="strong">
                  {moment(obj.release_date).format('DD/MM/YYYY')}
                </strong>
              </span>
              <br />
            </Card>
          )
        })
      ) : (
        <Card
          className="card"
          loading={props.isFetching}
          title="No new Updates"
        />
      )}
    </div>
  )
}

export default presenter(
  store => ({
    releaseNoteList: store.releaseNote.releaseNoteList,
    isFetching: store.releaseNote.isFetching
  }),
  releaseNoteListActions
)(WhatsNewPM, WhatsNew)
