import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { registerUserApi } from '../../../common/api';
import { setUserData } from '../../../redux/reducers/user';
import Auth from '../Hoc';

const theme = createTheme();

const SignUp = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        phone: Yup.number().required(),
        address: Yup.string().required(),
        password: Yup.string().required().min(5),
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const saveUser = async (values) => {
        setLoading(true);
        try {
            const { data } = await axios.post(registerUserApi, values);
            if (data) {
                setLoading(false);
                toast.error(data.msg, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                });
                dispatch(setUserData(data));
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        image: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={values => saveUser(values)}
                >
                    {({ handleChange, handleSubmit, errors, touched }) => (
                        <Box
                            sx={{
                                marginTop: 5,
                                marginBottom: 7,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: '#dc3545', color: 'white' }}>
                                <LockOutlinedIcon sx={{ color: 'white !important' }} />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            autoFocus
                                            onChange={handleChange}
                                            sx={{ borderStyle: 'none' }}
                                            error={(errors.name && touched.name) ? true : false}
                                        />
                                        {
                                            (errors.name && touched.name) &&
                                            <Typography color={'error.main'}>
                                                {errors.name}
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            onChange={handleChange}
                                            error={(errors.email && touched.email) ? true : false}
                                        />
                                        {
                                            (errors.email && touched.email) &&
                                            <Typography color={'error.main'}>
                                                {errors.email}
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            name="phone"
                                            autoComplete="phone"
                                            onChange={handleChange}
                                            error={(errors.phone && touched.phone) ? true : false}
                                        />
                                        {
                                            (errors.phone && touched.phone) &&
                                            <Typography color={'error.main'}>
                                                {errors.phone}
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            name="address"
                                            autoComplete="address"
                                            onChange={handleChange}
                                            multiline
                                            rows={3}
                                            error={(errors.address && touched.address) ? true : false}
                                        />
                                        {
                                            (errors.address && touched.address) &&
                                            <Typography color={'error.main'}>
                                                {errors.address}
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color='error'
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <CircularProgress style={{ color: '#dc3545' }} /> : "Sign Up"}
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Container>
        </ThemeProvider>
    </React.Fragment>
}

export default Auth(SignUp);