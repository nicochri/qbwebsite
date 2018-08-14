var templates = {};

function displayTemplate(tmpl, selector, data) {
  if (templates[tmpl] === undefined) {
    jQuery.get("/mytemplates/" + tmpl + ".handlebars", function(resp) {
        templates[tmpl] = Handlebars.compile(resp);
        displayTemplate(tmpl, selector, data);
    });
    return;
  }

  var template = templates[tmpl];
  var html    = template(data);
  $(selector).html(html);
};