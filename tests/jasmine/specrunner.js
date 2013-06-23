require.config({
    baseUrl: "../../",
    //urlArgs: 'cb=' + Math.random(),
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    },
    paths: {
        jquery: 'assets/libs/jquery/jquery-1.9.1.min',
        text: 'text',
        jasmine: 'tests/jasmine/lib/jasmine-1.3.1/jasmine',
        'jasmine-html': 'tests/jasmine/lib/jasmine-1.3.1/jasmine-html',
        spec: 'tests/jasmine/spec/'
    }
});

require(['jquery', 'jasmine-html'], function($, jasmine){

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/tests');

    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
});
