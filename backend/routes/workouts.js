const express = require('express')

const {
  creating,
  gets,
  getting,
  deleting,
  updated
} = require('../controllers/workoutcontroller')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()/

// require auth for all workout routs
router.use(requireAuth)

// GET all workouts
router.get('/', gets)

// GET a single workout
router.get('/:id', getting)

// POST a new workout
router.post('/', creating)

// DELETE a workout
router.delete('/:id', deleting)

// UPDATE a workout
router.patch('/:id', updated)

module.exports = router



// const express = require('express')

// const router = express.Router()

// // GET all workouts
// router.get('/', (req, res) => {
//   res.json({mssg: 'GET all workouts'})
// })

// // GET a single workout
// router.get('/:id', (req, res) => {
//   res.json({mssg: 'GET a single workout'})
// })

// // POST a new workout
// router.post('/', async (req, res) => {
//   const {title, load, reps} = req.body

//   try{
//     const workout = await Workout.create({
//       title, load, reps
//     })
//     res.status(200).json(workout)
//   } catch(error){
//     res.status(400).json({error: error.message})
//   }

//   // res.json({mssg: 'POST a new workout'})
// })

// // DELETE a workout
// router.delete('/:id', (req, res) => {
//   res.json({mssg: 'DELETE a workout'})
// })

// // UPDATE a workout
// router.patch('/:id', (req, res) => {
//   res.json({mssg: 'UPDATE a workout'})
// })

// module.exports = router