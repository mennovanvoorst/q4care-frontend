import Head from "next/head";
import Image from "next/image";
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import FullWidthLayout from "../../components/common/FullWidthLayout";
import Logo from "../../public/images/logo.png";

const Login = () => (
  <>
    <Head>
      <title>Login | Q4Care</title>
    </Head>
    <div className="bg-slate-700 p-16 text-center w-full md:w-1/4">
      <Image src={Logo} alt="Q4Care" height={96} className="mx-auto mb-8" />
      
      <div className="mb-8 font-medium text-xl">Inloggen met email</div>
      <div className="w-full mx-auto"><LoginForm /></div>
    </div>
  </>
);

Login.getLayout = function(page: JSX.Element) {
  return <FullWidthLayout>{page}</FullWidthLayout>;
};

export default Login;