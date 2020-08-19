import React from 'react'
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const CheckoutSkeleton = () => {
  return (
    <React.Fragment>
      <Grid>
        <br />
        <Skeleton variant='rect' width={550} height={50} />
        <br />
      </Grid>
      <Skeleton variant='text' width={550} height={20} />
      <Skeleton variant='text' />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant='text' />
          <br />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant='text' />
          <br />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant='text' />
          <br />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant='text' />
          <br />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant='text' />
          <br />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant='text' />
          <br />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant='text' />
          <br />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant='text' />
          <br />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default CheckoutSkeleton