import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import Immutable from 'immutable'
import BScroll from 'better-scroll'
import Loading from './Loading'
import Bubble from './Bubble'
import Message from './Message'
import { getRect } from '../../utils/dom.js'
import '../styles/scroll.styl'

const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

class Scroll extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    probeType: PropTypes.number.isRequired,
    click: PropTypes.bool.isRequired,
    listenScroll: PropTypes.bool.isRequired,
    listenBeforeScroll: PropTypes.bool.isRequired,
    direction: PropTypes.string.isRequired,
    scrollbar: PropTypes.bool.isRequired,
    pullDownRefresh: PropTypes.any.isRequired,
    pullUpLoad: PropTypes.bool.isRequired,
    startY: PropTypes.number.isRequired,
    refreshDelay: PropTypes.number.isRequired,
    freeScroll: PropTypes.bool.isRequired
  }

  static defaultProps = {
    data: [],
    probeType: 1,
    click: true,
    listenScroll: true,
    listenBeforeScroll: false,
    direction: DIRECTION_V,
    scrollbar: true,
    pullDownRefresh: false,
    pullUpLoad: true,
    startY: 0,
    refreshDelay: 20,
    freeScroll: false
  }
  constructor(...args) {
    super(...args);
    this.state = {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      pulling: false,
      pullDownStyle: '',
      bubbleY: 0
    };
  }

  initScroll() {
    if (!this.refs.wrapper) {
      return
    }

    if (this.refs.list && (this.props.pullDownRefresh || this.props.pullUpLoad)) {
      this.refs.list.style.minHeight = getRect(this.refs.wrapper).height + 'px'
    }
    let options = {
      probeType: this.props.probeType,
      click: this.props.click,
      scrollY: this.props.freeScroll || this.props.direction === DIRECTION_V,
      scrollX: this.freeScroll || this.props.direction === DIRECTION_H,
      scrollbar: this.props.scrollbar,
      pullDownRefresh: this.props.pullDownRefresh,
      pullUpLoad: true,
      startY: this.props.startY,
      freeScroll: this.props.freeScroll
    }
    this.scroll = new BScroll(this.refs.wrapper, options)
    if (this.props.listenScroll) {
      this.scroll.on('scroll', (pos) => {

      })
    }

    if (this.props.listenBeforeScroll) {
      this.scroll.on('beforeScrollStart', () => {

      })
    }

    if (this.props.pullDownRefresh) {
      this._initPullDownRefresh()
    }

  }
  disable() {
    this.scroll && this.scroll.disable()
  }
  enable() {
    this.scroll && this.scroll.enable()
  }
  refresh() {
    this.scroll && this.scroll.refresh()
  }
  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
  clickItem(e, item) {

    // this.$emit('click', item)
  }
  destroy() {
    this.scroll.destroy()
  }
  forceUpdate(dirty) {
    if (this.props.pullDownRefresh && this.state.isPullingDown) {
      this.setState({
        pulling: false
      })
      this._reboundPullDown().then(() => {
        this._afterPullDown()
      })
    } else {
      this.refresh()
    }
  }
  _initPullDownRefresh() {
    this.scroll.on('pullingDown', () => {
      this.props.onPullingDown()
      this.setState({
        beforePullDown: false,
        isPullingDown: true,
        pulling: true
      })

    })
    this.scroll.on('scroll', (pos) => {
      if (this.state.beforePullDown) {
        this.setState({
          bubbleY: Math.max(0, pos.y + this.pullDownInitTop),
          pullDownStyle: { top: `${Math.min(pos.y + this.pullDownInitTop, 10)}px` }
        })
      } else {
        this.setState({
          bubbleY: 0
        })
      }
      if (this.state.isRebounding) {
        this.setState({
          pullDownStyle: { top: `${10 - (this.props.pullDownRefresh.stop - pos.y)}px` }
        })
      }
    })
  }
  _reboundPullDown() {
    const { stopTime = 600 } = this.props.pullDownRefresh
    return new Promise((resolve) => {
      setTimeout(() => {
        this.state.isRebounding = true
        this.scroll.finishPullDown()
        this.setState({
          isPullingDown: false
        })
        resolve()
      }, stopTime)
    })
  }
  _afterPullDown() {
    setTimeout(() => {
      this.setState({
        pullDownStyle: { top: `${this.pullDownInitTop}px` },
        beforePullDown: true,
        isRebounding: false
      })
      this.refresh()
    }, this.scroll.options.bounceTime)
  }
  componentWillMount() {
    this.pullDownInitTop = -50
  }
  componentDidMount() {
    setTimeout(() => {
      this.initScroll()
      let listEle = document.querySelector('.list-wrapper')
      let elArr = document.querySelectorAll('.list-wrapper .message')
      this.scrollToElement(elArr[elArr.length - 1])
    }, 100)
  }
  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.forceUpdate(true)
    }, this.props.refreshDelay)
    if(this.props.computeScroll !== nextProps.computeScroll) {
      let num = 0
      let time = setInterval(() => {
        num ++
        if(num < 30) {
          this.forceUpdate(true)
          let elArr = document.querySelectorAll('.list-wrapper .message')
          this.scrollToElement(elArr[elArr.length - 1])
        }else {
          clearInterval(time)
        }
      }, 10)
    }
  }
  render() {
    return (
      <div className="list-wrapper" ref="wrapper">
        <div className="scroll-content">
          <div ref="list">
            {
              this.props.messageListData.map((message, index) => {
                return (
                  <Message
                    key={index}
                    self={message.me}
                    message={message}
                  />
                )
              })
            }
          </div>
        </div>

        {
          this.props.pullDownRefresh ?
            <div className="pulldown-wrapper" style={this.state.pullDownStyle ? this.state.pullDownStyle : {}}>
              {
                this.state.beforePullDown ?
                  <div className="before-trigger">
                    <Bubble
                      y={this.state.bubbleY}
                    >
                    </Bubble>
                  </div> :
                  <div className="after-trigger">
                    {
                      this.state.pulling ?
                        <div className="loading">
                          <Loading></Loading>
                        </div> :
                        null
                    }
                  </div>
              }
            </div> : null
        }
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    computeScroll: state.ui.get('computeScroll'),
    messageListData: state.user.get('messageListData')
  }
}

reactMixin.onClass(Scroll, pureRenderMixin);
export default connect(mapStateToProps)(Scroll);
