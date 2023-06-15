import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { serverURL } from '../../common/api';
import { Container } from '@mui/material';
import moment from 'moment/moment';
import { useNavigate } from 'react-router';

export default function MediaCard({ bike, dataType }) {
    const navigate = useNavigate();
    return (
        <Card>
            <CardMedia
                sx={{ height: 175, objectFit: 'fill' }}
                image={`${serverURL}${bike?.usedBikePic ? bike?.usedBikePic[0] : bike?.partPic[0]}`}
                title="bike"
            />
            <CardContent>
                <Container
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: "10px",
                        padding: '0'
                    }}
                >
                    {
                        dataType === "spareParts" ?
                            <Typography variant="h6">
                                {`${bike?.brand}${"-"}${bike?.category}`}
                            </Typography>
                            :
                            <Typography variant="h6">
                                {`${bike?.brand}${"-"}${bike?.category[0]}`}
                            </Typography>
                    }
                    {
                        dataType === "spareParts" ?
                            <Typography variant="h6">
                                {bike?.name}
                            </Typography>
                            :
                            <Typography variant="h6">
                                {bike?.bikeNumber}
                            </Typography>
                    }
                </Container>
                <Container
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: "10px",
                        padding: '0'
                    }}
                >
                    {
                        dataType === "spareParts" ?
                            <Typography sx={{ color: "#dc3545" }}>
                                {bike?.price} PKR
                            </Typography>
                            :
                            <Typography sx={{ color: "#dc3545" }}>
                                {bike?.finalPrice} PKR
                            </Typography>
                    }
                    {
                        dataType === "spareParts" ?
                            <Typography sx={{ color: "green" }}>
                                -{bike?.discount} PKR
                            </Typography>
                            :
                            <Typography sx={{ color: "green" }}>
                                {bike?.city}
                            </Typography>
                    }
                </Container>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    className="justify"
                    sx={{ height: '85px' }}
                >
                    {`${bike?.detail.substring(0, 160)}${bike?.detail.length > 160 ? "..." : ""}`}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {/* {moment(bike?.createdAt).format('LL')} */}
                    {bike?.userID?.phone}
                </Typography>
                {
                    dataType === "spareParts" ?
                        <Button size="small" onClick={() => navigate(`/productdetailpage/${bike?._id}?category=spareParts`)}>View Details</Button>
                        :
                        <Button size="small">
                            <a
                                href={`https://wa.me/${bike?.userID?.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'black' }}
                            >
                                <img style={{ width: '30px' }} src={"https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-mobile-software-icon-png-image_6315991.png"} />
                            </a>
                        </Button>
                }
            </CardActions>
            {/* <Typography
                variant="body2"
                color="text.secondary"
            >
                {moment(bike?.createdAt).format('LL')}
            </Typography> */}
        </Card>
    );
}