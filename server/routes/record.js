const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/products").get(function(req, res) {
    let db_connect = dbo.getDb("magazyn");
    //sortowanie
    db_connect.collection("products").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/storage").get(function(req, res) {
    let db_connect = dbo.getDb("magazyn");
    //zsumować cenę wszystkich produktów
    db_connect.collection("products").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/products").post(function(req, response){
    let db_connect = dbo.getDb("magazyn");
    let myobj = {
        id:req.body.id,
        name: req.body.name,
        price: req.body.price,
        productionYear: req.body.productionYear,
        colors: req.body.colors
    };
    // unikalność produktu
    db_connect.collection("products").insertOne(myobj, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/products/:id").put(function(req, response){
    let db_connect = dbo.getDb("magazyn");
    let myquery = {_id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            price: req.body.price,
            productionYear: req.body.productionYear,
            colors: req.body.colors
        },
    };
    db_connect.collection("products").updateOne(myquery, newValues, function(err, res){
        if (err) throw err;
        console.log("1 document updated successfully");
        response.json(res);
    });
});

recordRoutes.route("/products/:id").delete(function (req, res) {
    let db_connect = dbo.getDb("magazyn");
    let myquery = {_id: ObjectId(req.params.id)};
    // czy jest w trakcie realizacji zamówienia
    db_connect.collection("products").deleteOne(myquery, function(err, obj){
        if (err) throw err;
        console.log("1 document deleted");
        res.json(obj);
    });
})



module.exports = recordRoutes;