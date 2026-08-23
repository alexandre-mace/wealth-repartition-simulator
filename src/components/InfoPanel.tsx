import { useEffect, useRef, useState } from "react"

import { ANNEE_DONNEES, RNB_MONDIAL_PUBLIE } from "../data/countries"
import {
  categorie,
  LIBELLE_CATEGORIE,
  moyenneNonPonderee,
  paysConnus,
  paysLePlusPauvre,
  paysLePlusRiche,
  populationAFaibleRevenu,
  populationCouverte,
  revenuMoyenMondial,
  SEUILS,
} from "../domain/model"

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})
const entier = new Intl.NumberFormat("en-US")

const millions = (n: number) =>
  n >= 1e9
    ? `${(n / 1e9).toFixed(2)} billion`
    : `${Math.round(n / 1e6)} million`

export function InfoPanel({ part }: { part: number }) {
  const [ouvert, setOuvert] = useState(false)
  const ancre = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ouvert) return
    const auClic = (event: MouseEvent) => {
      if (!ancre.current?.contains(event.target as Node)) setOuvert(false)
    }
    const auClavier = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOuvert(false)
    }
    document.addEventListener("pointerdown", auClic)
    document.addEventListener("keydown", auClavier)
    return () => {
      document.removeEventListener("pointerdown", auClic)
      document.removeEventListener("keydown", auClavier)
    }
  }, [ouvert])

  const pauvres = populationAFaibleRevenu(part)

  return (
    <div className="panel-anchor" ref={ancre}>
      <button
        type="button"
        className="button"
        aria-expanded={ouvert}
        onClick={() => setOuvert((v) => !v)}
      >
        Extra info
      </button>

      {ouvert && (
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Country</th>
                <th>Income per capita</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average</td>
                <td>World</td>
                <td>{dollars.format(revenuMoyenMondial)}</td>
              </tr>
              <tr>
                <td>Lowest</td>
                <td>{paysLePlusPauvre.nom}</td>
                <td>{dollars.format(paysLePlusPauvre.income)}</td>
              </tr>
              <tr>
                <td>Highest</td>
                <td>{paysLePlusRiche.nom}</td>
                <td>{dollars.format(paysLePlusRiche.income)}</td>
              </tr>
              <tr>
                <td>In low income countries</td>
                <td>{part === 0 ? "today" : `at ${Math.round(part * 100)}%`}</td>
                <td>{pauvres === 0 ? "nobody" : `${millions(pauvres)} people`}</td>
              </tr>
            </tbody>
          </table>

          <div className="panel-note">
            <p>
              <strong>Where the numbers come from.</strong> Gross national income
              per capita, Atlas method, current US dollars, and total population,
              both for {ANNEE_DONNEES}, from the{" "}
              <a
                href="https://data.worldbank.org/indicator/NY.GNP.PCAP.CD"
                target="_blank"
                rel="noreferrer"
              >
                World Bank open data
              </a>
              . {paysConnus.length} countries have both figures, covering{" "}
              {millions(populationCouverte)} people.
            </p>
            <p>
              <strong>The world average is weighted by population.</strong> It is
              total income divided by total people, not the average of national
              averages. That distinction matters: the unweighted figure would be{" "}
              {dollars.format(moyenneNonPonderee)}, roughly{" "}
              {Math.round((moyenneNonPonderee / revenuMoyenMondial - 1) * 100)}%
              too high, because it gives Liechtenstein the same weight as India.
              The 2019 version of this page made that mistake. As a check, the
              World Bank publishes its own world aggregate at{" "}
              {dollars.format(RNB_MONDIAL_PUBLIE)}.
            </p>
            <p>
              <strong>Shared equally, everyone would be{" "}
              {LIBELLE_CATEGORIE[categorie(revenuMoyenMondial)]}.</strong> The
              World Bank draws the low income line at{" "}
              {dollars.format(SEUILS.faible)} and the high income line at{" "}
              {dollars.format(SEUILS.intermediaireHaut)}, on this very indicator (
              <a
                href="https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099062525111074500"
                target="_blank"
                rel="noreferrer"
              >
                FY26 classification
              </a>
              ). The world average sits {dollars.format(
                SEUILS.intermediaireHaut - revenuMoyenMondial,
              )}{" "}
              below the high income line.
            </p>
            <p>
              <strong>What this cannot show.</strong> Each country is a single
              average, so inequality inside a country is invisible here. A
              perfectly equal world by this measure would still contain very rich
              and very poor people. And the Atlas method converts at market
              exchange rates, not purchasing power, so a dollar does not buy the
              same thing everywhere.
            </p>
            <p>
              {entier.format(211 - paysConnus.length)} territories on the map have
              no published figure and stay grey.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
