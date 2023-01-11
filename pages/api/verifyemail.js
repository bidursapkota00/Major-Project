import axios from 'axios';
import nextConnect from 'next-connect';
import { error } from '../../util/apierr';
import db from '../../util/mongodb';
import Otp from '../../modal/otp';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { name, email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  await db.connect();
  const newOtp = new Otp({
    _id: email,
    otp,
  });
  await newOtp.save();

  const data = JSON.stringify({
    Messages: [
      {
        From: {
          Email: 'smartwatermeter61@gmail.com',
          Name: 'Smart Water Meter System',
        },
        To: [{ Email: email, Name: name }],
        Subject: 'OTP',
        TextPart: otp.toString(),
      },
    ],
  });

  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: { 'Content-Type': 'application/json' },
    auth: {
      username: process.env.MAILJET_API_KEY,
      password: process.env.MAILJET_SECRET_KEY,
    },
  };

  try {
    await axios(config);
    res.status(200).send({ message: 'OTP sent!', status: 200 });
  } catch (error) {
    const { response } = error;
    const { status, statusText } = response;
    res.status(status).send({ message: statusText, status });
  }
});

export default handler;
