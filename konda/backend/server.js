const app = require("./app");
app.get("/", (req, res) => {
  res.send("✅ Backend server is up and running!");
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
