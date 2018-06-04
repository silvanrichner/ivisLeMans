//load the data from JSON
$.getJSON("https://raw.githubusercontent.com/silvanrichner/ivisLeMans/master/src/data/data.json", callbackFuncWithData);

//initialize variables
var data;
var selected = [];

var pathSector1 = anime.path('path#path_sector1');
var pathSector2 = anime.path('path#path_sector2');
var pathSector3 = anime.path('path#path_sector3');


function callbackFuncWithData(json)
{
  data = json;
  buildForm();
}

function buildForm(){
  //create a form
  var f = document.createElement("div");
  f.id = "form";

  //create a button
  var b = document.createElement("button");
  var t = document.createTextNode("Animation starten");
  b.appendChild(t)
  b.onclick = function(){
    processForm();
  }
  f.appendChild(b);

  jQuery.each(data, function(i, val) {
    //create year section
    var y = document.createElement("div");
    var t = document.createTextNode(i);
    y.classList.add("yearTitle");

    y.appendChild(t);
    f.appendChild(y);

    jQuery.each(this, function(j, val){
      var d = document.createElement("div");

      var c = document.createElement("input");
      c.type = "checkbox";
      c.id = i + "_" + j;
      c.name = this.name;
      d.appendChild(c);

      var n = document.createTextNode(this.name);
      d.appendChild(n);

      f.appendChild(d);
    });
  });

  // add the form inside the body
  $("#sidebar-left").append(f);

  //formatting
  $(".yearTitle").each(function() {
    $(this).css("margin-bottom", "12px");
    $(this).css("margin-top", "24px");
    $(this).css("font-weight", "bold");
  });
}

function processForm(){
  $('#form input:checked').each(function() {
      var year_id = $(this).attr('id');
      var year = year_id.split("_")[0];
      var id = year_id.split("_")[1];

      var team = data[year][id];
      selected.push(team);
  });

  animate(selected);
}
/*
var sectorTime1 = 1000;
var sectorTime2 = 2000;
var sectorTime3 = 3000;

var motionPath1 = anime({
    targets: '.square',
    translateX: pathSector1('x'),
    translateY: pathSector1('y'),
    rotate: pathSector1('angle'),
    easing: function (el, i) {
        return 'linear';
    },
    duration: sectorTime1,
    loop: true
});

var motionPath2 = anime({
    targets: '.square',
    translateX: pathSector2('x'),
    translateY: pathSector2('y'),
    rotate: pathSector2('angle'),
    easing: function (el, i) {
        return 'linear';
    },
    duration: sectorTime2,
    loop: true
});

var motionPath3 = anime({
    targets: '.square',
    translateX: pathSector3('x'),
    translateY: pathSector3('y'),
    rotate: pathSector3('angle'),
    easing: function (el, i) {
        return 'linear';
    },
    duration: sectorTime3,
    loop: true
});
*/
function animate(teams){

    animateLap(".square", 2015, 1, 0);
/*
    var motionPath1 = anime({
        targets: '.square',
        translateX: pathSector1('x'),
        translateY: pathSector1('y'),
        rotate: pathSector1('angle'),
        easing: function (el, i) {
            return 'linear';
        },
        duration: 2500,
        loop: true
    });

    var timeline = anime.timeline();

    timeline.add({
      targets: '.square',
      translateX: pathSector1('x'),
      translateY: pathSector1('y'),
      rotate: pathSector1('angle'),
      easing: function (el, i) {
          return 'linear';
      },
      duration: 2500,
      loop: false
    }).add({
      targets: '.square',
      translateX: pathSector2('x'),
      translateY: pathSector2('y'),
      rotate: pathSector2('angle'),
      easing: function (el, i) {
          return 'linear';
      },
      duration: 2500,
      loop: false
    }).add({
      targets: '.square',
      translateX: pathSector3('x'),
      translateY: pathSector3('y'),
      rotate: pathSector3('angle'),
      easing: function (el, i) {
          return 'linear';
      },
      duration: 2500,
      loop: false
      });

    jQuery.each(laps, function(i, val) {
        //sleep for pitstop
        //sleep(this.pitstop);

        timeline.add({
          targets: '.square',
          translateX: pathSector1('x'),
          translateY: pathSector1('y'),
          rotate: pathSector1('angle'),
          easing: function (el, i) {
              return 'linear';
          },
          duration: this.sectorTime1,
          loop: false
        }).add({
          targets: '.square',
          translateX: pathSector2('x'),
          translateY: pathSector2('y'),
          rotate: pathSector2('angle'),
          easing: function (el, i) {
              return 'linear';
          },
          duration: this.sectorTime2,
          loop: false
        }).add({
          targets: '.square',
          translateX: pathSector3('x'),
          translateY: pathSector3('y'),
          rotate: pathSector3('angle'),
          easing: function (el, i) {
              return 'linear';
          },
          duration: this.sectorTime3,
          loop: false
        });
    });
*/
}

function animateLap(targetId, year, id, lap){

  var d1 = data[year][id]["laptimes"][lap]["s1"] / 100;
  var d2 = data[year][id]["laptimes"][lap]["s2"] / 100;
  var d3 = data[year][id]["laptimes"][lap]["s3"] / 100;

  var timeline = anime.timeline();

  timeline.add({
    targets: targetId,
    translateX: pathSector1('x'),
    translateY: pathSector1('y'),
    rotate: pathSector1('angle'),
    easing: function (el, i) {
        return 'linear';
    },
    duration: function(el, i, l) { return d1; },
    loop: false
  }).add({
    targets: targetId,
    translateX: pathSector2('x'),
    translateY: pathSector2('y'),
    rotate: pathSector2('angle'),
    easing: function (el, i) {
        return 'linear';
    },
    duration: function(el, i, l) { return d2; },
    loop: false
  }).add({
    targets: targetId,
    translateX: pathSector3('x'),
    translateY: pathSector3('y'),
    rotate: pathSector3('angle'),
    easing: function (el, i) {
        return 'linear';
    },
    duration: function(el, i, l) { return d3; },
    loop: false,
    complete: function(anim) {
      animateLap(targetId, year, id, lap + 1);
    }
    });
}
