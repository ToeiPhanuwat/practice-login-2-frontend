import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const request = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:1150/api/v1/auth/login', request);

            if (response.status === 200) {
                localStorage.setItem('jwtToken', response.data.data.jwtToken);
                navigate('/profile');
            }

        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);
        }
    };

    const handleBtnClick = () => {
        navigate('/sign-up');
    };

    return (
        <div>
            <div className='container'>
                <div className='row align-items-center' style={{ height: '100vh' }}>
                    <div className='col-7'>
                        <div style={{ paddingBottom: '120px' }}>
                            <div className='display-1 text-primary'>Log-in 2</div>
                            <h3 style={{ marginTop: '1rem' }}>Log-in 2 helps you connect and share with the people in your life.</h3>
                        </div>
                    </div>

                    <div className='col-5'>
                        <main className="form-signin w-100 m-auto ">
                            <form onSubmit={handleLogin}>
                                <h1 className="h3 mb-3 fw-normal ">Please sign in</h1>
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

                                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>

                                <div className="link mt-3 mb-4">
                                    <Link
                                        className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                        to="/forgotten-password"
                                    >
                                        Forgotten password?
                                    </Link>
                                </div>
                            </form>

                            <div style={{ borderTop: '1px solid silver' }}>
                                <button className="btn btn-success w-50 mt-3" onClick={handleBtnClick}>Create new account</button>
                            </div>
                        </main>
                    </div>

                </div>
            </div>
            <div className='footer text-center bg-secondary'>
                footer
            </div>
        </div>
    );
}

export default Home;