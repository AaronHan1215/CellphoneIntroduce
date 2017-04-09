// 获取元素
function getElem(selector) {
	return document.querySelector(selector);
}
function getAllElem(selector) {
	return document.querySelectorAll(selector);
}

// 获取元素样式
function getCls(element) {
	return element.getAttribute('class');
}
// 设置元素样式
function setCls(element, cls) {
	return element.setAttribute('class', cls);
}

// 为元素添加样式
function addCls(element, cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) === -1) {
		setCls(element, baseCls + ' ' + cls);
	}
}
// 为元素删除样式
function delCls(element, cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) !== -1) {
		setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
	}
}

// 1.初始化页面样式 init
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
// 1-1 初始化屏内元素
function setScreenAnimateInit(screenCls) {
	// 获取当前屏元素
	var screen = getElem(screenCls);
	// 当前屏里需要做动画的元素
	var animateElements = screenAnimateElements[screenCls];
	for (var i = 0; i < animateElements.length; i++) {
		// 获取要做动画的每一个元素
		var element = getElem(animateElements[i]);
		// 获取该元素当前的className
		var baseCls = getCls(element);
		// 给该元素添加动画class
		element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
	}
};
window.onload = function () {
	for (var k in screenAnimateElements) {
		if (k === '.screen-1') {
			continue;
		}
		setScreenAnimateInit(k);
	}
	playScreenAnimateDone('.screen-1');
	// 导航条首页高亮初始化
	switchNavItemsActive(0);
}
// 1-2 设置播放屏内元素的动画
function playScreenAnimateDone(screenCls) {
	// 获取当前屏元素
	var screen = getElem(screenCls);
	// 当前屏里需要做动画的元素
	var animateElements = screenAnimateElements[screenCls];
	for (var i = 0; i < animateElements.length; i++) {
		// 获取要做动画的每一个元素
		var element = getElem(animateElements[i]);
		// 获取该元素当前的className
		var baseCls = getCls(element);
		// 给该元素添加动画class
		element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
	}
}

// 2.滚动到哪个页面，哪个页面就做动画
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');
var navTip = getElem('.header__nav-tip');// 滑动门变量
function switchNavItemsActive(idx) {
	for (var i = 0; i < navItems.length; i++) {
		delCls(navItems[i], 'header__nav-item_status_active');
	}
	addCls(navItems[idx], 'header__nav-item_status_active');
	for (var i = 0; i < outlineItems.length; i++) {
		delCls(outlineItems[i], 'outline__item_status_active');
	}
	addCls(outlineItems[idx], 'outline__item_status_active');
}
window.onscroll = function () {
	var top = document.body.scrollTop;
	if (top > 80) {
		addCls(getElem('.header'), 'header_status_back');
		addCls(getElem('.outline'), 'outline_status_in');

	} else {
		delCls(getElem('.header'), 'header_status_back');
		delCls(getElem('.outline'), 'outline_status_in');
		switchNavItemsActive(0);
	}
	if (top > 1) {
		playScreenAnimateDone('.screen-1');
		navTip.style.left = (0 * 70) + 'px';
	}
	if (top > 800 * 1 - 100) {
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
		navTip.style.left = (1 * 70) + 'px';
	}
	if (top > 800 * 2 - 100) {
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
		navTip.style.left = (2 * 70) + 'px';
	}
	if (top > 800 * 3 - 100) {
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
		navTip.style.left = (3 * 70) + 'px';
	}
	if (top > 800 * 4 - 100) {
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
		navTip.style.left = (4 * 70) + 'px';
	}
}

// 3.nav和outline双向定位
function setNavJump(i, lib) {
	var item = lib[i];
	item.onclick = function () {
		document.body.scrollTop = i * 800;
		navTip.style.left = (i * 70) + 'px';
	}
}
for (var i = 0; i < navItems.length; i++) {
	setNavJump(i, navItems);
}
for (var i = 0; i < outlineItems.length; i++) {
	setNavJump(i, outlineItems);
}

//  4.滑动门特效
function setTip(idx, lib) {
	lib[idx].onmouseover = function () {
		if (idx < lib.length - 1) {
			navTip.style.left = (idx * 70) + 'px';
		}
	}
	var activeIdx = 0;
	lib[idx].onmouseout = function () {
		for (var i = 0; i < lib.length; i++) {
			if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
				activeIdx = i;
				break;
			}
		}
		navTip.style.left = (activeIdx * 70) + 'px';
	}
}
for (var i = 0; i < navItems.length; i++) {
	setTip(i, navItems);
}