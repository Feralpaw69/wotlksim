// wotlksim: items that exist in the database (and the sim) but are hidden on the
// website for now. Remove an ID from this list (or empty it) to show it again.
export const HIDDEN_ITEM_IDS = new Set<number>([
	// Atiesh, Greatstaff of the Guardian (all class versions and upgrades)
	132005, // Priest
	132006, // Druid
	132007, // Mage
	130024, // Warlock
	315015, // Priest, upgrade 2/2
	315016, // Druid, upgrade 2/2
	315003, // Mage, upgrade 2/2
]);
