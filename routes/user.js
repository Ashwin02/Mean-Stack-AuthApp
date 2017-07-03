var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/signin',function (req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
        if(err)
        {
            return res.status(500).json({
                message: 'An error occured',
                error: err
            });
        }

        if(!user){
            return res.status(500).json({
                message: 'Invalid credentials',
                error: {message: 'Invalid credentials'}
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password))
        {
            return res.status(401).json({
                message: 'Invalid credentials',
                error: {message: 'Invalid credentials'}
            });
        }

        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });


    });
});

router.post('/', function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
            
    });

    user.save(function(err, result){
        if(err)
        {
            return res.status(500).json({
                message: 'An error occured',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Message',
            obj: result
        });
        
    });
});




module.exports = router;
