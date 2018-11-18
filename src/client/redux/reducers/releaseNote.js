import {
  GET_RELEASE_NOTE_DATA_FAILURE,
  GET_RELEASE_NOTE_DATA_REQUEST,
  GET_RELEASE_NOTE_DATA_SUCCESS,
  GET_RELEASE_NOTE_VISIBLE,
  SET_RELEASE_NOTE_DESCRIPTION,
  GET_VERSION_NO
} from 'constants/releaseNote'

const releaseNote = (
  state = {
    isFetching: false,
    releaseNoteList: [],
    error: null,
    visible: false,
    record: null,
    description: '',
    version: '--'
  },
  action
) => {
  switch (action.type) {
    case GET_RELEASE_NOTE_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_RELEASE_NOTE_DATA_SUCCESS:
      return {
        ...state,
        releaseNoteList: action.response.data || [],
        version: action.response.version || '--',
        isFetching: false
      }
    case GET_VERSION_NO:
      return {
        ...state,
        version: action.value || '--'
      }
    case GET_RELEASE_NOTE_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_RELEASE_NOTE_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    case SET_RELEASE_NOTE_DESCRIPTION:
      return { ...state, description: action.description }
    default:
      return state
  }
}

export default releaseNote
