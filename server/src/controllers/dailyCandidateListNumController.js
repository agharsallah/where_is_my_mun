const CandidateListNumberShape = require('../app/models/dailyCandidatesListNumber');

/**
 * Fetch polling Center of 
 */
export const getCandidateLists = (req, res, next) => {
	//console.log(req.query);
	console.log(req.query.timeOfCollection);
	console.log(req.query.dateOfCollection);

	CandidateListNumberShape.findOne({name:req.query.type,timeOfCollection:req.query.timeOfCollection,dateOfCollection:req.query.dateOfCollection}, function(err, datashape) {
			if (err) { return next(err); }

			res.json(datashape);
		});
};

export const postCandidatesLists = (req, res, next) => {
    var shape = new CandidateListNumberShape();		// create a new instance of the Bear model
		shape.name = req.body.name;  //  name (comes from the request)
		shape.data = req.body.data;  //  name (comes from the request)
		shape.dateOfCollection = req.body.dateOfCollection; 
		shape.timeOfCollection = req.body.timeOfCollection; 

		shape.save(function(err) {
			if (err) { return next(err); }

			res.json({ message: 'candidateList created!' });
		});

};