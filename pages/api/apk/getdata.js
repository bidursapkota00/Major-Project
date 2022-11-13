import nextConnect from 'next-connect';
import { error } from '../../../util/apierr';
import db from '../../../util/mongodb';
import { Models } from '../../../modal';

const { Device } = Models;

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { device, date1, date2 } = req.body;
  const now = new Date(date1);
  const hrAfter = new Date(date2);
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
    let labels = datas.map((d) => d.time);
    const data = datas.map((d) => d.litre);
    res.send({ message: { labels, data } });
  } else {
    res.send({ message: 'No data Found' });
  }
});

export default handler;
