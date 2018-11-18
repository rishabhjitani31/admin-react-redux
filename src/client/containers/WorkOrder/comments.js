import React from 'react'
import { List, Button, Input } from 'antd'
import moment from 'moment'
import imagePlacer from 'assets/images/usericon.png'
const Comments = props => {
  const messages = (
    <List
      dataSource={props.orderDetail.comments}
      renderItem={item => (
        <div className="media">
          <div className="user-profile">
            {item.image_url ? (
              <img
                alt={item.first_name + ' ' + item.last_name}
                className="user-profile-img"
                size="large"
                src={item.image_url}
              />
            ) : (
              <img
                alt={item.first_name + ' ' + item.last_name}
                className="user-profile-img"
                src={imagePlacer}
              />
            )}
          </div>
          <div className="media-body">
            <span>
              {item.first_name} {item.last_name}
              {!item.role || item.role === 'undefined'
                ? null
                : ' (' + item.role + ')'}
            </span>
            <h5>{item.comment}</h5>
            {item.status === 1 ? (
              <span className="pendingStatus">Pending</span>
            ) : item.status === 2 ? (
              <span className="reopenStatus">Reopen</span>
            ) : item.status === 3 ? (
              <span className="inProgressStatus">In Progress</span>
            ) : item.status === 4 ? (
              <span className="completedStatus">Completed</span>
            ) : item.status === 5 ? (
              <span className="verifiedStatus">Verified</span>
            ) : null}
          </div>
          <span className="comment-date">
            {moment(item.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a')}
          </span>
        </div>
      )}
    />
  )

  return (
    <div className="comments">
      <div className="display-flex">
        <Input
          placeholder="Enter Comment Here"
          value={props.commentValue}
          onChange={e => props.handleChangeComment(e.target.value)}
          onKeyPress={e => props.pm.handleKeyPress(e, props.orderDetail)}
        />
        <Button
          className="left-margin"
          type="primary"
          onClick={e => props.pm.handleButtonClick(e, props.orderDetail)}
          disabled={props.isCommentFetching}
        >
          Comment
        </Button>
      </div>
      {props.orderDetail.comments ? messages : 'No Comments Yet'}
    </div>
  )
}
export default Comments
