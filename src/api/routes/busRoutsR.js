const router = require("express").Router();
const {
    addBusRoutes,
    getBusRoutes,
    updateBusRoutes,
    deleteBusRoutes,
    getoneBusRoutes,
} = require("../controller/busRoutC");
const Event = require("../models/busRoutesM");

//define user routes
router.post("/add", addBusRoutes);
router.get("/all", getBusRoutes);
router.put("/update/:id", updateBusRoutes);
router.delete("/delete/:id", deleteBusRoutes);
router.get("/:id", getoneBusRoutes);

module.exports = router;
