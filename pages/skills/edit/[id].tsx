import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../../../components/common/Heading';
import Button from '../../../components/common/Button';
import Link from 'next/link';
import ResourceFiles from '../../../components/resource/ResourceFiles';
import SkillForm from '../../../components/skills/SkillForm';
import PageHeader from '../../../components/common/PageHeader';
import { useRouter } from 'next/router';
import SkillApi from '../../../lib/api/skills';

type Params = {
  params: {
    id: string;
  }
}  

type Props = {
  id: string;
  name: string;
}

const EditSkill: NextPage<Props> = ({ id, name }) => {
  return (
  <>
    <Head>
      <title>Vaardigheid aanpassen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal vaardigheid aanpassen"
      />
    </Head>
    <div className="">
      <PageHeader title={`Vaardigheid "${name}" aanpassen`}><Link href="/skills"><Button variant="secondary" rounded>Terug naar vaardigheden</Button></Link></PageHeader>
      <div className='w-1/2 mt-4'><SkillForm defaultSkill={{ id, name }} /></div>
    </div>
  </>
)
  }

  export async function getStaticProps({ params }: Params) {
  const skillId = params.id;
  const { id, name } = await SkillApi.getById(skillId);
  
  return {
    props: {
      id,
      name,
    },
  }
}

export async function getStaticPaths() {
  const skills = await SkillApi.list();

  return {
    paths: skills.map((skill: any) => ({ params: { id: skill.id } })),
    fallback: false,
  }
}


export default EditSkill;
