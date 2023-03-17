import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';
import axios from 'axios';

const Complain = () => {
  const [complains, setComplains] = useState([]);
  useEffect(() => {
    const getComplain = async () => {
      const complains = await axios.get('/api/apk/complain');
      if (complains.status == 200) setComplains(complains.data.complains);
    };
    getComplain();
  }, []);
  return (
    <div className="pay-table-cont">
      {complains.map((item) => (
        <Card key={item._id} title={item.subject} style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a
              style={{ color: 'blue', alignSelf: 'end' }}
              href={`/details/${item.device}`}
            >
              {item.device}
            </a>
          </div>
          <p style={{ marginTop: 10 }}>&ensp;&ensp;&ensp;{item.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default Complain;
