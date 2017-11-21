import immutable from 'immutable';

const initialState = immutable.fromJS({
  messageListData: []
});
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return state.set('messageListData', action.messageList)
    default:
      return state
  }
}
export default reducer;
