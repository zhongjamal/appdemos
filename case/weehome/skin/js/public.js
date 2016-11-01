
	/**
	 * 预约看房
	 *
	 */
	var formDialog;
	function Order(){
		if($.cookie('isOrder')){
			ShowError('预约看房', '您已经预约过了,1小时内请勿重复预约.');
			return false;
		}
		formDialog = BootstrapDialog.show({
            title	: '预约看房',
            width	: 700,
            type 	: BootstrapDialog.TYPE_DEFAULT,
            message	: $('<div style="padding:15px 15px 0 15px"></div>').load('/Form.php?action=order'),
  			buttons	: [{
                label	: '提交预约信息',
                action	: function(dialog) {
                    OrderSubmit();
                }
            }]
        });

		/*
		var overlay = $('<div></div>');
		overlay.addClass('we-dialog-overlay').css({'opacity':0.7}).appendTo('body');
		var dialog = $('#orderDialog').fadeIn('slow');
		dialog.find('.we-dialog-close').click(function(){
			dialog.fadeOut();
			overlay.remove();
		})
		*/
	}


	function OrderSubmit(){
		
		if($('#orderName').val() == ''){
			ShowError('预约看房','您没有填写姓名,我们该如何称呼您呢?');
			return false;
		}

		if($('#orderPeople').val() == ''){
			ShowError('预约看房', '您是几个入住,我们好为您介绍适合的房间?');
			return false;
		}else if(isNaN($('#orderPeople').val())){
			ShowError('人数不是数字.');
			return false;
		}

		if($('#orderMobile').val() == ''){
			ShowError('预约看房' ,'您没有填写联系电话，我们将不能联系您.');
			return false;
		}else if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test($('#orderMobile').val())){
			ShowError('电话号不正确.');
			return false;
		}

		$.post('/Public.php?action=order',$('#orderForm').serialize(),function(data){
			if(data.state){
				var cookietime = new Date();
				cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));
				$.cookie('isOrder',true,{expires: cookietime});
				BootstrapDialog.show({
		            title	: '预约看房',
		            message	: data.msg,
		            type 	: BootstrapDialog.TYPE_SUCCESS,
		            width	: 400,
		            onhidden: function(dig) {
		            	formDialog.close();
		            }
		        });
			}else{
				ShowError(data.msg);
			}

		},'json')

	}


	/**
	 * 预约维修出来
	 */

	function Repair(){
		if($.cookie('isRepair')){
			ShowError('预约维修', '您已经预约了师傅维修,1小时内请勿重复预约.');
			return false;
		}
		formDialog = BootstrapDialog.show({
            title	: '预约维修',
            width	: 700,
            type 	: BootstrapDialog.TYPE_DEFAULT,
            message	: $('<div style="padding:15px 15px 0 15px"></div>').load('/Form.php?action=repair'),
  			buttons	: [{
                label	: '提交预约信息',
                action	: function(dialog) {
                    RepairSubmit();
                }
            }],
            onshown : function(){
		  		$('#repaDate').datepicker({
				    format: "yyyy-mm-dd",
				    startDate: "1d",
				    todayBtn: 'linked',
				    language: "zh-CN",
				    autoclose: true,
				    todayHighlight: true
				});
            }
        });
	}

	function RepairSubmit(){
		if($('#repaName').val() == ''){
			ShowError('预约维修','您没有填写姓名，我们该如何称呼呢?');
			return false;
		}
		if($('#repaMobile').val() == ''){
			ShowError('预约维修','您没有填写联系电话，我们将不能联系您.');
			return false;
		}else if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test($('#repaMobile').val())){
			ShowError('预约维修','电话号不正确.');
			return false;
		}
		if($('#repaRoom').val() == ''){
			ShowError('预约维修','您没填写所住房间房号?');
			return false;
		}

		if($('#repaDate').val() == ''){
			ShowError('预约维修','您没指定时间，我们该在什么时候上门服务呢?');
			return false;
		}

		$.post('/Public.php?action=repair',$('#repairForm').serialize(),function(data){
			if(data.state){
				var cookietime = new Date();
				cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));
				$.cookie('isRepair',true,{expires: cookietime});
				BootstrapDialog.show({
		            title	: '预约维修',
		            message	: data.msg,
		            type 	: BootstrapDialog.TYPE_SUCCESS,
		            width	: 400,
		            onhidden: function(dig) {
		            	formDialog.close();
		            }
		        });
			}else{
				ShowError('预约维修', data.msg);
			}

		},'json')
	}


	/**
	 * 投诉建议处理
	 *
	 */
	function Tsjy(){
		if($.cookie('isTsjy')){
			ShowError('投诉/建议', '您的投诉建议信息我们已经收到,1小时内请勿重复操作.');
			return false;
		}
		formDialog = BootstrapDialog.show({
            title	: '投诉/建议',
            width	: 700,
            type 	: BootstrapDialog.TYPE_DEFAULT,
            message	: $('<div style="padding:15px 15px 0 15px"></div>').load('/Form.php?action=tsjy'),
  			buttons	: [{
                label	: '提交投诉/建议',
                action	: function(dialog) {
                    TsjySubmit();
                }
            }]
        });
	}

	function TsjySubmit(){
		if($(":radio[name='tsjyType']:checked").size() == 0){
			ShowError('投诉/建议','您是想投诉还是给我们建议?');
			return false;
		}		
		if($('#tsjyName').val() == ''){
			ShowError('投诉/建议','您没有填写姓名，我们该如何称呼呢?');
			return false;
		}
		if($('#tsjyContact').val() == ''){
			ShowError('投诉/建议','您没有输入联系方式，我们好方便联系呢?');
			return false;
		}

		if($('#tsjyContent').val() == ''){
			ShowError('投诉/建议','您忘记说点儿什么了?');
			return false;
		}

		$.post('/Public.php?action=tsjy',$('#tsjyForm').serialize(),function(data){
			if(data.state){
				var cookietime = new Date();
				cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));
				$.cookie('isTsjy',true,{expires: cookietime});
				BootstrapDialog.show({
		            title	: '投诉/建议',
		            message	: data.msg,
		            type 	: BootstrapDialog.TYPE_SUCCESS,
		            width	: 400,
		            onhidden: function(dig) {
		            	formDialog.close();
		            }
		        });
			}else{
				ShowError('预约维修', data.msg);
			}

		},'json')

	}

	function ShowError(t,msg){
		BootstrapDialog.show({
            title	: t,
            message	: msg,
            type 	: BootstrapDialog.TYPE_DANGER,
            width	: 400
        });
	}


	/**
	 * Alipay 显示支付二维码
	 *
	 */
	/**
	 * Alipay 显示支付二维码
	 *
	 */
	function Alipay(){
		var payhtml = '';
		payhtml += '<div class="row">';
		payhtml += '<div class="col-xs-6 col-sm-6"><img src="/skin/images/alipay_qrcode.png" class="img-responsive"><div class="text-center">(手机支付宝扫描支付)支付宝账号：info@weehome.cn</div></div>';
		payhtml += '<div class="col-xs-6 col-sm-6"><img src="/skin/images/wechatpay_qrcode.png" class="img-responsive"><div class="text-center">(微信扫描支付)</div></div>'
  		payhtml += '</div>';

		BootstrapDialog.show({
  			title	: '在线支付',
  			width	: 500,
  			type 	: BootstrapDialog.TYPE_DEFAULT,
            message	: $(payhtml)
        });
	}


	/*
	function ShowError(msg){
		$('.alert').text(msg).fadeIn();
		setTimeout(function(){$('.alert').fadeOut()},2000);
	}

	function AlertDialog(id,msg){
		$(id).fadeOut();
		$('.we-dialog-overlay').remove();
		$(id + ' .we-dialog-body').text(data.msg).parent().fadeIn();
	}
	*/


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));