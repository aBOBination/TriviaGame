var trivia = {

    // Variables
    correct : 0,

    wrong : 0,

    clockRunning : false,

    // intervalId : setInterval(count, 1000),

    time : 30,

    questionIndex : 0,

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
        var answer = this.questions[this.questionIndex].answer
        var multipleChoice = this.questions[this.questionIndex].multipleChoice
        // delete below when done
        console.log(currentQuestion)
        console.log(multipleChoice)
        console.log(answer)
        if(multipleChoice.includes(answer)) {
            console.log(true)
        } else {
            console.log(false)
        }
        console.log("------")
        // delete above when done
        // clear question-container
        $(".question-container").empty()
        // create divs for counter, question, answers
        var displayTimer = $("<div>").addClass("timer").text("30")
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
        // show next question in questions list
        // start countdown
        countDown.reset()
        // check count
        if(this.questionIndex === this.questions.length - 1) {
            this.questionIndex = 0;
        } else {
            this.questionIndex++
        }
    },
    onClick : function() {
        $(".choice").on("click", function() {
            trivia.guess($(this))
            // check if correct
            // if yes, show answer and next question
            // if no, show answer and next question
        });
    },

    guess : function(click) {
        var guess = click.text()
        var clickIndex = click.attr("questionIndex");
        var answer = this.questions[clickIndex].answer
        if(guess === answer) {
            console.log(true)
            this.correct++
            $(".multiple-choice").empty().text("You are correct!")
            countDown.stop()
            setTimeout(function(){ 
                trivia.displayNext()
                trivia.onClick()
                countDown.start()
             }, 3000);
        } else {
            this.wrong++
            $(".multiple-choice").empty().text("You are wrong!")
            countDown.stop()
            setTimeout(function(){ 
                trivia.displayNext()
                trivia.onClick()
                countDown.start()
             }, 3000);
            console.log(false)
        }
    },

};

var countDown = {

    intervalId : null,

    clockRunning : false,

    time : 5,

    reset: function() {
        countDown.time = 5;
        $(".timer").text("30");
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
            $(".multiple-choice").empty().text("You ran out of time")
            countDown.stop()
            setTimeout(function(){ 
                trivia.displayNext()
                trivia.onClick()
                countDown.start()
             }, 3000);
            
        }
    }
}

// start button on click event
$(".start").on("click", function() {
    trivia.displayNext()
    trivia.onClick()
    countDown.start()
});
