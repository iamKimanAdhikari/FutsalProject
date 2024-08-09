import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { email, password, role } = input;
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/${role}s/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage('Login successful');
        setErrorMessage('');
        setAuth(true);
        // setTimeout(() => {
            setSuccessMessage('');
            //   // Redirect to home page after successful login
            // }, 3000);
        navigate('/'); 

        
      }
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : 'Login failed. Please try again.'
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      setSuccessMessage('');
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("soccer-background-vector-2159631.jpg")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative z-10 flex flex-col items-center justify-center h-3/5 w-1/3 mx-auto my-48 border border-gray-500">
            <h1 className="mt-5 text-center text-white text-4xl py-5">Login</h1>
            
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

            <form onSubmit={submitHandler} className="block w-2/3">
              <div>
                <label htmlFor="email" className="text-white text-xl">
                  Email: *
                </label>
                <br />
                <input
                  onChange={(e) => onChangeHandler(e)}
                  type="text"
                  value={email}
                  name="email"
                  placeholder="example@example.com"
                  className="px-2 form-control my-3 h-10 w-full"
                />
                <br />
              </div>

              <div>
                <label htmlFor="password" className="text-white text-xl">
                  Password: *
                </label>
                <br />
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                  className="px-2 form-control my-3 h-10 w-full"
                />
                <br />
              </div>

              <div>
                <label htmlFor="role" className="text-white text-xl">
                  Enter your role:
                </label>
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
                      onChange={(e) => onChangeHandler(e)}
                    />
                    <label htmlFor="user" className="text-white text-xl">
                      User
                    </label>
                  </div>

                  <div>
                    <input
                      className="w-5 h-5 mx-2"
                      id="owner"
                      type="radio"
                      value="owner"
                      name="role"
                      onChange={(e) => onChangeHandler(e)}
                    />
                    <label htmlFor="owner" className="text-white text-xl">
                      Owner
                    </label>
                  </div>
                </div>
              </div>

              <button className="border-black bg-white h-14 rounded-md px-5 py-2 text-xl hover:bg-blue-500 my-2">
                Submit
              </button>

              <p className="text-lg text-white">
                Haven't Signed Up?{' '}
                <Link to="/signup">
                  <span className="text-blue-600">Sign Up</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
