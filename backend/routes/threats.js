const express = require('express');
const router = express.Router();
const Threat = require("../models/Threat");

router.get('/', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;

    const query = {};

    if (category) {
        query.threat_category = category;
    }

    if (search) {
        query.description = { $regex: search, $options: "i" };
    }

    try{
        const [threats, total] = await Promise.all([
        Threat.find(query).skip((page - 1) * limit).limit(limit),
        Threat.countDocuments(query)
        ]);

        res.json({ data: threats, total });
    }
    catch(err){
        console.error("Error fetching threats:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});



router.get('/stats', async(req, res) => {
    try{
        const totalThreats = await Threat.countDocuments();
        const categoryCounts = await Threat.aggregate([{$group : {_id : "$threat_category", count : {$sum : 1}}}]);
        const severityCounts  = await Threat.aggregate([{$group : {_id : "$severity_score", count : {$sum : 1}}}]);
        const locationCounts = await Threat.aggregate([{$group : {_id : "$location", count : {$sum : 1}}}]);

        res.json({
            totalThreats,
            categoryCounts,
            severityCounts,
            locationCounts
        });
    }
    catch(err){
        console.log("Error fetching stats : ", err);
        res.status(500).json({message : "Internal server error"});
    }
});



router.get('/:id', async(req, res) => {
    const id = req.params.id;

    const query = {};
    query._id = id;

    try{
        const threat = await Threat.findById(query);
        if (!threat) {
            return res.status(404).json({ message: "Threat not found" });
        }
        res.json({ data: threat });
    }
    catch(err){
        console.error(`Error fetching threat with ID ${id}:`, err);
    
        // Handle invalid ObjectId
        if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
        }

        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;