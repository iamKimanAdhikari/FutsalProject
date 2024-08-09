import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';



function SignUp() {

    const [input, setInput] = useState({
        fullName: "",
        username: "",
        email: "",
        phone_no: "",
        password: "",
        confirmPassword: "",
        role: "user"
    })

    const { fullName, username, email, phone_no, password, confirmPassword, role } = input;
    const [emailError, setEmailError] = useState("");
    const [phoneNoError, setPhonoNoError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const emailValidation = (email) => {
        setEmailError("")
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === "") {
            setEmailError('Email field is required.')
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email.");
            return false;
        }

        return true;
    }


    const phone_no_validation = (phone_no) => {
        setPhonoNoError("")
        if (phone_no === "") {
            setPhonoNoError("Phone Number field can not be empty.");
            return false;
        }
        if (phone_no.length !== 10) {
            setPhonoNoError("Phone number should have 10 digits");
            return false;
        }
        return true;
    }

    const passwordValidation = (password, confirmPassword) => {
        setPasswordError("")
        if (password === "" || confirmPassword === "") {
            setPasswordError('Password field is required.')
            return false;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords field does not match.");
            return false;
        }

        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (emailValidation && phone_no_validation && passwordValidation) {
                const response = await axios.post(`http://localhost:8000/api/v1/${role}s/register`, {
                    fullName,
                    username,
                    email,
                    phone_no,
                    password
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                setSuccessMessage('Registration Successful');
                setErrorMessage('');
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000)
                setInput({
                    fullName: "",
                    username: "",
                    email: "",
                    phone_no: "",
                    password: "",
                    confirmPassword: "",
                    role: ""
                })
            }


        } catch (error) {
            console.error('Registration Error:', error);
            setErrorMessage(
                error.response ? error.response.data.data : 'Login failed. Please try again.'
            );
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            setSuccessMessage('');

        }
    }

    const onChangeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    return (
        <div className="relative h-screen w-screen">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("soccer-background-vector-2159631.jpg")' }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="relative z-10 flex flex-col items-center justify-center h-3/5 w-1/3 mx-auto my-48 border border-gray-500 overflow-y-auto">
                        <h1 className=" text-center text-white text-4xl mt-96">Sign Up</h1>
                        {successMessage && (
                            <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
                                {errorMessage}
                            </div>
                        )}
                        <form
                            className="block w-2/3"
                            onSubmit={submitHandler}
                        >

                            {/* for Fullname */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="text-white text-xl"
                                >
                                    <br />
                                    <br />
                                    Full Name: *</label>
                                <br />
                                <input
                                    onChange={e => onChangeHandler(e)}
                                    type="text"
                                    value={fullName}
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="px-2 form-control my-3 h-10 w-full"
                                />
                                <br />
                            </div>

                            {/* for username */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="text-white text-xl"
                                >
                                    username: *</label>
                                <br />
                                <input
                                    onChange={e => onChangeHandler(e)}
                                    type="text"
                                    value={username}
                                    name="username"
                                    placeholder="username"
                                    className="px-2 form-control my-3 h-10 w-full"
                                />
                                <br />
                            </div>


                            {/* for email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-white text-xl"
                                >
                                    Email: * <span className="text-red-600">{emailError}</span></label>
                                <br />
                                <input
                                    onChange={e => onChangeHandler(e)}
                                    type="text"
                                    value={email}
                                    name="email"
                                    placeholder="exmample@example.com"
                                    className="px-2 form-control my-3 h-10 w-full"
                                />
                                <br />
                            </div>

                            {/* for phone_no */}
                            <div>
                                <label
                                    htmlFor="phone_no"
                                    className="text-white text-xl"
                                >
                                    Phone Number: *<span className="text-red-600">{phoneNoError}</span></label>
                                <br />
                                <input
                                    onChange={e => onChangeHandler(e)}
                                    type="text"
                                    value={phone_no}
                                    name="phone_no"
                                    placeholder="98XXXXXXXX"
                                    className="px-2 form-control my-3 h-10 w-full"
                                />
                                <br />
                            </div>


                            {/* for password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-white text-xl"
                                >
                                    Password: * <span className="text-red-600">{passwordError}</span></label>
                                <br />
                                <input
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={e => onChangeHandler(e)}
                                    className="px-2 form-control my-3 h-10 w-full"
                                />
                                <br />
                            </div>


                            {/* for confirm password */}
                            <div>
                                <label
                                    htmlFor="comfirmPassword"
                                    className="text-white text-xl"
                                >
                                    Confirm Password: * <span className="text-red-600">{passwordError}</span></label>
                                <br />
                                <input
                                    placeholder="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={e => onChangeHandler(e)}
                                    className="px-2 form-control my-3 h-10 w-full"
                                />
                                <br />
                            </div>

                            {/* for roles */}
                            <div>
                                <label
                                    htmlFor="role"
                                    className="text-white text-xl"
                                >
                                    Enter your role: </label>
                                <br />

                                <div className="flex gap-10 mb-5 mt-2">
                                    <div>
                                        <input
                                            className="w-5 h-5 mx-2"
                                            id="user"
                                            type="radio"
                                            value="user"
                                            name="role"
                                            defaultChecked
                                            onChange={e => onChangeHandler(e)} />
                                        <label htmlFor="user" className="text-white text-xl">User</label>
                                    </div>

                                    <div>
                                        <input
                                            className="w-5 h-5 mx-2"
                                            id="owner"
                                            type="radio"
                                            value="owner"
                                            name="role"
                                            onChange={e => onChangeHandler(e)} />
                                        <label htmlFor="user" className="text-white text-xl">Owner</label>
                                    </div>
                                </div>


                            </div>

                            <button
                                className="border-black bg-white h-14 rounded-md px-5 py-2 text-xl hover:bg-blue-500 my-2"
                                type='submit'
                            >Submit</button>

                            <p className="text-lg text-white mb-10">Already have an account? <Link to="/login">
                                <span className="text-blue-600">Log In</span>
                            </Link></p>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp