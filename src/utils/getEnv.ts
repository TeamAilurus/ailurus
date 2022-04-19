export default function getEnv(key: string): string {
	const value = process.env[key];
	if (value) return value;
	throw new Error(`Environment variable ${key} is not set.`);
}
