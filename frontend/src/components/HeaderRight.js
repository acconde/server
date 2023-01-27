import React from 'react';
import AutoComplete from "./basics/AutoComplete";
import {Icon, Avatar, Popover} from "./index";
import {Row, Col, Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logout, setMode} from "../pages/Login/actions";
import {setNotificationsSeen} from "../pages/Dashboard/actions";
import {useNavigate} from "react-router-dom";
import axios from "../config/axios";
import {delay} from "../utils/helpers";

const HeaderRight = () => {
  const [searchOpts, setSearchOpts] = React.useState([]);
  const [searchText, setSearchText] = React.useState([]);
  const [unseenNotification, setUnseenNotification] = React.useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector(s => s.auth.mode === 'dark');
  const user = useSelector(s => s.auth.user.data);
  const navigate = useNavigate();

  React.useEffect(() => {
    setUnseenNotification(user.notifications.filter(n => !n.seen).length > 0);
  }, [user.notifications]);

  const onSeen = React.useCallback(async (val) => {
    if (val) {
      await delay(500);
      setUnseenNotification(false);
      dispatch(setNotificationsSeen({ids: user.notifications.filter(n => !n.seen).map(n => n._id)}));
    }
  }, [user.notifications]);

  const onSearch = React.useCallback(async text => {
    setSearchText(text);
    if (text) {
      const res = await axios.get('/project/search?q=' + text);
      setSearchOpts(res.data.map(item => ({label: item.name, value: item._id})));
    }
  }, []);


  const logoutFunc = React.useCallback(() => {
    dispatch(logout());
    axios.setToken('');
    localStorage.removeItem('token');
    navigate('/');
  }, []);

  return (
    <Row gutter={10} className="header-right">
      <Col><AutoComplete
        placeholder="Search..."
        options={searchOpts}
        onSearch={onSearch}
        value={searchText}
        onSelect={val => {navigate('/project/' + val.value); setSearchText('')}}/>
      </Col>
      <Col>
        <Popover
          placement="bottom"
          button={<div className="notif"><Icon name="notification"/> {unseenNotification && <div className="badge green"/>}</div>}
          title="Notifications"
          onVisibleChange={onSeen}
          content={
            <div className="notifications">
              {!user.notifications.length ?
                <Row align="center"><img style={{marginTop: 35, width: 70}} src={require('../images/empty.svg').default} alt=""/></Row> :
                [...user.notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(item =>
                <div className="listItem" key={item._id}>{item.title} {!item.seen && <div className="badge green"/>}</div>
              )}
            </div>
          }
        />
      </Col>
      <Col>
        <Popover
          placement="bottomRight"
          button={<Avatar src={user.avatar} name={user.firstName} />}
          content={
            <div>
              <div className="popoverMenu">
                <div className="profileHead">
                  <Avatar src={user.avatar} name={user.firstName}/>
                  <div>{user.firstName} {user.lastName}</div>
                </div>
                <div onClick={() => navigate('/dashboard/messages')} className="item">
                  <Row align="middle"><div className="ellipsis">Messages</div></Row>
                </div>
                <div onClick={() => navigate('/dashboard/settings')} className="item">
                  <Row align="middle"><div className="ellipsis">Profile Settings</div></Row>
                </div>
                <div onClick={logoutFunc} className="item">
                  <Row align="middle"><div className="ellipsis">Logout</div></Row>
                </div>
                <div className="item">
                  <Row align="middle">
                    <div className="ellipsis">Dark Mode</div>
                    <Switch defaultChecked={darkMode} onChange={val => dispatch(setMode(val ? 'dark' : 'light'))}/>
                  </Row>
                </div>
              </div>
            </div>}
        />
      </Col>
    </Row>
  );
};

export default HeaderRight;
