const data = {
  userAnswers: require("../models/userAnswers.json"),
  setUserAnswers: function (data) {
    this.userAnswers = data;
  },
};

const getAllAnswers = (req, res) => {
  res.json( data.userAnswers );
};

const getAnswer = (req, res) => {
  const answer = data.find((answer) => answer.key === req.params.index);
  if (!answer) {
    return res
      .status(400)
      .json({ message: `question index ${req.params.index} not found` });
  }
  res.status(201).json(answer);
};

module.exports = { getAllAnswers, getAnswer };
