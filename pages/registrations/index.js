import { Table, Breadcrumb, Anchor } from 'antd';
import NextLink from 'next/link';
import db from '../../util/mongodb';
import User from '../../modal/user';

const { Link } = Anchor;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, data) => (
      <Anchor>
        <Link href={`/registrations/${data.key}`} title={text} />
      </Anchor>
    ),
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
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
        <Breadcrumb.Item>
          <NextLink href="/">
            <a>Home</a>
          </NextLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>New Registration Requests /</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  await db.connect();
  const users = await User.find({ new: true }).select('name number');
  const data = users.map((user) => {
    return {
      key: user._id.toString(),
      name: user.name,
      number: user.number,
    };
  });
  return {
    props: { data },
  };
}
