import { gsap } from 'gsap'
import SplitType from 'split-type'

const WORDS = ['Romance', 'Elegance', 'Timeless', 'Beauty']

document.addEventListener('DOMContentLoaded', () => {
	const wordElement = document.getElementById('animated-word')

	let currentWordIndex = 0
	let _split: SplitType | null = null

	function animateChars(chars: HTMLElement[]) {
		gsap.from(chars, {
			yPercent: 100,
			stagger: 0.05,
			duration: 1.5,
			ease: 'power3.out',
			onComplete: () => {
				if (_split) {
					_split.revert()
				}
			}
		})
	}

	function changeWord() {
		if (!wordElement) return

		wordElement.textContent = WORDS[currentWordIndex]

		_split = new SplitType('#animated-word', { types: 'chars' })

		if (_split.chars) {
			animateChars(_split.chars)
			currentWordIndex = (currentWordIndex + 1) % WORDS.length
		}
	}

	setInterval(changeWord, 3000)
})
