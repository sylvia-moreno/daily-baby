
console.log('app is running...')

const dailyCard = document.getElementsByClassName('daily-card')[0];

const isInViewport = (elem)  => {
    const bounding = elem.getBoundingClientRect();
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

Handlebars.registerHelper('index', function () {
    const endDay = moment(); 
    const startDay = moment('2020-01-01');
    const diffDay = endDay.diff(startDay, 'days');

    return diffDay.map(day => {
        return {
            day: moment().day,

        }
    });
})






