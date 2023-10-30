import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const params = useParams();
    const tokenParam = params.token;

    const [token, setToken] = useState(tokenParam);
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate();

    const resetpassword = () => {
        axios.post('http://localhost:8080/resetpassword', {newPassword: newPassword, token: token})
                .then(response => {
                    alert(response.data.message)
                    if(response != null && !response.data.error){
                        navigate('/login')
                    }
                })
                .catch(e => alert(e.message));
    }
  return (
    <>
    <form onSubmit={(e) => {e.preventDefault(); resetpassword()}}>
        <Typography variant='h3'>Reset Password</Typography>
        <TextField value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label='Password' /><br /><br />
        <Button type='submit' variant='outlined' >Reset Password</Button>
    </form>
</>

  )
}

export default ResetPassword