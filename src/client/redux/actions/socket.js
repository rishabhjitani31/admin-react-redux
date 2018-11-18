import socketIO from 'socket.io-client'
import chatService from 'api/chatService'
import { appServiceName } from 'utils/environment'
const socket = socketIO.connect(appServiceName)
// import { getLocalStorageData } from 'utils/localStorage'
import {
  SOCKET_MESSAGE_RECEIVED,
  SOCKET_TICKET_RECEIVED,
  GET_CHAT_ROOMS,
  SELECT_GROUP,
  GET_OUTLET_GROUP,
  GET_CHAT_DATA,
  SELECT_CHAT_ROOM,
  CLEAR_COUNT
} from 'constants/socket'
import { GET_WORK_ORDER_UNREAD_COUNT } from 'constants/workorder'
import { GET_VERSION_NO } from 'constants/releaseNote'
export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}

export const sendMessage = mesg => dispatch => {
  socket.emit('message', mesg)
}

export const onSocketEmit = response => dispatch => {
  const pingToken = 'ping_check_' + guid()
  const chatRooms = response.user.chatrooms
  chatRooms.push(pingToken)
  chatRooms.push('tablet_broadcast_' + response.community.community_id)
  const data = {
    id: response.user.staff_id,
    subscribeIdList: chatRooms
  }
  socket.emit('subscribe', data)
  socket.on('message', message => {
    dispatch({
      type: SOCKET_MESSAGE_RECEIVED,
      payload: message
    })
  })
  socket.on('broadcast_ticket', ticket => {
    dispatch({
      type: SOCKET_TICKET_RECEIVED,
      payload: ticket.data
    })
  })
}

export const getChatRooms = (init = false) => dispatch => {
  chatService
    .getChatRooms()
    .then(res => {
      if (res.success === 1) {
        if (
          init &&
          res['depts'] &&
          res.depts.length &&
          res.depts[0]['rooms'] &&
          res.depts[0].rooms.length
        ) {
          dispatch(selectGroup(res.depts[0]))
          dispatch(onChangeRoom(res.depts[0].rooms[0]))
        }
        dispatch(onSocketEmit(res))
        dispatch({
          type: GET_CHAT_ROOMS,
          payload: res
        })
        dispatch({
          type: GET_VERSION_NO,
          value: res.version
        })
        dispatch({
          type: GET_WORK_ORDER_UNREAD_COUNT,
          value: res.workOrderCount
        })
      }
    })
    .catch(err => {
      console.log('err', err)
    })
}

export const selectGroup = item => {
  return {
    type: SELECT_GROUP,
    item
  }
}

export const getOutletGroup = () => {
  return {
    type: GET_OUTLET_GROUP,
    promise: chatService.getOutletGroup()
  }
}

export const getChatList = data => {
  return {
    type: GET_CHAT_DATA,
    promise: chatService.getChatList(data)
  }
}
export const onChangeRoom = room => {
  return {
    type: SELECT_CHAT_ROOM,
    room
  }
}
export const clearCount = item => {
  return {
    type: CLEAR_COUNT,
    item
  }
}
