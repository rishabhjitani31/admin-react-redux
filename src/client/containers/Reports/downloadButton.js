import React from 'react'
import { Button } from 'antd'
import './Reports.scss'

const DownloadButtons = props => {
  return (
    <div className="download-button-container">
      <div className="margin-right-5">
        <Button
          onClick={() => props.pm.onDownloadExcel()}
          type="primary"
          icon="download"
          disabled={!props.reportlist.length}
        >
          Download Excel
        </Button>
      </div>
      <div>
        <Button
          onClick={() => props.pm.onDownloadCsv()}
          type="primary"
          icon="download"
          disabled={!props.reportlist.length}
        >
          Download CSV
        </Button>
      </div>
    </div>
  )
}

export default DownloadButtons
