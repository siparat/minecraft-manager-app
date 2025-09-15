export const multiloader =
	(...loaders: any[]) =>
	(args: any): void => {
		loaders.forEach((l) => l(args));
	};
