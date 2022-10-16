import { db } from '../../util/firebase';
import { ref, onValue, query, update } from 'firebase/database';
import {
  Col,
  Row,
  Breadcrumb,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  notification,
} from 'antd';
import styles from '../../styles/User_reg.module.css';
import React, { useState } from 'react';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const title = [
  'Name',
  'Address',
  'Email',
  'Phone Number',
  'Password',
  'Citizenship Number',
];
const keys = ['name', 'address', 'email', 'number', 'password', 'citizenship'];

function User(props) {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
    });
  };

  const onReject = async ({ rejection }) => {
    const { name, email } = props;
    const response = await axios.post('/api/sendemail', {
      name,
      email,
      subject: 'Rejection of Smart Water Meter Installation',
      message: rejection,
    });
    openNotification('Rejection Email Sent');
    await axios.delete('/api/register/deletenew', {
      data: { user: props.user },
    });
    openNotification('Registration Request Deleted');
    form1.resetFields();
  };

  const onRejectFailed = (errorInfo) => {
    console.log(errorInfo);
    openNotification('Sending Rejection Email Failed');
  };

  const onAccept = async ({ acceptance, device }) => {
    const { name, email } = props;
    await axios.post('/api/sendemail', {
      name,
      email,
      subject: 'Smart Water Meter Installation',
      message: acceptance,
    });
    openNotification('Email Sent');
    await axios.put('/api/register/updatenew', {
      user: props.user,
    });
    openNotification('Registration Request Modified');
    await axios.post('/api/register/device', {
      user: props.user,
      device,
    });
    openNotification('Registration Success');
    form2.resetFields();
  };

  const onAcceptFailed = (errorInfo) => {
    console.log(errorInfo);
    openNotification('Sending Rejection Email Failed');
  };
  return (
    <div className="admin">
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>New Registration Requests</Breadcrumb.Item>
        <Breadcrumb.Item>{props.user}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={6}>
          {title.map((t, i) => (
            <Row key={i}>
              <Title level={5}>{t}</Title>
            </Row>
          ))}
        </Col>
        <Col span={18}>
          {keys.map((k, i) => (
            <Row key={i}>
              <Title level={5}>&emsp;:&emsp;&emsp;{props[k]}</Title>
            </Row>
          ))}
        </Col>
      </Row>

      <Form
        form={form1}
        name="basic"
        wrapperCol={{
          span: 24,
        }}
        onFinish={onReject}
        onFinishFailed={onRejectFailed}
        autoComplete="off"
      >
        <Row className={styles.textarea__row}>
          <Col span={18}>
            <Form.Item
              className={styles.form__item}
              name="rejection"
              rules={[
                {
                  required: true,
                  message: 'Rejection message is required!',
                },
              ]}
            >
              <TextArea rows={4} placeholder="Rejection Email Text" />
            </Form.Item>
          </Col>
          <Col span={6} className={styles.button_col}>
            <Button
              className={styles.button}
              type="primary"
              danger
              htmlType="submit"
            >
              Reject!
            </Button>
          </Col>
        </Row>
      </Form>

      <Divider />

      <Form
        form={form2}
        name="basic"
        wrapperCol={{
          span: 24,
        }}
        onFinish={onAccept}
        onFinishFailed={onAcceptFailed}
        autoComplete="off"
      >
        <Row className={styles.textarea__row}>
          <Col span={18}>
            <Form.Item
              className={styles.form__item}
              name="device"
              rules={[
                {
                  required: true,
                  message: 'Device MAC Address is required!',
                },
              ]}
            >
              <div className={styles.device__input}>
                <Input
                  showCount
                  maxLength={20}
                  placeholder={'Device Id (MAC Address)'}
                />
              </div>
            </Form.Item>
            <Form.Item
              className={styles.form__item}
              name="acceptance"
              rules={[
                {
                  required: true,
                  message: 'Acceptance message is required!',
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Accepted Email Text With Installation Date"
              />
            </Form.Item>
          </Col>
          <Col span={6} className={styles.button_col}>
            <Button className={styles.button} type="primary" htmlType="submit">
              Accept!
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default User;

export async function getServerSideProps(context) {
  const { params } = context;
  const { user } = params;
  let data;
  const que = query(ref(db, `/users/${user}`));
  onValue(que, (snapshot) => {
    data = snapshot.val();
  });
  return {
    props: { ...data, user },
  };
}
