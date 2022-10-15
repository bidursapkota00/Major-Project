import { db } from '../../util/firebase';
import { ref, onValue, query } from 'firebase/database';
import { Col, Row, Breadcrumb, Typography } from 'antd';

const title = [
  'Name',
  'Address',
  'Phone Number',
  'Password',
  'Citizenship Number',
];
const keys = ['name', 'address', 'number', 'password', 'citizenship'];

const { Title } = Typography;

function User(props) {
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
        <Col span={9}>
          {title.map((t, i) => (
            <Row key={i}>
              <Title level={5}>{t}</Title>
            </Row>
          ))}
        </Col>
        <Col span={15}>
          {keys.map((k, i) => (
            <Row key={i}>
              <Title level={5}>{props[k]}</Title>
            </Row>
          ))}
        </Col>
      </Row>
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
