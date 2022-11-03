import { Table, Breadcrumb } from 'antd';
import db from '../util/mongodb';
import { Models } from '../modal';

const { Device } = Models;

const columns = [
  {
    title: 'Device Id',
    dataIndex: 'id',
    key: 'id',
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

function Home({ data }) {
  return (
    <div className="admin">
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>home /</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  await db.connect();
  const devices = await Device.find()
    .select('user total_litre')
    .populate({ path: 'user', select: 'name -_id' });
  const data = devices.map((device) => {
    const unit = device.total_litre / 1000;
    return {
      key: device._id,
      id: device._id,
      name: device.user.name,
      unit,
      due: unit > 20 ? unit * 8 : 80,
    };
  });
  return {
    props: { data },
  };
}
