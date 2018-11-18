import { getLocalStorageData } from 'utils/localStorage'
import { guid } from 'actions/socket'

class ChatPM {
  constructor(props) {
    this.props = props
  }
  onRepeatMessage = (title, message) => {
    document.getElementById('msg').value = message
    document.getElementById('title').value = title
    document.getElementById('title').focus()
  }

  onSendMessage = () => {
    let msg = document.getElementById('msg').value

    let message = {}

    if (
      (this.props.selectedChatRoom.apt_name ||
        this.props.selectedChatRoom.dept_name) === 'Broadcast'
    ) {
      let title = document.getElementById('title').value
      message.title = title
      message.message = msg
      if (message.title && message.message) {
        this.sendMessage(message)
        document.getElementById('msg').value = ''
        document.getElementById('title').value = ''
      }
    } else {
      if (msg) {
        message.title = 'Equinox'
        message.message = msg
        this.sendMessage(message)
        document.getElementById('msg').value = ''
      }
    }
  }
  sendMessage = message => {
    const ids = getLocalStorageData([
      'community_id',
      'first_name',
      'last_name',
      'role_ids',
      'staff_id',
      'user_name',
      'role_name',
      'role'
    ])

    const data = {
      ...ids,
      user_type: ids.role_name || ids.role,
      user_id: ids.staff_id,
      chatroom_id: this.props.selectedChatGroup.id,
      created_at: new Date(),
      flag: '1',
      isBackground: 'false',
      lang: 'en',
      ...message,
      sender_type: 'EMP',
      to_message_id: 'null',
      type: 'CHAT',
      global_id: this.props.selectedChatGroup.global_id,
      apt_id: this.props.selectedChatRoom.apt_id || null,
      lease_id: this.props.selectedChatRoom.lease_id || null,
      message_id: guid(),
      room_global_id: this.props.selectedChatRoom.global_id,
      room_id:
        this.props.selectedChatRoom.apt_id || this.props.selectedChatRoom.id,
      room_name:
        this.props.selectedChatRoom.apt_name ||
        this.props.selectedChatRoom.dept_name
    }
    this.props.sendMessage(data)
  }

  shouldComponentUpdate(nextProps) {
    this.props = nextProps
    return true
  }
  referer = el => {
    this.messagesEnd = el
  }

  showMessages = () => {
    return this.props.messages.length > 0 && this.props.staffId
  }
  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
  }

  getGroupMessagesCount = chatGroup => {
    let { rooms = [] } = chatGroup
    let messageCount = 0
    let { count } = this.props
    rooms.forEach(room => {
      let room_id = room.apt_id || room.id
      if (count.has(room_id)) {
        messageCount += 1
      }
    })
    return messageCount
  }
  update(prevProps) {
    let { id: current_id } = this.props.selectedChatGroup
    let { id: current_cid } = this.props.selectedChatRoom
    let { id } = prevProps.selectedChatGroup
    let { id: cid } = prevProps.selectedChatRoom
    if (current_id !== id || current_cid !== cid) {
      this.getChatList(current_cid, current_id)
    }
    this.scrollToBottom()
  }
  fetch() {
    this.getChatList()
    this.scrollToBottom()
  }
  getChatList(room_id = undefined, chatroom_id = undefined) {
    if (!room_id) {
      let { id } = this.props.selectedChatGroup
      room_id = id
    }
    if (!chatroom_id) {
      let { id: cid } = this.props.selectedChatRoom
      chatroom_id = cid
    }
    this.props.getChatList({ room_id, chatroom_id })
  }
  onChatRoomChange = item => {
    this.props.onChangeRoom(item)
    this.props.clearCount(item)
  }

  onChatGroupsChange = item => {
    this.props.clearCount(item)
    this.props.selectGroup(item)
    let room = item.rooms[0]
    if (item.dept_name === 'Outlet Group') {
      room = {
        ...room,
        id: room.apt_id,
        room_id: room.apt_id,
        title: room.apt_name
      }
    }
    this.props.onChangeRoom(room)
  }
}
export default ChatPM
