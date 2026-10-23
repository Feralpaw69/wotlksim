import upgradeChainData from '../../assets/db_inputs/wotlk_upgrade_chains.json';
import { UIItem as Item } from './proto/ui.js';

// wotlksim: upgrade chains for items that exist in several item levels.
// The item picker's Upgrade tab lists every version of the equipped item,
// lowest item level first. Items without other versions just show themselves.

// Lower item level versions of buffed items (e.g. Ulduar) use the original item ID
// plus this offset. Keep in sync with BaseVersionIDOffset in the Go code.
export const BASE_VERSION_ID_OFFSET = 10_000_000;

const UPGRADE_CHAINS: Array<Array<number>> = [
	[150005, 150090, 315005], // Stormcoil 1/3, 2/3, 3/3
	[131004, 315008], // Doomhammer
	[128858, 315010], // Embersoul, Scythe of the Cat God 1/2, 2/2
	[130031, 315004], // Armata Strigoi 1/2, 2/2
	[132005, 315015], // Atiesh (Priest) 1/2, 2/2
	[132006, 315016], // Atiesh (Druid) 1/2, 2/2
	[132007, 315003], // Atiesh (Mage) 1/2, 2/2
	...upgradeChainData.chains,
];

export function getUpgradeChain(
	itemId: number,
	hasItem: (id: number) => boolean,
	getItem?: (id: number) => Item | undefined,
	getAllItems?: () => Array<Item>,
): Array<number> {
	const chain = UPGRADE_CHAINS.find(c => c.includes(itemId));
	if (chain) {
		return chain;
	}

	const item = getItem?.(itemId);
	if (item && getAllItems && (item.name.startsWith("Heroes' ") || item.name.startsWith('Valorous '))) {
		const prefixLength = item.name.startsWith("Heroes' ") ? 8 : 9;
		const matchingPrefix = item.name.startsWith("Heroes' ") ? 'Valorous ' : "Heroes' ";
		const upgradedName = matchingPrefix + item.name.slice(prefixLength);
		const matchingItem = getAllItems().find(candidate =>
			candidate.name == upgradedName &&
			candidate.type == item.type &&
			candidate.setName == item.setName &&
			candidate.classAllowlist.join(',') == item.classAllowlist.join(','),
		);
		if (matchingItem) {
			return [item.id, matchingItem.id];
		}
	}

	const originalId = itemId > BASE_VERSION_ID_OFFSET ? itemId - BASE_VERSION_ID_OFFSET : itemId;
	const baseId = originalId + BASE_VERSION_ID_OFFSET;
	if (hasItem(baseId)) {
		return [baseId, originalId];
	}
	return [itemId];
}
