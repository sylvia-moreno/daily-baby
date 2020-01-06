const dailyCard = document.getElementsByClassName('daily-card')[0];

const isInViewport = (elem)  => {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

if(isInViewport(dailyCard)) {
    dailyCard.classList.add.apply('active');
}

console.log('index.js is running');