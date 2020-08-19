import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { CheckoutContext } from '../contexts/CheckoutContext';
import { Cart } from '../types';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
    color: 'white'
  },
  total: {
    fontWeight: 700,
    color: 'white'
  },
  title: {
    marginTop: theme.spacing(2),
    color: 'white'
  },
}));
interface ChProps {
  cart: Cart[];
  total: number;
}
export default function Review(props: ChProps) {
  const classes = useStyles();
  const { cart, total } = props;
  const {
    shippingAddress,
    city,
    state,
    zip,
    country,
    formFirstName,
    formLastName,
    creditCardNameOnCard,
    creditCardExpire,
    creditCardNumber,

  } = useContext(CheckoutContext)
  // const bg = '#cf2b2b'
  const txt = 'white'
  // const blk = 'rgb(43, 43, 41)'

  const addresses = [shippingAddress, city, state, zip, country];
  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: `${creditCardNameOnCard}` },
    { name: 'Card number', detail: `xxxx-xxxx-xxxx-${creditCardNumber?.slice(creditCardNumber.length - 4)}` },
    { name: 'Expiry date', detail: `${creditCardExpire}` },
  ];

  return (
    <React.Fragment>
      <Typography style={{ color: txt }} variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText primary={`${product.item?.brand.name} ${product.item?.type === 'drink' ? product.flavor : product.color}`} />
            <Typography variant="body2">${product.price.toFixed(2)}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography style={{ color: txt }} gutterBottom>{`${formFirstName} ${formLastName}`}</Typography>
          <Typography style={{ color: txt }} gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography style={{ color: txt }} gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{ color: txt }} gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}