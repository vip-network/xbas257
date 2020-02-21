const helps =  require('handlebars')

// fucion para colocar 2 condiciones en el if
helps.registerHelper("ifCond", function(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
return options.inverse(this);
});

// funcion para controllar un combo box 
helps.registerHelper("isSelected", function (Country, key) {
    return Country === key ? 'selected' : ''; 
});

// funcion para poder llamar un metodo en hbs
helps.registerHelper("addCart", function(fn) {
   
});

module.exports = helps;
