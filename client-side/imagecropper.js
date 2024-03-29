! function t(e, n, i) {
	function r(a, s) {
		if (!n[a]) {
			if (!e[a]) {
				var u = "function" == typeof require && require;
				if (!s && u) return u(a, !0);
				if (o) return o(a, !0);
				throw new Error("Cannot find module '" + a + "'")
			}
			var f = n[a] = {
				exports: {}
			};
			e[a][0].call(f.exports, function(t) {
				var n = e[a][1][t];
				return r(n ? n : t)
			}, f, f.exports, t, e, n, i)
		}
		return n[a].exports
	}
	for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
	return r
}({
	1: [function(t, e, n) {
		(function(n) {
			"use strict";

			function i(t) {
				return t = t || {}, this.options = {}, r.extend(this.options, this.defaults, t), this.quality(this.options.quality), this
			}
			var r = t("./utils"),
				o = t("./polyfills"),
				a = r.isElectron(),
				s = r.isNW(),
				u = r.isBrowser(),
				f = u || a || s;
			i.prototype.defaults = {
				canvas: null,
				quality: 92,
				maxQuality: 100,
				minQuality: 1,
				bufsize: 4096
			}, i.prototype.loadImageFromMemory = function(t) {
				var e = this.options;
				t = t || this.originalImage;
				var n = t.width,
					i = t.height,
					o = this.__createCanvas(n, i),
					a = o.getContext("2d");
				return a.drawImage(t, 0, 0, n, i), this.canvas = o, e.imageFormat = e.imageFormat || r.getImageFormat(t.src), this.originalImage || (this.originalImage = t), this
			}, i.prototype.loadImageFromUrl = function(t, e) {
				var n = this,
					i = this.options,
					o = this.__createImage();
				i.imageFormat = i.imageFormat || r.getImageFormat(t), o.onload = function() {
					n.loadImageFromMemory(o), e.call(n)
				}, o.src = t
			}, i.prototype.image = function(t, e) {
				var n = this.options,
					i = r.type(t);
				if ("String" !== i && "Image" !== i && "HTMLImageElement" !== i) throw new Error("invalid arguments");
				if ("String" === i) {
					if (!e) throw new Error("callback must be specified when load from path");
					n.imageFormat = n.imageFormat || r.getImageFormat(t), this.loadImageFromUrl(t, function() {
						e.call(this)
					})
				} else if ("Image" === i || "HTMLImageElement" === i) return n.imageFormat = n.imageFormat || r.getImageFormat(t.src), this.loadImageFromMemory(t), e && "Function" === r.type(e) && (e.call(this), console.warn("No need to specify callback when load from memory, please use chain-capable method directly like this: clipper(Image).crop(...).resize(...)")), this
			}, i.prototype.crop = function(t, e, n, i) {
				var r = this.canvas,
					o = r.getContext("2d"),
					a = o.getImageData(t, e, n, i),
					s = this.__createCanvas(n, i),
					u = s.getContext("2d");
				return u.rect(0, 0, n, i), u.fillStyle = "white", u.fill(), u.putImageData(a, 0, 0), this.canvas = s, this
			}, i.prototype.toFile = function(t, e) {
				var n = this,
					i = this.options,
					r = i.imageFormat;
				return this.toDataURL(function(i) {
					u ? e.call(n, i) : this.dataUrlToFile(t, i, r, function() {
						e.call(n)
					})
				}), this
			}, i.prototype.dataUrlToFile = function(t, e, i, r) {
				var a = this,
					s = e.replace("data:" + i + ";base64,", ""),
					u = new n(s, "base64");
				o.writeFile(t, u, function() {
					r.call(a)
				})
			}, i.prototype.resize = function(t, e) {
				var n, i, r = this.canvas;
				if (!arguments.length) throw new Error("resize() must be specified at least one parameter");
				if (1 === arguments.length) {
					if (!t) throw new Error("resize() inappropriate parameter");
					n = t / r.width, e = r.height * n
				} else !t && e && (i = e / r.height, t = r.width * i);
				var o = this.__createCanvas(t, e),
					a = o.getContext("2d");
				return a.drawImage(r, 0, 0, t, e), this.canvas = o, this
			}, i.prototype.clear = function(t, e, n, i) {
				var r = this.canvas,
					o = r.getContext("2d");
				return o.clearRect(t, e, n, i), o.fillStyle = "#fff", o.fillRect(t, e, n, i), this
			}, i.prototype.quality = function(t) {
				if ("Number" !== r.type(t) && "String" !== r.type(t)) throw new Error("Invalid arguments");
				if (!t) return this;
				var e = this.options;
				return t = parseFloat(t), t = r.rangeNumber(t, e.minQuality, e.maxQuality), e.quality = t, this
			}, i.prototype.toDataURL = function(t, e) {
				var n = this,
					i = this.options,
					a = i.quality,
					s = i.minQuality,
					u = i.maxQuality,
					c = i.imageFormat,
					l = i.bufsize;
				"string" == typeof t && (t = parseFloat(t)), 0 === arguments.length ? t = a : 1 === arguments.length ? "number" == typeof t ? t = r.rangeNumber(t, s, u) : "function" == typeof t && (e = t, t = a) : 2 === arguments.length && (t = r.rangeNumber(t, s, u));
				var p = this.canvas;
				if (f) {
					var d = p.toDataURL(c, t / 100);
					return e && e.call(this, d), d
				}
				if (!e) throw new Error("toDataURL(): callback must be specified");
				return o.toDataURL({
					canvas: p,
					imageFormat: c,
					quality: t,
					bufsize: l
				}, function(t) {
					e.call(n, t)
				}), this
			}, i.prototype.configure = function(t, e) {
				var n = this.options;
				return r.setter(n, t, e), n.quality && this.quality(n.quality), this
			}, i.prototype.getCanvas = function() {
				return this.canvas
			}, i.prototype.destroy = function() {
				return this.canvas = null, this
			}, i.prototype.reset = function() {
				return this.destroy().loadImageFromMemory()
			}, i.prototype.injectNodeCanvas = function(t) {
				"undefined" != typeof t && (this.options.canvas = t)
			}, i.prototype.__createCanvas = function(t, e) {
				var n;
				if (f) {
					var i = window.document;
					n = i.createElement("canvas"), n.width = t, n.height = e
				} else {
					var r = this.options.canvas;
					if (!r || !r.createCanvas) throw new Error("Require node-canvas on the server-side Node.js");
					n = r.createCanvas(t, e)
				}
				return n
			}, i.prototype.__createImage = function() {
				var t, e;
				if (f) t = window.Image;
				else {
					var n = this.options.canvas;
					if (!n || !n.Image) throw new Error("Require node-canvas on the server-side Node.js");
					t = n.Image
				}
				return e = new t
			}, i.__configure = function(t, e) {
				var n = i.prototype.defaults;
				r.setter(n, t, e), n.quality && (n.quality = r.rangeNumber(n.quality, n.minQuality, n.maxQuality))
			}, e.exports = i
		}).call(this, t("buffer").Buffer)
	}, {
		"./polyfills": 3,
		"./utils": 4,
		buffer: 5
	}],
	2: [function(t, e, n) {
		"use strict";

		function i(t, e, n) {
			var i;
			switch (arguments.length) {
				case 0:
					i = new r;
					break;
				case 1:
					"Object" === o.type(t) ? i = new r(t) : (i = new r, i.image(t));
					break;
				case 2:
					n = e, e = null, i = new r, i.image(t, function() {
						n.call(this)
					});
					break;
				default:
					if ("Object" !== o.type(e)) throw new Error("invalid arguments");
					i = new r(e), i.image(t, function() {
						n.call(this)
					})
			}
			return i
		}
		var r = t("./clipper"),
			o = t("./utils");
		i.configure = function(t, e) {
			r.__configure(t, e)
		}, n = e.exports = i, n.imageClipper = i, "function" == typeof define && define.amd ? define(function() {
			return i
		}) : "undefined" == typeof window && "undefined" == typeof navigator || (window.imageClipper = i)
	}, {
		"./clipper": 1,
		"./utils": 4
	}],
	3: [function(t, e, n) {
		"use strict";
		var i = t("fs"),
			r = {};
		r.writeFile = function(t, e, n) {
			i.writeFile(t, e, function(t) {
				if (t) throw t;
				n()
			})
		}, r.toDataURL = function(t, e) {
			var n = t.canvas,
				i = t.imageFormat,
				r = t.quality,
				o = t.bufsize;
			"image/jpeg" === i ? n.toDataURL(i, {
				quality: r,
				bufsize: o
			}, function(t, n) {
				if (t) throw t;
				e(n)
			}) : n.toDataURL(i, function(t, n) {
				if (t) throw t;
				e(n)
			})
		}, e.exports = r
	}, {
		fs: 5
	}],
	4: [function(t, e, n) {
		(function(t, n) {
			"use strict";
			var i = {};
			i.isBrowser = function() {
				var t = i.isElectron(),
					e = i.isNW();
				return !t && !e && !("undefined" == typeof window || "undefined" == typeof navigator)
			}, i.isNode = function() {
				return !("undefined" == typeof t || !t.platform || !t.versions)
			}, i.isNW = function() {
				var e = i.isNode();
				return e && !("undefined" == typeof n || !t.__node_webkit || !t.versions["node-webkit"])
			}, i.isElectron = function() {
				var e = i.isNode();
				return e && !("undefined" == typeof n || !t.versions.electron)
			}, i.type = function(t) {
				return Object.prototype.toString.call(t).split(" ")[1].replace("]", "")
			}, i.rangeNumber = function(t, e, n) {
				return t > n ? n : t < e ? e : t
			}, i.each = function(t, e) {
				var n = t.length;
				if (n)
					for (var i = 0; i < n && e.call(t[i], t[i], i) !== !1; i++);
				else if ("undefined" == typeof n)
					for (var r in t)
						if (e.call(t[r], t[r], r) === !1) break
			}, i.extend = function(t) {
				i.each(arguments, function(e, n) {
					n > 0 && i.each(e, function(e, n) {
						"undefined" != typeof e && (t[n] = e)
					})
				})
			}, i.setter = function(t, e, n) {
				var r = i.type(e);
				if ("String" === r) {
					if ("undefined" == typeof t[e]) throw new Error("Invalid configuration name.");
					if ("undefined" == typeof n) throw new Error("Lack of a value corresponding to the name");
					"Object" === i.type(n) && "Object" === i.type(t[e]) ? i.extend(t[e], n) : t[e] = n
				} else {
					if ("Object" !== r) throw new Error("Invalid arguments");
					n = e, i.extend(t, n)
				}
			}, i.getImageFormat = function(t) {
				var e = t.substr(t.lastIndexOf(".") + 1, t.length);
				return e = "jpg" === e ? "jpeg" : e, "image/" + e
			}, i.upperCaseFirstLetter = function(t) {
				return t.replace(t.charAt(0), function(t) {
					return t.toUpperCase()
				})
			}, e.exports = i
		}).call(this, t("pBGvAp"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
	}, {
		pBGvAp: 6
	}],
	5: [function(t, e, n) {}, {}],
	6: [function(t, e, n) {
		function i() {}
		var r = e.exports = {};
		r.nextTick = function() {
			var t = "undefined" != typeof window && window.setImmediate,
				e = "undefined" != typeof window && window.postMessage && window.addEventListener;
			if (t) return function(t) {
				return window.setImmediate(t)
			};
			if (e) {
				var n = [];
				return window.addEventListener("message", function(t) {
						var e = t.source;
						if ((e === window || null === e) && "process-tick" === t.data && (t.stopPropagation(), n.length > 0)) {
							var i = n.shift();
							i()
						}
					}, !0),
					function(t) {
						n.push(t), window.postMessage("process-tick", "*")
					}
			}
			return function(t) {
				setTimeout(t, 0)
			}
		}(), r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.on = i, r.addListener = i, r.once = i, r.off = i, r.removeListener = i, r.removeAllListeners = i, r.emit = i, r.binding = function(t) {
			throw new Error("process.binding is not supported")
		}, r.cwd = function() {
			return "/"
		}, r.chdir = function(t) {
			throw new Error("process.chdir is not supported")
		}
	}, {}]
}, {}, [2]);