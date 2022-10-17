import { db } from '../util/firebase';
import { ref, onValue, query } from 'firebase/database';
import { Table, Breadcrumb, Anchor } from 'antd';

const { Link } = Anchor;

const columns = [
  {
    title: 'Device Id',
    dataIndex: 'id',
    key: 'id',
    render: (text, data) => (
      <Anchor>
        <Link href={`/registrations/${data.key}`} title={text} />
      </Anchor>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Due',
    dataIndex: 'due',
    key: 'due',
  },
];

function Home(props) {
  const data = Object.keys(props).map((id) => {
    return {
      key: id,
      ...props[id].userData,
      unit: props[id].unit ? props[id].unit : 0,
      due: props[id].due ? props[id].due : 0,
      id,
    };
  });
  console.log(props);

  return (
    <div className="admin">
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>/</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  let devices, user;
  const devicesRef = ref(db, '/devices/');
  onValue(devicesRef, (snapshot) => {
    devices = snapshot.val();
  });
  if (devices) {
    const deviceIds = Object.keys(devices);
    deviceIds.forEach((id) => {
      const userRef = query(ref(db, `/users/${devices[id].user}`));
      onValue(userRef, (snapshot) => {
        user = snapshot.val();
      });
      if (user) {
        devices[id].userData = user;
        user = null;
      }
    });
    return {
      props: { ...devices },
    };
  }
  return {
    props: {},
  };
}
