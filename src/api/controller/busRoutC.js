const BusRoutes = require("../models/busRoutesM");
const { busRoutes_validation } = require("../validation/busRoutesValidation");

let timetableI = 0;
//add Bus Route function
const addBusRoutes = async (req, res) => {
		//validate the Bus Route input fields
		const { error } = busRoutes_validation(req.body);
		if (error) {
			return res.send({ message: error["details"][0]["message"] });
		}

		const last = await BusRoutes.find().sort({ _id: -1 });

	// checking whether the array is not empty
	if (!(last.length === 0)) {
		// console.log("Last: ", parseInt(last[0].userID.split("0")[1]));
		timetableI = parseInt(last[0].timetableID.split("0")[1]);
	}
		//assign data to the model
		const busRoutes = new BusRoutes({
			timetableID: "T0" + (timetableI + 1),
			vehicleNo: req.body.vehicleNo,
			routeId: req.body.routeId,
			time: req.body.time,
			date: req.body.date,
			startLocation: req.body.startLocation,
            EndLocation: req.body.EndLocation,

		});

		try {
			//save the data in the database
			const savedBusRoutes = await busRoutes.save();
			return res.send(savedBusRoutes);
			
		} catch (error) {
			//error handling
			return res.status(400).send({ message: error });
		}
};

const getBusRoutes = async (req, res) => {
	try {
		const busRoutes = await BusRoutes.find();
		return res.send(busRoutes);
	} catch (error) {
		return res.status(400).send({ message: error });
	}
};

const updateBusRoutes = async (req, res) => {

		const busRoutesId = req.params.id;

		
		try {
			const busRoutes = await BusRoutes.findById(busRoutesId);
			if (!busRoutes) {
				return res.status(404).json("No Bus Routes Found");
			}
			console.log(timetableID)

			const {
				timetableID,
				vehicleNo,
				routeId,
				time,
				// date,
				startLocation,
                EndLocation,

			} = req.body;
			const updateBusRoutes = await BusRoutes.findByIdAndUpdate(
				busRoutesId,
				{
					timetableID,
					vehicleNo,
					routeId,
					time,
					// date,
					startLocation,
                    EndLocation,

				},
			);
			console.log("updated", updateBusRoutes)
			return res.status(200).json(updateBusRoutes);
		} catch (err) {
			return res.status(400).send({ message: err });
		}
	
};

const deleteBusRoutes = async (req, res) => {

		const busRoutesId = req.params.id;

		try {
			const busRoutes = await BusRoutes.findById(busRoutesId);

			if (!busRoutes) {
				res.status(404).json("Bus Routes Not Found");
			}

			const deletedBusRoutes = await BusRoutes.findByIdAndDelete(busRoutesId);
			res.status(200).json(deletedBusRoutes);
		} catch (err) {
			res.status(400).json(err.message);
		}

};

const getoneBusRoutes = async (req, res) => {
	try {
		const busRoutes = await BusRoutes.findOne({ _id: req.params.id });

		if (!busRoutes) {
			res.status(404).json("Bus Routes Not Found");
		}
		res.status(200).json(busRoutes);
	} catch (err) {
		res.status(400).json(err.message);
	}
};

module.exports = {
	addBusRoutes,
	getBusRoutes,
	updateBusRoutes,
	deleteBusRoutes,
	getoneBusRoutes,
}; //export functions
