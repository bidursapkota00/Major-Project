export const error = {
  onError: (err, req, res, next) => {
    res
      .status(err.http_code)
      .send({ message: err.message, status: err.http_code });
  },
  onNoMatch: (req, res) => {
    res.status(404).send({ message: 'Page is not found', status: 404 });
  },
};
