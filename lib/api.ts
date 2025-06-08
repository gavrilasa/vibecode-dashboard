// lib/api.ts

// Fungsi untuk mengambil cookie dari sisi client
function getCookie(name: string): string | null {
	if (typeof window === "undefined") {
		return null;
	}
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
	return null;
}

// Class error kustom untuk menyertakan status code
export class ApiError extends Error {
	constructor(public status: number, message: string) {
		super(message);
		this.name = "ApiError";
	}
}

export async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const url = `${
		process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.theaceundip.id/api/v1"
	}${endpoint}`;

	const config: RequestInit = {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	};

	if (typeof window !== "undefined") {
		const token = getCookie("auth-token");
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}
	}

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			const errorData = await response
				.json()
				.catch(() => ({ message: response.statusText }));
			// Lemparkan error dengan status dan message
			throw new ApiError(
				response.status,
				errorData.message || "Request failed"
			);
		}

		const contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			const text = await response.text();
			return text ? JSON.parse(text) : ({} as T);
		}

		return {} as T;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		console.error("Network or parsing error:", error);
		throw new ApiError(0, "Network error occurred");
	}
}

// ... sisa file api.ts (apiRequestWithFormData, dll)

export function apiRequestWithFormData<T>(
	endpoint: string,
	formData: FormData,
	options: RequestInit = {}
): Promise<T> {
	const { headers, ...restOptions } = options;

	return apiRequest<T>(endpoint, {
		method: "POST",
		body: formData,
		headers: {
			// Don't set Content-Type for FormData, let browser set it
			...headers,
		},
		...restOptions,
	});
}
