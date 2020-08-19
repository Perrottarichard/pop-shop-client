import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '30%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop: '40px'
    },
    chip: {
      margin: theme.spacing(1),
    },
    section1: {
      margin: theme.spacing(3),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(2),
    },
  }),
);

const ProductSkeleton = () => {
  const classes = useStyles();
  const skel =
    <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '50px', marginBottom: '20px' }}>
      <Paper elevation={5} style={{ backgroundColor: 'rgb(43, 43, 41)' }}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Skeleton variant='rect' width={310} height={40} />
            <Grid item xs>
              <Typography gutterBottom variant="h5">
                <Skeleton variant='rect' width={310} height={20} />
              </Typography>
              <Skeleton variant='rect' width={310} height={80} />
            </Grid>
          </Grid>
          <Typography color="textSecondary" variant="body2">
            <Skeleton variant='rect' width={310} height={40} />
          </Typography>
        </div>
        <Divider variant="middle" />
        <div id='chip-div' style={{ width: '100%', display: 'block' }}>
          <Skeleton variant='rect' width={310} height={60} style={{ marginLeft: '20px', marginRight: '20px', marginTop: '10px' }} />
        </div>
        <div id='chip-div' style={{ width: '100%', display: 'block' }}>
          <Skeleton variant='rect' width={310} height={40} style={{ marginLeft: '20px', marginRight: '20px', marginTop: '10px', marginBottom: '20px' }} />
        </div>
        <div id='chip-div' style={{ width: '100%', display: 'block' }}>
          <Skeleton variant='rect' width={310} height={40} style={{ marginLeft: '20px', marginRight: '20px', marginTop: '10px', marginBottom: '20px' }} />
        </div>
      </Paper>
    </Container >

  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      <>{skel}</>
      <>{skel}</>
      <>{skel}</>
      <>{skel}</>
      <>{skel}</>
      <>{skel}</>
    </Container>
  );
}
export default ProductSkeleton