/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(11);

	module.exports = core;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {


	__webpack_require__(12);

/***/ },
/* 3 */
/***/ function(module, exports) {

	// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	function ajaxBeforeSend(xhr, settings) {
	  var context = settings.context
	  if (settings.beforeSend && settings.beforeSend.call(context, xhr, settings) === false)
	    return false
	}
	function ajaxSuccess(data, xhr, settings, deferred) {
	  var context = settings.context, status = 'success'
	  settings.success && settings.success.call(context, data, status, xhr)
	  if (deferred) deferred.resolveWith(context, [data, status, xhr])
	  ajaxComplete(status, xhr, settings)
	}
	// type: "timeout", "error", "abort", "parsererror"
	function ajaxError(error, type, xhr, settings, deferred) {
	  var context = settings.context
	  settings.error && settings.error.call(context, xhr, type, error)
	  if (deferred) deferred.rejectWith(context, [xhr, type, error])
	  ajaxComplete(type, xhr, settings)
	}
	// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	function ajaxComplete(status, xhr, settings) {
	  var context = settings.context
	  settings.complete && settings.complete.call(context, xhr, status)
	}

	module.exports = {
	  ajaxBeforeSend: ajaxBeforeSend,
	  ajaxSuccess: ajaxSuccess,
	  ajaxError: ajaxError
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = Yocto = __webpack_require__(1);

	__webpack_require__(2);

	Gesture = {
	    init: function(name){
	        var self = this,
	            gesture = self[name];

	        var bindEvent = function(element){
	            var $el = $(element);

	            if(!$el.data(name)){ //防止同一重复绑定函数

	              $el
	                .data(name, 1)
	                .forEach(function(el){
	                  el.addEventListener("touchstart", function(event){
	                      gesture.handler.touchstart(event);

	                      document.addEventListener("touchmove", move, false);

	                      document.addEventListener("touchend", end, false);

	                      document.addEventListener("touchcancel", cancel, false);

	                      // event.preventDefault();
	                  }, false);
	              });

	              function move(event){

	                  gesture.handler.touchmove(event);

	                  // event.preventDefault();
	              }

	              function end(event){

	                  gesture.handler.touchend(event);

	                  document.removeEventListener("touchmove", move, false);

	                  document.removeEventListener("touchend", end, false);

	                  document.removeEventListener("touchcancel", cancel, false);

	                  // event.preventDefault();
	              }

	              function cancel(event){

	                  gesture.handler.touchcancel(event);

	                  document.removeEventListener("touchmove", move, false);

	                  document.removeEventListener("touchend", end, false);

	                  document.removeEventListener("touchcancel", cancel, false);

	                  // event.preventDefault();
	              }
	            }
	        };

	        gesture.events.forEach(function(eventName){
	            self.list[eventName] = bindEvent;

	            $.fn[eventName] = function(callback) {
	                return this.on(eventName, callback);
	            };
	        });
	    },
	    list: {}
	  };

	$.gestures = Gesture;

	module.exports = $;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(13);
	var pageflickTpl = __webpack_require__(17);
	__webpack_require__(19);
	function Pageflick(option){
		this.init(option);
	}

	Pageflick.prototype = {
		get: function(key){
			return this.attrs[key];
		},
		set: function(key,value){
			this.attrs[key] = value;
		},
		//初始化  merge options
		init: function(option){
			var self = this;
			self.attrs = {
				trigger: '',
				pages: [],
				currPage: 0,
				flickType: 'slide',
				duration: 200,
				root: false,
				afterFlick: function(){
				}
			}
			//merge
			if(option && typeof option == 'object'){
			    $.extend(self.attrs, option);
			}
			self._init();
		},
		//初始化，判断异常情况
		_init: function(){
			var self = this;
			var render = self.get('trigger');
			var target = $(render);
			var uid = 'pageflick' + Math.random();
			if(!render || target.length == 0){
				throw '请指定渲染的dom';
			}
			//缓存执行组件的dom
			target.attr('uid',uid);
			self.set('uid',uid)
			self.set('target',target);
		},
		//加载
		render: function(){
			var self = this;
			var target = self.get('target');
			self.loadDom();
			self.touchEvents();
		},
		//加载dom
		loadDom: function(){
			var self = this;
			var target = self.get('target');
			var html = pageflickTpl(self.attrs);
			target.html(html);
			var cssDuration = self.get('duration');
			//设置css属性

		},
		//根据索引获取page的dom元素
		getDom: function(index){
			var self = this;
			var target = self.get('target');
			return $('.page' + index, target);
		},
		// 绑定touch事件
		touchEvents: function(){
			var self = this;
			var target = self.get('target');
			var flickType = self.get('flickType') || 'slide';

			//最大步数
			var maxStep = self.get('pages').length - 1;

			//动画时长
			var duration = self.get('duration');
			//缓存手指位置,流向
			var pageY,currY,action;
			target.on('touchstart',function(ev){
				var currPage = self.get('currPage');
				var touchStart = self.get('touchStart');
				var inAnimation = self.get('inAnimation');
				if(inAnimation){
					return;
				}
				if(touchStart){
					return;
				}
				action = null;
				self.set('touchStart',true);
				var currDom = self.getDom(currPage);
				currDom.removeClass('animate');
				pageY = ev.touches[0].pageY;
			});

			target.on('touchmove',function(ev){
				var touchStart = self.get('touchStart');
				var inAnimation = self.get('inAnimation');
				var currPage = self.get('currPage');
				var domHeight = target.height();
				if(inAnimation || !touchStart){
					return;
				}
				fAnimate = true;
				var currDom = self.getDom(currPage);
				var nextDom = self.getDom(currPage + 1);
				var prevDom = self.getDom(currPage - 1);

				currY = ev.touches[0].pageY;
				if(currY <= 10){
					if(action == 'down'){
						var translate = 'translate(0,'+ (-domHeight) +'px)';
						if(prevDom.length > 0 ){
							prevDom.css({
								'-webkit-transform': translate,
								'transform': translate
							});
						}
					}
					self.touchend();
					return;
				}
				//上滑
				if(action == 'up'){
					if(currY < pageY){
						goUp();
					}else{
						if(flickType == 'slide'){
							var translate = 'translate(0,'+ domHeight +'px)';
							if(nextDom.length > 0 ){
								nextDom.css({
									'-webkit-transform': translate,
									'transform': translate
								});
							}
						}
					}
				}else if(action == 'down'){
					if(currY < pageY){
						if(flickType == 'slide'){
							var translate = 'translate(0,'+ (-domHeight) +'px)';
							if(prevDom.length > 1 ){
								prevDom.css({
									'-webkit-transform': translate,
									'transform': translate
								});
							}
						}
					}else{
						goDown();
					}
				}else{
					if(currY < pageY){
						action = 'up';

						goUp();
					}else{
						action = 'down';

						goDown(true);
					}
					self.set('action',action);
				}
				function goUp(){
					if(currPage >= maxStep || flickType != 'slide'){
						return;
					}
					nextDom.addClass('show');
					nextDom.removeClass('animate');
					var translate = 'translate(0,'+ Math.max(0,domHeight - (pageY - currY)) +'px)';
					if(nextDom.length > 0){
						nextDom.css({
							'-webkit-transform': translate,
							'transform': translate
						});
					}
				}

				function goDown(first){
					//第一屏
					if(currPage == 0 || flickType != 'slide'){

					}else{
						prevDom.addClass('show');
						if(currPage <= 0){
							return;
						}
						if(first){
							prevDom.addClass('front');
						}
						prevDom.removeClass('animate');
						var translate = 'translate(0,'+ Math.min(0, (currY - pageY) - domHeight) +'px)';
						if(prevDom.length > 0){
							prevDom.css({
								'-webkit-transform': translate,
								'transform': translate
							});
						}
					}
				}
			});
			target.on('touchend touchcancel',function(ev){
				self.touchend(action,pageY,currY);
			});
		},
		// 绑定touchend
		touchend: function(action,pageY,currY){
			var self = this;
			//最大步数
			var maxStep = self.get('pages').length - 1;
			var currPage = self.get('currPage');
			var inAnimation = self.get('inAnimation');
			var touchStart = self.get('touchStart');
			var flickType = self.get('flickType') || 'slide';
			var cssDuration = self.get('duration');
			var effectY = self.get('effectY') || 10;
			if(inAnimation || !touchStart){
				return;
			}
			self.set('inAnimation',true);
			self.set('touchStart',null);

			var currDom = self.getDom(currPage);
			var nextDom = self.getDom(currPage + 1);
			var prevDom = self.getDom(currPage - 1);
			//上滑
			if(currY <= pageY && action == 'up'){
				if(currPage >= maxStep){
					self.afterSlide(currPage);
				}else if(flickType == 'fade'){
					currDom.addClass('up-out');
					nextDom.addClass('up-in-before show');
					setTimeout(function(){
						nextDom.addClass('up-in-run');
						setTimeout(function(){
							nextDom.removeClass('up-in-run up-in-before');
							currDom.removeClass('up-out show');
							currPage ++;
							self.afterSlide(currPage,currPage - 1);
						},cssDuration);
					},50);
				}else{
					nextDom.addClass('animate');
					if(pageY - currY > effectY){
						var translate = 'translate(0,0)';
						nextDom.css({
							'-webkit-transform': translate,
							'transform': translate
						});
						setTimeout(function(){
							currDom.removeClass('show');
							currPage ++ ;
							self.afterSlide(currPage,currPage - 1);
						},cssDuration);

					}else{
						var translate = 'translate(0,100%)';
						nextDom.css({
							'-webkit-transform': translate,
							'transform': translate
						});
						setTimeout(function(){
							nextDom.removeClass('show');
							self.afterSlide(currPage);
						},cssDuration);
					}
				}
			//下拉
			}else if(pageY <= currY && action == 'down'){
				if(currPage == 0){
					self.afterSlide(currPage);
				}
				//渐隐
				else if(flickType == 'fade'){
					currDom.addClass('down-in');
					prevDom.addClass('show down-out-before');
					setTimeout(function(){
						prevDom.addClass('down-out-run');
						setTimeout(function(){
							prevDom.removeClass('actived down-out-before down-out-run');
							currDom.removeClass('down-in show');
							setTimeout(function(){
								currPage --;
								self.afterSlide(currPage,currPage + 1);
							},30);
						},cssDuration);
					},50);
				}else{
					prevDom.addClass('animate');
					if(currY - pageY > effectY){
						var translate = 'translate(0,0)';
						prevDom.css({
							'-webkit-transform': translate,
							'transform': translate
						});
						setTimeout(function(){
							prevDom.removeClass('front');
							currDom.removeClass('show');
							currPage --;
							self.afterSlide(currPage,currPage + 1);
						}, cssDuration);
					}else{
						var translate = 'translate(0,-100%)';
						prevDom.css({
							'-webkit-transform': translate,
							'transform': translate
						});
						setTimeout(function(){
							prevDom.removeClass('show front');
							self.afterSlide(currPage);
						},cssDuration);
					}
				}
			}else if(currY <= pageY && action == 'down'){
				self.afterSlide(currPage);
			}else if(pageY <= currY && action == 'up'){
				self.afterSlide(currPage);
			}else{
				self.afterSlide(currPage);
			}
		},
		//清场
		afterSlide: function(currPage,prevPage){
			var self = this;
			var root = self.get('root');
			self.set('touchStart',false);
			self.set('currPage',currPage);
			if(!root){
				self.animateDone();
			}
			var afterFlick = self.get('afterFlick');
			var pages = self.get('pages');

			var dom = self.getDom(currPage);
			dom.addClass('show');
			dom.css({'-webkit-transform': 'translate(0,0)','transform':'translate(0,0)'});
			for(var i = 0;i < pages.length; i ++){
				if(currPage != i){
					var currDom = self.getDom(i);
					currDom.removeClass('show');
				}
			}
			//执行了切页
			if(prevPage !== undefined){
				if(pages[prevPage].afterFlick){
					pages[prevPage].afterFlick(currPage,self.getDom(currPage),prevPage,self.getDom(prevPage));
				}else{
					afterFlick && afterFlick(currPage,self.getDom(currPage),prevPage,self.getDom(prevPage));
				}
			}
		},
		animateDone: function(){
			var self = this;
			self.set('inAnimation',false);
		}
	}

	module.exports = Pageflick;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1),
	    util = __webpack_require__(3);

	__webpack_require__(2);

	__webpack_require__(9);

	__webpack_require__(10);

	module.exports = $;



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1),
	    util = __webpack_require__(3);

	__webpack_require__(2);

	var jsonpID = 0,
	    document = window.document,
	    ajaxBeforeSend = util.ajaxBeforeSend,
	    ajaxSuccess = util.ajaxSuccess,
	    ajaxError = util.ajaxError;

	$.ajaxJSONP = function(options, deferred){
	  if (!('type' in options)) return $.ajax && $.ajax(options);

	  var _callbackName = options.jsonpCallback,
	    callbackName = ($.isFunction(_callbackName) ?
	      _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
	    script = document.createElement('script'),
	    originalCallback = window[callbackName],
	    responseData,
	    abort = function(errorType) {
	      $(script).triggerHandler('error', errorType || 'abort')
	    },
	    xhr = { abort: abort }, abortTimeout

	  if (deferred) deferred.promise(xhr)

	  $(script).on('load error', function(e, errorType){
	    clearTimeout(abortTimeout)
	    $(script).off().remove()

	    if (e.type == 'error' || !responseData) {
	      ajaxError(null, errorType || 'error', xhr, options, deferred)
	    } else {
	      ajaxSuccess(responseData[0], xhr, options, deferred)
	    }

	    window[callbackName] = originalCallback
	    if (responseData && $.isFunction(originalCallback))
	      originalCallback(responseData[0])

	    originalCallback = responseData = undefined
	  })

	  if (ajaxBeforeSend(xhr, options) === false) {
	    abort('abort')
	    return xhr
	  }

	  window[callbackName] = function(){
	    responseData = arguments
	  }

	  script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
	  document.head.appendChild(script)

	  if (options.timeout > 0) abortTimeout = setTimeout(function(){
	    abort('timeout')
	  }, options.timeout)

	  return xhr
	}

	module.exports = $;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1),
	    util = __webpack_require__(3);

	__webpack_require__(2);

	var key,
	    name,
	    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	    scriptTypeRE = /^(?:text|application)\/javascript/i,
	    xmlTypeRE = /^(?:text|application)\/xml/i,
	    jsonType = 'application/json',
	    htmlType = 'text/html',
	    blankRE = /^\s*$/,
	    ajaxBeforeSend = util.ajaxBeforeSend,
	    ajaxSuccess = util.ajaxSuccess,
	    ajaxError = util.ajaxError

	function empty() {}

	$.ajaxSettings = {
	  // Default type of request
	  type: 'GET',
	  // Callback that is executed before request
	  beforeSend: empty,
	  // Callback that is executed if the request succeeds
	  success: empty,
	  // Callback that is executed the the server drops error
	  error: empty,
	  // Callback that is executed on request complete (both: error and success)
	  complete: empty,
	  // The context for the callbacks
	  context: null,
	  // Whether to trigger "global" Ajax events
	  global: true,
	  // Transport
	  xhr: function () {
	    return new window.XMLHttpRequest()
	  },
	  // MIME types mapping
	  // IIS returns Javascript as "application/x-javascript"
	  accepts: {
	    script: 'text/javascript, application/javascript, application/x-javascript',
	    json:   jsonType,
	    xml:    'application/xml, text/xml',
	    html:   htmlType,
	    text:   'text/plain'
	  },
	  // Whether the request is to another domain
	  crossDomain: false,
	  // Default timeout
	  timeout: 0,
	  // Whether data should be serialized to string
	  processData: true,
	  // Whether the browser should be allowed to cache GET responses
	  cache: true
	}

	function mimeToDataType(mime) {
	  if (mime) mime = mime.split(';', 2)[0]
	  return mime && ( mime == htmlType ? 'html' :
	    mime == jsonType ? 'json' :
	    scriptTypeRE.test(mime) ? 'script' :
	    xmlTypeRE.test(mime) && 'xml' ) || 'text'
	}

	function appendQuery(url, query) {
	  if (query == '') return url
	  return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	}

	// serialize payload and append it to the URL for GET requests
	function serializeData(options) {
	  if (options.processData && options.data && $.type(options.data) != "string")
	    options.data = $.param(options.data, options.traditional)
	  if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	    options.url = appendQuery(options.url, options.data), options.data = undefined
	}

	$.ajax = function(options){
	  var settings = $.extend({}, options || {}),
	      deferred = $.Deferred && $.Deferred()
	  for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

	  if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
	    RegExp.$2 != window.location.host

	  if (!settings.url) settings.url = window.location.toString()
	  serializeData(settings)
	  if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

	  var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
	  if (dataType == 'jsonp' || hasPlaceholder) {
	    if (!hasPlaceholder)
	      settings.url = appendQuery(settings.url,
	        settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
	    return $.ajaxJSONP(settings, deferred)
	  }

	  var mime = settings.accepts[dataType],
	      headers = { },
	      setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
	      protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	      xhr = settings.xhr(),
	      nativeSetHeader = xhr.setRequestHeader,
	      abortTimeout

	  if (deferred) deferred.promise(xhr)

	  if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	  setHeader('Accept', mime || '*/*')
	  if (mime) {
	    if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
	    xhr.overrideMimeType && xhr.overrideMimeType(mime)
	  }
	  if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
	    setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

	  if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
	  xhr.setRequestHeader = setHeader

	  var async = 'async' in settings ? settings.async : true
	  xhr.open(settings.type, settings.url, async)

	  xhr.onreadystatechange = function(){
	    if (xhr.readyState == 4) {
	      xhr.onreadystatechange = empty
	      clearTimeout(abortTimeout)
	      var result, error = false
	      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
	        dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
	        result = xhr.responseText

	        try {
	          // http://perfectionkills.com/global-eval-what-are-the-options/
	          if (dataType == 'script')    (1,eval)(result)
	          else if (dataType == 'xml')  result = xhr.responseXML
	          else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
	        } catch (e) { error = e }

	        if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
	        else ajaxSuccess(result, xhr, settings, deferred)
	      } else {
	        ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
	      }
	    }
	  }

	  if (ajaxBeforeSend(xhr, settings) === false) {
	    xhr.abort()
	    ajaxError(null, 'abort', xhr, settings, deferred)
	    return xhr
	  }

	  for (name in headers) nativeSetHeader.apply(xhr, headers[name])

	  // if (settings.timeout > 0) abortTimeout = setTimeout(function(){
	  //     xhr.onreadystatechange = empty
	  //     xhr.abort()
	  //     ajaxError(null, 'timeout', xhr, settings, deferred)
	  //   }, settings.timeout)

	  // 使用原生timeout属性
	  if(settings.timeout > 0){
	    xhr.timeout = settings.timeout
	    xhr.ontimeout = function(){
	      xhr.onreadystatechange = empty
	      xhr.abort()
	      ajaxError(null, 'timeout', xhr, settings, deferred)
	    }
	  }

	  // avoid sending empty string (#319)
	  xhr.send(settings.data ? settings.data : null)
	  return xhr
	}

	// handle optional data/success arguments
	function parseArguments(url, data, success, dataType) {
	  if ($.isFunction(data)) dataType = success, success = data, data = undefined
	  if (!$.isFunction(success)) dataType = success, success = undefined
	  return {
	    url: url
	  , data: data
	  , success: success
	  , dataType: dataType
	  }
	}

	$.get = function(/* url, data, success, dataType */){
	  return $.ajax(parseArguments.apply(null, arguments))
	}

	$.post = function(/* url, data, success, dataType */){
	  var options = parseArguments.apply(null, arguments)
	  options.type = 'POST'
	  return $.ajax(options)
	}

	$.getJSON = function(/* url, data, success */){
	  var options = parseArguments.apply(null, arguments)
	  options.dataType = 'json'
	  return $.ajax(options)
	}

	$.fn.load = function(url, data, success){
	  if (!this.length) return this
	  var self = this, parts = url.split(/\s/), selector,
	      options = parseArguments(url, data, success),
	      callback = options.success
	  if (parts.length > 1) options.url = parts[0], selector = parts[1]
	  options.success = function(response){
	    self.html(selector ?
	      $('<div>').html(response.replace(rscript, "")).find(selector)
	      : response)
	    callback && callback.apply(self, arguments)
	  }
	  $.ajax(options)
	  return this
	}

	var escape = encodeURIComponent

	function serialize(params, obj, traditional, scope){
	  var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
	  $.each(obj, function(key, value) {
	    type = $.type(value)
	    if (scope) key = traditional ? scope :
	      scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	    // handle data in serializeArray() format
	    if (!scope && array) params.add(value.name, value.value)
	    // recurse into nested objects
	    else if (type == "array" || (!traditional && type == "object"))
	      serialize(params, value, traditional, key)
	    else params.add(key, value)
	  })
	}

	$.param = function(obj, traditional){
	  var params = []
	  params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
	  serialize(params, obj, traditional)
	  return params.join('&').replace(/%20/g, '+')
	}

	module.exports = $;


/***/ },
/* 11 */
/***/ function(module, exports) {

	var Yocto = (function () {
	  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
	    // [Opt:C] 增加win变量缓存window
	    win = window,
	    document = win.document,
	    elementDisplay = {}, classCache = {},
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    rootNodeRE = /^(?:body|html)$/i,

	    class2type = {},
	    toString = class2type.toString,
	    zepto = yocto = {},
	    camelize, uniq,
	    //[Opt:B][V1.0+] 由于已经删除prop方法，因此原propMap变量一并删除

	    //[Opt:C] 去掉isArray旧方法的兼容
	    isArray = Array.isArray

	  zepto.matches = function (element, selector) {
	    // [Opt:C] 将原本在父级作用域的变量转移至局部变量
	    var tempParent = document.createElement('div')

	    if (!selector || !element || element.nodeType !== 1) return false
	    // [Opt:C] 去除对moz o 的支持，一般情况下，是不会遇到以上的浏览器，不针对moz和o做专门的优化
	    var matchesSelector = element.webkitMatchesSelector || element.matchesSelector;
	    if (matchesSelector) return matchesSelector.call(element, selector);
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }

	  //opt by 完颜
	  //Get string type of an object.
	  //Possible types are:
	  //null undefined boolean number string function array date regexp object error.
	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }

	  function isFunction(value) {
	    return type(value) == "function"
	  }

	  function isWindow(obj) {
	    return obj != null && obj == obj.window
	  }

	  function isDocument(obj) {
	    return obj != null && obj.nodeType == obj.DOCUMENT_NODE
	  }

	  function isObject(obj) {
	    return type(obj) == "object"
	  }

	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }

	  function likeArray(obj) {
	    return typeof obj.length == 'number'
	  }

	  function compact(array) {
	    return filter.call(array, function (item) {
	      return item != null
	    })
	  }

	  function flatten(array) {
	    return array.length > 0 ? $.fn.concat.apply([], array) : array
	  }

	  //将中划线连接符转化为驼峰字符串
	  camelize = function (str) {
	    return str.replace(/-+(.)?/g, function (match, chr) {
	      return chr ? chr.toUpperCase() : ''
	    })
	  }

	  uniq = function (array) {
	    return filter.call(array, function (item, idx) {
	      return array.indexOf(item) == idx
	    })
	  }

	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }

	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function (node) {
	        if (node.nodeType == 1) return node
	      })
	  }

	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function (html, name) {
	    // [Opt:C] 将原本在父级作用域的变量转移至局部变量
	    var table = document.createElement('table'),
	      tableRow = document.createElement('tr'),
	      containers = {
	        'tr': document.createElement('tbody'),
	        'tbody': table, 'thead': table, 'tfoot': table,
	        'td': tableRow, 'th': tableRow,
	        '*': document.createElement('div')
	      },
	      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	      singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      // special attributes that should be get/set via method calls
	      methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset']

	    var dom, nodes, container;

	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'

	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function () {
	        container.removeChild(this)
	      })
	    }

	    //[Opt:B-1][V1.0+] 移除 $(htmlString, attributes) 的api方法支持

	    return dom
	  }

	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function (dom, selector) {
	    dom = dom || []
	    dom.__proto__ = $.fn
	    dom.selector = selector || ''
	    return dom
	  }

	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function (object) {
	    return object instanceof zepto.Z
	  }

	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function (selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }

	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function (selector, context) {
	    return zepto.init(selector, context)
	  }

	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function (target) {
	    //[Opt:C] 将全局函数编程内部函数
	    var extend = function (target, source, deep) {
	      for (key in source)
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	          if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	            target[key] = {}
	          if (isArray(source[key]) && !isArray(target[key]))
	            target[key] = []
	          extend(target[key], source[key], deep)
	        }
	        else if (source[key] !== undefined) target[key] = source[key]
	    }

	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function (arg) {
	      extend(target, arg, deep)
	    })
	    return target
	  }

	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  // opt by 轩与
	  zepto.qsa = function (element, selector) {
	    // [Opt:C] 将全局simpleSelectorRE转到局部
	    var found, simpleSelectorRE = /^[\w-]*$/,
	      maybeID = selector[0] == '#',
	      maybeClass = !maybeID && selector[0] == '.',
	      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	      isSimple = /^[\w-]*$/.test(nameOnly)
	    return (isDocument(element) && isSimple && maybeID) ?
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
	        slice.call(
	            isSimple && !maybeID ?
	            maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	              element.getElementsByTagName(selector) : // Or a tag
	            element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	        )
	  }

	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }

	  $.contains = function (parent, node) {
	    return parent !== node && parent.contains(node)
	  }

	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }

	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }

	  // access className property while respecting SVGAnimatedString
	  function className(node, value) {
	    var klass = node.className,
	      svg = klass && klass.baseVal !== undefined

	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }

	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    var num
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	            value == "null" ? null :
	            !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	            value )
	        : value
	    } catch (e) {
	      return value
	    }
	  }

	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject

	  //[Opt:A] 移除$.isEmptyObject方法，官网无公开，core内无引用
	  //$.isEmptyObject

	  $.camelCase = camelize
	  $.trim = function (str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }

	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }

	  $.map = function (elements, callback) {
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }

	  $.each = function (elements, callback) {
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }

	    return elements
	  }

	  // [Opt:C] 删除不必要的if (win.JSON)
	  $.parseJSON = JSON.parse

	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })

	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,

	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function (fn) {
	      return $($.map(this, function (el, i) {
	        return fn.call(el, i, el)
	      }))
	    },
	    slice: function () {
	      return $(slice.apply(this, arguments))
	    },
	    ready: function (callback) {
	      //[Opt:C]将原本在父级作用域的变量转移至局部变量
	      var readyRE = /complete|loaded|interactive/

	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      // [Opt:C] 不做ie的兼容
	      if (readyRE.test(document.readyState)) callback($)
	      else document.addEventListener('DOMContentLoaded', function () {
	        callback($)
	      }, false)
	      return this
	    },
	    get: function (idx) {
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function () {
	      return this.get()
	    },
	    size: function () {
	      return this.length
	    },
	    remove: function () {
	      return this.each(function () {
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function (callback) {
	      emptyArray.every.call(this, function (el, idx) {
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function (selector) {
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function (element) {
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function (selector, context) {
	      return $(uniq(this.concat($(selector, context))))
	    },
	    is: function (selector) {
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function (selector) {
	      var nodes = []
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function (idx) {
	          if (!selector.call(this, idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function (el) {
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function (selector) {
	      return this.filter(function () {
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function (idx) {
	      return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
	    },
	    first: function () {
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function () {
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function (selector) {
	      var result, $this = this
	      if (typeof selector == 'object')
	        result = $(selector).filter(function () {
	          var node = this
	          return emptyArray.some.call($this, function (parent) {
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function () {
	          return zepto.qsa(this, selector)
	        })
	      return result
	    },
	    //[Opt:B][V1.0+] : closest的父级选择，代理parents，去除原有的第二个参数支持
	    closest: function (selector) {
	      if(zepto.matches(this[0], selector)) return $(this[0])
	      else return $(this.parents(selector).get(0))
	    },
	    parents: function (selector) {
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function (node) {
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function (selector) {
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function (selector) {
	      return filtered(this.map(function () {
	        return children(this)
	      }), selector)
	    },
	    //[Opt:B][V1.0+] : contents已经转移至plugin
	    siblings: function (selector) {
	      return filtered(this.map(function (i, el) {
	        return filter.call(children(el.parentNode), function (child) {
	          return child !== el
	        })
	      }), selector)
	    },
	    //[Opt:A] : empty已经转移至plugin
	    // `pluck` is borrowed from Prototype.js
	    pluck: function (property) {
	      return $.map(this, function (el) {
	        return el[property]
	      })
	    },
	    show: function () {
	      // [Opt:C] 提取函数
	      var getDisplay = function (DOM) {
	        return getComputedStyle(DOM, '').getPropertyValue("display")
	      };
	      return this.each(function () {
	        this.style.display == "none" && (this.style.display = '')
	        if (getDisplay(this) == "none") {
	          // [Opt:C] 将defaultDisplay方法局部化
	          var defaultDisplay = function (nodeName) {
	            var element, display
	            if (!elementDisplay[nodeName]) {
	              element = document.createElement(nodeName)
	              document.body.appendChild(element)
	              display = getDisplay(element)
	              element.parentNode.removeChild(element)
	              display == "none" && (display = "block")
	              elementDisplay[nodeName] = display
	            }
	            return elementDisplay[nodeName]
	          }
	          this.style.display = defaultDisplay(this.nodeName)
	        }
	      })
	    },
	    replaceWith: function (newContent) {
	      return this.before(newContent).remove()
	    },
	    //[Opt:A] : wrap系列方法，已经转移至plugin
	    clone: function () {
	      return this.map(function () {
	        return this.cloneNode(true)
	      })
	    },
	    hide: function () {
	      return this.css("display", "none")
	    },
	    toggle: function (setting) {
	      return this.each(function () {
	        var el = $(this)
	          ;
	        (setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function (selector) {
	      return $(this.pluck('previousElementSibling')).filter(selector || '*')
	    },
	    next: function (selector) {
	      return $(this.pluck('nextElementSibling')).filter(selector || '*')
	    },
	    html: function (html) {
	      return arguments.length === 0 ?
	        (this.length > 0 ? this[0].innerHTML : null) :
	        this.each(function (idx) {
	          var originHtml = this.innerHTML
	          this.innerHTML = ''
	          $(this).append(funcArg(this, html, idx, originHtml))
	        })
	    },
	    text: function (text) {
	      return arguments.length === 0 ?
	        (this.length > 0 ? this[0].textContent : null) :
	        this.each(function () {
	          this.textContent = (text === undefined) ? '' : '' + text
	        })
	    },
	    attr: function (name, value) {
	      var result
	      return (typeof name == 'string' && value === undefined) ?
	        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
	          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
	            (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	          ) :
	        this.each(function (idx) {
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function (name) {
	      return this.each(function () {
	        this.nodeType === 1 && setAttribute(this, name)
	      })
	    },
	    data: function (name, value) {
	      //[Opt:C]将原本在父级作用域的变量转移至局部变量
	      var capitalRE = /([A-Z])/g,
	        data = this.attr('data-' + name.replace(capitalRE, '-$1').toLowerCase(), value)
	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function (value) {
	      return arguments.length === 0 ?
	        (this[0] && (this[0].multiple ?
	          $(this[0]).find('option').filter(function () {
	            return this.selected
	          }).pluck('value') :
	          this[0].value)
	          ) :
	        this.each(function (idx) {
	          this.value = funcArg(this, value, idx, this.value)
	        })
	    },
	    //[Opt:B][V1.0+] 去除offset的coordinates参数
	    offset: function () {
	      if (this.length == 0) return null
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + win.pageXOffset,
	        top: obj.top + win.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function (property, value) {
	      //智能补足：分析css方法中传入的value，如果name是在cssNumber清单外的纯数字，则增加px单位
	      //[Opt:C] 将全局函数装到局部函数
	      var maybeAddPx = function (name, value) {
	        //[Opt:C]将原本在父级作用域的变量转移至局部变量
	        var cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 }
	        return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	      }

	      //将字符串(驼峰)转换为dasherized(中划线连接符形式命名)字符
	      //[Opt:C] 将全局函数装到局部函数
	      var dasherize = function (str) {
	        return str.replace(/::/g, '/')
	          .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	          .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	          .replace(/_/g, '-')
	          .toLowerCase()
	      }

	      if (arguments.length < 2) {
	        var element = this[0], computedStyle = getComputedStyle(element, '')
	        if (!element) return
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(isArray(property) ? property : [property], function (_, prop) {
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }

	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function () {
	            this.style.removeProperty(dasherize(property))
	          })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function () {
	              this.style.removeProperty(dasherize(key))
	            })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }

	      return this.each(function () {
	        this.style.cssText += ';' + css
	      })
	    },
	    index: function (element) {
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function (name) {
	      if (!name) return false
	      return emptyArray.some.call(this, function (el) {
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function (name) {
	      if (!name) return this
	      return this.each(function (idx) {
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function (klass) {
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function (name) {
	      return this.each(function (idx) {
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function (name, when) {
	      if (!name) return this
	      return this.each(function (idx) {
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function (klass) {
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function (value) {
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function () {
	          this.scrollTop = value
	        } :
	        function () {
	          this.scrollTo(this.scrollX, value)
	        })
	    }
	    //[Opt:A] : scrollLeft已经转移至plugin
	    //[Opt:A] : position已经转移至plugin
	    //[Opt:A] : offsetParent已经转移至plugin
	  }

	  // for now
	  $.fn.detach = $.fn.remove

	  // Generate the `width` and `height` functions
	  // todo:高度值bug待修复
	  ;
	  ['width', 'height'].forEach(function (dimension) {
	    var dimensionProperty =
	      dimension.replace(/./, function (m) {
	        return m[0].toUpperCase()
	      })

	    $.fn[dimension] = function (value) {
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	          (offset = this.offset()) && offset[dimension]
	      else return this.each(function (idx) {
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })

	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  // [Opt:C] 将全部变量，改为局部变量
	  ;
	  [ 'after', 'prepend', 'before', 'append' ].forEach(function (operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append

	    $.fn[operator] = function () {
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function (arg) {
	          argType = type(arg)
	          return argType == "object" || argType == "array" || arg == null ?
	            arg : zepto.fragment(arg)
	        }),
	        parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this

	      return this.each(function (_, target) {
	        parent = inside ? target : target.parentNode

	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	            operatorIndex == 1 ? target.firstChild :
	            operatorIndex == 2 ? target :
	          null

	        // [Opt:C] 全部变量局部化
	        var traverseNode = function (node, fun) {
	          fun(node)
	          for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
	        }

	        nodes.forEach(function (node) {

	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()

	          traverseNode(parent.insertBefore(node, target), function (el) {
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	              (!el.type || el.type === 'text/javascript') && !el.src)
	              win['eval'].call(win, el.innerHTML)
	          })
	        })
	      })
	    }

	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
	      $(html)[operator](this)
	      return this
	    }
	  })

	  zepto.Z.prototype = $.fn

	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = $.yocto = zepto

	  return $
	})()

	module.exports = Yocto



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);

	// Event Module
	var _zid = 1, undefined,
	    slice = Array.prototype.slice,
	    isFunction = $.isFunction,
	    isString = function(obj){ return typeof obj == 'string' },
	    handlers = {},
	    specialEvents={}

	specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	function zid(element) {
	  return element._zid || (element._zid = _zid++)
	}
	function findHandlers(element, event, fn, selector) {
	  event = parse(event)
	  if (event.ns) var matcher = matcherFor(event.ns)
	  return (handlers[zid(element)] || []).filter(function(handler) {
	    return handler
	      && (!event.e  || handler.e == event.e)
	      && (!event.ns || matcher.test(handler.ns))
	      && (!fn       || zid(handler.fn) === zid(fn))
	      && (!selector || handler.sel == selector)
	  })
	}
	function parse(event) {
	  var parts = ('' + event).split('.')
	  // e——事件名 ns——命名空间
	  return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	}
	function matcherFor(ns) {
	  return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	}

	function eventCapture(handler, captureSetting) {
	  return handler.del &&
	    (handler.e === 'focus' || handler.e === 'blur') ||
	    !!captureSetting
	}

	function add(element, events, fn, data, selector, delegator, capture){
	  var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	  events.split(/\s/).forEach(function(event){
	    if (event == 'ready') return $(document).ready(fn)
	    var handler   = parse(event)
	    handler.fn    = fn
	    handler.sel   = selector

	    handler.del   = delegator
	    var callback  = delegator || fn
	    handler.proxy = function(e){
	      //Android下如果同时存在tap逻辑并且事件类型为click,阻止浏览器自己触发的点击事件
	      if (navigator.userAgent.toLowerCase().indexOf('android') > -1 && $.gestures && $.gestures.tap && handler.e === 'click' && !e.animaClick) {
	        if (e.stopImmediatePropagation) {
	          e.stopImmediatePropagation();
	        } else {
	          e.propagationStopped = true;
	        }

	        e.stopPropagation()
	        e.preventDefault()

	        return false
	      }

	      e = compatible(e)
	      if (e.isImmediatePropagationStopped()) return
	      e.data = data
	      var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	      if (result === false) e.preventDefault(), e.stopPropagation()
	      return result
	    }
	    handler.i = set.length
	    set.push(handler)
	    if ('addEventListener' in element){
	      // 自定义手势逻辑
	      if($.gestures && $.gestures.list && $.gestures.list[handler.e]){
	        $.gestures.list[handler.e](element);
	      }

	      element.addEventListener(handler.e, handler.proxy, eventCapture(handler, capture))
	    }
	  })
	}
	function remove(element, events, fn, selector, capture){
	  var id = zid(element)
	  ;(events || '').split(/\s/).forEach(function(event){
	    findHandlers(element, event, fn, selector).forEach(function(handler){
	      delete handlers[id][handler.i]
	    if ('removeEventListener' in element)
	      element.removeEventListener(handler.e, handler.proxy, eventCapture(handler, capture))
	    })
	  })
	}

	$.event = { add: add, remove: remove }

	$.proxy = function(fn, context) {
	  if (isFunction(fn)) {
	    var proxyFn = function(){ return fn.apply(context, arguments) }
	    proxyFn._zid = zid(fn)
	    return proxyFn
	  } else if (isString(context)) {
	    return $.proxy(fn[context], fn)
	  } else {
	    throw new TypeError("expected function")
	  }
	}

	$.fn.one = function(event, selector, data, callback){
	  return this.on(event, selector, data, callback, 1)
	}

	var returnTrue = function(){return true},
	    returnFalse = function(){return false},
	    ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	    eventMethods = {
	      preventDefault: 'isDefaultPrevented',
	      stopImmediatePropagation: 'isImmediatePropagationStopped',
	      stopPropagation: 'isPropagationStopped'
	    }

	function compatible(event, source) {
	  if (source || !event.isDefaultPrevented) {
	    source || (source = event)

	    $.each(eventMethods, function(name, predicate) {
	      var sourceMethod = source[name]
	      event[name] = function(){
	        this[predicate] = returnTrue
	        return sourceMethod && sourceMethod.apply(source, arguments)
	      }
	      event[predicate] = returnFalse
	    })

	    if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	        'returnValue' in source ? source.returnValue === false :
	        source.getPreventDefault && source.getPreventDefault())
	      event.isDefaultPrevented = returnTrue
	  }
	  return event
	}

	function createProxy(event) {
	  var key, proxy = { originalEvent: event }
	  for (key in event)
	    if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

	  return compatible(proxy, event)
	}

	$.fn.on = function(event, selector, data, callback, one){
	  var autoRemove, delegator, $this = this
	  if (event && !isString(event)) {
	    $.each(event, function(type, fn){
	      $this.on(type, selector, data, fn, one)
	    })
	    return $this
	  }

	  if (!isString(selector) && !isFunction(callback) && callback !== false)
	    callback = data, data = selector, selector = undefined
	  if (isFunction(data) || data === false)
	    callback = data, data = undefined

	  if (callback === false) callback = returnFalse

	  return $this.each(function(_, element){
	    if (one) autoRemove = function(e){
	      remove(element, e.type, callback)
	      return callback.apply(this, arguments)
	    }

	    if (selector) delegator = function(e){
	      var evt, match = $(e.target).closest(selector, element).get(0)
	      if (match && match !== element) {
	        evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	      }
	    }

	    add(element, event, callback, data, selector, delegator || autoRemove)
	  })
	}
	$.fn.off = function(event, selector, callback){
	  var $this = this
	  if (event && !isString(event)) {
	    $.each(event, function(type, fn){
	      $this.off(type, selector, fn)
	    })
	    return $this
	  }

	  if (!isString(selector) && !isFunction(callback) && callback !== false)
	    callback = selector, selector = undefined

	  if (callback === false) callback = returnFalse

	  return $this.each(function(){
	    remove(this, event, callback, selector)
	  })
	}

	$.fn.trigger = function(event, args){
	  event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	  event._args = args
	  return this.each(function(){
	    // items in the collection might not be DOM elements
	    if('dispatchEvent' in this) this.dispatchEvent(event)
	    else $(this).triggerHandler(event, args)
	  })
	}

	// triggers event handlers on current element just as if an event occurred,
	// doesn't trigger an actual event, doesn't bubble
	$.fn.triggerHandler = function(event, args){
	  var e, result
	  this.each(function(i, element){
	    e = createProxy(isString(event) ? $.Event(event) : event)
	    e._args = args
	    e.target = element
	    $.each(findHandlers(element, event.type || event), function(i, handler){
	      result = handler.proxy(e)
	      if (e.isImmediatePropagationStopped()) return false
	    })
	  })
	  return result
	}

	// shortcut methods for `.bind(event, fn)` for each event type
	;('focusin focusout load resize scroll unload click dblclick '+
	// 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	  $.fn[event] = function(callback) {
	    return callback ?
	      this.on(event, callback) :
	      this.trigger(event)
	  }
	})

	;['focus', 'blur'].forEach(function(name) {
	  $.fn[name] = function(callback) {
	    if (callback) this.on(name, callback)
	    else this.each(function(){
	      try { this[name]() }
	      catch(e) {}
	    })
	    return this
	  }
	})

	$.Event = function(type, props) {
	  if (!isString(type)) props = type, type = props.type
	  var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	  if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	  event.initEvent(type, bubbles, true)
	  return compatible(event)
	}

	module.exports = $


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {


	// Thanks to zepto.js core: https://github.com/madrobby/zepto/blob/master/src/zepto.js
	// Zepto.js
	// (c) 2010-2014 Thomas Fuchs
	// Zepto.js may be freely distributed under the MIT license.

	var $ = __webpack_require__(1);
	__webpack_require__(2);

	module.exports = $;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $ = Yocto = __webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(4);

	__webpack_require__(15);

	module.exports = $;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $ = Yocto = __webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(4);

	var Gesture = $.gestures;

	var deviceIsAndroid = navigator.userAgent.toLowerCase().indexOf('android') > 0,
	    deviceIsIOS = /ip(ad|hone|od)/.test(navigator.userAgent.toLowerCase());

	var yoctoTouch = {
	    trackingClick: false,
	    trackingClickStart: 0,
	    targetElement: null,
	    touchStartX: 0,
	    touchStartY: 0,
	    touchBoundary: 10,
	    tapDelay: 200,
	    sendClick: function(targetElement, event){
	        // 在click之前触发tap事件
	        var tap = $.Event('tap', {animaTap: true})
	        $(targetElement).trigger(tap);

	        var clickEvent, touch;

	        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	        if (document.activeElement && document.activeElement !== targetElement) {
	            document.activeElement.blur();
	        }

	        touch = event.changedTouches[0];

	        // Synthesise a click event, with an extra attribute so it can be tracked
	        clickEvent = document.createEvent('MouseEvents');
	        clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	        clickEvent.animaClick = true;
	        targetElement.dispatchEvent(clickEvent);
	    },
	    needClick: function(target){
	        switch (target.nodeName.toLowerCase()) {

	        // Don't send a synthetic click to disabled inputs (issue #62)
	        case 'button':
	        case 'select':
	        case 'textarea':
	            if (target.disabled) {
	                return true;
	            }

	            break;
	        case 'input':

	            // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
	            if ((deviceIsIOS && target.type === 'file') || target.disabled) {
	                return true;
	            }

	            break;
	        case 'label':
	        case 'iframe':
	        case 'video':
	            return true;
	        }

	        return false;
	    },
	    focus: function(targetElement){
	        var length;

	        // on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
	            length = targetElement.value.length;
	            targetElement.setSelectionRange(length, length);
	        } else {
	            targetElement.focus();
	        }
	    },
	    needFocus: function(target){
	        switch (target.nodeName.toLowerCase()) {
	            case 'textarea':
	            case 'select': //实测android下select也需要
	                return true;
	            case 'input':
	                switch (target.type) {
	                case 'button':
	                case 'checkbox':
	                case 'file':
	                case 'image':
	                case 'radio':
	                case 'submit':
	                    return false;
	                }

	                // No point in attempting to focus disabled inputs
	                return !target.disabled && !target.readOnly;
	            default:
	                return false;
	            }
	    },
	    updateScrollParent: function(targetElement){
	        var scrollParent, parentElement;

	        scrollParent = targetElement.yoctoTouchScrollParent;

	        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	        // target element was moved to another parent.
	        if (!scrollParent || !scrollParent.contains(targetElement)) {
	            parentElement = targetElement;
	            do {
	                if (parentElement.scrollHeight > parentElement.offsetHeight) {
	                    scrollParent = parentElement;
	                    targetElement.yoctoTouchScrollParent = parentElement;
	                    break;
	                }

	                parentElement = parentElement.parentElement;
	            } while (parentElement);
	        }

	        // Always update the scroll top tracker if possible.
	        if (scrollParent) {
	            scrollParent.yoctoTouchLastScrollTop = scrollParent.scrollTop;
	        }
	    },
	    findControl: function(labelElement){
	        // Fast path for newer browsers supporting the HTML5 control attribute
	        if (labelElement.control !== undefined) {
	            return labelElement.control;
	        }

	        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
	        if (labelElement.htmlFor) {
	            return document.getElementById(labelElement.htmlFor);
	        }

	        // If no for attribute exists, attempt to retrieve the first labellable descendant element
	        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	    },
	    touchHasMoved: function(event){
	        var touch = event.changedTouches[0], boundary = yoctoTouch.touchBoundary;

	        if (Math.abs(touch.pageX - yoctoTouch.touchStartX) > boundary || Math.abs(touch.pageY - yoctoTouch.touchStartY) > boundary) {
	            return true;
	        }

	        return false;
	    },
	    fixTarget: function(target){
	        if (window.SVGElementInstance && (target instanceof SVGElementInstance)){
	          target = target.correspondingUseElement;
	        }

	        return target;
	    }
	};

	Gesture.tap = {
	    events: ['tap', 'click'],
	    handler: {
	        touchstart: function(event){
	            var targetElement, touch, selection;

	            // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the yoctoTouch element (issue #111).
	            if (event.targetTouches.length > 1) {
	                return true;
	            }

	            targetElement = yoctoTouch.fixTarget(event.target);
	            touch = event.targetTouches[0];

	            if (deviceIsIOS) {

	                // Only trusted events will deselect text on iOS (issue #49)
	                selection = window.getSelection();
	                if (selection.rangeCount && !selection.isCollapsed) {
	                    return true;
	                }

	                yoctoTouch.updateScrollParent(targetElement);
	            }

	            yoctoTouch.trackingClick = true;
	            yoctoTouch.trackingClickStart = event.timeStamp;
	            yoctoTouch.targetElement = targetElement;

	            // var now = Date.now(),
	            //     delta = now - (yoctoTouch.last || now);

	            // if(delta > 0 && delta <= 250){
	            //     yoctoTouch.isDouleTap = true;
	            // }

	            // yoctoTouch.last = now;

	            yoctoTouch.touchStartX = touch.pageX;
	            yoctoTouch.touchStartY = touch.pageY;

	            // Prevent phantom clicks on fast double-tap (issue #36)
	            if ((event.timeStamp - yoctoTouch.lastClickTime) < yoctoTouch.tapDelay) {
	                event.preventDefault();
	            }

	            return true;
	        },
	        touchmove: function(event){
	            if (!yoctoTouch.trackingClick) {
	                return true;
	            }

	            // If the touch has moved, cancel the click tracking
	            if (yoctoTouch.targetElement !== yoctoTouch.fixTarget(event.target) || yoctoTouch.touchHasMoved(event)) {
	                yoctoTouch.trackingClick = false;
	                yoctoTouch.targetElement = null;
	            }

	            return true;
	        },
	        touchend: function(event){
	            var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = yoctoTouch.targetElement;

	            if (!yoctoTouch.trackingClick) {
	                return true;
	            }

	            // Prevent phantom clicks on fast double-tap (issue #36)
	            if ((event.timeStamp - yoctoTouch.lastClickTime) < yoctoTouch.tapDelay) {
	                yoctoTouch.cancelNextClick = true;
	                return true;
	            }

	            // Reset to prevent wrong click cancel on input (issue #156).
	            yoctoTouch.cancelNextClick = false;

	            yoctoTouch.lastClickTime = event.timeStamp;

	            trackingClickStart = yoctoTouch.trackingClickStart;
	            yoctoTouch.trackingClick = false;
	            yoctoTouch.trackingClickStart = 0;

	            targetTagName = targetElement.tagName.toLowerCase();
	            if (targetTagName === 'label') {
	                forElement = yoctoTouch.findControl(targetElement);
	                if (forElement) {
	                    yoctoTouch.focus(targetElement);
	                    if (deviceIsAndroid) {
	                        return false;
	                    }

	                    targetElement = forElement;
	                }
	            } else if (yoctoTouch.needFocus(targetElement)) {

	                // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
	                // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
	                if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
	                    yoctoTouch.targetElement = null;
	                    return false;
	                }

	                yoctoTouch.focus(targetElement);
	                deviceIsAndroid && yoctoTouch.sendClick(targetElement, event);

	                return false;
	            }

	            if (deviceIsIOS) {

	                // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
	                // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
	                scrollParent = targetElement.yoctoTouchScrollParent;
	                if (scrollParent && scrollParent.yoctoTouchLastScrollTop !== scrollParent.scrollTop) {
	                    return true;
	                }
	            }

	            // Prevent the actual click from going though - unless the target node is marked as requiring
	            // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	            if (!yoctoTouch.needClick(targetElement)) {
	                event.preventDefault();
	                yoctoTouch.sendClick(targetElement, event);
	            }

	            return false;
	        },
	        touchcancel: function(event){
	            yoctoTouch.trackingClick = false;
	            yoctoTouch.targetElement = null;
	        }
	    }
	};

	Gesture.init('tap');

	// 重写initEvent事件，确保模拟出来的click事件带有animaClick标识
	var oldInitEvent = Event.prototype.initEvent;

	Event.prototype.initEvent = function(){
	    var args = Array.prototype.slice.call(arguments);

	    oldInitEvent.apply(this, args)

	    if(args[0] === 'click'){
	        this.animaClick = true
	    }
	}

	module.exports = $;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {


	// Thanks to zepto.js core: https://github.com/madrobby/zepto/blob/master/src/zepto.js
	// Zepto.js
	// (c) 2010-2014 Thomas Fuchs
	// Zepto.js may be freely distributed under the MIT license.

	var $ = __webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(7);
	__webpack_require__(14);

	module.exports = $;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(anima) {
	  return (function(uid, duration, pages, currPage) {
	    var out = '<style type="text/css">.ui-pageflick[uid="';
	    out += (uid);
	    out += '"] .ui-page.animate,.ui-pageflick[uid="';
	    out += (uid);
	    out += '"] .ui-page.up-in-before,.ui-pageflick[uid="';
	    out += (uid);
	    out += '"] .ui-page.down-in,.ui-pageflick[uid="';
	    out += (uid);
	    out += '"] .ui-page.up-out{-webkit-transition: all ';
	    out += (duration / 1000);
	    out += 's ease-in-out !important}</style><div class="pageflick ui-pageflick" uid="';
	    out += (uid);
	    out += '">';
	    for (var i = 0; i < pages.length; i++) {
	      out += '<div class="page';
	      out += (i);
	      out += ' ui-page ';
	      if (i == currPage) {
	        out += 'show';
	      }
	      out += '" style="z-index: ';
	      out += (i + 10);
	      out += ';">';
	      out += (pages[i].content);
	      out += '</div>';
	    }
	    out += '</div>';
	    return out;
	  })(anima.uid, anima.duration, anima.pages, anima.currPage)
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * land By 镜曦 <jingxi.lp@alibaba-inc.com>@alipay.com
	 * Created By Anima
	 */
	__webpack_require__(18);


	var $ = this.$ = __webpack_require__(16);
	var Pageflick = __webpack_require__(5);


	var pageflick = new Pageflick({
		trigger: '#pages',
		duration: 300,
		flickType: 'slide',
		afterFlick: function(){
		  // console.log(arguments);
		},
		pages: [{
		  content: '<div class="page index">'+
	      '<div class="logo"></div>'+
	      '<div class="bottoms">'+
	        '<a id="ioslinker" class=" fn-hide">IOS 版下载</a>'+
	        '<a id="androidlinker" class="fn-hide">Android 版下载</a>'+
	        '<a id="linker" class="fn-hide">立即下载</a>'+
	        '<div class="vision">网商银行手机版 V'+ appVersion +'</div>'+
	      '</div>'+
	      '<div class="notice">目前网商银行App正逐步开放客<br />群中，谢谢关注！</div>'+
	      '<div class="bg-img"></div>'+
	      '<div class="next"></div>'+
	    '</div>'
		},{
		  content: '<div class="page">'+
	      '<div class="slogan">'+
	        '<div class="slogan-title">移动申贷，就这么便捷</div>'+
	        '<div class="slogan-text">纯信用贷款无须抵押</div>'+
	        '<div class="slogan-text">资金极速到账</div>'+
	      '</div>'+
	      '<img src="https://os.alipayobjects.com/rmsportal/ClQzJKsBjljAnJa.png" class="slogan-img" />'+
	      '<div class="next gray"></div>'+
	    '</div>'
		},{
		  content: '<div class="page">'+
	      '<div class="slogan">'+
	        '<div class="slogan-title">实时理财，就这么轻松</div>'+
	        '<div class="slogan-text">支持大额实时转入转出</div>'+
	        '<div class="slogan-text">转入最高1000万，实时转出最高500万</div>'+
	      '</div>'+
	      '<img src="https://os.alipayobjects.com/rmsportal/qMaRlShgKjaeYuv.png" class="slogan-img" />'+
	      '<div class="next gray"></div>'+
	    '</div>'
		},{
		  content: '<div class="page foot">'+
	      '<div class="slogan">'+
	        '<div class="slogan-title">免费转账，就这么简单</div>'+
	        '<div class="slogan-text">轻松管理本人名下多张银行卡</div>'+
	        '<div class="slogan-text">无须插入U盾，APP内可实现他行代扣</div>'+
	        '<div class="slogan-text">支持手机号跨行转账</div>'+
	      '</div>'+
	      '<img src="https://os.alipayobjects.com/rmsportal/sWbNDryjwgxnoCT.png" class="slogan-img" />'+
	      '<div class="bottoms foot-bg">'+
	        '<a id="foot-ioslinker" class="fn-hide">IOS 版下载</a>'+
	        '<a id="foot-androidlinker" class="fn-hide">Android 版下载</a>'+
	        '<a id="foot-linker" class="fn-hide">立即下载</a>'+
	        '<div class="vision">'+
	          '<div>最新版本：V'+ appVersion +'</div>'+
	          '<div>网商银行版本所有权  2015－2016</div>'+
	        '</div>'+
	      '</div>'+
	    '</div>'
		}]
	});

	var doc = window.document;

	var loc = location;
	var downloadLink = "";
	var unknow = false;
	var device = "unknow";
	var browser = RedirectToNative._UA();

	// 先判断是不是PC
	if(!browser.ios && !browser.android && (browser.trident || browser.presto || browser.webKit || browser.gecko )){
	  device = "pc";

	// 判断是否是IOS
	}else if(browser.ios){
	  device = "ios";

	// 判断是否是安卓
	}else if(browser.android){
	  device = "android";

	// 都不是则为默认状态
	}else{
	  device = "unknow";
	}

	// 苹果设备去往appstore
	if (device === 'ios') {
	  downloadLink = iosLink;

	// 安卓设备 apk 链接
	} else if (device === 'android') {
	  downloadLink = androidLink;

	// PC设备去PC下载页面
	} else if (pcLink && device === 'pc') {
	    loc.href = pcLink;
	}


	function init() {

	  // 如果未识别出来是什么设备则展示两个下载按钮
	  if(!(device == "unknow")){
	    $('#linker').attr('href',downloadLink).attr('class', 'bottom default-btn');
	    $('#foot-linker').attr('href',downloadLink).attr('class', 'bottom default-btn');
	  }else{
	    $('#ioslinker').attr('href',iosLink).attr('class', 'bottom default-btn');
	    $('#androidlinker').attr('href',androidLink).attr('class', 'bottom default-btn');

	    $('#foot-ioslinker').attr('href',iosLink).attr('class', 'bottom default-btn');
	    $('#foot-androidlinker').attr('href',androidLink).attr('class', 'bottom default-btn');
	  }

	  var from = getParam("from",loc.href) || 'LHFX_WSAPP_H5_download_001';

	  // 下载事件
	  $('a').on('tap', function(ev) {
	    Tracker.click(from);
	    loc.href = downloadLink;
	  });

	  $('#foot-linker').on('tap', function(ev) {
	    Tracker.click(from);
	    loc.href = downloadLink;
	  });

	  // 安卓下载事件
	  $('#androidlinker').on('tap', function(ev) {
	    if(androidLink){
	      Tracker.click(from);
	      loc.href = androidLink;
	    }
	  });

	  $('#foot-androidlinker').on('tap', function(ev) {
	    if(androidLink){
	      Tracker.click(from);
	      loc.href = androidLink;
	    }
	  });

	  // ios下载事件
	  $('#ioslinker').on('tap', function(ev) {
	    if(iosLink){
	      Tracker.click(from);
	      loc.href = iosLink;
	    }
	  });

	  $('#foot-ioslinker').on('tap', function(ev) {
	    if(iosLink){
	      Tracker.click(from);
	      loc.href = iosLink;
	    }
	  });
	};

	/**
	 * @description 获取指定参数值
	 * @name getParam
	 * @memberOf Tida
	 * @function
	 * @param {String} key 参数名
	 * @param {String} url 地址
	 */
	function getParam (key, url) {
	    var paraStr = key;
	    // tmm内容
	    url = url || location.href;
	    if (url.indexOf("?") == -1 || url.indexOf(paraStr + '=') == -1) {
	        return '';
	    }
	    url = url.split("#")[0];

	    var queryString = url.substring(location.href.indexOf("?") + 1);
	    var parameters = queryString.split("&");
	    var pos, paraName, paraValue;
	    for (var i = 0; i < parameters.length; i++) {
	        pos = parameters[i].indexOf('=');
	        if (pos == -1) {
	            continue;
	        }
	        paraName = parameters[i].substring(0, pos);
	        paraValue = parameters[i].substring(pos + 1);

	        if (paraName == paraStr) {
	            return decodeURIComponent(paraValue.replace(/\+/g, " "));
	        }
	    }
	    return '';
	}

	document.addEventListener('touchmove', function(e){
	  e.preventDefault();
	}, false);

	$(function(){
		pageflick.render();
		init();
	})

/***/ }
/******/ ]);
