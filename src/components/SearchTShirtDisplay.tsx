import React, { useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import { GET_CART } from '../queries'
import { Product } from '../types'
import { Grid, Divider, Chip, Container, FormControl, InputLabel, Select, Badge } from '@material-ui/core';
import Placeholder from '../assets/placeholder.jpg'
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client'
import { ADD_TO_CART } from '../queries'
import { AuthContext } from '../contexts/AuthContext';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { ProductContext } from '../contexts/ProductContext';

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
interface Props {
  products: Product[];
}
const SearchTShirtDisplay = (props: Props) => {
  const classes = useStyles();
  const { token } = useContext(AuthContext)
  const { sortType, setSortType, abcSort, cbaSort, cheapSort, expensiveSort } = useContext(ProductContext)
  const { products } = props
  const [sizeSelection, setSizeSelection] = useState('')
  const [idSelection, setIdSelection] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [idColor, setIdColor] = useState('')
  const [color, setColor] = useState('')
  const [idQuantity, setIdQuantity] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [tryAddToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }]
  })
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
  const selectColor = (event: React.ChangeEvent<{ value: unknown; name?: unknown }>) => {
    setColor(event.target.value as string);
    setIdColor(event.currentTarget.name as string);
  };

  const addToCart = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!token) {
      toast.warn('You must login first')
    }
    if (quantity === 0 || sizeSelection === '' || color === '') {
      return toast.warn('You must select a size, quantity, and color')
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
            color: color,
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
        setIdColor('')
        setColor('')
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong...')
        setIdQuantity('')
        setIdSelection('')
        setItemPrice(0)
        setQuantity(0)
        setSizeSelection('')
        setIdColor('')
        setColor('')
      }
    }
  }
  switch (sortType) {
    case 'abc':
      abcSort(products)
      break;
    case 'cba':
      cbaSort(products)
      break;
    case 'cheap':
      cheapSort(products)
      break;
    case 'expensive':
      expensiveSort(products)
      break;
    default:
      break;
  }
  const searchTShirtDisplay = products.map(p =>
    <Container key={p.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '360px', marginTop: '20px', marginBottom: '20px', minHeight: '475px' }}>
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
              <Typography gutterBottom variant="body1" style={{ color: txt }}>
                Product type: {p.type.toUpperCase()}
              </Typography>
              <img src={Placeholder} alt='placeholder' />
            </Grid>
          </Grid>
          <Typography style={{ color: txt }} variant="body2">
            High quality t-shirts with your favorite brand logo front and center.
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
            <InputLabel htmlFor="outlined-quantity-native-simple" style={{ fontSize: 14, lineHeight: 0.25, color: bg }}>Quantity</InputLabel>
            <Select
              id={p.id}
              native
              value={(p.id === idQuantity) ? quantity : ''}
              onChange={selectQuantity}
              style={{ width: 100, height: 40, marginRight: 20, backgroundColor: txt }}
              label="Quantity"
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
            <InputLabel htmlFor="outlined-quantity-native-simple" style={{ fontSize: 14, lineHeight: 0.25, color: bg }}>Colors</InputLabel>
            <Select
              id={p.id}
              native
              value={(p.id === idColor) ? color : ''}
              onChange={selectColor}
              style={{ width: 100, height: 40, marginRight: 20, backgroundColor: txt }}
              label="Colors"
              inputProps={{
                name: `${p.id}`,
                id: 'outlined-quantity-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {p.colors.map(c =>
                <option key={c} value={c}>{c}</option>
              )}
            </Select>
          </FormControl>
          <Chip className={classes.chip} label={(p.id === idSelection) ? sizeSelection : null} variant='outlined' style={{ width: 50 }} />
          <div style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>
            <Button variant='contained' size="medium" style={{ color: txt, backgroundColor: bg }} endIcon={<AddShoppingCartIcon style={{ fontSize: '20px' }} />} onClick={addToCart}>
              {(updatingCart && p.id === idSelection) ? 'Updating...' : 'Add to Cart'}</Button>
          </div>
        </div>
      </Paper>
    </Container >
  )
  return (
    <div style={{ backgroundColor: bg }}>
      <Button style={{ color: 'white', fontSize: 12 }} disabled>T-Shirts:</Button>
      <Button style={{ color: txt, fontSize: 10 }} onClick={() => setSortType('abc')}><ArrowUpwardIcon />abc</Button>
      <Button style={{ color: txt, fontSize: 10 }} onClick={() => setSortType('cba')}><ArrowDownwardIcon />zyx</Button>
      <Button style={{ color: txt, fontSize: 10 }} onClick={() => setSortType('cheap')}><ArrowUpwardIcon /><MonetizationOnIcon /></Button>
      <Button style={{ color: txt, fontSize: 10 }} onClick={() => setSortType('expensive')}><ArrowDownwardIcon /><MonetizationOnIcon /></Button>
      <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <>{searchTShirtDisplay}</>
      </Container>
    </div>
  );
}
export default SearchTShirtDisplay