import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router';

const Signin = () => {
    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [confirmPassword, setConfirmPassword] = useState(' ');
    const [error, setError] = useState(' ');
    const [message, setMessage] = useState(' ');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( password !== confirmPassword) {
            setError("Password must match");
            return;
        } else if (password.length <= 8) {
            setError('Password must be at least 8 characters')
            return;
        } else if( !name || !email ) {
            setError('All fields are required')
        }

        try {
            await axios.post('http://localhost:3000/api/users/register', {
                name,
                email,
                password,
            })
            setMessage("User created successfully");
            setName(" ");
            setEmail(" ");
            setPassword(" ");
            setConfirmPassword(" ");

            navigate('/login');
            
        } catch (error) {
            console.log(error)
            setError("Error while adding user, user not created")
        }

    }

  return (
    <>
    <section key="1" className="py-3 py-md-5 py-xl-8">
    <div className="container">
        <div className="row">
        <div className="col-12">
            <div className="mb-5">
            <h2 className="display-5 fw-bold text-center">Sign in</h2>
            <p className="text-center m-0">
                Already have an Account? <a href="/login">Login</a>
            </p>
            </div>
        </div>
        </div>
        <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
            <div className="row gy-5 justify-content-center">
            <div className="col-12 col-lg-5">
                <form action="#!" onSubmit={handleSubmit}>
                <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                        className="form-control border-0 border-bottom rounded-0"
                        id="name"
                        name="name"
                        placeholder="name@example.com"
                        required
                        type="text"
                        value={name}
                        onChange={(e) => (setName(e.target.value))}
                        />
                        <label className="form-label" htmlFor="name">
                        Full Name
                        </label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                        className="form-control border-0 border-bottom rounded-0"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => (setEmail(e.target.value))}
                        />
                        <label className="form-label" htmlFor="email">
                        Email
                        </label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                        className="form-control border-0 border-bottom rounded-0"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => (setPassword(e.target.value))}
                        />
                        <label className="form-label" htmlFor="password">
                        Password
                        </label>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="form-floating mb-3">
                        <input
                        className="form-control border-0 border-bottom rounded-0"
                        id="confirmpassword"
                        name="confirmpassword"
                        placeholder="confirm password"
                        required
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => (setConfirmPassword(e.target.value))}
                        />
                        <label className="form-label" htmlFor="password">
                        Confirm Password
                        </label>
                    </div>
                    </div>
                    {error && (<div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>)}
                    {message && (<div style={{ color: 'green', marginTop: '1rem' }}>{message}</div>)}
                    <div className="col-12">
                    <div className="row justify-content-between">
                        <div className="col-6">
                        <div className="form-check">
                            <input
                            className="form-check-input"
                            defaultValue=""
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            />
                            <label
                            className="form-check-label text-secondary"
                            htmlFor="remember_me">
                            Remember me
                            </label>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="text-end">
                            <a
                            className="link-secondary text-decoration-none"
                            href="#!">
                            Forgot password?
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="d-grid">
                        <button
                        className="btn btn-lg btn-dark rounded-0 fs-6"
                        type="submit">
                        Log in
                        </button>
                    </div>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
       </div>
      </section>;
    </>
  )
}

export default Signin