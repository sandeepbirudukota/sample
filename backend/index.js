const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "lab",
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json());

db.connect((err) => {
  if (err) {
    throw err;
  }
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("Correct");
          response.end("SUCCESS");
        } else {
          console.log("Incorrect");

          response.end("UNSUCCESS");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/register", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "INSERT INTO `users`(`username`, `password`) VALUES (?,?)",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error

        console.log(results);
        // If the account exists
        if (error) {
          if (error.errno == 1062) {
            console.log("User not Created");

            response.end("UNSUCCESS");
          }
        }

        if (results) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("User Created");
          response.end("SUCCESS");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/getuserdata", function (request, response) {
  let user = request.query.user;
  console.log(user);
  db.query(
    "SELECT * FROM `users` WHERE `username` = ?",
    [user],
    function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        response.json(rows);
      }
    }
  );
});

app.post("/userupdate", function (request, response) {
  let username = request.body.username;
  console.log(request.body);

  if (username) {
    db.query(
      "UPDATE `users` SET `name`=?,`email`=?,`phone`=?,`gender`=?,`birthday`=?,`address`=?,`city`=?,`country`=? WHERE `username` = ?",
      [
        request.body.name,
        request.body.email,
        request.body.phone,
        request.body.gender,
        request.body.birthday,
        request.body.address,
        request.body.city,
        request.body.country,
        username,
      ],
      function (error, results, fields) {
        // If there is an issue with the query, output the error

        console.log(results);

        if (results) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("User Updated");
          response.end("SUCCESS");
        }
        response.end("UNSUCCESS");
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/checkshop", function (request, response) {
  let shop = request.body.shop;
  let username = request.body.username;

  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (shop) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "UPDATE `users` SET `shop`=? WHERE `username` = ?",
      [shop, username],
      function (error, results, fields) {
        // If there is an issue with the query, output the error

        console.log(results);
        // If the account exists
        if (error) {
          if (error.errno == 1062) {
            console.log("User not Created");

            response.end("UNSUCCESS");
          }
        }

        if (results) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("Shop Created");
          response.end("SUCCESS");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Shop name!");
    response.end();
  }
});

app.post("/additem", function (request, response) {
  // Capture the input fields
  console.log(request.body);
  // Ensure the input fields exists and are not empty

  // Execute SQL query that'll select the account from the database based on the specified username and password
  db.query(
    "INSERT INTO `items`(`name`, `category`, `price`, `description`, `quantity`, `shop`) VALUES (?,?,?,?,?,?)",
    [
      request.body.name,
      request.body.category,
      request.body.price,
      request.body.description,
      request.body.quantity,
      request.body.shop,
    ],
    function (error, results, fields) {
      // If there is an issue with the query, output the error

      console.log(results);
      // If the account exists
      if (error) {
        throw error;
      }
      if (results) {
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });

        console.log("Item Created");
        response.end("SUCCESS");
      }
      console.log(results);
      response.end("UNSUCCESS");
    }
  );
});

app.post("/edititem", function (request, response) {
  // Capture the input fields
  console.log("body: ", request.body);

  db.query(
    "UPDATE `items` SET `name`=?,`category`=?,`price`=?,`description`=?,`quantity`=? WHERE `shop` = ? AND `id` = ?",
    [
      request.body.name,
      request.body.category,
      request.body.price,
      request.body.description,
      request.body.quantity,
      request.body.shop,
      request.body.id,
    ],
    function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) {
        throw error;
      }
      // If the account exists
      if (results) {
        // Authenticate the user
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });
        // Redirect to home page
        // console.log(results);
        response.end("SUCCESS");
      }
      response.end("UNSUCCESS");
    }
  );
});

app.delete("/deleteitem", function (req, res) {
  console.log(req.body);
  db.query(
    "DELETE FROM `items` WHERE `id`=?",
    [req.body.id],
    function (error, results, fields) {
      if (error) throw error;
      if (results) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("SUCCESS");
      }
      res.end("UNSUCCESS");
    }
  );
});

app.get("/getitems", function (request, response) {
  let shop = request.query.shop;
  db.query(
    "SELECT * FROM `items` WHERE `shop` = ?",
    [shop],
    function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log(rows);
        response.json(rows);
      }
    }
  );
});

app.get("/getallitems", function (request, response) {
  db.query("SELECT * FROM `items`", function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      response.json(rows);
    }
  });
});

app.post("/addfavourites", function (request, response) {
  // Capture the input fields
  console.log(request.body);

  db.query(
    "INSERT INTO `favourites`(`id`, `user`) VALUES (?,?)",
    [request.body.id, request.body.user],
    function (error, results, fields) {
      // If there is an issue with the query, output the error

      console.log(results);
      // If the account exists
      if (error) {
        if (error.errno == 1062) {
          console.log("Aready Added to Favourites");

          response.end("UNSUCCESS");
        }
      }
      if (results) {
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });

        console.log("Added to Favourites");
        response.end("SUCCESS");
      }
      console.log(results);
      response.end("UNSUCCESS");
    }
  );
});

app.get("/getfavourites", function (request, response) {
  // Capture the input fields
  console.log(request.query);

  db.query(
    "SELECT `id` FROM `favourites` WHERE `user` = ?",
    [request.query.user],
    function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log(rows);
        let array = [];
        rows.map((row) => array.push(row.id));
        console.log("array: " + array);
        if (array.length > 0) {
          const query =
            "SELECT * FROM `items` WHERE `id` in (?" +
            ",?".repeat(array.length - 1) +
            ")";
          console.log(query);
          db.query(query, array, function (err, rows, fields) {
            if (err) {
              throw err;
            } else {
              console.log(rows);
              response.json(rows);
            }
          });
        } else {
          response.end("EMPTY");
        }
      }
    }
  );
});

app.get("/getsearchitems", function (request, response) {
  console.log("request: ", request.query);
  // const query = ;
  // console.log(query);
  db.query(
    "SELECT * FROM `items` WHERE `name` LIKE '%" + request.query.keyword + "%'",
    function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log(rows);
        response.json(rows);
      }
    }
  );
});

app.post("/addcart", function (request, response) {
  // Capture the input fields
  console.log(request.body);

  db.query(
    "INSERT INTO `cart`(`id`, `user`,`quantity`) VALUES (?,?,?)",
    [request.body.id, request.body.user, request.body.quantity],
    function (error, results, fields) {
      // If there is an issue with the query, output the error
      console.log(results);
      // If the account exists
      if (error) {
        if (error.errno == 1062) {
          console.log("Aready Added to Cart");

          response.end("UNSUCCESS");
        }
      }
      if (results) {
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });
        db.query("UPDATE `items` SET `quantity`=? WHERE `id` =?", [
          request.body.rquantity,
          request.body.id,
        ]);
        console.log("Added to Cart");
        response.end("SUCCESS");
      }
      console.log(results);
      response.end("UNSUCCESS");
    }
  );
});

app.get("/getcart", function (request, response) {
  // Capture the input fields
  console.log(request.query);

  db.query(
    "SELECT `id`,`quantity` FROM `cart` WHERE `user` = ?",
    [request.query.user],
    function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log(rows);
        let array = [];
        let q = [];
        rows.map((row) => array.push(row.id));
        rows.map((row) => q.push(row.quantity));

        console.log("array: " + array);
        if (array.length > 0) {
          const query =
            "SELECT * FROM `items` WHERE `id` in (?" +
            ",?".repeat(array.length - 1) +
            ")";
          console.log(query);
          db.query(query, array, function (err, rows, fields) {
            if (err) {
              throw err;
            } else {
              rows.map((row, index) => (row.quantity = q[index]));
              console.log(rows);
              response.json(rows);
            }
          });
        } else {
          response.end("EMPTY");
        }
      }
    }
  );
});

app.delete("/deletecartitem", function (req, res) {
  console.log(req.body);
  db.query(
    "DELETE FROM `cart` WHERE `id`=? AND `user`=?",
    [req.body.id, req.body.user],
    function (error, results, fields) {
      if (error) throw error;
      if (results) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        console.log(results);
        db.query(
          "UPDATE `items` SET `quantity`= `quantity` + ? WHERE `id` = ?",
          [req.body.quantity, req.body.id]
        );
        res.end("SUCCESS");
      }
      res.end("UNSUCCESS");
    }
  );
});

app.get("/getcarttotal", function (request, response) {
  // Capture the input fields
  console.log(request.query);

  db.query(
    "SELECT `id`,`quantity` FROM `cart` WHERE `user` = ?",
    [request.query.user],
    function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        console.log(rows);
        let array = [];
        let quantity = [];

        rows.map((row) => array.push(row.id));
        rows.map((row) => quantity.push(row.quantity));

        console.log("array: " + array);
        if (array.length > 0) {
          const query =
            "SELECT * FROM `items` WHERE `id` in (?" +
            ",?".repeat(array.length - 1) +
            ")";
          console.log(query);
          db.query(query, array, function (err, rows, fields) {
            if (err) {
              throw err;
            } else {
              let q = 0;
              rows.map((row, index) => (q = row.price * quantity[index] + q));
              console.log(q);
              response.json(q);
            }
          });
        } else {
          response.end("EMPTY");
        }
      }
    }
  );
});

app.listen("3001", () => {});
