const express = require("express")
const swaggerUi = require("swagger-ui-express")
const serverPort = process.env.PORT || 4000
const dotenv = require("dotenv")
const swaggerDocument = require("../swagger.json");

dotenv.config();

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(serverPort, () => console.log(`Server has started on port ${serverPort}`))


module.exports = app 