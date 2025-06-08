// hooks/useApi.ts
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ApiError } from "@/lib/api";

/**
 * Hook generik untuk menangani request API, state loading, dan error.
 * @param apiFunc Fungsi API yang akan dieksekusi. Fungsi ini harus mengembalikan Promise.
 * @param options Konfigurasi opsional seperti onSuccess dan onError callback.
 * @template T Tipe data yang diharapkan dari hasil response API.
 * @template P Tipe parameter yang diterima oleh fungsi API.
 */
export function useApi<T, P = void>(
	apiFunc: (params: P) => Promise<T>,
	options: {
		onSuccess?: (data: T) => void;
		onError?: (error: string) => void;
	} = {}
) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Gunakan ref untuk menyimpan callback agar tidak memicu dependency array.
	const onSuccessRef = useRef(options.onSuccess);
	const onErrorRef = useRef(options.onError);

	// Jaga agar ref tetap up-to-date dengan callback terbaru setiap render.
	useEffect(() => {
		onSuccessRef.current = options.onSuccess;
		onErrorRef.current = options.onError;
	}, [options.onSuccess, options.onError]);

	const execute = useCallback(
		async (params: P) => {
			setLoading(true);
			setError(null);
			try {
				const result = await apiFunc(params);
				setData(result);
				// Panggil callback terbaru dari ref.
				if (onSuccessRef.current) {
					onSuccessRef.current(result);
				}
				return result;
			} catch (err: any) {
				const errorMessage =
					err instanceof ApiError
						? err.message
						: "An unexpected error occurred.";
				setError(errorMessage);
				// Panggil callback terbaru dari ref.
				if (onErrorRef.current) {
					onErrorRef.current(errorMessage);
				}
				// Kembalikan null saat terjadi error, agar komponen tahu request gagal.
				return null;
			} finally {
				setLoading(false);
			}
		},
		[apiFunc] // Dependency array sekarang stabil.
	);

	return {
		data,
		loading,
		error,
		execute,
		setData, // diekspos untuk optimistic update atau reset manual jika perlu.
	};
}
