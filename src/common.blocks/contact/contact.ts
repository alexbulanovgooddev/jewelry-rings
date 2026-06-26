import { gsap } from 'gsap'
// import SplitType from 'split-type'

document.addEventListener('DOMContentLoaded', () => {
	const contact = document.querySelector('.contact') as HTMLElement
	const topLine = document.querySelector('.contact__line--top') as HTMLElement
	const bottomLine = document.querySelector(
		'.contact__line--bottom'
	) as HTMLElement
	const titleText = document.querySelector(
		'.contact__title span'
	) as HTMLElement
	const ctaButton = document.querySelector(
		'.contact__cta .button'
	) as HTMLElement
	const description = document.querySelector(
		'.contact__description'
	) as HTMLElement

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
