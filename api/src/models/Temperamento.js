const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Temperamento', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // id:{  // adicion
      //   type: DataTypes.BIGINT,
      //   allowNull: false,
      //   primarykey:true, 
      //   autoIncrement:true
      // }
    },
    {timestamps:false}
    );
  };
  
  // *[]Temperamento con las siguientes propiedades
  
  // ºID
  // ºNombre