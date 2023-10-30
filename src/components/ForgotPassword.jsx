import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [username, setUsername] = useState('')


    const sendEmail = () => {

        axios.get(`http://localhost:8080/resetpassword/${username}`)
                .then(response => {
                    alert(response.data.message);
                })
                .catch(e => alert(e.message))
    }

    return (
        <>
            <form onSubmit={(e) => {e.preventDefault(); sendEmail()}}>
                <Typography variant='h3'>Forgot Password</Typography>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} label='Username' /><br /><br />
                <Button type='submit' variant='outlined' >Send Email</Button>
            </form>
        </>
      )
}

export default ForgotPassword