import { gsap } from 'gsap';
import { swapSlides } from '../util/slideVisibility';
import { exitFullscreen, sleep } from '../util/helpers';

export default async ({ currentSlide, previousSlide }) => {
	// swap slides automatically (don’t touch this)
	swapSlides(currentSlide, previousSlide);
	exitFullscreen();
	const pinda = document.getElementById('pinda') as HTMLVideoElement;
	pinda.src = `./cultures/${data.culture}/video/s-end.${data.meta.videoExtension}`;

	pinda.addEventListener('ended', () => {
		// For prolific users
		if (data.PROLIFIC_PID !== 'none') {
			window.location.href = `https://app.prolific.com/submissions/complete?cc=C1JMG40C`;
		}
		// for german setting, forward to goodbye.html with coupon
		else if (data.culture === 'de-urban') {
			gsap.to(pinda, { autoAlpha: 0, duration: 2 });
			window.location.href = `./goodbye.html?coupon=${data.coupon}`;
		}
		gsap.to(pinda, { autoAlpha: 0, duration: 3 });
	});
};
