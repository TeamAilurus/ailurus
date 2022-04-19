import { WebSocket } from "ws";
import Client from "./Client";
import Channel from "./structs/Channel";
import Guild from "./structs/Guild";
import Message from "./structs/Message";
import User from "./structs/User";

interface APIGuild {
  id: string;
  name: string;
  icon?: string;
  channels: APIChannel[];
}

interface APIUser {
  username: string;
  discriminator: string;
  id: string;
  bot: boolean;
}

export interface APIMessage {
  id: string;
  content: string;
  guild_id: string;
  channel_id: string;
  author: APIUser;
}

interface APIChannel {
  id: string;
  name: string;
}

interface ReadyPayload {
  user: APIUser;
  guilds: ReadyGuild[];
}

interface ReadyGuild {
  id: string;
  unavailable: true;
}

export default class Gateway {
  HEARTBEAT_INTERVAL: number = 0;
  lastSequence: number;
  lastHeartbeat: number = 0;

  readyGuilds: ReadyGuild[];

  socket = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");

  constructor(private token: string, private client: Client) {
    this._init();
  }

  _init() {
    this.socket.addEventListener("open", () => {
      console.log("Connected to discord!");
    });

    this.socket.addEventListener("message", (message) => {
      const buffer = JSON.parse(message.data.toString());
      console.log(buffer);

      if (buffer.s) this.lastSequence = buffer.s;

      if (this.HEARTBEAT_INTERVAL === 0 && buffer.op === 10) {
        this.HEARTBEAT_INTERVAL = buffer.d.heartbeat_interval;

        console.log(
          `Sending a heartbeat every ${this.HEARTBEAT_INTERVAL}ms + jitter time.`
        );

        // Time to identify

        console.log("Identifiying..");

        this.socket.send(
          JSON.stringify({
            op: 2,
            d: {
              token: this.token,
              intents: 513,
              properties: {
                $os: "linux",
                $browser: "Discord iOS",
                $device: "ios",
              },
            },
          })
        );

        console.log("Identified with discord!");

        return this.heartbeat();
      }

      switch (buffer.op) {
        case 11: {
          console.log(
            `Heartbeat acknowledged in ${Date.now() - this.lastHeartbeat}ms`
          );
        }
        case 0: {
          switch (buffer.t) {
            case "READY":
              const readyPayload = buffer.d as ReadyPayload;

              this.readyGuilds = readyPayload.guilds;

              // const clientUser = new User(readyPayload.user.id, readyPayload.user.username, readyPayload.user.discriminator, readyPayload.user.bot)
              break;
            case "GUILD_CREATE":
              const apiGuild = buffer.d as APIGuild;

              if (this.readyGuilds.length > 0) {
                const g = new Guild(apiGuild.id, apiGuild.name, this.client);
                this.client.guilds.set(g.id, g);
                for (let i = 0; i < apiGuild.channels.length; i++) {
                  this.client.channels.set(
                    apiGuild.channels[i].id,
                    new Channel(
                      apiGuild.channels[i].id,
                      g,
                      apiGuild.channels[i].name,
                      this.client
                    )
                  );
                }
                this.readyGuilds = this.readyGuilds.filter(
                  (x) => x.id !== apiGuild.id
                );
                if (this.readyGuilds.length === 0) console.log("Ready!");
                return;
              }
              break;
            case "MESSAGE_CREATE":
              const apiMessage = buffer.d as APIMessage;

              const channel = this.client.channels.get(apiMessage.channel_id);
              const guild = this.client.guilds.get(apiMessage.guild_id);
              const user = new User(
                apiMessage.author.id,
                apiMessage.author.username,
                apiMessage.author.discriminator,
                apiMessage.author.bot
              );

              const message = new Message(
                apiMessage.id,
                apiMessage.content,
                guild,
                channel,
                user,
                this.client
              );
              this.client.emit("message", message);
          }
        }
      }
    });
  }

  heartbeat() {
    setTimeout(() => {
      this.socket.send(
        JSON.stringify({
          op: 1,
          d: this.lastSequence,
        })
      );

      console.log("Heartbeating..");
      this.lastHeartbeat = Date.now();

      this.heartbeat();
    }, this.HEARTBEAT_INTERVAL + Math.random());
  }
}
