import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {loadStripe} from '@stripe/stripe-js'
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('...')
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
export default function PaymentForm({handleNext,handleBack ,checkoutToken}) {
  const classes = useStyles();
  const cartProducts = checkoutToken.live.line_items;
  return (
    <>
    <Divider/>
    <List disablePadding>
        {cartProducts.map((product) => (
          <ListItem className={classes.listItem} key={product.product_id}>
            <ListItemText primary={product.product_name} secondary= {`Quantity : ${product.quantity}`}/>
            <Typography variant="body2">{product.price.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {checkoutToken.live.total.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    <Typography variant = "h6" gutterBottom style ={{margin: '20px 0'}}> Payment method</Typography>
    <Elements stripe = {stripePromise}>
      <ElementsConsumer>
        {({elements, stripe})=> (
          <form> 
            <CardElement />
            <br/>
            <div style = {{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant = "outlined" onClick = {handleBack}>Back</Button>
              <Button type = "submit" variant = "contained" disabled = {!stripe} color = "primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>

            </div>
          </form>
        )}
      </ElementsConsumer>
    </Elements>

    </>
  );
};
  
