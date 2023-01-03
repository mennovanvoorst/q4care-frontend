import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '../components/common/Card';
import Heading from '../components/common/Heading';
import checkRole from '../lib/utils/checkRole';
import useUser from '../lib/hooks/useUser';
import { ALERT_BASE, ERROR_GENERIC, USER_ROLES } from '../lib/utils/constant';
import PaymentModal from '../components/home/PaymentModal';
import Spinner from '../components/common/Spinner';
import { AlertVariants } from '../components/common/Alert';
import { useState } from 'react';

const Home: NextPage = () => {
  const { user, isLoading, error } = useUser();
  const [alert, setAlert] = useState<{ type: AlertVariants, message: string }>(ALERT_BASE);

  const handleError = (error: any) => 
        setAlert({ type: 'error', message: ERROR_GENERIC });

  return (
    <>
      <Head>
        <title>Dashboard | Q4Care</title>
        <meta
          name="description"
          content="Q4Care student portal"
        />
      </Head>
      <div>
        <Heading as="h1">Welkom bij Q4Care!</Heading>
        { user && (!checkRole(user.flags, USER_ROLES.paid) && !checkRole(user.flags, USER_ROLES.student)) && <PaymentModal userId={user.id} onError={handleError} />}
        <p>Hier kun je nog wat tekst of iets dergelijks kwijt.</p>
      </div>
    </>
  )
}

export default Home;
