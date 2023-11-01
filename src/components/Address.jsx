import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Address = ({address, index, removeAddress, updateAddress}) => {


    const [street, setStreet] = useState(address.street)
    const [city, setCity] = useState(address.city)
    const [state, setState] = useState(address.state)
    const [country, setCountry] = useState(address.country)
    const [pincode, setPincode] = useState(address.pincode)
    


    useEffect(() => {
        handleUpdateAddress();        
    }, [street, city, state, country, pincode])

    const handleUpdateAddress = () => {

        updateAddress({
                street: street,
                city: city,
                state: state,
                country: country,
                pincode: pincode
            }, address.number);
    }

  return (
    <>
        <p>Address {index}</p>
        <TextField value={street} onChange={(e) => {setStreet(e.target.value)}}  id="outlined-basic" label="Street" variant="outlined" /> &nbsp;
        <TextField value={city} onChange={(e) => {setCity(e.target.value)}} id="outlined-basic" label="City" variant="outlined" /><br /><br />
        <TextField value={state} onChange={(e) => {setState(e.target.value)}} id="outlined-basic" label="State" variant="outlined" /> &nbsp;
        <TextField value={country} onChange={(e) => {setCountry(e.target.value)}} id="outlined-basic" label="Country" variant="outlined" /><br /><br />
        <TextField type='number' value={pincode} onChange={(e) => {setPincode(e.target.value)}} id="outlined-basic" label="Pincode" variant="outlined" />

        {(address.number != 1) && <>&nbsp; <Button variant='outlined' onClick={() => removeAddress(address.number)}>Remove</Button></>}
    </>
  )
}

export default Address