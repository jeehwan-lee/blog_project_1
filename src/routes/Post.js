import React, { useState } from 'react'
import { dbService, storageService } from '../fbase';
import {v4 as uuidv4} from "uuid";
import { getDownloadURL, ref, uploadString} from "firebase/storage";
import Header from '../components/Header'

function Post({userObj}) {

  const [dateString, setDateString] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [post, setPost] = useState("");
  const [attachment, setAttachment] =useState("");
  const [profileImage, setProfileImage] = useState("");

  const calDate = () => {
    
    const today = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setDateString(month[today.getMonth()] +' ' + today.getDate()+ ', ' + today.getFullYear());

  }

  const onSubmit = async (event) => {
    event.preventDefault();

    let profileurl = "";
    let profileuser = "";

    var query = dbService.collection("users").where("userId", "==", userObj.uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.data().profileImage);
       profileurl = doc.data().profileImage;
       profileuser = doc.data().NickName;
      });
    });

    let url = "";

    if(attachment !== "") { 
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      console.log(response);

      url = await getDownloadURL(response.ref);

    }

    // profile Image를 바꿨을때 게시글의 프로필 사진도 같이 변경되도록 수정해야함
    await dbService.collection("posts").add({
      createdAt : dateString,
      description : post,
      tag : tag,
      title : title,
      image : url,
      creatorIcon : profileurl,
      creatorId : profileuser,
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

  const onFileChange = (event) => {
    const {
      target : {files},
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget : {result},
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  }
  return (
    <div>
        {/*<Header/>*/}
      {/* 로그인 되어 있을 경우에만 post 할 수 있도록 */}
      <form onSubmit={onSubmit}>
        <input name="title" value={title} onChange={onChange} type = "text" />
        <input name="tag" value={tag} onChange={onChange} type="text" />
        <input name ="post" value={post} onChange={onChange} type="text"/>
        <input type="file" accept='image/*' onChange={onFileChange} />
        <input type="submit" value="post" />
      </form>
    </div>
  )
}

export default Post