
// Hide extra question by default
document.getElementById('more-than-one-child').style.display = 'none';

//Reveal extra question when Yes clicked

document.getElementById('yes-more-kids').onclick = function () {
	revealQuestion();
};

function revealQuestion() {
	document.getElementById('more-than-one-child').style.display = 'block';
}
