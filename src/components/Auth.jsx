import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify(formData);

        try {
            let res;
            if (isLogin) {
                // Login
                res = await axios.post('http://localhost:5000/api/auth/login', body, config);
                localStorage.setItem('token', res.data.token);
                alert('Login successful!');
            } else {
                // Register
                res = await axios.post('http://localhost:5000/api/auth/register', body, config);
                alert(res.data.message);
                setIsLogin(true); // Registration ke baad login form dikhao
            }
            onAuthSuccess(res.data.token);
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.message || 'An error occurred');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>
                {isLogin ? 'Login' : 'Sign Up'}
            </h2>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                        style={inputStyle}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#007bff', cursor: 'pointer', marginLeft: '5px' }}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </span>
            </p>
        </div>
    );
};

const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
};

const buttonStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer'
};

export default Auth;