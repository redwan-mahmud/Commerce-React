import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart, RemoveShoppingCart } from '@material-ui/icons';
import useStyles from './styles'

const Navbar = ({totalItems, emptyCart}) => {
    const classes = useStyles()
    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography variant = "h6" className={classes.title} color = "inherit">
                    
                    Commerce 
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.button}>
                    <IconButton aria-label="Show cart items" color="inherit">
                        <Badge badgeContent ={totalItems} color ="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
                
                <div className={classes.button}>
                    <IconButton aria-label="Clear Cart" color="inherit" onClick = {emptyCart}>
                        <Badge badgeContent ="Empty Cart" color ="inherit">
                            <RemoveShoppingCart/>
                        </Badge>
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
