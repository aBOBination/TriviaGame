var trivia = {

    // Variables

    clockRunning : false,

    // intervalId : setInterval(count, 1000),

    time : 30,

    count : 0,

    questions : [
        {
            question : "What is the best color?",
            correct : "Green",
            multipleChoice : ["Red", "Yellow", "Orange"]
        },
        {
            question : "What is the best color?",
            correct : "Green",
            multipleChoice : ["Red", "Yellow", "Orange"]           
        },
        {
            question : "What is the best color?",
            correct : "Green",
            multipleChoice : ["Red", "Yellow", "Orange"]
        }
    ],

    // Methods

    displayNext : function() {
        // check count
        // clear question-container
        // create divs for counter, question, answers
        // show next question in questions list
        // start countdown
    },

    displayCounter : function() {
        // set time to 30
        // update time-- interval
        // if time === 0 then shows answer next question
    }
}

// start button on click event
$(".start").on("click", function() {
    // display next question
});

// quess on click event
$(".choice").on("click", function() {
    // check if correct
    // if yes, show answer and next question
    // if no, show answer and next question
});