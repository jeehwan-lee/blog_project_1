import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Blog.css'

function Blog({postObj}) {
  return (
    <div className='blog'>
      <img src={postObj.image} alt="cover" className='blog-cover'/>
      <label>{postObj.tag}</label>
      <h3>{postObj.title}</h3>
      <p className='blog-desc'>{postObj.description}</p>

      <footer>
        <div className='blog-creator'>
          <div>
            <img src={postObj.creatorIcon} alt="Icon"/>
            <div>
              <h6>{postObj.creatorId}</h6>
              <p>{postObj.createdAt}</p>
            </div>
          </div>
        </div>
        <Link className='blog-link' to={`/blog/${postObj.id}`}>blog</Link>
      </footer>
    
    </div>
  )
}

export default Blog