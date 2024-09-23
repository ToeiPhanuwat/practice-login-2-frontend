import './ForgottenPassword.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Banner from "./Banner";

function ForgottenPassword() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:1150/api/v1/auth/forgot-password', { email });
            alert('If an account with that email exists, we’ve sent instructions on how to reset your password.');

            if (response.status === 200) {
                navigate('/login');
            }
            
        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);
        }
    };

    const handleClickCancle = () => {
        navigate('/');
    }

    return (
        <div>

            <Banner />

            <main className="form-forgotten-password w-100 m-auto">
                <h2 className='py-2'>Find Your Account</h2>

                <form onSubmit={handleSubmit}>
                    <div className='search border-top border-bottom'>
                        <p className='my-3'>Please enter your email address to search for your account.</p>

                        <div className="form-floating m-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                minLength={6}
                                maxLength={30}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                    </div>

                    <div className='d-flex justify-content-end p-3'>
                        <button type="button" className='btn btn-secondary' onClick={handleClickCancle}>Cancle</button>
                        &nbsp;&nbsp;
                        <button type="submit" className='btn btn-primary'>Search</button>
                    </div>

                </form>

            </main>

            <Footer />
        </div>
    );
}

export default ForgottenPassword;