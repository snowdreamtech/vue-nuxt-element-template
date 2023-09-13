const serverResponse = (code :string = 'SUCCESS', message : string = '', data :any = '') => {
  const response = {
    version: '0.1',
    code,
    message,
    data,
    timestamp: Date.now()
  }

  return response
}

export default serverResponse
