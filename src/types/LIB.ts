export interface ClientOptions {
	token: string;
	intents: number;
}

export interface EmbedOptions {
	title: null | String
	type: "rich"
	description: null | String
	url: null | String
	timestamp: null //idk how to type this
	color: String | null
	footer: null | Object
	image: null | Object
	thumbnail: null | Object
	video: null | Object
	provider: null | Object
	author: null | Object
	fields: []
}