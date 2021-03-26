const router = require("express").Router();
const Workout = require("../models/workout.js");
const path=require('path');

router.get("/exercise",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/exercise.html"));
})

router.get("/stats",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/stats.html"));
})


router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
    $addFields:{
      totalDuration:{
        $sum:'$exercises.duration'
      },
    },
  },
])
    .then(dbworkouts => {
      res.json(dbworkouts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});


router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbworkouts => {
      res.json(dbworkouts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});


router.get("/api/workouts/range",(req,res)=>{
  Workout.aggregate([
    {
    $addFields:{
      totalDuration:{
        $sum:'$exercises.duration'
      },
    },
  },
]).sort({_id:-1}).limit(7)
    .then(dbworkouts => {
      res.json(dbworkouts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
})


router.put("/api/workouts/:id",(req,res)=>{
  console.log('im here?')
    Workout.findByIdAndUpdate(
      req.params.id,{$push:{exercises:req.body}}
    ).then(dbworkouts => {
      res.json(dbworkouts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
})



module.exports = router;