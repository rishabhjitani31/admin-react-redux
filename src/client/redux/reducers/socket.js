import {
  GET_CHAT_ROOMS,
  SELECT_GROUP,
  GET_OUTLET_GROUP_REQUEST,
  GET_OUTLET_GROUP_SUCCESS,
  GET_OUTLET_GROUP_FAILURE,
  SOCKET_MESSAGE_RECEIVED,
  GET_CHAT_DATA_REQUEST,
  GET_CHAT_DATA_SUCCESS,
  GET_CHAT_DATA_FAILURE,
  SELECT_CHAT_ROOM,
  CLEAR_COUNT
} from 'constants/socket'
import staffGroup from 'assets/images/staff-group.png'
import location from 'assets/images/Location.png'
import broadcast from 'assets/images/broadcast.png'
const socket = (
  state = {
    count: new Map(),
    chatDetails: null,
    chatList: [],
    selectedChatGroup: {},
    selectedChatRoom: {},
    outlet: {
      isFetching: false,
      outletList: [],
      error: null
    }
  },
  action
) => {
  switch (action.type) {
    case GET_CHAT_ROOMS:
      action.payload.depts[0].dept_name = 'Staff Group'
      action.payload.depts[0].image_url = staffGroup
      action.payload.depts[1].image_url = location
      action.payload.depts[2].image_url = broadcast
      return {
        ...state,
        chatDetails: action.payload
      }
    case SELECT_GROUP:
      return {
        ...state,
        selectedChatGroup: action.item
      }
    case GET_OUTLET_GROUP_REQUEST:
      return {
        ...state,
        outlet: {
          ...state.outlet,
          isFetching: true
        }
      }
    case GET_OUTLET_GROUP_SUCCESS:
      return {
        ...state,
        chatDetails: {
          ...state.chatDetails,
          depts: state.chatDetails.depts.slice().map(dept => {
            if (dept.dept_name === 'Outlet Group') {
              dept.rooms = action.response.apartments.slice().map(room => {
                return {
                  ...room,
                  room_id: room.apt_id,
                  title: room.apt_name
                }
              })
            }
            return dept
          })
        },
        outlet: {
          ...state.outlet,
          isFetching: false
        }
      }
    case GET_OUTLET_GROUP_FAILURE:
      return {
        ...state,
        outlet: { ...state.outlet, isFetching: false, error: action.error }
      }
    case SOCKET_MESSAGE_RECEIVED: {
      let room_name =
        state.selectedChatRoom.apt_name || state.selectedChatRoom.dept_name
      if (room_name === action.payload.room_name) {
        return {
          ...state,
          chatList: [...state.chatList, action.payload]
        }
      } else {
        let count = state.count
        if (count.has(action.payload.room_id)) {
          let val = count.get(action.payload.room_id)
          count.set(action.payload.room_id, val + 1)
        } else {
          count.set(action.payload.room_id, 1)
        }

        return {
          ...state,
          count
        }
      }
    }

    case GET_CHAT_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case GET_CHAT_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        chatList: action.response.messages || []
      }
    case GET_CHAT_DATA_FAILURE:
      return {
        ...state,
        outlet: { ...state, isFetching: false, error: action.error }
      }
    case SELECT_CHAT_ROOM:
      return {
        ...state,
        selectedChatRoom: action.room
      }
    case CLEAR_COUNT:
      if (state.selectedChatRoom.id === action.item.id) {
        let count = state.count
        count.delete(action.item.id)
        return {
          ...state,
          count
        }
      } else {
        return {
          ...state
        }
      }

    default:
      return state
  }
}

export default socket
