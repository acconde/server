import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "./actions";
import {Row, Col} from "antd";
import {Button, Input} from "../../components";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const loading = useSelector(s => s.auth.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFunc = React.useCallback(() => {
    dispatch(login({email, password, navigate}))
  }, [email, password]);

  return (
    <Row style={{height: window.innerHeight}} className="loginContainer">
      <Col md={12}>
        <div>
          <div className="left">
            <img src={require('../../images/logo.svg').default} alt="" className="logo"/>
            <h2>Sign In</h2>
            <Input placeholder="Email" value={email} onChange={setEmail}/>
            <Input placeholder="Password" value={password} onChange={setPassword} type="password"/>
            <Button title="Sign In" block onClick={loginFunc} loading={loading}/>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </Col>
      <Col md={12}>
        <div className="right">
          <img src={require('../../images/login.svg').default} alt=""/>
        </div>
      </Col>
    </Row>
  )
};

export default Login;
