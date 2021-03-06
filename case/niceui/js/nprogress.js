(function(f, h) {
    "function" === typeof define && define.amd ? define(h) : "object" === typeof exports ? module.exports = h() : f.NProgress = h()
})(this, function() {
    function f(a, b, c) {
        return a < b ? b : a > c ? c : a
    }

    function h(a, b, c) {
        a = "translate3d" === e.positionUsing ? {
            transform: "translate3d(" + 100 * (-1 + a) + "%,0,0)"
        } : "translate" === e.positionUsing ? {
            transform: "translate(" + 100 * (-1 + a) + "%,0)"
        } : {
            "margin-left": 100 * (-1 + a) + "%"
        };
        a.transition = "all " + b + "ms " + c;
        return a
    }

    function m(a, b) {
        return 0 <= ("string" == typeof a ? a : k(a)).indexOf(" " + b + " ")
    }

    function n(a, b) {
        var c = k(a),
            d = c + b;
        m(c, b) || (a.className = d.substring(1))
    }

    function p(a, b) {
        var c = k(a);
        m(a, b) && (c = c.replace(" " + b + " ", " "), a.className = c.substring(1, c.length - 1))
    }

    function k(a) {
        return (" " + (a.className || "") + " ").replace(/\s+/gi, " ")
    }
    var d = {
            version: "0.1.6"
        },
        e = d.settings = {
            minimum: .08,
            easing: "ease",
            positionUsing: "",
            speed: 200,
            trickle: !0,
            trickleRate: .02,
            trickleSpeed: 800,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            parent: "body",
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        };
    d.configure = function(a) {
        var b, c;
        for (b in a) c = a[b], void 0 !== c && a.hasOwnProperty(b) && (e[b] = c);
        return this
    };
    d.status = null;
    d.set = function(a) {
        var b = d.isStarted();
        a = f(a, e.minimum, 1);
        d.status = 1 === a ? null : a;
        var c = d.render(!b),
            t = c.querySelector(e.barSelector),
            l = e.speed,
            u = e.easing;
        c.offsetWidth;
        v(function(b) {
            "" === e.positionUsing && (e.positionUsing = d.getPositioningCSS());
            q(t, h(a, l, u));
            1 === a ? (q(c, {
                transition: "none",
                opacity: 1
            }), c.offsetWidth, setTimeout(function() {
                q(c, {
                    transition: "all " + l + "ms linear",
                    opacity: 0
                });
                setTimeout(function() {
                    d.remove();
                    b()
                }, l)
            }, l)) : setTimeout(b, l)
        });
        return this
    };
    d.isStarted = function() {
        return "number" === typeof d.status
    };
    d.start = function() {
        d.status || d.set(0);
        var a = function() {
            setTimeout(function() {
                d.status && (d.trickle(), a())
            }, e.trickleSpeed)
        };
        e.trickle && a();
        return this
    };
    d.done = function(a) {
        return a || d.status ? d.inc(.3 + .5 * Math.random()).set(1) : this
    };
    d.inc = function(a) {
        var b = d.status;
        return b ? ("number" !== typeof a && (a = (1 - b) * f(Math.random() * b, .1, .95)), b = f(b + a, 0, .994), d.set(b)) : d.start()
    };
    d.trickle = function() {
        return d.inc(Math.random() * e.trickleRate)
    };
    (function() {
        var a = 0,
            b = 0;
        d.promise = function(c) {
            if (!c || "resolved" == c.state()) return this;
            0 == b && d.start();
            a++;
            b++;
            c.always(function() {
                b--;
                0 == b ? (a = 0, d.done()) : d.set((a - b) / a)
            });
            return this
        }
    })();
    d.render = function(a) {
        if (d.isRendered()) return document.getElementById("nprogress");
        n(document.documentElement, "nprogress-busy");
        var b = document.createElement("div");
        b.id = "nprogress";
        b.innerHTML = e.template;
        var c = b.querySelector(e.barSelector),
            f = a ? "-100" : 100 * (-1 + (d.status || 0));
        a = document.querySelector(e.parent);
        q(c, {
            transition: "all 0 linear",
            transform: "translate3d(" + f + "%,0,0)"
        });
        e.showSpinner || (c = b.querySelector(e.spinnerSelector)) && c && c.parentNode && c.parentNode.removeChild(c);
        a != document.body && n(a, "nprogress-custom-parent");
        a.appendChild(b);
        return b
    };
    d.remove = function() {
        p(document.documentElement, "nprogress-busy");
        p(document.querySelector(e.parent), "nprogress-custom-parent");
        var a = document.getElementById("nprogress");
        a && a && a.parentNode && a.parentNode.removeChild(a)
    };
    d.isRendered = function() {
        return !!document.getElementById("nprogress")
    };
    d.getPositioningCSS = function() {
        var a = document.body.style,
            b = "WebkitTransform" in a ? "Webkit" : "MozTransform" in a ? "Moz" : "msTransform" in a ? "ms" : "OTransform" in a ? "O" : "";
        return b + "Perspective" in a ? "translate3d" : b + "Transform" in a ? "translate" : "margin"
    };
    var v = function() {
            function a() {
                var c = b.shift();
                c && c(a)
            }
            var b = [];
            return function(c) {
                b.push(c);
                1 == b.length && a()
            }
        }(),
        q = function() {
            function a(a) {
                return a.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(a, b) {
                    return b.toUpperCase()
                })
            }

            function b(b) {
                b = a(b);
                var e;
                if (!(e = d[b])) {
                    e = b;
                    a: {
                        var r = document.body.style;
                        if (!(b in r))
                            for (var f = c.length, h = b.charAt(0).toUpperCase() + b.slice(1), g; f--;)
                                if (g = c[f] + h, g in r) {
                                    b = g;
                                    break a
                                }
                    }
                    e = d[e] = b
                }
                return e
            }
            var c = ["Webkit", "O", "Moz", "ms"],
                d = {};
            return function(a, d) {
                var c = arguments,
                    e, f;
                if (2 == c.length)
                    for (e in d) {
                        if (f = d[e], void 0 !== f && d.hasOwnProperty(e)) {
                            var c = a,
                                g = e,
                                g = b(g);
                            c.style[g] = f
                        }
                    } else e = a, g = c[1], c = c[2], g = b(g), e.style[g] = c
            }
        }();
    return d
});
var PUBLIC_URL = "http://" + window.location.host + "/public";
function get_html(f, h, m, n, p, k, d) {
    $.getJSON(f, {
        con: h,
        act: m,
        cid: n,
        category_id: p,
        id: k,
        page: d
    }, function(d) {})
}
function clear() {
    Source = document.body.firstChild.data;
    document.open();
    document.close();
    document.body.innerHTML = Source
};