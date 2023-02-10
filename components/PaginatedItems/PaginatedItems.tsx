import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (offset: number, endOffset: number) => void;
};

export const PaginatedItems = ({
  itemsPerPage,
  totalItems,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    handlePageClick({ selected: 0 });
  }, []);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * itemsPerPage) % totalItems;
    onPageChange(newOffset, newOffset + itemsPerPage);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Volgende >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< Vorige"
      className="flex w-full justify-between items-center mt-4"
      pageLinkClassName="p-4 inline-block py-2 rounded-lg mx-2 hover:bg-slate-600"
      activeLinkClassName="bg-slate-700"
      nextClassName="grow text-right"
      previousClassName="grow text-left"
      previousLinkClassName="px-4 py-2 inline-block rounded-lg hover:bg-slate-600"
      nextLinkClassName="px-4 py-2 inline-block rounded-lg hover:bg-slate-600"
    />
  );
};
