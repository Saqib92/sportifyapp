var exports = module.exports = {};
var express = require('express')
    , cors = require('cors')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;
var crypto = require("crypto");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('monk')('admin:1234@ds163699.mlab.com:63699/crafts');
var categories = [''];
var S = require('string');
var fs = require("fs");
var geolib=require("geolib");
var FB = require('fb');
var jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//app.use(cors());
// configure Express
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(session({

    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: (40 * 60 * 60 * 1000)}, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    req.db = db;
    next();
})

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});



var MyUser=null;
var myCat;
app.set('port', process.env.PORT || 8100);
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Find the user by username.  If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        console.log(username, password);
        MyUser=username;

        findByUsername(username, function (err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Unknown user ' + username});
            }
            var OldPassword = user.password.password
            console.log("This is an Old   " + OldPassword);
            var NewPassword = hash(password, user.password.salt);
            console.log("This is a New   " + NewPassword);
            if (OldPassword != NewPassword) {
                console.log("Error");
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
));
var i=1;
var pobj={};
app.use('/',express.static(__dirname + '/www'));
app.use('/www/', express.static(__dirname + '/www/'));
var array=[];

//Login system
app.post('/login', function(req,res){
    var collection = req.db.get('registerUsers');
    var email = req.body.email;
    var pass = req.body.password;    
    collection.findOne({email: email}, function (err, doc) {
        if (err) {
            // If it failed, return error
            console.log(err);
            res.json({"error": err});
            console.log("i am first error");
        }

        var password = hash(pass, doc.password.salt);
        
        if (password === doc.password.password) {
            var Token = jwt.sign(doc, 'saqib', {expiresIn: 300});
            console.log(Token);
            res.json({"token": Token, "success": true});
        } else {
            res.json({"success": false});
        }

    });
});


//Register system

app.post('/signup', function (req, res) {
    var collection = req.db.get("registerUsers");
    var mail = req.body.email;
    collection.findOne({email: mail}, function (e, docs2) {
        console.log("checking docs 2", docs2);
        if (docs2 != null) {
            var obj = ('Used');
            res.send(obj);
        }
        else {
            var id = req.body.name;

            collection.findOne({name: id}, function (e, docs3) {
                if (docs3) {
                    var obj = ('Used');
                    res.send(obj);
                }
                else {
                    console.log("pushing in the database!!!");
                    var saltPass = newSalt(16);
                    var pass = {password: hash(req.body.password, saltPass), salt: saltPass};
                    var obje = {name: req.body.name, email: req.body.email, password: pass};
                    collection.insert(obje, function (err, doc) {
                        if (err) {
                            // If it failed, return error
                            res.send("There was a problem adding the information to the database.");
                        }
                        else {
                            res.send(true);
                        }
                    });
                }
            });

        }
    });

    // Submit to the DB

});



function checkToken (req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        // varifying token and secret
        jwt.verify(token, 'saqib', function(err, decoded) {
            if(err){
                if (err.message === "jwt expired") {
                    return res.json({success:false, token: "Token expired"});
                }
                console.log("error 5000")
                return res.json({success: false, token: err});
            }

            if (req.body.token) {
                delete req.body.token;
            }
            req.decoded = req;
            next();
        });

        } else {
            return res.json({success: false, token: "Token not found"});
    }
}


/*app.post('/ProductItems',checkToken, function(req,res){
    var collection= req.db.get("ProductItems");
    console.log('abcd 3');

});*/

app.get('/logout', function (req, res) {
    req.session.destroy();
    req.session = null;
    req.logout();
    res.send(true);

});



app.post('/home', checkToken, function (req, res) {
    
    res.json({"token":true});

});




function findProduct(res, ind, collectionName) {
    var collect = db.get(collectionName);
    collect.findOne({_id: ind}, {}, function (e, docs) {

        
        console.log("Shop", docs);
        if (docs) {
            res.send(docs);
        }
        else {
            return null;
        }
         });
   

}


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

function sendData(res, obj) {
    //console.log("finally checking object",obj);
    res.send(obj);
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function newSalt(size) {

    return crypto.randomBytes(size).toString('hex');
}
function hash(password, salt) {
    var sha256 = crypto.createHash('sha256').update(salt + password).digest("hex");
    return sha256;
}
exports.GetUser=function(){
    return MatchUser;
}



