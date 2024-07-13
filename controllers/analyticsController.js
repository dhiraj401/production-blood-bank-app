import mongoose from "mongoose";
import { Inventory } from "../models/inventoryModel.js";

// GET BLOOD DATA
const bloodGroupDetailsContoller = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);

    // Get blood group data
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Count Total In
        const totalIn = await Inventory.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: "in",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);

        // Count Total Out
        const totalOut = await Inventory.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: "out",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);

        // Calculate Total Available Blood
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        // Push the data to bloodGroupData array
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );

    // Send response
    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

export { bloodGroupDetailsContoller };
