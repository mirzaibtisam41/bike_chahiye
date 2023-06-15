import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderByUser, serverURL } from '../../../common/api';
import { useState } from 'react';
import moment from 'moment';
import { Typography, Container, CircularProgress } from '@mui/material';

export default function BasicTable() {
    const User = useSelector((state) => state.user.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMyOrders();
    }, [])

    const getMyOrders = async () => {
        setLoading(true);
        try {
            const obj = {
                user: User?._id
            }
            const { data } = await axios.post(getOrderByUser, obj);
            if (data) {
                setLoading(false);
                setOrders(data);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    return <>
        <Typography variant="h4" style={{ margin: '1.3rem 0px' }}>
            My Order's List
        </Typography>
        {
            loading ? <CircularProgress style={{ color: 'red' }} />
                :
                <TableContainer component={Paper}>
                    <Container>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='bold text-danger' align='center'>Product</TableCell>
                                    <TableCell className='bold text-danger' align='center'>Name</TableCell>
                                    <TableCell className='bold text-danger' align='center'>Price</TableCell>
                                    <TableCell className='bold text-danger' align='center'>Quantity</TableCell>
                                    <TableCell className='bold text-danger' align='center'>Status</TableCell>
                                    <TableCell className='bold text-danger' align='center'>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.map((row, index) => {
                                    if (index < 2) {
                                        const product = JSON.parse(row?.product[0])?.product;
                                        const count = JSON.parse(row?.product[0])?.count;
                                        return (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align='center' component="th" scope="row">
                                                    {
                                                        product?.partPic ?
                                                            <img style={{ width: '50px', height: '50px' }} src={`${serverURL}/${product?.partPic[0]}`} />
                                                            :
                                                            <img style={{ width: '50px', height: '50px' }} src={`${serverURL}/${product?.productPic[0]}`} />
                                                    }
                                                </TableCell>
                                                <TableCell align='center' component="th" scope="row">
                                                    {product?.name}
                                                </TableCell>
                                                <TableCell align='center'>{row?.payment}</TableCell>
                                                <TableCell align='center'>{count}</TableCell>
                                                <TableCell align='center'>{row?.status}</TableCell>
                                                <TableCell align='center'>{moment(row?.createdAt).format('LL')}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </Container>
                </TableContainer>
        }
    </>
}