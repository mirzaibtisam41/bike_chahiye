import { CircularProgress, Container, Typography } from '@material-ui/core';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteUsedBikeApi, getUsedBikeByOwnerApi, serverURL } from '../../../common/api';
import { setMyUsedBikes } from '../../../redux/reducers/user';
import userAuth from '../Hoc/UserAuth';
import Alert from './Alert';
import Pagination from "../../useBikes/Pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#dc3545',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function BikeList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const User = useSelector(state => state.user.user);
    const myBikes = useSelector(state => state.user.myCreatedBikes);
    const [loading, setLoading] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState("");
    const [deletedBikeId, setDeletedBikeId] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);

    React.useEffect(() => {
        getMyBikeList();
    }, []);

    const getMyBikeList = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(getUsedBikeByOwnerApi, { userID: User?._id });
            if (data) {
                setLoading(false);
                dispatch(setMyUsedBikes(data));
            }
        } catch (error) {
            setLoading(false);
            toast.error('Error in fetching bikes ...!', {
                style: {
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    }

    const deleteMyBike = async (_id) => {
        setDeleteLoading(_id);
        setDeletedBikeId("");
        try {
            const { data } = await axios.post(deleteUsedBikeApi, { _id });
            if (data) {
                setDeleteLoading("");
                toast.success('Bike Delete Successfully', {
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                });
                const filter = myBikes.filter(item => item?._id !== data?._id);
                dispatch(setMyUsedBikes(filter));
            }
        } catch (error) {
            setDeleteLoading("");
            toast.error("Server Error Can't Delete Yet", {
                style: {
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const _filter = myBikes?.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return <Container style={{ padding: '2rem 0pc' }}>
        <Typography component="h1" variant="h3" style={{ marginBottom: '1rem' }}>
            Bikes List
        </Typography>
        <Alert
            deletedBikeId={deletedBikeId}
            setDeletedBikeId={setDeletedBikeId}
            deleteMyBike={deleteMyBike}
        />
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        {
            loading
                ?
                <div><CircularProgress style={{ color: '#dc3545' }} /></div>
                :
                myBikes.length > 0 ?
                    <TableContainer sx={{ mt: 3 }} component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Picture</StyledTableCell>
                                    <StyledTableCell>Brand</StyledTableCell>
                                    <StyledTableCell>No#</StyledTableCell>
                                    <StyledTableCell>Model</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    <StyledTableCell>Used (km)</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {_filter?.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            <img style={{ width: '60px', height: '60px' }} src={`${serverURL}${row.usedBikePic[0]}`} />
                                        </StyledTableCell>
                                        <StyledTableCell>{row.brand}</StyledTableCell>
                                        <StyledTableCell>{row.bikeNumber}</StyledTableCell>
                                        <StyledTableCell>{row.regYear}</StyledTableCell>
                                        <StyledTableCell>{row.category}</StyledTableCell>
                                        <StyledTableCell>{row.finalPrice}</StyledTableCell>
                                        <StyledTableCell>{row.totalUsed} km</StyledTableCell>
                                        {
                                            deleteLoading === row?._id ?
                                                <div style={{ marginTop: '18%' }}>
                                                    <CircularProgress
                                                        style={{ color: '#dc3545' }}
                                                        size={"2rem"}
                                                    />
                                                </div>
                                                :
                                                <StyledTableCell>
                                                    <IconButton>
                                                        <BorderColorOutlinedIcon onClick={() => navigate(`/create?bikeID=${row?._id}`)} />
                                                    </IconButton>
                                                    <IconButton onClick={() => setDeletedBikeId(row?._id)}>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </StyledTableCell>
                                        }
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <Container style={{ margin: "5% 0px" }}>
                        <Button
                            sx={{ mt: 1 }}
                            variant='outlined'
                            color='error'
                            onClick={() => navigate('/create')}
                        >
                            Add Bike
                        </Button>
                    </Container>
        }
        <Pagination
            total={myBikes?.length}
            postPerPage={postsPerPage}
            handleChange={handleChange}
        />
    </Container>
}

export default userAuth(BikeList);