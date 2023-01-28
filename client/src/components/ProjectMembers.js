import React, {useMemo} from 'react';
import {Button, Card, Icon, PopConfirm, Popover} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {addMember, removeMember} from "../pages/Project/actions";
import {Row, Col} from "antd";
import UserSearch from "./UserSearch";
import {toast} from "react-toastify";
import {validateEmail} from "../utils/helpers";

const ProjectMembers = ({height, ...props}) => {
  const [newMember, setNewMember] = React.useState(null);
  const [memberSearch, setMemberSearch] = React.useState('');
  const members = useSelector(s => s.project.project.data.members);
  const userId = useSelector(s => s.auth.user.data._id);
  const isAdmin = React.useMemo(() => members.find(m => m.user._id === userId)?.role === 1, [members, userId]);
  const dispatch = useDispatch();

  const deleteMember = React.useCallback((id) => {
    dispatch(removeMember(id))
  }, []);

  const addNewMember = React.useCallback(() => {
    if (newMember) {
      dispatch(addMember({userId: newMember}));
      setNewMember(null);
      setMemberSearch('');
    } else if (memberSearch) {
      if (!validateEmail(memberSearch)) return toast.warn('Email address is not valid');
      dispatch(addMember({email: memberSearch}));
      setMemberSearch('');
    }
  }, [newMember, memberSearch]);

  return (
    <Card title="Members" className="dashboardCard" height={height}>
      <Row gutter={10}>
        <Col xs={17}><UserSearch
          addedMembers={members}
          onSelect={val => {setNewMember(val.value); setMemberSearch(val.label)}}
          value={memberSearch}
          onChange={setMemberSearch}
        /></Col>
        <Col xs={7}><Button onClick={addNewMember}>Add</Button></Col>
      </Row>
      {props.projectCard && <br/>}
      {members.map((item, index) =>
        <div className="memberItem" key={item._id}>
          <div>
            <Row align="middle">
              <div style={{marginRight: 8}}>{item.user?.firstName + ' ' + item.user?.lastName}</div>
              {item.role === 3 ? <Popover
                  trigger="hover"
                  button={<div className="badge orange"/>} content={<div style={{padding: '5px 10px'}}>Pending approval</div>}/>
                : null}
            </Row>
            <div className="email">{item.user?.email}</div>
          </div>
          <div>
            {(index && isAdmin) ?
              <PopConfirm
                onConfirm={() => deleteMember(item._id)}
                content={<div className="delete"><Icon name="delete"/></div>}
                title="Are you sure to remove this member?"
              />
              : null
            }
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProjectMembers;
