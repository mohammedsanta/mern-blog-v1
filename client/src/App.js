import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './component/header/Header';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import { UserContextProvider } from './component/userContext/UserContext';
import CreatePost from './component/createPost/CreatePost';
import Index from './component/posts/Index';
import PostId from './component/posts/PostId';
import PostEdit from './component/posts/PostEdit';

function App() {


  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Header />} >

          <Route index element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostId />} />
          <Route path='/edit/:id' element={<PostEdit />} />

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
