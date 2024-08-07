'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// Component to render a list of PromptCards
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

// Feed component to manage state and fetch posts
const Feed = () => {
const [searchText, setSearchText] = useState("");
const [posts, setPosts] = useState([]);

 // Handler for search input changes
 const handleSearchChange = (e) => {
  setSearchText(e.target.value);
}
// Fetch posts from API on component mount
useEffect(() =>{

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
  }
  console.log(posts);

  fetchPosts();
}, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
           type="text"
           placeholder="Search for a tag or a username"
           value={searchText}
           onChange={handleSearchChange}
           required
           className="search_input peer"
           />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
      </section>
  )
}

export default Feed