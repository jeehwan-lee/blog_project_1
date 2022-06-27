import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { authService, dbService, storageService } from '../fbase'
import {getDownloadURL, ref, uploadString} from "firebase/storage";

function Profile({userObj}) {

    const [profileImage, setProfileImage] = useState("");

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
      }); 
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


  return (
    <div>
        {/*<Header/>*/}
      
      <button onClick={onLogOut}>Log Out</button>

      <form onSubmit={onSubmit}>
        <input type="file" accept='image/*' onChange={onFileChange}/>
        <input type="submit" value="profile"/>
      </form>

    </div>
  )
}

export default Profile