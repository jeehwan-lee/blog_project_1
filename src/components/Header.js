import { faHouse, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './styles/Header.css'

function Header() {
  return (
    <div className='header'>
        <h3>My Log</h3>

        <div className='header-icon'>
            <FontAwesomeIcon icon={faHouse} className='header-faHouse'/>
            <FontAwesomeIcon icon={faSquarePlus} className='header-faSquarePlus'/>

            {/* 로그인 여부에 따라 아래구문은 faUserPlus 또는 프로필 사진으로 2항 연산자로 구현 */}
            <FontAwesomeIcon icon={faUserPlus} className='header-faUserPlus'/>
        </div>
    </div>
  )
}

export default Header