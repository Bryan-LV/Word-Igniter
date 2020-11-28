import VocabTypes from './VocabTypes';
import VocabState from './VocabState';

const VocabReducer = function (state = VocabState, action) {
  switch (action.type) {
    case VocabTypes.SET_WORDS:
      return ({ words: action.payload });
    default:
      return state;
  }
}
export default VocabReducer;