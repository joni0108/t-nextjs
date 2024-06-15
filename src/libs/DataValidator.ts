class DataValidation {
	static validateEmail(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	static validatePassword(password: string) {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);
	}

	private static isRecord(value: unknown): value is Record<string, unknown> {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}

	private static isValidType(value: unknown, type: string): boolean {
		const validTypes: Record<string, (value: unknown) => boolean> = {
			string: (val): val is string => typeof val === "string",
			number: (val): val is number => typeof val === "number",
			boolean: (val): val is boolean => typeof val === "boolean",
			// Add other type validations as needed
		};

		return validTypes[type] ? validTypes[type](value) : false;
	}

	static validateObject(
		obj: Record<string, unknown>,
		schema: Record<string, unknown>,
	): boolean {
		if (Object.keys(obj).length !== Object.keys(schema).length) {
			return false;
		}

		return Object.keys(schema).every((key) => {
			if (
				DataValidation.isRecord(schema[key]) &&
				DataValidation.isRecord(obj[key])
			) {
				return DataValidation.validateObject(
					obj[key] as Record<string, unknown>,
					schema[key] as Record<string, unknown>,
				);
			} else {
				// Ensure schema[key] is a string and use isValidType for comparison
				return (
					typeof schema[key] === "string" &&
					DataValidation.isValidType(obj[key], schema[key] as string)
				);
			}
		});
	}
}

export { DataValidation };
