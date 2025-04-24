import { app } from "./app.js";
import "dotenv/config";

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api is Working");
});

app.listen(port, () => console.log("Server Started at ", port));