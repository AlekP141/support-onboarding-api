const path = require("path");
const fsPromises = require("fs").promises;

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
  const answer = user.answers[index];

  if (!answer) {
    return res
      .status(400)
      .json({ message: `question ${req.params.index} not found for user` });
  }
  res.status(201).json(answer);
};

const createAnswer = async (req, res) => {
  const { id, index } = req.params;
  const newAnswer = req.body;

  const filePath = path.join(__dirname, "..", "models", "userAnswers.json");

  try {
    const fileData = JSON.parse(await fsPromises.readFile(filePath, "utf-8"));

    const user = fileData.find((user) => user.id == id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const existingAnswer = user.answers[index] || [];
    if (!Array.isArray(existingAnswer)) {
      return res
        .status(400)
        .json({ message: `Invalid question index: ${index}` });
    }

    user.answers[index] = [...existingAnswer, newAnswer];

    await fsPromises.writeFile(
      filePath,
      JSON.stringify(fileData, null, 2),
      "utf-8"
    );

    data.setUserAnswers(fileData);

    res.status(201).json({ message: "Answer updated successfully" });
  } catch (error) {
    console.error("Error updating answers:", error);
    res.status(500).json({ message: "Failed to update answers" });
  }
};


module.exports = { getAnswer, createAnswer };
