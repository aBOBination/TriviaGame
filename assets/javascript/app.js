var trivia = {

    // Variables
    correct : 0,

    wrong : 0,

    questionIndex : 0,

    answer : null,

    questions : [
        {
            question : "Whose mother did we never see played by an actress?",
            answer : "Beverly's",
            multipleChoice : ["Geordie's", "Beverly's", "Worf's", "Picard's"]
        },
        {
            question : "Worf hadn't always worn a gold uniform. What colour did he wear in the first season?",
            answer : "Red",
            multipleChoice : ["Red", "Blue", "No Uniform", "Black"]           
        },
        {
            question : "In what season did Riker first appear with his beard?",
            answer : "Second",
            multipleChoice : ["First", "Second", "Third", "Fourth"]
        }
    ],

    // Methods

    displayNext : function() {
        
        var currentQuestion = this.questions[this.questionIndex].question
        this.answer = this.questions[this.questionIndex].answer
        var multipleChoice = this.questions[this.questionIndex].multipleChoice
        $(".question-container").empty()
        var displayTimer = $("<div>").addClass("timer").text("15")
        var displayQuestion = $("<div>").addClass("question").attr("questionIndex", this.questionIndex).text(currentQuestion)
        var displayChoices = $("<div>").addClass("multiple-choice")
        $(".question-container").append(displayTimer, displayQuestion, displayChoices)
        for(var i = 0; i < multipleChoice.length; i++) {
            var choice = $("<button>")
                .addClass("choice btn btn-primary")
                .attr({"type":"button", "questionIndex": this.questionIndex})
                .text(multipleChoice[i])
            $(".multiple-choice").append(choice)
        }
        countDown.reset()
    },
    onClick : function() {
        $(".choice").on("click", function() {
            trivia.guess($(this))
        });
    },

    guess : function(click) {
        var guess = click.text()
        var clickIndex = click.attr("questionIndex");
        var answer = this.questions[clickIndex].answer
        if(guess === answer) {
            console.log(true)
            this.correct++
            $(".multiple-choice").empty().text("You are correct! " + this.answer)
            if(this.questionIndex === this.questions.length - 1) {
                this.questionIndex = 0;
                countDown.stop()
                setTimeout(function(){ 
                    alert("you are done.")
                    trivia.onClick()
                }, 2000);
            } else {
                this.questionIndex++
                countDown.stop()
                setTimeout(function(){ 
                    trivia.displayNext()
                    trivia.onClick()
                    countDown.start()
                }, 2000);
            }
            
        } else {
            this.wrong++
            $(".multiple-choice").empty().text("You are wrong! " + this.answer)
            if(this.questionIndex === this.questions.length - 1) {
                this.questionIndex = 0;
                countDown.stop()
                setTimeout(function(){ 
                    alert("you are done.")
                    trivia.onClick()
                }, 2000);
            } else {
                this.questionIndex++
                countDown.stop()
                setTimeout(function(){ 
                    trivia.displayNext()
                    trivia.onClick()
                    countDown.start()
                }, 2000);
            }
        }
    },

};

var countDown = {

    intervalId : null,

    clockRunning : false,

    time : 15,

    reset: function() {
        countDown.time = 15;
        $(".timer").text("15");
      },

    start: function() {
        if (!countDown.clockRunning) {
            countDown.intervalId = setInterval(countDown.count, 1000);
            countDown.clockRunning = true;
        }
    },

    stop: function() {
        clearInterval(this.intervalId);
        this.clockRunning = false;
    },
    
    count: function() {
        countDown.time--;
        console.log(countDown.time);
        $(".timer").text(countDown.time);
        if(countDown.time === 0) {
            trivia.wrong++
            $(".multiple-choice").empty().text("You ran out of time the answer was "+ "<br/>" + trivia.answer)
            if(trivia.questionIndex === trivia.questions.length - 1) {
                trivia.questionIndex = 0;
                countDown.stop()
                setTimeout(function(){ 
                    alert("you are done.")
                    trivia.onClick()
                }, 2000);
            } else {
                trivia.questionIndex++
                countDown.stop()
                setTimeout(function(){ 
                    trivia.displayNext()
                    trivia.onClick()
                    countDown.start()
                }, 2000);
            }            
        }
    }
}

// start button on click event
$(".start").on("click", function() {
    trivia.displayNext()
    trivia.onClick()
    countDown.start()
});
