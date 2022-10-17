import { db } from '../../util/firebase';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { Table, Breadcrumb, Anchor } from 'antd';
import NextLink from 'next/link';

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

function Home(props) {
  const data = Object.keys(props).map((pk) => {
    return { ...props[pk], key: pk };
  });

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
  let data;
  const que = query(ref(db, '/users/'), orderByChild('new'), equalTo(true));
  onValue(que, (snapshot) => {
    data = snapshot.val();
  });
  return {
    props: { ...data },
  };
}
