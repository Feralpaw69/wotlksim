package warrior

import (
	"time"

	"github.com/wowsims/wotlk/sim/core"
)

// wotlksim custom Protection talents. Blood and Thunder lives in thunder_clap.go.

// Painkiller: successful blocks heal you for 33/66/100% of the damage blocked.
// Cannot occur more often than once every 3 sec.
func (warrior *Warrior) applyPainkiller() {
	if warrior.Talents.Painkiller == 0 {
		return
	}

	healFraction := []float64{0, 0.33, 0.66, 1.0}[warrior.Talents.Painkiller]
	healthMetrics := warrior.NewHealthMetrics(core.ActionID{SpellID: 55694})
	icd := core.Cooldown{
		Timer:    warrior.NewTimer(),
		Duration: time.Second * 3,
	}

	core.MakePermanent(warrior.RegisterAura(core.Aura{
		Label: "Painkiller",
		OnSpellHitTaken: func(aura *core.Aura, sim *core.Simulation, spell *core.Spell, result *core.SpellResult) {
			if !result.Outcome.Matches(core.OutcomeBlock) || !icd.IsReady(sim) {
				return
			}
			icd.Use(sim)
			// A block absorbs up to the full block value; boss hits are always larger.
			warrior.GainHealth(sim, warrior.BlockValue()*healFraction, healthMetrics)
		},
	}))
}

// Unbroken Rage: damage that would take you below 35% health, or damage taken
// while you are at or below 35% health, is reduced by 20%.
func (warrior *Warrior) applyUnbrokenRage() {
	if !warrior.Talents.UnbrokenRage {
		return
	}

	warrior.AddDynamicDamageTakenModifier(func(sim *core.Simulation, _ *core.Spell, result *core.SpellResult) {
		if result.Damage <= 0 {
			return
		}
		threshold := 0.35 * warrior.MaxHealth()
		if warrior.CurrentHealth()-result.Damage < threshold {
			result.Damage *= 0.8
		}
	})
}
