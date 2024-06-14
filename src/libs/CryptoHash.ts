import bcrypt from "bcrypt";

class CryptoHash {
	// Internal use only, retrieve the salt number from the environment variable or use the default value
	static getSaltNumber(): number {
		return process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS
			? parseInt(process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS)
			: 10;
	}

	// Hash a string with the bcrypt algorithm
	static async hashString(data: string): Promise<string> {
		const hash = await bcrypt.hash(data, CryptoHash.getSaltNumber());

		return hash;
	}

	// Compare a string with a hash to see if they are the same
	static async compareString(data: string, hash: string): Promise<boolean> {
		const result = await bcrypt.compare(data, hash);

		return result;
	}

	// Generate a random UUID, useful for id generation
	static getRandomUUID(): string {
		return crypto.randomUUID();
	}

	// Generate a 6 characters long random string, useful for 2 steps verification code
	static get2StepsVerificationCode(): string {
		const hash = crypto.randomUUID();

		return hash.substring(0, 6).toUpperCase();
	}
}

export { CryptoHash };
