'use strict';

var express = require('express');
var router = express.Router();
var Board = require('../engine/Board');

var field = new Board();

var playerResponses = [null, null];

router.post('/reset', function(req, res) {
    field = new Board();
    playerResponses = [null, null];
    res.send();
});

function checkPlayerResponse() {
    if (!playerResponses[0] || !playerResponses[1]) {
        return;
    }

    //Update board
    field.update();

    //Send board status
    playerResponses[0].send(JSON.stringify(field));
    playerResponses[1].send(JSON.stringify(field));

    playerResponses[0] = null;
    playerResponses[1] = null;
}

router.post('/:id/:player', function(req, res) {
    field.players[req.params.player].top = req.body.top;
    field.players[req.params.player].bot = req.body.bot;
    playerResponses[req.params.player] = res;

    checkPlayerResponse();
});

module.exports = router;
