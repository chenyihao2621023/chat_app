import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import './styles/title.styl'
// App can't be stateless component
export default class Title extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 4000,
    showDot: true,
    click: true
  }
  constructor(...args) {
    super(...args);
    this.state = {

    };
  }

  render() {
    return (
      <div className="title">

      </div>
    );
  }
}
reactMixin.onClass(Title, pureRenderMixin);
