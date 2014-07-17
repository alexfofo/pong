'use strict';

var playerAction = {
    top : false,
    bot : false
    },
    playerSelection;

var timeout, sendInput;

function onSuccess(data){
    var ball = $('#ball');
    var p1 = $('#player1');
    var p2 = $('#player2');
    var ballX = data.ball.position.x - data.ball.size.x / 2.0;
    var ballY =data.ball.position.y - data.ball.size.y / 2.0;
    ball.css('top',ballY );
    ball.css('left',ballX );
    p1.css('top', data.leftBar.position.y - data.leftBar.size.y / 2.0);
    p1.css('left', data.leftBar.position.x - data.leftBar.size.x / 2.0);
    p2.css('top', data.rightBar.position.y - data.rightBar.size.y / 2.0);
    p2.css('left', data.rightBar.position.x - data.rightBar.size.x / 2.0);
    timeout = setTimeout(sendInput,50);
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

    $('#p1').click(function(){
       playerSelection = 0;
        $('#playerSelection').hide();
        timeout = setTimeout(sendInput,50);
    });

    $('#p2').click(function(){
        playerSelection  = 1;
        $('#playerSelection').hide();
        timeout = setTimeout(sendInput,50);
    });

    /*
    $('#reset').click(function() {
        $.post('/field/reset');
        clearInterval(timeout);
        $('#playerSelection').show();
    });
    */
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

