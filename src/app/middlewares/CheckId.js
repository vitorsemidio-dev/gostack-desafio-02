export default (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Id does not provided' });
  }

  return next();
};
