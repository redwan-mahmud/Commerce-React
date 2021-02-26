import React from 'react'
import {Typography, Button, Card, CardActions,CardContent, CardMedia} from '@material-ui/core'
import useStyles from './styles'
  export const CartItem = ({item, updateCart, removeCartItem}) => {
    const classes = useStyles();
    //console.log(item)
    const increaseItemCount = () =>{
        //console.log(`${item.quantity} prev quantity in cart`)
        item.quantity++;
        //console.log(`${item.quantity} new quantity in cart`)


        updateCart(item.id,item.quantity)
        //console.log("Catrt updated")
    }
    const decreaseItemCount = () =>{
        //console.log(`${item.quantity} prev quantity in cart`)
        item.quantity--;
        //console.log(`${item.quantity} new quantity in cart`)
        updateCart(item.id,item.quantity)

    }

    const removeItemFromCart = () => {
        console.log(item.id);
        removeCartItem(item.id);
    }

    return (
        <Card>
            <CardMedia image = {item.media.source} alt = {item.name} className = {classes.media}/>
            <CardContent className = {classes.cardContent}>
                <Typography variant = "h4">{item.name}</Typography>
                <Typography variant = "h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className ={classes.cardActions}>
                <div className = {classes.buttons}>
                    <Button type = "button" size = "small" onClick = {decreaseItemCount}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type = "button" size = "small" onClick = {increaseItemCount}>+</Button>
                </div>
                <Button type = "button" size = "small" color = "secondary" onClick = {removeItemFromCart}>Remove</Button>
                </CardActions>
        </Card>
    )
}


export default CartItem; 
