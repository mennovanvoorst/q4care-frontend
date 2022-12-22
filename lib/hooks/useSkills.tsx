import useSWR from 'swr'
import { SERVER_BASE_URL } from '../utils/constant';
import fetcher from '../utils/fetcher';

export const useSkills = () => {
  const { data, error, isLoading } = useSWR(`${SERVER_BASE_URL}/v1/skills`, fetcher);

  return {
    skills: data,
    isLoading,
    error
  }
}

export default useSkills;