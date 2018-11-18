export const mappedEsclationFlow = escalationFlowlist => {
  return escalationFlowlist.map(escslation => {
    return {
      full_name: `${escslation.first_name} ${escslation.last_name}`,
      ...escslation
    }
  })
}
