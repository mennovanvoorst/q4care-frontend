import type { NextPage } from "next";
import Head from "next/head";
import Heading from "../components/common/Heading";
import { format } from "date-fns";
import Alert, { AlertVariants } from "../components/common/Alert";
import { ALERT_BASE, ERROR_GENERIC } from "../lib/utils/constant";
import { useEffect, useState } from "react";
import ResourceCard from "../components/resources/ResourceCard";
import SkillApi from "../lib/api/skills";
import SkillCard from "../components/skills/SkillCard";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import { PaginatedItems } from "../components/PaginatedItems/PaginatedItems";
import { SearchBar } from "../components/SearchBar/SearchBar";

const Skills: NextPage = ({ skills }: any) => {
  const [displayedItems, setDisplayedItems] = useState(skills);
  const [offset, setOffset] = useState([0, 0]);

  const renderList = () => {
    const paginatedSkills = displayedItems.slice(offset[0], offset[1]);
    if (paginatedSkills.length === 0)
      return <p>Er zijn geen vaardigheden om weer te geven.</p>;

    return paginatedSkills.map((skill: any) => (
      <SkillCard key={skill.id} id={skill.id} name={skill.name} />
    ));
  };

  const handlePageChange = (offset: number, endOffset: number) =>
    setOffset([offset, endOffset]);

  const handleSearchChange = (filteredSkills: any[]) =>
    setDisplayedItems(filteredSkills);

  return (
    <>
      <Head>
        <title>Vaardigheden | Q4Care</title>
        <meta name="description" content="Q4Care student portal vaardigheden" />
      </Head>
      <div className="">
        <PageHeader title="Vaardigheden">
          <SearchBar items={skills} onChange={handleSearchChange} />

          <Link href="/skills/add">
            <Button variant="primary" rounded startIcon={<IoAdd />}>
              Toevoegen
            </Button>
          </Link>
        </PageHeader>
        <ul className="flex gap-4 flex-col mt-4">{renderList()}</ul>

        <PaginatedItems
          itemsPerPage={10}
          totalItems={displayedItems.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const skills = await SkillApi.list();

  return {
    props: {
      skills,
    },
  };
}

export default Skills;
