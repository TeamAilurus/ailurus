export interface ClientOptions {
	token: string;
	intents: number;
}

export interface EmbedOptions {
	title: String | null
	type: "rich"
	description: String | null
	url: String | null
	timestamp: Number | null
	color: String | null
	footer: Object |null
	image: Object | null
	thumbnail: Object | null
	video: Object | null
	provider: Object | null
	author: Object | null
	fields: []
}