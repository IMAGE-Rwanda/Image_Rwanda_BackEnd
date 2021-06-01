import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'
const serverPort = process.env.PORT || 4000

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors({origin: true}));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    next();
})
app.use(routes)
app.listen(serverPort, () => console.log(`Server has started on port ${serverPort}`))


export default app; 