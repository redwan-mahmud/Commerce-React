import {React, useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {TextField, InputLabel,Select, MenuItem} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useForm, FormProvider} from 'react-hook-form';
import {commerce} from '../../lib/commerce'


export default function AddressForm({checkoutToken}) {
  const [shippingCountries, setShippingCountires] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState([]);
  
  const methods = useForm();
   //console.log(checkoutToken)
   
  const fetchShippingCountries = async(checkoutTokenId)=>{
      const {countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
      //console.log(countries);
      setShippingCountires(countries);
      setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async(countrycode)=>{
    const { subdivisions } = await commerce.services.localeListSubdivisions(countrycode);
    //console.log(subdivisions);
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
}

  const fetchShippingOptions = async(checkoutTokenId, country, region =null) => {
    console.log(country)
    console.log(region)
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
    console.log(options)
    //console.log(setShippingOptions(options));
    //setShippingOption(options[0].id);
  }
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label: name}))
  const subdivisions = Object.entries(shippingSubDivisions).map(([code, name]) => ({id:code, label: name}))

  // const options = shippingOptions.map((so)=> ({id: so.id, label: `${so.description} - (${so.price.formatted_with_symbol})`}) )
  console.log(shippingOptions)

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  },[])
  
  //console.log(country)
  useEffect(()=> {
    if(shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])


  useEffect(()=> {
    if(shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
  }, [shippingSubDivision])
  
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
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
          <Select value = {shippingSubDivision} fullWidth onChange = {(e) => setShippingSubDivision(e.target.value)}>
            {subdivisions.map((subdivision)=>
                <MenuItem key = {subdivision.id} value = {subdivision.id} >
                {subdivision.label}
              </MenuItem>
            )}
          </Select>
        </Grid>
        {/*<Grid item xs={12} sm={6}>
          <InputLabel>Shipping Options</InputLabel>
          <Select value = {} fullWidth onChange = {}>
            <MenuItem key = {} value = {} >
              Select Me
            </MenuItem>
          </Select>
        </Grid> */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </>
  );
}