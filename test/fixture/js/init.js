
var queries = eval('({' + window.location.search.match(/[\w]+=[\w.\-]+/g).join(',').replace(/([^?=,]+)=([^,]+)/g, '"$1": decodeURIComponent("$2")') + '})');

document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/' + queries.jquery + '/jquery.min.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + '../cov/jquery.pjax.js" charset="utf-8"><\/script>');
document.write('<script src="' + (window.__karma__ ? "/base/test/" : "") + '../fixture/js/' + queries.test +'" charset="utf-8"><\/script>');

function init() {
  $('a').each(function () { this.search = window.location.search; });
}