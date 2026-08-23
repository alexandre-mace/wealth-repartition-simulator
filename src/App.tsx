import { useEffect, useMemo, useRef, useState } from "react"

import { InfoPanel } from "./components/InfoPanel"
import { Legend } from "./components/Legend"
import { ModeSwitch, RepartitionSlider } from "./components/Controls"
import { Onboarding } from "./components/Onboarding"
import { WorldMap, type PaysSurvole } from "./components/WorldMap"
import { populationAFaibleRevenu } from "./domain/model"

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const habitants = (n: number) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(2)} billion` : `${Math.round(n / 1e6)} million`

export default function App() {
  const [accueilVisible, setAccueilVisible] = useState(true)
  const [pourcentage, setPourcentage] = useState(0)
  const [modeProgressif, setModeProgressif] = useState(false)
  const [survole, setSurvole] = useState<PaysSurvole | null>(null)

  const part = pourcentage / 100
  const pauvres = useMemo(() => populationAFaibleRevenu(part), [part])

  const readout =
    pauvres === 0
      ? "No one lives in a low income country any more."
      : `${habitants(pauvres)} people live in a low income country.`

  // La notification de 2019 : elle salue le franchissement du seuil puis
  // s'efface, au lieu de rester posée sur la carte tant que le curseur ne
  // redescend pas.
  const [annonce, setAnnonce] = useState<string | null>(null)
  const seuilFranchi = useRef(pauvres === 0)

  useEffect(() => {
    const franchi = pauvres === 0
    if (franchi !== seuilFranchi.current) {
      seuilFranchi.current = franchi
      if (franchi) {
        setAnnonce(
          `At ${pourcentage}% shared, no country is below the World Bank low income line any more.`,
        )
      } else {
        setAnnonce(null)
      }
    }
  }, [pauvres, pourcentage])

  useEffect(() => {
    if (!annonce) return
    const minuteur = setTimeout(() => setAnnonce(null), 8000)
    return () => clearTimeout(minuteur)
  }, [annonce])

  if (accueilVisible) {
    return <Onboarding onStart={() => setAccueilVisible(false)} />
  }

  return (
    <div className="app">
      <div className="topbar">
        <h1 className="title">Wealth repartition simulator</h1>
        <div className="topbar-right">
          <InfoPanel part={part} />
          <ModeSwitch
            modeProgressif={modeProgressif}
            onChange={setModeProgressif}
          />
        </div>
      </div>

      <div className="stage">
        <Legend modeProgressif={modeProgressif} />
        <WorldMap
          part={part}
          modeProgressif={modeProgressif}
          onSurvol={setSurvole}
        />
      </div>

      <RepartitionSlider
        valeur={pourcentage}
        onChange={setPourcentage}
        readout={readout}
      />

      {survole && (
        <div className="tooltip" style={{ top: survole.y, left: survole.x }}>
          <strong>{survole.nom}</strong>
          {dollars.format(survole.revenu)}
          {pourcentage > 0 && (
            <span className="tooltip-before">
              {" "}
              (was {dollars.format(survole.revenuInitial)})
            </span>
          )}
        </div>
      )}

      {annonce && (
        <div className="snack" role="status">
          {annonce}
        </div>
      )}
    </div>
  )
}
