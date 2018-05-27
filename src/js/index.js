var pathSector1 = anime.path('path#path_sector1');
var pathSector2 = anime.path('path#path_sector2');
var pathSector3 = anime.path('path#path_sector3');

var easings = ['linear', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic'];

var motionPath1 = anime({
    targets: '.square',
    translateX: pathSector1('x'),
    translateY: pathSector1('y'),
    rotate: pathSector1('angle'),
    easing: function (el, i) {
        return easings[i];
    },
    duration: 5000,
    loop: true
});

var motionPath2 = anime({
    targets: '.square',
    translateX: pathSector2('x'),
    translateY: pathSector2('y'),
    rotate: pathSector2('angle'),
    easing: function (el, i) {
        return easings[i];
    },
    duration: 5000,
    loop: true
});

var motionPath3 = anime({
    targets: '.square',
    translateX: pathSector3('x'),
    translateY: pathSector3('y'),
    rotate: pathSector3('angle'),
    easing: function (el, i) {
        return easings[i];
    },
    duration: 5000,
    loop: true
});

function runAnimation(motionPath1, motionPath2, motionPath3 ) {
    return motionPath1, motionPath2, motionPath3;
}