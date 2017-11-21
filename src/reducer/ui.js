import immutable from 'immutable';

const initialState = immutable.fromJS({
    showFooder: false,
    computeScroll: false,
    showEmoji: false,
    showEmojiBtn: false,
    keyboardIcon: false,
    keyboardShow: false,
    voiceShow: false,
    maskOutShow: false,
    voiceCancle: false,
    insertTexts: []
});
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FOODER_OPEN':
      return state.set('showFooder', true).set('computeScroll',true)
    case 'SET_FOODER_CLOSE':
      return state.set('showFooder', false).set('computeScroll',false)
    case 'SHOW_EMOJIPICKER':
      return state.set('showEmoji', true)
    case 'CLOSE_EMOJIPICKER':
      return state.set('showEmoji', false)
    case 'SHOW_EMOJIBTN':
      return state.set('showEmojiBtn', true)
    case 'CLOSE_EMOJIBTN':
      return state.set('showEmojiBtn', false)
    case 'SHOW_KEYBOARD_ICON':
      return state.set('keyboardIcon', true)
    case 'HIDE_KEYBOARD_ICON':
      return state.set('keyboardIcon', false)
    case 'INSERT_TEXT':
      return state.update('insertTexts', insertTexts => insertTexts.push(action.text))
    case 'INSERT_TEXT_END': 
      return state.update('insertTexts', insertTexts => insertTexts.slice(action.count));
    case 'COMPUTE_SCROLL_HEIGHT': 
      return state.set('computeScroll',!state.get('computeScroll'))
    case 'SHOW_KEYBOARD': 
      return state.set('keyboardShow',true)
    case 'HIDE_KEYBOARD': 
      return state.set('keyboardShow',false)
    case 'SHOW_VOICE': 
      return state.set('voiceShow',true)
    case 'HIDE_VOICE': 
      return state.set('voiceShow',false)
    case 'SHOW_MASKOUT': 
      return state.set('maskOutShow',true)
    case 'HIDE_MASKOUT': 
      return state.set('maskOutShow',false)
    case 'CANCEL_VOICE_SEND': 
      return state.set('voiceCancle',action.bool)
    default:
      return state
  }
}
export default reducer;
