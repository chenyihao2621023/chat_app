import * as types from '../action_types'
const actions = {
  openFooder() {
    return {
      type: types.SET_FOODER_OPEN
    }
  },
  closeFooder() {
    return {
      type: types.SET_FOODER_CLOSE
    }
  },
  showEmojiPikcer() {
    return {
      type: types.SHOW_EMOJIPICKER
    }
  },
  closeEmojiPikcer() {
    return {
      type: types.CLOSE_EMOJIPICKER
    }
  },
  showEmojiBtn() {
    return {
      type: types.SHOW_EMOJIBTN
    }
  },
  closeEmojiBtn() {
    return {
      type: types.CLOSE_EMOJIBTN
    }
  },
  showKeyboradIcon() {
    return {
      type: types.SHOW_KEYBOARD_ICON
    }
  },
  hideKeyboradIcon() {
    return {
      type: types.HIDE_KEYBOARD_ICON
    }
  },
  insertText(text) {
    return {
      type: types.INSERT_TEXT,
      text
    }
  },
  insertTextEnd(count) {
    return {
      type: types.INSERT_TEXT_END,
      count
    }
  },
  computeScrollHeight() {
    return {
      type: types.COMPUTE_SCROLL_HEIGHT
    }
  },
  showKeyboard() {
    return {
      type: types.SHOW_KEYBOARD
    }
  },
  hideKeyboard() {
    return {
      type: types.HIDE_KEYBOARD
    }
  },
  showVoice() {
    return {
      type: types.SHOW_VOICE
    }
  },
  hideVoice() {
    return {
      type: types.HIDE_VOICE
    }
  },
  showMaskOut() {
    return {
      type: types.SHOW_MASKOUT
    }
  },
  hideMaskOut() {
    return {
      type: types.HIDE_MASKOUT
    }
  },
  cancelVoiceSend(bool) {
    return {
      type: types.CANCEL_VOICE_SEND,
      bool
    }
  }
}

export default actions
