
$(document).ready(function(){

	//Make all boxes the same height
	$('.resource').equalHeights();

	//Live filter
	$(".filter__input").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $(".resource").each(function(){
 
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
 
        // Update the count
        var numberItems = count;
        $(".filter__count").text("Number of Comments = "+count);
    });


    // SVG Fallback with modernizr
    if (!Modernizr.svg) {
         $(".resource__permalink img").attr("src", "/img/permalink.png");
    }

});
