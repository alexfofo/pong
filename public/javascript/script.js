'use strict';

var playerAction = {
    top : false,
    bot : false
    };
var prevBallPosition = {
    x : 750,
    y : 375
};
var nextBallPosition = {
    x : 750,
    y : 375
};

var prevTime = (new Date()).getTime();
var nextTime = (new Date()).getTime() + 50;

var prevBarLeftPosition = {
    x : 50,
    y : 25
};
var nextBarLeftPosition = {
    x : 50,
    y : 25
};

var prevBarRightPosition = {
    x : 1420,
    y : 250
};
var nextBarRightPosition = {
    x : 1420,
    y : 250
};



var playerSelection;


var timeout, sendInput;

var ball;
var p1;
var p2;


function onSuccess(data){
    var scoreP1 = data.players[0].score;
    var scoreP2 = data.players[1].score;

    prevTime = (new Date()).getTime();
    nextTime = (new Date()).getTime() + 50;
    ball.css('top', prevBallPosition.y - data.ball.size.y / 2.0);
    ball.css('left', prevBallPosition.x - data.ball.size.x / 2.0);
    
    prevBallPosition.y = nextBallPosition.y;
    prevBallPosition.x = nextBallPosition.x;
    nextBallPosition.y = data.ball.position.y;
    nextBallPosition.x = data.ball.position.x;

    p1.css('top', data.leftBar.position.y - data.leftBar.size.y / 2.0);
    p1.css('left', data.leftBar.position.x - data.leftBar.size.x / 2.0);

    prevBarLeftPosition.y = nextBarLeftPosition.y;
    prevBarLeftPosition.x = nextBarLeftPosition.x;
    nextBarLeftPosition.y = data.leftBar.position.y;
    nextBarLeftPosition.x = data.leftBar.position.x;

    p2.css('top', data.rightBar.position.y - data.rightBar.size.y / 2.0);
    p2.css('left', data.rightBar.position.x - data.rightBar.size.x / 2.0);

    prevBarRightPosition.y = nextBarRightPosition.y;
    prevBarRightPosition.x = nextBarRightPosition.x;
    nextBarRightPosition.y = data.rightBar.position.y;
    nextBarRightPosition.x = data.rightBar.position.x;


    $('#scoreP1').html(scoreP1);
    $('#scoreP2').html(scoreP2);
    timeout = setTimeout(sendInput, 50);
}


function rafHandler(){
    var currentTime = new Date().getTime();

    var curBallPos = refreshPosition(prevTime, currentTime, nextTime, prevBallPosition, nextBallPosition);
    ball.css('top', curBallPos.y - 12.5);
    ball.css('left', curBallPos.x - 12.5);

    var curBarLeftPos = refreshPosition(prevTime, currentTime, nextTime, prevBarLeftPosition, nextBarLeftPosition);
    p1.css('top', curBarLeftPos.y - 50);
    p1.css('left', curBarLeftPos.x - 15);

    var curBarRightPos = refreshPosition(prevTime, currentTime, nextTime, prevBarRightPosition, nextBarRightPosition);
    p2.css('top', curBarRightPos.y - 50);
    p2.css('left', curBarRightPos.x - 15);

    requestAnimationFrame(rafHandler);
}

function refreshPosition(prevTime, currentTime, nextTime, prevPos, nextPos){
    var curPos = {
        x : 0,
        y : 0
    };

    var elapsedTime = currentTime - prevTime;
    var totalTime = nextTime - prevTime;
    var t = elapsedTime / totalTime;
    curPos.x = prevPos.x + (t * (nextPos.x - prevPos.x));
    curPos.y = prevPos.y + (t * (nextPos.y - prevPos.y));

    return curPos;
}


sendInput = function sendInput(){
    $.ajax({
        type : 'POST',
        url : '/field/0/'+playerSelection,
        data : JSON.stringify(playerAction),
        contentType: 'application/json; charset=utf-8',
        success : onSuccess,
        dataType : 'json'
    });
};





$(document).ready(function() {
    ball = $('#ball');
    p1 = $('#player1');
    p2 = $('#player2');

    $('#p1').click(function(){
        requestAnimationFrame(rafHandler);
       playerSelection = 0;
        $('#playerSelection').hide();
        timeout = setTimeout(sendInput, 0);
    });

    $('#p2').click(function(){
        requestAnimationFrame(rafHandler);
        playerSelection  = 1;
        $('#playerSelection').hide();
        timeout = setTimeout(sendInput, 0);
    });

    $('#reset').click(function() {
        $.post('/field/reset');
        clearInterval(timeout);
        $('#playerSelection').show();
    });

    $(document).keydown(function(e){
        if(e.keyCode === 38){
            playerAction.top = true;
        }
        else if(e.keyCode === 40){
            playerAction.bot = true;
        }
    });

    $(document).keyup(function(e){
        if(e.keyCode === 38){
            playerAction.top = false;
        }
        else if(e.keyCode === 40){
            playerAction.bot = false;
        }
    });
});

