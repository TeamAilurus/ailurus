import 'dotenv/config';
import { Client, Message, User } from '..';

const client = new Client({
	intents: 131071
});

client.on('message', async (message: Message) => {
	// Only run if the user isn't a webhook
	if (!(message.author instanceof User)) return;
	if (message.content === 'test message')
		void message.reply({
			content: 'pong!'
		});

	if (message.content === 'test embed')
		void message.reply({
			embeds: [
				{
					description: 'hey an embed'
				}
			]
		});

	const clean = (text: unknown) => {
		if (typeof text === 'string') {
			return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
		}
		return text;
	};

	if (message.content.startsWith('eval')) {
		try {
			const args = message.content.split(' ');
			args.shift();
			const code = args.join(' ');
			// eslint-disable-next-line no-eval
			const evaled = eval(code);

			await message.reply({ content: `\`\`\`xl\n${clean(evaled)}\`\`\`` });
		} catch (err) {
			await message.reply({ content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\`` });
		}
	}
});

client.login();
