---
layout: bootstrap
title: Guide
type: page
nav: nav
class: style-info
---

# Guide

## preload
preloadによる高速化実装例です。タッチデバイスでは動作できないため無効にしています。

<pre class="sh brush: html;">
&lt;script charset="utf-8" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"&gt;&lt;/script&gt;
&lt;script charset="utf-8" src="/js/jquery.preload.js"&gt;&lt;/script&gt;
&lt;script charset="utf-8" src="/js/jquery.pjax.js"&gt;&lt;/script&gt;
&lt;script charset="utf-8" src="/js/accelerate.js"&gt;&lt;/script&gt;
</pre>

preload: [https://github.com/falsandtru/jquery.preload.js](https://github.com/falsandtru/jquery.preload.js)  
pjax: [https://github.com/falsandtru/jquery.pjax.js](https://github.com/falsandtru/jquery.pjax.js)
accelerate:

<pre class="sh brush: js;">
// accelerate.js
  if (!/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent)) {
    $.preload({
      forward: $.pjax.follow,
      check: $.pjax.getCache,
      encode: true,
      ajax: {
        done: function ( data, textStatus, XMLHttpRequest ) {
          !$.pjax.getCache( this.url ) && $.pjax.setCache( this.url, null, textStatus, XMLHttpRequest );
        }
      }
    });
    
    $.pjax({
      area: 'body',
      load: { head: 'base, meta, link', css: true, script: true },
      cache: { click: true, submit: false, popstate: true },
      server: { query: null },
      speedcheck: true
    });
    
    $(document).bind('pjax.ready', function() {$(document).trigger('preload');});
  }
</pre>

## Google Analytics アクセス解析
ページに直接埋め込んで使用します。

###新 Google Analytics

<pre class="sh brush: js;">
  if (!window.ga) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
    window.ga('create', 'UA-xxxxxxxx-x', 'auto');
    window.ga('send', 'pageview');
  } else {
    window.ga('send', 'pageview', window.location.pathname+window.location.search);
  }
</pre>

###旧 Google Analytics

<pre class="sh brush: js;">
  if (!window._gaq) {
    window._gaq = [];
    window._gaq.push(['_setAccount', 'UA-xxxxxxxx-x']);
    window._gaq.push(['_trackPageview']);
    
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  } else {
    window._gaq.push(['_trackPageview']);
  }
</pre>

## ローディングエフェクト
ローディングエフェクトを表示します。

<a href="demo/effect/" target="_blank" class="btn btn-primary" role="button">demo</a>

<pre class="sh brush: js;">
  $.pjax({
    wait: 1000
  });
  $(document).bind('pjax.request', function () {
    $('div.loading').fadeIn(100);
  });
  $(document).bind('pjax.render', function(){
    $('div.loading').fadeOut(500);
  });
</pre>

<pre class="sh brush: html;">
  &lt;div class="loading" style="background:rgba(100%,100%,100%,.8);display:none;position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;"&gt;
    &lt;div style="position:absolute;top:45%;left: 50%;margin-top:-64px;margin-left:-64px;text-align:center;"&gt;
      &lt;img src="loading.gif" alt="" style="display:block;"&gt;
      &lt;span style="font-size:18px;font-weight:bold;position:absolute;white-space:nowrap;"&gt;now loading...&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
</pre>

ローディングエフェクトは頻繁に表示されると煩わしいため多用しないことを推奨します。
ページ移動時のローディングエフェクトの使用量を削減するには、ロードに1秒以上かかった場合のみ1秒経過した時点からローディングエフェクトを表示するなどの方法が考えられます。

<pre class="sh brush: js;">
  $.pjax({
    wait: 100
  });
  $(document).bind('pjax.request', function () {
      clearTimeout($.data($('div.loading').get(0), 'pjax-effect-id'));
      $.data($('div.loading').get(0), 'pjax-effect-id', setTimeout(function(){ $('div.loading').fadeIn(100); }, 1000));
  });
  $(document).bind('pjax.render', function(){
    clearTimeout($.data($('div.loading').get(0), 'pjax-effect-id'));
    $('div.loading').fadeOut(500);
    $.data($('div.loading').get(0), 'pjax-effect-id', 0);
  });
</pre>

## プログレスバー
プログレスバーを表示します。

<a href="demo/progress/" target="_blank" class="btn btn-primary" role="button">demo</a>

<pre class="sh brush: js;">
  $.pjax({
    area: 'div.pjax',
    callbacks: {
      before: function(){
        $('div.loading').children().width('');
        $('div.loading').fadeIn(0);
      },
      ajax: {
        xhr: function(){
          var xhr = jQuery.ajaxSettings.xhr();
          
          $('div.loading').children().width('5%');
          if ( xhr instanceof Object && 'onprogress' in xhr ) {
            xhr.addEventListener( 'progress', function ( event ) {
              var percentage = event.total ? event.loaded / event.total : 0.4;
              percentage = percentage * 90 + 5;
              $('div.loading').children().width( percentage + '%' );
            }, false );
            xhr.addEventListener( 'load', function ( event ) {
              $('div.loading').children().width('95%');
            }, false );
            xhr.addEventListener( 'error', function ( event ) {
              $('div.loading').children().css('background-color', '#00f');
            }, false );
          }
          return xhr;
        }
      },
      update: {
        content: {
          after: function(){
            $('div.loading').children().width('96.25%');
          }
        },
        css: {
          after: function(){
            $('div.loading').children().width('97.5%');
          }
        },
        script: {
          after: function(){
            $('div.loading').children().width('98.75%');
          }
        },
        render: {
          after: function(){
            $('div.loading').children().width('100%');
            $('div.loading').fadeOut(50);
          }
        }
      }
    },
    ajax: { timeout: 3000 },
    wait: 1000
  });
</pre>

<pre class="sh brush: html;">
  &lt;div class="loading" style="background:rgba(0,0,0,.2);display:none;position:fixed;bottom:0;left:0;z-index:9999;width:100%;height:5px;"&gt;
    &lt;div style="background:#f77;position:absolute;top:0;left:0;width:0;height:3px;"&gt;&lt;/div&gt;
  &lt;/div&gt;
</pre>

プリロードに対応する場合は以下のように設定します。

<pre class="sh brush: js;">
$.preload({
  forward: $.pjax.follow,
  check: $.pjax.getCache,
  encode: true,
  ajax: {
    xhr: function(){
      var xhr = jQuery.ajaxSettings.xhr();
      
      $('div.loading').children().width('5%');
      if ( xhr instanceof Object && 'onprogress' in xhr ) {
        xhr.addEventListener( 'progress', function ( event ) {
          var percentage = event.total ? event.loaded / event.total : 0.4;
          percentage = percentage * 90 + 5;
          $('div.loading').children().width( percentage + '%' );
        }, false );
        xhr.addEventListener( 'load', function ( event ) {
          $('div.loading').children().width('95%');
        }, false );
        xhr.addEventListener( 'error', function ( event ) {
          $('div.loading').children().css('background-color', '#00f');
        }, false );
      }
      return xhr;
    },
    success: function ( data, textStatus, XMLHttpRequest ) {
      !$.pjax.getCache( this.url ) && $.pjax.setCache( this.url, null, textStatus, XMLHttpRequest ) ;
    },
    done: function ( data, textStatus, XMLHttpRequest ) {
      !$.pjax.getCache( this.url ) && $.pjax.setCache( this.url, null, textStatus, XMLHttpRequest ) ;
    }
  }
});
</pre>

## Wordpressプラグインの競合の解消

### 競合により不具合が発生するWordpressプラグインへの対応
JavaScriptを使用しているWordpressプラグインで不具合が発生する場合があります。基本的にはpjaxのscope機能によりpjaxを使用するページの範囲を制限し競合するWordpressプラグインとpjaxの動作ページを分離する方法での解決を推奨しますが、JavaScriptの実行タイミングを調整することで競合を解消し共存させられる可能性もあります。不具合が発生する主な状況と対応は以下のとおりです。

### WordpressプラグインのJavaScriptの想定外のページでの使用
pjaxではJavaScriptの実行状態がページ移動後も維持されるため、ページ移動により変更されたDOMの差異からエラーが発生する可能性があります。ページ移動時に当該JavaScriptを終了ないし停止させ、適宜再開させることができれば回避が可能です。終了ないし停止ができない場合はあとはWordpressプラグインのJavaScriptの例外処理の問題であるためWordpressプラグインの修正以外による同一ページ内での共存は困難です。

### WordpressプラグインのJavaScriptを使用するページへの再アクセス
pjaxは移動先のページのJavaScriptが読み込み済みであり、コードが外部ファイルに記述されている場合はこれを読み込まず、同一ページに埋め込まれている場合は再度読み込み実行します。このため、併用するJavaScriptによっては正常に動作させるために適宜再実行により実行状態をリセットするか、または読み込ませずリセットさせない処理を追加する必要があります。
