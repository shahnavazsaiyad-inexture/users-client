import { Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useAuth } from './auth';

const Home = () => {

  const auth = useAuth();

  useEffect(() => {
    axios.get("http://localhost:8080/login/user", {withCredentials: true})
          .then(response => {
              if(response.headers.getContentType() == 'application/json' && !response.data.error){
                  auth.login(response.data.data);
              }
          }).catch(e => console.log(e.message));
  },[]);

  return (
    <>
    <Typography variant="h3" >Welcome to Users App</Typography>
    </>
  )
}

export default Home