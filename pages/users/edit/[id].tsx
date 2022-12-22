import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../../../components/common/Button';
import Link from 'next/link';
import PageHeader from '../../../components/common/PageHeader';
import UserAPI from '../../../lib/api/user';
import UserForm from '../../../components/users/UserForm';
import SkillApi from '../../../lib/api/skills';

type Params = {
  params: {
    id: string;
  }
}  

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  flags: number;
  skills: any[];
  skillList: any[];
}

const EditUser: NextPage<Props> = ({ id, firstName, lastName, email, flags, skills, skillList }) => {
  return (
  <>
    <Head>
      <title>Gebruiker aanpassen | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal gebruiker aanpassen"
      />
    </Head>
    <div className="">
      <PageHeader title="Gebruiker aanpassen"><Link href={`/users`}><Button variant="secondary" rounded>Terug naar gebruikers</Button></Link></PageHeader>
      <div className='w-1/2 mt-4'><UserForm defaultUser={{ id, firstName, lastName, email, flags, skills }} /></div>
    </div>
  </>
)
  }

export async function getStaticProps({ params }: Params) {
  const id = params.id;
  const { firstName, lastName, email, flags } = await UserAPI.getById(id);
  const skills = await UserAPI.getSkillsById(id);
  
  return {
    props: {
      id,
      firstName, 
      lastName, 
      email,
      flags,
      skills
    },
  }
}

export async function getStaticPaths() {
  const users = await UserAPI.list();

  return {
    paths: users.map(user => ({ params: { id: user.id } })),
    fallback: false,
  }
}

export default EditUser;
