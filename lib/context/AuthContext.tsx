import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../../components/common/Spinner';
import useUser from '../hooks/useUser';
import storeActions from './store-actions';
import { useStore } from './StoreContext';

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props): JSX.Element => {
    const { user, isLoading, error } = useUser();
    const router = useRouter();

    useEffect(() => {
      if(isLoading) return;
      
      if(error && !router.pathname.includes("auth")) router.push("/auth/login");
    }, [isLoading])

  if(isLoading && !error && !user) return <div className="bg-slate-800 min-h-screen text-slate-200 font-roboto flex items-center justify-center"><Spinner size="lg" /></div>

  return <>{children}</>;
};

export default AuthProvider;