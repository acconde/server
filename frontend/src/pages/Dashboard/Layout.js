import React from 'react';
import {Outlet} from "react-router-dom";
import {Icon, Spinner} from "../../components";
import {Row} from "antd";
import {useLocation, useNavigate} from 'react-router-dom';
import cx from 'classnames';
import HeaderRight from "../../components/HeaderRight";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../Login/actions";
import axios from '../../config/axios';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(s => s.auth.user.data);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    axios.setToken(token);
    dispatch(getUser())
  }, []);

  const pIndex = React.useMemo(() => {
    const p = location.pathname;
    return p.includes('projects') ? 2 : p.includes('messages') ? 3 : p.includes('settings') ? 4 : 1;
  }, [location]);

  if (!user._id) return <Row style={{height: window.innerHeight}} align="middle" justify="center"><Spinner size="large"/></Row>;

  return (
    <Row>
      <div className="menu-space"/>
      <div className="side-menu">
        <Row align="middle" className="logoContainer" onClick={() => navigate('/dashboard')}>
          <img src={require('../../images/logo.svg').default} alt="" className="logo"/>
          <span className="logoTxt">AGCS</span>
        </Row>
        <div className="menu">
          <div className={cx('menu-item', {active: pIndex === 1})} onClick={() => navigate('/dashboard')}><Icon name="home2" /> <span>Dashboard</span></div>
          <div className={cx('menu-item', {active: pIndex === 2})} onClick={() => navigate('projects')}><Icon name="folder" /> <span>Projects</span></div>
          <div className={cx('menu-item', {active: pIndex === 3})} onClick={() => navigate('messages')}><Icon name="message" /> <span>Messages</span></div>
          <div className={cx('menu-item', {active: pIndex === 4})} onClick={() => navigate('settings')}><Icon name="setting" /> <span>Settings</span></div>
        </div>
      </div>
      <div className="flex1">
        <div className="container">
          <HeaderRight/>
          <Outlet/>
        </div>
      </div>
    </Row>
  )
};

export default DashboardLayout;
