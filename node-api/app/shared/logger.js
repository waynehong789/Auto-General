"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger = __importStar(require("bunyan"));
var options = {
    name: 'portal',
    serializers: logger.stdSerializers,
    streams: [
        {
            type: 'rotating-file',
            path: './log/app.log',
            level: logger.TRACE,
            closeOnExit: false,
            period: '1d',
            count: 31
        }
    ]
};
var log = logger.createLogger(options);
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getStackTrace = function () {
        var stack = new Error().stack || '';
        var stacks = stack.split('\n').map(function (line) { return line.trim(); });
        return stacks.splice(stack[0] === 'Error' ? 2 : 1);
    };
    Logger.trace = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args && args[0]) {
            var param1 = args.shift();
            log.trace(param1, args, Logger.getStackTrace());
            console.trace(param1, args);
        }
    };
    Logger.debug = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args && args[0]) {
            var param1 = args.shift();
            var trace = Logger.getStackTrace();
            log.debug(trace[2], param1, args);
            console.debug(trace[2], param1, args);
        }
    };
    Logger.log = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args && args[0]) {
            var param1 = args.shift();
            if (args && args.length) {
                log.info(param1, args);
                console.log(param1, args);
            }
            else {
                log.info(param1);
                console.log(param1);
            }
        }
    };
    Logger.info = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args && args[0]) {
            var param1 = args.shift();
            if (args && args.length) {
                log.info(param1, args);
                console.info(param1, args);
            }
            else {
                log.info(param1);
                console.info(param1);
            }
        }
    };
    Logger.warn = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args && args[0]) {
            var param1 = args.shift();
            if (args && args.length) {
                log.warn(param1, args);
                console.warn(param1, args);
            }
            else {
                log.warn(param1);
                console.warn(param1);
            }
        }
    };
    Logger.error = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args && args[0]) {
            var param1 = args.shift();
            var trace = Logger.getStackTrace();
            if (args && args.length) {
                log.error(trace[2], param1, args);
                console.error(trace[2], param1, args);
            }
            else {
                log.error(trace[2], param1);
                console.error(trace[2], param1);
            }
        }
    };
    Logger.fatal = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args && args[0]) {
            var param1 = args.shift();
            var trace = Logger.getStackTrace();
            log.fatal(trace[2], param1, args);
            console.error(trace[2], param1, args);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map