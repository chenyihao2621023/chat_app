import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import '../styles/loading.styl'

export default class Loading extends Component {

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

  render() {
    return (
      <div className="mf-loading-container">
        <img src="../../static/images/loading.gif" style={{width: '20px', height: '20px', display: 'block'}}/>
      </div>
    );
  }
}

