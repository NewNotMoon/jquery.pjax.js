
suite("Event", function () {
  this.timeout(5000);

  test("request", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        var defer = self.$.Deferred();
        $(document).one('pjax.request', function () { setTimeout(defer.resolve, 0); });

        $('#primary ul a:eq(0)').click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("unload", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        var defer = self.$.Deferred();
        $(window).one('pjax.unload', function () { setTimeout(defer.resolve, 0); });

        $('#primary ul a:eq(0)').click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("DOMContentLoaded", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        var defer = self.$.Deferred();
        $(document).one('pjax.DOMContentLoaded', function () { setTimeout(defer.resolve, 0); });

        $('#primary ul a:eq(0)').click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("ready", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        var defer = self.$.Deferred();
        $(document).one('pjax.ready', function () { setTimeout(defer.resolve, 0); });

        $('#primary ul a:eq(0)').click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("render", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        var defer = self.$.Deferred();
        $(document).one('pjax.render', function () { setTimeout(defer.resolve, 0); });

        $('#primary ul a:eq(0)').click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

  test("load", function (done) {
    var query = '?jquery=' + env.jquery + '&test=fn.pjax.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        var defer = self.$.Deferred();
        $(window).one('pjax.load', function () { setTimeout(defer.resolve, 0); });

        $('#primary ul a:eq(0)').click();

        return defer;
      })
      .pipe(function () {
        done();
      });
    };
  });

});
