import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CheckoutContext } from '../contexts/CheckoutContext';
import { useForm } from 'react-hook-form'
import { Button } from '@material-ui/core';
import { QueryResult } from '@apollo/client';
import CheckoutSkeleton from './CheckoutSkeleton';

interface Props {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meQuery: QueryResult<any, Record<string, any>>;
}
export default function PaymentForm(props: Props) {

  const { activeStep, setActiveStep, meQuery } = props
  const {
    creditCardNameOnCard,
    setCreditCardNameOnCard,
    // creditCardType,
    // setCreditCardType,
    creditCardExpire,
    setCreditCardExpire,
    creditCardNumber,
    setCreditCardNumber,
    creditCardCVV,
    setCreditCardCVV
  } = useContext(CheckoutContext)
  const bg = '#cf2b2b'
  const txt = 'white'
  // const blk = 'rgb(43, 43, 41)'

  const data = meQuery.data.me.paymentInfo

  const preloadedValues = {
    creditCardNameOnCard: creditCardNameOnCard !== '' ? creditCardNameOnCard : data?.creditCardNameOnCard,
    creditCardExpire: creditCardExpire !== '' ? creditCardExpire : data?.creditCardExpire,
    creditCardNumber: creditCardNumber !== '' ? creditCardNumber : data?.creditCardNumber,
    creditCardCVV: creditCardCVV !== '' ? creditCardCVV : data?.creditCardCVV,
  }

  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setCreditCardNameOnCard(data.creditCardNameOnCard)
    setCreditCardExpire(data.creditCardExpire)
    setCreditCardNumber(data.creditCardNumber)
    setCreditCardCVV(data.creditCardCVV)
    setActiveStep(activeStep + 1)
  }

  // const onCreditCardNameOnCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCreditCardNameOnCard(e.target.value as string);
  // }
  // const onCreditCardTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCreditCardType(e.target.name);
  // };
  // const onCreditCardExpireChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCreditCardExpire(e.target.value as string);
  // }
  // const onCreditCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCreditCardNumber(e.target.value as string);
  // }
  // const onCreditCardCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCreditCardCVV(e.target.value as string);
  // }
  if (meQuery.loading) {
    return (
      <CheckoutSkeleton />
    )
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography style={{ color: txt, fontFamily: 'Pacifico' }} variant="h6" gutterBottom>
          Payment method
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              name='creditCardNameOnCard'
              id="cardName"
              // value={creditCardNameOnCard}
              // onChange={onCreditCardNameOnCardChange}
              label="Name on card"
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              name='creditCardNumber'
              id="cardNumber"
              // value={creditCardNumber}
              // onChange={onCreditCardNumberChange}
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              variant='filled'
              inputRef={register}
              name='creditCardExpire'
              id="expDate"
              // value={creditCardExpire}
              // onChange={onCreditCardExpireChange}
              label="Expiry date"
              fullWidth
              style={{ backgroundColor: txt }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant='filled'
              required
              inputRef={register}
              name='creditCardCVV'
              id="cvv"
              // value={creditCardCVV}
              // onChange={onCreditCardCVVChange}
              label="CVV"
              helperText="Last three digits on signature strip"
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