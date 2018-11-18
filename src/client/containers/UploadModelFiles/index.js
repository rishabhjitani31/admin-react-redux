import React from 'react'
import { Upload, Button, Icon } from 'antd'
import presenter from 'hoc/presenter'
import UploadModelFilesPM from './UploadModalFilesPM'
import ContainerHeader from 'components/ContainerHeader/index'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import Columns from './Columns'
import * as Actions from 'actions/uploadModelFiles'

import './UploadModalFiles.scss'

const UploadModalFiles = props => {
  let manual_urls = []

  if (
    props.uploadModelDetails.manual_url &&
    props.uploadModelDetails.manual_url.length
  ) {
    manual_urls = JSON.parse(props.uploadModelDetails.manual_url)
  }

  return (
    <div className="upload-model-container">
      <ContainerHeader
        title={`UPLOAD MANUALS FOR MODEL: ${
          props.uploadModelDetails ? props.uploadModelDetails.model_name : ''
        }`}
      />
      <ContainerLayout>
        <TableContainer
          tableProps={{
            dataSource: manual_urls,
            columns: Columns(props),
            rowKey: (record, index) => index,
            loading: props.isModelDetailsLoading,
            pagination: false
          }}
        />
        <div className="upload-img-container">
          <Upload
            action=""
            listType="picture"
            className="upload-list-inline"
            onChange={props.pm.uploadImageChange}
            onRemove={props.pm.imageRemove}
            //defaultFileList={props.fileList}
            fileList={props.fileList}
            accept="image/*,application/pdf"
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
          <Button
            onClick={() => props.pm.onUploadImageSubmit()}
            className="upload-img-buttons"
            disabled={!props.uploadFilesArray.length}
            loading={props.isLoading}
          >
            Start Upload
          </Button>
        </div>
        <div className="upload-img-container">
          <Button type="primary" onClick={props.pm.goBack}>
            Go Back
          </Button>
        </div>
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    uploadModelDetails: store.uploadModelFile.uploadModelDetails,
    modalToEditIndex: store.uploadModelFile.modalToEditIndex,
    modalToEditValue: store.uploadModelFile.modalToEditValue,
    fileName: store.uploadModelFile.fileName,
    uploadFilesArray: store.uploadModelFile.uploadFilesArray,
    fileList: store.uploadModelFile.fileList,
    isLoading: store.uploadModelFile.isLoading,
    isModelDetailsLoading: store.uploadModelFile.isModelDetailsLoading
  }),
  Actions
)(UploadModelFilesPM, UploadModalFiles)
