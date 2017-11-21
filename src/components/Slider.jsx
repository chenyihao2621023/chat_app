import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BScroll from 'better-scroll'
import { addClass } from '../../utils/dom.js'
import '../styles/slider.styl'


class Slider extends Component {
  static propTypes = {
    showFooder: PropTypes.bool.isRequired,
    showEmojiBtn: PropTypes.bool.isRequired
  }

  constructor(...args) {
    super(...args);
    this.state = {
      dots: [],
      currentPageIndex: 0
    };
  }
  static defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 4000,
    showDot: true,
    click: true
  }
  componentDidMount() {
    setTimeout(() => {
      this._setSlideWidth()
      if (this.props.showDot) {
        this._initDots()
      }
      this._initSlide()
      if (this.props.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slide || !this.slide.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.props.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    })
  }
  refresh() {
    this._setSlideWidth(true)
    this.slide.refresh()
  }
  next() {
    this.slide.next()
  }
  _setSlideWidth(isResize) {
    this.children = this.refs.slideGroup.children
    let width = 0
    let slideWidth = this.refs.slide.clientWidth
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i]
      addClass(child, 'slide-item')
      child.style.width = slideWidth + 'px'
      width += slideWidth
    }
    if (this.props.loop && !isResize) {
      width += 2 * slideWidth
    }
    this.refs.slideGroup.style.width = width + 'px'
  }
  _initSlide() {
    this.slide = new BScroll(this.refs.slide, {
      scrollX: true,
      momentum: false,
      eventPassthrough: 'vertical',
      snap: {
        loop: this.props.loop,
        threshold: 0.3,
        speed: 400
      },
      click: this.props.click
    })
    this.slide.on('scrollEnd', this._onScrollEnd.bind(this))
    this.slide.on('touchend', () => {
      if (this.props.autoPlay) {
        this._play()
      }
    })

    this.slide.on('beforeScrollStart', () => {
      if (this.props.autoPlay) {
        clearTimeout(this.timer)
      }
    })
  }
  _onScrollEnd() {
    let pageIndex = this.slide.getCurrentPage().pageX
    if (this.props.loop) {
      pageIndex -= 1
    }
    this.setState({
      currentPageIndex: pageIndex
    })
    if (this.props.autoPlay) {
      this._play()
    }
  }
  _initDots() {
    let arr = []
    for (let i = 0; i < this.children.length; i++) {
      arr[i] = 1
    }
    this.setState({
      dots: arr
    })
  }
  _play() {
    let pageIndex = this.slide.getCurrentPage().pageX + 1
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.slide.goToPage(pageIndex, 0, 400)
    }, this.props.interval)
  }



  render() {
    return (
      <div className="slide" ref="slide">
        <div className="slide-group" ref="slideGroup">
          {this.props.children}
        </div>
        {
          this.props.showEmojiBtn ?
            <div className="emoji-btn">
              <div className="emoji-delete"></div>
              <div className="emoji-send">发送</div>
            </div> : null
        }

        {
          this.props.showDot && this.props.showFooder ?
            <div className="dots">
              {
                this.state.dots.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className={`dot ${this.state.currentPageIndex === index ? 'active' : ''}`}>
                    </span>
                  )
                })
              }
            </div> : null
        }

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    showFooder: state.ui.get('showFooder'),
    showEmojiBtn: state.ui.get('showEmojiBtn')
  }
}
reactMixin.onClass(Slider, pureRenderMixin);
export default connect(mapStateToProps)(Slider);
