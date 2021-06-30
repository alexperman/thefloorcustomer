var express = require("express");
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://alexperman:koza2020@cluster0.yqqke.mongodb.net/thefloor?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


router.get("/", (req, res) => {
  client.connect(err => {
    if (err) return console.error(err)
    const db = client.db('thefloor')
    db.collection("customers")
      .find()
      .toArray()
      .then((customers) => {
        res.render("customers/list.ejs", { customers: customers });
      })
      .catch(/* ... */);
  });
});

router.get('/new', (req, res) => {
  res.render('details.ejs');
})

router.post("/customers", (req, res) => {
  client.connect(err => {
    if (err) return console.error(err)
    const db = client.db('thefloor')
    db.collection("customers")
      .insertOne(req.body)
      .then((result) => {
        res.redirect("/customers");
      })
      .catch((error) => console.error(error));
  });
});

router.put("/customers", (req, res) => {
  client.connect(err => {
    if (err) return console.error(err)
    const db = client.db('thefloor')
    db.collection("customers")
    .findOneAndUpdate(
      { name: "First Customer" },
      {
        $set: {
          name: req.body.name,
          numer: req.body.number,
          address: req.body.address,
          phone: req.body.phone
        },
      },
      {
        upsert: true,
      }
    )
    .then((result) => res.json("Success"))
    .catch((error) => console.error(error));
  });
});

router.delete("/customers", (req, res) => {
  client.connect(err => {
    if (err) return console.error(err)
    const db = client.db('thefloor')
    db.collection("customers")
    .deleteOne({ name: req.body.name })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json("No customer to delete");
      }
      res.json("Deleted customer");
    })
    .catch((error) => console.error(error));
  });
});

module.exports = router;
