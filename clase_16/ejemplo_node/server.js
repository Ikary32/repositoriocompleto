const PORT = 3000;
const express = require('express');
require("dotenv").config();
const app = express();
const cors = require('cors');
app.use(cors());
const routes = require('./api.routes');
const sequelize = require('./src/models/dbconnection');
app.use('/api/v1', routes);
require("./src/models/sync_tables");


app.get('/', (req, res)=>{
    res.send('Hola mundo, desde NODE, con express y nodemon');
});

app.listen(process.env.PORT, async () => { 
    console.log(process.env.BIENVENIDA, process.env.PORT); 
   
    try { 
      //-- Conectarse a la base de datos 
      await sequelize.authenticate(); 
      console.log("Conexión establecida con éxito a la base de datos."); 
       
      // Crea las tablas si no existen 
      await sequelize.sync({ alter: true });  
      console.log('Tablas sincronizadas'); 
       
    } catch (error) { 
      console.error("Error conectando a la base de datos:", error); 
    } 
  });