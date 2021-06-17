const { response } = require("express");
const express = require("express");
const logger = require("morgan");


const server = express();

const port = 5000;


server.use(logger("dev"));
server.use(express.json())


server.get("/*", (req, res) => {
  res.send("This is my first USSD Application");
});

server.post("/*", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  if (text === "") {
    //first request
    //This is a USSD request. stating response with CON
    const response = `CON What do you want to check 
        1. My Account
        2. My phone number`;
      res.send(response)
  } else {
    //My logic for first level response
    if (text === 1) {
      // This is a terminal request. Note how we start the response with END

      const response = `END Choose account information you want to see
            1. Account number
            2. Account balance`;

      res.send(response);
    } else {
      if (text === 2) {
        //My logic for logic for  first level response

        const response = `END your phone number is ${phoneNumber}`;
        res.send(response);
      } else {
        if (text === 1 * 1) {
          //My logic for logic for  first level response
          const accountNumber = "ACC1001";
          const response = `END Your account number is ${accountNumber}`;
          res.send(response);
        } else {
          if (text === 1 * 2) {
            const accountBalance = ` GHS 19,000`;

            const response = `END Your Account Balance is ${accountBalance}`;
            res.send(response);
          } else {
              res.status(400).send('Bad Request')
          }
        }
      }
    }
  }
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
