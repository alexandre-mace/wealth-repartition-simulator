import { useMemo } from "react"

import carteSvg from "../assets/map.svg?raw"
import { COULEUR_SANS_DONNEES, couleurDuPays } from "../domain/colors"
import { paysConnus, revenuApresPartage } from "../domain/model"

export type PaysSurvole = {
  nom: string
  revenu: number
  revenuInitial: number
  x: number
  y: number
}

type Props = {
  part: number
  modeProgressif: boolean
  onSurvol: (pays: PaysSurvole | null) => void
}

/**
 * La carte de 2019, servie telle quelle.
 *
 * Le fichier `src/assets/map.svg` est l'original : 211 tracés portant leur code ISO
 * et leur nom. Plutôt que de le transformer en 1 900 lignes de JSX comme la
 * première version, on l'injecte une fois et on ne touche plus qu'à une feuille
 * de style. Les événements passent par délégation sur le conteneur, donc un
 * seul écouteur au lieu de deux cent onze.
 */
export function WorldMap({ part, modeProgressif, onSurvol }: Props) {
  const css = useMemo(() => {
    const regles = paysConnus.map((p) => {
      const revenu = revenuApresPartage(p.income, part)
      return `.map [data-id="${p.code}"]{fill:${couleurDuPays(revenu, modeProgressif)}}`
    })
    return `.map [data-id]{fill:${COULEUR_SANS_DONNEES}}\n${regles.join("\n")}`
  }, [part, modeProgressif])

  const paysSous = (cible: EventTarget | null) => {
    if (!(cible instanceof SVGElement)) return null
    const code = cible.dataset.id
    if (!code) return null
    return paysConnus.find((p) => p.code === code) ?? null
  }

  const surMouvement = (event: React.MouseEvent | React.PointerEvent) => {
    const pays = paysSous(event.target)
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
      className="map"
      role="img"
      aria-label="World map coloured by income per capita"
      onMouseMove={surMouvement}
      onMouseLeave={() => onSurvol(null)}
      onPointerDown={surMouvement}
    >
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: carteSvg }} />
    </div>
  )
}
