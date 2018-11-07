

const styles = [].slice.apply(document.querySelectorAll("style"));

const html = document.querySelector(".scrolling-wrapper");

const parentPage = window.parent.document;

styles.forEach(style => {
	parentPage.body.appendChild(style);
});

window.frameElement.parentNode.innerHTML = html.outerHTML;

var el = parentPage.createElement('script');

el.src = process.env.THE_PATH + '/app.js';
parentPage.body.appendChild(el);
