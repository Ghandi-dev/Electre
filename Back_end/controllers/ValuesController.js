import response from "../response.js";
import { Value } from "../models/CriteriaModel.js";

export const getValues = async (req, res) => {
  try {
    const result = await Value.findAll();
    response(200, result, "get all values", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const createValues = async (req, res) => {
  try {
    const result = await Value.bulkCreate(req.body);
    response(200, result, "SubCriteria Created", res);
  } catch (error) {
    response(400, [], error.message, res);
    console.log(error.message);
  }
};

export const getValueById = async (req, res) => {
  try {
    const result = await Value.findAll({
      where: {
        tbAlternatifId: req.params.id,
      },
    });
    response(200, result, "get values by id", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateValues = async (req, res) => {
  try {
    const datasToUpdate = req.body.datas;
    const updateOperations = datasToUpdate.map(async (data) => {
      // Lakukan update pada setiap data sesuai dengan tbCriteriumId dan tbAlternatifId
      await Value.update(
        {
          nilai: data.nilai,
        },
        {
          where: {
            tbCriteriumId: data.tbCriteriumId,
            tbAlternatifId: data.tbAlternatifId,
          },
        }
      );
    });

    // Menjalankan semua operasi update secara bersamaan dengan Promise.all
    await Promise.all(updateOperations);
    res.status(200).json({ message: "Data berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};
