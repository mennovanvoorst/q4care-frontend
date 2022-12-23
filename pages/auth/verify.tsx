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
    if(!("token" in router.query)) {
      setAlert({ type: "error", message: "We konden je token niet valideren."});
      setLoading(false);
      
      return;
    }

    handleTokenSubmit();
  }, [router.query]);

  const handleTokenSubmit = async () => {
    try {
      const token = router.query.token as string;
      const response = await AuthAPI.verifyToken(token);

      setAlert({ type: 'success', message: "Je bent succesvol ingelogd! Je wordt automatisch redirected naar de homepage." });
      setTimeout(() => router.push('/'), 1000);
    } catch(e: any) {
      const err = e as Error;
      const acceptedErrors = ["INVALID_ARGUMENT", "RESOURCE_NOT_FOUND"]

      if(acceptedErrors.includes(err.code)) {
        if(err.code === "INVALID_ARGUMENT" && err.errors) Object.keys(err.errors).forEach(error => setAlert({ type: 'error', message: err.errors ? err.errors[error].message : ERROR_GENERIC }))
        if((err.code === "RESOURCE_NOT_FOUND" || err.code === "INVALID_ARGUMENT") && err.message) setAlert({ type: 'error', message: err.message });
      } else {
        setAlert({ type: 'error', message: ERROR_GENERIC });
      }
    } finally {
      setLoading(false);
    }
  }

  const renderLoadingScreen = () => (
    <>
      <Spinner size="lg" className="mx-auto mb-4" />
      <div className="font-medium text-xl">Inlogcode verifiëren...</div>
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
        <title>Verify token | Q4Care</title>
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