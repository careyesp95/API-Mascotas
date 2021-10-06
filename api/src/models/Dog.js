const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    Id:{
      // type: DataTypes.UUID,
      // //allowNull:false,
      // primarykey:true
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura:{
      type: DataTypes.DECIMAL,
      allowNull:false,
    },
    peso:{
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    años:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {timestamps:false}
  );
};
