var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err)
        {
            return res.status(401).json({
                message: 'Not authenticated',
                error: {message: 'Invalid credentials'}
            });
        }
        next();
    });
});


router.post('/', function (req, res, next) {

    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err)
        {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        var message = new Message({
        content: req.body.content,
        user: user
    });
        message.save(function(err, result){
            if(err)
            {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    }); 
});

router.get('/', function(req, res, next){
    Message.find()
    .exec(function(err, message){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: message
        });
    });
});

module.exports = router;
