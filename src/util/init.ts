import { gsap } from 'gsap';
import _ from 'lodash';
import { SvgInHtml } from '../types';
import svgPath from '../assets/experiment-voxified.svg';
import config from '../config.yaml';
import { rectToForeignObject } from './rectToForeignObject';
import { recycleObjects } from './recycleObjects';
import { copyAttributes } from './copyAttributes';
import { downloadData, uploadData, uploadAudio, sleep } from './helpers';
import { getUrlParameters } from './getUrlParameters';
import { widowedKeyChecker } from './widowedKeyChecker';
import {
	showSingleSlide,
	swapSlides,
	hideFirstChildSlides,
	hideAllChildSlides,
	getChildrenFromParent,
	removeDisplayNone,
} from './slideVisibility';
import { translations } from '../translations';
import { setMousePointer, setScaleOnHover } from './styleDefaults';
import Toastify from 'toastify-js';
import DetectRTC from 'detectrtc';
import 'toastify-js/src/toastify.css';

export const init = () => {
	const urlParameters = getUrlParameters();

	// calculate agegroup based on birthday
	const birthdayMs = Date.parse(urlParameters.birthday);
	const ageDiffMs = Date.now() - birthdayMs;
	const ageInYears = new Date(ageDiffMs).getUTCFullYear() - 1970;

	const wrapper = document.getElementById('wrapper')! as HTMLDivElement;
	// load initial SVG file
	wrapper.innerHTML = svgPath;
	// get main svg element
	const svg = document.querySelector('svg')! as SvgInHtml;

	// check if svg is voxified
	if (!svg.hasAttribute('voxified')) {
		Toastify({
			escapeMarkup: false,
			text:
				'⚠️ <strong><code>voxified</code> attribute not found!</strong><br>' +
				'<small>You shoud run <code>npm run voxify</code></small>',
			duration: 0,
			// destination: 'https://github.com/apvarun/toastify-js',
			// newWindow: true,
			// close: true,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			className: 'toast-error',
			// style: {
			// 	background:
			// 		'linear-gradient(to bottom, hsl(335deg 86% 46%) 0%, hsl(347deg 90% 42%) 50%, hsl(347deg 90% 42%) 50%)',
			// },
			// onClick: function () {}, // Callback after click
		}).showToast();
	}

	// parse SVG DOM for all child nodes from #svg group
	const svgChilds: {
		[key: string]: SVGImageElement | SVGGElement | Element;
	} = {};
	document.querySelectorAll('svg [id]').forEach((e) => {
		svgChilds[e.id] = e;
	});

	// check if display="none" elements exist in DOM)
	if (document.querySelectorAll('[display="none"]').length > 0) {
		console.warn(
			'Found elements with \'display="none"\' attribute. Make sure all objects are visible when exporting the SVG.',
			'Use removeDisplayNone(); to bypass this temporarily. Details:'
		);
		console.warn(document.querySelectorAll('[display="none"]'));
		removeDisplayNone();
	}

	// transform all rect nodes to foreignObject nodes
	rectToForeignObject();

	// transform all rect nodes to foreignObject nodes
	recycleObjects();

	// initialzie global data object (see custom.d.ts)
	const global = globalThis as any;
	global.data = {
		id: urlParameters.id,
		culture: urlParameters.culture,
		birthday: urlParameters.birthday,
		age: ageInYears,
		agegroup: ageInYears < config.globals.adultThresholdAge ? 'child' : 'adult',
		gender: urlParameters.gender,
		input: urlParameters.input,
		datatransfer: urlParameters.datatransfer,
		coupon: urlParameters.coupon,
		PROLIFIC_PID: urlParameters.PROLIFIC_PID,
		initialTimestamp: new Date(),
		slideCounter: 0,
		quitBeforeEnd: false,
		procedure: {},
		meta: {
			// store device and browser information
			hasWebcam: DetectRTC.hasWebcam,
			hasMicrophone: DetectRTC.hasMicrophone,
			hasMicrophonePermissions: DetectRTC.isWebsiteHasMicrophonePermissions,
			hasSpeakers: DetectRTC.hasSpeakers,
			isMobileDevice: DetectRTC.isMobileDevice,
			osName: DetectRTC.osName,
			osVersion: DetectRTC.osVersion,
			browserName: DetectRTC.browser.name,
			browserVersion: DetectRTC.browser.version,
			isChrome: DetectRTC.browser.isChrome || false,
			isFirefox: DetectRTC.browser.isFirefox || false,
			isOpera: DetectRTC.browser.isOpera || false,
			isIE: DetectRTC.browser.isIE || false,
			isSafari: DetectRTC.browser.isSafari || false,
			isEdge: DetectRTC.browser.isEdge || false,
			isPrivateBrowsing: DetectRTC.browser.isPrivateBrowsing || false,
			userAgent: navigator.userAgent,
		},
	};
	// Safari used .mov extension, other browsers use .webm
	// Create dynamic extension depening on browser
	data.meta.videoExtension = data.meta.isSafari ? 'mov' : 'webm';

	// check if all translation keys have a matching foreignObject and vice versa
	const textKeys = widowedKeyChecker();

	const translation = _.zipObject(
		Object.keys(translations),
		Object.values(translations).map((e) => e[data.culture])
	);

	// iterate over all text keys and add text into foreign objects
	textKeys.forEach((e) => {
		const foNodes = document.querySelectorAll(`[id^="text-${e}"]`);
		foNodes.forEach((foNode) => {
			foNode.innerHTML = translation[e as keyof typeof translation];
		});
	});

	// hide all group slides
	hideFirstChildSlides();

	// apply initial SVG settings and style
	svg.style.backgroundColor = config.svgBg;
	document.body.style.backgroundColor = config.htmlBg;

	// set cursor pointer for all elements defined in config
	setMousePointer();
	setScaleOnHover();

	if (config.devmode.on) {
		Toastify({
			escapeMarkup: false,
			text: `⚙️ <strong>DEVMODE ON</strong>`,
			duration: 0,
			// destination: 'https://github.com/apvarun/toastify-js',
			// newWindow: true,
			// close: true,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			className: 'toast-error',
			// style: {
			// 	background:
			// 		'linear-gradient(to bottom, hsl(335deg 86% 46%) 0%, hsl(347deg 90% 42%) 50%, hsl(347deg 90% 42%) 50%)',
			// },
			// onClick: function () {}, // Callback after click
		}).showToast();
	}

	// show warning when user tries to leave the page
	if (!config.devmode.on) {
		window.onbeforeunload = function (evt: BeforeUnloadEvent) {
			evt.preventDefault();
			global.data.quitBeforeEnd = true;
			uploadData();
			return '';
		};
	}

	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	const audio = document.getElementById('audio') as HTMLAudioElement;

	// set pinda global styles
	pinda.style.position = 'absolute';
	pinda.style.height = config.css.pinda.height;
	pinda.style.left = config.css.pinda.left;
	pinda.style.bottom = config.css.pinda.bottom;

	if (config.devmode.on) {
		audio.addEventListener('play', () => {
			audio.playbackRate = config.devmode.playbackRate;
		});
	}
	pinda.addEventListener('play', (e: Event) => {
		if (config.devmode.on) {
			console.log((e.target as HTMLVideoElement).src);
		}
		gsap.set(pinda, { autoAlpha: 0 });
		gsap.to(pinda, { autoAlpha: 1 });
		if (config.devmode.on) {
			pinda.playbackRate = config.devmode.playbackRate;
		}
	});

	// blocking state slide
	const bsFo = document.getElementById('s-bs')! as SvgInHtml;
	bsFo.innerHTML = `<div id="blocking-state" style="
	height: 100%;
	width: 100%;
	background-color: #fff;
	opacity: 0.75;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(10px);"></div>`;

	gsap.set('#link-ccp-orb', { transformOrigin: '50% 50%', scale: 0.5, filter: 'blur(5px)' });
	gsap.to('#link-ccp-orb', {
		duration: 0.3,
		rotation: 360,
		repeat: -1,
		ease: 'none',
	});

	if (config.devmode.on) {
		global.translations = translations;
		global.showSingleSlide = showSingleSlide;
		global.swapSlides = swapSlides;
		global.hideFirstChildSlides = hideFirstChildSlides;
		global.hideAllChildSlides = hideAllChildSlides;
		global.getChildrenFromParent = getChildrenFromParent;
		global.removeDisplayNone = removeDisplayNone;
		global.uploadAudio = uploadAudio;
		global.svgChilds = svgChilds;
		global.recycleObjects = recycleObjects;
		global.copyAttributes = copyAttributes;
	}
	// always expose downloadData function
	global.downloadData = downloadData;
	global.uploadData = uploadData;
	global.config = config;
};
