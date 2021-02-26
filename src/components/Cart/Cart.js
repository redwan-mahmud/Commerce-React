import React from 'react';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import useStyles from './styles'
import CartItem from './CartItem/CartItem';
export const Cart = ({cart, emptyCart, updateCart, removeCartItem}) => {
    const classes = useStyles()
    console.log(`${cart.total_items} items in cart`)
    const items = cart.line_items
    //const isEmpty = cart.line_items.length ===0;

    const EmptyCart = () => (
        <Typography variant = "subtitle1">You have no items in your cart.</Typography>
    )

    const FilledCart = () => {
        return(
            <>
        <Grid container justify = "center" spacing = {4}>
        {items && items.map((item)=> (
            <Grid item key = {item.id} xs = {12} sm={6} md={4} lg = {3}>
                
                       <CartItem item = {item} updateCart = {updateCart} removeCartItem = {removeCartItem}/> 
            </Grid>
        ))}
        </Grid>
        <div className = {classes.cardDetails}>
            <Typography variant = "h4"> Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className = {classes.emptyButton}size ="large" type = "button" variant = "contained" color = "secondary" onClick = {emptyCart}>Clear Cart</Button>
                <Button className = {classes.checkoutButton}size ="large" type = "button" variant = "contained" color = "primary">Check Out</Button>
            </div>
        </div>

        </>
        )
    }
    if(!cart.line_items) return "Loading..."
    return (
        <Container>
            <div className = {classes.toolbar}/>
            <Typography className = {classes.title} variant = "h3">Your Shopping Cart</Typography>
            {cart.total_items===0 ? <EmptyCart /> : <FilledCart/>}
        </Container>
        
    )
}
export default Cart;
