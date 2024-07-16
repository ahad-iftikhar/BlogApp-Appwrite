import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-300 rounded-xl p-4">
        <div className="w-full h-32 justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-full object-cover shadow-sm"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
