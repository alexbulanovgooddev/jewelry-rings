import { gsap } from 'gsap'

window.addEventListener('load', () => {
	// load срабатывает после загрузки всех ресурсов (изображения, шрифты, стили, модели)

	const loadingScreen = document.querySelector<HTMLElement>('.loading-screen')

	const unlockScroll = () => {
		document.documentElement.classList.remove('is-loading')
	}

	if (!loadingScreen) {
		unlockScroll()
		return
	}

	gsap.to(loadingScreen, {
		yPercent: -100,
		duration: 1,
		delay: 0.3,
		ease: 'power3.inOut',
		onComplete: () => {
			unlockScroll()
			loadingScreen.remove()
		}
	})
})
