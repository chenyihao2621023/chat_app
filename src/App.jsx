import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MaskOut from '../src/components/MaskOut'
import './styles/router.styl';
import './styles/app.styl'
// App can't be stateless component
class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {

        };
    }

    render() {
      const props = this.props;
      const key = props.location.pathname;
        return (
            <div className="app">
              <div className="wrap">
                <QueueAnim type={['right', 'left']} className="router-wrap">
                  <div key={key} className="router-wrap-inner">
                    {React.cloneElement(props.children, { key })}
                  </div>
                </QueueAnim>
              </div>
              {
                this.props.maskOutShow ? 
                <MaskOut /> : null
              }       
            </div>
        );
    }
}
function mapStateToProps(state) {
  return {
    maskOutShow: state.ui.get('maskOutShow')
  }
}
export default connect(mapStateToProps)(App);
