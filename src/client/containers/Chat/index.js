import React from 'react'
import presenter from 'hoc/presenter'
import ChatPM from './chatPM'
import ContainerHeader from 'components/ContainerHeader'
import ContainerLayout from 'components/ContainerLayout'
import * as socketActions from 'actions/socket'
import { getChatRooms, sortChat } from 'selectors/chat'
import { List, Badge, Avatar } from 'antd'
import ChatMessages from './ChatMessages'

const Chat = props => {
  return (
    <div className="chat">
      <ContainerHeader title="Chat" />
      <ContainerLayout>
        <div style={{ display: 'flex' }}>
          <div className="chat-group" style={{ display: 'flex', flex: 1 }}>
            <List
              bordered
              style={{ width: '100%' }}
              dataSource={(props.chatDetails && props.chatDetails.depts) || []}
              renderItem={item => (
                <List.Item
                  onClick={() => {
                    props.pm.onChatGroupsChange(item)
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image_url} />}
                    title={item.dept_name}
                  />
                  <Badge count={props.pm.getGroupMessagesCount(item)} />
                </List.Item>
              )}
            />
          </div>
          {props.chatRooms && (
            <div className="chat-room" style={{ display: 'flex', flex: 1 }}>
              <List
                bordered
                style={{
                  width: '100%',
                  overflowY: 'scroll',
                  height: 'calc(100vh - 145px)'
                }}
                dataSource={props.chatRooms}
                renderItem={item => (
                  <List.Item onClick={() => props.pm.onChatRoomChange(item)}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.image_url} />}
                      title={item.title}
                      description={
                        props.selectedChatGroup.dept_name === 'Outlet Group' &&
                        `Location:${item.city_name ? item.city_name : ''}`
                      }
                    />
                    <Badge count={props.count.get(item.apt_id || item.id)} />
                  </List.Item>
                )}
              />
            </div>
          )}
          <div className="chat-messages">
            <ChatMessages {...props} />
          </div>
        </div>
      </ContainerLayout>
    </div>
  )
}
export default presenter(
  store => ({
    chatDetails: store.socket.chatDetails,
    chatRooms: getChatRooms(store),
    chatList: sortChat(store.socket.chatList),
    selectedChatRoom: store.socket.selectedChatRoom,
    selectedChatGroup: store.socket.selectedChatGroup,
    count: store.socket.count
  }),
  socketActions
)(ChatPM, Chat)
