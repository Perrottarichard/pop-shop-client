import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../queries';
import { Order } from '../types'
import { Typography, Container, Grid, LinearProgress } from '@material-ui/core';

const MyAccount = () => {

  const orderQuery = useQuery(GET_ORDERS)
  const bg = '#cf2b2b'
  const txt = 'white'
  const blk = 'rgb(43, 43, 41)'
  if (orderQuery.loading) {
    return (
      <div>
        <div id="timer" style={{ display: 'none', color: txt }}></div>
        <div style={{ backgroundColor: bg, height: '100vh', width: '100%' }}>
          <LinearProgress style={{ backgroundColor: 'black', zIndex: 1000, }} />
        </div>
      </div>
    )
  }
  const orders: Order[] = orderQuery.data.getOrders
  return (
    <div>
      <div id="timer" style={{ display: 'none', color: 'white' }}></div>
      <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', height: 'auto', width: '100%', padding: 0 }}>
        {orders.map(o =>
          // <Paper elevation={5} style={{ backgroundColor: blk, width: 'auto', height: 'auto' }}></Paper>
          <Container key={o.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '20px', marginBottom: '20px', textAlign: 'left', backgroundColor: blk, paddingLeft: 10 }}>
            <div>
              <Grid container >
                <Grid item xs>
                  <Typography variant="h6" style={{ fontFamily: 'ubuntu', color: txt, marginTop: 10 }}>
                    Order Confirmation: {o.confirmation}<br />
                    Date: {new Date(+o.date).toString().slice(0, 25)}
                  </Typography>
                  <Typography gutterBottom variant="h6" style={{ fontFamily: 'ubuntu', color: txt, marginTop: 10 }}>
                    {o.cart?.map(c =>
                      <div key={c.id}>
                        <Typography style={{ color: txt, fontFamily: 'ubuntu' }} variant="body2">
                          product type: {c.item?.type}<br />
                        brand: {c.item?.brand.name} <br />
                          {c.item?.type === 'drink' ? `flavor: ${c.flavor}` : `color: ${c.color}`}<br />
                            size: {c.size}<br />
                                price for {c.quantity} {c.item?.type === 'drink' ? 'cases' : 'shirts'}: ${c.price.toFixed(2)}<br />
                        </Typography>
                        <br />
                      </div>

                    )}
                    Total Billed: ${o.totalPrice?.toFixed(2)} <br />
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Container >

        )}
      </Container >
    </div>
  )
}
export default MyAccount