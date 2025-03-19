exports.processPayment = async (req, res) => {
  const { amount } = req.body;
  res.json({ status: "success", message: `Payment of $${amount} processed` });
};
