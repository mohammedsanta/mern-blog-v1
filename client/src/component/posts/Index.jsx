import React, { useEffect, useState } from 'react';
import './post.css';
import Posts from './Posts';


const Index = () => {
  
  const [ posts,setPosts ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then((response) => {
      response.json().then((postsData) => {
        setPosts(postsData);
      })
    })
  },[fetch]);
  
  const renderPosts = posts.map((post) => (
    <Posts data={post} key={post._id}/>
  ))

  return (
    
    <>

    {posts.length > 0 && renderPosts}


    </>

  )
}

export default Index;