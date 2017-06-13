// Global variables / constants
const animatedElems = document.querySelectorAll('.animated')
var didScroll = false,
	lastScrollTop = 0

// Reload page on page show
window.onpageshow = e => {
	if (e.persisted) location.reload()
}

// Set didScroll to true when on scroll
window.addEventListener('scroll', () => {
	didScroll = true
})

// Get window scrollTop
function scrollTop() {
	return document.documentElement.scrollTop || document.body.scrollTop
}

// Trigger showAnimatedElem function on resize
window.addEventListener('resize', () => {
	showAnimatedElem(scrollTop())
})

// Call hasScrolled function when user just scrolled
setInterval(() => {
	if (didScroll) {
		hasScrolled()
		didScroll = false
	}
}, 100)

// Display sections in view on page load
if (animatedElems.length > 0) {
	showAnimatedElem(scrollTop())
}

// Homepage down arrow
if (document.querySelector('.home') != null) {
	let arrow = document.querySelector('.down-arrow')
	arrow.onclick = () => {
		let to = getOffsetTop(document.querySelector('.home__partners'))
		scrollTo(document, to)
	}
}

// Call showAnimatedElem function if animated sections exist
function hasScrolled() {
	let st = scrollTop()
	if (animatedElems.length > 0) {
		showAnimatedElem(st)
	}
	lastScrollTop = st
}

// Display animated sections in view
function showAnimatedElem(scrollTop) {
	let delta = 300,
		heightInView

	[...animatedElems].forEach(section => {
		// Show section if height in view is at least delta or half of its own height
		let alpha = Math.min(section.clientHeight/2, delta)
		heightInView = viewport().height + scrollTop - getOffsetTop(section)

		if (heightInView >= alpha) {
			section.classList.add('in-view')
		} else if (heightInView <= 0 && section.classList.contains('in-view')) {
			section.classList.remove('in-view')
		}
	})
}

// Get viewport width and height
function viewport() {
	let e = window,
		a = 'inner'
	if (!( 'innerWidth' in window )) {
		a = 'client'
		e = document.documentElement || document.body
	}
	return {
		width: e[a+'Width'],
		height: e[a+'Height']
	}
}

// Find elem's offsetTop relative to document
function getOffsetTop(elem) {
	let offsetTop = 0
	do {
		if (!isNaN(elem.offsetTop)) {
			offsetTop += elem.offsetTop
		}
	} while (elem = elem.offsetParent)
	return offsetTop
}

// Animated scrollTo
function scrollTo(element, to, duration=600) {
	let start = scrollTop(),
		change = to - start,
		currentTime = 0,
		increment = 5

	let animateScroll = () => {
		currentTime += increment
		let val = Math.easeInOutQuad(currentTime, start, change, duration)
		document.documentElement.scrollTop = val
		document.body.scrollTop = val
		if(currentTime < duration) {
			setTimeout(animateScroll, increment)
		}
	}
	animateScroll()
}

Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2
	if (t < 1) return c/2*t*t + b
	t--
	return -c/2 * (t*(t-2) - 1) + b
}

