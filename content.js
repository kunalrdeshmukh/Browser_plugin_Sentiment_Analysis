// Listening for messages
let ratings = [];
let dates = [];
let comments = [];
let final_string_to_return = "";
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.text == 'get_graph') {
        var reviews = document.getElementsByClassName('a-expander-content a-expander-partial-collapse-content');
        //alert("Reviews is " + reviews);
        if (reviews === undefined) {
            reviews = document.getElementsByClassName('a-expander-collapsed-height a-row a-expander-container a-expander-partial-collapse-container');
        }
        var no_of_reviews = reviews.length;
        var all_reviews = document.getElementById('dp-summary-see-all-reviews'); // To fetch url of all reviews.
        var review_ratings = document.getElementsByClassName('review-rating');
        var review_dates = document.getElementsByClassName('review-date');
        var string_to_return = "Number of reviews on homepage: " + no_of_reviews + "\n------------ \n";

        for (var i = 0; i < review_dates.length; i++) {
            string_to_return = string_to_return + "Review " + (i + 1) + ": \n" + review_ratings[i].innerText + "\n" + "Posted on: " + review_dates[i].innerText + "\n \n" + reviews[i].innerText;
            string_to_return = string_to_return + "\n------------ \n";
        }
        //alert(string_to_return);

        for (var i=0; i<review_dates.length; i++) {
			let temp_review_string = (review_ratings[i].innerText.substring(0,5)).match(/\d+([.]\d+)?/g);
            ratings.push(temp_review_string);
			dates.push(review_dates[i].innerText);
			comments.push(reviews[i].innerText);
			final_string_to_return += review_dates[i].innerText + "$" + temp_review_string + "%";
        }
		
		for (var i = 0; i < dates.length; i++) {
            string_to_return = string_to_return + "Review " + (i + 1) + ": \n" + review_ratings[i].innerText + "\n" + "Posted on: " + review_dates[i].innerText + "\n \n" + reviews[i].innerText;
            string_to_return = string_to_return + "\n------------ \n";
        }
		
        sendResponse(final_string_to_return);
    }
	
	else if (msg.text === 'get_sentiment_score') {
		var reviews = document.getElementsByClassName('a-expander-content a-expander-partial-collapse-content');
        if (reviews === undefined) {
            reviews = document.getElementsByClassName('a-expander-collapsed-height a-row a-expander-container a-expander-partial-collapse-container');
        }
		var no_of_reviews = reviews.length;
		var string_to_return = "";
		for (var i=0; i<no_of_reviews; i++) {
			string_to_return+=reviews[i].innerText;
		}
		sendResponse(string_to_return);
	}

});
ratings = [];
dates = [];
comments = [];
