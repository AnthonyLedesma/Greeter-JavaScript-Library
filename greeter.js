//Greeter JS 
// Requirements:
// Name = GREETER
// When given a firstname, last name, and optional language, it generates formal and informal greetings.
// Support English and Spanish languages.
// Reusable library/framework
// Support jQuery
// Easy to type 'G$()' structure.

;(function(global, $) {
    // 'new' an object
    var Greeter = function(firstName, lastName, language) {
        return new Greeter.init(firstName, lastName, language);
    }
    // hidden within the scope of the IIFE and never directly accessible.
    var supportedLangs = ['en','es'];
    // Informal greetings
    var greetings = {
        en: "Hello",
        es: "Hola"
    };
    // Formal greetings
    var logMessages = {
        en: "Logged in",
        es: "Inicio Sesion"
    };
    // logger messages
    var formalGreetings = {
        en: "Greetings",
        es: "Saludos"
    };
    // prototype golds methods (to save memory space)
    Greeter.prototype = {
        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function() {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' whithin the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid Language";
            }
        },
        // Retriece  messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        formalGreeting: function() {
            return formalGreetings[this.language] + ' ' + this.fullName();
        },
        // Chainable methods return their own containing object
        greet: function(formal) {
            var msg;

            //if undefined or null it will be coerced to 'false'
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if(console) {
                console.log(msg);
            }
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            // Make chainable
            return this;
        },
        
        setLang: function(lang) {
            // Set the language
            this.language = lang;
            // Validate
            this.validate();
            // Make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }
            // Determine the message
            let msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            // Inject the message in the chosen place in the DOM
            $(selector).html(msg);
            // Make chainable
            return this;
        }

    };
    // The actual object is created here, allowing us to 'new' an object without calling 'new'

    Greeter.init = function(firstName, lastName, language) {

        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    }   
    // Trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greeter.init.prototype = Greeter.prototype;
    // Attach out greeter to the global object, and provide a shorthand '$G' for ease of our poor fingers
    global.Greeter = global.G$ = Greeter;

}(window, jQuery));