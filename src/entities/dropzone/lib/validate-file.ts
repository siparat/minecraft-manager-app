export const validateFile = async (
	file: File,
	userValidateFile?: (file: File) => boolean,
	sizes?: [width: number, height: number]
): Promise<boolean> => {
	let fileIsValid = true;

	if (userValidateFile) {
		const userValidation = userValidateFile(file);
		if (!userValidation) {
			fileIsValid = false;
		}
	}

	if (!sizes || !file.type.includes('image')) {
		return fileIsValid;
	}

	const img = new Image();
	const objectUrl = URL.createObjectURL(file);
	img.src = objectUrl;

	const sizedIsValid = await new Promise<boolean>((res) => {
		img.onload = (): void => {
			if (img.width == sizes[0] && img.height == sizes[1]) {
				res(true);
			}
			res(false);
		};
	});
	if (!sizedIsValid) {
		fileIsValid = false;
	}

	return fileIsValid;
};
