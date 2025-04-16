// index.js
import express from 'express';
import cors from 'cors';
import ZonasRoutes from "./routes/zonasRoutes.js"



const app = express();
const PORT = 4000;



app.use(cors());
app.use(express.json());


app.use('/zonas', ZonasRoutes)




app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})