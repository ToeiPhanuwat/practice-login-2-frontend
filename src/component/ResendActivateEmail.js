import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


function ResendActivateEmail() {
    const { token } = useParams();

    useEffect(() => {
        const resendActivateEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:1150/api/v1/auth/resend-activation-email/${token}`);
            } catch (error) {
                console.error('Error: ', error.response?.status, error.response?.data);
            }

        };

        if (token) {
            resendActivateEmail();
        }
    }, [token]);

    return (
        <div className="text-center">
            <h1>Email has been sent successfully. Please check your mailbox.</h1>

            <Link
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to="/login"
            >
                Back to login
            </Link>
        </div>
    );
}

export default ResendActivateEmail;