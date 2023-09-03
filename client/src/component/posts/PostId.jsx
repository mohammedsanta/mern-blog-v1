import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Posts from './Posts';
import { UserContext } from '../userContext/UserContext';

const PostId = () => {

  const {id} = useParams();

  const [ postData,setPostData ] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
    .then(response => {
      response.json()
      .then((postData) => {
        setPostData(postData);
      })
    })
  },[])

  if(!postData) return '';

  return (
    
    <div className="post-page">

      <h1 className='post-page-h1'>{postData.title}</h1>

      <div className='post-page-info'>
        <time>{postData.createdAt}</time>
        <p>by {postData.author.username}</p>
      </div>

      {userInfo.id === postData.author._id && (
        <div className='edit'>
          <Link to={`/edit/${postData._id}`} className='edit-btn'>Edit Post</Link>
        </div>
      )}

      <div className="image">
        <img src={`http://localhost:4000/${postData.cover}`} alt="" />
      </div>

      
      <div className='article' dangerouslySetInnerHTML={{__html:postData.content}} />

    </div>

  )
}

export default PostId;