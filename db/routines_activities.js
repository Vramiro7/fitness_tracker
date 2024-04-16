const client = require("./client")

const createRoutinesActivites = async ({activity_id, routines_id, count}) => {
	try {
			const {rows: [newInput]} = await client.query(`
			INSERT INTO routines_activities (activities_id, routines_id, count)
			VALUES ('${activity_id}', '${routines_id}', ${count})
			RETURNING *;
		`);
			return newInput;
	} catch (error) {
		console.log('CREATE ROUTINESACTIVIY ERROR', error);
	};
}

const getRoutinesActivities = async () => {
	try {
		const {rows} = await client.query(`
			SELECT * FROM routines_activities;
		`);
			return rows; 
	} catch (error) {
		console.log(error);
	};
};

module.exports = {
	getRoutinesActivities,
	createRoutinesActivites
};