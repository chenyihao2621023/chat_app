import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pureRenderMixin from 'react-addons-pure-render-mixin'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import data from '../data/emoji-data.js'
import actions from '../action/ui.js'
import '../styles/emoji-picker.styl'

let { insertText } = actions
class EmojiPicker extends Component {
  static propTypes = {
    emojiActive: PropTypes.string.isRequired,
  }
  constructor(...args) {
    super(...args);
    this.state = {
      emojiData: data
    };
  }
  selectItem(emoji) {
    this.props.insertText(emoji)
  }
  getPureName(name) {
    return name.replace(/:/g, '')
  }
  render() {
    return (
      <div className="emoji-picker">
        <ul className="emoji-container">
          <li>
            {
              Object.keys(this.state.emojiData[this.props.emojiActive]).map((emoji, index) => {
                return (
                  <a key={index} onClick={this.selectItem.bind(this, emoji)}>
                    <span
                      className="emoji-item"
                      title="emoji"
                      className={`sprite-${emoji.replace(/:/g, '')}`}
                    >

                    </span>
                  </a>
                )
              })
            }
          </li>
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ insertText }, dispatch)
}
reactMixin.onClass(EmojiPicker, pureRenderMixin)
export default connect(mapStateToProps, mapDispatchToProps)(EmojiPicker);