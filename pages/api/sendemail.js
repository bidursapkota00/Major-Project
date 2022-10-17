import axios from 'axios';
import nextConnect from 'next-connect';
import { error } from '../../util/apierr';

async function sendEmail(name, email, subject, message) {
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

  const res = await axios(config);
  return res;
}

const handler = nextConnect(error);

handler.post(async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const response = await sendEmail(name, email, subject, message);
    console.log(response);
    //   console.log(response.config.data);
    res.status(200).send({ message: 'Email Sent!' });
  } catch (error) {
    const { response } = error;
    res.status(response.status).send({ message: response.statusText });
  }
});

export default handler;
