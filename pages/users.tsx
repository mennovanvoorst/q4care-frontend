import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../components/common/Heading';
import UserAPI from '../lib/api/user';
import UserCard from '../components/users/UserCard';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import checkRole from '../lib/utils/checkRole';
import { USER_ROLES } from '../lib/utils/constant';

const Users: NextPage = ({ users }: any) => {
  const renderList = () => {
    if(users.length === 0) return <p>Er zijn nog geen vaardigheden toegevoegd.</p>

    return users.map((user: any) => <UserCard id={user.id} name={`${user.firstName} ${user.lastName}`} email={user.email} isTeacher={checkRole(user.flags, USER_ROLES.teacher)} isAdministrator={checkRole(user.flags, USER_ROLES.admin)} />)
  }


  return (
  <>
    <Head>
      <title>Gebruikers | Q4Care</title>
      <meta
        name="description"
        content="Q4Care student portal gebruiker"
      />
    </Head>
    <div className="">
      <PageHeader title="Gebruikers"><Link href="/users/add"><Button variant="primary" rounded startIcon={<IoAdd />}>Toevoegen</Button></Link></PageHeader>
      <ul className="flex gap-4 flex-col mt-4">{renderList()}</ul>
    </div>
  </>
)
  }

export async function getStaticProps() {
  const users = await UserAPI.list();
  
  return {
    props: {
      users,
    },
  }
}

export default Users;
