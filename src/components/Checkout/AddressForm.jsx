import {React, useState, useEffect} from 'react';
import {InputLabel,Select, MenuItem, Grid, Typography} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useForm, FormProvider} from 'react-hook-form';
import {commerce} from '../../lib/commerce'
import Button from '@material-ui/core/Button';
import {Link as LinkTo} from 'react-router-dom'
import useStyles from './styles'
import FormInput from './FormInput';

export default function AddressForm({checkoutToken, next}) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const classes = useStyles();
  const methods = useForm();
 
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label: name}))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id:code, label: name}))
  const options = shippingOptions.map((so)=> ({id: so.id, label: `${so.description} - (${so.price.formatted_with_symbol})`}) )
  //console.log(options)
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {  country,
    region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
    //console.log(options)
  };

  const backToCartButton = () => {
    return(
      <Button
                    component = {LinkTo}
                    to = "/cart"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    Back to Cart
                  </Button>
    )
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  
  
  
  return (
    <>  
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
      <form onSubmit = {methods.handleSubmit((data)=> next({...data,shippingCountry, shippingSubdivision,shippingOptions}))}>
      <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />

        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Country</InputLabel>
          <Select value = {shippingCountry} fullWidth onChange = {(e) => setShippingCountry(e.target.value)}>
            {countries.map((country)=>
                <MenuItem key = {country.id} value = {country.id} >
                {country.label}
              </MenuItem> 
            )}  
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping subdivision</InputLabel>
          <Select value = {shippingSubdivision} fullWidth onChange = {(e) => setShippingSubdivision(e.target.value)}>
            {subdivisions.map((subdivision)=>
                <MenuItem key = {subdivision.id} value = {subdivision.id} >
                {subdivision.label}
              </MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Options</InputLabel>
          <Select value = {shippingOption} fullWidth onChange = {(e) => setShippingOption(e.target.value)}>
            {options.map((option)=>
                <MenuItem key = {option.id} value = {option.id} >
                {option.label}
              </MenuItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  
                    <Button onClick={backToCartButton} className={classes.button}>
                      Back to Cart
                    </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    type = "submit"
                    className={classes.button}
                  >
                    Next
                  </Button>
                  
                </div>
      </form>
      </FormProvider>
    </>
  );
}