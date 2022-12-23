import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/common/Layout";
import Head from 'next/head'
import { IconContext } from 'react-icons';
import AuthProvider from '../lib/context/AuthContext';
import { StoreProvider } from '../lib/context/StoreContext';
import 'react-quill/dist/quill.snow.css';
import { NextPage } from 'next';

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
  layout?: React.ComponentType
}

type Props = AppProps & {
  Component: Page
}

const MyApp = ({ Component, pageProps }: Props) => {
  const renderWithLayout =
    Component.getLayout ||
    function (page: JSX.Element) {
      return <Layout>{page}</Layout>;
    };

  return (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
    </Head>
    <StoreProvider>
      <AuthProvider>
        <IconContext.Provider value={{ size: 'auto' }}>
          { renderWithLayout(<Component {...pageProps} />) }
        </IconContext.Provider>
      </AuthProvider>
    </StoreProvider>
  </>
)}

export default MyApp
