import React, { useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import { ALL_PRODUCTS, GET_CART, ME } from '../queries'
import { useQuery } from '@apollo/client'
import { Product } from '../types'
import { Grid, Divider, Chip, Container, FormControl, InputLabel, Select, Badge } from '@material-ui/core';
import Placeholder from '../assets/placeholder.jpg'
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client'
import { ADD_TO_CART } from '../queries'
import { AuthContext } from '../contexts/AuthContext';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Zoom from '@material-ui/core/Zoom';
import ProductSkeleton from './ProductSkeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '30%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop: '40px'
    },
    chip: {
      margin: theme.spacing(0.5),
      color: 'white',
      backgroundColor: 'gray'
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
      marginLeft: 0,
      paddingLeft: 0
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }),
);

const RecommendedDisplay = () => {
  const classes = useStyles();
  const { token } = useContext(AuthContext)
  const allProducts = useQuery(ALL_PRODUCTS)
  const [sizeSelection, setSizeSelection] = useState('')
  const [idSelection, setIdSelection] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [idQuantity, setIdQuantity] = useState('')
  const [idFlavor, setIdFlavor] = useState('')
  const [flavor, setFlavor] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [tryAddToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }]
  })
  const meQuery = useQuery(ME)
  const [updatingCart, setUpdatingCart] = useState(false)
  const bg = '#cf2b2b'
  const txt = 'white'
  const blk = 'rgb(43, 43, 41)'

  const deal = (num: number) => {
    const newPrice = (num * 0.9).toFixed(2)
    if (String(newPrice.indexOf(String(newPrice.length - 3))) !== '.') {
      newPrice.concat('0')
    }
    return newPrice
  }

  const selectSize = (e: React.SyntheticEvent, size: string, price: number, isDeal: boolean): void => {
    if (isDeal) {
      const discount: string = deal(price)
      const cost = Number(discount)
      setItemPrice(cost)
      setSizeSelection(size)
      setIdSelection(e.currentTarget.id)
    } else {
      setItemPrice(price)
      setSizeSelection(size)
      setIdSelection(e.currentTarget.id)
    }
  }
  const selectQuantity = (event: React.ChangeEvent<{ value: unknown; name?: unknown }>) => {
    setQuantity(event.target.value as number);
    setIdQuantity(event.currentTarget.name as string);
  };
  const selectFlavor = (event: React.ChangeEvent<{ value: unknown; name?: unknown }>) => {
    setFlavor(event.target.value as string);
    setIdFlavor(event.currentTarget.name as string);
  };
  if (!token) {
    return (
      <div style={{ display: 'block', textAlign: 'center', marginTop: 200 }}>
        <p style={{ marginTop: 20, fontFamily: 'Pacifico', fontSize: 24, color: txt }}>
          {`You haven't registered, so we don't have any recommendations for you yet...`}
        </p>
        <Button href='/register' style={{ width: 100, backgroundColor: blk, color: txt }}>Sign Up</Button>
      </div>
    )
  } else if (allProducts.loading) {
    return (
      <ProductSkeleton />
    )
  } else if (meQuery.loading || !meQuery.data) {
    return (
      <ProductSkeleton />
    )
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products: Product[] = allProducts.data.allProducts.filter((d: any) => d.flavors?.includes(meQuery.data.me.favoriteFlavor))
    const addToCart = async (event: React.SyntheticEvent) => {
      event.preventDefault()
      if (!token) {
        toast.warn('You must login first')
      }
      if (quantity === 0 || sizeSelection === '' || flavor === '') {
        return toast.warn('You must select a size, number of cases, and flavor')
      } else {
        try {
          setUpdatingCart(true)
          const chosenProduct = products.find(p => p.id === idSelection)
          await tryAddToCart({
            variables: {
              item: {
                id: idSelection,
                type: chosenProduct?.type,
                brand: {
                  name: chosenProduct?.brand.name
                },
              },
              quantity: Number(quantity),
              flavor: flavor,
              size: sizeSelection,
              price: quantity * itemPrice,
            }
          })
          setUpdatingCart(false)
          setIdQuantity('')
          setIdSelection('')
          setItemPrice(0)
          setQuantity(0)
          setSizeSelection('')
          setFlavor('')
          setIdFlavor('')
        } catch (error) {
          console.log(error)
          toast.error('Something went wrong...')
          setIdQuantity('')
          setIdSelection('')
          setItemPrice(0)
          setQuantity(0)
          setSizeSelection('')
          setFlavor('')
          setIdFlavor('')
        }
      }
    }
    const recommendedDisplay = products.map(p =>
      <Container key={p.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '10px', marginBottom: '20px' }}>
        <Zoom in={!allProducts.loading}>
          <Paper elevation={5} style={{ backgroundColor: blk }}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h5" style={{ fontFamily: 'Pacifico', color: txt }}>
                    {p.brand.name}
                    {p.isDeal ? <Badge style={{ float: 'right', marginRight: 10 }} badgeContent={'-10%'} color="secondary">
                      <LocalOfferIcon style={{ fontSize: 40 }} />
                    </Badge> : null}
                  </Typography>

                  <img src={Placeholder} alt='placeholder' />
                </Grid>
              </Grid>
              <Typography style={{ color: txt }} variant="body2">
                Order cases of your favorite soft drinks direct from the manufacturer!
        </Typography>
            </div>
            <Divider variant="middle" />
            <div id='chip-div' style={{ width: '100%', display: 'block', textAlign: 'center' }}>
              <Chip id={p.id} className={classes.chip} label={`${p.sizes[0]}: $${p.isDeal ? deal(+p.prices[0]) : p.prices[0]}`} onClick={(e) => selectSize(e, p.sizes[0], +p.prices[0], p.isDeal)} variant='outlined' clickable={true} />
              < Chip id={p.id} className={classes.chip} label={`${p.sizes[1]}: $${p.isDeal ? deal(+p.prices[1]) : p.prices[1]}`} onClick={(e) => selectSize(e, p.sizes[1], +p.prices[1], p.isDeal)} variant='outlined' clickable={true} />
              <Chip id={p.id} className={classes.chip} label={`${p.sizes[2]}: $${p.isDeal ? deal(+p.prices[2]) : p.prices[2]}`} onClick={(e) => selectSize(e, p.sizes[2], +p.prices[2], p.isDeal)} variant='outlined' clickable={true} />
            </div>
            <div className={classes.section3} style={{ width: '100%' }}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-quantity-native-simple" style={{ fontSize: 14, lineHeight: 0.25, color: bg }}>Cases</InputLabel>
                <Select
                  id={p.id}
                  native
                  value={(p.id === idQuantity) ? quantity : ''}
                  onChange={selectQuantity}
                  style={{ width: 80, height: 40, marginRight: 20, backgroundColor: txt }}
                  label="Cases"
                  inputProps={{
                    name: `${p.id}`,
                    id: 'outlined-quantity-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                  <option value={4}>Four</option>
                  <option value={5}>Five</option>
                  <option value={6}>Six</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-quantity-native-simple" style={{ fontSize: 14, lineHeight: 0.25, color: bg }}>Flavor</InputLabel>
                <Select
                  id={p.id}
                  native
                  value={(p.id === idFlavor) ? flavor : ''}
                  onChange={selectFlavor}
                  style={{ width: 110, height: 40, marginRight: 5, backgroundColor: txt }}
                  label="Flavor"
                  inputProps={{
                    name: `${p.id}`,
                    id: 'outlined-quantity-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {p.flavors.map(f =>
                    <option key={f} value={f}>{f}</option>
                  )}
                </Select>
              </FormControl>
              <Chip className={classes.chip} label={(p.id === idSelection) ? sizeSelection : null} variant='outlined' style={{ width: 90 }} />
              <div style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>
                <Button
                  variant='contained'
                  disabled={updatingCart && p.id === idSelection ? true : false}
                  size="medium" style={{ color: txt, backgroundColor: bg }}
                  endIcon={<AddShoppingCartIcon
                    style={{ fontSize: '20px' }} />}
                  onClick={addToCart}>
                  {(updatingCart && p.id === idSelection) ? 'Updating...' : 'Add to Cart'}</Button>
              </div>
            </div>
          </Paper>
        </Zoom>
      </Container >
    )

    return (
      <div style={{ backgroundColor: bg, textAlign: 'center', height: '100vw' }}>
        <p style={{ marginTop: 0, fontFamily: 'Pacifico', fontSize: 24, color: txt }}>{`Because your favorite flavor is ${meQuery.data.me.favoriteFlavor}...`}</p>
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          <>{recommendedDisplay}</>
        </Container>
      </div>
    )
  }
}
export default RecommendedDisplay