import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ME } from '../queries'
import { AuthContext } from '../contexts/AuthContext'

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: 'white', fontFamily: 'ubuntu', fontSize: 10 }} align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.mangolatte.dev">
        Pop Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    color: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#cf2b2b',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#cf2b2b'
  },
}));

const Login = () => {
  const { setToken } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const txt = 'white'
  const blk = 'rgb(43, 43, 41)'

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      toast.error(error.message)
      setEmail('')
      setPassword('')
    },
    update: (store, response) => {
      store.writeQuery({
        query: ME,
        data: { ...response.data.me }
      })
    }
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('pop-shop-user-token', token)
      history.push('/')
    }
  }, [result.data, setToken, history])

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value as string);
  }
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value as string);
  }

  const submitLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    login({ variables: { email: email.toLowerCase(), password: password } })
  }
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: blk, marginTop: 20 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontFamily: 'Pacifico' }}>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitLogin} noValidate>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onEmailChange}
            style={{ backgroundColor: txt, fontFamily: 'ubuntu' }}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onPasswordChange}
            style={{ backgroundColor: txt }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link style={{ color: txt, fontFamily: 'ubuntu' }} href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login