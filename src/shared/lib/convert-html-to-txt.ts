export const htmlToTxt = (html: string): string => {
	let text = html;

	text = text.replace(/[\r\n]+/g, ' ');
	text = text.replace(/<br\s*\/?>/gi, '\n');
	text = text.replace(/<\/li>/gi, '\n');
	text = text.replace(/<\/p>/gi, '\n');
	text = text.replace(/<[^>]+>/g, '');
	text = text.replace(/&nbsp;/g, ' ');
	text = text.replace(/\n{2,}/g, '\n\n');
	text = text.replace(/[ \t]+\n/g, '\n');

	return text.trim();
};
