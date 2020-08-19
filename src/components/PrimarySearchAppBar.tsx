import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import MoreIcon from '@material-ui/icons/MoreVert';
import { AuthContext } from '../contexts/AuthContext';
import { Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ProductContext } from '../contexts/ProductContext';
import { GET_CART } from '../queries';
// import { ALL_PRODUCTS } from '../queries';
// import { Product } from '../types';
// import { useQuery } from '@apollo/client';
// import { GET_CART } from '../queries';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      color: 'white',
      marginTop: 0,
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'block',
      padding: '5',
      overflow: 'visible',
      fontFamily: 'Pacifico',
      color: 'white',
      fontVariant: 'none',
      textTransform: 'none',
      fontSize: '20px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '300px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100px',
      [theme.breakpoints.up('md')]: {
        width: '300px',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);
const PrimarySearchAppBar = () => {
  const { token, setToken } = useContext(AuthContext)
  const { search, setSearch } = useContext(ProductContext)
  const client = useApolloClient()
  const cartItems = useQuery(GET_CART)
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [cartLength, setCartLength] = useState(0)

  useEffect(() => {
    if (cartItems.data) {
      setCartLength(cartItems.data.getCart.length)

    }
  }, [cartItems.data])

  // let products: [] = []
  // const allProducts = useQuery(ALL_PRODUCTS)

  // if (allProducts.loading) {
  //   products = []
  // } else {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   products = allProducts.data.allProducts.filter((d: any) => d.brand.name.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1)
  // }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const toCart = () => {
    handleMobileMenuClose()
    history.push('/mycart')
  }
  const toAccount = () => {
    handleMobileMenuClose()
    handleMenuClose()
    history.push('/myaccount')
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value as string)
  }
  const logout = async () => {
    try {
      await client.resetStore()
      localStorage.clear()
      setToken(null)
      handleMenuClose()
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={toAccount}>My Orders</MenuItem>
      <MenuItem onClick={logout}>Sign out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={toCart}>
        <Button aria-label="show cart count" color="inherit" >
          <Badge badgeContent={cartLength} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Button>
        <p>My Cart</p>
      </MenuItem>
      <MenuItem onClick={toAccount}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>My Orders</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <EmojiPeopleIcon />
        </IconButton>
        <p>Sign out</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: '#2b2b29', fontFamily: 'Pacifico', width: '100%', marginTop: 0 }}>
        <Toolbar>
          <Button className={classes.title} href='/'>
            Pop Shop!
          </Button>
          <div style={{ marginLeft: '20px', color: 'white' }}>
          </div>
          {location.pathname === '/' ?
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            :
            null
          }
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!token ?
              <IconButton aria-label="login" color="inherit" href='/login' style={{ fontSize: '18px', fontFamily: 'Pacifico' }}>
                {location.pathname === '/login' ? null : 'Sign in'}
              </IconButton>
              :
              <Button aria-label="show cart count" color="inherit" href='/mycart' onClick={handleMenuClose}>
                <Badge badgeContent={cartLength} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </Button>
            }
            {!token ? null :
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            }
          </div>
          <div className={classes.sectionMobile}>
            {(!token) ?
              <IconButton aria-label="login" color="inherit" href='/login' style={{ fontFamily: 'Pacifico', fontSize: '16px', paddingLeft: '0', marginLeft: '0', paddingRight: '5' }}>
                {location.pathname === '/login' ? null : 'Sign in'}
              </IconButton>
              :
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            }
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
export default PrimarySearchAppBar