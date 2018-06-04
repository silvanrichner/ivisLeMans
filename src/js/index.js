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
  selected = [];

  $('#form input:checked').each(function() {
      var year_id = $(this).attr('id');
      var year = year_id.split("_")[0];
      var id = year_id.split("_")[1];

      var team = data[year][id];
      selected.push(team);
  });

  animate(selected);
}

function animate(teams){
  if(teams != []){
    //TODO generate a square for each team and start its animation
    //TODO generate description (with lap counter field) for each team

    //testing purposes
    animateLap(".square", 2015, 1, 0);
  }
}

function animateLap(targetId, year, id, lap){
  if(data[year][id]["laptimes"][lap]){
    var d1 = data[year][id]["laptimes"][lap]["s1"] / 100;
    var d2 = data[year][id]["laptimes"][lap]["s2"] / 100;
    var d3 = data[year][id]["laptimes"][lap]["s3"] / 100;
  //  var d4 = pitstop

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
        //TODO update a lap counter
        animateLap(targetId, year, id, lap + 1);
      }
      });
    }
}
