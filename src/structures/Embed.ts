export default class Embed {
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
    public constructor() {
        this.title = null
        this.type = "rich"
        this.description = null
        this.url = null
        this.timestamp = null
        this.color = null
        this.footer = null
        this.image = null
        this.thumbnail = null
        this.video = null
        this.provider = null
        this.author = null
        this.fields = []
	}

    public setTitle(title: String | null) {
        if(typeof title === null) {
            return this.title = null
        }
        if(typeof title !== "string") throw new Error(`Expected type string but got ${typeof title} for embed title`)
        return this.title = title
    }

    public setDescription(description: String | null) {
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public setURL(description: String | null) {
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public setTimestamp(timestamp: Boolean | null) {
        if(typeof timestamp === null) {
            return this.description = null
        }
        if(typeof timestamp !== "boolean") throw new Error(`Expected type boolean but got ${typeof timestamp} for embed timestamp`)
        return this.timestamp = Date.now()
    }

    public setColor(color: String | null) {
        if(typeof color === null) {
            return this.color = null
        }
        if(typeof color !== "string") throw new Error(`Expected type string but got ${typeof color} for embed color`)
        return this.color = color //unfinished needs a way to set the correct format
    }

    public setFooter(description: String | null) { //unfinished
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public setImage(description: String | null) { //unfinished
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public setThumbnail(description: String | null) { //unfinished
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public setVideo(description: String | null) { //unfinished
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public setProvider(description: String | null) { //unfinished
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public setAuthor(description: String | null) { //unfinished
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }

    public addField(description: String | null) { //unfinished
        if(typeof description === null) {
            return this.description = null
        }
        if(typeof description !== "string") throw new Error(`Expected type string but got ${typeof description} for embed description`)
        return this.description = description
    }
}
