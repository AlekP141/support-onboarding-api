const data = {
  userAnswers: require("../models/userAnswers.json"),
  setUserAnswers: function (data) {
    this.userAnswers = data;
  },
};

// const getAllAnswers = (req, res) => {
//   res.json( data.userAnswers );
// };

const getAnswer = (req, res) => {
  const { id, index } = req.params;

  // verify user exists
  const user = data.userAnswers.find((user) => {
    return user.id == id;
  });
  if (!user) return res.status(400).json({ message: "User not found" });

  // find the answer of from the user that has a key that matches the index in the params
  const answer = data.userAnswers.find((user) => {
    return Object.keys(user.answers).includes(index);
  })?.answers[index];

  if (!answer) {
    return res
      .status(400)
      .json({ message: `question index ${req.params.index} not found` });
  }

  res.status(201).json(answer);
};

module.exports = { getAnswer };
