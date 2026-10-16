// wotlksim: tooltips for custom items and glyphs that don't exist on Wowhead.
//
// ActionId.makeItemUrl() returns a "#wotlksim-item-<id>" link for these IDs instead of a
// Wowhead URL, so Wowhead's script ignores them (no more "Item not found"). A single
// document-level hover handler shows our own tooltip for those links everywhere
// (gear slots, item lists, glyph picker, ...).

type Line = string | [string, string]; // text, or [left, right]

interface CustomTooltip {
	name: string;
	quality: 'legendary' | 'epic' | 'common';
	lines: Array<Line | { text: string; color: 'green' | 'gray' | 'yellow' | 'blue' }>;
}

const gem = (color: string) => ({ text: `${color} Socket`, color: 'gray' as const });
const green = (text: string) => ({ text, color: 'green' as const });

const STORMCOIL_PROC =
	'Chance on hit: Hurls a lightning bolt at the enemy, dealing 734 to 838 Nature damage and then jumping to additional nearby enemies. Each jump reduces the damage by 30%. Affects 3 total targets. (15 sec cooldown)';

const CUSTOM_TOOLTIPS: Record<number, CustomTooltip> = {
	128858: {
		name: 'Embersoul, Scythe of the Cat God',
		quality: 'legendary',
		lines: [
			'Item Level 245',
			'Binds when picked up',
			['Two-Hand', 'Polearm'],
			['761 - 1080 Damage', 'Speed 3.60'],
			'(255.7 damage per second)',
			'+130 Agility',
			'+142 Stamina',
			gem('Red'),
			{ text: 'Socket Bonus: +8 Agility', color: 'gray' },
			'Classes: Druid',
			'Requires Level 80',
			green('Increases attack power by 2812 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Increases attack power by 177.'),
			green('Equip: Improves critical strike rating by 98.'),
			green('Equip: Increases your armor penetration rating by 92.'),
			green('Equip: Your finishing moves restore 4 energy per combo point spent.'),
		],
	},
	130031: {
		name: 'Armata Strigoi',
		quality: 'legendary',
		lines: [
			'Item Level 232',
			'Binds when picked up',
			['Two-Hand', 'Axe'],
			['673 - 1008 Damage', 'Speed 3.60'],
			'(233.5 damage per second)',
			'+131 Strength',
			'+139 Stamina',
			gem('Red'),
			gem('Yellow'),
			{ text: 'Socket Bonus: +6 Strength', color: 'gray' },
			'Requires Level 80',
			green('Increases attack power by 2501 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Improves critical strike rating by 81.'),
			green('Equip: Increases your armor penetration rating by 64.'),
			green('Chance on hit: Your melee auto attacks have a 40% chance to bind a Forgotten Soul. When 4 Forgotten Souls are accumulated, they are released, triggering an instant weapon attack.'),
		],
	},
	150005: {
		name: 'Stormcoil',
		quality: 'legendary',
		lines: [
			'Item Level 232',
			'Binds when picked up',
			'Unique',
			['Ranged', 'Gun'],
			['449 - 637 Damage', 'Speed 2.90'],
			'(187.2 damage per second)',
			'+38 Agility',
			'+38 Stamina',
			'Requires Level 80',
			green('Equip: Increases attack power by 50.'),
			green('Equip: Improves critical strike rating by 26.'),
			green('Equip: Improves haste rating by 23.'),
		],
	},
	131004: {
		name: 'Doomhammer',
		quality: 'legendary',
		lines: [
			'Item Level 245',
			'Binds when picked up',
			['Main Hand', 'Mace'],
			['357 - 666 Damage', 'Speed 2.60'],
			'(196.7 damage per second)',
			'+58 Stamina',
			'+58 Intellect',
			gem('Yellow'),
			{ text: 'Socket Bonus: +4 Critical Strike Rating', color: 'gray' },
			'Classes: Shaman',
			'Requires Level 80',
			green('Increases attack power by 1987 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Improves haste rating by 58.'),
			green('Equip: Improves critical strike rating by 39.'),
			green('Equip: Increases spell power by 621.'),
			green('Equip: Gives your Flame Shock periodic damage ticks a 20% chance to reset the cooldown of your Lava Burst spell and make it an instant cast.'),
		],
	},
	315007: {
		name: 'Nargaroth, Warden of the Dark Tower',
		quality: 'legendary',
		lines: [
			'Item Level 258',
			'Binds when picked up',
			'Unique',
			['Two-Hand', 'Mace'],
			['812 - 1218 Damage', 'Speed 3.60'],
			'(281.9 damage per second)',
			'+139 Agility',
			'+172 Stamina',
			gem('Blue'),
			gem('Blue'),
			gem('Red'),
			{ text: 'Socket Bonus: +8 Stamina', color: 'gray' },
			'Requires Level 80',
			green('Increases attack power by 3180 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Improves critical strike rating by 105.'),
			green('Equip: Improves hit rating by 95.'),
			green('Equip: Increases attack power by 192.'),
			green('Chance on hit (10%, 1 min cooldown): For 8 sec, reduces damage taken by 10% and deals 1200 Fire damage to nearby enemies every 1 sec. Every time it deals damage you gain 2 Runic Power or Rage.'),
		],
	},
	217741: {
		name: 'Fury of the Sunwell',
		quality: 'legendary',
		lines: [
			'Item Level 277',
			'Binds when picked up',
			['Off Hand', 'Shield'],
			'9263 Armor',
			'259 Block',
			'+103 Strength',
			'+144 Stamina',
			gem('Meta'),
			{ text: 'Socket Bonus: +6 Stamina', color: 'gray' },
			'Requires Level 80',
			green('Equip: Increases defense rating by 60.'),
			green('Equip: Increases your parry rating by 50.'),
			green('Equip: Increases the block value of your shield by 168.'),
			green("Equip: When you are attacked (40 sec cooldown), gain Sunwell's Protection, absorbing 2750 damage for 6 sec. When it expires or is breached, it erupts with Fury of the Sunwell, dealing 3950 Holy damage to nearby enemies."),
		],
	},
	315006: {
		name: 'Nightwing',
		quality: 'legendary',
		lines: [
			{ text: 'Heroic', color: 'green' },
			'Item Level 258',
			'Binds when picked up',
			['Two-Hand', 'Staff'],
			['258 - 347 Damage', 'Speed 2.60'],
			'(116.3 damage per second)',
			'+162 Stamina',
			'+162 Intellect',
			'+89 Spirit',
			gem('Blue'),
			gem('Red'),
			{ text: 'Socket Bonus: +7 Spell Power', color: 'gray' },
			'Classes: Priest, Mage, Warlock, Druid',
			'Requires Level 80',
			green('Increases attack power by 862 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Improves critical strike rating by 124.'),
			green('Equip: Improves haste rating by 124.'),
			green('Equip: Increases spell power by 701.'),
			green('Equip: Your offensive spell casts have a 10% chance to summon a raven for 10 sec (45 sec cooldown). The raven stores damage equal to 21% of your spell damage dealt, and unleashes it when it expires.'),
		],
	},
	150090: {
		name: 'Stormcoil',
		quality: 'legendary',
		lines: [
			{ text: 'Upgrade Level: 2/3', color: 'yellow' },
			'Item Level 245',
			'Binds when picked up',
			'Unique',
			['Ranged', 'Gun'],
			['465 - 772 Damage', 'Speed 2.90'],
			'(213.3 damage per second)',
			'+44 Agility',
			'+44 Stamina',
			gem('Red'),
			{ text: 'Socket Bonus: +8 Attack Power', color: 'gray' },
			'Requires Level 80',
			green('Equip: Increases attack power by 70.'),
			green('Equip: Improves critical strike rating by 43.'),
			green('Equip: Improves haste rating by 31.'),
			green(STORMCOIL_PROC),
		],
	},
	315005: {
		name: 'Stormcoil',
		quality: 'legendary',
		lines: [
			{ text: 'Upgrade Level: 3/3', color: 'yellow' },
			'Item Level 258',
			'Binds when picked up',
			'Unique',
			['Ranged', 'Gun'],
			['590 - 809 Damage', 'Speed 2.90'],
			'(241.2 damage per second)',
			'+45 Agility',
			'+45 Stamina',
			gem('Red'),
			{ text: 'Socket Bonus: +8 Attack Power', color: 'gray' },
			'Requires Level 80',
			green('Equip: Increases attack power by 52.'),
			green('Equip: Improves critical strike rating by 37.'),
			green('Equip: Improves haste rating by 28.'),
			green(STORMCOIL_PROC),
		],
	},
	315008: {
		name: 'Doomhammer',
		quality: 'legendary',
		lines: [
			'Item Level 258',
			'Binds when picked up',
			'Unique',
			['Main Hand', 'Mace'],
			['521 - 782 Damage', 'Speed 2.60'],
			'(250.6 damage per second)',
			'+62 Stamina',
			'+64 Intellect',
			gem('Yellow'),
			{ text: 'Socket Bonus: +4 Critical Strike Rating', color: 'gray' },
			'Classes: Shaman',
			'Requires Level 80',
			green('Increases attack power by 2741 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Improves haste rating by 55.'),
			green('Equip: Improves critical strike rating by 51.'),
			green('Equip: Increases spell power by 701.'),
			green('Equip: Gives your Flame Shock periodic damage ticks a 20% chance to reset the cooldown of your Lava Burst spell and make it an instant cast.'),
		],
	},
	315010: {
		name: 'Embersoul, Scythe of the Cat God',
		quality: 'legendary',
		lines: [
			{ text: 'Upgrade Level: 2/2', color: 'yellow' },
			'Item Level 258',
			'Binds when picked up',
			'Unique',
			['Two-Hand', 'Polearm'],
			['811 - 1217 Damage', 'Speed 3.60'],
			'(281.7 damage per second)',
			'+155 Agility',
			'+139 Stamina',
			gem('Red'),
			gem('Red'),
			{ text: 'Socket Bonus: +12 Attack Power', color: 'gray' },
			'Classes: Druid',
			'Requires Level 80',
			green('Increases attack power by 3176 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Increases attack power by 190.'),
			green('Equip: Improves critical strike rating by 104.'),
			green('Equip: Increases your armor penetration rating by 99.'),
			green('Equip: Your finishing moves restore 4 energy per combo point spent.'),
		],
	},
	315004: {
		name: 'Armata Strigoi',
		quality: 'legendary',
		lines: [
			{ text: 'Upgrade Level: 2/2', color: 'yellow' },
			'Item Level 258',
			'Binds when picked up',
			['Two-Hand', 'Axe'],
			['811 - 1217 Damage', 'Speed 3.60'],
			'(281.7 damage per second)',
			'+160 Strength',
			'+183 Stamina',
			gem('Red'),
			gem('Yellow'),
			{ text: 'Socket Bonus: +6 Strength', color: 'gray' },
			'Requires Level 80',
			green('Increases attack power by 3176 in Cat, Bear, Dire Bear, and Moonkin forms only.'),
			green('Equip: Improves critical strike rating by 98.'),
			green('Equip: Increases your armor penetration rating by 101.'),
			green('Chance on hit: Your melee auto attacks have a 40% chance to bind a Forgotten Soul. When 4 Forgotten Souls are accumulated, they are released, triggering an instant weapon attack.'),
		],
	},
	132005: {
		name: 'Atiesh, Greatstaff of the Guardian',
		quality: 'legendary',
		lines: [
			'Item Level 232',
			'Binds when picked up',
			['Two-Hand', 'Staff'],
			['231 - 427 Damage', 'Speed 2.10'],
			'(156.7 damage per second)',
			'+108 Stamina',
			'+128 Intellect',
			gem('Blue'),
			gem('Red'),
			{ text: 'Socket Bonus: +7 Spell Power', color: 'gray' },
			'Classes: Priest',
			'Requires Level 80',
			green('Equip: Improves critical strike rating by 113.'),
			green('Equip: Improves haste rating by 108.'),
			green('Equip: Increases spell power by 550.'),
		],
	},
	132006: {
		name: 'Atiesh, Greatstaff of the Guardian',
		quality: 'legendary',
		lines: [
			'Item Level 232',
			'Binds when picked up',
			['Two-Hand', 'Staff'],
			['231 - 427 Damage', 'Speed 2.10'],
			'(156.7 damage per second)',
			'+108 Stamina',
			'+128 Intellect',
			gem('Blue'),
			gem('Red'),
			{ text: 'Socket Bonus: +7 Spell Power', color: 'gray' },
			'Classes: Druid',
			'Requires Level 80',
			green('Equip: Improves critical strike rating by 113.'),
			green('Equip: Improves hit rating by 120.'),
			green('Equip: Increases spell power by 550.'),
		],
	},
	132007: {
		name: 'Atiesh, Greatstaff of the Guardian',
		quality: 'legendary',
		lines: [
			'Item Level 232',
			'Binds when picked up',
			['Two-Hand', 'Staff'],
			['231 - 427 Damage', 'Speed 2.10'],
			'(156.7 damage per second)',
			'+108 Stamina',
			'+128 Intellect',
			gem('Blue'),
			gem('Red'),
			{ text: 'Socket Bonus: +7 Spell Power', color: 'gray' },
			'Classes: Mage',
			'Requires Level 80',
			green('Equip: Improves critical strike rating by 113.'),
			green('Equip: Improves haste rating by 108.'),
			green('Equip: Increases spell power by 550.'),
		],
	},
	990001: {
		name: 'Glyph of Quick Pain',
		quality: 'common',
		lines: [
			{ text: 'Major Glyph', color: 'blue' },
			{ text: 'Your haste now reduces the time between periodic damage ticks of your Shadow Word: Pain spell.', color: 'yellow' },
		],
	},
};

const LINK_PREFIX = '#wotlksim-item-';

export function hasCustomTooltip(itemId: number): boolean {
	return itemId in CUSTOM_TOOLTIPS;
}

export function customItemUrl(itemId: number): string {
	return LINK_PREFIX + itemId;
}

const QUALITY_COLORS = { legendary: '#ff8000', epic: '#a335ee', common: '#ffffff' };
const LINE_COLORS = { green: '#1eff00', gray: '#9d9d9d', yellow: '#ffd100', blue: '#71d5ff' };

function escapeHtml(text: string): string {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderTooltip(tooltip: CustomTooltip): string {
	let html = `<div style="color:${QUALITY_COLORS[tooltip.quality]};font-size:1.05em;font-weight:600">${escapeHtml(tooltip.name)}</div>`;
	for (const line of tooltip.lines) {
		if (typeof line === 'string') {
			html += `<div>${escapeHtml(line)}</div>`;
		} else if (Array.isArray(line)) {
			html += `<div style="display:flex;justify-content:space-between;gap:2em"><span>${escapeHtml(line[0])}</span><span>${escapeHtml(line[1])}</span></div>`;
		} else {
			html += `<div style="color:${LINE_COLORS[line.color]}">${escapeHtml(line.text)}</div>`;
		}
	}
	return html;
}

let tooltipElem: HTMLDivElement | null = null;

function getTooltipElem(): HTMLDivElement {
	if (!tooltipElem) {
		tooltipElem = document.createElement('div');
		tooltipElem.className = 'wotlksim-custom-tooltip';
		Object.assign(tooltipElem.style, {
			position: 'fixed',
			zIndex: '100000',
			maxWidth: '340px',
			padding: '8px 10px',
			background: 'rgba(5, 10, 30, 0.95)',
			border: '1px solid #9a9a9a',
			borderRadius: '4px',
			color: '#ffffff',
			fontSize: '13px',
			lineHeight: '1.35',
			pointerEvents: 'none',
			display: 'none',
		});
		document.body.appendChild(tooltipElem);
	}
	return tooltipElem;
}

function positionTooltip(elem: HTMLDivElement, event: MouseEvent) {
	const margin = 16;
	const rect = elem.getBoundingClientRect();
	let left = event.clientX + margin;
	let top = event.clientY + margin;
	if (left + rect.width > window.innerWidth) left = event.clientX - rect.width - margin;
	if (top + rect.height > window.innerHeight) top = window.innerHeight - rect.height - 4;
	elem.style.left = `${Math.max(4, left)}px`;
	elem.style.top = `${Math.max(4, top)}px`;
}

function findCustomLink(target: EventTarget | null): HTMLAnchorElement | null {
	if (!(target instanceof Element)) return null;
	const anchor = target.closest('a');
	if (!anchor) return null;
	const href = anchor.getAttribute('href') || '';
	return href.includes(LINK_PREFIX) ? anchor : null;
}

function install() {
	if (typeof document === 'undefined') return;

	document.addEventListener('mouseover', event => {
		const anchor = findCustomLink(event.target);
		if (!anchor) return;
		const id = Number((anchor.getAttribute('href') || '').split(LINK_PREFIX)[1]);
		const tooltip = CUSTOM_TOOLTIPS[id];
		if (!tooltip) return;
		const elem = getTooltipElem();
		elem.innerHTML = renderTooltip(tooltip);
		elem.style.display = 'block';
		positionTooltip(elem, event);
	});
	document.addEventListener('mousemove', event => {
		if (tooltipElem && tooltipElem.style.display === 'block') {
			if (findCustomLink(event.target)) {
				positionTooltip(tooltipElem, event);
			} else {
				tooltipElem.style.display = 'none';
			}
		}
	});
	document.addEventListener('mouseout', event => {
		if (tooltipElem && findCustomLink(event.target) && !findCustomLink(event.relatedTarget)) {
			tooltipElem.style.display = 'none';
		}
	});
	// Custom links point at "#...", which would otherwise scroll/jump the page.
	document.addEventListener(
		'click',
		event => {
			const anchor = findCustomLink(event.target);
			if (anchor) event.preventDefault();
		},
		true,
	);
}

install();
