import React from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase'

function Profile() {

    let navigate = useNavigate();

    const onLogOut = () => {
        authService.signOut();
        navigate('/');
    }


  return (
    <div>
        Profile
        <button onClick={onLogOut}>Log Out</button>

    </div>
  )
}

export default Profile