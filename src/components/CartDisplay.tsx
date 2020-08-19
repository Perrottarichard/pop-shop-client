import React from 'react';
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CART, REMOVE_CART } from '../queries';
import { Cart } from '../types'
import { Container, Button, Typography, CardActions, CardContent, Fade, Grid, Badge, LinearProgress } from '@material-ui/core';
// import CartSkeleton from './CartSkeleton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



const TAX_RATE = 0.07;

const CartDisplay = () => {

  const history = useHistory()
  const thisUserCart = useQuery(GET_CART)
  const [tryRemoveFromCart] = useMutation(REMOVE_CART, {
    refetchQueries: [{ query: GET_CART }]
  })
  const bg = '#cf2b2b'
  const txt = 'white'
  const blk = 'rgb(43, 43, 41)'

  if (thisUserCart.loading) {
    return (
      <div style={{ backgroundColor: bg, height: '100vh', width: '100%' }}>
        <LinearProgress style={{ backgroundColor: 'black', zIndex: 1000, }} />
      </div>
    )
  } else {
    const cart: Cart[] = thisUserCart.data.getCart
    const subtotal = cart.reduce((a, b) => a + b.price, 0)
    const tax = (subtotal * TAX_RATE).toFixed(2)
    const total = Number(subtotal) + Number(tax)
    const removeFromCart = async (id: string | undefined) => {
      try {
        await tryRemoveFromCart({
          variables: {
            id: id
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    if (cart.length === 0) {
      setTimeout(() => {
        history.push('/')
      }, 3000);
      return (
        <Container style={{ display: 'block', textAlign: 'center', marginTop: '200px', fontFamily: 'Pacifico', fontWeight: 'lighter', color: txt }}>
          {/* hacky way to avoid error on view change */}
          <div id='timer' style={{ display: 'none', color: 'white', width: 0, height: 0 }}></div>
          <h2> Such emptiness...</h2>
        </Container>
      )
    }
    console.log(cart)
    return (
      <div style={{ backgroundColor: bg, width: '100%' }}>
        {/* hacky way to avoid error on view change */}
        <div id='timer' style={{ display: 'none', color: txt }}></div>
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', height: 'auto', width: '100%', textAlign: 'center' }}>
          {cart.map(c =>
            <Container key={c.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
              <Fade in={!thisUserCart.loading} >
                <Paper elevation={5} style={{ backgroundColor: blk, width: 360, height: 200 }}>
                  <div>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography gutterBottom variant="h6" style={{ fontFamily: 'Pacifico', color: txt, marginTop: 10 }}>
                          {c.item?.brand.name}
                          {c.item?.isDeal ?
                            <Badge style={{ float: 'right', marginRight: 30, marginTop: 10, zIndex: 10 }} color='error' badgeContent={'-10%'}>
                            </Badge> : null}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography style={{ color: txt, fontFamily: 'ubuntu' }} variant="body2">
                      product type: {c.item?.type}<br />
                      {c.item?.type === 'drink' ? `flavor: ${c.flavor}` : `color: ${c.color}`}<br />
                      size: {c.size}<br />
                          price for {c.quantity} {c.item?.type === 'drink' ? 'cases' : 'shirts'}: ${c.price.toFixed(2)}<br />

                    </Typography>
                  </div>
                  <Button variant='contained' style={{ backgroundColor: bg, color: txt, marginTop: 20, marginBottom: 20 }} onClick={() => removeFromCart(c.id)}><DeleteForeverIcon /></Button>
                </Paper>
              </Fade>
            </Container >
          )}
        </Container >

        {/* //display total price and taxes */}
        <div style={{ display: 'block', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', height: 'auto', maxWidth: '360px', backgroundColor: blk, fontFamily: 'ubuntu', color: txt, marginLeft: 'auto', marginRight: 'auto' }}>
          {/* <Paper style={{ width: '100%', marginBottom: 0, textAlign: 'center' }} elevation={2}> */}
          {/* <Card variant="outlined" style={{ width: '100%', marginBottom: 20, backgroundColor: blk, }}> */}
          <Paper elevation={5}>
            <CardContent>

              <Typography style={{ fontFamily: 'ubuntu' }} variant='body1' gutterBottom >
                Subtotal: ${subtotal.toFixed(2)}
                <br />
              </Typography>
              <Typography style={{ fontFamily: 'ubuntu' }} variant='body1' gutterBottom >
                Tax @ {(TAX_RATE * 100).toFixed(0) + '%'}: ${tax}
                <br />
              </Typography>
              <br />
              <Typography variant="h5" gutterBottom style={{ fontFamily: 'Pacifico' }}>
                Total: ${total.toFixed(2)}
                <br />
              </Typography>
            </CardContent>
            <CardActions style={{ textAlign: 'center' }}>
              {/* <Button variant='contained' style={{ marginRight: 'auto', color: txt, backgroundColor: 'gray' }} href='/'>Go Back</Button> */}
              <Button variant='contained' style={{ marginLeft: 'auto', marginRight: 'auto', color: txt, backgroundColor: bg }} href='/checkout'>Checkout</Button>
            </CardActions>
            {/* </Card> */}
          </Paper>
        </div>
      </div >
    )
  }

}
export default CartDisplay