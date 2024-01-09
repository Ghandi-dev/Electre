import Alternatif from "../models/AlternatifModel.js";
import response from "../response.js";

export const getAlternatif = async (req, res) => {
  try {
    const result = await Alternatif.findAll();
    response(200, result, "get all alternatif", res);
  } catch (error) {
    console.log(error.message);
  }
};
export const getAlternatifById = async (req, res) => {
  try {
    const result = await Alternatif.findOne({
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "get alternatif by id", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAlternatif = async (req, res) => {
  try {
    const result = await Alternatif.create(req.body);
    response(200, result, "Alternatif Created", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAlternatif = async (req, res) => {
  try {
    const result = await Alternatif.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "Alternatif updated", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAlternatif = async (req, res) => {
  try {
    const result = await Alternatif.destroy({
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "Alternatif deleted", res);
  } catch (error) {
    console.log(error.message);
  }
};
