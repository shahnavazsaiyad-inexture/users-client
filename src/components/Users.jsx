import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from './auth'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Users = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    useEffect(() => {

        fetchUsers();
      
        
    }, []);

    const fetchUsers = () => {
        axios.get(`http://localhost:8080/users`, {headers: {'Authorization': `Bearer ${auth.user.jwtToken}`}, withCredentials: true})
                .then(response => {
                    if(response != null && !response.data.error){
                        setUsers(response.data.data)
                    }
                    else{
                        alert(response.data.message);
                        navigate('/');                    
                    }
                })
                .catch(e => alert(e.message))
    }
    const deleteUser = (userId) => {
        const selection = window.confirm("Are you sure you want to delete user?");
        if(selection){
            axios.delete(`http://localhost:8080/users/${userId}`, {headers: {'Authorization': `Bearer ${auth.user.jwtToken}`}, withCredentials: true})
                    .then(response => {
                        alert(response.data.message)
                        fetchUsers();
                    })
                    .catch(e => alert(e.message));
        }
    }
    return (
        <>
            <Typography variant='h3' gutterBottom>Users</Typography>


            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell align='right'>Last Name</TableCell>
                        <TableCell align='right'>Username</TableCell>
                        <TableCell align='right'>Email</TableCell>
                        <TableCell align='right'>Role</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {
                    users?.map(user => (
                        
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell align='right'>{user.lastName}</TableCell>
                            <TableCell align='right'>{user.username}</TableCell>
                            <TableCell align='right'>{user.email}</TableCell>
                            <TableCell align='right'>{user.role}</TableCell>
                            <TableCell align='right'>
                                <Link to={`/profile/${user.id}`}>
                                    <Button variant='outlined'>Edit</Button>
                                </Link>&nbsp;
                                <Button variant='outlined' onClick={() => deleteUser(user.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    
                    ))
                }
                </TableBody>
            </Table>
        </>
  )
}

export default Users