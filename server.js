const express = require('express');
const app = express();
const client = require('./db/client.js');
const { getActivities, getSingleActivity, createActivities, deleteActivity } = require('./db/activities.js');
const { getRoutines, getSingleRoutine, createRoutines, deleteRoutine } = require('./db/routines.js');

client.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// ACTIVITIY ROUTES
app.get('/api/v1/activities', async (req, res, next) => {
	try{
		const activities = await getActivities();
		res.send(activities);
	} catch (error){
		next(error);
	}
});

app.get('/api/v1/activities/:activityId', async (req, res, next) => {
	try{
		const singleActivity = await getSingleActivity(req.params.activityId);
		res.send(singleActivity)
	} catch (error) {
		next(error)
	}
	console.log('SPECIFIC ACTIVITY');
});

app.post('/api/v1/activities/create', async (req, res, next) => {
	try{
		newActivity = await createActivities(req.body);
		res.send(newActivity)
	}catch (error) {
		next(error);
	}
	console.log('ACTIVITY CREATED SUCESSFULLY')
});

app.delete('/api/v1/activities/delete/:activityId', async (req, res, next) => {
	try{
		const deletedAct = await deleteActivity(req.params.activityId);
		console.log(req.params.activityId)
		res.send('ACTIVITY SUCESSFULLY DELETED :)')
	} catch (err){
			next(err)
			console.send(404)
	}
});

// ROUTINE ROUTES
app.get('/api/v1/routines', async (req, res, next) => {
	try{
		const routines = await getRoutines();
		res.send(routines);
	}catch (error){
		next(error)
	}
});

app.get('/api/v1/routines/:routinesId', async (req, res, next) => {
	try{
		const singleRoutine = await getSingleRoutine(req.params.routinesId);
		res.send(singleRoutine)
	} catch (error) {
		next(error)
	}
	console.log('SPECIFIC ROUTINE');
});

app.post('/api/v1/routines/create', async (req, res, next) => {
	try{
		newRoutine = await createRoutines(req.body);
		res.send(newRoutine)
	}catch (error) {
		next(error);
	}
	console.log('ROUTINE CREATED SUCESSFULLY')
});

app.delete('/api/v1/routines/delete/:routineId', async (req, res, next) => {
	try{
		await deleteRoutine(req.params.routineId)
		res.send('ROUTINE SUCCESSFULLY DELETED :)')
	} catch (err){
			next(err)
	}
});

app.listen(3001, (req, res) => console.log('LISTENING ON PORT 3001'));