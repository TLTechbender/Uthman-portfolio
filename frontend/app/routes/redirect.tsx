import { Navigate } from "react-router";

export default function Redirect() {
    const shouldRedirect = true; // Logic to determine if redirect is needed

    return (shouldRedirect && <Navigate to={`/home`}/>)
}