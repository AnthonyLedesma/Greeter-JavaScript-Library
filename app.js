var g = G$("John", "Doe");
console.log(g);

g.greet()
g.greet().greet(true);
g.greet().setLang('es').greet(true).log();

$('#login').click(function() {
    let loginGrtr = G$('Anthony', 'Ledesma');
    $('#logindiv').hide();
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

})
