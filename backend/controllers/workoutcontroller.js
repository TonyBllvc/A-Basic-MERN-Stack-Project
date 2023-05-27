const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');

//get all workout 

const gets = async (req, res) => {
    // because the data properties are stored in the req
    const user_id = req.user._id

    // sort by only the user id and time created 
    const workout = await Workout.find({user_id}).sort({ createdAt: -1 })

    res.status(200).json(workout)
}

//get a single workout 
const getting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}


//create new workout

const creating = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        // to request for individual user id
        // from the 'user' db
        const user_id = req.user._id

        const workout = await Workout.create({
            title, load, reps, user_id
        })

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//delete a workout
const deleting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const workout = await Workout.findByIdAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}


// update a workout
const updated = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such document' })
    }

    const workout = await Workout.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)

}


module.exports = {
    creating,
    gets,
    getting,
    deleting,
    updated
}