export default class Embed {
    embed: { title: null | String; type: string; description: null | String; url: null | String; timestamp: null; color: null; footer: null | Object; image: null | Object; thumbnail: null |Object; video: null | Object; provider: null | Object; author: null | Object; fields: []; };
    public constructor() {
		this.embed = {
            title: null,
            type: "rich",
            description: null,
            url: null,
            timestamp: null,
            color: null,
            footer: null,
            image: null,
            thumbnail: null,
            video: null,
            provider: null,
            author: null,
            fields: []
        }
	}

    public setTitle(title: String) {
        if(typeof title !== "string") throw new Error(`Expected type string but got ${typeof title} for embed title`)
        this.embed.title = title
    }
}
