interface LogOptions {
	message?: string;
	json?: Record<string, string> | any;
	state?: string;
}

export function log(options: LogOptions) {
	if (options.message) {
		console.log(`[${options.state || Date.now()}]: ${options.message}`);
	} else if (options.json) {
		console.log(`[${options.state || Date.now()}]:`);
		console.log(options.json);
	}
}
