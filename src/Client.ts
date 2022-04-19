import { EventEmitter } from "stream";
import Gateway from "./Gateway";
import Channel from "./structs/Channel";
import Guild from "./structs/Guild";

export default class Client extends EventEmitter {
  gateway: Gateway;
  guilds = new Map<string, Guild>();
  channels = new Map<string, Channel>();

  constructor(public token: string) {
    super();
    this.gateway = new Gateway(token, this);
  }
}
