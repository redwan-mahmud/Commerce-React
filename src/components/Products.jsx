import React from 'react'
import {Grid} from '@material-ui/core';
import Product from './Product/Product'
const productslist = [
    {id:1, name: 'Shoes', description: 'Running shoes', price : "250", img : "https://images.unsplash.com/photo-1578116922645-3976907a7671?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1951&q=80"},
    {id:2, name: 'Macbook', description: 'Apple macbook', price : "2500", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80"},
];

const Products = () => {
    
    return (
        <main>
            <Grid container justify = "center" spacing = {4}>
                {productslist.map((product)=>(
                    <Grid item key = {product.id} xs = {12} sm={6} md={4} lg = {3}>
                        <Product product = {product}/>
                    </Grid>
                ))}
            </Grid>
        </main>

    )
}

export default Products
