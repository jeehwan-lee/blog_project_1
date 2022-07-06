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

        <div>
            <Link to='/' style={{color:'black'}}><FontAwesomeIcon icon={faHouse} className='header-faHouse'/></Link>

            {isLoggedIn ? (
              <Link to='/post' style={{color:'black'}}><FontAwesomeIcon icon={faSquarePlus} className='header-faSquarePlus'/></Link>
            ) : (
              <Link to='/login' style={{color:'black'}}><FontAwesomeIcon icon={faSquarePlus} className='header-faSquarePlus'/></Link>
            )}

            {isLoggedIn ? (
              <Link to='/profile' style={{color:'black'}}><img src='/assets/defaultProfile.jpg' className='profileImage'/></Link>
            ) : (
              <Link to='/login' style={{color:'black'}}><FontAwesomeIcon icon={faUserPlus} className='header-faUserPlus'/></Link>
            )}
            
        </div>
    </div>
  )
}

export default Header