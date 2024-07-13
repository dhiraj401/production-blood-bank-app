import mongoose from "mongoose";
import { Inventory } from "../models/inventoryModel.js";
import { User } from "../models/userModel.js";

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await Inventory.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

//get all blood records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.find({ organisation: req.body.userId })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Get Inventor Api Error",
      error,
    });
  }
};

//get Hospital blood records
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await Inventory.find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital comsumer Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get consumar Inventory",
      error,
    });
  }
};

//GET DONAR RECODS

const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donars
    const donarId = await Inventory.distinct("donar", {
      organisation,
    });
    //console.log(donarId);
    const donars = await User.find({ _id: { $in: donarId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar record",
      error,
    });
  }
};

//Get Hospital

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await Inventory.distinct("hospital", {
      organisation,
    });
    //console.log(donarId);
    const hospitals = await User.find({ _id: { $in: hospitalId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital record",
      error,
    });
  }
};

const getOrgnaisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await Inventory.distinct("organisation", { donar });
    //find org
    const organisations = await User.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Orgnaisation  record",
    });
  }
};

const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await Inventory.distinct("organisation", { hospital });
    //find org
    const organisations = await User.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital Org  record",
    });
  }
};

//GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      organisation: req.body.userId,
    })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error get Recenty Blood data API",
      error,
    });
  }
};

export {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
