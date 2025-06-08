// hooks/useRegistration.ts

"use client";

import { useState, useCallback } from "react";
import {
	getMyRegistrations,
	registerForCompetition,
	uploadDocument,
} from "@/lib/registration";
import {
	Registration,
	CreateRegistrationRequest,
	UploadDocumentResponse,
} from "@/types/registration";
import { ApiError } from "@/lib/api"; // Impor ApiError

export function useRegistration() {
	const [registrations, setRegistrations] = useState<Registration[] | null>(
		null
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchMyRegistrations = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getMyRegistrations();
			setRegistrations(data);
		} catch (err: any) {
			// PERBAIKAN DI SINI
			// Jika error adalah ApiError dengan status 404, itu artinya user belum terdaftar.
			// Ini adalah kondisi valid, jadi kita set `registrations` ke array kosong.
			if (err instanceof ApiError && err.status === 404) {
				setRegistrations([]);
			} else {
				// Untuk error lainnya (500, masalah jaringan, dll), tampilkan pesan error.
				setError(err.message || "Failed to fetch registrations");
			}
		} finally {
			setLoading(false);
		}
	}, []);

	const register = useCallback(
		async (
			data: CreateRegistrationRequest
		): Promise<{ message: string } | null> => {
			setLoading(true);
			setError(null);
			try {
				const response = await registerForCompetition(data);
				await fetchMyRegistrations();
				return response;
			} catch (err: any) {
				setError(err.message || "Failed to create registration");
				return null;
			} finally {
				setLoading(false);
			}
		},
		[fetchMyRegistrations]
	);

	const upload = useCallback(
		async (
			file: File,
			documentType: "VALIDATION" | "PENYISIHAN" | "FINAL"
		): Promise<UploadDocumentResponse | null> => {
			setLoading(true);
			setError(null);
			try {
				const result = await uploadDocument(file, documentType);
				await fetchMyRegistrations();
				return result;
			} catch (err: any) {
				setError(err.message || "Failed to upload document");
				return null;
			} finally {
				setLoading(false);
			}
		},
		[fetchMyRegistrations]
	);

	return {
		registrations,
		loading,
		error,
		fetchMyRegistrations,
		register,
		upload,
	};
}
