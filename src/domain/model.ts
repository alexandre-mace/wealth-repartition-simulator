import { countries, RNB_MONDIAL_PUBLIE, type Pays } from "../data/countries"

/**
 * Le modèle du simulateur.
 *
 * Une seule question : si tous les revenus de la planète étaient mis en commun
 * et redistribués également, que resterait-il à chacun ? La réponse est un
 * seul nombre, et c'est là que la version de 2019 se trompait.
 */

/** Les pays pour lesquels la Banque mondiale publie un revenu et une population. */
export const paysConnus = countries.filter(
  (p): p is Required<Pays> => p.income !== undefined && p.population !== undefined,
)

export const populationCouverte = paysConnus.reduce((s, p) => s + p.population, 0)

/**
 * Le revenu moyen mondial, pondéré par la population.
 *
 * C'est le total des revenus divisé par le nombre d'habitants, et pas la
 * moyenne des moyennes nationales. La distinction n'est pas cosmétique : la
 * moyenne simple donne au Liechtenstein (40 000 habitants) le même poids qu'à
 * l'Inde (1,4 milliard) et surestime la somme à partager de près de 40 %.
 * La version de 2019 faisait la moyenne simple et distribuait donc une
 * richesse qui n'existait pas.
 */
export const revenuMoyenMondial = Math.round(
  paysConnus.reduce((s, p) => s + p.income * p.population, 0) / populationCouverte,
)

/** Ce que la moyenne simple aurait donné. Affiché pour montrer l'écart. */
export const moyenneNonPonderee = Math.round(
  paysConnus.reduce((s, p) => s + p.income, 0) / paysConnus.length,
)

const parRevenu = [...paysConnus].sort((a, b) => a.income - b.income)
export const paysLePlusPauvre = parRevenu[0]
export const paysLePlusRiche = parRevenu[parRevenu.length - 1]

/**
 * Revenu d'un pays après partage.
 *
 * `part` va de 0 (répartition réelle) à 1 (tout le monde au revenu moyen
 * mondial). Entre les deux, on interpole : à 30 %, chaque pays a parcouru 30 %
 * du chemin qui le sépare de la moyenne. C'est le geste du projet d'origine,
 * gardé tel quel.
 */
export function revenuApresPartage(revenu: number, part: number): number {
  return Math.round(revenu + part * (revenuMoyenMondial - revenu))
}

/**
 * Seuils de la classification par revenu de la Banque mondiale, exercice 2026
 * (en vigueur depuis le 1er juillet 2025), qui s'appliquent au RNB par habitant
 * calculé selon la méthode Atlas : exactement l'indicateur affiché ici.
 *
 * La version de 2019 utilisait un « seuil de famine » de 5 000 $ par an, qui ne
 * correspondait à rien de publié.
 *
 * https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099062525111074500
 */
export const SEUILS = {
  faible: 1135,
  intermediaireBas: 4495,
  intermediaireHaut: 13935,
} as const

export type Categorie = "faible" | "intermediaireBas" | "intermediaireHaut" | "eleve"

export const LIBELLE_CATEGORIE: Record<Categorie, string> = {
  faible: "low income",
  intermediaireBas: "lower-middle income",
  intermediaireHaut: "upper-middle income",
  eleve: "high income",
}

export function categorie(revenu: number): Categorie {
  if (revenu <= SEUILS.faible) return "faible"
  if (revenu <= SEUILS.intermediaireBas) return "intermediaireBas"
  if (revenu <= SEUILS.intermediaireHaut) return "intermediaireHaut"
  return "eleve"
}

/** Nombre d'habitants vivant dans un pays à faible revenu, au niveau de partage donné. */
export function populationAFaibleRevenu(part: number): number {
  return paysConnus.reduce(
    (s, p) =>
      revenuApresPartage(p.income, part) <= SEUILS.faible ? s + p.population : s,
    0,
  )
}

/**
 * Part de partage à laquelle plus personne ne vit dans un pays à faible revenu.
 * Cherchée par balayage au demi-point, la granularité du curseur.
 */
export const partSansFaibleRevenu = (() => {
  for (let part = 0; part <= 100; part += 0.5) {
    if (populationAFaibleRevenu(part / 100) === 0) return part
  }
  return null
})()

/** Écart de l'agrégat « World » publié par la Banque mondiale, en pourcentage. */
export const ecartAgregatPublie =
  ((revenuMoyenMondial - RNB_MONDIAL_PUBLIE) / RNB_MONDIAL_PUBLIE) * 100
