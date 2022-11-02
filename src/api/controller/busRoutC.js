const BusRoutes = require("../models/busRoutesM");
const { busRoutes_validation } = require("../validation/busRoutesValidation");

//add Bus Route function
const addBusRoutes = async (req, res) => {

		//validate the Bus Route input fields
		const { error } = busRoutes_validation(req.body.data);
		if (error) {
			res.send({ message: error["details"][0]["message"] });
		}


		//assign data to the model
		const busRoutes = new BusRoutes({
			timetableID: req.body.timetableID,
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
			res.send(savedBusRoutes);
		} catch (error) {
			//error handling
			res.status(400).send({ message: error });
		}

};

const getBusRoutes = async (req, res) => {
	try {
		const busRoutes = await BusRoutes.find();
		res.send(busRoutes);
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const updateBusRoutes = async (req, res) => {

		const busRoutesId = req.params.id;

		try {
			const busRoutes = await BusRoutes.findById(busRoutesId);
			if (!busRoutes) {
				res.status(404).json("No Bus Routes Found");
			}

			const {
				timetableID,
				vehicleNo,
				routeId,
				time,
				date,
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
					date,
					startLocation,
                    EndLocation,
                
				},
			);

			res.status(200).json(updateBusRoutes);
		} catch (err) {
			res.status(400).send({ message: err });
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
