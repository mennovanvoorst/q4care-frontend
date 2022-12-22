import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../../components/common/Button';
import Link from 'next/link';
import PageHeader from '../../components/common/PageHeader';
import UserForm from '../../components/users/UserForm';

const AddResource: NextPage = () => {
  return (
  <>
    <Head>
      <title>Gebruiker toevoegen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal gebruiker toevoegen"
      />
    </Head>
    <div className="">
      <PageHeader title="Gebruiker toevoegen"><Link href="/users"><Button variant="secondary" rounded>Terug naar gebruikers</Button></Link></PageHeader>
      <div className='w-1/2 mt-4'><UserForm /></div>
    </div>
  </>
)
  }
export default AddResource;
