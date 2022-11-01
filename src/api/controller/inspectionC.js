const Inspection = require("../models/inspectionM");
const { inspection_validation } = require("../validation/inspectionValidation");


let Id = 1;

//add inspection function
const addInspection = async (req, res) => {

		const { error } = inspection_validation(req.body);
		if (error) {
			res.send({ message: error["details"][0]["message"] });
		}

		//assign data to the model
		const inspection = new Inspection({
			inspectionId: `I00${Id}`,
			routeId: req.body.routeId,
			time: req.body.time,
			date: req.body.date,
			inspectorName: req.body.inspectorName,
			enquiries: req.body.enquiries,
		});

		try {
			//save the data in the database
			const savedInspection = await inspection.save();
			res.send(savedInspection);
            Id += 1;
		} catch (error) {
			//error handling
			res.status(400).send({ message: error });
		}
	// } else {
	// 	return res
	// 		.status(403)
	// 		.json("You do not have permission to access this");
	// }
};

const getInspection = async (req, res) => {
	try {
		const inspection = await Inspection.find();
		res.send(inspection);
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const updateInspection = async (req, res) => {

 	const inspectionId = req.params.id;

		try {
			const inspection = await Inspection.findById(inspectionId);
			if (!inspection) {
				res.status(404).json("No inspection Found");
			}

			const {
				inspectionID,
				routeId,
				time,
				date,
				inspectorName,
				enquiries,
			} = req.body;
			const updateInspection = await Inspection.findByIdAndUpdate(
				inspectionId,
				{
					inspectionID,
					routeId,
					time,
					date,
					inspectorName,
					enquiries,
				},
			);

			res.status(200).json(updateInspection);
		} catch (err) {
			res.status(400).send({ message: err });
		}

};

const deleteInspection = async (req, res) => {

		const inspectionId = req.params.id;

		try {
			const inspection = await Inspection.findById(inspectionId);

			if (!inspection) {
				res.status(404).json("inspection Not Found");
			}

			const deletedInspection = await Inspection.findByIdAndDelete(inspectionId);
			res.status(200).json(deletedInspection);
		} catch (err) {
			res.status(400).json(err.message);
		}

};

const getoneInspection = async (req, res) => {
	try {
		const inspection = await Inspection.findOne({ _id: req.params.id });

		if (!inspection) {
			res.status(404).json("inspection Not Found");
		}
		res.status(200).json(inspection);
	} catch (err) {
		res.status(400).json(err.message);
	}
};

module.exports = {
	addInspection,
	getInspection,
	updateInspection,
	deleteInspection,
	getoneInspection,
}; //export functions
