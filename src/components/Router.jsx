import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
class RouterTest extends Component {
    constructor(...args) {
        super(...args);
        this.state = {

        };
    }
    static contextTypes = {
        router: React.PropTypes.object,
    }
    changeRouter() {
        this.context.router.push('/')
    }
    render() {
        return (
            <div className="router" onClick={this.changeRouter.bind(this)}>
                routerTest
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log(state.ui.toJS());
    return {
        showFooder: state.ui.showFooder
    }
}
export default connect(mapStateToProps)(RouterTest);
