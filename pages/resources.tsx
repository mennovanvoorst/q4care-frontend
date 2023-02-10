import type { NextPage } from "next";
import Head from "next/head";
import Heading from "../components/common/Heading";
import { IoAdd, IoDocumentOutline } from "react-icons/io5";
import Spinner from "../components/common/Spinner";
import { format } from "date-fns";
import Alert, { AlertVariants } from "../components/common/Alert";
import { ALERT_BASE, ERROR_GENERIC } from "../lib/utils/constant";
import { useEffect, useState } from "react";
import useResources from "../lib/hooks/useResources";
import ResourceCard from "../components/resources/ResourceCard";
import Button from "../components/common/Button";
import ResourceAPI from "../lib/api/resources";
import PageHeader from "../components/common/PageHeader";
import Link from "next/link";
import { PaginatedItems } from "../components/PaginatedItems/PaginatedItems";
import { SearchBar } from "../components/SearchBar/SearchBar";

const Resources: NextPage = ({ resources }: any) => {
  const [displayedItems, setDisplayedItems] = useState(resources);
  const [offset, setOffset] = useState([0, 0]);

  const renderList = () => {
    const paginatedResources = displayedItems.slice(offset[0], offset[1]);
    if (paginatedResources.length === 0)
      return <p>Er zijn nog geen leermiddelen toegevoegd.</p>;

    return paginatedResources.map((resource: any) => (
      <ResourceCard
        key={resource.id}
        id={resource.id}
        title={resource.title}
        description={`Toegevoegd op: ${format(
          new Date(resource.creationDate),
          "dd-MM-yyy"
        )}`}
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
        <title>Leermiddelen | Q4Care</title>
        <meta name="description" content="Q4Care student portal leermiddelen" />
      </Head>
      <div className="">
        <PageHeader title="Leermiddelen">
          <SearchBar items={resources} onChange={handleSearchChange} />

          <Link href="/resources/add">
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
  const resources = await ResourceAPI.list();

  return {
    props: {
      resources,
    },
  };
}

export default Resources;
