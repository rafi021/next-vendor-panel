'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import ReactPaginate from 'react-paginate';

type PaginatedPropsDef = {
  total: number;
  perPage: number;
  activePage: number;
  onChange?: (page: number) => void;
};

/**
 * Pagination Component
 */
export default function PaginateAction({
  total,
  perPage,
  onChange,
  activePage,
}: PaginatedPropsDef) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );
  const pageCount = Math.ceil(total / perPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    // event.preventDefault();
    // if (selected !== page && list.includes(selected)) {
    setPage(event.selected + 1);
    // }
    // onChange(event.selected + 1);
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const PreviousButton = () => {
    return (
      <>
        <span
          className={`${activePage == 1 && 'cursor-not-allowed text-gray-300'} flex items-center justify-center mr-space12`}
        >
          <ArrowLeft />
          {/* Previous */}
        </span>
      </>
    );
  };

  const NextButton = () => {
    return (
      <>
        <span
          className={`${pageCount == activePage && 'cursor-not-allowed text-gray-300'} flex items-center justify-center ml-space12`}
        >
          {/* Next */}
          <ArrowRight />
        </span>
      </>
    );
  };

  return (
    total > perPage && (
      <div className="flex justify-center items-center w-full rounded-b-lg border border-gray-200 bg-white">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<NextButton />}
          previousLabel={<PreviousButton />}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          initialPage={activePage - 1}
          renderOnZeroPageCount={null}
          onPageChange={handlePageClick}
          // containerClassName="max-w-[92vw] bg-red-500"
          // className="bg-white rounded-lg w-full flex justify-center items-center p-space12 md:gap-space16"
          className="flex items-center justify-between"
          pageLinkClassName="py-space4 md:py-space8 px-space8 md:px-space12 text-xs md:text-sm font-medium text-black"
          activeLinkClassName="bg-gray-100 text-black py-space4 md:py-space8 px-space8 md:px-space12 rounded-lg"
          nextLinkClassName={`py-space4 md:py-space8 px-space8 md:px-space12 rounded-md text-sm font-medium bg_primary text_white ml-space8`}
          previousLinkClassName={`py-space4 md:py-space8 px-space8 md:px-space12 rounded-md text-sm font-medium bg_primary text_white mr-space8`}
        />
      </div>
    )
  );
}
