import { gsap } from 'gsap';
import { play } from '../util/audio';
import { swapSlides } from '../util/slideVisibility';
import { getResponse } from '../util/getResponse';
import { startFullscreen } from '../util/helpers';
import config from '../config.yaml';
import type { SvgInHtml } from '../types';

export default async ({ currentSlide, previousSlide }) => {
	// show slide
	swapSlides(currentSlide, previousSlide);

	const audio = document.getElementById('audio') as HTMLMediaElement;

	const speaker = document.getElementById('link-si-speaker') as SvgInHtml;
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	const headphones = document.getElementById('link-si-headphones') as SvgInHtml;
	const nextButton = document.getElementById('link-si-next') as SvgInHtml;
	const childQuestion = document.getElementById('text-introChild') as SvgInHtml;
	const adultQuestion = document.getElementById('text-introAdult') as SvgInHtml;
	gsap.set([headphones, nextButton], { autoAlpha: 0, pointerEvents: 'none' });

	const parentBlock = document.getElementById('s-blocking-state') as SvgInHtml;
	parentBlock.removeAttribute('visibility');
	const preloadVideo = await fetch(
		`./cultures/${data.culture}/video/s-introduction.${data.meta.videoExtension}`
	);
	const blob = await preloadVideo.blob();
	const url = URL.createObjectURL(blob);
	parentBlock.setAttribute('visibility', 'hidden');

	if (data.agegroup === 'adult') {
		gsap.set(childQuestion, { autoAlpha: 0 });
	} else {
		// default to child version
		gsap.set(adultQuestion, { autoAlpha: 0 });
	}

	let playingTimeline = true;
	speaker.addEventListener('click', () => {
		if (!config.devmode.on) {
			startFullscreen();
		}
		play(`./cultures/${data.culture}/audio/pop.mp3`);
		gsap.to(speaker, { autoAlpha: 0 });
		play(`./cultures/${data.culture}/audio/si-next-red.mp3`, headphones.id);

		audio.addEventListener('play', () => {
			nextButton.style.pointerEvents = 'none';
			headphones.style.pointerEvents = 'none';
			gsap.set([nextButton, headphones], { autoAlpha: 0.25 });
		});
		pinda.addEventListener('play', () => {
			nextButton.style.pointerEvents = 'none';
			headphones.style.pointerEvents = 'none';
			if (playingTimeline) {
				gsap.set([nextButton, headphones], { autoAlpha: 0 });
			} else {
				gsap.set([nextButton, headphones], { autoAlpha: 0.5 });
			}
		});
		audio.addEventListener('ended', () => {
			if (playingTimeline) {
				nextButton.style.pointerEvents = 'none';
				headphones.style.pointerEvents = 'none';
				gsap.to([nextButton, headphones], { autoAlpha: 0 });
			} else {
				nextButton.style.pointerEvents = 'visible';
				headphones.style.pointerEvents = 'visible';
				gsap.to([nextButton, headphones], { autoAlpha: 1 });
			}
		});
		pinda.addEventListener('ended', () => {
			nextButton.style.pointerEvents = 'visible';
			headphones.style.pointerEvents = 'visible';
			gsap.to([nextButton, headphones], { autoAlpha: 1 });
			gsap.to(pinda, { autoAlpha: 0 });
		});

		// start pinda video
		pinda.src = url;
		pinda.play();
		// only start timeline when media can play through
		const cultureDelay = {
			headphones: {
				'de-urban': 16,
				'pe-rural': 16,
				'idj-urban': 21,
				'nam-rural': 21.5,
				'zm-rural': 22.5,
			},
			nextButton: {
				'de-urban': 5,
				'pe-rural': 4,
				'idj-urban': 5,
				'nam-rural': 5,
				'zm-rural': 13,
			},
		};
		gsap
			.timeline()
			.to(headphones, {
				autoAlpha: 0.5,
				delay: cultureDelay.headphones[data.culture],
				duration: 0.5,
				opacity: 1,
				visibility: 'visible',
			})
			.to(headphones, {
				filter: 'drop-shadow(0px 0px 14px #000)',
				delay: 1,
				repeat: 4,
				yoyo: true,
				reversed: true,
			})
			.to(nextButton, {
				autoAlpha: 0.5,
				delay: cultureDelay.nextButton[data.culture],
				opacity: 1,
				visibility: 'visible',
				onComplete: () => {
					playingTimeline = false;
				},
			})
			.to(nextButton, {
				filter: 'drop-shadow(0px 0px 14px #a90707)',
				delay: 1,
				repeat: -1,
				yoyo: true,
				reversed: true,
			});
	});

	await getResponse(nextButton.id);
};
