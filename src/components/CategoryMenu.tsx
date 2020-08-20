/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Soda from '../assets/soft-drink.jpeg'
import Shirts from '../assets/shirts.png'
import DOD from '../assets/dod.png'
import Recommended from '../assets/sodagirl.png'
import { Container, Card, CardActionArea, CardContent, Typography, Paper, Zoom } from '@material-ui/core';
import { ProductContext } from '../contexts/ProductContext';
import SearchDrinkDisplay from './SearchDrinkDisplay';
import SearchTShirtDisplay from './SearchTShirtDisplay';
import { Product } from '../types';


const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: '#cf2b2b',
      minWidth: '280px',
      fontFamily: 'Pacifico'
    }
  })
);

export default function CategoryMenu() {
  const classes = useStyles();
  const { search } = useContext(ProductContext)
  let { products } = useContext(ProductContext)
  const location = useLocation()

  const deadlineGMT = new Date()
  const endOfDay = deadlineGMT.toString().replace(/\d\d:\d\d:\d\d/g, '23:59:59')
  const deadline = new Date(endOfDay).getTime()

  const myTimer = () => {
    const now = new Date().getTime()
    const t = deadline - now;
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString()
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString()
    let seconds = Math.floor((t % (1000 * 60)) / 1000).toString()

    if (minutes.toString().length === 1) {
      minutes = '0' + minutes.toString()
    }
    if (seconds.toString().length === 1) {
      seconds = '0' + seconds.toString()
    }
    if (location.pathname === '/') {
      document.getElementById("timer")!.innerHTML = `${hours.toString()}:${minutes.toString()}:${seconds.toString()}`
    }
  }
  const countdown = setInterval(myTimer, 1000)
  const stopCountdown = () => {
    clearInterval(countdown)
  }
  if (location.pathname !== '/' || search.length !== 0) {
    stopCountdown()
  }

  const tileData = [
    {
      img: Recommended,
      title: 'Recommended',
      ref: '/recommended',
      desc: 'Browse our catalog of items recommended just for you...'
    },
    {
      img: Soda,
      title: 'Drinks',
      ref: '/drinks',
      desc: 'Browse our assortment of the world\'s most popular soft drinks'
    },
    {
      img: Shirts,
      title: 'T-Shirts',
      ref: '/tshirts',
      desc: 'Shop our online catalog of t-shirts with your favorite brand logos'
    },
    {
      img: DOD,
      title: 'Deals of the Day',
      ref: '/deals',
      desc: 'Hurry to get the hottest deals on your favorite products before the promotion expires!'
    }
  ]

  if (search.length > 0) {
    const brandFilter = products.filter((d: any) => d.brand.name.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1)
    const flavorFilter = products.filter(p => p.flavors.some((f: any) => f.indexOf(search.toLowerCase()) !== -1))

    const arr: Product[] = brandFilter.concat(flavorFilter)
    const uniqueSet = new Set(arr)
    products = [...uniqueSet]
    const drinks = products.filter(p => p.type === 'drink')
    const shirts = products.filter(p => p.type === 'TShirt')

    if (drinks.concat(shirts).length === 0) {
      return (
        <div style={{ display: 'block', textAlign: 'center' }}>
          <div id='timer' style={{ display: 'none', color: 'white' }}></div>
          <h6 style={{ fontSize: 20, marginTop: 20, fontFamily: 'ubuntu', color: 'white' }}>...No results</h6>
        </div>
      )
    }
    return (
      <div style={{ backgroundColor: '#cf2b2b', height: '100vw', width: 'inherit' }}>
        <div id='timer' style={{ display: 'none', color: 'white' }}></div>
        <SearchDrinkDisplay products={drinks} />

        <SearchTShirtDisplay products={shirts} />
      </div >
    )
  }
  return (
    <div className={classes.root}>
      <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '5%', paddingBottom: '5%' }}>
        {tileData.map((tile) => (
          <Zoom key={tile.title} in={search.length === 0}>
            <Paper elevation={5} style={{ width: '360px', marginTop: '20px', marginBottom: '20px', marginLeft: '10px', marginRight: '10px', height: '360px' }}>
              <Card>
                <CardActionArea href={tile.ref}>
                  <img src={tile.img} alt={tile.title} style={{ width: '100%', height: '240px' }} />
                  {tile.title === 'Deals of the Day' && search.length === 0 && location.pathname === '/' ?
                    <div id='timer' style={{ position: 'absolute', top: 8, right: 16, fontSize: 24, color: 'red' }}>
                    </div> : null}
                  <CardContent>
                    <Typography gutterBottom variant="h5" style={{ fontFamily: 'Pacifico', color: 'rgb(43, 43, 41)' }}>
                      {tile.title}

                    </Typography>
                    <Typography variant="body2" style={{ color: 'rgb(43, 43, 41)', fontFamily: 'ubuntu' }} component="p">
                      {tile.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </Zoom>
        ))
        }
      </Container>
    </div>
  );
}
