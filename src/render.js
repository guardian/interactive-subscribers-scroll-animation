import templateHTML from "./src/templates/main.html!text"
import ScrollyContainer from './src/templates/scrolly_container.html!text'
import Handlebars from 'handlebars'
import fs from 'fs'


export async function render() {
	// this function just has to return a string of HTML
	// you can generate this using js, e.g. using Mustache.js

	//console.log(process.env.THE_PATH) 

	const styles = `

		<style>

		body {
			height: 100%;
		}
 
			[id^="gu-subscribers-ab"] {
				position: absolute !important;
				top: 0 !important;
				width: 100% !important;
				height:  100%;
				opacity: 0;

				transition: opacity 1.2s;


			}


			#gu-subscribers-ab-box {
				position: relative !important;
			}

			[id^="gu-subscribers-ab-300-1"] {
				position: relative !important;
				opacity: 1 !important;

			}

			[id^="gu-subscribers-ab-380-1"] {
				position: relative !important;
				opacity: 1 !important;

			}

			[id^="gu-subscribers-ab-460-1"] {
				position: relative !important;
				opacity: 1 !important;

			}

			[id^="gu-subscribers-ab-620-1"] {
				position: relative !important;
				opacity: 1 !important;


			}

			[id^="gu-subscribers-ab-860-1"] {
				position: relative !important;
				opacity: 1 !important;

			}


			[id^="gu-subscribers-ab-1260-1"] {
				position: relative !important;
				opacity: 1 !important;

			}

		</style>

	` 

	const script = `
	<script>

		window.frameElement.style.height = window.document.body.clientHeight + 'px';

		var grandpar = window.frameElement.parentElement.parentElement.parentElement;

		//console.log(window.document.body.clientWidth);

		window.frameElement.style.width = grandpar.clientWidth + 'px';

		setTimeout(function() {

		window.frameElement.style.width = grandpar.clientWidth + 'px';
		window.frameElement.style.height = window.document.body.clientHeight + 'px';

		}, 1000)


		window.frameElement.style.width = grandpar.clientWidth + 'px';

		var par = window.frameElement.parentElement.parentElement;
		var hundredVh = window.frameElement.parentElement.clientHeight;

		var scroll = 0;

		var artboards = [].slice.apply(document.querySelectorAll('[id^="gu-subscribers-ab"]'))
			.filter(function(el) { return window.getComputedStyle(el).getPropertyValue('display') === 'block'; })

		var mobile = window.parent.matchMedia('(max-width: 619px)').matches;

		par.style.height = mobile ? artboards.length*100 + 50 + 'vh' : artboards.length*100 + 50 + 'vh';

		var index = 0;

		function showIndex(i) {

			artboards.forEach(function(ab, j) {

				if(j <= i) {
					ab.style.opacity = '1';
				}
				else {
					ab.style.opacity = '0';
				}
			})

		}

		function checkScroll() {

			window.requestAnimationFrame(function() {

				if(scroll !== par.getBoundingClientRect().top) {

					scroll = par.getBoundingClientRect().top;
					index = Math.floor(Math.abs(scroll) / hundredVh);

					showIndex(index);
				}

				checkScroll();

			})
		}

		checkScroll();




	</script>
	`

	const copyBlocks = ['In one of the worst shipwrecks of the migrant crisis, 373 people died when a boat caught fire and sunk off the coast of the Italian island of Lampedusa','As the Syrian conflict escalates, the list shows an increase in deaths in the Mediterranean','EU states agree a €2bn trust fund for African countries to help stop migrants reaching Europe','Sea arrivals to Italy, Greece and Spain plunge from over a million in 2015 to just 362,000 in 2016','The list records a greater proportion of deaths close to the North African coast']

	const indexHTML = fs.readFileSync('./src/assets/slides/index.html', 'utf-8')
		.replace(/background-image:url\((.*\.png)\)/g, (match, img) => `background-image:url(${process.env.THE_PATH.replace(/"/g, '')}/assets/slides/${img})`)
		.replace('</body>', styles + script + '</body>')
		.replace(/"/g, '&quot;')

	const scrollyHTML = Handlebars.compile(ScrollyContainer)({ html : indexHTML, copyBlocks })

    return scrollyHTML;
}
