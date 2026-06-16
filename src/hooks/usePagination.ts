import React from "react";

export default function usePagination<T>(
  data: T[],
  itemsPerPage = 10
) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    currentData,
    setCurrentPage,
  };
}