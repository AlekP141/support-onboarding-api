const userAnswers = require("../models/userAnswers.json");
const users = userAnswers.map((userAnswer) => {
  return userAnswer.user;
});

const data = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

const getAllUsers = (req, res) => {
  res.json( data.users );
};

module.exports = { getAllUsers };
