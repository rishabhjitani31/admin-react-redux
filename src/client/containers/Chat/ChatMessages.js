import React from 'react'
import { Row, Col, Input, Button, Icon, Form, Card } from 'antd'
import './ChatMessages.scss'
import moment from 'moment'
import { getLocalStorageData } from 'utils/localStorage'

const InputGroup = Input.Group

const BroadcastMessage = ({
  message,
  title,
  first_name,
  last_name,
  created_at,
  user_type,
  index,
  onRepeatMessage
}) => {
  const name =
    (last_name ? first_name + ' ' + last_name : first_name) + ', ' + user_type
  const m =
    moment(created_at).format('MM/DD/YYYY') +
    ' ' +
    moment(created_at).format('hh:mm a')
  return (
    <Card
      title={title}
      key={index}
      bordered={false}
      extra={
        <Button onClick={() => onRepeatMessage(title, message)}>
          <Icon type="retweet" /> Repeat
        </Button>
      }
      className="chatBroadcastCard"
    >
      <p className="chatBroadcastMsg">
        {new RegExp(
          '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?'
        ).test(message) ? (
          <a
            href={
              message.indexOf('https') > -1 ? message : 'https://' + message
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {message}
          </a>
        ) : (
          message
        )}
      </p>
      <span className="chatBroadcastFooter">Sender: {name}</span>
      <span className="chatBroadcastFooter chatBroadcastright">{m}</span>
    </Card>
  )
}

const ChatMessage = ({
  message,
  user_id,
  first_name,
  last_name,
  created_at,
  user_type
}) => {
  const staffId = getLocalStorageData(['staff_id'])['staff_id']
  const name =
    (last_name ? first_name + ' ' + last_name : first_name) +
    ' (' +
    user_type +
    ')'
  const m = moment(created_at).format('hh:mm a')
  let uriPattern = new RegExp(
    '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?',
    'g'
  )
  let hrefs = message.match(uriPattern) || []
  let chatMessage = <span>{message}</span>
  if (hrefs.length) {
    //selectively convert all the semantic links(uris) inside the message into "a" element.
    chatMessage = []
    let messageStops = hrefs.map(match => {
      let startIndex = message.indexOf(match)
      let stopIndex = startIndex + match.length
      return { startIndex, stopIndex }
    })
    for (let i = 0, messageCounter = 0; i < message.length; messageCounter++) {
      if (messageCounter < messageStops.length) {
        let { startIndex, stopIndex } = messageStops[messageCounter]
        let partMessage = (
          <span key={chatMessage.length + 1}>
            {message.slice(i, startIndex)}
          </span>
        )
        let partHref = message.slice(startIndex, stopIndex + 1)
        let link = partHref
        if (!partHref.startsWith('http')) {
          link = 'https://' + partHref
        }
        let partLink = (
          <a
            href={link}
            key={chatMessage.length + 2}
            target="_blank"
            rel="noopener noreferrer"
            className="chatLink"
          >
            {partHref}
          </a>
        )
        chatMessage.push(partMessage)
        chatMessage.push(partLink)
        i = stopIndex + 1
      } else {
        let partMessage = (
          <span key={chatMessage.length + 1}>{message.slice(i)}</span>
        )
        chatMessage.push(partMessage)
        i = message.length
      }
    }
  }
  if (staffId !== user_id) {
    return (
      <div className="chatBubble chatBubbleLeft" key={created_at}>
        <span className="chatname">{name + ' ' + m}</span>
        <span className="chatMessageLeft">{chatMessage}</span>
      </div>
    )
  } else {
    return (
      <div className="chatBubble chatBubbleRight" key={created_at}>
        <span className="chatname">{name + ' ' + m}</span>
        <span className="chatMessageRight">{chatMessage}</span>
      </div>
    )
  }
}

const ChatMessages = props => {
  return (
    <div className="chatMainContainer">
      <Row className="chatMessageHeader">
        <h4>
          <strong className="strong">
            To :
            {props.selectedChatRoom.apt_name ||
              props.selectedChatRoom.dept_name}
          </strong>
        </h4>
      </Row>
      <Row className="chatMessageBody">
        {props.chatList.length ? (
          <Col>
            {props.chatList.map((item, index) => {
              if (props.selectedChatGroup.dept_name === 'Broadcast') {
                return (
                  <BroadcastMessage
                    {...item}
                    key={index}
                    index={index}
                    onRepeatMessage={props.pm.onRepeatMessage}
                  />
                )
              } else {
                return <ChatMessage {...item} key={index} />
              }
            })}
            <div className="chatScrollBottom" ref={props.pm.referer} />
          </Col>
        ) : (
          <span>No message available</span>
        )}
      </Row>
      <Row
        gutter={5}
        className="chat-main-footer"
        style={{ marginLeft: '0px' }}
      >
        <Form className="commentForm">
          <InputGroup className="d-flex flex-row align-items-center">
            <div className="col">
              {(props.selectedChatRoom.apt_name ||
                props.selectedChatRoom.dept_name) === 'Broadcast' && (
                <Col className="form-group">
                  <Input
                    id="title"
                    placeholder="Type a title ..."
                    className="chat-input form-control"
                  />
                </Col>
              )}
              <Col className="form-group">
                <Input
                  id="msg"
                  placeholder="Type a Message.."
                  className="chat-input form-control"
                  onKeyPress={event => {
                    const code = event.which || event.keyCode
                    if (code === 13) {
                      props.pm.onSendMessage()
                    }
                  }}
                />
              </Col>
            </div>
            <Col className="chat-sent">
              <Button
                id="sendBtn"
                onClick={props.pm.onSendMessage}
                className="jss102 jss159"
              >
                <span className="jss164">
                  <Icon type="double-right" />
                </span>
              </Button>
            </Col>
          </InputGroup>
        </Form>
      </Row>
    </div>
  )
}

export default Form.create()(ChatMessages)
