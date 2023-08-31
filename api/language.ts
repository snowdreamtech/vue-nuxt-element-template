
/**
 * List All Supported Languages
 * @param lang local name for languages with lang
 * @returns languages
 */
export function languages(lang?: string) {
  const api = useAPI()

  return api('/languages', {
    query: { lang: lang },
    method: 'get',
  })
}