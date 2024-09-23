import './ResetPassword.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Banner from './Banner';
import Footer from './Footer';

function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isPasswordMatch = newPassword === confirmPassword;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const request = {
            token: token,
            newPassword: newPassword
        };

        try {
            const response = await axios.put('http://localhost:1150/api/v1/auth/reset-password', request);
            console.log('Success: ', response.data);
            alert('รีเซ็ตรหัสผ่านสำเร็จ')

            if (response.status === 200) {
                navigate('/login');
            }

        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);
        }
    };

    return (
        <div>
            <Banner />

            <main className="form-reset-password w-100 m-auto">
                <h3 className='mb-3'>Reset Your Password</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            minLength={8}
                            maxLength={30}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingConfirmPassword"
                            placeholder="Confirm Password"
                            minLength={8}
                            maxLength={30}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                    </div>


                    {!isPasswordMatch && confirmPassword && (<p style={{ color: 'red' }}>Password ไม่ตรงกัน!</p>)}

                    <button type="submit" className='btn btn-primary' disabled={!isPasswordMatch}>ยืนยัน</button>
                </form>
            </main>

            <Footer />
        </div>
    );
}

export default ResetPassword;