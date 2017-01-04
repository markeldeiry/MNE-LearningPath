/**
 * Created by markeldeiry on 12/22/16.
 */
$(function () {

    var elements = $('button'),
        firstCard = false,
        secondCard = false,
        matchedCount = 0,
        counter = 0;

    $(elements).on('click', function() {
        $(this).removeClass('blank');
        counter++;
        if (counter === elements.length*2) {
            alert("You've made "+counter+" guesses on "+elements.length+" cards and still have not won. Refresh the page and keep trying to improve your memory!");
            $(elements).prop('disabled', true);
        }


        if (!firstCard) {
            firstCard = $(this);
            $(this).prop('disabled', true);
        } else if (!secondCard) {
            secondCard = $(this);
            $(this).prop('disabled', true);
        }

        if (firstCard !== false && secondCard !== false) {

            if ($(firstCard).text() === $(secondCard).text()) {
                //we have a match
                $(firstCard).addClass('matched');
                $(secondCard).addClass('matched');
                matchedCount +=2;
                firstCard = false;
                secondCard = false;

                if (matchedCount == elements.length) {
                    alert("YOU WIN IN "+counter+" MOVES!")
                }

            }else{
                //we do NOT have a match
                setTimeout(function(){
                    $(firstCard).addClass('blank').prop('disabled', false);
                    $(secondCard).addClass('blank').prop('disabled', false);
                    firstCard = false;
                    secondCard = false;
                },200);

            }
        }

    });

});