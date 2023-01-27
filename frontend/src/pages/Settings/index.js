import React from 'react';
import {Avatar, Button, Card, Icon, Input, UploadWrapper} from "../../components";
import {Row, Col} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fixImgPath, getProjectLogo} from "../../utils/helpers";
import {getInvitations} from "../Dashboard/actions";
import {updateUser, updateUserAvatar} from "../Login/actions";
import {acceptInvitation, declineInvitation} from "../Project/actions";

const Settings = () => {
  const [uploadedImage, setUploadedImage] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const user = useSelector(s => s.auth.user);
  const invitations = useSelector(s => s.dashboard.invitations);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInvitations());
  }, []);

  React.useEffect(() => {
    setFirstName(user.data.firstName);
    setLastName(user.data.lastName);
    setUploadedImage(user.data.avatar);
  }, [user.data]);

  const uploadLogo = React.useCallback((val) => {
    const preview = URL.createObjectURL(val);
    setUploadedImage(preview);
    const formData = new FormData();
    formData.append('avatar', val);
    dispatch(updateUserAvatar({preview, formData}));
  }, []);

  const updateData = React.useCallback(() => {
    dispatch(updateUser({firstName, lastName}))
  }, [firstName, lastName]);

  return (
    <div>
      <div className="heading">
        <h1>AGCS</h1>
        <h4>Settings</h4>
      </div>
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <Card>
            <div className="imgContainer">
              <UploadWrapper onChange={uploadLogo} onlyImg>
                <Avatar src={fixImgPath(uploadedImage)} name={firstName} size={70}/>
              </UploadWrapper>
            </div>
            <Input value={firstName} onChange={setFirstName} placeholder="First name"/>
            <Input value={lastName} onChange={setLastName} placeholder="Last name"/>
            <Input value={user.data.email} placeholder="Email" disabled/>
            <br/><br/>
            <Button onClick={updateData} loading={user.loading} disabled={!firstName || !lastName}>Update</Button>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Invitations" height={268} overflow="scroll" loading={invitations.loading} empty={!invitations.data.length}>
            {invitations.data.map(item =>
              <div key={item._id} className="listItem invitation">
                <Row gutter={10} justify="middle">
                  <Col><Avatar src={getProjectLogo(item.project?.image)}/></Col>
                  <Col>{item.project?.name}</Col>
                </Row>
                <Row>
                  <div onClick={() => dispatch(acceptInvitation(item._id))}><Icon name="chevron-up success"/></div>
                  <div onClick={() => dispatch(declineInvitation(item._id))}><Icon name="close danger"/></div>
                </Row>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
