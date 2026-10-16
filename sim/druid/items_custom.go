package druid

// wotlksim custom items (see tools/database/custom_items.go).

// Embersoul, Scythe of the Cat God: while equipped, all cat finishers
// (Rip, Ferocious Bite, Savage Roar) cost 18 less energy.
const EmbersoulID = 128858
const Embersoul2ID = 315010 // upgraded version, same effect
const embersoulFinisherDiscount = 18.0

func (druid *Druid) finisherEnergyCost(baseCost float64) float64 {
	if id := druid.MainHand().ID; id == EmbersoulID || id == Embersoul2ID {
		return max(0, baseCost-embersoulFinisherDiscount)
	}
	return baseCost
}
