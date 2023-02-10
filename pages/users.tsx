import type { NextPage } from "next";
import Head from "next/head";
import UserAPI from "../lib/api/user";
import UserCard from "../components/users/UserCard";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import checkRole from "../lib/utils/checkRole";
import { USER_ROLES } from "../lib/utils/constant";
import { useState } from "react";
import { PaginatedItems } from "../components/PaginatedItems/PaginatedItems";
import { SearchBar } from "../components/SearchBar/SearchBar";

const Users: NextPage = ({ users }: any) => {
  const [displayedItems, setDisplayedItems] = useState(users);
  const [offset, setOffset] = useState([0, 0]);

  const renderList = () => {
    const paginatedUsers = displayedItems.slice(offset[0], offset[1]);
    if (paginatedUsers.length === 0)
      return <p>Er zijn geen gebruikers om weer te geven.</p>;

    return paginatedUsers.map((user: any) => (
      <UserCard
        key={user.id}
        id={user.id}
        name={`${user.firstName} ${user.lastName}`}
        email={user.email}
        hasPaid={
          checkRole(user.flags, USER_ROLES.paid) ||
          checkRole(user.flags, USER_ROLES.student)
        }
        isTeacher={checkRole(user.flags, USER_ROLES.teacher)}
        isAdministrator={checkRole(user.flags, USER_ROLES.admin)}
      />
    ));
  };

  const handlePageChange = (offset: number, endOffset: number) =>
    setOffset([offset, endOffset]);

  const handleSearchChange = (filteredSkills: any[]) =>
    setDisplayedItems(filteredSkills);

  return (
    <>
      <Head>
        <title>Gebruikers | Q4Care</title>
        <meta name="description" content="Q4Care student portal gebruiker" />
      </Head>
      <div className="">
        <PageHeader title="Gebruikers">
          <SearchBar items={users} onChange={handleSearchChange} />

          <Link href="/users/add">
            <Button variant="primary" rounded startIcon={<IoAdd />}>
              Toevoegen
            </Button>
          </Link>
        </PageHeader>
        <ul className="flex gap-4 flex-col mt-4">{renderList()}</ul>

        <PaginatedItems
          itemsPerPage={1}
          totalItems={displayedItems.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const users = await UserAPI.list();

  return {
    props: {
      users,
    },
  };
}

export default Users;
