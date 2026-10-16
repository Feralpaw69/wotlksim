package mage

import (
	"time"

	"github.com/wowsims/wotlk/sim/core"
)

// wotlksim: Time Warp. Increases melee, ranged and spell casting speed by 30%
// for all party and raid members for 40 sec. Affected players receive Temporal
// Displacement and cannot benefit from Time Warp or Bloodlust again for 10 min.
func (mage *Mage) registerTimeWarpCD() {
	actionID := core.TimeWarpActionID.WithTag(mage.Index)

	twAuras := []*core.Aura{}
	for _, party := range mage.Env.Raid.Parties {
		for _, partyMember := range party.Players {
			twAuras = append(twAuras, core.TimeWarpAura(partyMember.GetCharacter(), actionID.Tag))
		}
	}

	spell := mage.RegisterSpell(core.SpellConfig{
		ActionID: actionID,
		Flags:    core.SpellFlagAPL,

		ManaCost: core.ManaCostOptions{
			BaseCost: 0.16,
		},
		Cast: core.CastConfig{
			DefaultCast: core.Cast{
				GCD: core.GCDDefault,
			},
			CD: core.Cooldown{
				Timer:    mage.NewTimer(),
				Duration: time.Minute * 5,
			},
		},
		ExtraCastCondition: func(sim *core.Simulation, target *core.Unit) bool {
			// Only cast if someone in the raid can still benefit.
			for _, playerUnit := range mage.Env.Raid.AllPlayerUnits {
				if !core.HasHasteLockout(playerUnit) {
					return true
				}
			}
			return false
		},

		ApplyEffects: func(sim *core.Simulation, _ *core.Unit, _ *core.Spell) {
			for _, twAura := range twAuras {
				if !core.HasHasteLockout(twAura.Unit) {
					twAura.Activate(sim)
				}
			}
		},
	})

	mage.AddMajorCooldown(core.MajorCooldown{
		Spell:    spell,
		Priority: core.CooldownPriorityBloodlust,
		Type:     core.CooldownTypeDPS,
		ShouldActivate: func(sim *core.Simulation, character *core.Character) bool {
			return !character.HasActiveAuraWithTag(core.PowerInfusionAuraTag) && !core.HasHasteLockout(&character.Unit)
		},
	})
}
