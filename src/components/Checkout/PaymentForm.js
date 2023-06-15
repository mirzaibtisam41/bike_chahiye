import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import BankList from './BankList';

export default function PaymentForm({ handleNext, activeStep, steps, receipt, setReceipt, number, setNumber, payment, setPayment }) {

    const [error, setError] = useState(null);
    const [error1, setError1] = useState(null);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{ marginTop: '2rem', width: '100%', display: 'flex', justifyContent: 'space-evenly' }}
                >
                    <FormControlLabel onChange={() => setPayment(0)} checked={payment === 0 && true} value="female" control={<Radio />} label="Bank Account" />
                    <FormControlLabel onChange={() => setPayment(1)} checked={payment === 1 && true} value="male" control={<Radio />} label="JazzCash/EasyPaisa" />
                </RadioGroup>
                <Container style={{ marginTop: '1rem' }}>
                    <BankList payment={payment} />
                    <section className='d-flex flex-column mt-3'>
                        <div style={{ textAlign: 'left' }}>
                            <Typography sx={{ marginBottom: '3px', marginLeft: '10px', color: '#dc3545', fontWeight: 'bold' }}>Bank Acc / Mobile No</Typography>
                            <TextField sx={{ width: '44%' }} onChange={(e) => setNumber(e.target.value)} id="outlined-basic" label="Enter your Bank/Mobile" variant="outlined" />
                            {error === true && <Typography sx={{ marginLeft: '10px', color: '#dc3545' }}>Bank/Mobile Required*</Typography>}
                            <br />
                        </div>
                        <br />
                        <div style={{ textAlign: 'left' }}>
                            <Typography sx={{ marginBottom: '3px', marginLeft: '10px', color: '#dc3545', fontWeight: 'bold' }}>Upload Paid Receipt</Typography>
                            <TextField error={error === true} onChange={(e) => {
                                setReceipt(e.target.files[0]);
                                setError(false);
                            }} type='file' id="outlined-basic" variant="outlined" />
                            {error1 === true && <Typography sx={{ marginLeft: '10px', color: '#dc3545' }}>Receipt Required*</Typography>}
                        </div>
                    </section>
                </Container>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={() => {
                            if (number === null) {
                                setError(true);
                            }
                            if (number !== null) {
                                setError(null);
                            }
                            if (receipt === null) {
                                setError1(true);
                            }
                            if (receipt !== null) {
                                setError1(null);
                            }
                            if (number !== null && receipt !== null) {
                                handleNext();
                            }
                        }}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                </Box>
            </Grid>
        </React.Fragment>
    );
}