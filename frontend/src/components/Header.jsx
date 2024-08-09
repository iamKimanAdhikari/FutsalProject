import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';


export default function Header({ authenticatedResponse, setAuth, isAuthenticated }) {
    // console.log(isAuthenticated);
    const navigate = useNavigate();

    const AuthMessage = () => {
        // console.log(authenticatedResponse);
        const [welcomeMsg, setWelcomeMsg] = useState("");

        useEffect(() => {
            // console.log(authenticatedResponse.data);
            if (isAuthenticated && authenticatedResponse?.data) {
                setWelcomeMsg(authenticatedResponse.data.username);
            } else if (!isAuthenticated) {
                setWelcomeMsg("");
                setAuth(false);
            }
        }, [setAuth, isAuthenticated, authenticatedResponse]);

        return (
                <h1 className='text-customYellow text-center text-2xl'>Welcome <span className="underline">{"  " + welcomeMsg}</span>!</h1>
        );
    }

    const logOutHandler = async () => {
        
        try {
            try {
                const logoutResponse = await axios.post('http://localhost:8000/api/v1/users/logout',{}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type' : 'application/json',
                    }
                })
            } catch (error) {
                
            }

            try {
                const logoutResponse = await axios.post('http://localhost:8000/api/v1/owners/logout',{}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type' : 'application/json',
                    }
                })
            } catch (error) {
                
            }

            // console.log(logoutResponse);
            setAuth(false);
        } catch (error) {
            console.log(error.message);
            
        }
    }

    const bookNowHandler = ()=>{
        navigate('/turfs')
    }

    return (
        <>
            <header className="shadow bg-inherit sticky z-50 top-0">
                <nav className='border-gray-200 px-4 lg:px-6 py-2.5'>
                    <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
                        <Link to="/" className='flex items-center'>
                            <span><h1 className="text-4xl text-red-400 mr-3 h-12">KickStart</h1></span>
                        </Link>

                        <div className='flex items-center lg:order-2'>
                            {
                                !isAuthenticated ? (
                                    <Link to="/login"
                                        className='text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
                                    >Log In</Link>) : (
                                    <div className='flex items-center lg:order-2'>
                                        <AuthMessage />
                                        <Link to="#"
                                            onClick={logOutHandler}
                                            className='text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
                                        >Log Out</Link>
                                    </div>
                                )
                            }

                            <Link 
                                to="#"
                                onClick={bookNowHandler}
                                className='text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none order-2'
                            >Book Now</Link>
                        </div>

                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `block text-2xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            `block text-2xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/contact"
                                        className={({ isActive }) =>
                                            `block text-2xl py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Contact
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
