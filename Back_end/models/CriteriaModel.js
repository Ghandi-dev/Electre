import { Sequelize } from "sequelize";
import db from "../config/DBConnection.js";
import Alternatif from "./AlternatifModel.js";

const { DataTypes } = Sequelize;

const Criteria = db.define(
  "tb_criteria",
  {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    bobot: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export const Value = db.define("tb_values", {
  nilai: DataTypes.INTEGER,
});

Alternatif.belongsToMany(Criteria, { through: Value });
Criteria.belongsToMany(Alternatif, { through: Value });

export default Criteria;

(async () => {
  await db.sync();
})();
