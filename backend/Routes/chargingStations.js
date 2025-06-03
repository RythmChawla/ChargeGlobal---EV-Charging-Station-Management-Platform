const express = require("express");
const router = express.Router();
const ChargingStation = require("../models/ChargingStation");
const ensureAuthenticated = require("../Middlewares/Auth");

// CREATE - Add new charging station
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const station = new ChargingStation(req.body);
    const saved = await station.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - Get all stations
router.get("/", async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /stations/:id - get single station
router.get("/:id", async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    res.json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Modify a station
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const updated = await ChargingStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Remove a station
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    await ChargingStation.findByIdAndDelete(req.params.id);
    res.json({ message: "Station deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
