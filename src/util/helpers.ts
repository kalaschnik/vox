import { gsap } from 'gsap';
import { SvgInHtml } from '../types';
import Toastify from 'toastify-js';

// promised based timeout
export const sleep = (ms = 2000) => new Promise<number>((r) => setTimeout(r, ms));

export const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export const millisToMinutesAndSeconds = (millis: number) => {
	var minutes = Math.floor(millis / 60000);
	var seconds = Number(((millis % 60000) / 1000).toFixed(0));
	// return { minutes: minutes, seconds: (seconds < 10 ? '0' : '') + seconds };
	return { minutes, seconds };
};

export const moveToCenterAnchor = (svg: SvgInHtml, x?: number, y?: number) => {
	// Get the bounding box of the svg
	const bbox = svg.getBBox();

	// Calculate the center coordinates
	let cx = 0;
	if (x) {
		cx = bbox.x + bbox.width / 2;
	}
	let cy = 0;
	if (y) {
		cy = bbox.y + bbox.height / 2;
	}

	// Translate the SVG to the new position
	if (x && y) {
		gsap.set(svg, { x: x - cx, y: y - cy });
	}
	if (x && !y) {
		gsap.set(svg, { x: x - cx });
	}
	if (!x && y) {
		gsap.set(svg, { y: y - cy });
	}
};

export const startFullscreen = () => {
	const elem = document.documentElement as HTMLElement & {
		mozRequestFullScreen(): Promise<void>;
		webkitRequestFullscreen(): Promise<void>;
		msRequestFullscreen(): Promise<void>;
	};
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
};

export const exitFullscreen = () => {
	const elem = document as Document & {
		mozCancelFullScreen(): Promise<void>;
		webkitExitFullscreen(): Promise<void>;
		msExitFullscreen(): Promise<void>;
	};
	if (elem.exitFullscreen) {
		elem.exitFullscreen();
	} else if (elem.mozCancelFullScreen) {
		/* Firefox */
		elem.mozCancelFullScreen();
	} else if (elem.webkitExitFullscreen) {
		/* Chrome, Safari and Opera */
		elem.webkitExitFullscreen();
	} else if (elem.msExitFullscreen) {
		/* IE/Edge */
		elem.msExitFullscreen();
	}
};

export const generateUserIdFilename = (prefix = 'matt', postfix = 'data', extension = 'json') => {
	const day = new Date().toISOString().slice(0, 10);
	const time = new Date().toISOString().slice(11, 19).replaceAll(':', '-');
	return `${prefix}-${data.id}-${day}-${time}-${postfix}.${extension}`;
};

export const downloadData = () => {
	// download data as JSON from global data object
	const blob = new Blob([JSON.stringify(data, null, 2)]);
	const hiddenElement = document.createElement('a');
	hiddenElement.href = window.URL.createObjectURL(blob);
	hiddenElement.download = generateUserIdFilename();
	hiddenElement.click();
};

export const uploadData = (
	jsonData: {} = data,
	id: string = generateUserIdFilename('matt', undefined)
) => {
	fetch('./data/data.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: JSON.stringify(jsonData), fname: id }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success:', data);
			if (data.success) {
				Toastify({
					text: '💾',
					duration: 2000,
					className: 'toast-info',
				}).showToast();
			} else {
				Toastify({
					text: '🤔',
					duration: 2000,
					className: 'toast-error',
				}).showToast();
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};

export const uploadAudio = (
	blob: Blob,
	id: string = generateUserIdFilename('matt', 'audio', 'ogg')
) => {
	const formData = new FormData();
	formData.append('file', blob, id);
	fetch('./data/audio.php', {
		method: 'POST',
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success:', data);
			if (data.success) {
				Toastify({
					text: '💾',
					duration: 2000,
					className: 'toast-info',
				}).showToast();
			} else {
				console.error('Error:', data);
				Toastify({
					text: '🤔',
					duration: 2000,
					className: 'toast-error',
				}).showToast();
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};
