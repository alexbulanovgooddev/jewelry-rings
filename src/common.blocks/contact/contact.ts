import { gsap } from 'gsap'
// import SplitType from 'split-type'

document.addEventListener('DOMContentLoaded', () => {
	const contact = document.querySelector('.contact') as HTMLElement
	const topLine = document.querySelector('.contact__line--top')
	const bottomLine = document.querySelector('.contact__line--bottom')
	const titleText = document.querySelector('.contact__title span')
	const ctaButton = document.querySelector('.contact__cta .button')
	const description = document.querySelector('.contact__description')

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: contact,
			start: '-10% center',
			end: 'center center',
			scrub: true,
			invalidateOnRefresh: true
		}
	})

	tl.to([topLine, bottomLine], {
		width: '100%'
	})
		.to(titleText, {
			transform: 'translateY(0)'
		})
		.to(ctaButton, {
			transform: 'translateY(0)'
		})
		.to(description, {
			opacity: 1
		})
})
