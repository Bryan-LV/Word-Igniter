import VocabTypes from './VocabTypes';
import { VocabState } from './VocabState';

const VocabReducer = function (state = VocabState, action) {
  switch (action.type) {
    case VocabTypes.ADD_WORD:
      return;
    case VocabTypes.DELETE_WORD:
      return;
    case VocabTypes.EDIT_WORD:
      return;
    default:
      return state;
  }
}
export default VocabReducer;