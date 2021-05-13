import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'

dotenv.config();
const serverPort = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes)


app.listen(serverPort, () => console.log(`Server has started on port ${serverPort}`))


export default app; 