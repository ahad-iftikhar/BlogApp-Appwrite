import React, { useCallback, useEffect, useState } from "react";
import { Query } from "appwrite";
import service from "../../appwrite/config";
import { Container, PostCard } from "../inedx";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.status);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    service
      .getPosts([
        Query.equal("status", "active"),
        userStatus ? Query.equal("userId", `${userData.$id}`) : null,
      ])
      .then((posts) => {
        if (posts) {
          setPosts(getRecentPosts(posts.documents));
        }
      });
  }, []);

  const getRecentPosts = useCallback((posts) => {
    let arr = [];
    if (posts.length >= 4) {
      for (let i = posts.length - 1; i >= posts.length - 4; i--) {
        arr.push(posts[i]);
      }
    } else {
      for (let i = posts.length - 1; i >= 0; i--) {
        arr.push(posts[i]);
      }
    }
    return arr;
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {userStatus ? "No posts..." : "Login to read posts."}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-center py-16 text-5xl font-bold">
          Welcome to <span className="text-yellow-300">DailyBlog.</span>
        </h1>
        <h3 className="mx-4 text-2xl font-bold">Recent Active Posts: </h3>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 cols-span-1">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
