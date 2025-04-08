const User = require("../models/user.model");
const {Op} = require("sequelize");

const index = async (req, res) => { 
  try { 
    const users = await User.findAll(); 
 
    if (users.length === 0) { 
      return res.status(404).json({ 
        status: false, 
        msg: 'No hay usuarios registrados en la base de datos.', 
        users: [] 
      }); 
    } 
 
    return res.status(200).json({ 
      status: true, 
      msg: 'Listado de usuarios obtenido correctamente.', 
      users: users 
    }); 
 
  } catch (error) { 
    return res.status(500).json({ 
      status: false, 
      msg: `Error al obtener los usuarios. ${error.message}`, 
      users: null 
    }); 
  } 
}; 



// const index = (req, res) => {
//     try {
//     res.status(200).json({message:"Ingreso al controlador de index"});
//     } catch (error) {
//         res.status(404).json({message:"Rut error no encontrada"});
//     }
// };

const create = (req,res) => {
    try {
        res.status(200).json({message:"Ingreso al controlador de create"});
        } catch (error) {
            res.status(404).json({message:"Rut error no encontrada"});
        }
};


const update = (req,res) => {
    try {
        const id =req.params.id;
        res.status(200).json({message:`Ingreso al controlador de update con el id: ${id}`});
        } catch (error) {
            res.status(404).json({message:"Rut error no encontrada"});
        }
};

const destroy = (req,res) => {
    try {
        res.status(200).json({message:"Ingreso al controlador de destroy"});
        } catch (error) {
            res.status(404).json({message:"Rut error no encontrada"});
        }
};


const consult = (req,res) => {
    try {
        res.status(200).json({message:"Ingreso al controlador de show"});
        } catch (error) {
        res.status(404).json({message:"Rut error no encontrada"});
        }
};

module.exports = {
    index,
    create,
    update,
    destroy,
    consult,
};