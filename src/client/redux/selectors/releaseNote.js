export const sortReleaseNotes = releaseNoteList => {
  return releaseNoteList.sort((a, b) => {
    if (a.release_date > b.release_date) {
      return -1
    }
    if (a.release_date < b.release_date) {
      return 1
    }
    return 0
  })
}
