import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export default function AddressForm({ handleNext, activeStep, steps, setFormValues }) {
    const schema = Yup.object().shape({
        "First Name": Yup.string().required(),
        "Last Name": Yup.string().required(),
        "Address": Yup.string().required(),
        "City": Yup.string().required(),
        "Province": Yup.string().required(),
        "Zip": Yup.string().required(),
        "Country": Yup.string().required(),
    });
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Formik
                validationSchema={schema}
                initialValues={{
                    "First Name": "",
                    "Last Name": "",
                    "Address": "",
                    "City": "",
                    "Province": "",
                    "Zip": "",
                    "Country": "",
                }}
                onSubmit={values => {
                    if (values) {
                        setFormValues(values);
                        handleNext();
                    }
                }}
            >
                {({ handleChange, handleSubmit, errors, touched }) => (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="First Name"
                                name="First Name"
                                label="First Name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                            />
                            {
                                (errors["First Name"] && touched["First Name"]) &&
                                <Typography color={'error.main'}>
                                    {errors["First Name"]}
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Last Name"
                                name="Last Name"
                                label="Last Name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                onChange={handleChange}
                            />
                            {
                                (errors["Last Name"] && touched["Last Name"]) &&
                                <Typography color={'error.main'}>
                                    {errors["Last Name"]}
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="Address"
                                name="Address"
                                label="Address"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                                onChange={handleChange}
                            />
                            {
                                (errors["Address"] && touched["Address"]) &&
                                <Typography color={'error.main'}>
                                    {errors["Address"]}
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="City"
                                name="City"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                                onChange={handleChange}
                            />
                            {
                                (errors["City"] && touched["City"]) &&
                                <Typography color={'error.main'}>
                                    {errors["City"]}
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="Province"
                                name="Province"
                                label="Province"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />
                            {
                                (errors["Province"] && touched["Province"]) &&
                                <Typography color={'error.main'}>
                                    {errors["Province"]}
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Zip"
                                name="Zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                                onChange={handleChange}
                            />
                            {
                                (errors["Zip"] && touched["Zip"]) &&
                                <Typography color={'error.main'}>
                                    {errors["Zip"]}
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Country"
                                name="Country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                                onChange={handleChange}
                            />
                            {
                                (errors["Country"] && touched["Country"]) &&
                                <Typography color={'error.main'}>
                                    {errors["Country"]}
                                </Typography>
                            }
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <Button
                                variant="contained"
                                color='error'
                                onClick={handleSubmit}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </Grid>
                )}
            </Formik>

        </React.Fragment>
    );
}