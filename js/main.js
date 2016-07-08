$(document).ready(function() {
    var $locationModule = $('.location_module');
    var $mainContent = $('.content_wrap');
    var $pizzaClose = $('.pizza_close');
    var $pizzaForm = $('.pizza_form');

    //init function to get json
    retriveData();
    locationModule();

    // grab data
    function retriveData() {
        var dataSource = 'js/chains.json';
        $.getJSON(dataSource, renderDataVisualsTemplate);
    }

    //location menu flyin: **uses css transfom for animation**
    function locationModule() {
        $('.hero_cta').on('click', function() {
            $mainContent.addClass('module_down');
            $locationModule.css('bottom', '0');
        });
        $('.module_close').on('click', function() {
            $mainContent.removeClass('module_down');
            $locationModule.css('bottom', '-100vh');
        });
    }

    // render compiled handlebars template
    function renderDataVisualsTemplate(data) {
        handlebarsDebugHelper();
        renderHandlebarsTemplate('js/handlebars/locations.hbs', '#cities', data);
        renderHandlebarsTemplate('js/handlebars/pizza.hbs', '#pizza', data);
    }

    // render handlebars templates via ajax
    function getTemplateAjax(path, callback) {
        var source, template;
        $.ajax({
            url: path,
            success: function(data) {
                source = data;
                template = Handlebars.compile(source);
                if (callback) callback(template);
            }
        }).promise().done(function() {
            //wait for json DOM load then preform:
            $('.city_check').on('click', function() {
                $locationModule.addClass('module_left');
                $pizzaForm.css('right', '0');
            });
            $('.pizza_close').on('click', function() {
                $locationModule.removeClass('module_left');
                $pizzaForm.css('right', '-60vw');
            });
            //hide and show .drop_contains
            $('#Chicago').on('click', function() {
                $('#chicago').fadeIn(100);
                $pizzaClose.on('click', function() {
                    $('#chicago').fadeOut(250);
                });
            });
            $('#New\\ York').on('click', function() {
                $('#newyork').fadeIn(100);
                $pizzaClose.on('click', function() {
                    $('#newyork').fadeOut(250);
                });
            });
            $('#San\\ Fransisco').on('click', function() {
                $('#sanfran').fadeIn(100);
                $pizzaClose.on('click', function() {
                    $('#sanfran').fadeOut(250);
                });
            });
            $('#Contact').on('click', function() {
                $('#contact').fadeIn(100);
                $pizzaClose.on('click', function() {
                    $('#contact').fadeOut(250);
                });
            });
            $('.title_contain').on('click', function() {
                $(this).next('.list_contain').slideToggle(300);
            });
        });
    }

    // function to compile handlebars template
    function renderHandlebarsTemplate(withTemplate, inElement, withData) {
        getTemplateAjax(withTemplate, function(template) {
            $(inElement).html(template(withData));
        });
    }

    // add handlebars debugger
    function handlebarsDebugHelper() {
        Handlebars.registerHelper("debug", function() {
            console.log("Current Context");
            console.log("====================");
            console.log(this);
        });
    }
});
