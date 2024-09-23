import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Activate() {
    const [statusCode, setStatusCode] = useState(null);
    const { token } = useParams();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:1150/api/v1/auth/activate/${token}`);
                setStatusCode(response.status)
            } catch (error) {
                console.error('Error: ', error.response?.status, error.response?.data);
                setStatusCode(error.response.status);
            }
        };

        if (token) {
            activateAccount();
        }
    }, [token]);

    return (
        <div className="text-center">
            {statusCode === 200 ? (
                <h1>Account activated successfully!</h1>
            ) : (
                <h1>Something went wrong!</h1>
            )}

            <Link
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to="/login"
            >
                Back to login
            </Link>
        </div>

    );
}

export default Activate;