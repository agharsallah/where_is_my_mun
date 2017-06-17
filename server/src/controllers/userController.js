const User= require ('../app/models/user');

export const postUser = (req, res, next) => {

	// create a sample user
	var nick = new User({ 
		name: 'Isie', 
		password: 'Isie@ndDi',
		admin: true 
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
});

};