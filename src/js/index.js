//load the data from JSON
$.getJSON("https://raw.githubusercontent.com/silvanrichner/ivisLeMans/master/src/data/data.json", callbackFuncWithData);

//initialize variables
var data;

var pathPit = anime.path('path#path_pit');
var pathSector1 = anime.path('path#path_sector1');
var pathSector2 = anime.path('path#path_sector2');
var pathSector3 = anime.path('path#path_sector3');

var colors = ['red', 'blue', 'yellow', 'fuchsia', 'gray', 'black', 'maroon', 'olive', 'lime', 'green', 'aqua', 'teal', 'navy', 'purple'];

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
    var acc = document.createElement("button");
    acc.appendChild(document.createTextNode(i));
    acc.classList.add("accordion");
    var y = document.createElement("div");
    y.classList.add("panel");

    acc.addEventListener("click", function() {
        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });

    f.appendChild(acc);
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

      y.appendChild(d);
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
  var selected = [];

  $('#form input:checked').each(function() {
      selected.push($(this).attr('id'));
  });

  animate(selected);
}

function animate(teams){

  if(teams != []){
    for(var i=0; i<teams.length; i++){
      var year_id = teams[i];

      var year = year_id.split("_")[0];
      var id = year_id.split("_")[1];

      var box = document.createElement("div");
      box.id = 'team' + year_id;
      box.classList.add("square");
      box.style.background = colors[i % 14];
      box.style.zIndex = 100;
      document.getElementById("circuit").appendChild(box);

      var p = document.createElement("p");
      var b = document.createElement("span");
      b.classList.add("box");
      b.style.background = colors[i % 14];
      p.appendChild(b);
      p.appendChild(document.createTextNode(data[year][id]['name'] + ' (' + year + '): '));

      var lapCounter = document.createTextNode("0");
      p.appendChild(lapCounter);

      document.getElementById('teams').appendChild(p);

      animateLap("#" + box.id, year, id, 0, lapCounter);
    }
  }
}

function animateLap(targetId, year, id, lap, lapCounterElement){
  if(data[year][id]["laptimes"][lap]){
    var d1 = data[year][id]["laptimes"][lap]["s1"] / 100;
    var d2 = data[year][id]["laptimes"][lap]["s2"] / 100;
    var d3 = data[year][id]["laptimes"][lap]["s3"] / 100;
    var p = data[year][id]["laptimes"][lap]["pit"] / 100;

    var timeline = anime.timeline();

    timeline.add({
      targets: targetId,
      translateX: pathPit('x'),
      translateY: pathPit('y'),
      rotate: pathPit('angle'),
      easing: function (el, i) {
          return 'linear';
      },
      duration: function(el, i, l) { return p; },
      loop: false
    }).add({
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
        lapCounterElement.nodeValue = parseInt(lapCounterElement.nodeValue) + 1;

        animateLap(targetId, year, id, lap + 1, lapCounterElement);
      }
      });
    }
}
