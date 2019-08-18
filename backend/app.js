const express = require("express");
const bodyparser = require("body-parser"); // parses your request and convert in to required fomat
const mongodb = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");

const app = express();  // Create an Express Application

const multer = require("multer");

var myProducts = [{pdtName:'Knorr Instant Soup (100 Gm)', pdtImg:'http://localhost:4200/assets/images/5.png', pdtPrice:56},
{pdtName:'Chings Noodles (75 Gm)', pdtImg:'http://localhost:4200/assets/images/6.png', pdtPrice:41},
{pdtName:'Lahsun Sev (150 Gm)', pdtImg:'http://localhost:4200/assets/images/7.png', pdtPrice:74},
{pdtName:'Premium Bake Rusk (300 Gm)', pdtImg:'http://localhost:4200/assets/images/8.png', pdtPrice:22}];

app.use(bodyparser.json());  // it parses json

app.use((req, res, next)=>{

    console.log("Middleware1");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

   next();
});

app.use((req, res, next)=>{

    console.log("Middleware2");

    next();
});

var db;

mongodb.connect("mongodb://naga:naga123@ds037637.mlab.com:37637/shopping", (error, database)=>{

if(error)
{
    console.log(error);
}
else {

    console.log("DB Connected");

   // console.log(database);

    db =  database;
}


})

var loggedUser;

function verifyUser(req, res, next)
{

    var myTokenKey = req.headers.authorization;

    console.log(myTokenKey);

    if(!myTokenKey)
    {
        return res.status(401).send("No key Found");
    }

    jwt.verify(myTokenKey, 'mykey', (error, data)=>{

        if(error)
        {
            console.log(error);

            return res.status(401).send("Key Mis match");
        }
        else {

            console.log(data);
            loggedUser = data;
        }
    })

    next();
}


app.get("/", (req, res)=>{

    
    res.send("Welcome to Express Homepage");

});

app.get("/users", (req, res)=>{

    console.log("Routing");
    res.json("Users list here");
});


app.get('/listproducts', (req, res)=>{
    //res.json(myProducts);
    db.collection("products").find(req.body).toArray((error, data)=>{

        if(error)
        {
            console.log(error);

            res.status(403).send("error in select query");
        }
        else {

            //console.log(data);

            res.json(data);
        }

    })

});

app.get('/getsingleproduct/:proid',(req, res)=>{

    console.log(req.params.proid);

    db.collection("products").find( {_id : Number(req.params.proid)} ).toArray((error,data)=>{

        if(error)
        {
            console.log(error);
            res.status(403).json("Error in Select query");
        }
        else {
            res.json(data);
        }
    })
})



app.post("/register", (req, res)=>{


    console.log(req.body);

    req.body._id = new Date().getTime();

    db.collection("users").save(req.body, (err, data)=>{

        if(err)
        {
            res.status(401).send("Something went wrong");
        }
        else {

            res.json("User Registered Sucessfully");

        }

    })

   
});


app.post("/login", (req, res)=>{

    console.log(req.body);

    db.collection("users").find(req.body, {_id:1, Username:1}).toArray((error, data)=>{

        if(error)
        {
            console.log(error);

            res.status(403).send("error in select query");
        }
        else {

            console.log(data);

            var token = jwt.sign(data[0], 'mykey');

            console.log(token);
            
            loggedUser = data[0];

            res.json(token);
        }

    })

   
})



app.get('/listcategories', (req, res)=>{

    db.collection("categories").find(req.body).toArray((error, data)=>{

        if(error)
        {
            console.log(error);

            res.status(403).send("error in select query");
        }
        else {

            console.log(data);

            res.json(data);
        }

    })
});





var storage = multer.diskStorage({
    destination : (req, file, cb)=>{

        cb(null, "src/assets/pdt_images")
    },
    filename : (req, file, cb)=>{

        cb(null, file.originalname+"-"+new Date().getTime()+".png")
    }
})


app.post("/addproduct", multer({storage : storage}).single("pdtImg"), (req, res)=>{

   // console.log(req.file.filename);

   req.body._id = new Date().getTime();

   req.body.pdtCatId = Number(req.body.pdtCatId);
   req.body.pdtPrice = Number(req.body.pdtPrice);
   req.body.pdtImgPath = "assets/pdt_images/"+req.file.filename;

   db.collection("products").save(req.body, (error, data)=>{

    if(error)
    {
        console.log(error);

        res.status(401).json("Error in Product insert query");
    }
    else {
        res.json("Product Added Successfully");

    }

   })

})

app.get("/listproductcat/:catid", (req, res)=>{

    console.log(req.params.catid);


    db.collection("products").find( {pdtCatId : Number(req.params.catid)} ).toArray((error, data)=>{

        if(error)
        {
            console.log(error);
            res.status(403).json("Error in Select query");
        }
        else {
            res.json(data);
        }
    })

})





app.get("/mycart", verifyUser, (req, res)=>{

    db.collection("cart").aggregate([
        { $match: { cartUserId : loggedUser._id } },
            { $lookup:
               {
                 from: 'products',
                 localField: 'cartPdtId',
                 foreignField: '_id',
                 as: 'orderdetails'
               }
             }
            ]).toArray(function(err, data) {
           
                res.json(data);
          }); 
});

app.post("/addtocart", verifyUser, (req, res)=>{

    req.body._id = new Date().getTime();
    req.body.cartUserId = loggedUser._id;
    req.body.cartPdtQty = 1;
    console.log(req.body);

    db.collection("cart").save(req.body, (error, data)=>{

        if(error)
        {
            console.log(error);
            res.status(403).json("Error in Insert query");
        }
        else {
            res.json("Product added in cart");
        }

    })

});

app.get("/getcartcount", (req, res)=>{

    db.collection("cart").count({cartUserId : loggedUser._id}, (error, data)=>{

        if(error)
        {
            console.log(error);
            res.status(403).json("Error in select query");
        }
        else {
            res.json(data);
        }

    })
});


app.post("/updatecart", (req, res)=>{

    console.log(req.body);

    var condition = { _id : req.body.CartId};

    var values = { $set : { cartPdtQty : req.body.CartQty, cartPdtPrice : req.body.CartPdtPrice*req.body.CartQty}};

    db.collection("cart").update(condition, values, (error, data)=>{

       // res.json(data);

       res.redirect("/mycart");


    })

   
});


app.get("/deletecart/:delId", (req, res)=>{

    console.log(req.params.delId);

    var condition = { _id : Number(req.params.delId)};

    db.collection("cart").deleteOne(condition, (error, data)=>{

        res.redirect("/mycart");

    })

   
})



module.exports = app;