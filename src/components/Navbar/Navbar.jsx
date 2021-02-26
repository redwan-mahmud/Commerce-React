import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart, RemoveShoppingCart } from '@material-ui/icons';
import useStyles from './styles'
import {Link, useLocation} from 'react-router-dom';
const Navbar = ({totalItems, emptyCart}) => {
    const location = useLocation();
    const classes = useStyles()
    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component = {Link} to ="/"variant = "h6" className={classes.title} color = "inherit">
                    
                    Commerce 
                </Typography>
                <div className={classes.grow}/>
                {location.pathname === '/' &&(
                    <>
                    <div className={classes.button}>
                    <IconButton component = {Link} to ="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent ={totalItems} color ="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
                </>
                )}
                

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
