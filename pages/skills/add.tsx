import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../../components/common/Heading';
import Button from '../../components/common/Button';
import Link from 'next/link';
import ResourceFiles from '../../components/resource/ResourceFiles';
import SkillForm from '../../components/skills/SkillForm';
import PageHeader from '../../components/common/PageHeader';
import { useRouter } from 'next/router';

const AddSkill: NextPage = () => {
  return (
  <>
    <Head>
      <title>Vaardigheid toevoegen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal vaardigheid toevoegen"
      />
    </Head>
    <div className="">
      <PageHeader title="Vaardigheid toevoegen"><Link href="/skills"><Button variant="secondary" rounded>Terug naar vaardigheden</Button></Link></PageHeader>
      <div className='w-1/2 mt-4'><SkillForm /></div>
    </div>
  </>
)
  }

export default AddSkill;
