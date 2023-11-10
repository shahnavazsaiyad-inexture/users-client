import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from './auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { GitHub } from '@mui/icons-material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const auth = useAuth();
    const navigate = useNavigate();
 

    if(auth.user){
        navigate('/');
    }

    const login = () => {
        clearErrors();
        const data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);

        axios.post("http://localhost:8080/login", data, {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, withCredentials: true})
                .then((response) => {
                    console.log(response)            
                    if(response != null && !response.data.error){
                        auth.login(response.data.data);
                        navigate('/');
                    }else{
                        if(response.data.message == 'Validation Error!'){
                            setUsernameError(response.data.data.username)
                            setPasswordError(response.data.data.password)
                        }else{
                            setErrorMessage(response.data.message);
                        }
                    }
                })
                .catch((e) => setErrorMessage(e.message));
    }


    const clearErrors = () => {
        setErrorMessage('');
        setPasswordError('');
        setUsernameError('');
    }

    return (
        <>
            <form onSubmit={(e) => {e.preventDefault(); login()}}>
                <Typography variant='h3' gutterBottom>Login</Typography>
                <TextField  value={username} onChange={(e) => setUsername(e.target.value)}  id="outlined-basic" label="Username" variant="outlined" /><br />
                <Typography variant='caption' style={{color: 'red'}}>{usernameError}</Typography>
                <br /><br />

                <TextField  value={password} onChange={(e) => setPassword(e.target.value)}  id="outlined-basic" label="Password" variant="outlined" type='password' /><br />
                <Typography variant='caption' style={{color: 'red'}}>{passwordError}</Typography>
                <br /><br />
                
                {
                    errorMessage && <><Typography variant='caption' style={{color: 'red'}}>{errorMessage}</Typography><br /><br /></>
                    
                }
                <Button onClick={login} type='submit' variant="contained">Login</Button> &nbsp;                
                <a href="http://localhost:8080/oauth2/authorization/github"><Button variant='outlined'> <GitHub /> Github</Button></a><br /><br />
                Click <Link to='/forgotpassword'>Here</Link> if you forgot your password!<br /><br />
                Click <Link to='/register'>Here</Link> for new Registration!

            </form>
        </>
  )
}

export default Login