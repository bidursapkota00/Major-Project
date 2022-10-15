import axios from 'axios';
import nextConnect from 'next-connect';

async function sendEmail(name, email, subject, message) {
  const data = JSON.stringify({
    Messages: [
      {
        From: { Email: 'bidursapkota00@gmail.com', Name: 'Bidur Sapkota' },
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

const handler = nextConnect({
  onError: (err, req, res, next) => {
    res.status(err.http_code).end(err.message);
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.post(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const response = await sendEmail(name, email, subject, message);
  //   console.log(response.config.data);
  res.status(200).send({ message: 'Email Sent!' });
});

export default handler;
