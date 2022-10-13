import { db } from '../util/firebase';
import { ref, onValue } from 'firebase/database';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
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

const data = [
  {
    key: '1',
    name: 'John Brown',
    address: 'New York No. 1 Lake Park',
    unit: 999,
    due: 999,
  },
  {
    key: '2',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
    unit: 999,
    due: 999,
  },
];

function Home(props) {
  const allUserData = Object.keys(props).map((pk) => props[pk]);

  return (
    <div className="admin">
      <Table dataSource={data} columns={columns} />;
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  let data;
  const starCountRef = ref(db);
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });
  return {
    props: { ...data },
  };
}
