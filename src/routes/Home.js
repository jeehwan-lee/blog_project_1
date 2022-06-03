import React from 'react'
import Blog from '../components/Blog'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import './styles/Home.css'

function Home() {
  return (
    <div className='home'>
        <Header/>
        <SearchBar/>
        <div className='blog-container'>
            <Blog/>
            <Blog/>
            <Blog/>
        </div>
    </div>
  )
}

export default Home