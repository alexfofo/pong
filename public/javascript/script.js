var playerAction = {
    top : false,
    bot : false
};

function sendInput(){
    $.ajax({
        type : "POST",
        url : "/field/1/playerOne",
        data : playerAction,
        success : onSuccess,
        dataType : 'json'
    });
}

function onSuccess(data){
    
}

$(document).ready(function() {
    setInterval(sendInput,50);

    $(document).keydown(function(e){
        if(e === 38){
            playerAction.top = true;
        }
        else if(e === 40){
            playerAction.bot = true;
        }
    });

    $(document).keyup(function(e){
        if(e === 38){
            playerAction.top = false;
        }
        else if(e === 40){
            playerAction.bot = false;
        }
    })
});

