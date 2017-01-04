/**
 * Created by markeldeiry on 1/4/17.
 */

// 1 - User enters rock, paper, or scissors three times
// 2 - computer randomly selects a choice three times
// 3 - User choice and computer choice are compared to each other for each turn
// 4 - IF U1=R, THEN IF C1=R, result is tie; ELSE IF C1=P, computer win counter increments by 1, ELSE IF C1=S, user win counter increments by 1.
// 5 - IF U1=P, THEN IF C1=P, result is tie; ELSE IF C1=S, computer win counter increments by 1, ELSE IF C1=R, user win counter increments by 1.
// 6 - IF U1=S, THEN IF C1=S, result is tie; ELSE IF C1=R, computer win counter increments by 1, ELSE IF C1=P, user win counter increments by 1.
// 7 - Compare choices for all 3 turns.
// 8 - IF C win counter >=2, prompt ("Computer wins!"), IF U win counter >=2, prompt ("You win!")
// 9 - IF neither counter >=2, prompt ("Rock, paper, scissors?")

var options = ['Rock', 'Paper', 'Scissors'];

var computerScore = 0,
    userScore = 0;

function compareAnswers(user, computer) {
    if (user === computer) {
        return 'tie';
    } else if (user === 'Rock') {
        if (computer === 'Paper') {
            return 'computer';
        } else if (computer === 'Scissors') {
            return 'user';
        }
    } else if (user === 'Paper') {
        if (computer === 'Scissors') {
            return 'computer';
        } else if (computer === 'Rock') {
            return 'user';
        }
    } else if (user === 'Scissors') {
        if (computer === 'Rock') {
            return 'computer';
        } else if (computer === 'Paper') {
            return 'user';
        }
    }
}

function takeTurn() {
    var answer = prompt("Rock, paper, scissors?");
    var randomSelection = options[Math.floor(Math.random()* options.length)];

    console.log(answer, randomSelection);

    var winner = compareAnswers(answer, randomSelection);

    if (winner === 'tie') {
        takeTurn();
    }

    return winner;
}


for (var i=0; i<3; i++) {
    var winner = takeTurn();

    if (winner === 'user') {
        userScore++;
        console.log(userScore, computerScore);
    } else if (winner === 'computer') {
        computerScore++;
        console.log(userScore, computerScore);
    }
}

if (computerScore>=2) {
    alert("Computer wins!");
} else if (userScore>=2) {
    alert("You win!");
}
