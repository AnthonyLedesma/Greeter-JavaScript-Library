var g = G$("John", "Doe");
console.log(g);

g.greet()
g.greet().greet(true);
g.greet().setLang('es').greet(true);