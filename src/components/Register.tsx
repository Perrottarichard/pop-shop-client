import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CREATE_USER } from '../queries'
import { useMutation } from '@apollo/client'
import { InputLabel } from '@material-ui/core';
import { toast } from 'react-toastify';

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: 'white' }} align="center">
      {'Copyright © '}
      <Link style={{ color: 'white' }} href="https://www.mangolatte.dev/">
        Pop Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
    color: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#cf2b2b',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#cf2b2b'
  },
}));

const Register = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedFavoriteFlavor, setSelectedFavoriteFlavor] = useState('');
  const history = useHistory()
  const txt = 'white'
  const blk = 'rgb(43, 43, 41)'

  const handleChangeFavoriteFlavor = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedFavoriteFlavor(event.target.value as string);
  };
  const onFNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value as string);
  }
  const onLNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value as string);
  }
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value as string);
  }
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value as string);
  }
  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value as string);
  }

  const [tryCreateUser] = useMutation(CREATE_USER)

  const submitSignUp = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      toast.warn('passwords must be the same')
    } else
      try {
        await tryCreateUser({
          variables: {
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: password,
            favoriteFlavor: selectedFavoriteFlavor
          }
        })
        setSelectedFavoriteFlavor('')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        history.push('/login')
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: blk, marginTop: 20 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontFamily: 'Pacifico' }}>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitSignUp} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={onFNChange}
                style={{ backgroundColor: txt }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={onLNChange}
                style={{ backgroundColor: txt }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={onEmailChange}
                value={email}
                style={{ backgroundColor: txt }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='filled'
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={onPasswordChange}
                style={{ backgroundColor: txt }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                style={{ backgroundColor: txt }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '160px', backgroundColor: txt, paddingLeft: 5 }}>
                <InputLabel style={{ paddingLeft: 10 }} id="demo-simple-select-label">Favorite Flavor</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={selectedFavoriteFlavor}
                  onChange={handleChangeFavoriteFlavor}
                  autoWidth
                >
                  <MenuItem value={'original'}>Original</MenuItem>
                  <MenuItem value={'root beer'}>Root Beer</MenuItem>
                  <MenuItem value={'orange'}>Orange</MenuItem>
                  <MenuItem value={'citrus'}>Citrus</MenuItem>
                  <MenuItem value={'cream'}>Cream</MenuItem>
                  <MenuItem value={'lemon-lime'}>Lemon Lime</MenuItem>
                  <MenuItem value={'cherry'}>Cherry</MenuItem>
                  <MenuItem value={'vanilla'}>Vanilla</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link style={{ color: txt, fontFamily: 'ubuntu' }} href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default Register