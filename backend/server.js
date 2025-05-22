const app = require("./app");
require("dotenv").config();
require("./config/db"); // Ensure database connection is established

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
