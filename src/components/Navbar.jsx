import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './auth'

const Navbar = () => {
    const auth = useAuth();
  return (
    <>
        <Box>
            <AppBar>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        Users App
                    </IconButton>

                    <Typography variant="h6" component="div">
                        <NavLink to={'/'} style={{textDecoration: 'none', color: '#fff', padding: '10px'}}>Home</NavLink>
                    </Typography>
                    { (auth.user && auth.user.role == 'Admin' ) && 
                        <Typography variant="h6" component="div">
                            <NavLink to={'/users'} style={{textDecoration: 'none', color: '#fff', padding: '10px'}}>Users</NavLink>
                        </Typography>
                    }

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        { auth.isLoggedIn() && <NavLink to={`/profile/${auth?.user?.userId}`} style={{textDecoration: 'none', color: '#fff', padding: '10px'}}>Profile</NavLink>}
                        </Typography>
                        {
                          auth.isLoggedIn() ?
                            <Typography variant="h6" >
                              <NavLink to={'/logout'} style={{ textDecoration: 'none', color: '#fff' }}>Logout</NavLink>
                            </Typography>

                            :
                            <Typography variant="h6" >
                              <NavLink to={'/login'} style={{ textDecoration: 'none', color: '#fff' }}>Login</NavLink>
                            </Typography>

                        }
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default Navbar