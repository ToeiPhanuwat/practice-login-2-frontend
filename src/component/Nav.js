import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Nav(props) {
    const { token } = props;

    const navigate = useNavigate();

    const handleLogout = async () => {

        try {
            const response = await axios.post('http://localhost:1150/api/v1/auth/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('jwtToken');
                navigate('/login');
            }

        } catch (error) {
            console.error('Error: ', error.response?.status, error.response?.data);
        }

    }

    return (
        <div>
            <div className="nav">
                <div className="container">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                        <div className="col-md-3 mb-2 mb-md-0">
                            <h1>Login-2</h1>
                        </div>

                        <ul className="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink to='/profile' className="nav-link px-2" end>Profile</NavLink></li>
                        </ul>
                        <ul className="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink to='/features' className="nav-link px-2" end>Features</NavLink></li>
                        </ul>
                        <ul className="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink to='/about' className="nav-link px-2" end>About</NavLink></li>
                        </ul>

                        <div className="col-md-3 text-end">
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleLogout}>Logout</button>
                        </div>
                    </header>
                </div>
            </div>
        </div>
    );
}

export default Nav;