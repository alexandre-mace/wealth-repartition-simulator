import { paysLePlusPauvre, paysLePlusRiche } from "./model"

/**
 * Le système de couleurs de 2019, porté tel quel.
 *
 * Deux lectures de la même donnée : par paliers, où chaque pays prend la
 * couleur du palier sous lequel il tombe, et progressive, où la couleur est
 * interpolée en continu. Le dégradé n'est pas linéaire : ses points de contrôle
 * sont resserrés dans le bas de l'échelle, parce que sans cela la quasi-totalité
 * du monde se retrouverait dans la même nuance de rouge.
 */

export const PALIERS = [70000, 50000, 30000, 10000, 5000, 3000, 1000, 500]

type PointDeDegrade = { pourcentage: number; couleur: [number, number, number] }

export const DEGRADE: PointDeDegrade[] = [
  { pourcentage: 0, couleur: [136, 0, 0] },
  { pourcentage: 2, couleur: [234, 0, 0] },
  { pourcentage: 7, couleur: [255, 255, 50] },
  { pourcentage: 15, couleur: [0, 255, 0] },
  { pourcentage: 30, couleur: [0, 170, 0] },
  { pourcentage: 50, couleur: [0, 100, 0] },
  { pourcentage: 100, couleur: [0, 60, 0] },
]

const plancher = paysLePlusPauvre.income
const plafond = paysLePlusRiche.income

const versEchelle = (revenu: number) =>
  ((revenu - plancher) / (plafond - plancher)) * 100

const versRevenu = (pourcentage: number) =>
  plancher + (pourcentage / 100) * (plafond - plancher)

const melange = (a: number, b: number, t: number) => Math.round(a + t * (b - a))

/** La couleur d'un revenu, en interpolation continue. */
export function couleurDuRevenu(revenu: number): string {
  const pourcentage = Math.min(100, Math.max(0, versEchelle(revenu)))

  let i = 1
  while (i < DEGRADE.length - 1 && pourcentage > DEGRADE[i].pourcentage) i++
  const bas = DEGRADE[i - 1]
  const haut = DEGRADE[i]

  const revenuBas = versRevenu(bas.pourcentage)
  const revenuHaut = versRevenu(haut.pourcentage)
  const t = Math.min(
    1,
    Math.max(0, (revenu - revenuBas) / (revenuHaut - revenuBas)),
  )

  const [r, v, b] = bas.couleur.map((c, k) => melange(c, haut.couleur[k], t))
  return `rgb(${r}, ${v}, ${b})`
}

/** Le palier sous lequel tombe un revenu. */
export function palierDuRevenu(revenu: number): number {
  return PALIERS.find((palier) => revenu >= palier) ?? PALIERS[PALIERS.length - 1]
}

export function couleurDuPays(revenu: number, modeProgressif: boolean): string {
  return couleurDuRevenu(modeProgressif ? revenu : palierDuRevenu(revenu))
}

export const COULEUR_SANS_DONNEES = "rgba(224, 224, 224, 0.2)"
