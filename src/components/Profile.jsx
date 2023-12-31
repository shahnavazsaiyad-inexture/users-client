import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Address from './Address';
import axios from 'axios';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './auth';

const Profile = () => {


  const navigate = useNavigate();
  
    const params = useParams();
    const userId = params.userId;

    const auth = useAuth();

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [addresses, setAddresses] = useState([]);
    const [addressNumber, setAddressNumber] = useState(1)


    const [errorMessage, setErrorMessage] = useState('');
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')

    useEffect(() => {
      axios.get(`http://localhost:8080/users/${userId}`, {headers: {'Authorization': `Bearer ${auth.user.jwtToken}`}, withCredentials: true})
            .then(response => {
              if(response != null && !response.data.error){
                  const user = response.data.data;
                  setId(user.id)
                  setRole(user.role)
                  setUsername(user.username);
                  setFirstName(user.firstName);
                  setLastName(user.lastName)
                  setEmail(user.email);
                  const userAddresses = user.addresses.map((a, i) => {
                                        a.number = i+1;
                                        setAddressNumber(addressNumber +1)
                                        return a;
                                      });
                                      
                  setAddresses(userAddresses);
              }else{
                alert(response.data.message)
                navigate('/')
              }
            })
            .catch(e => console.log(e.message));
    },[]);

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
    const updateUser = () => {
      clearErrors();
      const requestObject = {
        id: id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        addresses: addresses,
        role: role
      }
      axios.post("http://localhost:8080/users", requestObject,  {headers: {'Authorization': `Bearer ${auth.user.jwtToken}`}, withCredentials: true})
            .then((response) => {
                
                if(response != null && !response.data.error){
                  alert(response.data.message)
                }else{
                    if(response.data.message == 'Validation Error!'){
                        setUsernameError(response.data.data.username)
                        setEmailError(response.data.data.email)
                        setFirstNameError(response.data.data.firstName)
                        setLastNameError(response.data.data.lastName)

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
      setEmailError('')
      setErrorMessage('')
      setFirstNameError('')
      setLastNameError('')
    }

    return (
    <>
    <form onSubmit={(e) => {e.preventDefault(); updateUser()}}>
      <Typography variant='h3' gutterBottom>User Profile </Typography>
      
      <TextField  value={username} onChange={(e) => setUsername(e.target.value)}  id="outlined-basic" label="Username" variant="outlined" /><br />
      {
        usernameError && 
        <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
            {usernameError}
        </Typography>    

      }
      <br />

      <TextField  value={firstName} onChange={(e) => setFirstName(e.target.value)}  id="outlined-basic" label="First Name" variant="outlined" /><br /><br />

      <TextField  value={lastName} onChange={(e) => setLastName(e.target.value)}  id="outlined-basic" label="Last Name" variant="outlined" /><br /><br />

      <TextField  value={email} onChange={(e) => setEmail(e.target.value)}  id="outlined-basic" label="E-mail" variant="outlined" /><br />
      {
        emailError && 
        <Typography  variant="caption" style={{color:'red'}} display="block" gutterBottom>
            {emailError}
        </Typography>    

      }
      <br />
      {
        auth.user.role == 'Admin' &&
        <FormControl>
        <InputLabel id="role">Role</InputLabel>
  
        <Select labelId='role' label='Role' value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value='Admin'>Admin</MenuItem>
          <MenuItem value='User'>User</MenuItem>
        </Select>
      </FormControl>
      }
      <br />      
      {
        addresses?.map((address, i) => (
            <Address key={address.number} address={address} index={i+1} removeAddress={removeAddress} updateAddress={updateAddress} /> 
        ))
      }
      <br /><br />

      {
          errorMessage && <><Typography variant='caption' style={{color: 'red'}}>{errorMessage}</Typography><br /><br /></>
      }
      <Button variant="outlined"  onClick={() => addAddress()}>Add Address</Button>&nbsp;
      <Button variant="outlined" type='submit'>Update</Button>


    </form>
</>
  )
}

export default Profile