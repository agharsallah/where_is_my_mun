const CandidateListNumberShape = require('../app/models/dailyCandidatesListNumber');

/**
 * Fetch polling Center of 
 */
export const getCandidateLists = (req, res, next) => {

	Shape.findOne({name:req.params.gouv}, function(err, datashape) {
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