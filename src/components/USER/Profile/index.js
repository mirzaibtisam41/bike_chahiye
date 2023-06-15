import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addProfilePictureApi, dummyImage, serverURL } from '../../../common/api';
import { setUserData } from '../../../redux/reducers/user';
import userAuth from '../Hoc/UserAuth';
import Form from './Form';

const Profile = ({ success }) => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user.user);
    const [loading, setLoading] = useState(false);

    const updateImage = async (image) => {
        setLoading(true);
        const formDate = new FormData();
        formDate.append('_id', User?._id);
        formDate.append('profileImg', image);

        try {
            const { data } = await axios.post(addProfilePictureApi, formDate);
            if (data) {
                setLoading(false);
                toast.success(data.msg, {
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                });
                dispatch(setUserData({ user: data?._profile }));
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

    return (
        <div className='pb-5 border' style={{ border: '2px solid grey' }}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <section className='text-center bygga-parent equip-parent py-3'>
                <section className='container text-center mt-4'>
                    <span
                        className=' h2 bold'
                        style={{ borderBottom: '3px solid #dc3545', color: 'black' }}
                    >
                        {success ? success : 'PROFILE SETTING PAGE'}
                    </span>
                </section>
            </section>
            <div
                className='mx-auto border mb-3'
                style={{ width: '250px', height: '200px' }}
            >
                <Avatar
                    sx={{ width: '100%', height: '100%' }}
                    variant="square"
                    src={User?.profileImg ? `${serverURL}${User?.profileImg}` : dummyImage}
                />
            </div>
            {
                loading ? <CircularProgress /> :
                    <div className="upload-btn-wrapper">
                        <button className="btn-upload">Update Picture</button>
                        <input onChange={(e) => updateImage(e.target.files[0])} type="file" name="myfile" />
                    </div>
            }
            <Form />
        </div>
    )
}

export default userAuth(Profile);