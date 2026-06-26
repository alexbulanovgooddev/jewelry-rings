import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import ringModelUrl from '~/assets/model/ring.glb?url'

document.addEventListener('DOMContentLoaded', () => {
	let _contactRotation = false
	let _ring: THREE.Group | null = null
	let _renderer: THREE.WebGLRenderer | null = null
	let _scene: THREE.Scene | null = null
	let _camera: THREE.PerspectiveCamera | null = null

	const loader = new GLTFLoader()

	_scene = new THREE.Scene()

	loader.load(ringModelUrl, async function (gltf) {
		_ring = gltf.scene
		_ring.position.set(0, 0, 0)
		_ring.scale.set(0.5, 0.5, 0.5)
		_scene?.add(_ring)

		// Debug GUI только в dev режиме
		if (import.meta.env.DEV) {
			const dat = await import('dat.gui')
			const gui = new dat.GUI()
			const ringFolder = gui.addFolder('Ring')
			ringFolder.add(_ring.position, 'x').min(-3).max(3).step(0.01)
			ringFolder.add(_ring.position, 'y').min(-3).max(3).step(0.01)
			ringFolder.add(_ring.position, 'z').min(-3).max(3).step(0.01)
		}

		function toggleWireframe(
			model: THREE.Object3D,
			isWireframe: boolean,
			opacity: number
		): void {
			model.traverse((child: THREE.Object3D) => {
				if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
					const mesh = child as THREE.Mesh
					const material = mesh.material as THREE.MeshStandardMaterial
					material.wireframe = isWireframe
					material.opacity = opacity
					material.transparent = opacity < 1 ? true : false
				}
			})
		}

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: 'section.details',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			},
			defaults: {
				ease: 'power3.out',
				duration: 3
			}
		})

		tl.to(_ring.position, {
			x: 0.05,
			z: 2.5,
			y: -0.34
		})

		tl.to(
			_ring.rotation,
			{
				z: 1
			},
			'<'
		)

		const mm2 = gsap.matchMedia()

		mm2.add(
			{
				isDesktop: '(min-width: 768px)',
				isMobile: '(max-width: 767px)'
			},
			context => {
				const { isDesktop } = context.conditions as {
					isDesktop: boolean
					isMobile: boolean
				}

				// Timeline для wireframe материала
				ScrollTrigger.create({
					trigger: '.contact',
					start: 'top bottom',
					end: 'bottom center',
					id: 'wireframe',
					onEnter: () => {
						toggleWireframe(_ring as THREE.Object3D, true, 1)
						_contactRotation = false
					},
					onEnterBack: () => {
						toggleWireframe(_ring as THREE.Object3D, true, 1)
						_contactRotation = false
					},
					onLeave: () => {
						toggleWireframe(_ring as THREE.Object3D, false, 1)
						_contactRotation = false
					},
					onLeaveBack: () => {
						toggleWireframe(_ring as THREE.Object3D, false, 1)
						_contactRotation = false
					}
				})

				// Timeline для перемещения кольца
				const tl2 = gsap.timeline({
					scrollTrigger: {
						trigger: '.contact',
						start: 'top bottom',
						end: 'bottom+=50% center',
						scrub: 1,

						id: 'position'
					}
				})

				if (_ring) {
					tl2.to(_ring.position, {
						z: 0.3,
						x: isDesktop ? 0.4 : 0,
						y: -0.23
					})

					if (isDesktop) {
						tl2.to(_ring.position, {
							x: 0
						})
					}
				}
			}
		)

		const directionalLight = new THREE.DirectionalLight('lightblue', 10)
		directionalLight.position.z = 8
		_scene?.add(directionalLight)
	})

	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	_camera = new THREE.PerspectiveCamera(
		75,
		sizes.width / sizes.height,
		0.1,
		100
	)
	_camera.position.x = 0
	_camera.position.y = 0
	_camera.position.z = 1.5
	_scene.add(_camera)

	const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement
	_renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
		antialias: true
	})
	_renderer.setSize(sizes.width, sizes.height)
	_renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

	window.addEventListener('resize', () => {
		sizes.width = window.innerWidth
		sizes.height = window.innerHeight

		if (_camera && _renderer) {
			_camera.aspect = sizes.width / sizes.height
			_camera.updateProjectionMatrix()

			_renderer.setSize(sizes.width, sizes.height)
			_renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		}
	})

	const timer = new THREE.Timer()

	const tick = (timestamp?: number) => {
		timer.update(timestamp)
		const elapsedTime = timer.getElapsed()

		if (_ring) {
			if (!_contactRotation) {
				_ring.rotation.y = 0.5 * elapsedTime
				_ring.rotation.x = 0
				_ring.rotation.z = 0
			} else {
				_ring.rotation.y = 0
				_ring.rotation.x = 0.2 * elapsedTime
				_ring.rotation.z = 0.2 * elapsedTime
			}
		}

		if (_renderer && _scene && _camera) {
			_renderer.render(_scene, _camera)
		}

		window.requestAnimationFrame(tick)
	}

	tick()
})
