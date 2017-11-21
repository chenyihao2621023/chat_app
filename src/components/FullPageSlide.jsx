import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import QueueAnim from 'rc-queue-anim'
import Slide from './Slider'
import EmojiPicker from './EmojiPicker'
import More from './More'
import '../styles/fullpageslide.styl'

class FullPageSlide extends Component {
  static propTypes = {

  }
  constructor(...args) {
    super(...args);
    this.state = {

    };
  }
  static defaultProps = {
    items: []
  }
  render() {
    return (
      this.props.items.length ?
        <div className="full-page-slide-wrapper">
          <QueueAnim type={['top', 'bottom']} className="slide-move-wrap">
            {
              this.props.showEmoji ?
                <div key="a" className="queueAnim-debug">
                  <Slide ref="slide" autoPlay={false} loop={false} showDot={true} key="a">
                    <div><EmojiPicker emojiActive="表情" /></div>
                    <div><EmojiPicker emojiActive="自然" /></div>
                    <div><EmojiPicker emojiActive="物品" /></div>
                    <div><EmojiPicker emojiActive="地点" /></div>
                    <div><EmojiPicker emojiActive="符号" /></div>
                  </Slide>
                </div> :
                this.props.keyboardShow ? 
                  <div className="keyboard-wrapper">没错，我是键盘</div>
                  : <div key="b" className="queueAnim-debug">
                    <More />
                  </div>
            }
          </QueueAnim>
        </div> : null
    );
  }
}
function mapStateToProps(state) {
  return {
    showEmoji: state.ui.get('showEmoji'),
    keyboardIcon: state.ui.get('keyboardIcon'),
    keyboardShow: state.ui.get('keyboardShow')
  }
}

reactMixin.onClass(FullPageSlide, pureRenderMixin);
export default connect(mapStateToProps)(FullPageSlide);
