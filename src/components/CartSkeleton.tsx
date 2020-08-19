import React from 'react';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, CardContent, Typography, Grid, CardActions } from '@material-ui/core';


const CartSkeleton = () => {
  return (
    <div >
      {/* hacky way to avoid error on view change */}
      <div id='timer' style={{ display: 'none' }}></div>
      <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', minHeight: '60vh' }}>
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <Paper elevation={5} style={{ width: 360, height: 200, backgroundColor: 'rgb(43, 43, 41)' }}>
            <div>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h6" style={{ marginTop: 10 }}>
                    <Skeleton variant='text' />
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2">
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
              </Typography>
            </div>
          </Paper>
        </Container >
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <Paper elevation={5} style={{ width: 360, height: 200, backgroundColor: 'rgb(43, 43, 41)' }}>
            <div>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h6" style={{ marginTop: 10 }}>
                    <Skeleton variant='text' /><br />
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2">
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
              </Typography>
            </div>
          </Paper>
        </Container >
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <Paper elevation={5} style={{ width: 360, height: 200, backgroundColor: 'rgb(43, 43, 41)' }}>
            <div>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h6" style={{ marginTop: 10 }}>
                    <Skeleton variant='text' />
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2">
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
                <Skeleton variant='text' /><br />
              </Typography>
            </div>
          </Paper>
        </Container >
      </Container >
      <div style={{ display: 'block', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', height: '50vh', width: '100%', backgroundColor: 'rgb(43, 43, 41)' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant='body1' gutterBottom >
            <Skeleton variant='text' />
            <br />
          </Typography>
          <Typography variant='body1' gutterBottom >
            <Skeleton variant='text' />
            <br />
          </Typography>
          <br />
          <Typography variant="h5" gutterBottom>
            <Skeleton variant='text' />
            <br />
          </Typography>
        </CardContent>
        <CardActions style={{ textAlign: 'center' }}>
          <Skeleton variant='rect' width={100} height={50} />
          <Skeleton variant='rect' width={100} height={50} />
        </CardActions>
      </div>
    </div >
  )
}
export default CartSkeleton