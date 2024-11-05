const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/questions", require("./routes/api/questions"));
// app.use("/answers", require("./routes/api/userAnswers"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
