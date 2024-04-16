const client = require('./client.js');
const { getActivities, createActivities } = require('./activities.js');
const { createRoutines, getRoutines } = require('./routines.js');
const { createRoutinesActivites } = require('./routines_activities.js');


// DROPS TABLES IF EXIST 
const dropTables = async () => {
	try {
		await client.query(`
			DROP TABLE IF EXISTS routines_activities;
			DROP TABLE IF EXISTS activities;
			DROP TABLE IF EXISTS routines;
		`);
	} catch (error) {
		console.log("DROP ERROR:", error);
	};
};

// CREATES TABLES IN DATABASE 
const createTables = async () => {
	try { 
		await client.query(`
			CREATE TABLE activities (
				id SERIAL PRIMARY KEY,
				name VARCHAR(30) NOT NULL,
				description TEXT
			);

			CREATE TABLE routines (
				id SERIAL PRIMARY KEY,
				is_public BOOLEAN,
				name VARCHAR(30) NOT NULL,
				description TEXT
			);

			CREATE TABLE routines_activities (
				id SERIAL PRIMARY KEY,
				activities_id INTEGER REFERENCES activities(id) NOT NULL,
				routines_id INTEGER REFERENCES routines(id) NOT NULL,
				count INTEGER NOT NULL 
			);
		`);
	} catch (error) {
		console.log("CREATE ERROR",error);
	};
};

// SYNC AND SEED DATABASE WITH MOCK DATA
const syncAndSeed = async () => {
	await client.connect();
	console.log('CONNECTED TO DB');
	
	await dropTables();
	console.log('TABLES DROPPED');
	
	await createTables();
	console.log('TABLES CREATED')

	const sideKicks = await createActivities({activityName: 'wall_kicks_side', description :'hand on wall, chamber up, continuous side kicks'});
	const roundKicks = await createActivities({activityName:'wall_kicks_round', description :'hand on wall, chamber up, continuous roundhouse kicks'});
	const pullSide = await createActivities({activityName:'pull_side', description :'chamber up, hop with bottom foot, and side kick'});
	const pullRound = await createActivities({activityName:'pull_round', description :'chamber up, hop with bottom foot, and roundhouse kick'});
	const squats = await createActivities({activityName:'squat_jumps', description :'squat then jump'});

	const kicks = await createRoutines({is_public: true, routineName: 'crazy_kicks', description: 'kicks kicks kicks'});
	const pulls = await createRoutines({is_public: true, routineName: 'pull_kicks', description:'Nothing but pulls'});
	const hell = await createRoutines({is_public: false, routineName:'hell_day', description:'all workouts'});

	await createRoutinesActivites(sideKicks.id, kicks.id, 3);
	await createRoutinesActivites(roundKicks.id, kicks.id, 5);
	await createRoutinesActivites(pullRound.id, pulls.id, 6);
	await createRoutinesActivites(pullSide.id, pulls.id, 9);
	
	await client.end();
	console.log('CONNECTION ENDED');
};

syncAndSeed();
