

        var  options = [{
        question: "In Aladdin, what is the name of Jasmine's pet tiger?",
        choices: ["Rajah", "Bo", "Iago", "Jack"],
        images: ["assets/images/Rajah.gif"],
        correct: 0,
    }, {
        question: "In Peter Pan, Captain Hook had a hook on which part of his body?",
        choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
        images:["assets/images/captainhook.gif"],
        correct: 1,
       },
    {
        question: "In the Lion King, where does Mufasa and his family live?",
        choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
        images:["assets/images/desert.gif"],
        correct: 3,

    }, {
        question: "In Beauty and the Beast, how many eggs does Gaston eat for breakfast?",
        choices: ["2 Dozen", "5 Dozen", "5000", "0"],
        images:["assets/images/beautyandbeast.gif"],
        correct: 1

    }, {
        question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        choices: ["Dinah", "Sammie", "Kat", "Luna"],
        images:["assets/images/dinah.gif"],
        correct: 0,

    }, {
        question: "After being on earth, where did Hercules first meet his  father Zeus?",
        choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
        images:["assets/images/herclues.gif"],
        correct: 2

    }, {
        question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
        choices: ["Yellow", "Blue", "Gold", "White"],
        images:["assets/images/belle.gif"],
        correct: 2,

 }];
 var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var randomindex=0;
    var randompick=0;  
    var intervalId=0;
    var running = false;
    var qCount = options.length-1;
    var newArray = [];
    var holder = []; 
    var userGuess = 0;    
    var images = null;
    var timer = 30;
       
    function decrement() {

        timer--;
       $("#timer").html("<h1>Time remaining: 00:" + timer + " secs</h1>");
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;

            stop(intervalId);
            clearvariables();
            $("#correct").html("<h1>Time is up! The correct answer is: " + options[randomindex].choices[randompick.correct] + "<h1>");
            hidepicture();
        }	
    }; 



    function askQuestion()
    {   
        
       
        randomindex=Math.floor(Math.random()*options.length);
        console.log("RAndomIndex:----"+randomindex);
        randompick=options[randomindex]
        console.log("Random Pick:-----"+randompick);
        $("#question_div").empty();
         $("#question_div").html("<h3>"+randompick.question+"</h3>");
         console.log("Random::::"+randompick.question);
          var choicesArr = randompick.choices;
         for (var i = 0; i < choicesArr.length; i++) 
         {
         var button = $('<button>');
         button.text(choicesArr[i]);
         button.addClass("btn btn-primary");
         button.attr('data-id', i);
         $('#choices_div').append(button);
    
        }
    }
  
   function hidepicture () {
    userGuess="";
   $("#image").append("<img src=" + randompick.images + ">");
    newArray.push(randompick);
    options.splice(randomindex,1);
     var hidpic = setTimeout(function() {
       clearvariables();
        timer= 30;
        $("#timer").html("<h1>Time remaining: 00:" + timer + " secs</h1>");
        askQuestion();


 console.log("question length:"+qCount);
 console.log("wrongcount:"+wrongCount);
 console.log("correctcount:"+correctCount);
 console.log("unansweredcount:"+unanswerCount);
     //run the score screen if all questions answered
     if ((wrongCount + correctCount + unanswerCount) === qCount) {
        clearvariables();
       console.log("inisde the if and if");
       $("#timer").hide();
        $("#question_div").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#correct").append("<h4> Correct: " + correctCount + "</h4>" );
        $("#incorrect").append("<h4> Incorrect: " + wrongCount + "</h4>" );
        $("#Unanswered").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
         $(".reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;
       

       
    } else {
        runTimer();
        clearvariables()
        askQuestion();

    }
    }, 3000);


}
    
    
  
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    

  //timer stop
function stop(intervalId) {
	running = false;
	clearInterval(intervalId);
}
function clearvariables()
{
    $("#question_div").empty();
    $("#choices_div").empty();
    $("#correct").empty();
    $("#incorrect").empty();
    $("#Unanswered").empty();
    $("#image").empty();
    // $(".reset").empty();
}
$(document).ready(function(){
     $(".reset").hide();
   
    $(".start-button").on("click",function()
    {
       
         intervalId = setInterval(decrement, 1000);
         $("#timer").html("<h1>Time remaining: 00:" + timer + " secs</h1>");
        $(this).hide();
        askQuestion();
        for(var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    });
    $(".reset").on("click", function() {
        clearvariables();
        $(this).hide();
       for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
        }
        $("#timer").show();
        intervalId = setInterval(decrement, 1000);
        $("#timer").html("<h1>Time remaining: 00:" + timer + " secs</h1>");
       askQuestion();
   
   });
   $(document).on("click",".btn",function(){    
    userGuess=parseInt($(this).attr("data-id"));
    console.log(userGuess);
    if(userGuess===randompick.correct)
    {
        stop(intervalId);
        correctCount++;
        $("#choices_div").empty(" ");
        $("#correct").html("<h1>You are Correct! "+options[randomindex].choices[randompick.correct]+"</h1>");
        $("#choices_div").empty();
        
         hidepicture();

    }
    else {
        stop(intervalId);
        wrongCount++;
        userGuess="";
        $("#choices_div").empty(" ");
        $('#correct').empty();
        $("#incorrect").html("<h1>Wrong! The correct answer is: " +options[randomindex].choices[randompick.correct] + "<h1>");
       
        hidepicture();
    }

});
});
