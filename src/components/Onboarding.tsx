import illustration from "../assets/welcome.svg?raw"
import { ANNEE_DONNEES } from "../data/countries"

/**
 * L'écran d'accueil de 2019, avec son illustration et sa liste de puces.
 * Le texte est celui d'origine, à trois retouches près : la moyenne mondiale
 * est désormais pondérée par la population, le seuil de pauvreté est celui de
 * la Banque mondiale, et les données ne datent plus de 2018.
 */
export function Onboarding({ onStart }: { onStart: () => void }) {
  return (
    <div className="onboarding">
      <div className="onboarding-inner">
        <h1>Welcome on the wealth repartition simulator !</h1>

        <div
          className="onboarding-illustration"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: illustration }}
        />

        <p>
          I wanted to know what would happen if the world wealth was shared
          across countries, and what impact it would have on poverty. So here is
          what I did :
        </p>

        <ul>
          <li>Download the world map in scalable vector graphics format</li>
          <li>Find national average income by country</li>
          <li>
            Construct data and link it to svg thanks to{" "}
            <a
              href="https://en.wikipedia.org/wiki/Regular_expression"
              target="_blank"
              rel="noreferrer"
            >
              regular expressions
            </a>
          </li>
          <li>Calculate the average world income, weighted by population</li>
          <li>
            Create a slider on which 0% means the actual repartition and 100%
            means everyone has the average world income
          </li>
          <li>Make a bit of math to calculate the color and income step and progressive ratio</li>
        </ul>

        <button type="button" className="button button--accent" onClick={onStart}>
          See the map
        </button>

        <p className="onboarding-note">
          Built in 2019, brought back to life in 2026 : the world average is now
          weighted by population instead of being the average of national
          averages, poverty uses the World Bank income thresholds instead of an
          invented number, and the data is from {ANNEE_DONNEES}. Open “Extra
          info” on the map for the sources and the caveats.
        </p>
      </div>
    </div>
  )
}
