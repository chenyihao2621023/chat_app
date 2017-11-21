import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import '../styles/more.styl'

export default class More extends Component {
  static propTypes = {
    // show: PropTypes.bool.isRequired,
  }
  static defaultProps = {

  }
  constructor(...args) {
    super(...args);
    this.state = {

    };
  }
  handlePictrue() {
    console.log('handlePictrue')
  }
  handleAppraise() {
    console.log('handleAppraise')
  }
  handleMessage() {
    console.log('handleMessage')
  }
  handlePosition() {
    console.log('handlePosition')
  }
  render() {
    return (
      <div className="more">
        <div className="more-item" onClick={this.handlePictrue.bind(this)}>
          <div className="more-item-icon border-1px"><i className="iconfont icon-tupian"></i></div>
          <p>图片</p>
        </div>
        <div className="more-item" onClick={this.handleAppraise.bind(this)}>
          <div className="more-item-icon border-1px"><i className="iconfont icon-xinxingpingjia"></i></div>
          <p>评价</p>
        </div>
        <div className="more-item" onClick={this.handleMessage.bind(this)}>
          <div className="more-item-icon border-1px"><i className="iconfont icon-shixinliuyan1"></i></div>
          <p>留言</p>
        </div>
        <div className="more-item" onClick={this.handlePosition.bind(this)}>
          <div className="more-item-icon border-1px"><i className="iconfont icon-weizhi"></i></div>
          <p>位置</p>
        </div>
      </div>
    );
  }
}
reactMixin.onClass(More, pureRenderMixin);
