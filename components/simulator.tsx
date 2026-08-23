"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { InfoPanel } from "@/components/info-panel"
import { Legend } from "@/components/legend"
import { Onboarding } from "@/components/onboarding"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { WorldMap, type PaysSurvole } from "@/components/world-map"
import { populationAFaibleRevenu } from "@/lib/domain/model"

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const habitants = (n: number) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(2)} billion` : `${Math.round(n / 1e6)} million`

export function Simulator({
  carte,
  illustration,
}: {
  carte: string
  illustration: string
}) {
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
    if (franchi === seuilFranchi.current) return
    seuilFranchi.current = franchi
    setAnnonce(
      franchi
        ? `At ${pourcentage}% shared, no country is below the World Bank low income line any more.`
        : null,
    )
  }, [pauvres, pourcentage])

  useEffect(() => {
    if (!annonce) return
    const minuteur = setTimeout(() => setAnnonce(null), 8000)
    return () => clearTimeout(minuteur)
  }, [annonce])

  if (accueilVisible) {
    return (
      <Onboarding
        illustration={illustration}
        onStart={() => setAccueilVisible(false)}
      />
    )
  }

  return (
    <div className="flex min-h-dvh flex-col gap-2 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] md:gap-3 md:p-4">
      <div className="z-10 flex items-start justify-between gap-4">
        <h1 className="text-lg font-normal tracking-tight text-primary md:text-xl">
          Wealth repartition simulator
        </h1>

        <div className="flex flex-col items-end gap-3">
          <InfoPanel part={part} />

          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className={modeProgressif ? undefined : "text-foreground"}>
              Step
            </span>
            <Switch
              isSelected={modeProgressif}
              onChange={setModeProgressif}
              aria-label="Progressive colour scale"
            />
            <span className={modeProgressif ? "text-foreground" : undefined}>
              Progressive
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-3 md:flex-row">
        <Legend modeProgressif={modeProgressif} />
        <WorldMap
          carte={carte}
          part={part}
          modeProgressif={modeProgressif}
          onSurvol={setSurvole}
        />
      </div>

      {/* Le retrait latéral laisse la place au pouce et à sa bulle, qui
          débordent de la moitié de leur largeur aux deux extrémités. */}
      <div className="z-10 flex flex-col gap-1 px-4 md:px-12">
        <span className="self-end text-sm">Wealth repartition</span>
        <span
          aria-live="polite"
          className="min-h-[1.2em] self-end text-xs text-muted-foreground"
        >
          {readout}
        </span>

        <div className="relative pt-8">
          {/* La bulle de valeur au-dessus du pouce, comme en 2019. React Aria
              pose le pouce à `left: X%` avec translateX(-50%), donc son centre
              tombe pile sur X% : la bulle suit la même règle, sans correction. */}
          <span
            aria-hidden="true"
            className="absolute top-0 grid size-7 -translate-x-1/2 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground after:absolute after:top-full after:left-1/2 after:-mt-0.5 after:-ml-1 after:border-4 after:border-transparent after:border-t-primary"
            style={{ left: `${pourcentage}%` }}
          >
            {pourcentage}
          </span>

          <Slider
            /* Deux écarts au stock, assumés ici plutôt que dans le composant :
               le rail est éclairci parce que le bg-muted d'origine suppose un
               fond clair et disparaît sur l'ardoise, et il est épaissi parce
               que ce curseur est la seule commande de l'outil. */
            className="[&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-track]]:h-3! [&_[data-slot=slider-track]]:bg-white/25"
            aria-label="Wealth repartition"
            value={pourcentage}
            onChange={(v) => setPourcentage(v as number)}
            minValue={0}
            maxValue={100}
            step={1}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {survole && (
        <div
          className="pointer-events-none fixed z-30 -mt-3 -translate-x-1/2 -translate-y-full rounded-md bg-[#555] px-2.5 py-1.5 text-center text-xs whitespace-nowrap text-white after:absolute after:top-full after:left-1/2 after:-ml-[5px] after:border-[5px] after:border-transparent after:border-t-[#555]"
          style={{ top: survole.y, left: survole.x }}
        >
          <strong className="block font-medium">{survole.nom}</strong>
          {dollars.format(survole.revenu)}
          {pourcentage > 0 && (
            <span className="text-white/65">
              {" "}
              (was {dollars.format(survole.revenuInitial)})
            </span>
          )}
        </div>
      )}

      {annonce && (
        <div
          role="status"
          className="fixed right-3 bottom-32 z-20 max-w-[min(26rem,calc(100vw-1.5rem))] rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground shadow-lg duration-200 animate-in fade-in slide-in-from-right-6 max-md:left-3 max-md:max-w-none"
        >
          {annonce}
        </div>
      )}
    </div>
  )
}
