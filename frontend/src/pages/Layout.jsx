import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";


export default function Layout({authenticatedResponse, setAuth, isAuthenticated}){
    // console.log("Layout " ,authenticatedResponse);
    return (
        <>
            <Header authenticatedResponse = {authenticatedResponse} setAuth = {setAuth} isAuthenticated = {isAuthenticated}/>
            <Outlet setAuth = {setAuth}/>
            <Footer />
        </>
    );
}