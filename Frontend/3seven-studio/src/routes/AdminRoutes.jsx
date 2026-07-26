import { Navigate } from "react-router-dom";


const AdminRoute = ({
    children,
}) => {


    const accessToken =
        localStorage.getItem(
            "access_token"
        );


    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );


    if (!accessToken) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }



    if (
        !user ||
        !user.is_staff
    ) {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }



    return children;


};


export default AdminRoute;