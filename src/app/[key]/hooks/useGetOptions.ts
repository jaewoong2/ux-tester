import useSWR, { Fetcher } from 'swr'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { Database } from '../../../types/supabase'

type Props = {
  itemId?: number | null
}

type Data = PostgrestSingleResponse<Database['public']['Tables']['option']['Row'][]>

const fetcher: Fetcher<Data, string> = (url) => fetch(url, { method: 'GET' }).then((res) => res.json())

const useGetOptions = ({ itemId }: Props) => {
  const { data, ...rest } = useSWR(`api/options?itemId=${itemId}`, fetcher, { suspense: true })

  return {
    data: data?.data,
    ...rest,
  }
}

export default useGetOptions
