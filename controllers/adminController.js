import { User } from "../models/userModel.js";

//GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await User.find({ role: "donar" }).sort({
      createdAt: -1,
    });

    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sussess: false,
      message: "Error In Donar List API",
      error,
    });
  }
};

//GET Hosptal LIST
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await User.find({ role: "hospital" }).sort({
      createdAt: -1,
    });

    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sussess: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};

//GET Org LIST
const getOrgListController = async (req, res) => {
  try {
    const OrgData = await User.find({ role: "organisation" }).sort({
      createdAt: -1,
    });

    return res.status(200).send({
      success: true,
      Toatlcount: OrgData.length,
      message: "ORG List Fetched Successfully",
      OrgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sussess: false,
      message: "Error In ORG List API",
      error,
    });
  }
};

//Delete Donar
const deleteDonarController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Donar Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting donar",
      error,
    });
  }
};

//Hospital Donar
const deleteHospitalController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Hospital Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting Hospital",
      error,
    });
  }
};

//Organistion Donar
const deleteOrganistionController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Organistion Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting Organistion",
      error,
    });
  }
};

export {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrganistionController,
};
