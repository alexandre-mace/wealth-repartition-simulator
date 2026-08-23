"use client"

import { useMemo } from "react"

import { couleurDuPays } from "@/lib/domain/colors"
import { paysConnus, revenuApresPartage } from "@/lib/domain/model"

export type PaysSurvole = {
  nom: string
  revenu: number
  revenuInitial: number
  x: number
  y: number
}

type Props = {
  carte: string
  part: number
  modeProgressif: boolean
  onSurvol: (pays: PaysSurvole | null) => void
}

/**
 * La carte de 2019, servie telle quelle.
 *
 * `public/map.svg` est l'original : 211 tracés portant leur code ISO et leur
 * nom. Plutôt que de le transformer en 1 900 lignes de JSX comme la première
 * version, on l'injecte une fois et on ne touche plus qu'à une feuille de
 * style. Les événements passent par délégation sur le conteneur, donc un seul
 * écouteur au lieu de deux cent onze.
 */
export function WorldMap({ carte, part, modeProgressif, onSurvol }: Props) {
  const css = useMemo(() => {
    const regles = paysConnus.map((p) => {
      const revenu = revenuApresPartage(p.income, part)
      return `.map [data-id="${p.code}"]{fill:${couleurDuPays(revenu, modeProgressif)}}`
    })
    return `.map [data-id]{fill:var(--nodata)}\n${regles.join("\n")}`
  }, [part, modeProgressif])

  const surMouvement = (event: React.MouseEvent) => {
    const cible = event.target
    const code = cible instanceof SVGElement ? cible.dataset.id : undefined
    const pays = code ? paysConnus.find((p) => p.code === code) : undefined
    if (!pays) return onSurvol(null)
    onSurvol({
      nom: pays.nom,
      revenu: revenuApresPartage(pays.income, part),
      revenuInitial: pays.income,
      x: event.clientX,
      y: event.clientY,
    })
  }

  return (
    <div
      className="map w-full [&_svg]:block [&_svg]:h-auto [&_svg]:max-h-[68dvh] [&_svg]:w-full [&_svg]:stroke-transparent [&_svg_path]:transition-[fill] [&_svg_path]:duration-200 max-md:[&_svg]:max-h-[46dvh]"
      role="img"
      aria-label="World map coloured by income per capita"
      onMouseMove={surMouvement}
      onMouseLeave={() => onSurvol(null)}
      onPointerDown={surMouvement}
    >
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: carte }} />
    </div>
  )
}
