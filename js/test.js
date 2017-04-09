var screenAnimateElements = {
	'.screen-1': [
		'.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow'
	],
	'.screen-2': [
		'.screen-2__heading',
		'.screen-2__phone',
		'.screen-2__subheading',
		'.screen-2__point',
		'.screen-2__point_i_1',
		'.screen-2__point_i_2',
		'.screen-2__point_i_3'
	],
	'.screen-3': [
		'.screen-3__heading',
		'.screen-3__phone',
		'.screen-3__subheading',
		'.screen-3__features'
	],
	'.screen-4': [
		'.screen-4__heading',
		'.screen-4__subheading',
		'.screen-4__type__item_i_1',
		'.screen-4__type__item_i_2',
		'.screen-4__type__item_i_3',
		'.screen-4__type__item_i_4'
	],
	'.screen-5': [
		'.screen-5__heading',
		'.screen-5__subheading',
		'.screen-5__bg'
	]
}

function setScreenAnimate(screenCls) {
	// 获取当前屏元素
	var screen = document.querySelector(screenCls);
	// 当前屏里需要做动画的元素
	var animateElements = screenAnimateElements[screenCls];
	// 判断是否有初始化子元素的样式，默认为false
	var isSetnimateClass = false;
	var isAnimateDone = false;
	screen.onclick = function () {
		// 初始化样式(增加init)
		if (isSetnimateClass === false) {
			for (var i = 0; i < animateElements.length; i++) {
				// 获取要做动画的每一个元素
				var element = document.querySelector(animateElements[i]);
				// 获取该元素当前的className
				var baseCls = element.getAttribute('class');
				// 给该元素添加动画class
				element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
			}
			isSetnimateClass = true;
			return;
		}
		// 切换所有的animateElements 的状态 init -> done
		if (isAnimateDone === false) {
			for (var i = 0; i < animateElements.length; i++) {
				// 获取要做动画的每一个元素
				var element = document.querySelector(animateElements[i]);
				// 获取该元素当前的className
				var baseCls = element.getAttribute('class');
				// 给该元素添加动画class
				element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
			}
			isAnimateDone = true;
			return;
		}
		// 切换所有的animateElements 的状态 done -> init
		if (isAnimateDone === true) {
			for (var i = 0; i < animateElements.length; i++) {
				// 获取要做动画的每一个元素
				var element = document.querySelector(animateElements[i]);
				// 获取该元素当前的className
				var baseCls = element.getAttribute('class');
				// 给该元素添加动画class
				element.setAttribute('class', baseCls.replace('_animate_done', '_animate_init'));
			}
			isAnimateDone = false;
			return;
		}
	}

};

for (var k in screenAnimateElements) {
	setScreenAnimate(k);
}