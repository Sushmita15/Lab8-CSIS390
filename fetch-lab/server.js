"use strict";

const express = require("express");
const app = express();

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Parse JSON request bodies (needed for POST)
app.use(express.json());

// ---- Your endpoints go below this line ----
app.get("/hello", (req, res) => {
  res.type("text").send("Hello from the server!");
});

//B.2
app.get("/api/time", (req, res) => {
  res.json({
    currentTime: new Date().toISOString(),
    message: "Current server time",
  });
});

//B.3
app.get("/api/greet/:name", (req, res) => {
  const name = req.params.name;
  res.json({
    greeting: "Hello, ${name}! Welcome to the API.",
  });
});

//B.4
app.get("/api/math", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const operation = req.query.operation;

  if (
    operation == false ||
    ["add", "subtract", "multiply", "divide"].includes(operation) == false
  ) {
    return res.status(400).json({
      error:
        "Invalid or missing operation. Use: add, subtract, multiply, divide",
    });
  }

  if (operation == "divide" && b == 0) {
    return res.status(400).json({
      error: "Cannot divide by zero",
    });
  }
});
//define operations:
let result;
if (operation == "add") {
  result = a + b;
}
if (operation == "subtract") {
  result = a - b;
}
if (operation == "multiply") {
  result = a * b;
}
if (operation == "divide") {
  result = a / b;
}

res.json({
  a,
  b,
  operation,
  result,
});

// ---- Your endpoints go above this line ----

const PORT = process.env.PORT || 3000; //using port 3000 because 8080 is being used for discuit
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
