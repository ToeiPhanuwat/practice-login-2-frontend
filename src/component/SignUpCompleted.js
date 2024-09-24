import { Link } from "react-router-dom";


function SignUpCompleted() {

    return (
        <div>
            <div className="text-center">
                <h1>Registration successful, please check your email.</h1>

                <Link
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/login"
                >
                    Back to login
                </Link>
            </div>
        </div>
    )
}

export default SignUpCompleted;