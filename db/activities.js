const client = require("./client")

const createActivities = async ({activityName, description}) => {
	try {
		const {rows: [newActivity]} = await client.query(`
			INSERT INTO activities (name,description)
			VALUES ('${activityName}', '${description}')
			RETURNING *;
		`);
		return newActivity;
	} catch (error) {
		console.log('CREATE ACTIVITY ERROR', error);
	};
}

const getActivities = async () => {
	try {
		const {rows} = await client.query(`
			SELECT * FROM activities;
		`);
			return rows;
	} catch (error) {
		console.log(error);
	};
};

const getSingleActivity = async (id) => {
	try {
		const {rows: [singleActivity]} = await client.query(`
			SELECT * FROM activities
			WHERE id = ${id};
		`);
		return singleActivity
	} catch (error){
		console.log('GETTING SINGLE ACTIVITY ERROR', error)
	}
};

const deleteActivity = async (id) => {
 try {
	await client.query(`
		DELETE FROM activities
		WHERE id = ${id}
	`)
 } catch (error){
	console.log(`DELETE ACTIVITY ERROR`, error)
 }
};

module.exports = {
	getActivities,
	createActivities,
	getSingleActivity,
	deleteActivity
};