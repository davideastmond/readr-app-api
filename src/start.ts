require("dotenv").config();
const PORT = process.env.PORT || 5000
import connectDB from "./database.config";
import server from "./server";

connectDB();

server.listen(PORT, ()=> {
  console.log(`HTTP server listening on port ${PORT}`);
})
