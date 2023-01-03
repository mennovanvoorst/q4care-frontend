import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../components/common/Heading';
import { useUser, useUserPayments, useUserSkills } from '../lib/hooks/useUser';
import { IoAdd, IoDocumentOutline } from "react-icons/io5";
import Spinner from '../components/common/Spinner';
import { format } from "date-fns";
import Alert, { AlertVariants } from "../components/common/Alert";
import { ALERT_BASE, ERROR_GENERIC } from "../lib/utils/constant";
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import PaymentTable from '../components/payments/PaymentTable';

const Payments: NextPage = () => {
    const { user, isLoading: userLoading, error } = useUser();
    const { userPayments = [], isLoading: paymentsLoading, error: paymentsError } = useUserPayments(user.id);
  const [alert, setAlert] = useState<{ type: AlertVariants, message: string }>(ALERT_BASE);
  const [isLoading, setLoading] = useState<null | string>(null);

  const renderList = () => {
    if(userLoading || paymentsLoading) return <Spinner />

    if(userPayments.length === 0) return <tr><td>Je hebt nog geen transacties gemaakt.</td></tr>

    return userPayments.map((payment: any) => <PaymentTable currency={payment.currency} value={payment.value} description={payment.product.description} date={format(new Date(payment.paymentDate), "dd-MM-yyyy HH:mm:ss")} expirationDate={format(new Date(payment.expirationDate), "dd-MM-yyyy")} status={payment.status}  />)
  }


  return (
  <>
    <Head>
      <title>Transacties | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal transacties"
      />
    </Head>
    <div className="">
      <PageHeader title="Transacties" />
      <table className="table-fixed w-full text-left">
        <thead>
            <tr>
                <th>Omschrijving</th>
                <th>Bedrag</th>
                <th>Status</th>
                <th>Betaaldatum</th>
                <th>Verloopt op</th>
            </tr>
        </thead>
        <tbody>
            {renderList()}
        </tbody>
        </table>
    </div>
  </>
)
  }

export default Payments;