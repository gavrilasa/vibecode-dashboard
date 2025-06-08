// hooks/useRegistration.ts
"use client";

import { useCallback } from "react";
import {
	getMyRegistrations,
	registerForCompetition,
	uploadDocument,
} from "@/lib/registration";
import {
	CreateRegistrationRequest,
	UploadDocumentResponse,
} from "@/types/registration";
import { useApi } from "./useApi"; // Menggunakan hook generik kita

// Tipe untuk parameter fungsi upload, agar lebih jelas
type UploadParams = {
	file: File;
	documentType: "VALIDATION" | "PENYISIHAN" | "FINAL";
};

// Wrapper untuk fungsi upload agar sesuai dengan ekspektasi useApi
const uploadApiWrapper = (params: UploadParams) => {
	return uploadDocument(params.file, params.documentType);
};

export function useRegistration() {
	// Hook untuk mengambil data registrasi
	const {
		data: registrations,
		loading: fetchLoading,
		error: fetchError,
		execute: fetchMyRegistrations,
		setData: setRegistrations,
	} = useApi(getMyRegistrations, {
		onError: (errorMessage) => {
			// Jika error 404, itu bukan error aplikasi, tapi user belum terdaftar.
			// Kita anggap datanya array kosong, sama seperti logika di kode lama.
			if (errorMessage.includes("404")) {
				setRegistrations([]);
			}
		},
	});

	// Callback untuk memanggil refetch, dibuat stabil dengan useCallback
	const refetch = useCallback(() => {
		fetchMyRegistrations();
	}, [fetchMyRegistrations]);

	// Hook untuk aksi 'register', akan memanggil refetch setelah sukses
	const {
		loading: registerLoading,
		error: registerError,
		execute: register,
	} = useApi(registerForCompetition, {
		onSuccess: refetch,
	});

	// Hook untuk aksi 'upload', juga akan memanggil refetch setelah sukses
	const {
		loading: uploadLoading,
		error: uploadError,
		execute: upload,
	} = useApi<UploadDocumentResponse, UploadParams>(uploadApiWrapper, {
		onSuccess: refetch,
	});

	// Kembalikan objek yang sama persis seperti hook aslinya
	return {
		registrations,
		loading: fetchLoading || registerLoading || uploadLoading,
		error: fetchError || registerError || uploadError,
		fetchMyRegistrations,
		register,
		upload,
	};
}
