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
import { DOCUMENT_TYPE } from "@/lib/constants"; // Impor DOCUMENT_TYPE

// Tipe untuk parameter fungsi upload, agar lebih jelas
type UploadParams = {
	file: File;
	// PERBAIKAN: Tambahkan tipe 'SPONSOR' di sini
	documentType: (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
};

// Wrapper untuk fungsi upload agar sesuai dengan ekspektasi useApi
const uploadApiWrapper = (params: UploadParams) => {
	// Di sini documentType akan diteruskan dengan benar
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
