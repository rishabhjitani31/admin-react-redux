import imageRegManager from 'assets/images/regManager.png'
import imageFrontOffice from 'assets/images/front-office.png'
import imageManager from 'assets/images/manager.png'
import imageWorkOrder from 'assets/images/maintenance.png'
import imageProject from 'assets/images/project.png'
import usericon from 'assets/images/usericon.png'

const handleSeleCtImage = id => {
  switch (id) {
    case 1096:
      return imageWorkOrder
    case 1204:
      return imageManager
    case 1206:
      return imageRegManager
    case 1207:
      return imageProject
    case 1208:
      return imageFrontOffice
    default:
      return usericon
  }
}

export const getChatRooms = store => {
  if (store.socket.selectedChatGroup.dept_name === 'Staff Group') {
    return store.socket.selectedChatGroup.rooms.map(room => {
      return {
        ...room,
        title: room.dept_name,
        room_id: room.chatroom_id,
        image_url: handleSeleCtImage(room.id)
      }
    })
  }
  if (store.socket.selectedChatGroup.dept_name === 'Outlet Group') {
    return store.socket.selectedChatGroup.rooms.map(room => {
      return {
        ...room,
        id: room.apt_id,
        room_id: room.apt_id,
        title: room.apt_name,
        image_url: usericon
      }
    })
  }
  return undefined
}

export const sortChat = chatList => {
  return chatList.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return 1
    }
    if (a.created_at < b.created_at) {
      return -1
    }
    return 0
  })
}
