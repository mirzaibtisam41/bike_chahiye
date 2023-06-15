import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updatePasswordApi } from '../../../common/api';
import { logoutUser } from '../../../redux/reducers/user';

const theme = createTheme();

const Profile = () => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user.user);
    const [loading, setLoading] = React.useState(false);

    const schema = Yup.object().shape({
        password: Yup.string().required().min(5),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const saveUser = async (values) => {
        setLoading(true);
        try {
            const { data } = await axios.post(updatePasswordApi, { email: User.email, password: values.password });
            if (data) {
                setLoading(false);
                dispatch(logoutUser());
                setTimeout(() => {
                    toast.error(data.message, {
                        style: {
                            background: '#333',
                            color: '#fff',
                        }
                    });
                }, 1000);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Server error...!', {
                style: {
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    }

    return <React.Fragment>
        <ThemeProvider theme={theme}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={values => saveUser(values)}
                >
                    {({ handleChange, handleSubmit, errors, touched }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            autoFocus
                                            onChange={handleChange}
                                            value={User?.name}
                                            sx={{ borderStyle: 'none' }}
                                            inputProps={{ readOnly: true, }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            value={User?.email}
                                            name="email"
                                            autoComplete="email"
                                            onChange={handleChange}
                                            inputProps={{ readOnly: true, }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phone"
                                            value={User?.phone}
                                            name="phone"
                                            autoComplete="phone"
                                            onChange={handleChange}
                                            inputProps={{ readOnly: true, }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="address"
                                            value={User?.address}
                                            name="address"
                                            autoComplete="address"
                                            onChange={handleChange}
                                            inputProps={{ readOnly: true, }}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            onChange={handleChange}
                                            error={(errors.password && touched.password) ? true : false}
                                        />
                                        {
                                            (errors.password && touched.password) &&
                                            <Typography color={'error.main'}>
                                                {errors.password}
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="cpassword"
                                            onChange={handleChange}
                                            error={(errors.confirmPassword && touched.confirmPassword) ? true : false}
                                        />
                                        {
                                            (errors.confirmPassword && touched.confirmPassword) &&
                                            <Typography color={'error.main'}>
                                                {errors.confirmPassword}
                                            </Typography>
                                        }
                                    </Grid> */}
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color='error'
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => dispatch(logoutUser())}
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <CircularProgress style={{ color: '#dc3545' }} /> : "Log Out"}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Container>
        </ThemeProvider>
    </React.Fragment>
}

export default Profile;