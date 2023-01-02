import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../../components/common/Heading';
import Button from '../../components/common/Button';
import ResourceAPI from '../../lib/api/resources';
import Link from 'next/link';
import ResourceFiles from '../../components/resource/ResourceFiles';
import PageHeader from '../../components/common/PageHeader';
import { IoPencil } from 'react-icons/io5';

type Params = {
  params: {
    id: string;
  }
}

type Props = {
  id: string;
  title: string;
  body: string;
  files: string[];
}

const Resource: NextPage<Props> = ({ id, title, body, files }) => {
  return (
  <>
    <Head>
      <title>Leermiddelen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal leermiddelen"
      />
    </Head>
    <div className="">
      <PageHeader title={title}>
        <Link href="/resources"><Button variant="secondary" rounded>Terug naar leermiddelen</Button></Link>
        <Link href={`/resources/edit/${id}`}><Button variant="primary" rounded startIcon={<IoPencil />}>Aanpassen</Button></Link>
      </PageHeader>
      <div className="mt-4">
        <div
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>

      { files.length > 0 && <ResourceFiles files={files} />}
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

export default Resource;
