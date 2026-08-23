import {
  COULEUR_SANS_DONNEES,
  couleurDuRevenu,
  DEGRADE,
  PALIERS,
} from "../domain/colors"
import { paysLePlusPauvre, paysLePlusRiche } from "../domain/model"

const dollars = new Intl.NumberFormat("en-US")

const revenuAuPourcentage = (pourcentage: number) =>
  Math.round(
    paysLePlusPauvre.income +
      (pourcentage / 100) * (paysLePlusRiche.income - paysLePlusPauvre.income),
  )

export function Legend({ modeProgressif }: { modeProgressif: boolean }) {
  const bandes = [...DEGRADE].reverse()

  return (
    <div className="legend">
      <span className="legend-unit">dollars $</span>

      {modeProgressif
        ? bandes.slice(0, -1).map((point, index) => (
            <div className="legend-row legend-row--gradient" key={point.pourcentage}>
              <div
                className="legend-swatch legend-swatch--gradient"
                style={{
                  background: `linear-gradient(rgb(${point.couleur.join(",")}), rgb(${bandes[
                    index + 1
                  ].couleur.join(",")}))`,
                }}
              />
              <span>
                {dollars.format(revenuAuPourcentage(point.pourcentage))}
                {/* Sous la dernière bande, le plancher de l'échelle, sinon
                    le bas du dégradé n'est chiffré nulle part. */}
                {index === bandes.length - 2 && (
                  <>
                    <br />
                    <span className="legend-floor">
                      {dollars.format(paysLePlusPauvre.income)}
                    </span>
                  </>
                )}
              </span>
            </div>
          ))
        : PALIERS.map((palier) => (
            <div className="legend-row" key={palier}>
              <div
                className="legend-swatch"
                style={{ backgroundColor: couleurDuRevenu(palier) }}
              />
              <span>{dollars.format(palier)}</span>
            </div>
          ))}

      <div className="legend-row">
        <div
          className="legend-swatch"
          style={{ backgroundColor: COULEUR_SANS_DONNEES }}
        />
        <span>No data</span>
      </div>
    </div>
  )
}
