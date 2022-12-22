import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../../components/common/Button';
import Link from 'next/link';
import PageHeader from '../../components/common/PageHeader';
import ResourceForm from '../../components/resource/ResourceForm';

const AddResource: NextPage = () => {
  return (
  <>
    <Head>
      <title>Leermiddel toevoegen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal leermiddel toevoegen"
      />
    </Head>
    <div className="">
      <PageHeader title="Leermiddel toevoegen"><Link href="/resources"><Button variant="secondary" rounded>Terug naar leermiddelen</Button></Link></PageHeader>
      <div className='w-1/2 mt-4'><ResourceForm /></div>
    </div>
  </>
)
  }

export default AddResource;
