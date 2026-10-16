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
];

export function getUpgradeChain(itemId: number, hasItem: (id: number) => boolean): Array<number> {
	const chain = UPGRADE_CHAINS.find(c => c.includes(itemId));
	if (chain) {
		return chain;
	}

	const originalId = itemId > BASE_VERSION_ID_OFFSET ? itemId - BASE_VERSION_ID_OFFSET : itemId;
	const baseId = originalId + BASE_VERSION_ID_OFFSET;
	if (hasItem(baseId)) {
		return [baseId, originalId];
	}
	return [itemId];
}
