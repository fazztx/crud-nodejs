const express = require('express');
const router = express.Router();


let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  // Copy the code here
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/email/:email", (req, res) => {
  // Copy the code here
  res.send(users.filter((a) => (a.email === req.params.email)));
});

router.get("/lastName/:lastName", (req, res) => {
  console.log(`Requested last name: ${req.params.lastName}`);
  res.send(users.filter( (user) => (user.lastName === req.params.lastName)));

});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
  // Sort the users array by DOB in ascending order
  let sorted_users = users.sort(function(a, b) {
      let d1 = getDateFromString(a.DOB);
      let d2 = getDateFromString(b.DOB);
      return d1 - d2;
  });
  // Send the sorted_users array as the response to the client
  res.send(sorted_users);
});


// POST request: Create a new user
router.post("/", (req, res) => {
  // Push a new user object into the users array based on query parameters from the request
  users.push({
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "email": req.body.email,
    "DOB": req.body.DOB
  });
  // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.body.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here

  const userToUpdate = users.find((user) => (user.email === req.params.email));

  if (userToUpdate) {
    if (req.body.firstName) { userToUpdate.firstName = req.body.firstName; }
    if (req.body.lastName) { userToUpdate.lastName = req.body.lastName; }
    if (req.body.email) { userToUpdate.email = req.body.email; }
    if (req.body.DOB) { userToUpdate.DOB = req.body.DOB; }
    res.send(`User with the email ${req.params.email} updated.`)
  } else {
    res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here

  users = users.filter((user) => user.email != req.params.email);

  res.send(`User with the email ${req.params.email} deleted.`);

  // let index = users.findIndex((user) => (user.email === req.params.email));

  // if(index > -1){
  //   users.splice(index, 1);
  //   res.send("deleted");
  // } else{
  //   res.send("Nothing to be deleted");
  //}
});




module.exports = router;
