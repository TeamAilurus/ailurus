export interface ClientOptions {
	token?: string;
	intents: number;
}

export const enum RequestMethod {
	Delete = 'DELETE',
	Get = 'GET',
	Patch = 'PATH',
	Post = 'POST',
	Put = 'PUT'
}
