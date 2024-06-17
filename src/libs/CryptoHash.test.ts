import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { CryptoHash } from './CryptoHash'; // adjust the import path accordingly
import bcrypt from 'bcrypt';

describe('CryptoHash', () => {
    let originalSaltNumber: string | undefined;

    beforeAll(() => {
        originalSaltNumber = process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS;
        process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS = '10';
    });

    afterAll(() => {
        if (originalSaltNumber !== undefined) {
            process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS = originalSaltNumber;
        } else {
            delete process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS;
        }
    });

    it('Should fail to get the salt number from the environment variable', () => {
        delete process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS;

        expect(CryptoHash.getSaltNumber()).toBe(10);
    })

    it('Should succeed to get the salt number from the environment variable', () => {
        process.env.NEXT_PUBLIC_CRYPTO_SALT_ROUNDS = '12';

        expect(CryptoHash.getSaltNumber()).toBe(12);
    })

    it('should hash a string correctly', async () => {
        const data = 'testString';
        const hash = await CryptoHash.hashString(data);

        const isMatch = await bcrypt.compare(data, hash);
        expect(isMatch).toBe(true);
    });

    it('should compare a string with its hash correctly', async () => {
        const data = 'testString';
        const hash = await CryptoHash.hashString(data);

        const isMatch = await CryptoHash.compareString(data, hash);
        expect(isMatch).toBe(true);
    });

    it('should generate a valid UUID', () => {
        const uuid = CryptoHash.getRandomUUID();
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        expect(uuidRegex.test(uuid)).toBe(true);
    });

    it('should generate a 6 characters long verification code', () => {
        const code = CryptoHash.get2StepsVerificationCode();

        expect(code).toHaveLength(6);
        expect(code).toMatch(/^[A-Z0-9]{6}$/);
    });
});
