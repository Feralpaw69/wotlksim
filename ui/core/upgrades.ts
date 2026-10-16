// wotlksim: upgrade chains for items that can be upgraded on the server.
// The item picker's Upgrade tab lists every version of the equipped item,
// lowest item level first. Items without a chain just show themselves.
const UPGRADE_CHAINS: Array<Array<number>> = [
	[150005, 150090, 315005], // Stormcoil 1/3, 2/3, 3/3
	[131004, 315008], // Doomhammer
	[128858, 315010], // Embersoul, Scythe of the Cat God 1/2, 2/2
	[130031, 315004], // Armata Strigoi 1/2, 2/2
];

export function getUpgradeChain(itemId: number): Array<number> {
	return UPGRADE_CHAINS.find(chain => chain.includes(itemId)) ?? [itemId];
}
