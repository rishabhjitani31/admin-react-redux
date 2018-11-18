import service from 'api/releaseNoteService'
import {
  GET_RELEASE_NOTE_DATA,
  GET_RELEASE_NOTE_VISIBLE,
  SET_RELEASE_NOTE_DESCRIPTION
} from 'constants/releaseNote'
export const getReleaseNoteList = () => {
  return {
    type: GET_RELEASE_NOTE_DATA,
    promise: service.getReleaseNoteList()
  }
}
export const getReleaseNoteVisible = (visible, record) => {
  return {
    type: GET_RELEASE_NOTE_VISIBLE,
    visible,
    record
  }
}
export const setReleaseNoteDescription = description => {
  return {
    type: SET_RELEASE_NOTE_DESCRIPTION,
    description
  }
}
