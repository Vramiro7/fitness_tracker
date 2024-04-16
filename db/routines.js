const client = require("./client")

const createRoutines = async ({is_public,routineName, description}) => {
	try {
		const {rows: [newRoutine]} = await client.query(`
			INSERT INTO routines (is_public, name, description)
			VALUES ('${is_public}', '${routineName}', '${description}')
			RETURNING *;
		`);
		return newRoutine;
	} catch (error) {
		console.log('CREATE ROUTINE ERROR', error);
	};
}

const getRoutines = async () => {
	try {
		const {rows} = await client.query(`
			SELECT * FROM routines;
		`);
			return rows; 
	} catch (error) {
		console.log(error);
	};
};

const getSingleRoutine = async (id) => {
	try {
		const {rows: [singleRoutine]} = await client.query(`
			SELECT * FROM routines
			WHERE id = ${id};
		`);
		return singleRoutine;
	} catch (error){
		console.log('GETTING SINGLE ROUTINE ERROR', error)
	}
}

const deleteRoutine = async (id) => {
	try {
	 await client.query(`
		 DELETE FROM routines
		 WHERE id = ${id}
	 `)
	} catch (error){
	 console.log(`DELETE ROUTINE ERROR`, error)
	}
 };

module.exports = {
	getRoutines,
	createRoutines,
	getSingleRoutine,
	deleteRoutine
};