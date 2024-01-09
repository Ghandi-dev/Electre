import SubCriteria from "../models/SubCriteriaModel.js";
import response from "../response.js";

export const getSubCriteria = async (req, res) => {
  try {
    const result = await SubCriteria.findAll({
      order: [["nilai", "ASC"]],
    });
    response(200, result, "get all subcriteria", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubCriteriaById = async (req, res) => {
  try {
    const result = await SubCriteria.findOne({
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "get subcriteria by id", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const createSubCriteria = async (req, res) => {
  try {
    const result = await SubCriteria.create(req.body);
    response(200, result, "SubCriteria Created", res);
  } catch (error) {
    response(400, [], error.message, res);
    console.log(error.message);
  }
};

export const updateSubCriteria = async (req, res) => {
  try {
    const result = await SubCriteria.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "SubCriteria updated", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSubCriteria = async (req, res) => {
  try {
    const result = await SubCriteria.destroy({
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "SubCriteria deleted", res);
  } catch (error) {
    console.log(error.message);
  }
};
