import React from 'react'
import { Layout } from 'antd'
import Sidebar from 'components/SideBar/SideBar'
import ErrorBoundary from 'components/ErrorBoundary'
import { ContentRoute } from 'routes'
import moment from 'moment'
import './index.scss'
import MainHeader from '../MainHeader/index'

const { Content, Footer } = Layout

const AppLayout = () => {
  return (
    <Layout className="main-layout">
      <Sidebar />
      <Layout>
        <MainHeader />
        <Content>
          <ErrorBoundary>
            <ContentRoute />
          </ErrorBoundary>
        </Content>
        <Footer className="main-footer">
          ©{moment(new Date()).format('YYYY')} Powered by AavGo. All Rights
          Reserved.
        </Footer>
      </Layout>
    </Layout>
  )
}
// AppLayout.propTypes = {}
export default AppLayout
