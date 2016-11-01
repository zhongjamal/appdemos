define("js/v4/player.js", function(n) {
	function t(n, t) {
		var e = n.concat(t),
			a = [],
			s = {};
		return f.each(e, function(n, t) {
			!t || t.songid in s || (a.push(t), s[t.songid] = 1)
		}), a
	}

	function e(n, t) {
		var e = [],
			a = {};
		return f.each(n, function(n, t) {
			a[t.songid] = 1
		}), f.each(t, function(n, t) {
			!t || t.songid in a || e.push(t)
		}), e
	}

	function a(a, s, o) {
		function l(t, e, s, i, l, c) {
			c = c || !1, b.get(function(n) {
				S = n
			}), n.async("js/common/html/songlist.js", function(n) {
				n.init({
					container: t,
					specilData: e,
					specialTpl: i,
					reportType: r.reportMap.player,
					actions: T,
					from: 0,
					callback: function() {
						y.webkit || (h = f(".sb_scrollable").scrollbar({
							overviewElement: ".sb_overview",
							barElement: ".scroll_area",
							onScrolled: function() {}
						}));
						var n = [];
						for (var t in e) {
							var i = e[t];
							for (var _ in s) i && s[_] && i.songid == s[_].songid && n.push(i)
						}
						if (c && !(0 == l ? l : !0) && 0 == j ? m.addSong(n, 0 == l ? l : !0) : m.setPlayerList(0 == j ? 0 == l ? l : !0 : !0, e, x.mode), !a) {
							var g = parseInt(r.cookie.get("yq_index")) || 0;
							g > 0 && setTimeout(function() {
								m.playAnyPos(g)
							}, 500)
						}!y.webkit && h && h.scrollbar("scrollToY", 0), y.webkit && (f(".sb_overview")[0].scrollTop = -10), o && o(), L._curSongInfo && (f("div.songlist__item", f('li[mid="' + L._curSongInfo.songid + '"]')).addClass("songlist__item--playing"), f(".js_play", f('li[mid="' + L._curSongInfo.songid + '"]')).attr("title", "暂停").html('<i class="list_menu__icon_pause"></i><span class="icon_txt">暂停</span>'))
					}
				})
			})
		}
		f.jStorage.set("PLAYER_EXISTS", !0);
		var c = [];
		a && (f.each(a.list, function(n, t) {
			t && t.disabled && t.disabled || c.push(t)
		}), a.list = c), s = s || !1;
		var g = function(n) {
				{
					var t, e = "";
					Array.prototype.join
				}
				e += "";
				var a = n.list;
				for (i = 0; i < a.length; i++) {
					e += '\r\n                            <li mid="' + (null == (t = a[i].songid) ? "" : t) + '" ix="' + (null == (t = a[i].ix) ? "" : t) + '"  data-page="player" data-stat="y_new.player.songlist.dbclick">\r\n                                <div class="songlist__item">\r\n                                    <div class="songlist__edit">\r\n                                        <input type="checkbox" class="songlist__checkbox">\r\n                                    </div>\r\n                                    <div class="songlist__number', i >= 99 && (e += " songlist__number--small"), e += '">' + (null == (t = i + 1) ? "" : t) + '</div>\r\n                                    <div class="songlist__songname">\r\n                                        <span class="songlist__songname_txt" title="' + (null == (t = a[i].songname) ? "" : _.escape(t)) + '">' + (null == (t = a[i].songname) ? "" : _.escape(t)) + '</span>\r\n                                        <div class="mod_list_menu">\r\n					    <a href="javascript:;" class="list_menu__item list_menu__play js_play" data-stat="y_new.player.songlist.playone" data-page="player" title="播放">\r\n						<i class="list_menu__icon_play"></i>\r\n						<span class="icon_txt">播放</span>\r\n					    </a>\r\n					    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" data-stat="y_new.player.songlist.addone" title="添加到歌单" aria-haspopup="true">\r\n						<i class="list_menu__icon_add"></i>\r\n						<span class="icon_txt">添加到歌单</span>\r\n					    </a>\r\n					    <a href="javascript:;" class="list_menu__item list_menu__down js_down" data-stat="y_new.player.songlist.downloadone" title="下载" aria-haspopup="true">\r\n						<i class="list_menu__icon_down"></i>\r\n						<span class="icon_txt">下载</span>\r\n					    </a>\r\n					    <a href="javascript:;" class="list_menu__item list_menu__share js_share" data-stat="y_new.player.songlist.shareone" title="分享" aria-haspopup="true">\r\n						<i class="list_menu__icon_share"></i>\r\n						<span class="icon_txt">分享</span>\r\n					    </a>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class="songlist__artist">\r\n					';
					for (var s = 0, o = a[i].singer.length; o > s; s++) {
						var l = a[i].singer[s];
						e += "\r\n					", s > 0 && (e += "/"), e += '\r\n					<a href="' + (null == (t = r.util.getSingerUrl(l)) ? "" : t) + '" data-singermid="' + (null == (t = l.mid) ? "" : t) + '" data-singerid="' + (null == (t = l.id) ? "" : t) + '" title="' + (null == (t = l.name) ? "" : _.escape(t)) + '" data-stat="y_new.player.songlist.singername" class="singer_name" data-page="player">' + (null == (t = l.name) ? "" : _.escape(t)) + "</a>\r\n					"
					}
					e += '\r\n                                    </div>\r\n                                    <div class="songlist__time">' + (null == (t = a[i].playTime) ? "" : t) + '</div>\r\n                                    <div class="songlist__other">\r\n					', 1 == a[i].action.soso && (e += '\r\n					<i class="icon_sosomusic">无版权</i>\r\n					'), e += '\r\n                                    </div>\r\n                                    <a href="javascript:;" class="songlist__delete js_delete" data-page="player" data-stat="y_new.player.songlist.delete"><span class="icon_txt">删除</span></a>\r\n                                    <i class="player_songlist__line"></i>\r\n                                </div>\r\n                            </li>\r\n	'
				}
				return e += ""
			};
		a && a.list && a.list.length > 0 ? b.get(function(n) {
			S = n;
			var i = !1,
				r = [];
			S.length > 0 && (r = 1 == a.play ? e(a.list, S) : e(S, a.list), i = !0), c = 1 == a.play ? t(a.list, S) : t(S, a.list), s && b.add(a.list, !0), c.length > 0 ? l(f("#song_box"), c, r, g, a.play, i) : o && o()
		}) : b.get(function(n) {
			n.length > 0 ? l(f("#song_box"), n, [], g) : o && o()
		})
	}

	function s(n) {
		x.mode = n, v.set("y_mod", [x.mode, x.volume, x.trans].join("|")), m.setMode(n)
	}

	function o(n) {
		b.get(function() {
			n && n()
		})
	}

	function l(n) {
		var t = parseInt(n / 60, 10),
			e = n % 60;
		return (10 > t ? "0" + t : t) + ":" + (10 > e ? "0" + e : e)
	} {
		var r = n("js/common/music.js"),
			c = (n("js/common/music/scroller.js"), r.statistics),
			g = n("js/common/module/webplayer.js"),
			m = g.interFace,
			p = n("js/common/module/lrcHandler.js"),
			d = n("js/common/module/qrcHandler.js"),
			u = n("js/common/music/txtpl.js"),
			f = r.$;
		r.jQueryAjax
	}
	window.MUSIC = r;
	var v = n("js/common/music/storage.js"),
		y = (r.widget.user, r.userAgent),
		h = null,
		b = r.player_storage,
		w = {
			player_cover: "//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000"
		},
		I = {
			p: function() {
				try {
					window.console && console.log([].slice.call(arguments).join("	"))
				} catch (n) {}
			}
		},
		j = -1,
		k = null,
		x = {
			volume: 75,
			trans: 0,
			mode: 3
		};
	_playlistBar = {}, _favlistBar = {};
	var S = [],
		q = function() {
			function n() {
				if (_) {
					_ = !1;
					var n = m.getVolumn() || x.volume;
					(0 >= n || n > 100) && (n = 75), o = f("#spanvolumebar")[0], l = f("#spanvolumeop")[0], r = f("#spanvolume")[0], _oMute = f("#spanmute")[0], a(n), f("#voice,#spanvolume").on("click", function(n) {
						n.preventDefault(), n.stopPropagation();
						var t = f(r),
							e = n.pageX;
						_change_vol = parseInt(100 * (e - t.offset().left) / t.width(), 10), a(_change_vol)
					}), f(_oMute).on("click", t), f(l).on("mousedown", function(n) {
						n.preventDefault(), n.stopPropagation();
						var t = f("#voice")[0];
						f(t).on("mousemove", e), f(t).on("mouseup", function() {
							f(t).off("mousemove")
						});
						f("#divplayer");
						f(t).on("mouseout", function() {
							f(t).off("mousemove")
						})
					})
				}
			}

			function t(n) {
				n.preventDefault(), n.stopPropagation(), _ || (f(_oMute).hasClass("btn_big_voice--no") ? (f(_oMute).removeClass("btn_big_voice--no"), f(_oMute).html('<span class="icon_txt">关闭声音</span>')) : (f(_oMute).addClass("btn_big_voice--no"), f(_oMute).html('<span class="icon_txt">打开声音</span>')), m.mutePlayer(), c.pgvClickStat("y_new.player.opbanner.no_voice"))
			}

			function e(n) {
				n.preventDefault(), n.stopPropagation();
				var t = f(r),
					e = n.pageX;
				_change_vol = parseInt(100 * (e - t.offset().left) / t.width(), 10), a(_change_vol)
			}

			function a(n) {
				_ || !isNaN(n) && n >= 0 && 101 > n && (o.style.width = n + "%", m.setVolumn(n), x.volume = n, v.set("y_mod", [x.mode, x.volume, x.trans].join("|")), f(_oMute).hasClass("btn_big_voice--no") && (f(_oMute).removeClass("btn_big_voice--no"), f(_oMute).html('<span class="icon_txt">关闭声音</span>'), m.mutePlayer()))
			}

			function s() {
				var n = m.getVolumn();
				(0 > n || n > 100) && (n = 75), n += 1, a(n)
			}

			function i() {
				var n = m.getVolumn();
				(0 > n || n > 100) && (n = 75), n -= 1, a(n)
			}
			var o, l, r, _ = !0;
			return {
				init: n,
				incVol: s,
				decVol: i,
				mute: t
			}
		}(),
		C = function() {
			function n() {
				i = f("#spanplayer_bgbar")[0], c = f("#downloadbar")[0], o = f("#spanprogress_op")[0], l = f("#spanplaybar")[0], _ = f("#time_show")[0], r = f(i).width() - f(o).width() - 2 * f(o).offset().left - 1, f("#progress,#downloadbar,#spanplayer_bgbar").on("click", function(n) {
					n.preventDefault(), n.stopPropagation();
					var t = f(c),
						a = n.pageX,
						s = parseInt(100 * (a - t.offset().left) / t.width(), 10);
					e(s)
				}), f(l).on("click", function(n) {
					n.preventDefault(), n.stopPropagation();
					var t = f(i),
						a = n.pageX,
						s = parseInt(100 * (a - t.offset().left) / t.width(), 10);
					e(s)
				}), f(o).on("mousedown", function(n) {
					n.preventDefault(), n.stopPropagation();
					var e = (new Date).getTime(),
						a = f(o),
						s = n.pageX,
						l = a.offset().left - f(i).offset().left,
						r = {
							left: l,
							ex: s
						},
						c = f("#progress")[0];
					f(c).on("mousemove", function(n) {
						var a = (new Date).getTime();
						return 300 > a - e ? !1 : (t(n, r), void 0)
					}), f(c).on("mouseup", function() {
						f(c).off("mousemove")
					}), f(c).on("mouseleave", function() {
						f(c).off("mousemove")
					})
				})
			}

			function t(n) {
				n.preventDefault(), n.stopPropagation();
				var t = f("#spanplayer_bgbar").offset().left,
					a = n.pageX,
					s = parseInt(100 * (a - t) / f(i).width(), 10);
				e(s)
			}

			function e(n) {
				if (!isNaN(n) && n >= 0 && 101 > n) {
					var t = m.getDownloadProgress();
					n = Math.min(n, t), l.style.width = n + "%";
					var e = m.getSongDuration(),
						s = n * e / 100,
						i = parseInt(s);
					L._isPlaying ? (m.setPlayProgress(i), a(i)) : T.play(k, function() {
						setTimeout(function() {
							m.setPlayProgress(i), a(i)
						}, 500)
					})
				}
			}

			function a(n) {
				var t = !! (y.safari || y.chrome || y.isiPad || y.isiPhone);
				if (d.haveqrc) {
					if (f('p[data-id="line_' + d.qrcLineIndex + '"]').removeClass("on"), d.getQrcLineItemByPlayTime(parseInt(1e3 * n))) {
						var e = d.qrcLineIndex,
							a = d.lineItem.context,
							s = d.qrcLineIndex,
							i = f('p[data-id="line_' + s + '"]');
						if (i.length > 0) {
							var o = "";
							if (t ? (o = d.getHighlightWords(parseInt(1e3 * n)), "undefined" != typeof o && "" != o && i.addClass("on").html(a)) : (o = a, i.html(o).addClass("on")), s > 0) {
								var l = f('p[data-id="line_' + _ + '"]');
								l.length > 0 && l.removeClass("on")
							}
						}
						d.restartAnimFrame("qrc_ctn")
					}
				} else if (p.haveLrc) {
					var r = f('p[data-id="line_' + p.lrcItemIndex + '"]');
					if (r.length > 0 && r.removeClass("on"), p.getLyricLineItemByPlayTime(p.ms2playTime(parseInt(1e3 * n)))) {
						var e = p.lrcItemIndex,
							c = 0;
						f.each(f(".qrc_ctn"), function(n, t) {
							e = p.lrcItemIndex;
							for (var a = parseInt(f(t).data("mod")); e-- > (1 == a ? 1 : 3);) {
								var s = f('p[data-id="line_' + e + '"]', f(t))[0];
								c += s ? s.offsetHeight : 1 == a ? 24 : 0
							}
							f(t).parent(".js_lyric_box").scrollTop(c)
						});
						var _ = -1 == p.preLrcItemIndex ? "null" : p.preLrcItemIndex,
							s = p.lrcItemIndex,
							i = f('p[data-id="line_' + s + '"]');
						if (i.length > 0 && (i.html(p.lrcItem.context).addClass("on"), f(".js_trans_btn").hasClass("btn_lang--select") ? f(".js_trans_line").show() : f(".js_trans_line").hide(), s > 0)) {
							var l = f('p[data-id="line_' + _ + '"]');
							l.length > 0 && l.removeClass("on")
						}
						p.restartAnimFrame("qrc_ctn")
					}
				}
			}

			function s() {
				f(i).off("click"), f(l).off("click"), f(o).off("mousedown")
			}
			var i, o, l, r, c, _ = null;
			return {
				init: n,
				destroy: s
			}
		}(),
		P = !0,
		L = function() {
			function t(n, t) {
				var e = new Image;
				t = t || "74", e.src = "//c.y.qq.com/tplcloud/fcgi-bin/fcg_reportlsting_web.fcg?musicid=" + t + "&isexit=" + n + "&g_tk=" + r.getACSRFToken() + "&_r=" + (new Date).valueOf(), e.style.width = "0", e.style.height = "0"
			}

			function e() {
				f("#opbanner, #song_info").off("click", ".js_song").on("click", ".js_song", function() {
					var n = f(this).data("mid"),
						t = f(this).data("id"),
						e = f(this).data("songtype"),
						a = f(this).data("shareuin"),
						s = f(this).data("disstid"),
						i = {
							mid: n
						};
					t && (i.id = t), e && (i.songtype = e), a && (i.shareuin = a), s && (i.disstid = s), r.util.gotoSongdetail(i)
				}).off("click", ".js_singer").on("click", ".js_singer", function() {
					var n = f(this).data("singermid"),
						t = f(this).data("stat") || "",
						e = {
							singermid: n
						};
					t && (e.stat = t), r.util.gotoSinger(e)
				}).off("click", ".js_album").on("click", ".js_album", function() {
					var n = f(this).data("albummid"),
						t = f(this).data("stat") || "",
						e = {
							albummid: n
						};
					t && (e.stat = t), 0 != parseInt(n) && r.util.gotoAlbum(e)
				}).on("click", "#btnplay", function(n) {
					P && (c.pgvClickStat("y_new.player.opbanner.play_btn"), P = !0);
					var t = a;
					return "g_first_play" == t ? (n.preventDefault(), n.stopPropagation(), T.play(), void 0) : "g_play" == t ? (n.preventDefault(), n.stopPropagation(), m.pausePlayer(), d.haveqrc && d.stopAnimFrame(), p.haveLrc && p.stopAnimFrame(), void 0) : ("g_pause" == t && (n.preventDefault(), n.stopPropagation(), m.startPlayer(), d.haveqrc ? d.startAnimFrame("qrc_ctn") : p.haveLrc && p.startAnimFrame("qrc_ctn")), "g_wait" == t && m.startPlayer(), void 0)
				}).on("click", ".btn_big_prev", function(n) {
					L.prev(n), c.pgvClickStat("y_new.player.opbanner.prev")
				}).on("click", ".btn_big_next", function(n) {
					L.next(n), c.pgvClickStat("y_new.player.opbanner.next")
				}).on("click", "#play_mod", function() {
					L.realSetPlayWay()
				}).on("click", "#simp_btn", function() {
					c.pgvClickStat("y_new.player.opbanner.clear_mod"), f(this).hasClass("btn_big_only--on") ? (f(this).removeClass("btn_big_only--on"), f(this).attr("title", "打开纯净模式"), f(".js_full_box").show(), f(".js_simp_box").hide()) : (f(this).addClass("btn_big_only--on"), f(this).attr("title", "关闭纯净模式"), f(".js_full_box").hide(), f(".js_simp_box").show())
				})
			}
			var a = "g_first_play",
				i = null,
				o = function(n, t) {
					var e = f("#btnplay"),
						s = n || "pause",
						i = t || "g_pause";
					"pause" == s ? (f(".js_play", f("#song_box .songlist__item--playing")).attr("title", "播放").html('<i class="list_menu__icon_play"></i><span class="icon_txt">播放</span>'), f("#song_box .songlist__item--playing").removeClass("songlist__item--playing"), e.removeClass("btn_big_play--pause"), f("span", e).html("播放")) : (L._curSongInfo && (f("div.songlist__item", f('li[mid="' + L._curSongInfo.songid + '"]')).addClass("songlist__item--playing"), f(".js_play", f('li[mid="' + L._curSongInfo.songid + '"]')).attr("title", "暂停").html('<i class="list_menu__icon_pause"></i><span class="icon_txt">暂停</span>')), e.addClass("btn_big_play--pause"), f("span", e).html("暂停")), a = i
				};
			return {
				_setQQstatus: t,
				_isPlaying: !1,
				_isFirst: !0,
				_curSongInfo: null,
				_errorPlayId: [],
				clearlist: !1,
				init: function() {
					m.OnSongPlayBegin = function(n) {
						I.p("OnSongPlayBegin begin:" + (new Date).getUTCMilliseconds()), L._isPlaying = !0, L._curSongInfo = n, setTimeout(function() {
							var t = parseInt(parseInt(f(".sb_scrollable").css("height")) / 50) - 2;
							f(".sb_overview").scrollTop() < 50 * (n.ix - t) ? (!y.webkit && h && h.scrollbar("scrollToY", 50 * (n.ix - t)), y.webkit && (f(".sb_overview")[0].scrollTop = 50 * (n.ix - t))) : f(".sb_overview").scrollTop() > 50 * n.ix && (!y.webkit && h && h.scrollbar("scrollToY", 50 * n.ix), y.webkit && (f(".sb_overview")[0].scrollTop = 50 * n.ix))
						}, 1e3), "mod_songname_menu__like--liked" == n.fav ? (f(".js_btn_fav", "#opbanner").addClass("btn_big_like--like"), f(".js_btn_fav").attr("title", "取消喜欢")) : (f(".js_btn_fav", "#opbanner").removeClass("btn_big_like--like"), f(".js_btn_fav").attr("title", "喜欢")), setTimeout(function() {
							d.clearQrcInfo(), !! n && d.init({
								songtype: n.songtype,
								songMId: n.songmid,
								songId: n.songid,
								qrcContainer: "qrc_ctn"
							}), p.clearLrcInfo()
						}, 200), v.get("y_mod", function(n) {
							if (n) {
								var t = n.split("|");
								t.length > 0 && (x.mode = parseInt(t[0])), t.length > 1 && (x.volume = parseInt(t[1])), t.length > 2 && (x.trans = parseInt(t[2]))
							}
							1 == x.trans ? (f(".js_trans_btn").removeClass("btn_lang--select"), f(".js_trans_line").show()) : (f(".js_trans_line").hide(), f(".js_trans_btn").addClass("btn_lang--select")), q.init()
						}), C.init(), L.renderSong(n), setTimeout(function() { !! n && t(!1, n.songid)
						}, 700)
					}, m.OnSongPlayEnd = function() {
						L._isPlaying = !1, o("pause", "g_play"), d.haveqrc ? d.clearQrcInfo() : p.haveLrc && p.clearLrcInfo()
					}, m.OnSongPlaying = function(n, t) {
						if (-1 == j && (j = 0), !isNaN(n) && !isNaN(t)) {
							var e = !! (y.safari || y.chrome || y.isiPad || y.isiPhone),
								a = e ? parseInt(n / 1e3) : n,
								s = f(".qrc_ctn");
							if (L._isPlaying) {
								if (f("#time_show").html(l(parseInt(a, 10)) + " / " + l(t)), f("#spanplaybar").width(parseInt(100 * a / t, 10) + "%"), d.reqFlag) return;
								var i = f("p", s).length > 1 ? f("p:eq(1)", s) : "";
								if (d.haveqrc && ("歌词正在加载中..." == i || "" == i)) return s.html('<p data-id="line_null" class="on">&nbsp;</p>' + d.printQrcLines()), d.startAnimFrame("qrc_ctn"), void 0;
								if (!d.haveqrc && -1 == p.reqFlag) return p.init(d.playingSongInfo), void 0;
								if (!d.haveqrc && 0 == p.reqFlag) return;
								if (!d.haveqrc && 1 == p.reqFlag) {
									if (p.haveLrc && ("歌词正在加载中..." == i || "" == i)) {
										var o = p.printLrcLines();
										return "" == o ? (p.haveLrc = !1, '<p>&nbsp;</p><p><a href="//support.qq.com/write.shtml?fid=602" target="_blank">该单曲暂无歌词，点击这里进行反馈</a></p>' != s.html() && 0 == p.txtLrc && s.html('<p>&nbsp;</p><p><a href="//support.qq.com/write.shtml?fid=602" target="_blank">该单曲暂无歌词，点击这里进行反馈</a></p>'), void 0) : (s.html('<p data-id="line_null" class="on">&nbsp;</p>' + o), p.startAnimFrame("qrc_ctn"), void 0)
									}
									if (!p.haveLrc) return '<p>&nbsp;</p><p><a href="//support.qq.com/write.shtml?fid=602" target="_blank">该单曲暂无歌词，点击这里进行反馈</a></p>' != s.html() && 0 == p.txtLrc && s.html('<p>&nbsp;</p><p><a href="//support.qq.com/write.shtml?fid=602" target="_blank">该单曲暂无歌词，点击这里进行反馈</a></p>'), void 0
								}
								if (d.haveqrc) {
									if (d.getQrcLineItemByPlayTime(e ? n : 1e3 * n)) {
										var r = d.lineItem.context,
											c = d.qrcLineIndex - 1 < 0 ? "null" : d.qrcLineIndex - 1,
											_ = d.qrcLineIndex,
											g = f('p[data-id="line_' + _ + '"]');
										if (_pNode.length > 0) {
											var m = "";
											if (e ? (m = d.getHighlightWords(e ? n : 1e3 * n), "undefined" != typeof m && "" != m && g.html(r).addClass("on")) : (m = r, g.html(m).addClass("on")), _ > 0) {
												var u = f('p[data-id="line_' + c + '"]');
												u.length > 0 && u.removeClass("on")
											}
										}
									}
								} else if (p.haveLrc) {
									if (p.getLyricLineItemByPlayTime(p.ms2playTime(e ? n : 1e3 * n))) {
										var c = -1 == p.preLrcItemIndex ? "null" : p.preLrcItemIndex,
											_ = p.lrcItemIndex,
											g = f('p[data-id="line_' + _ + '"]');
										g.length > 0 && _ != c && (g.html(p.lrcItem.context), f(".js_trans_btn").hasClass("btn_lang--select") ? f(".js_trans_line").show() : f(".js_trans_line").hide(), g.addClass("on"), _ > 0 && f('p[data-id="line_' + c + '"]').removeClass("on"))
									}
								} else '<p>&nbsp;</p><p><a href="//support.qq.com/write.shtml?fid=602" target="_blank">该单曲暂无歌词，点击这里进行反馈</a></p>' != s.html() && 0 == p.txtLrc && s.html('<p>&nbsp;</p><p><a href="//support.qq.com/write.shtml?fid=602" target="_blank">该单曲暂无歌词，点击这里进行反馈</a></p>')
							}
						}
					}, m.OnPlaying = function() {
						o("play", "g_play"), L._errorPlayId = []
					}, m.OnPlayPause = function() {
						o("pause", L.clearlist ? "g_first_play" : "g_pause")
					}, m.OnPlayError = function(n) {
						3 == n.type || 0 == n.type && 1 == n.action.soso;
						if (!L._errorPlayId[n.playid]) {
							L._errorPlayId[n.playid] = 1;
							var t = f("#song_box");
							if (t.length > 0) {
								var e = f("li", t);
								e && e.length > 1 && m.nextPlayer()
							}
						}
					}, m.OnSongDownloading = function(n) {
						var t = f("#downloadbar");
						t.length > 0 && t.width(n + "%")
					}, v.get("y_mod", function(n) {
						if (n) {
							var t = n.split("|");
							t.length > 0 && (x.mode = parseInt(t[0])), t.length > 1 && (x.volume = parseInt(t[1])), t.length > 2 && (x.trans = parseInt(t[2]))
						}
						L.realSetPlayWay(x.mode), s(x.mode), m.setVolumn(x.volume)
					}), L.renderSong(), e()
				},
				setPlayBtnStatus: function() {},
				renderSong: function(n) {
					function t() {
						document.title = s.substring(o, s.length) + s.substring(0, o), o++, o > s.length && (o = 0), i = setTimeout(function() {
							t()
						}, 500)
					}

					function e(n) {
						var t = [];
						return f.each(n, function(n, e) {
							t.push(u(g, e)), p.push(e.name)
						}), t.join(" / ")
					}
					I.p("renderSong begin:" + (new Date).getUTCMilliseconds());
					var a = f("#song_box");
					if (!n) return f("#sim_song_info,#song_name,#singer_name,#album_name,#time_show").html(""), f("#song_pic").parents("a.js_album").data("albummid", 0), f("#backImg").css("backgroundImage", ""), f("#song_pic").attr("src", w.player_cover), f("body").css("backgroundColor", "#292a2b"), void 0;
					i && clearTimeout(i), document.title = "正在播放 " + n.songname + (n.singername ? "-" + n.singername : "");
					var s = document.title;
					s = "…" + s;
					var o = 0;
					y.sougou || t();
					var l = n.ix;
					if (a.length > 0) {
						var c = f("li", a);
						c.length > l && (f(".js_play", f("#song_box .songlist__item--playing")).attr("title", "播放").html('<i class="list_menu__icon_play"></i><span class="icon_txt">播放</span>'), f("div.songlist__item").removeClass("songlist__item--playing"), L._curSongInfo && (f("div.songlist__item", f('li[mid="' + L._curSongInfo.songid + '"]')).addClass("songlist__item--playing"), f(".js_play", f('li[mid="' + L._curSongInfo.songid + '"]')).attr("title", "暂停").html('<i class="list_menu__icon_pause"></i><span class="icon_txt">暂停</span>')))
					}
					var _ = '<a href="<%= songurl %>#stat=y_new.player.info_area.songname" title="<%= songname %>" class="js_song" data-stat="y_new.player.info_area.songname" data-mid="<%= songmid %>" data-id="<%= songid %>" data-songtype="<%= songtype %>" data-disstid="<%= disstid %>" target="_blank"><%= songname %></a> - <%= singershtml%>',
						g = '<a href="//y.qq.com/portal/singer/<%= mid %>.html#stat=y_new.player.info_area.singername" title="<%= name %>" class="js_singer" data-stat="y_new.player.info_area.singername" data-singermid="<%= mid %>" target="_blank"><%= name %></a>',
						m = '<a title="<%= songname %>"><%= songname %></a> - <a title="<%= singername %>"><%= singername %></a>',
						p = [];
					if (f("#sim_song_info,#song_name,#singer_name,#album_name,#time_show").html(""), n && n.songmid && "" != n.songmid ? f("#sim_song_info").html(u(_, {
						songurl: r.util.getSongUrl(n),
						songname: n.songname,
						songmid: n.songmid,
						songid: n.songid,
						songtype: n.songtype,
						disstid: n.disstid ? n.disstid : "",
						singershtml: e(n.singer)
					})) : f("#sim_song_info").html(u(m, {
						songname: n.songname,
						singername: n.singername
					})), n.albummid && "" != n.albummid) {
						f("#song_pic").parents("a.js_album").data("albummid", n.albummid);
						var d = new Image;
						d.src = r.util.getAlbumPic({
							mid: n.albummid,
							type: 300
						}), f("#song_pic").attr("src", d.src), d.style.width = "0", d.style.height = "0", d.onload = function() {
							f("#backImg").css("backgroundImage", "url(" + d.src + ")"), f("#song_pic").attr("src", d.src)
						}, r.jQueryAjax.jsonp({
							url: "//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=" + n.albummid,
							charset: "utf-8",
							jsonpCallback: "albuminfoCallback",
							success: function(n) {
								0 == n.code && n.data.color > 0 ? f("body").css("backgroundColor", "#" + n.data.color.toString(16)) : f("body").css("backgroundColor", "#292a2b")
							},
							error: function() {
								f("body").css("backgroundColor", "#292a2b")
							}
						}), 111 == n.songtype || 112 == n.songtype || 113 == n.songtype ? f("#song_name").html("歌曲名：<a href='//y.qq.com/portal/song2/" + n.songtype + "/" + n.songid + ".html#stat=y_new.player.info_area.songname' title='" + n.songname + "' target='_blank'>" + n.songname + "</a>") : n.songmid ? f("#song_name").html("歌曲名：<a href='//y.qq.com/portal/song/" + n.songmid + ".html#stat=y_new.player.info_area.songname' title='" + n.songname + "' target='_blank'>" + n.songname + "</a>") : f("#song_name").html("歌曲名：" + n.songname), n.singer.length > 0 && n.singer[0].id > 0 && f("#singer_name").html("歌手名：" + e(n.singer)), n.albumid > 0 && f("#album_name").html("专辑名：<a href='//y.qq.com/portal/album/" + n.albummid + ".html#stat=y_new.player.info_area.albumname' title='" + n.albumname + "' target='_blank'>" + n.albumname + "</a>")
					} else {
						f("#song_pic").parents("a.js_album").data("albummid", 0);
						var d = new Image;
						d.src = w.player_cover, d.style.width = d.style.height = "0", d.onload = function() {
							f("#backImg").css("backgroundImage", ""), f("body").css("backgroundColor", "#292a2b"), f("#song_pic").attr("src", w.player_cover)
						}, n && (111 == n.songtype || 112 == n.songtype || 113 == n.songtype ? (f("#song_name").html("歌曲名：<a href='//y.qq.com/portal/song2/" + n.songtype + "/" + n.songid + ".html#stat=y_new.player.info_area.songname' title='" + n.songname + "' target='_blank'>" + n.songname + "</a>"), n.singer.length > 0 && n.singer[0].id > 0 && f("#singer_name").html("歌手名：" + e(n.singer))) : (f("#song_name").html("歌曲名：" + n.songname), f("#singer_name").html("歌手名：" + n.singername), f("#album_name").html("")))
					}
					I.p("renderSong end:" + (new Date).getUTCMilliseconds())
				},
				resetLikeIcon: function() {},
				updateSongLike: function() {},
				songHover: function() {},
				play: function(n, t, e) {
					if (I.p("play begin:" + (new Date).getUTCMilliseconds()), t && 1 == t) return P = !1, f("#btnplay").click(), void 0;
					var a = 0;
					n && n.length > 0 && (a = n[0].ix), j = 0, r.cookie.set("yq_index", a, null, "/portal", .1), m.playAnyPos(a), e && e()
				},
				trogglePlay: function() {},
				prev: function(n) {
					n.preventDefault(), n.stopPropagation(), m.lastPlayer()
				},
				next: function(n) {
					n.preventDefault(), n.stopPropagation();
					var t = this;
					b.get(function() {
						-1 == j ? t.play() : m.nextPlayer()
					})
				},
				like: function() {},
				share: function() {},
				_objSong: null,
				fav: function(t, e, a, s) {
					t = t || L._curSongInfo, t && n.async("js/common/fav.js", function(n) {
						e ? n.like([t], function() {
							a && a()
						}) : n.unlike([t], function() {
							s && s()
						})
					})
				},
				download: function(t) {
					t = t || L._curSongInfo, t && n.async("js/common/download.js", function(n) {
						n.show([t])
					})
				},
				add: function() {},
				delBatch: function(n) {
					function t(n, t) {
						return t.ix - n.ix
					}
					var e = [];
					n.sort(t), f.each(n, function(n, t) {
						e.push(t.ix), L.del(t)
					}), b.delBatch(e)
				},
				del: function(n) {
					var t = n.ix;
					t >= 0 && !m.delSong(t) && (L.renderSong(), L._isPlaying = !1, m.stopPlayer())
				},
				insert: function() {},
				clearList: function() {},
				setPlayWay: function() {},
				modIndex: 0,
				realSetPlayWay: function(n) {
					n = n || -1;
					var t = ["顺序播放", "随机播放", "单曲循环", "列表循环"],
						e = [2, 4, 1, 3],
						a = ["btn_big_style_order", "btn_big_style_random", "btn_big_style_single", "btn_big_style_list"];
					if (n >= 0) for (var s in e) n == e[s] && (L.modIndex = parseInt(s));
					else L.modIndex++;
					L.modIndex > 3 && (L.modIndex = 0), f("#play_mod")[0].className = a[L.modIndex], f("#play_mod").html('<span class="icon_txt">' + t[L.modIndex] + "</span>").attr("title", t[L.modIndex]), m.setMode(e[L.modIndex]), x.mode = e[L.modIndex], v.set("y_mod", [x.mode, x.volume].join("|")), 0 > n && c.pgvClickStat("y_new.player.opbanner." + a[L.modIndex].replace("btn_big_style", "play_mod"))
				},
				getCurSongInfo: function() {
					return L._curSongInfo
				}
			}
		}(),
		T = {
			init: function() {
				m.init({
					fromtag: 30,
					statFromtag: 7,
					errorTips: function(n, t) {
						r.popup.show(n + t, 3e3, 1)
					}
				}), L.init(), f(window).unload(function() {
					f.jStorage.set("PLAYER_EXISTS", !1)
				}), f.jStorage.set("PLAYER_EXISTS", !0), f.jStorage.reInit();
				var n = f.jStorage.get("addplaylist");
				o(function() {
					a(n, !0, function() {}), f.jStorage.deleteKey("addplaylist")
				}), f.jStorage.subscribe("addplaylist", function(n, t) {
					t.list.length > 0 && (f.jStorage.publish("addplaylist", {
						list: [],
						play: 0
					}), a(t, !0, function() {})), r.cookie.set("player_exist", 1)
				}), y.webkit && f(".sb_overview").css({
					height: f(".player__bd").height() - 56
				}), f(".qrc_ctn").on("mousedown", function(n) {
					n.preventDefault(), n.stopPropagation(), window.getlyricflag = !0, d.haveqrc ? d.stopAnimFrame("qrc_ctn") : p.haveLrc && p.stopAnimFrame("qrc_ctn");
					var t = [],
						e = n.pageY;
					f.each(f(".qrc_ctn"), function(n, e) {
						t[n] = f(e).parent(".js_lyric_box").scrollTop()
					}), f(document).on("mousemove", function(n) {
						d.haveqrc ? d.stopAnimFrame() : p.haveLrc && p.stopAnimFrame(), d.haveqrc || (p.haveLrc || p.txtLrc) && f.each(f(".qrc_ctn"), function(a, s) {
							f(s).parent(".js_lyric_box").scrollTop(t[a] + (e - n.pageY))
						})
					}), f(document).on("mouseup", function() {
						f(document).off("mousemove"), setTimeout(function() {
							d.haveqrc ? d.startAnimFrame("qrc_ctn") : p.haveLrc && p.startAnimFrame("qrc_ctn"), window.getlyricflag = !1
						}, 3e3)
					})
				}), f(".js_btn_fav", "#opbanner").on("click", function() {
					var n = f(this);
					L.fav(null, f(this).hasClass("btn_big_like--like") ? 0 : 1, function() {
						n.addClass("btn_big_like--like")
					}, function() {
						n.removeClass("btn_big_like--like")
					}), c.pgvClickStat("y_new.player.opbanner.love")
				}), f(".js_btn_down", "#opbanner").on("click", function() {
					L.download(null), c.pgvClickStat("y_new.player.opbanner.download")
				}), f(document).on("like", function(n, t) {
					var e = [],
						a = t.data,
						s = t.flag;
					f.each(a, function(n, t) { !! t && e.push(t.songid), L._curSongInfo && t && t.songid == L._curSongInfo.songid && (s ? f(".js_btn_fav", "#opbanner").addClass("btn_big_like--like") : f(".js_btn_fav", "#opbanner").removeClass("btn_big_like--like"), s ? f(".js_btn_fav").attr("title", "取消喜欢") : f(".js_btn_fav").attr("title", "喜欢"))
					}), m.setSongsFavStatus(e, s ? "mod_songname_menu__like--liked" : "")
				}), f(document).on("delete", function(n, t) {
					var e = t.data;
					L.delBatch(e), L._curSongInfo && (f(".js_play", f("#song_box .songlist__item--playing")).attr("title", "播放").html('<i class="list_menu__icon_play"></i><span class="icon_txt">播放</span>'), f("div.songlist__item").removeClass("songlist__item--playing"), f("div.songlist__item", f('li[mid="' + L._curSongInfo.songid + '"]')).addClass("songlist__item--playing"), f(".js_play", f('li[mid="' + L._curSongInfo.songid + '"]')).attr("title", "暂停").html('<i class="list_menu__icon_pause"></i><span class="icon_txt">暂停</span>')), h && h.resize()
				}), f(document).on("click", ".js_trans_btn", function() {
					var n = f(".btn_big_only--on").length > 0;
					f(this).hasClass("btn_lang--select") ? (f(".js_trans_btn").removeClass("btn_lang--select"), f(".js_trans_line").show(), x.trans = 1, c.pgvClickStat("y_new.player.translyric.close" + (n ? ".clear" : ""))) : (f(".js_trans_line").hide(), f(".js_trans_btn").addClass("btn_lang--select"), x.trans = 0, c.pgvClickStat("y_new.player.translyric.open" + (n ? ".clear" : ""))), v.set("y_mod", [x.mode, x.volume, x.trans].join("|"))
				}), f(window).resize(function() {
					y.webkit && f(".sb_overview").css({
						height: f(".player__bd").height() - 56
					})
				})
			},
			play: L.play
		};
	return T
}); /*  |xGv00|6b350aa093363fe11c4cef6c390a541a */