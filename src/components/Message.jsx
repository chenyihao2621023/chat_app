import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import emojiDecode from '../../utils/emojiDecode.js'
import data from '../data/emoji-data.js'
import '../styles/message.styl'
// App can't be stateless component
export default class Message extends Component {

  static propTypes = {
    self: PropTypes.bool.isRequired,
    message: PropTypes.object.isRequired
  }

  static defaultProps = {
    self: false
  }
  constructor(...args) {
    super(...args);
    this.state = {

    };
  }
  renderContent(type, content) {
    // 此组件 在 Scroll.jsx 组件 被调用
    if (type === 'text') {
    content = emojiDecode(content).replace(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                r => (
                    `<a href="${r}" rel="noopener noreferrer" target="_blank">${r}</a>`
                )
            )
    return (
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </div>
    )
    } else if( type === 'changeOver' ) {
      return (<div className="change-over">{content}</div>)
    } else if( type === 'date' ) {
      return(<div className="date">{content}</div>)
    }
  }
  render() {
    const { self, message } = this.props
    return (
      <div ref="messageDom" className="message" className={`message ${self ? 'message-self' : ''} ${message.type === 'date' ? 'date' : ''} ${message.type === 'changeOver' ? 'change-over' : ''}`}>
        {
          message.type === 'text' ?
          <div className="avatar">
            <img 
              style={{ width: 50 }}
              src="../../static/images/touxiang.jpg"
            />
          </div> : null
        }
        {this.renderContent(message.type, message.content)}
      </div>
    );
  }
}
reactMixin.onClass(Message, pureRenderMixin);
