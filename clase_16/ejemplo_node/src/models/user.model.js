const { Model, DataTypes } = require("sequelize"); 
const sequelize  = require('./dbconnection');

class User extends Model {} 
User.init ({ 
    id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: DataTypes.INTEGER 
    }, 

    //------------------- 
    //-- Model attributes are defined here 
    //------------------- 
    firstname: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    }, 

    lastname: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    }, 

    email: { 
        type: DataTypes.STRING(255), 
        allowNull: false, 
        unique: true, 
        validate: { 
            //------------------- 
            //-- checks for email format (foo@bar.com) 
            //------------------- 
            isEmail: true  
        } 
    }, 

    password: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    s_active: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: true 
    }          
}, 
{ 
    //------------------- 
    //-- Other model options go here 
    //------------------- 
    sequelize, 
    modelName: "user", 
    tableName: 'users', 
    //------------------- 
    //-- Habilitar timestamps automáticos 
    //------------------- 
    timestamps: true,  
});
 
//------------------- 
//-- Exportar el modulo 
//------------------- 
module.exports =  User;