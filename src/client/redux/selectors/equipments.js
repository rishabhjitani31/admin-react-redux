export const sortDefaultIssuesList = defaultIssuesList => {
  return defaultIssuesList.sort((a, b) => {
    if (a.date_created > b.date_created) {
      return -1
    }
    if (a.date_created < b.date_created) {
      return 1
    }
    return 0
  })
}
