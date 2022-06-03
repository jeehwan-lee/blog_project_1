import React from 'react'
import './styles/SearchBar.css'

function SearchBar() {

    const onSubmit = () => {

    }

  return (
    <div className='searchBar'>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder='검색' />
            <button>Go</button>
        </form>
    </div>
  )
}

export default SearchBar