

const baseUrl = 'http://personio-fe-test.herokuapp.com'

export const getCandidates = async () => {
  const result = await fetch(`${baseUrl}/api/v1/candidates`)
  const response = await result.json()
  return response
}
