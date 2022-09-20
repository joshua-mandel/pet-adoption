const debug = require('debug')('app:server');
const debugError = require('debug')('app:error');
const express = require('express');
//const nanoid = require('nanoid');

// construct express app
const app = express();
// body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const petsArray = [
  {_id: "1", name: "Fido"},
  {_id: "2", name: "Watson"},
  {_id: "3", name: "Loki"}
];

// define routes
app.get('/api/pet/list', (req, res, next) => {
  res.json(petsArray);
});
app.get('/api/pet/:petId', (req, res, next) => {
  const petId = req.params.petId;

  // array lookup
  // const pet = petsArray[petId];
  // res.json(pet);

  // linear search
  // let pet;
  // for (const p of petsArray) {
  //   if(p.name == petId) {
  //     pet = p;
  //     break;
  //   }
  // }
  // res.json(pet);

  //using find
  const pet = petsArray.find(x => x._id == petId);
  if(!pet) {
    res.status(404).json({ error: "Pet not found" })
  } else{
    res.json(pet);
  }
  
})

// start listening for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  debug(`Server running at http://localhost:${port}`);
});