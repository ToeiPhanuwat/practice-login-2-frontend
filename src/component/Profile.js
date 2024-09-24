import './Profile.css';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import ModalPut from './ModalPut';
import ModalUploadFile from './ModalUploadFile';

function Profile() {
    const token = localStorage.getItem('jwtToken');
    const [datas, setDatas] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const profile = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:1150/api/v1/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDatas(response.data.data)
            console.log(response.data);

            if (response.data.data.fileName != null) {
                const imageResponse = await axios.get(`http://localhost:1150/api/v1/auth/images/${response.data.data.fileName}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    responseType: 'blob'
                });

                const imgUrl = URL.createObjectURL(imageResponse.data);
                setImageUrl(imgUrl);
            }


        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);

            if (error.response && error.response.status === 401) {
                navigate('/');
            }
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        profile();
    }, [token, navigate, profile])

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:1150/api/v1/auth', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                alert('ลบบัญชีสำเร็จ')
                navigate('/')
            }
        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);
        }
    };

    return (
        <div>
            <Nav token={token} />
            <div className="profile">
                <div className="container">
                    <div className="profile-info card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-2" >
                                <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" className="img-fluid rounded-start" alt="profile" />
                            </div>
                            <div className="col-md-10">
                                <div className="card-body h-100 d-flex justify-content-between">
                                    <table className="w-50">
                                        <tbody>
                                            <tr>
                                                <td className="col-md-3">อีเมล</td>
                                                <td className="col-md-6">{datas.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-md-3">ชื่อ-สกุล</td>
                                                <td className="col-md-6">{datas.firstName} {datas.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-md-3">เพศ</td>
                                                <td className="col-md-6">{datas.gender || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-md-3">วัน-เดือน-ปีเกิด</td>
                                                <td className="col-md-6">{datas.dateOfBirth || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-md-3">เบอร์โทร</td>
                                                <td className="col-md-6">{datas.phoneNumber || '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-md-3">ที่อยู่</td>
                                                <td className="col-md-6">{datas.address || '-'}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="settings d-flex flex-column justify-content-around">
                                        <ModalPut datas={datas} profile={profile} />
                                        <ModalUploadFile />
                                        <button type="button" className="btn-item btn btn-outline-primary" disabled>Reset password</button>
                                        <button type="button" className="btn-item btn btn-outline-primary" disabled>Refresh token</button>
                                        <button type="button" className="btn-item btn btn-outline-danger" onClick={handleDelete} disabled>Delete your account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Profile;