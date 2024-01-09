import { Sequelize } from "sequelize";
import db from "../config/DBConnection.js";
import Criteria from "./CriteriaModel.js";

const { DataTypes } = Sequelize;

const SubCriteria = db.define(
  "tb_sub_criteria",
  {
    name: DataTypes.STRING,
    nilai: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

Criteria.hasMany(SubCriteria);
SubCriteria.belongsTo(Criteria);

export default SubCriteria;

(async () => {
  await db.sync();
})();
