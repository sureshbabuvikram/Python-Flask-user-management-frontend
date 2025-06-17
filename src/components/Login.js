import React, { useState } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [form, setForm] = useState({ identifier: '', password: '', role: 'user' });
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

//     useEffect(() => {
//   if (isLoggedIn) {
//     console.log("working check");    
//     navigate('/dashboard');
//   }
// }, [isLoggedIn, navigate]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload =
            form.role === 'admin'
                ? { username: form.identifier, password: form.password }
                : { email: form.identifier, password: form.password };

        const loginUrl =
            form.role === 'admin' ? '/auth/login' : '/auth/user-login';

        try {
            const res = await API.post(loginUrl, payload);
            const { access_token, user } = res.data;
            console.log(user);
            console.log(access_token);
            
            localStorage.setItem('token', access_token);
            // setIsLoggedIn(true);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('role', user.role);
            localStorage.setItem('email', user.email);
            localStorage.setItem('name', user.name);
            alert('Login successful');   
            window.location.href = '/dashboard';         
            navigate('/dashboard');
          
        } catch (err) {
            alert('Login failed');
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <input
                    name="identifier"
                    placeholder={form.role === 'admin' ? 'Username' : 'Email'}
                    value={form.identifier}
                    onChange={handleChange}
                    className="login-input"
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="login-input"
                    required
                />

                <button type="submit" className="login-button">Login</button>
                <p className="login-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
