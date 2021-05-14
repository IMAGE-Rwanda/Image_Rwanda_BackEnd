const express = require("express")
const swaggerUi = require("swagger-ui-express")
const serverPort = process.env.PORT || 4000
const dotenv = require("dotenv")
const swaggerDocument = require("../swagger.json");
import router from './routes';
import cors from 'cors';
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors({origin: true}));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    next();
})

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(serverPort, () => console.log(`Server has started on port ${serverPort}`))


module.exports = app 