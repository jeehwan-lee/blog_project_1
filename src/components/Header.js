import { faHouse, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './styles/Header.css'
import { Link } from 'react-router-dom'

function Header({isLoggedIn}) {
  return (
    <div className='header'>
        <h3>My Log</h3>

        <div className='header-icon'>
            <Link to='/' style={{color:'black'}}><FontAwesomeIcon icon={faHouse} className='header-faHouse'/></Link>
            <Link to='/post' style={{color:'black'}}><FontAwesomeIcon icon={faSquarePlus} className='header-faSquarePlus'/></Link>

            {/* 
              1. 로그인 여부에 따라 아래구문은 faUserPlus 또는 프로필 사진으로 2항 연산자로 구현 
              2. 로그인 방법은 modal로 구현 
            */}
            {isLoggedIn ? (
              <Link to='/profile' style={{color:'black'}}><img src='/assets/author.jpg' className='profileImage'/></Link>
            ) : (
              <Link to='/login' style={{color:'black'}}><FontAwesomeIcon icon={faUserPlus} className='header-faUserPlus'/></Link>
            )}
            
        </div>
    </div>
  )
}

export default Header