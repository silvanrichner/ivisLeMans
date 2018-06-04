$.getJSON("https://raw.githubusercontent.com/silvanrichner/ivisLeMans/master/src/data/data.json", callbackFuncWithData);

var data;
var selected = [];

function callbackFuncWithData(json)
{
  data = json;
  buildForm()
}

function buildForm(){
  //create a form
  var f = document.createElement("form");
  f.id = "form";
  //f.setAttribute('method',"post");
  //f.setAttribute('action',"submit.php");

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

  //create a button
  var s = document.createElement("input");
  s.type = "submit";
  s.value = "Submit";
  f.appendChild(s);

  // add the form inside the body
  $("body").append(f);

  //formatting
  $(".yearTitle").each(function() {
    $(this).css("margin-bottom", "12px");
    $(this).css("margin-top", "24px");
    $(this).css("font-weight", "bold");
  });

  //add Listener to form
  var form = $("#form")[0];
  if (form.attachEvent) {
      form.attachEvent("submit", processForm);
  } else {
      form.addEventListener("submit", processForm);
  }
}

function processForm(){
  $('#form input:checked').each(function() {
      var year_id = $(this).attr('id');
      var year = year_id.split("_")[0];
      var id = year_id.split("_")[1];

      var team = data[year][id];
      selected.push(team);
  });
}
