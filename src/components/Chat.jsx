import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Animate from 'rc-animate'
import actions from '../action/ui.js'
import '../styles/chat.styl'
import Title from './Title'
import ChatPanel from './ChatPanel'
import InputBox from './InputBox'
import FullPageSlide from './FullPageSlide.jsx'

let { computeScrollHeight } = actions

class Chat extends Component {
  static propTypes = {
    showFooder: PropTypes.bool.isRequired,
  }
  constructor(...args) {
    super(...args);
    this.state = {
      showFooder: false,
      data: [1, 2, 3, 4, 5]
    }
  }
  render() {
    return (
      <div className="chat">
        <Title />
        <div className="chat-content">
          <ChatPanel />
          <InputBox
          />
        </div>
        <Animate
          component=""
          transitionName="fade"
        >
          {
            this.props.showFooder ?
              <div key="1" className="chat-fooder border-top-1px">
                <FullPageSlide items={this.state.data} />
              </div> : null}
        </Animate>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    showFooder: state.ui.get('showFooder')
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ computeScrollHeight }, dispatch);
}
reactMixin.onClass(Chat, pureRenderMixin);
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
