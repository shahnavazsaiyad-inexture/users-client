import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material';
import Address from './Address';
import axios from 'axios';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const Registration = () => {

  const params = useParams();
  

  const navigate = useNavigate();
    
    const [username, setUsername] = useState(params.username);
    const [authserver, setAuthServer] = useState(params.authserver);

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [addresses, setAddresses] = useState([{number: 1, street: '', city: '', state: '', country: '', pincode: ''}]);
    const [addressNumber, setAddressNumber] = useState(1)


    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

   
  
    
    const addAddress = () => {
      setAddresses([...addresses, {number: addressNumber+1, street: '', city: '', state: '', country: '', pincode: ''}])
      setAddressNumber(addressNumber+1);
    }

    const removeAddress = (i) => {
      const updatedAddresses = addresses.filter(address => address.number != i);
      setAddresses(updatedAddresses);
    }

    const updateAddress = (updatedAddress, i) => {

      const updatedAddresses = addresses.map(address => {
        if(address.number == i){
          address.street = updatedAddress.street;
          address.city = updatedAddress.city;
          address.state = updatedAddress.state;
          address.country = updatedAddress.country;
          address.pincode = updatedAddress.pincode;
        }
        return address
      });

      setAddresses(updatedAddresses);
    }

    const register = () => {
      clearErrors();
      
      const requestObject = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        addresses: addresses,
        confirmPassword: confirmPassword,
        role: 'User',
        authServer: authserver
      }

      axios.post("http://localhost:8080/register", requestObject)
                .then((response) => {
                    
                    if(response != null && !response.data.error){
                      alert(response.data.message+ ' \nClick ok to login');
                      navigate('/login')
                    }else{
                        if(response.data.message == 'Validation Error!'){
                            setFirstNameError(response.data.data.firstName)
                            setLastNameError(response.data.data.lastName)
                            setUsernameError(response.data.data.username)
                            setPasswordError(response.data.data.password)
                            setConfirmPasswordError(response.data.data.confirmPassword)
                            setEmailError(response.data.data.email)

                            for(let field in response.data.data){
                              if(field.startsWith('addresses')){
                                setErrorMessage('Address section have some incomplete fields!')
                              }
                            }
                        }else{
                            setErrorMessage(response.data.message);
                        }
                    }
                })
                .catch((e) => setErrorMessage(e.message));
                
    }


    const clearErrors = () => {
      setUsernameError('')
      setPasswordError('')
      setEmailError('')
      setErrorMessage('')
    }

    const validateField = (fieldValue, fieldName, setErrorCallback) => {
      if(!fieldValue || fieldValue.trim() == ''){
        setErrorCallback(`Field ${fieldName} can not be empty!` )
      }else{
        setErrorCallback(null);
      }
    }
    return (
    <>
    
    <form onSubmit={(e) => {e.preventDefault(); register()}}>
      <Typography variant='h3' gutterBottom>Registration</Typography>
      
      <TextField  value={username} onChange={(e) => {setUsername(e.target.value); }}  id="outlined-basic" label="Username" variant="outlined" InputProps={{readOnly: params.authserver ? true : false}} /><br />
      {
        usernameError && 
        <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
            {usernameError}
        </Typography>    

      }
      <br />

      <TextField  value={firstName} onChange={(e) => {setFirstName(e.target.value)}}  id="outlined-basic" label="First Name" variant="outlined" /><br />
      {
        firstNameError && 
        <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
            {firstNameError}
        </Typography>    

      }
      <br />

      <TextField  value={lastName} onChange={(e) => {setLastName(e.target.value)}}  id="outlined-basic" label="Last Name" variant="outlined" /><br />
      {
        lastNameError && 
        <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
            {lastNameError}
        </Typography>    

      }
      <br />

      <TextField  value={email} onChange={(e) => {setEmail(e.target.value)}}  id="outlined-basic" label="E-mail" variant="outlined" /><br />
      {
        emailError && 
        <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
            {emailError}
        </Typography>    

      }
      <br />
      
      {
        !params.authserver && 
        <>
          <TextField  value={password} onChange={(e) => {setPassword(e.target.value)}}  id="outlined-basic" label="Password" variant="outlined" type='password' /><br />
          {
            passwordError && 
            <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
                {passwordError}
            </Typography>    

          }
          <br />


          <TextField  value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}  id="outlined-basic" label="Confirm Password" variant="outlined" type='password' /><br />
          {
            confirmPasswordError && 
            <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
                {confirmPasswordError}
            </Typography>    

          }
        
        </>
      }
      <br />

      {
        addresses.map((address, i) => (
            <Address key={address.number} address={address} index={i+1} removeAddress={removeAddress} updateAddress={updateAddress} /> 
        ))
      }
      <br /><br />

      {
          errorMessage && <><Typography variant='caption' style={{color: 'red'}}>{errorMessage}</Typography><br /><br /></>
          
      }
      <Button variant="outlined"  onClick={() => addAddress()}>Add Address</Button>&nbsp;
      <Button variant="outlined" type='submit'>Register</Button>


    </form>
</>
  )
}

export default Registration