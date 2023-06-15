import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
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
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { updatePasswordApi } from '../../../common/api';
import { setUserData } from '../../../redux/reducers/user';
import Auth from '../Hoc';

const theme = createTheme();

const SignIn = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    const verifyUser = async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post(updatePasswordApi, values);
            if (data.message) {
                setLoading(false);
                toast.success(data.message, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                });
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message, {
                style: {
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    };

    return <React.Fragment>
        <ThemeProvider theme={theme}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Formik
                validationSchema={schema}
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={values => verifyUser(values)}
            >
                {({ handleChange, handleSubmit, errors, touched }) => (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
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
                                Update Password
                            </Typography>
                            <Box noValidate sx={{ mt: 1 }}>
                                <Grid container>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
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
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            margin="normal"
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
                                </Grid>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color='error'
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <CircularProgress style={{ color: '#dc3545' }} /> : "Update"}
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                )}
            </Formik>
        </ThemeProvider>
    </React.Fragment>
}

export default Auth(SignIn);