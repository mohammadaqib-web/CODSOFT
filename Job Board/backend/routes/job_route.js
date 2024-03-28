const express = require('express');
const { postJob, jobApply, searchJob, allJobs } = require('../controllers/job_controller');
const authenticate = require('../middlewares/protectedRoute');
const employerAuthenticate = require('../middlewares/employerRoute');
const router = express.Router();

router.post('/postJob',authenticate,employerAuthenticate,postJob);
router.put('/jobApply/:id',authenticate,jobApply);
router.get('/searchJob/:name',searchJob);
router.get('/allJobs',allJobs);

module.exports = router;