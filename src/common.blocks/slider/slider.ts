import { gsap } from 'gsap'
import SplitType from 'split-type'

document.addEventListener('DOMContentLoaded', () => {
	const mm = gsap.matchMedia()

	mm.add(
		{
			isMobile: '(max-width: 767px)',
			isDesktop: '(min-width: 768px)'
		},
		context => {
			const { isDesktop } = context.conditions as {
				isDesktop: boolean
				isMobile: boolean
			}

			const slider = document.querySelector('.slider') as HTMLElement
			const progress = document.querySelector(
				'.slider__progress'
			) as HTMLElement
			const slides = gsap.utils.toArray('.slide') as HTMLElement[]

			const tl = gsap.timeline({
				defaults: { ease: 'none', duration: 1 },
				scrollTrigger: {
					trigger: slider,
					pin: isDesktop ? true : false,
					scrub: 1,
					invalidateOnRefresh: true,
					end: () =>
						isDesktop ? `+=${slider.offsetWidth - window.innerWidth}` : 'bottom'
				}
			})

			if (isDesktop) {
				tl.to(
					slider,
					{
						xPercent: () =>
							-(100 - (window.innerWidth / slider.offsetWidth) * 100)
					},
					'<'
				).to(
					progress,
					{
						width: '100%'
					},
					'<'
				)
			}

			slides.forEach(slide => {
				const text = slide.querySelector('.slide__text') as HTMLElement
				const split = new SplitType(text, { types: 'chars' })

				gsap.from(split.chars, {
					opacity: 0,
					y: 10,
					stagger: 0.02,
					scrollTrigger: {
						trigger: text,
						start: isDesktop ? 'left center' : 'top bottom',
						end: isDesktop ? 'center center' : 'bottom center',
						containerAnimation: isDesktop ? tl : undefined,
						scrub: 1
					}
				})
			})
		}
	)
})
