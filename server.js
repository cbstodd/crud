// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var courseController = require('./controllers/course');

// Connect to the noobsee MongoDB
mongoose.connect('mongodb://localhost:27017/noobsee');

// Create our Express application
var app = express();

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();
/*------------------------------------------------
 ROUTES
 ------------------------------------------------*/
// Create endpoint handlers for /courses
router.route('/courses')
      .post(courseController.postCourses)
      .get(courseController.getCourses);

// Create endpoint handlers for /courses/:course_id
router.route('/courses/:course_id')
      .get(courseController.getCourse)
      .put(courseController.putCourse)
      .delete(courseController.deleteCourse);


/*------------------------------------------------
 SERVER
 ------------------------------------------------*/

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('%%% Express listening on http://localhost:' + port + ' %%%');


