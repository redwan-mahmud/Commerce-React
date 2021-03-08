import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


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

export default function Review( {checkoutToken, shippingData}) {
  const classes = useStyles();
  console.log(shippingData)
  console.log(checkoutToken)
  const cartProducts = checkoutToken.live.line_items;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Thank you for your Purchase 
      </Typography>
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Customer Name
          </Typography>
          <Typography gutterBottom>{shippingData.firstName} {shippingData.lastName}</Typography>
          <Typography gutterBottom></Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Typography gutterBottom>Amount paid in full</Typography>
         
        </Grid>
      </Grid>
    </React.Fragment>
  );
}