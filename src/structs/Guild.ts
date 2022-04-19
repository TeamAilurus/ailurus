import Client from "../Client";
import Base from "./Base";

export default class Guild extends Base {
  constructor(public id: string, public name: string, client: Client) {
    super(client);
  }
}
