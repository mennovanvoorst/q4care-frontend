import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '../components/common/Card';
import Heading from '../components/common/Heading';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Dashboard | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal"
      />
    </Head>
    <div className=''>
      <Heading as="h1">Welkom bij Q4Care!</Heading>
      <p>Hier kun je nog wat tekst of iets dergelijks kwijt.</p>
    </div>
  </>
)

export default Home;
