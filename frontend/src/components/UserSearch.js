import React from 'react';
import {AutoComplete} from "./index";
import {useSelector} from "react-redux";

const UserSearch = ({onSelect, value, onChange, task, projectMembers, addedItems=[]}) => {
  const [searchTxt, setSearchText] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const addedMembers = useSelector(s => s.project.project.data.members.filter(m => m.role !== 3).map(m => m.user));
  const contacts = useSelector(s => s.auth.user.data.contacts);

  const memberIds = React.useMemo(() => (task ? addedItems : addedMembers).map(m => m._id), [addedItems, addedMembers]);

  const search = React.useCallback(text => {
    setSearchText(text);
    if (!text) setUsers([]);
    else {
      setUsers(
        (task ? addedMembers : contacts)
          .filter(u => {
            return u.firstName.toLowerCase().concat(u.lastName.toLowerCase()).includes(text.toLowerCase())
              && !memberIds.includes(u._id)
          })
      );
    }
  }, [memberIds, projectMembers]);

  return (
    <AutoComplete
      placeholder="Search member"
      options={(searchTxt ? users : (task ? addedMembers : contacts).filter(c => !memberIds.includes(c._id))).map(m => ({value: m._id, label: m.firstName + ' ' + m.lastName}))}
      onSearch={search}
      onSelect={val => !memberIds.includes(val.value) && onSelect(val)}
      value={value}
      onChange={onChange}
    />
  );
};

export default UserSearch;
