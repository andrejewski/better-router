
var path = require('path'),
	express = require('express');

module.exports = function(options) {
	var router = express.Router(options),
		mountpath = null;

	router.path = function() {
		return mountpath;
	};

	router.use(function restoreMountpath(req, res, next) {
		if(!mountpath) {
			var trail = req.orginalUrl.indexOf(req.url),
				routerUrl = req.orginalUrl.slice(0, trail);
			mountpath = routerUrl;
		}
		res.locals.routerUrl = mountpath;
		res.locals.routerLink = function(path) {
			return path.join(res.locals.routerUrl, path);
		}
		next();
	});

	router.use(function(req, res, next) {
		res.routerRender = function(view) {
			viewArg = [fixView(view)],
			restArg = Array.prototype.slice.call(arguments, 1);
			res.render.apply(res, viewArg.concat(restArg));
		}
		next();
	});

	function fixView(view) {
		if(options.views && view.charAt(0) !== '/') {
			view = path.join(options.views, view);
		}
		if(options.viewEngine && !~view.indexOf('.')) {
			view += '.'+options.viewEngine;
		}
		return view;
	}

	return router;
}
