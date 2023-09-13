export function getList (params: any) {
  const api = useAPI()

  return api('/tables', {
    method: 'get',
    params
  })
}
