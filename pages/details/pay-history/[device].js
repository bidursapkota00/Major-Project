import { Breadcrumb, Table, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import dynamic from 'next/dynamic';

const columns = [
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
    width: '25%',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: '25%',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: '25%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '25%',
  },
];

function Detail() {
  const router = useRouter();
  const { device } = router.query;

  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
    });
  };
  const [cookies] = useCookies(['isLoggedIn']);

  const [data, setData] = useState([]);
  const getData = async () => {
    if (!device) return;
    try {
      const res = await axios.get(`/api/details/pay-history/${device}`);
      setData(res.data.message);
    } catch (error) {
      openNotification(error, '');
    }
  };
  useEffect(() => {
    !cookies.isLoggedIn ? router.push('/login') : getData();
  }, [device]);

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
          <Link href={`/details/${device}`}>
            <a>details</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>pay-history&ensp;/&ensp;{device}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="pay-table-cont">
        {data.map((d, i) => {
          if (i == 0)
            return (
              <Table
                dataSource={d}
                columns={columns}
                rowClassName={'pay-row-green'}
                pagination={false}
              />
            );
          else if (i % 2 == 0)
            return (
              <Table
                dataSource={d}
                columns={columns}
                rowClassName={'pay-row-green'}
                pagination={false}
                showHeader={false}
              />
            );
          else
            return (
              <Table
                dataSource={d}
                columns={columns}
                rowClassName={'pay-row-blue'}
                pagination={false}
                showHeader={false}
              />
            );
        })}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Detail), {
  ssr: false,
});
