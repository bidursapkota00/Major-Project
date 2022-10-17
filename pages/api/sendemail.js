import axios from 'axios';
import nextConnect from 'next-connect';
import { error } from '../../util/apierr';

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const data = JSON.stringify({
    Messages: [
      {
        From: {
          Email: 'bidursapkota00@gmail.com',
          Name: 'Smart Water Flow Team',
        },
        To: [{ Email: email, Name: name }],
        Subject: subject,
        TextPart: message,
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
    res.status(200).send({ message: 'Email Sent!', status: 200 });
  } catch (error) {
    const { response } = error;
    const { status, statusText } = response;
    res.status(status).send({ message: statusText, status });
  }
});

export default handler;
