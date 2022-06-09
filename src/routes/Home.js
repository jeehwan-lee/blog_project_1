import React, { useEffect, useState } from 'react'
import Blog from '../components/Blog'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import { dbService } from '../fbase'
import './styles/Home.css'

function Home({isLoggedIn}) {

  console.log(isLoggedIn);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dbService.collection('posts').onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => document.data());
      setPosts(newArray);
    });

    console.log(posts);

  }, []);

  return (
    <div className='home'>
        <Header isLoggedIn={isLoggedIn}/>
        <SearchBar/>
        <div className='blog-container'>
          {posts.map((post) => (
            <Blog postObj={post} />
          ))}
        </div>
    </div>
  )
}

export default Home