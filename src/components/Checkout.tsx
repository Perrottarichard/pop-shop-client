import React, { useContext, useEffect, useState } from 'react';
import shortid from 'shortid'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CART, CREATE_ORDER, ME } from '../queries';
import { Cart } from '../types';
import CheckoutSkeleton from './CheckoutSkeleton';
import { CheckoutContext } from '../contexts/CheckoutContext';

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: 'white' }} align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mangolatte.dev/">
        Pop Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    height: '100vh',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: 'white'
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const {
    shippingAddress,
    city,
    state,
    zip,
    country,
    formFirstName,
    formLastName,
    creditCardNameOnCard,
    creditCardExpire,
    creditCardNumber,
    creditCardCVV

  } = useContext(CheckoutContext)

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Shipping address', 'Payment details', 'Review'];
  const thisUserCart = useQuery(GET_CART)
  const [conf, setConf] = useState('')
  const [tryCreateOrder, result] = useMutation(CREATE_ORDER, { refetchQueries: [{ query: ME }] })
  const meQuery = useQuery(ME)
  const bg = '#cf2b2b'
  const txt = 'white'
  const blk = 'rgb(43, 43, 41)'

  useEffect(() => {
    if (result.data) {
      setConf(result.data.createOrder.confirmation)
    }
  }, [result.data])

  const TAX_RATE = 0.07
  let cart: Cart[];
  let total: number;

  if (!thisUserCart.loading) {
    cart = thisUserCart.data.getCart
    const subtotal = cart.reduce((a, b) => a + b.price, 0)
    const tax = (subtotal * TAX_RATE).toFixed(2)
    total = Number(subtotal) + Number(tax)
  } else {
    cart = [{
      item: undefined,
      quantity: undefined,
      size: undefined,
      flavor: undefined,
      color: undefined,
      price: 0,
      id: undefined
    }]
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm activeStep={activeStep} setActiveStep={setActiveStep} meQuery={meQuery} />;
      case 1:
        return <PaymentForm activeStep={activeStep} setActiveStep={setActiveStep} meQuery={meQuery} />;
      case 2:
        return <Review cart={cart} total={total} />;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const submitCheckout = async () => {
    try {
      await tryCreateOrder({
        variables: {
          formFirstName: formFirstName,
          formLastName: formLastName,
          shippingAddress: shippingAddress,
          city: city,
          state: state,
          zip: zip,
          country: country,
          creditCardNumber: creditCardNumber,
          creditCardExpire: creditCardExpire,
          creditCardNameOnCard: creditCardNameOnCard,
          creditCardCVV: creditCardCVV,
          totalPrice: total,
          confirmation: shortid.generate()
        }
      })
      // console.log(result.data.createOrder.confirmation)
      handleNext()
    } catch (error) {
      console.log(error)
    }
  }

  if (thisUserCart.loading || meQuery.loading || !meQuery.data) {
    return (
      <div >
        <main className={classes.layout}>
          <CssBaseline />
          <Paper className={classes.paper} style={{ backgroundColor: blk }}>
            <Typography component="h1" variant="h4" align="center" style={{ fontFamily: 'Pacifico' }}>
              Checkout
          </Typography>
            <CheckoutSkeleton />
          </Paper>
        </main>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <div style={{ backgroundColor: bg, height: '100%' }}>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper} style={{ backgroundColor: blk }}>
              <Typography component="h1" variant="h4" align="center" style={{ fontFamily: 'Pacifico', color: txt }}>
                Checkout
          </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper} style={{ backgroundColor: blk }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel style={{ color: txt }}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length && result.data ? (
                  <React.Fragment>
                    <Typography style={{ color: 'white' }} variant="h5" gutterBottom>
                      Thank you for your order.
                </Typography>
                    <Typography style={{ color: 'white' }} variant="subtitle1">
                      Your confirmation code is {conf}. We have emailed your order confirmation, and will
                      send you an update when your order has shipped.
                </Typography>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      {getStepContent(activeStep)}
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button onClick={handleBack} className={classes.button}>
                            Back
                          </Button>
                        )}
                        <div style={{ height: 50 }}>

                        </div>
                        {activeStep === steps.length - 1 ?
                          <Button
                            variant="contained"
                            style={{ backgroundColor: bg }}
                            onClick={submitCheckout}
                            className={classes.button}
                          >
                            Place order
                      </Button>
                          : null}
                      </div>
                    </React.Fragment>
                  )}
              </React.Fragment>
            </Paper>
            <Copyright />
          </main>
        </div>
      </React.Fragment>
    );
  }
}