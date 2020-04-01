var trivia = {

    correct : 0,

    wrong : 0,

    questionIndex : 0,

    answer : null,

    questions : [
        {
            question : "Which of these is another name for dwarves?",
            answer : "Durin’s Folk",
            multipleChoice : ["Luthien’s Folk", "The Old Ones", "The Deep Ones", "Durin’s Folk"]
        },
        {
            question : "What is the name of Galadriel's husband?",
            answer : "Celeborn",
            multipleChoice : ["Celebrian", "Celebrimbor", "Celeborn", "Celebrant"]
        },
        {
            question : "After Sauron, who held the One Ring?",
            answer : "Isildur",
            multipleChoice : ["Elrond", "Isildur", "Gollum", "It fell into a river and was lost"]
        },
        {
            question : "Where is Legolas from?",
            answer : "Mirkwood",
            multipleChoice : ["Fangorn Forest", "Rivendell", "Lothlorian", "Mirkwood"]
        },
        {
            question : "What is the name of the Inn where Aragorn meets the Hobbits?",
            answer : "The Prancing Pony",
            multipleChoice : ["The Prancing Pony", "The Green Dragon", "The Ivy Bush", "The Golden Perch"]
        },
        {
            question : "What was Gollum's name before he was Gollum?",
            answer : "Smeagol",
            multipleChoice : ["Deagol", "Smeagol", "Falco", "Marcho"]
        },
        {
            question : "How many Rings of Power were there?",
            answer : "20",
            multipleChoice : ["5", "9", "13", "20"]
        },
        {
            question : "What is the name of Gandalf's horse?",
            answer : "Shadowfax",
            multipleChoice : ["Brego", "Shadowmane", "Shadowfax", "Hasufel"]
        },
        {
            question : "The only way to destroy the Ring of Power is to throw it into the fires of _________?",
            answer : "Mount Doom",
            multipleChoice : ["Mount Zion", "Mount Doom", "Mount Mordor", "Mount Moria"]
        },
        {
            question : "What is the name of the Ent who carries Pippin and Merry through Fangorn Forest?",
            answer : "Treebeard",
            multipleChoice : ["Greybranch", "Quickbeam", "Treebeard", "Skinbark"]
        }
    ],

    displayNext : function() {
        var currentQuestion = this.questions[this.questionIndex].question
        this.answer = this.questions[this.questionIndex].answer
        var multipleChoice = this.questions[this.questionIndex].multipleChoice
        $(".question-container").empty()
        var displayTimer = $("<div>").addClass("timer mt-2 mb-2").text("15")
        var displayQuestion = $("<div>").addClass("question pb-3").attr("questionIndex", this.questionIndex).text(currentQuestion)
        var displayChoices = $("<div>").addClass("multiple-choice pt-3 mt-2 mb-5")
        $(".question-container").append(displayTimer, displayQuestion, displayChoices)
        for(var i = 0; i < multipleChoice.length; i++) {
            var p = $("<p>")
            var choice = $("<button>")
                .addClass("choice btn btn-primary")
                .attr({"type":"button", "questionIndex": this.questionIndex})
                .text(multipleChoice[i])
            p.append(choice)
            $(".multiple-choice").append(p)
        }
        countDown.reset()
    },

    guess : function(click) {
        if(this.questionIndex === this.questions.length - 1) {
            countDown.stop()
        } else {
            countDown.start()
        }
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
                    $(".question-container").empty()
                    var results = $("<div>").addClass("results pb-2").text("Here are your results!")
                    var resultsCorrect =  $("<div>").addClass("result-data pt-5").text("Correct: "+trivia.correct)
                    var resultsWrong =  $("<div>").addClass("result-data pt-2").text("Wrong: "+trivia.wrong)
                    var restart = $("<button>").text("Play again").attr("type", "button").addClass("restart m-5 text-center btn btn-primary")
                    $(".question-container").append(results, resultsCorrect, resultsWrong, restart)
                }, 1000);
            } else {
                this.questionIndex++
                countDown.stop()
                setTimeout(function(){
                    trivia.displayNext()
                    countDown.start()
                }, 1000);
            }

        } else {
            this.wrong++
            $(".multiple-choice").empty().text("You are wrong! " + this.answer)
            if(this.questionIndex === this.questions.length - 1) {
                this.questionIndex = 0;
                countDown.stop()
                setTimeout(function(){
                    $(".question-container").empty()
                    var results = $("<div>").addClass("results pb-2").text("Here are your results!")
                    var resultsCorrect =  $("<div>").addClass("result-data pt-5").text("Correct: "+trivia.correct)
                    var resultsWrong =  $("<div>").addClass("result-data pt-2").text("Wrong: "+trivia.wrong)
                    var restart = $("<button>").text("Play again").attr("type", "button").addClass("restart m-5 text-center btn btn-primary")
                    $(".question-container").append(results, resultsCorrect, resultsWrong, restart)
                }, 1000);
            } else {
                this.questionIndex++
                countDown.stop()
                setTimeout(function(){
                    trivia.displayNext()
                    countDown.start()
                }, 1000);
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
                console.log(trivia.questionIndex)
                trivia.questionIndex = 0;
                countDown.stop()
                setTimeout(function(){
                    $(".question-container").empty()
                    var results = $("<div>").addClass("results pb-2").text("Here are your results!")
                    var resultsCorrect =  $("<div>").addClass("result-data pt-5").text("Correct: "+trivia.correct)
                    var resultsWrong =  $("<div>").addClass("result-data pt-2").text("Wrong: "+trivia.wrong)
                    var restart = $("<button>").text("Play again").attr("type", "button").addClass("restart m-5 text-center btn btn-primary")
                    $(".question-container").append(results, resultsCorrect, resultsWrong, restart)
                }, 1000);
            } else {
                trivia.questionIndex++
                countDown.reset()
                setTimeout(function(){
                    trivia.displayNext()
                    countDown.reset()
                }, 1000);
            }
        }
    }
}

// start button on click event
$(document).on( "click", ".start", function(){
    trivia.displayNext();
    countDown.start();
} );

$(document).on( "click", ".choice", function(){
    trivia.guess($(this));
} );

$(document).on( "click", ".restart", function(){
    trivia.correct = 0;
    trivia.wrong = 0;
    trivia.displayNext();
    countDown.start();
} );

