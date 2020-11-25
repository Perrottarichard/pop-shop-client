import React, { useContext } from 'react';
import { QueryResult } from '@apollo/client'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CheckoutContext } from '../contexts/CheckoutContext';
import { useForm } from 'react-hook-form'
import { Button } from '@material-ui/core';
import CheckoutSkeleton from './CheckoutSkeleton';

interface Props {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meQuery: QueryResult<any, Record<string, any>>;
}
export default function AddressForm(props: Props) {
  const { activeStep, setActiveStep, meQuery } = props
  const {
    shippingAddress,
    setShippingAddress,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    country,
    setCountry,
    formFirstName,
    setFormFirstName,
    formLastName,
    setFormLastName,
  } = useContext(CheckoutContext)
  const bg = '#cf2b2b'
  const txt = 'white'

  const data = meQuery.data.me.paymentInfo
  const preloadedValues = {
    formFirstName: formFirstName !== '' ? formFirstName : data?.firstName,
    formLastName: formLastName !== '' ? formLastName : data?.lastName,
    shippingAddress: shippingAddress !== '' ? shippingAddress : data?.shippingAddress,
    city: city !== '' ? city : data?.city,
    state: state !== '' ? state : data?.state,
    zip: zip !== '' ? zip : data?.zip,
    country: country !== '' ? country : data?.country,
  }
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setFormFirstName(data.formFirstName)
    setFormLastName(data.formLastName)
    setShippingAddress(data.shippingAddress)
    setCity(data.city)
    setState(data.state)
    setZip(data.zip)
    setCountry(data.country)
    setActiveStep(activeStep + 1)
  }


  if (meQuery.loading || !meQuery.data) {
    return (
      <CheckoutSkeleton />
    )
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography style={{ color: txt, fontFamily: 'Pacifico' }} variant="h6" gutterBottom>
          Shipping address
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='filled'
              required
              inputRef={register}
              id="firstName"
              name="formFirstName"
              label='First name'
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              id="lastName"
              name="formLastName"
              label='Last name'
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              id="address"
              name="shippingAddress"
              label="Address"
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              id="city"
              name="city"
              label="City"
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='filled'
              style={{ backgroundColor: txt }}
              inputRef={register}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth />

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              id="country"
              name="country"
              label="Country"
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
        </Grid>
        <Button type='submit' variant='contained' color='primary' style={{ marginTop: 20, float: 'right', marginLeft: 10, backgroundColor: bg }}>Next</Button>
      </form>
    </React.Fragment>
  );
}
