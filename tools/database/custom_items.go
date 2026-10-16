package database

import (
	"github.com/wowsims/wotlk/sim/core/proto"
	"github.com/wowsims/wotlk/sim/core/stats"
)

// Custom items for the wotlksim fork. These do not exist on Wowhead, so they are
// merged straight into assets/database/db.{json,bin} with:
//
//	go run ./tools/database/gen_db -outDir=assets -gen=custom
//
// Their special effects live in sim/common/wotlk/custom_items.go.
//
// Rating conventions (same as the generated DB): crit/hit/haste ratings are stored
// on both the melee and the spell stat, attack power on both melee and ranged AP.

const (
	EmbersoulID   = 128858
	ArmataID      = 130031
	StormcoilID   = 150005
	DoomhammerID  = 131004
	NargarothID   = 315007
	FurySunwellID = 217741
	NightwingID   = 315006
)

func critRating(v float64) stats.Stats {
	return stats.Stats{stats.MeleeCrit: v, stats.SpellCrit: v}
}

func hitRating(v float64) stats.Stats {
	return stats.Stats{stats.MeleeHit: v, stats.SpellHit: v}
}

func hasteRating(v float64) stats.Stats {
	return stats.Stats{stats.MeleeHaste: v, stats.SpellHaste: v}
}

func attackPower(v float64) stats.Stats {
	return stats.Stats{stats.AttackPower: v, stats.RangedAttackPower: v}
}

func sum(parts ...stats.Stats) []float64 {
	total := stats.Stats{}
	for _, p := range parts {
		total = total.Add(p)
	}
	return total.ToFloatArray()
}

var CustomItems = []*proto.UIItem{
	{
		Id:              EmbersoulID,
		Name:            "Embersoul, Scythe of the Cat God",
		Icon:            "wotlksim_128858",
		Type:            proto.ItemType_ItemTypeWeapon,
		WeaponType:      proto.WeaponType_WeaponTypePolearm,
		HandType:        proto.HandType_HandTypeTwoHand,
		Stats:           sum(stats.Stats{stats.Agility: 130, stats.Stamina: 142, stats.ArmorPenetration: 92}, attackPower(177), critRating(98)),
		GemSockets:      []proto.GemColor{proto.GemColor_GemColorRed},
		SocketBonus:     stats.Stats{stats.Agility: 8}.ToFloatArray(),
		WeaponDamageMin: 761,
		WeaponDamageMax: 1080,
		WeaponSpeed:     3.6,
		Ilvl:            245,
		Phase:           2,
		Quality:         proto.ItemQuality_ItemQualityLegendary,
		ClassAllowlist:  []proto.Class{proto.Class_ClassDruid},
		Expansion:       proto.Expansion_ExpansionWotlk,
	},
	{
		Id:              ArmataID,
		Name:            "Armata Strigoi",
		Icon:            "wotlksim_130031",
		Type:            proto.ItemType_ItemTypeWeapon,
		WeaponType:      proto.WeaponType_WeaponTypeAxe,
		HandType:        proto.HandType_HandTypeTwoHand,
		Stats:           sum(stats.Stats{stats.Strength: 131, stats.Stamina: 139, stats.ArmorPenetration: 64}, critRating(81)),
		GemSockets:      []proto.GemColor{proto.GemColor_GemColorRed, proto.GemColor_GemColorYellow},
		SocketBonus:     stats.Stats{stats.Strength: 6}.ToFloatArray(),
		WeaponDamageMin: 673,
		WeaponDamageMax: 1008,
		WeaponSpeed:     3.6,
		Ilvl:            232,
		Phase:           1,
		Quality:         proto.ItemQuality_ItemQualityLegendary,
		Expansion:       proto.Expansion_ExpansionWotlk,
	},
	{
		Id:               StormcoilID,
		Name:             "Stormcoil",
		Icon:             "wotlksim_150005",
		Type:             proto.ItemType_ItemTypeRanged,
		RangedWeaponType: proto.RangedWeaponType_RangedWeaponTypeGun,
		Stats:            sum(stats.Stats{stats.Agility: 38, stats.Stamina: 38}, attackPower(50), critRating(26), hasteRating(23)),
		SocketBonus:      stats.Stats{}.ToFloatArray(),
		WeaponDamageMin:  449,
		WeaponDamageMax:  637,
		WeaponSpeed:      2.9,
		Ilvl:             232,
		Phase:            5,
		Quality:          proto.ItemQuality_ItemQualityLegendary,
		Unique:           true,
		Expansion:        proto.Expansion_ExpansionWotlk,
	},
	{
		Id:              DoomhammerID,
		Name:            "Doomhammer",
		Icon:            "wotlksim_131004",
		Type:            proto.ItemType_ItemTypeWeapon,
		WeaponType:      proto.WeaponType_WeaponTypeMace,
		HandType:        proto.HandType_HandTypeMainHand,
		Stats:           sum(stats.Stats{stats.Stamina: 58, stats.Intellect: 58, stats.SpellPower: 621}, hasteRating(58), critRating(39)),
		GemSockets:      []proto.GemColor{proto.GemColor_GemColorYellow},
		SocketBonus:     critRating(4).ToFloatArray(),
		WeaponDamageMin: 357,
		WeaponDamageMax: 666,
		WeaponSpeed:     2.6,
		Ilvl:            245,
		Phase:           2,
		Quality:         proto.ItemQuality_ItemQualityLegendary,
		ClassAllowlist:  []proto.Class{proto.Class_ClassShaman},
		Expansion:       proto.Expansion_ExpansionWotlk,
	},
	{
		Id:              NargarothID,
		Name:            "Nargaroth, Warden of the Dark Tower",
		Icon:            "wotlksim_315007",
		Type:            proto.ItemType_ItemTypeWeapon,
		WeaponType:      proto.WeaponType_WeaponTypeMace,
		HandType:        proto.HandType_HandTypeTwoHand,
		Stats:           sum(stats.Stats{stats.Agility: 139, stats.Stamina: 172}, attackPower(192), critRating(105), hitRating(95)),
		GemSockets:      []proto.GemColor{proto.GemColor_GemColorBlue, proto.GemColor_GemColorBlue, proto.GemColor_GemColorRed},
		SocketBonus:     stats.Stats{stats.Stamina: 8}.ToFloatArray(),
		WeaponDamageMin: 812,
		WeaponDamageMax: 1218,
		WeaponSpeed:     3.6,
		Ilvl:            258,
		Phase:           5,
		Quality:         proto.ItemQuality_ItemQualityLegendary,
		Unique:          true,
		Expansion:       proto.Expansion_ExpansionWotlk,
	},
	{
		Id:         FurySunwellID,
		Name:       "Fury of the Sunwell",
		Icon:       "wotlksim_217741",
		Type:       proto.ItemType_ItemTypeWeapon,
		WeaponType: proto.WeaponType_WeaponTypeShield,
		HandType:   proto.HandType_HandTypeOffHand,
		// Shield block value (259) and the equip bonus (168) are stored together, like the generated DB does.
		Stats:       stats.Stats{stats.Strength: 103, stats.Stamina: 144, stats.Armor: 9263, stats.Defense: 60, stats.Parry: 50, stats.BlockValue: 259 + 168}.ToFloatArray(),
		GemSockets:  []proto.GemColor{proto.GemColor_GemColorMeta},
		SocketBonus: stats.Stats{stats.Stamina: 6}.ToFloatArray(),
		Ilvl:        277,
		Phase:       5,
		Quality:     proto.ItemQuality_ItemQualityLegendary,
		Expansion:   proto.Expansion_ExpansionWotlk,
	},
	{
		Id:              NightwingID,
		Name:            "Nightwing",
		Icon:            "wotlksim_315006",
		Type:            proto.ItemType_ItemTypeWeapon,
		WeaponType:      proto.WeaponType_WeaponTypeStaff,
		HandType:        proto.HandType_HandTypeTwoHand,
		Stats:           sum(stats.Stats{stats.Stamina: 162, stats.Intellect: 162, stats.Spirit: 89, stats.SpellPower: 701}, critRating(124), hasteRating(124)),
		GemSockets:      []proto.GemColor{proto.GemColor_GemColorBlue, proto.GemColor_GemColorRed},
		SocketBonus:     stats.Stats{stats.SpellPower: 7}.ToFloatArray(),
		WeaponDamageMin: 258,
		WeaponDamageMax: 347,
		WeaponSpeed:     2.6,
		Ilvl:            258,
		Phase:           5,
		Quality:         proto.ItemQuality_ItemQualityLegendary,
		Heroic:          true,
		ClassAllowlist:  []proto.Class{proto.Class_ClassPriest, proto.Class_ClassMage, proto.Class_ClassWarlock, proto.Class_ClassDruid},
		Expansion:       proto.Expansion_ExpansionWotlk,
	},
}
