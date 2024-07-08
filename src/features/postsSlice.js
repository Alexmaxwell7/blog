import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: JSON.parse(localStorage.getItem("posts")) || [
    {
      id: 1,
      name: "braydoncoyer",
      description: "Exploring the beautiful landscapes of New Zealand!",
      image: "https://images.examples.com/wp-content/uploads/2018/06/Blog-Examples.png",
      comments: [
        { id: 1, name: "razzle_dazzle", text: "Dude! How cool! I went to New Zealand last summer and had a blast taking the tour! So much to see! Make sure you bring a good camera when you go!" },
        { id: 2, name: "adventurer", text: "Absolutely stunning! I want to visit New Zealand someday." }
      ]
    },
    {
      id: 2,
      name: "johndoe",
      description: "Just made the best homemade pizza!",
      image: "https://images.examples.com/wp-content/uploads/2018/06/Blog-Examples.png",
      comments: [
        { id: 1, name: "foodie123", text: "Yummy! Share the recipe please." }
      ]
    }
  ]
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    editPost: (state, action) => {
      const { id, name, description, image } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.name = name;
        existingPost.description = description;
        existingPost.image = image;
        localStorage.setItem("posts", JSON.stringify(state.posts));
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.comments.push(comment);
        localStorage.setItem("posts", JSON.stringify(state.posts));
      }
    },
    editComment: (state, action) => {
      const { postId, commentId, newText } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        const comment = post.comments.find(comment => comment.id === commentId);
        if (comment) {
          comment.text = newText;
          localStorage.setItem("posts", JSON.stringify(state.posts));
        }
      }
    }
  }
});

export const { addPost, editPost, deletePost, addComment, editComment } = postsSlice.actions;
export default postsSlice.reducer;
