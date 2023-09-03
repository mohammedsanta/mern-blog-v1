import React from 'react';
import {formatISO9075} from "date-fns";
import { Link } from 'react-router-dom';


const Posts = ( {data} ) => {
  
  
  const {_id,title,summary,cover,createdAt,author} = data;
  
  console.log(_id)

  return (
    <div className='post' key={_id}>

      <div className='image'>
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} />
        </Link>
      </div>

      <div className='text'>
      <Link to={`/post/${_id}`}>
        <h1>{title}</h1>
      </Link>

      <p className='info'>
          <a href='' className='author'>{author.username}</a>
          <time>{createdAt}</time>
      </p>

      <p className='summary'>{summary}</p>
      </div>

    </div>

  )
}

export default Posts