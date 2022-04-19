import { fetch } from "undici";
import Client from "../Client";
import { APIMessage } from "../Gateway";
import Base from "./Base";
import Channel from "./Channel";
import Guild from "./Guild";
import User from "./User";

export default class Message extends Base {
  constructor(
    public id: string,
    public content: string,
    public guild: Guild,
    public channel: Channel,
    public author: User,
    client: Client,
    public reference?: string
  ) {
    super(client);
  }

  public async reply(content: string) {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${this.channel.id}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          content,
          message_reference: {
            message_id: this.id,
          },
        }),
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      const apiMessage = (await res.json()) as APIMessage;

      const channel = this.client.channels.get(apiMessage.channel_id);
      const guild = this.client.guilds.get(apiMessage.guild_id);
      const user = new User(
        apiMessage.author.id,
        apiMessage.author.username,
        apiMessage.author.discriminator,
        apiMessage.author.bot
      );

      return new Message(
        apiMessage.id,
        apiMessage.content,
        guild,
        channel,
        user,
        this.client
      );
    } else {
      const json = await res.json();
      console.log(json);
    }
  }
}
