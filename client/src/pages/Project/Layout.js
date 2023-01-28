import React from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {Row} from "antd";
import cx from "classnames";
import {Icon, Popover, ProjectLogo, Spinner} from "../../components";
import HeaderRight from "../../components/HeaderRight";
import {useDispatch, useSelector} from "react-redux";
import {getProjectLogo} from "../../utils/helpers";
import {getProject} from "./actions";
import axios from "../../config/axios";
import {getUser} from "../Login/actions";
import {getProjects} from "../Dashboard/actions";

const ProjectLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const projects = useSelector(s => s.dashboard.projects);
  const project = useSelector(s => s.project.project.data);
  const userId = useSelector(s => s.auth.user.data._id);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    axios.setToken(token);
    dispatch(getUser());
    dispatch(getProjects());
  }, []);

  React.useEffect(() => {
    dispatch(getProject({id, navigate}));
  }, [id]);

  const pIndex = React.useMemo(() => {
    const p = location.pathname;
    return p.includes('board') ? 2 : p.includes('messages') ? 3 : p.includes('calendar') ? 4 : p.includes('settings') ? 5 : 1;
  }, [location]);

  const projectsData = projects.data.filter(p => !p.archived).map(p => ({value: p._id, label: p.name, image: getProjectLogo(p.image)}));

  if (!project._id || !userId) return <Row style={{height: window.innerHeight}} align="middle" justify="center"><Spinner size="large"/></Row>;

  return (
    <Row>
      <div className="menu-space"/>
      <div className="side-menu">
        <Row align="middle" className="logoContainer" onClick={() => navigate('/dashboard')}>
          <img src={require('../../images/logo.svg').default} alt="" className="logo"/>
          <span className="logoTxt">AGCS</span>
        </Row>
        <Popover
          menu={projectsData}
          placement="bottom"
          projectImg
          popoverStyle={{maxHeight: 196, overflowY: 'scroll'}}
          onItemSelect={id => navigate('/project/' + id)}
          button={
            <div className="projectDropdownContainer">
              <Row align="middle">
                <ProjectLogo src={project.image} /> <div className="ellipsis">{project.name}</div>
              </Row>
              <div className="chevron"><Icon name="chevron-up" /></div>
            </div>
          }
        />
        <div className="menu">
          <div className={cx('menu-item', {active: pIndex === 1})} onClick={() => navigate('')}><Icon name="home2" /> <span>Home</span></div>
          <div className={cx('menu-item', {active: pIndex === 2})} onClick={() => navigate('board')}><Icon name="layout" /> <span>Board</span></div>
          <div className={cx('menu-item', {active: pIndex === 3})} onClick={() => navigate('messages')}><Icon name="message" /> <span>Messages</span></div>
          <div className={cx('menu-item', {active: pIndex === 4})} onClick={() => navigate('calendar')}><Icon name="calendar" /> <span>Calendar</span></div>
          <div className={cx('menu-item', {active: pIndex === 5})} onClick={() => navigate('settings')}><Icon name="setting" /> <span>Settings</span></div>
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

export default ProjectLayout;
