import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // navigate hook for redirecting

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      // Save JWT to localStorage 
      const token = response.data.token;
      if (token) {
      localStorage.setItem('token', token); // token stored

      console.log("Token received:", token);

       // Store user information if returned by backend (optional)
       const user = response.data.user;
       console.log("userid before json.stringify",user.user_id)
       localStorage.setItem('user', JSON.stringify(user)); // store user info
       console.log("@LOGIN --> user from backend",user)
       setError(''); // Clear any previous errors
       alert('Login successful!');
       const userID =localStorage.setItem('userId',JSON.stringify(user.user_id))
       console.log("USERID LOGIN ",userID)
      //  setError(''); // Clear any previous errors
      // Redirect to profile page after login
      navigate('/profile');
    } else {
      setError('Login failed. Please try again.');
    }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label className="form-label" htmlFor="email">Email-ID :</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
             className="form-input"
            required
          />
        </div>
        <div  className="form-group">
          <label className="form-label" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
             className="form-input"
            required
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;