import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
	const details = document.querySelector('.details') as HTMLElement
	const titleText = document.querySelector(
		'.details__title span'
	) as HTMLElement
	const box = document.querySelector('.details__box') as HTMLElement
	const marqueeText = document.querySelector('.marquee__text') as HTMLElement

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: details,
			start: '-10% center',
			end: 'center center',
			scrub: true,
			invalidateOnRefresh: true
		}
	})

	tl.to(titleText, {
		transform: 'translateY(0)'
	}).to(
		box,
		{
			height: 300
		},
		'<'
	)

	gsap.to(marqueeText, {
		scrollTrigger: {
			trigger: '.marquee',
			start: 'top 80%',
			end: 'bottom top',
			scrub: true
		},
		x: -300
	})
})
