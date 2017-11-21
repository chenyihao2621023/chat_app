import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import '../styles/title.styl'

export default class Title extends Component {
    constructor(...args) {
        super(...args);
        this.state = {

        };
    }

    render() {
        return (
            <div className="title">
                <div>
                    <i className="iconfont icon-appfangkeduangengduo"></i>
                </div>
                <div>人工客服</div>
                <div>
                    <i className="iconfont icon-gengduo"></i>
                </div>
            </div>
        );
    }
}
reactMixin.onClass(Title, pureRenderMixin);
