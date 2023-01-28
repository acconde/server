import React from "react";
import {ConfigProvider} from "antd";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import "./scss/index.scss";
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Login, Dashboard, Messages, ProjectBoard, Project, Projects, Settings, SignUp, ProjectCalendar, ProjectMessages, ProjectSettings} from './pages';
import DashboardLayout from "./pages/Dashboard/Layout";
import ProjectLayout from "./pages/Project/Layout";
import {useSelector} from "react-redux";
import cx from 'classnames';

ConfigProvider.config({theme: {primaryColor: '#3498DB'}});

function App() {
  const darkMode = useSelector(s => s.auth.mode === 'dark');
  const auth = useSelector(s => s.auth);

  return (
    <div className={cx('app', {dark: darkMode})} style={{minHeight: window.innerHeight}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/login"/>}/>
          <Route path="/login" element={!auth.isLogin ? <Login/> : <Navigate to="/dashboard"/>}/>
          <Route path="/signup" element={!auth.isLogin ? <SignUp/> : <Navigate to="/dashboard"/>}/>
          {auth.isLogin ?
            <React.Fragment>
              <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="messages" element={<Messages/>}/>
                <Route path="projects" element={<Projects/>}/>
                <Route path="settings" element={<Settings/>}/>
              </Route>
              <Route path="/project/:id" element={<ProjectLayout/>}>
                <Route element={<Project/>} index/>
                <Route path="board" element={<ProjectBoard/>}/>
                <Route path="board/:boardId" element={<ProjectBoard/>}/>
                <Route path="calendar" element={<ProjectCalendar/>}/>
                <Route path="messages" element={<ProjectMessages/>}/>
                <Route path="settings" element={<ProjectSettings/>}/>
              </Route>
            </React.Fragment>
            :
            <Route path="*" element={<Navigate to="/login"/>}/>
          }
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
