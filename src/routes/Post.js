import React, { useState } from 'react'
import { dbService } from '../fbase';
import Header from '../components/Header'

function Post() {

  const [dateString, setDateString] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [post, setPost] = useState("");

  const calDate = () => {
    
    const today = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setDateString(month[today.getMonth()] +' ' + today.getDate()+ ', ' + today.getFullYear());

  }

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.collection("posts").add({
      createdAt : dateString,
      description : post,
      tag : tag,
      title : title,

    });

    setDateString("");

    setTitle("");
    setTag("");
    setPost("");
  }

  const onChange = (event) => {
    event.preventDefault();
    
    if(event.target.name === "post") {
      calDate();
      setPost(event.target.value);
    } 
    else if (event.target.name === "title") {
      setTitle(event.target.value);
    } 
    else if (event.target.name === "tag") {
      setTag(event.target.value);
    }
  }
  return (
    <div>
        {/*<Header/>*/}
      {/* 로그인 되어 있을 경우에만 post 할 수 있도록 */}
      <form onSubmit={onSubmit}>
        <input name="title" value={title} onChange={onChange} type = "text" />
        <input name="tag" value={tag} onChange={onChange} type="text" />
        <input name ="post" value={post} onChange={onChange} type="text"/>
        <input type="submit" value="post" />
      </form>
    </div>
  )
}

export default Post