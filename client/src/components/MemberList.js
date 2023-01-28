import React from 'react';
import {Avatar} from "./index";

const MemberList = ({members, size, max = 3}) => {
  const memberList = React.useMemo(() => members.map(m => m.user || m), [members]);
  return (
    <div className="memberAvatarList">
      {memberList.slice(0, max).map(m => <div className="member" key={m._id}>
        <Avatar size={size} src={m.avatar} name={m.firstName}/></div>)
      }
      {members.length > max ? <div className="memberSize">+{members.length - max}</div> : null}
    </div>
  );
};

export default MemberList;
