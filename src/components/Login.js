import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import './forms.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            setError('Invalid credentials');
          }
        }
      );
    } catch (err) {
      console.log('ERROOOOR CATCH:' + err)
        if (error.response && error.response.code === 401) {
          setError(error.response.message);
        }
    }
  };

  return (
    <div>
      {/*<form onSubmit={handleLogin}>*/}
      {/*  <h3>Login</h3>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    placeholder="email"*/}
      {/*    value={email}*/}
      {/*    onChange={(e) => setEmail(e.target.value)}*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    type="password"*/}
      {/*    placeholder="password"*/}
      {/*    value={password}*/}
      {/*    onChange={(e) => setPassword(e.target.value)}*/}
      {/*  />*/}
      {/*  <button type="submit">Log in</button>*/}
      {/*</form>*/}
      <form className="input-form" onSubmit={handleLogin}>
        <h3>Login</h3>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email"
                 placeholder="Enter email" value={email}
                 onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password"
                 placeholder="Enter password" value={password}
                 onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <br/>
      {error
          ? <div className="alert alert-danger" role="alert">
            {error}
          </div>
          : ""
      }
    </div>
  );
};

export default Login;
