import React, {useState,useEffect} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {commerce} from '../../lib/commerce'
import useStyles from './styles'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Commerce
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Checkout({cart}) {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({});
  const steps = ['Shipping address', 'Payment details', 'Order Summary'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm checkoutToken = {checkoutToken} next = {next} />;
      case 1:
        return <PaymentForm handleBack = {handleBack} handleNext = {handleNext} checkoutToken = {checkoutToken} />;
      case 2:
        return <Review checkoutToken = {checkoutToken} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const next = (data) => {
    console.log(data)
    setShippingInfo(data);
    handleNext();
    
    
  }

  //console.log(shippingInfo)
  useEffect(() => {
    const generateToken = async() => {
      try{
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
        console.log(token)
        setCheckoutToken(token);
      } catch (error){
        console.log(error)
      }
    }
    generateToken();
  },[cart])

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };



  
  return (
    <React.Fragment>
      <CssBaseline />
      
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <Review />
            ) : checkoutToken && (
              <React.Fragment>
                {getStepContent(activeStep)}
                
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}