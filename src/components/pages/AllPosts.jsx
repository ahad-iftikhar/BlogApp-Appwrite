import React, { useCallback, useEffect, useState } from "react";
import { Query } from "appwrite";
import { Container, Input, PostCard } from "../inedx";
import service from "../../appwrite/config";
import Pagination from "../Pagination";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const userData = useSelector((state) => state.userData);

  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);
  const [pagedPosts, setPagedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGESIZE = 12;

  useEffect(() => {
    service
      .getPosts([Query.equal("userId", `${userData.$id}`)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          setSearchPosts(posts.documents);
          if (pagedPosts.length === 0) {
            setPagedPosts(getPagedData(posts.documents));
          }
        }
      });
  }, []);

  useEffect(() => {
    setSearchPosts(
      posts.filter((post) => post.title.includes(searchValue.toLowerCase()))
    );
    if (searchValue === "") {
      setSearchPosts(posts);
    }
  }, [searchValue]);

  useEffect(() => {
    setPagedPosts(getPagedData(posts, currentPage));
  }, [currentPage, posts]);

  const getPagedData = useCallback(
    (posts, currentPage) => {
      const startIndex = (currentPage - 1) * PAGESIZE;
      let arr = posts.slice(startIndex, startIndex + PAGESIZE);
      return arr;
    },
    [currentPage]
  );

  return (
    <div className="w-full py-8">
      <div className="w-[80%] m-auto pb-8">
        <Input
          placeholder="Search"
          className=""
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Container>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchValue
            ? searchPosts.map((post) => (
                <div key={post.$id} className="p-2 grid-span-1">
                  <PostCard {...post} />
                </div>
              ))
            : pagedPosts.map((post) => (
                <div key={post.$id} className="p-2 grid-span-1">
                  <PostCard {...post} />
                </div>
              ))}
        </div>
      </Container>

      {!searchValue && (
        <Pagination
          posts={posts}
          pageSize={PAGESIZE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AllPosts;
