import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../../../components/common/Button';
import Link from 'next/link';
import PageHeader from '../../../components/common/PageHeader';
import ResourceForm from '../../../components/resource/ResourceForm';
import ResourceAPI from '../../../lib/api/resources';

type Params = {
  params: {
    id: string;
  }
}  

type Props = {
  id: string;
  title: string;
  body: string;
  files: any[];
}

const EditResource: NextPage<Props> = ({ id, title, body, files }) => {
  return (
  <>
    <Head>
      <title>Leermiddel aanpassen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal leermiddel aanpassen"
      />
    </Head>
    <div className="">
      <PageHeader title="Leermiddel aanpassen"><Link href={`/resources/${id}`}><Button variant="secondary" rounded>Terug naar leermiddel</Button></Link></PageHeader>
      <div className='w-1/2 mt-4'><ResourceForm defaultResource={{ id, title, body, files }} /></div>
    </div>
  </>
)
  }

export async function getStaticProps({ params }: Params) {
  const id = params.id;
  const { title, body, files } = await ResourceAPI.getById(id);
  
  return {
    props: {
      id,
      title,
      body,
      files
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const resources = await ResourceAPI.list();

  return {
    paths: resources.map((resource: any) => ({ params: { id: resource.id } })),
    fallback: "blocking",
  }
}

export default EditResource;
