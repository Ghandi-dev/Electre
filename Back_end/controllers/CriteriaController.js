import Criteria from "../models/CriteriaModel.js";
import response from "../response.js";

export const getCriteria = async (req, res) => {
  try {
    const result = await Criteria.findAll();
    response(200, result, "get all criteria", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCriteriaById = async (req, res) => {
  try {
    const result = await Criteria.findOne({
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "get criteria by id", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const createCriteria = async (req, res) => {
  try {
    const result = await Criteria.create(req.body);
    response(200, result, "Criteria Created", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCriteria = async (req, res) => {
  try {
    const result = await Criteria.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "Criteria updated", res);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCriteria = async (req, res) => {
  try {
    const result = await Criteria.destroy({
      where: {
        id: req.params.id,
      },
    });
    response(200, result, "Criteria deleted", res);
  } catch (error) {
    console.log(error.message);
  }
};
