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
import { useRouter } from 'next/router';
import Link from 'next/link';
import User from '../../modal/user';
import db from '../../util/mongodb';

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

function UserDetail({ data }) {
  const router = useRouter();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
    });
  };

  const onReject = async ({ rejection }) => {
    const { name, email } = data;
    try {
      const response = await axios.post('/api/sendemail', {
        name,
        email,
        subject: 'Rejection of Smart Water Meter Installation',
        message: rejection,
      });
      openNotification(response.data.message);
      await axios.delete('/api/register/deletenew', {
        data: { user: data._id },
      });
      openNotification('Registration Request Deleted');
      form1.resetFields();
      setTimeout(() => router.push('/'), 1000);
    } catch (error) {
      openNotification(error.message);
    }
  };

  const onAccept = async ({ acceptance, device }) => {
    const { name, email } = data;
    try {
      await axios.post('/api/register/device', {
        user: data._id,
        device,
      });
      openNotification('Registration Success');
      await axios.post('/api/sendemail', {
        name,
        email,
        subject: 'Smart Water Meter Installation',
        message: `YOUR DEVICE ID IS ${device} \n` + acceptance,
      });
      openNotification('Email Sent');
      await axios.put('/api/register/updatenew', {
        user: data._id,
      });
      openNotification('Registration Request Modified');
      form2.resetFields();
      setTimeout(() => router.push('/'), 1000);
    } catch (error) {
      openNotification(error.message);
    }
  };
  return (
    <div className="admin">
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/registrations">
            <a>New Registration Requests</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{data._id}</Breadcrumb.Item>
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
              <Title level={5}>&emsp;:&emsp;&emsp;{data[k]}</Title>
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

export default UserDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  const { user } = params;
  await db.connect();
  const user_detail = await User.findById(user);
  return {
    props: { data: JSON.parse(JSON.stringify(user_detail)) },
  };
}
