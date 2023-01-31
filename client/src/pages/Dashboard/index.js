import React from 'react';
import {Row, Col} from "antd";
import {Card, Icon, ProjectCard} from "../../components";
import CircularProgress from "../../components/basics/CircularProggress";
import {useDispatch, useSelector} from "react-redux";
import {TodoItem} from "../Project/subpages/TaskModal/TodoSection";
import {getTemptId} from "../../utils/helpers";
import NoteItem from "../../components/NoteItem";
import {createNote, createTodo, deleteNote, deleteTodo, getNotes, getProjects, getTodo, updateNote, updateTodo} from "./actions";
import { Footer } from 'antd/lib/layout/layout';

const Dashboard = () => {
  const todo = useSelector(s => s.dashboard.todo);
  const notes = useSelector(s => s.dashboard.notes);
  const projects = useSelector(s => s.dashboard.projects);
  const user = useSelector(s => s.auth.user.data);
  const dispatch = useDispatch();
  const statistics = React.useMemo(() => {
    const total = user.tasks?.length;
    const todoSize = user.tasks?.filter(t => t.board !== 4).length;
    const doneSize = user.tasks?.filter(t => t.board === 4).length;
    return {
      todoSize, doneSize,
      todo: ((todoSize / total * 100) || 0).toFixed(1).replace('.0', ''),
      done: ((doneSize / total * 100) || 0).toFixed(1).replace('.0', '')
    }
  }, [user.tasks]);

  React.useEffect(() => {
    dispatch(getNotes());
    dispatch(getTodo());
    dispatch(getProjects());
  }, [dispatch]);

  const addNote = React.useCallback(() => {
    if (!notes.creating) dispatch(createNote({_id: getTemptId(), text: 'New note'}));
  }, [dispatch, notes.creating]);
  const updateNoteItem = React.useCallback((id, val) => {
    dispatch(updateNote({...notes.data.find(t => t._id === id), ...val}))
  }, [dispatch, notes.data]);

  const addTodo = React.useCallback(() => {
    if (!todo.creating) dispatch(createTodo({_id: getTemptId(), text: 'New todo'}));
  }, [dispatch, todo.creating]);
  const updateTodoItem = React.useCallback((n, id, val) => {
    dispatch(updateTodo({...todo.data.find(t => t._id === id), ...val}))
  }, [dispatch, todo.data]);

  const NotesTitle = React.useMemo(() => <Row align="middle cardTitle">Notes <div onClick={addNote}>
    <Icon name="plus-circle"/></div></Row>, [addNote]);
  const TodoTitle = React.useMemo(() => <Row align="middle cardTitle">Todo <div onClick={addTodo}>
    <Icon name="plus-circle"/></div></Row>, [addTodo]);

  return (
    <div className="dashboard">
      <div className="heading">
        <h1>AGCS IT Solutions</h1>
        <h4>Dashboard</h4>
      </div>
      <Row gutter={20} className="statistics">
        <Col xs={24} sm={12} md={6}>
          <Card minHeight={85}>
            <div>Total Projects</div>
            <b>{projects.data.length}</b>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card minHeight={85}>
            <div>Todo Tasks</div>
            <b>{statistics.todoSize}</b>
            <div className="progress"><CircularProgress percentage={statistics.todo} /></div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card minHeight={85}>
            <div>Done Tasks</div>
            <b>{statistics.doneSize}</b>
            <div className="progress"><CircularProgress percentage={statistics.done} /></div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card minHeight={85}>
            <div>Total Members</div>
            <b>{user.contacts?.length || 0}</b>
          </Card>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <Card title={NotesTitle} empty={!notes.data.length} loading={notes.loading} className="dashboardCard">
            {notes.data.map(note => <NoteItem key={note._id} note={note} updateItem={updateNoteItem} deleteNote={val => dispatch(deleteNote(val))}/>)}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={TodoTitle} empty={!todo.data.length} loading={todo.loading} className="todo dashboardCard">
            <div className="list">
              {todo.data.map(item =>
                <TodoItem
                  key={item._id}
                  item={item}
                  updateTodo={updateTodoItem}
                  deleteTodo={() => dispatch(deleteTodo(item._id))}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>
      <h2>Projects</h2>
      <Row gutter={20} className="projectList">
        {projects.loading ? [1,2,3].map(x => <Col xs={24} md={12} lg={8} key={x}><Card loading minHeight={200}/><br/></Col>):
          !!projects.data.length ?
            projects.data.slice(0, 6).filter(p => !p.archived).map(item => <Col xs={24} md={12} lg={8} key={item._id}><ProjectCard data={item} /></Col>)
            : <Col xs={24}><Card empty/></Col>
        }
      </Row>

      {/* <Footer>
    <p>Copyright © 2013-2018 by Alexis Graphix and Computer Data System. All rights reserved.</p>
    </Footer> */}
    </div>


    
  )
};



export default Dashboard;
