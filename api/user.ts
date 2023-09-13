export function register (data: any) {
  const api = useAPI()

  return api('/register', {
    method: 'post',
    body: data
  })
}

export function login (data: any) {
  const api = useAPI()

  return api('/login', {
    method: 'post',
    body: data
  })
}

export function getInfo (token: string) {
  const api = useAPI()

  return api('/info', {
    method: 'get',
    params: { token }
  })
}

export function logout () {
  const api = useAPI()

  return api('/logout', {
    method: 'post'
  })
}
