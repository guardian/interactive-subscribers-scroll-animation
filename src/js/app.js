


const $ = sel => document.querySelector(sel)
const $$ = sel => [].slice.apply(document.querySelectorAll(sel))

const sticking = $('.sticking-wrapper')
const scrolling = $('.scrolling-wrapper')

let scrollTop = 0
let scrolledBefore = false
let isiOS = document.body.classList.contains("ios");

window.addEventListener('scroll', () => scrolledBefore === false ? scrolledBefore = true : null)

const checkScroll = (initial) => {

	window.requestAnimationFrame(() => {
		if(window.pageYOffset !== scrollTop && !initial) {

			//console.log(scrolling.getBoundingClientRect().bottom)
			scrollTop = window.pageYOffset

			if((scrolling.getBoundingClientRect().top <= 0 && !isiOS) || (scrolling.getBoundingClientRect().top <= -60 && isiOS)) {
				sticking.classList.add('wrapper--sticky')
			} else {
				sticking.classList.remove('wrapper--sticky')
			}
			if ( scrolling.getBoundingClientRect().bottom <= window.innerHeight && scrolledBefore) {

				sticking.classList.add('wrapper--end')
			}
			else {
				sticking.classList.remove('wrapper--end')
			}

		}

		checkScroll()

	})

}

checkScroll(true)

var iframes = document.querySelectorAll('.element-atom.element--immersive');
if(iframes){
	document.querySelectorAll('.element-atom.element--immersive')[1].className += ' map';
}
