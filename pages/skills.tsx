import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../components/common/Heading';
import { format } from "date-fns";
import Alert, { AlertVariants } from "../components/common/Alert";
import { ALERT_BASE, ERROR_GENERIC } from "../lib/utils/constant";
import { useEffect, useState } from 'react';
import ResourceCard from '../components/resources/ResourceCard';
import SkillApi from '../lib/api/skills';
import SkillCard from '../components/skills/SkillCard';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';

const Skills: NextPage = ({ skills }: any) => {
  const renderList = () => {
    if(skills.length === 0) return <p>Er zijn nog geen vaardigheden toegevoegd.</p>

    return skills.map(skill => <SkillCard id={skill.id} name={skill.name} />)
  }


  return (
  <>
    <Head>
      <title>Leermiddelen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal vaardigheden"
      />
    </Head>
    <div className="">
      <PageHeader title="Vaardigheden"><Link href="/skills/add"><Button variant="primary" rounded startIcon={<IoAdd />}>Toevoegen</Button></Link></PageHeader>
      <ul className="flex gap-4 flex-col mt-4">{renderList()}</ul>
    </div>
  </>
)
  }

export async function getStaticProps() {
  const skills = await SkillApi.list();
  
  return {
    props: {
      skills,
    },
  }
}

export default Skills;
