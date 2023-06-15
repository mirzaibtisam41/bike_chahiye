import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import commaNumber from "comma-number";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createOrderApi } from '../../common/api';
import ShippingTable from './Table';
import toast, { Toaster } from "react-hot-toast";
import { removeCartProducts } from '../../redux/reducers/productSlice';

export default function Review({ handleNext, activeStep, steps, values, receipt, number, payment }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const storeCart = useSelector((state) => state.products.cart);
    const User = useSelector((state) => state.user.user);

    const [totalPayment, setPayment] = useState(0);
    const [totalDiscount, setDiscount] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        calculatePayment();
    }, [storeCart]);

    const calculatePayment = () => {
        const _find = storeCart?.find(item => item?.product?._id == params?.id);
        // const payment = storeCart?.reduce((acc, next) => {
        //     return acc + next?.product?.price * next?.count;
        // }, 0);
        const totalPayment = _find?.product?.price;
        setPayment(totalPayment);

        // const discount = storeCart?.reduce((acc, next) => {
        //     return acc + next?.product?.discount * next?.count;
        // }, 0);
        const discount = _find?.product?.discount;
        setDiscount(discount);
    };

    const placeOrder = async () => {
        setLoading(true);
        const _find = storeCart?.find(item => item?.product?._id == params?.id);
        const formData = new FormData();
        formData.append('owner', _find?.product?.owner)
        formData.append('user', User?._id)
        formData.append('product', [JSON.stringify(_find)])
        formData.append('cardName', payment == 0 ? 'Bank Account' : 'JazzCash/EasyPaisa')
        formData.append('cardNumber', number)
        formData.append('streetAddress', values?.Address)
        formData.append('city', values?.City)
        formData.append('state', values?.Province)
        formData.append('zipCode', values?.Zip)
        formData.append('payment', _find?.product?.price - _find?.product?.discount)
        formData.append('image', receipt)

        try {
            const { data } = await axios.post(createOrderApi, formData);
            if (data) {
                setLoading(false);
                if (data?.success == true) {
                    toast.success(data.message);
                    dispatch(removeCartProducts({ _id: _find?.product?._id }));
                    setTimeout(() => {
                        navigate('/my-orders');
                    }, 1000);
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <React.Fragment>
            <Toaster position="top-right" reverseOrder={false} />
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {storeCart?.map(p => {
                    if (p?.product?._id == params?.id) {
                        return <ListItem key={p?.product?._id} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={p?.product?.name} secondary={`${p?.count} Unit`} />
                            <Typography variant="body2">{`PKR ${commaNumber(p?.product?.price)}`}</Typography>
                        </ListItem>
                    }
                })}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        PKR {commaNumber(totalPayment - totalDiscount)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item container xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping Details
                    </Typography>
                    <Grid container>
                        <ShippingTable values={values} />
                    </Grid>
                </Grid>
                <Grid className='p-3 d-flex justify-content-between'>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment Receipt
                    </Typography>
                    <Grid>
                        <img style={{
                            width: '100px',
                            height: '100px'
                        }}
                            src={URL.createObjectURL(receipt)}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={() => {
                            if (activeStep !== 2) {
                                handleNext();
                            }
                            else {
                                placeOrder();
                            }
                        }}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {loading ? <CircularProgress style={{ color: "white" }} /> : activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                </Box>
            </Grid>
        </React.Fragment>
    );
}