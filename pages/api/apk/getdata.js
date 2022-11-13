import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import { Models } from '../../../modal';

const { Device } = Models;

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device, date } = req.body;
  let now = new Date(date);
  now = new Date(now.setHours(now.getHours(), 0, 0, 0));
  let hrAfter = new Date(now);
  hrAfter = new Date(hrAfter.setHours(hrAfter.getHours() + 1));
  await db.connect();
  const response = await Device.aggregate([
    { $match: { _id: device } },
    { $unwind: '$datas' },
    {
      $match: {
        'datas.createdAt': {
          $gte: now,
          $lt: hrAfter,
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        datas: { $push: { litre: '$datas.litre', time: '$datas.createdAt' } },
      },
    },
  ]);
  if (response.length) {
    const { datas } = response[0];
    let labels = datas.map((d) => d.time.getMinutes());
    const data = datas.map((d) => d.litre);
    if (labels[0]) {
      labels.splice(0, 0, '');
      data.splice(0, 0, data[0]);
    }
    res.send({ message: { labels, data } });
  } else {
    res.send({ message: 'No data Found' });
  }
});

export default handler;
