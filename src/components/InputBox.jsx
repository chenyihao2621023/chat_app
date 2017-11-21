import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import Immutable from "immutable"
import actions from '../action/ui.js'
import actionsUser from '../action/user.js'
import diff from '../../utils/diff.js'
import '../styles/inputBox.styl'

let { cancelVoiceSend, showMaskOut, hideMaskOut, showVoice, hideVoice, showKeyboard, hideKeyboard, insertTextEnd, openFooder, closeFooder, showEmojiPikcer, closeEmojiPikcer, showEmojiBtn, closeEmojiBtn, showKeyboradIcon, hideKeyboradIcon } = actions
let {setMessages} = actionsUser
class InputBox extends Component {
  static propTypes = {
    showFooder: PropTypes.bool.isRequired,
    showEmoji: PropTypes.bool.isRequired,
    keyboardIcon: PropTypes.bool.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.state = {

    };
  }
  static contextTypes = {
    router: React.PropTypes.object,
  }
  handleVoice() {
    this.props.closeFooder()
    this.props.hideKeyboradIcon()
    this.props.showVoice()
  }
  handleEmojiIcon() {
    if (!this.props.showFooder) {
      this.props.openFooder()
    }
    this.props.showEmojiPikcer()
    this.props.showKeyboradIcon()
    this.props.hideKeyboard()
    this.props.hideVoice()
    window.setTimeout(() => {
      this.props.showEmojiBtn()
    }, 200)
  }
  handleKeyboard() {
    this.props.hideKeyboradIcon()
    this.props.showKeyboard()
    this.props.closeEmojiPikcer()
    window.setTimeout(() => {
      this.props.showEmojiBtn()
    }, 100)
  }
  handleKeyboardLeft() {
    this.props.hideKeyboradIcon()
    this.props.closeEmojiPikcer()
    this.props.showKeyboard()
    this.props.openFooder()
    this.props.hideVoice()
  }
  handleMore() {
    this.props.openFooder()
    this.props.hideKeyboradIcon()
    this.props.hideKeyboard()
    this.props.closeEmojiPikcer()
    this.props.hideKeyboard()
    this.props.hideVoice()
  }
  voiceTouchStart(e) {
    this.clientY = e.touches[0].clientY
    this.props.showMaskOut()
  }
  voiceTouchMove(e) {
    // 向上滑动
    if(e.touches[0].clientY - this.clientY < -50) {
      this.props.cancelVoiceSend(true)
    }else {
      this.props.cancelVoiceSend(false)
    }
  }
  voiceTouchEnd(e) {
    this.props.hideMaskOut()
    this.props.cancelVoiceSend(false)
  }
  changeRouter() {
    this.context.router.push('/router')
  }
  onFocus() {
    if (!this.props.showFooder) {
      this.props.openFooder()
    }
    this.props.closeEmojiPikcer()
    this.props.showKeyboard()
    
  }
  onBlur() {
    this.props.setMessages([])
    // npm 换源 => README.MD
    // console.log($(document)) jquery 添加至全局
    // 点击表情icon 使input失去光标 调用此函数
    // 将 消息 数组 交由redux
    // 在Scroll.jsx 组件 通过 this.props.messageListData 渲染 Message 组件
  }
  onClick() {

  }

  onPaste() {

  }
  onChange() {

  }
  insertAtCursor(input, value) {
    if (document.selection) {
      input.focus();
      const sel = document.selection.createRange();
      sel.text = value;
      sel.select();
    }
    else if (input.selectionStart || input.selectionStart === '0') {
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      const restoreTop = input.scrollTop;
      input.value = input.value.substring(0, startPos) + value + input.value.substring(endPos, input.value.length);
      if (restoreTop > 0) {
        input.scrollTop = restoreTop;
      }
      input.focus();
      input.selectionStart = startPos + value.length;
      input.selectionEnd = startPos + value.length;
    } else {
      input.value += value;
      input.focus();
    }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.insertTexts.equals(this.props.insertTexts)) {
      nextProps.insertTexts.toJS().forEach(text => {
        this.insertAtCursor(this.input, text);
      })
      this.props.insertTextEnd(nextProps.insertTexts.size)

    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(Immutable.is(Immutable.fromJS(this.props), Immutable.fromJS(nextProps))) ||
      !(Immutable.is(Immutable.fromJS(this.state), Immutable.fromJS(nextState)));
  }
  render() {
    return (
      <div className="input-box border-top-1px">
        <div>
          {
            !this.props.voiceShow ?
            <i className="iconfont icon-appfangkeduanyuyin" 
              onClick={this.handleVoice.bind(this)}
              >
            </i> :
            <i className="iconfont icon-jianpan" onClick={this.handleKeyboardLeft.bind(this)}></i>
          }
          
        </div>
        {
          this.props.voiceShow ?
            <div className="voice-wrapper">
              <div className="voice-inner"             
                onTouchStart={this.voiceTouchStart.bind(this)}
                onTouchMove={this.voiceTouchMove.bind(this)}
                onTouchEnd={this.voiceTouchEnd.bind(this)}>
                按住 说话
              </div>
            </div> :
            <div className="input-text">
              <input
                ref={input => this.input = input}
                className="border-top-1px"
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
                onClick={this.onClick.bind(this)}
                onPaste={this.onPaste.bind(this)}
                onChange={this.onChange.bind(this)}
              />
            </div>
        }

        <div className="right">
          {
            this.props.keyboardIcon ?
              <i className="iconfont icon-jianpan" onClick={this.handleKeyboard.bind(this)}></i>

              :
              <i className="iconfont icon-appfangkeduanbiaoqing" onClick={this.handleEmojiIcon.bind(this)}></i>
          }
          <i className="iconfont icon-appfangkeduangengduo" onClick={this.handleMore.bind(this)}></i>
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
  return bindActionCreators({setMessages, cancelVoiceSend, showMaskOut, hideMaskOut, showVoice, hideVoice, showKeyboard, hideKeyboard, insertTextEnd, openFooder, closeFooder, showEmojiPikcer, closeEmojiPikcer, showEmojiBtn, closeEmojiBtn, showKeyboradIcon, hideKeyboradIcon }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
