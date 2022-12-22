import useSWR from 'swr'
import { SERVER_BASE_URL } from '../utils/constant';
import fetcher from '../utils/fetcher';

export const useUser = () => {
  const { data, error, isLoading } = useSWR(`${SERVER_BASE_URL}/v1/users/@me`, fetcher);

  return {
    user: data,
    isLoading,
    error
  }
}

export const useUserSkills = (userId: string) => {
  const { data, error, isLoading } = useSWR(`${SERVER_BASE_URL}/v1/users/${userId}/skills`, fetcher);

  return {
    userSkills: data,
    isLoading,
    error
  }
}

export default useUser;