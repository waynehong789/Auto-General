import * as logger from 'bunyan';

const options: logger.LoggerOptions = {
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

const log = logger.createLogger(options);

  
export class Logger {

	public static getStackTrace () {
		let stack = new Error().stack || '';
		let stacks = stack.split('\n').map(function (line) { return line.trim(); });
		return stacks.splice(stack[0] === 'Error' ? 2 : 1);
	}

	public static trace: (...args: any[]) => void = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args && args[0]){			
			let param1: any = args.shift();
			log.trace(param1, args, Logger.getStackTrace());
			console.trace(param1, args);
		}
	};

	public static debug: (...args: any[]) => void = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args && args[0]){			
			let param1: any = args.shift();
			let trace = Logger.getStackTrace();
			log.debug(trace[2], param1, args);												
			console.debug(trace[2], param1, args);
		}		
	};

	public static log: (...args: any[]) => void = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args && args[0]){			
			let param1: any = args.shift();
			if (args && args.length){
				log.info(param1, args);
				console.log(param1, args);
			} else {
				log.info(param1);
				console.log(param1);
			}
		}		
	};

	public static info: (...args: any[]) => void = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args && args[0]){			
			let param1: any = args.shift();
			if (args && args.length){
				log.info(param1, args);
				console.info(param1, args);
			} else {
				log.info(param1);
				console.info(param1);
			}
		}		
		
	};

	public static warn: (...args: any[]) => void = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args && args[0]){
			let param1: any = args.shift();
			if (args && args.length){
				log.warn(param1, args);
				console.warn(param1, args); 
			} else {
				log.warn(param1);
				console.warn(param1);
			}
			
		}
	};

	public static error: (...args: any[]) => void = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args && args[0]){
			let param1: any = args.shift();
			let trace = Logger.getStackTrace();
			if (args && args.length){
				log.error(trace[2], param1, args);
				console.error(trace[2], param1, args);
			} else {
				log.error(trace[2], param1);
				console.error(trace[2], param1);
			}
			
		}
	};

	public static fatal: (...args: any[]) => void = function () {
		var args = Array.prototype.slice.call(arguments);
		if (args && args[0]){
			let param1: any = args.shift();
			let trace = Logger.getStackTrace();
			log.fatal(trace[2],param1, args);
			console.error(trace[2], param1, args);
		}
	};

}
