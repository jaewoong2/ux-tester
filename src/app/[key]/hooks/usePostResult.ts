import useSWRMutation, { MutationFetcher } from 'swr/mutation'
import { PrimaryItem } from '../../../types'

type ResultJson = Pick<PrimaryItem, 'optionValue' | 'itemKey'>

const fetcher: MutationFetcher<{ uuid: string; userId: string }, { json: ResultJson[]; nickname: string }, string> = (
  url,
  { arg }
) => fetch(url, { method: 'POST', cache: 'no-cache', body: JSON.stringify(arg) }).then((res) => res.json())

const usePostResult = () => {
  const { data, ...rest } = useSWRMutation('api/result', fetcher)

  return {
    data: data,
    ...rest,
  }
}

export default usePostResult
