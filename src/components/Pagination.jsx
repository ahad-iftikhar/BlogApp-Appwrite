import React, { useEffect, useState } from "react";

const Pagination = ({ posts = [], pageSize, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState([]);
  const pagesCount = Math.ceil(posts.length / pageSize);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= pagesCount; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [pageSize, posts]);

  return (
    <div className="flex flex-row w-full justify-center pt-8">
      {pages.map((page) => (
        <div
          key={page}
          className={`border-[1px] border-black w-8 text-center cursor-pointer ${
            currentPage === page ? "bg-blue-400" : "bg-white"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
