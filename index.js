require("dotenv").config();

const PORT = process.env.PORT || 8082;

require("./models/dbConnection");
const app = require("./server.js");
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
