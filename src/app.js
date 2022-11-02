import express from "express";
import employeesRoutes from "./routes/ocupacion.routes.js";
import indexRoutes from "./routes/index.routes.js";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url'
const app = express();


app.use(express.json());

//lineas agregadas

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(indexRoutes);
app.use(employeesRoutes);

app.use(express.static(join(__dirname, 'public'))) 

app.use((req, res, next) => {
    res.status(404).json({
        mensaje: "endpoint not found"
    })
})

export default app;