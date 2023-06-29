import useSWRMutation, { MutationFetcher } from 'swr/mutation'

const fetcher: MutationFetcher<{ message: string; status: number }, { nickname: string }, string> = (url, { arg }) =>
  fetch(url + `?nickname=${arg.nickname}`, { method: 'POST', body: JSON.stringify(arg) }).then((res) => res.json())
const useGetNickname = () => {
  return useSWRMutation('api/nickname', fetcher)
}

export default useGetNickname
