$.getJSON("https://raw.githubusercontent.com/silvanrichner/ivisLeMans/master/src/data/data.json", callbackFuncWithData);

function callbackFuncWithData(data)
{
  jQuery.each(data, function(i, val) {
    document.write("<br />" + i + "<br />");
    jQuery.each(this, function(j, val){
      document.write(this.name + "<br />");
    });
    //$('body').append(document.createTextNode(i));
  });
  //document.write(JSON.stringify(data["2017"]));
}
