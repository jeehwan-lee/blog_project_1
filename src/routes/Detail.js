import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import { dbService } from '../fbase';

function Detail() {

    const {id} = useParams();
    const [post, setPost] = useState(null);

    console.log(id);
  return (
    <div>
        <Header/>
        <h4>state.tag</h4>
    </div>
  )
}

export default Detail