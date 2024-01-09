import { Sequelize } from "sequelize";
import db from "../config/DBConnection.js";

const { DataTypes } = Sequelize;

const Alternatif = db.define(
  "tb_alternatif",
  {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default Alternatif;

(async () => {
  await db.sync();
})();
