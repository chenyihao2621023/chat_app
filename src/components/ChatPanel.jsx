import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import actionsUser from '../action/user.js'
import Message from './Message'
import Scroll from './Scroll'
import '../styles/chatPanel.styl'
import '../styles/messageList.styl'

let {setMessages} = actionsUser

class ChatPanel extends Component {
  
  static propTypes = {

  }

  static defaultProps = {

  }
  constructor(...args) {
    super(...args);
    this.state = {
      showGoodsInfo: false,
      data: [
        {
          type: 'date',
          content: '2017/09/22'
        },
        {
          type: 'text',
          content: '你好，我是访客',
          me: true
        },
        {
          type: 'text',
          content: 'https://baidu.com'
        },
        {
          type: 'text',
          content: '你好:bowtie::smile:好啊'
        },
        {
          type: 'text',
          content: '你好，我是访客',
          me: true
        },
        {
          type: 'text',
          content: '你好，我是访客',
          me: true
        },
        {
          type: 'changeOver',
          content: '您好，客服暖暖接受了您的邀请',
        },
        {
          type: 'text',
          content: '你好，我是访客',
          me: true
        },

        {
          type: 'date',
          content: '2017/09/22'
        },
        {
          type: 'text',
          content: '你好，我是访客',
          me: true
        },
        {
          type: 'text',
          content: '你好，我是访客:bowtie:我是访客:bowtie:我是访客我是访客我是访客',
          me: true
        },
        {
          type: 'text',
          content: '你好，我是访客我是访客我是访客我是访客',
          me: true
        },
        {
          type: 'text',
          content: '你好，我是访客我是访客我是访客',
          me: true
        },
      ]
    };
  }
  onPullingDown() {
    // 模拟更新数据
    let $$data = Immutable.fromJS(this.state.data)

    setTimeout(() => {
      if (Math.random() > 0.5) {
        this.setState({
          data: $$data.unshift({
            type: 'text',
            content: '你好，我是新加载的数据'
          }).toJS()
        })
        this.props.setMessages($$data.unshift({
            type: 'text',
            content: '你好，我是新加载的数据'
          }).toJS())
      } else {
        // 如果没有新数据
        this.refs.scroll.forceUpdate()
      }
    }, 1000)

  }
  componentDidMount() {
    this.props.setMessages(this.state.data)
  }
  render() {
    
    return (
      <div className="chat-panel">
        {
          this.state.showGoodsInfo ?
            <div className="goods-info">
              <img src="../../static/images/phone.jpg" height="60px" />
              <div className="goods-detail">
                <div className="detail-title">这里是产品名称XXXXXXXXXX</div>
                <div className="detail-price">￥ 8900.00</div>
              </div>
              <div className="goods-btn">发送商品</div>
            </div> : null
        }
        <div className="message-list">
          <Scroll ref="scroll"
            data={this.state.data}
            onPullingDown={this.onPullingDown.bind(this)}
            pullDownRefresh={{ threshold: 90, stop: 40 }}
          >
          </Scroll>
        </div>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    showFooder: state.ui.get('showFooder'),
    showEmoji: state.ui.get('showEmoji'),
    keyboardIcon: state.ui.get('keyboardIcon'),
    insertTexts: state.ui.get('insertTexts'),
    keyboardShow: state.ui.get('keyboardShow'),
    voiceShow: state.ui.get('voiceShow')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMessages }, dispatch);
}
reactMixin.onClass(ChatPanel, pureRenderMixin);
export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel);