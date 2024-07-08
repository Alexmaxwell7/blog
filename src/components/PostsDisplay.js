import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, addComment } from "../features/postsSlice";

const PostsDisplay = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [postLikes, setPostLikes] = useState({});
  useState(() => {
    const initialLikes = {};
    posts.forEach((post) => {
      initialLikes[post.id] = 0;
    });
    setPostLikes(initialLikes);
  }, [posts]);

  const handleLike = (postId) => {
    setPostLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: prevLikes[postId] + 1,
    }));
  };

  const [expandedComments, setExpandedComments] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  const handleAddComment = (postId) => {
    const commentText = commentTexts[postId]?.trim();
    if (commentText) {
      dispatch(
        addComment({ postId, comment: { text: commentText, id: Date.now() } })
      );
      setCommentTexts({ ...commentTexts, [postId]: "" });
    }
  };
  const handleChange = (postId, newText) => {
    setCommentTexts({ ...commentTexts, [postId]: newText });
  };
  const toggleComments = (postId) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/create">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Create Post
          </button>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded overflow-hidden border w-full bg-white mb-4"
            >
              <div className="w-full flex justify-between p-3">
                <div className="flex items-center">
                  <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://avatars0.githubusercontent.com/u/38799309?v=4"
                      alt="profilepic"
                    />
                  </div>
                  <span className="pt-1 ml-2 font-bold text-sm">
                    {post.name}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/edit/${post.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </Link>

                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(post.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {post.image && (
                <img
                  className="w-full bg-cover h-[250px]"
                  src={post.image}
                  alt="Post"
                />
              )}
              <div className="px-3 pb-2">
                <div className="flex pt-2 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => handleLike(post.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>

                  <span className="text-sm text-gray-400 font-medium">
                    {postLikes[post.id]} Likes
                  </span>
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  {post.comments.length}{" "}
                  {post.comments.length === 1 ? "comment" : "comments"}
                </span>
                <div className="pt-1">
                  <div className="mb-2 text-sm">
                    <span className="font-medium mr-2">{post.name}</span>{" "}
                    {post.description}
                  </div>
                </div>
                <div
                  className="text-sm mb-2 text-gray-400 cursor-pointer font-medium"
                  onClick={() => toggleComments(post.id)}
                >
                  {expandedComments[post.id]
                    ? `Hide comments`
                    : `View ${
                        post.comments.length > 0 ? "comments" : "comment"
                      }`}
                </div>
                {expandedComments[post.id] && post.comments.length > 0 && (
                  <div className="mb-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="mb-2 text-sm">
                        <span className="font-medium mr-2">{comment.name}</span>{" "}
                        {comment.text}
                      </div>
                    ))}
                  </div>
                )}
                {expandedComments[post.id] && (
                  <div className="flex">
                    <input
                      type="text"
                      value={commentTexts[post.id] || ""}
                      onChange={(e) => handleChange(post.id, e.target.value)}
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg ml-2"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsDisplay;
