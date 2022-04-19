import "dotenv/config";
import Client from "./Client";
import Gateway from "./Gateway";
import Message from "./structs/Message";

const client = new Client(process.env.DISCORD_TOKEN);

client.on("message", (message: Message) => {
    console.log(message.content);
    if (message.author.bot) return;

    if (message.content === "ping") return message.reply("pong!");
})