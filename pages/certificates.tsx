import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../components/common/Heading';
import { useUser, useUserSkills } from '../lib/hooks/useUser';
import { IoAdd, IoDocumentOutline } from "react-icons/io5";
import CertificateCard from '../components/certificates/CertificateCard';
import Spinner from '../components/common/Spinner';
import { format } from "date-fns";
import UserAPI from '../lib/api/user';
import Alert, { AlertVariants } from "../components/common/Alert";
import { ALERT_BASE, ERROR_GENERIC } from "../lib/utils/constant";
import { useState } from 'react';
import fileDownload from 'js-file-download';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';

const Certificates: NextPage = () => {
    const { user, isLoading: userLoading, error } = useUser();
    const { userSkills = [], isLoading: skillsLoading, error: skillsError } = useUserSkills(user.id);
  const [alert, setAlert] = useState<{ type: AlertVariants, message: string }>(ALERT_BASE);
  const [isLoading, setLoading] = useState<null | string>(null);
  
  const handleCertificateDownload = async (skillId: string) => {
    if(isLoading) return;

    try {
      setLoading(skillId);
      const response = await UserAPI.getCertificateForSkill(user.id, skillId);

      fileDownload(response.data, "certificate.pdf")
    } catch(e: any) {
      setAlert({ type: 'error', message: ERROR_GENERIC });
    } finally {
      setLoading(null);
    }
  }

  const renderList = () => {
    if(userLoading || skillsLoading) return <Spinner />

    if(userSkills.length === 0) return <p>Je hebt nog geen vaardigheden behaald.</p>

    return userSkills.map((skill: any) => <CertificateCard loading={isLoading === skill.id} title={skill.name} description={`Behaald op: ${format(new Date(skill.achievementDate), "dd-MM-yyy")}`} icon={<IoDocumentOutline />} onClick={() => handleCertificateDownload(skill.id)}  />)
  }


  return (
  <>
    <Head>
      <title>Certificaten | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal certificaten"
      />
    </Head>
    <div className="">
      <PageHeader title="Certificaten" />
      <ul className="flex gap-4 flex-col mt-4">{renderList()}</ul>
    </div>
  </>
)
  }

export default Certificates;
