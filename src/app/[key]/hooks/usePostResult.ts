import { PrimaryItem } from '@/types'
import useSWRMutation, { MutationFetcher } from 'swr/mutation'

type ResultJson = Pick<PrimaryItem, 'optionValue' | 'itemKey'>

const fetcher: MutationFetcher<{ uuid: string }, ResultJson[], string> = (url, { arg }) =>
  fetch(url, { method: 'POST', cache: 'no-cache', body: JSON.stringify(arg) }).then((res) => res.json())

const usePostResult = () => {
  const { data, ...rest } = useSWRMutation('api/result', fetcher)

  return {
    data: data,
    ...rest,
  }
}

export default usePostResult
