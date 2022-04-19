import Client from "../Client";
import Base from "./Base";
import Guild from "./Guild";

export default class Channel extends Base  {
    constructor(public id: string, public guild: Guild, public name: string, client: Client) { super(client) };
}