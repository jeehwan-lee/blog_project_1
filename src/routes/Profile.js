import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { authService, dbService, storageService } from '../fbase'
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './styles/Profile.css'

function Profile({userObj}) {

    const [profileImage, setProfileImage] = useState("");
    const [profileName, setProfileName] = useState("");
    const [profileNickName, setProfileNickName] = useState("");
    const [profilePhone, setProfilePhone] = useState("");
    const [profileDesc, setProfileDesc] = useState("");
    const imageInput = useRef();

    let navigate = useNavigate();

    const onLogOut = () => {
        authService.signOut();
        navigate('/');
    }

    const onSubmit = async (event) => {
      event.preventDefault();
      
      let profileurl = "";

      if(profileImage !== "") {
        const profileRef = ref(storageService, `${userObj.uid}/${"profile"}`);
        const response = await uploadString(profileRef, profileImage, "data_url");

        profileurl = await getDownloadURL(response.ref);
      }
    
      await dbService.collection("users").doc(`${userObj.uid}`).set({
        userId : userObj.uid,
        profileImage : profileurl,
        Name: profileName,
        NickName : profileNickName,
        Phone:profilePhone,
        Desc: profileDesc,
      }); 
    }

    const onChange = (event) => {
      if(event.target.name === "userName") {
        setProfileName(event.target.value);
      } else if(event.target.name === "userNickName") {
        setProfileNickName(event.target.value);
      } else if(event.target.name === "userPhone") {
        setProfilePhone(event.target.value);
      } else if(event.target.name === "userDesc") {
        setProfileDesc(event.target.value);
      }
    }

    const onFileChange =(event) => {
      const {
        target : {files},
      } = event;
      
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget : {result},
        } = finishedEvent;
        setProfileImage(result);
      };
      reader.readAsDataURL(theFile);
    }

    const onClickImageUpload = () => {
      imageInput.current.click();
    }


  return (
    <div className='profile'>

      <form onSubmit={onSubmit}>
        {profileImage ? (
            <img src={profileImage} className='profileImageUpload' onClick={onClickImageUpload} />
          ) : (
            //<FontAwesomeIcon icon={faPlus} className='profile-faPlus' onClick={onClickImageUpload}/>
            <img src='/assets/defaultProfile.jpg' className='profileImageUpload' onClick={onClickImageUpload} />
          )}
        <input type="file" name='profileSelect'accept='image/*' onChange={onFileChange} style={{display:'none'}} ref={imageInput}/>
        <div>
          <label for="user-name">이름</label>
          <input type="text" name='userName' id="user-name" onChange={onChange}/>
        </div>
        <div>
          <label for="user-nickname">닉네임</label>
          <input type="text" name='userNickName' id="user-nickname" onChange={onChange}/>
        </div>
        <div>
          <label for="user-phone">전화번호</label>
          <input type="text" name='userPhone' id="user-phone" onChange={onChange}/>
        </div>
        <div>
          <label for="user-des">소개</label>
          <input type="text" name='userDesc' id="user-des" onChange={onChange}/>
        </div>

        <input type="submit" value="저장"/>
      </form>

      <button onClick={onLogOut}>Log Out</button>

    </div>
  )
}

export default Profile