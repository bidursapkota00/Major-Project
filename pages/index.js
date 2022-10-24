import { Table, Breadcrumb, Anchor } from 'antd';
import db from '../util/mongodb';
import User from '../modal/user';
import Device from '../modal/device';

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
  const devices = await Device.find().select('user total_litre');
  let data = [];
  await Promise.all(
    devices.map(async (d) => {
      const user = await User.findById(d.user.toString()).select('name -_id');
      data.push({
        key: d._id,
        id: d._id,
        name: user.name,
        unit: d.total_litre / 1000,
        due: d.total_litre < 20000 ? 80 : d.total_litre / 100,
      });
    })
  );
  return {
    props: { data },
  };
}
