export interface Translation {
	detected_source_language: string;
	text: string;
}

export interface TranslationResponse {
	translations: Translation[];
}
