import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import '../styles/maskout.styl'

class MaskOut extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }
  constructor(...args) {
    super(...args);
    this.state = {

    };
  }

  render() {
    return (
      <div className="mask-out">
        {
          !this.props.voiceCancle ? 
          <div>向上滑动取消</div> :
          <div>松开取消</div>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    voiceCancle: state.ui.get('voiceCancle')
  }
}
reactMixin.onClass(MaskOut, pureRenderMixin);
export default connect(mapStateToProps)(MaskOut);