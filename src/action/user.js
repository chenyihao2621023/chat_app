import * as types from '../action_types'
const actions = {
  setMessages(messageList) {
    return {
      type: types.SET_MESSAGES,
      messageList
    }
  }
}

export default actions
