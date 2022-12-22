import useSWR from 'swr'
import { SERVER_BASE_URL } from '../utils/constant';
import fetcher from '../utils/fetcher';

export const useResources = () => {
  const { data, error, isLoading } = useSWR(`${SERVER_BASE_URL}/v1/resources`, fetcher);

  return {
    resources: data,
    isLoading,
    error
  }
}

export const useResource = () => {
  const { data, error, isLoading } = useSWR(`${SERVER_BASE_URL}/v1/resources/`, fetcher);

  return {
    resources: data,
    isLoading,
    error
  }
}

export default useResources;