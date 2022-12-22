import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FullWidthLayout from "../../components/common/FullWidthLayout";
import Spinner from "../../components/common/Spinner";
import { ALERT_BASE, ERROR_GENERIC } from "../../lib/utils/constant";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import AuthAPI from "../../lib/api/auth";
import { Error } from "../../lib/utils/types";

const Verify = () => { 
  const [isLoading, setLoading] = useState(true);
  const [alert, setAlert] = useState(ALERT_BASE);
  const router = useRouter();

  useEffect(() => {
    handleLogout();
  }, [router.query]);

  const handleLogout = async () => {
    try {
      const response = await AuthAPI.logout();

      setAlert({ type: 'success', message: "Je bent succesvol uitgelogd! Je wordt automatisch redirected naar de homepage." });
      setTimeout(() => router.push('/auth/login'), 1000);
    } catch(e: any) {
      const err = e as Error;
      setAlert({ type: 'error', message: ERROR_GENERIC });
    } finally {
      setLoading(false);
    }
  }

  const renderLoadingScreen = () => (
    <>
      <Spinner size="lg" className="mx-auto mb-4" />
      <div className="font-medium text-xl">We zijn je aan het uitloggen...</div>
    </>
  )

  const renderAlertScreen = () => (
      <>
        <div className="w-16 h-16 mx-auto">{ alert.type === "success" ? <IoCheckmarkCircle /> : <IoCloseCircle />}</div>
        <div className="font-medium text-xl">{ alert.message }</div>
      </>
    )

  return (
    <>
      <Head>
        <title>Uitloggen | Q4Care</title>
      </Head>
      <div className="bg-slate-700 p-16 text-center w-full md:w-1/4">
        <div className="w-full mx-auto">
          {isLoading ? renderLoadingScreen() : renderAlertScreen() }
        </div>
      </div>
    </>
  );
}

Verify.getLayout = function(page: JSX.Element) {
  return <FullWidthLayout>{page}</FullWidthLayout>;
};

export default Verify;