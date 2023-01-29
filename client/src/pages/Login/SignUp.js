import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {register} from "./actions";
import {Row, Col} from "antd";
import {Button, Input} from "../../components";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../../utils/helpers";
import {validatePassword} from "../../utils/helpers";
import {toast} from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cpassword, confirmPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const loading = useSelector(s => s.auth.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerFunc = React.useCallback(() => {
    if (!validateEmail(email)) return toast.warn('Email is not valid');
    dispatch(register({firstName, lastName, email, password, navigate}))
  }, [firstName, lastName, email, password]);

  return (
    <Row style={{height: window.innerHeight}} className="loginContainer">
      <Col md={12}>
        <div>
          <div className="left">
            <img src={require('../../images/logo.svg').default} alt="" className="logo"/>
            <h2>Sign Up</h2>
            <Input placeholder="First Name" value={firstName} onChange={setFirstName}/>
            <Input placeholder="Last Name" value={lastName} onChange={setLastName}/>
            <Input placeholder="Email" value={email} onChange={setEmail}/>
            <Input placeholder="Password" value={password} onChange={setPassword} type="password" aria-required="true"/>
            <Input placeholder="Confirm Password" value={password} onChange={setPassword} type="password" aria-required="true"/>
            <Button title="Sign Up" onClick={registerFunc} disabled={loading}/>
            <p>Do you have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </Col>
      <Col md={12}>
        <div className="right">
          <img src={require('../../images/loginlogo.svg').default} alt=""/>
        </div>
      </Col>
    </Row>
  )
};

export default SignUp;
