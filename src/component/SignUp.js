import './SignUp.css';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';
import Banner from './Banner';

function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isPasswordMatch = password === confirmPassword;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const request = {
            firstName: username,
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:1150/api/v1/auth/registers', request);
            if (response.status === 201 || response.status === 200) {
                navigate('/sign-up-completed');
            }

        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);
        }
    };


    return (
        <div>
            <Banner />

            <main className="form-signup w-100 m-auto">
                <div>
                    <h1 className="h3 mb-3 fw-normal">Create a new account</h1>
                    <p>It's quick and easy.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="Username"
                            maxLength={60}
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="floatingName">Username</label>
                    </div>

                    <div className="form-floating">
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

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            minLength={8}
                            maxLength={30}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingConfirmPassword"
                            placeholder="Confirm Password"
                            minLength={8}
                            maxLength={30}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                    </div>

                    {!isPasswordMatch && confirmPassword && (<p style={{ color: 'red' }}>Password ไม่ตรงกัน!</p>)}

                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={!isPasswordMatch}>Sign up</button>
                </form>

                <div className='my-3'>
                    Have a account?&nbsp;
                    <Link
                        className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                        to="/login"
                    >
                        Sign in
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default SignUp;