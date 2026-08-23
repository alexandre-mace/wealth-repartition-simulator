import { couleurDuRevenu, DEGRADE, PALIERS } from "@/lib/domain/colors"
import { paysLePlusPauvre, paysLePlusRiche } from "@/lib/domain/model"

const dollars = new Intl.NumberFormat("en-US")

const revenuAuPourcentage = (pourcentage: number) =>
  Math.round(
    paysLePlusPauvre.income +
      (pourcentage / 100) * (paysLePlusRiche.income - paysLePlusPauvre.income),
  )

/**
 * Deux légendes pour deux lectures : les paliers en pastilles, le dégradé en
 * bandes continues. Sur écran étroit elle bascule en bandeau horizontal sous
 * la carte, faute de place sur le côté.
 */
export function Legend({ modeProgressif }: { modeProgressif: boolean }) {
  const bandes = [...DEGRADE].reverse()

  return (
    <div className="pointer-events-none z-10 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm max-md:order-last md:absolute md:top-1/2 md:left-0 md:block md:-translate-y-1/2">
      <span className="text-xs text-muted-foreground md:mb-2 md:block">
        dollars $
      </span>

      {modeProgressif
        ? bandes.slice(0, -1).map((point, index) => (
            <div
              className="flex items-start max-md:text-xs data-[dernier=true]:mb-6"
              data-dernier={index === bandes.length - 2 || undefined}
              key={point.pourcentage}
            >
              <div
                className="mr-1.5 h-6 w-3.5 shrink-0 md:mr-4 md:h-[50px] md:w-5"
                style={{
                  background: `linear-gradient(rgb(${point.couleur.join(",")}), rgb(${bandes[
                    index + 1
                  ].couleur.join(",")}))`,
                }}
              />
              <span>
                {dollars.format(revenuAuPourcentage(point.pourcentage))}
                {/* Sous la dernière bande, le plancher de l'échelle, sinon le
                    bas du dégradé n'est chiffré nulle part. */}
                {index === bandes.length - 2 && (
                  <span className="hidden translate-y-7 md:inline-block">
                    <br />
                    {dollars.format(paysLePlusPauvre.income)}
                  </span>
                )}
              </span>
            </div>
          ))
        : PALIERS.map((palier) => (
            <div className="flex items-center max-md:text-xs" key={palier}>
              <div
                className="mr-1.5 h-3 w-3.5 shrink-0 md:mr-4 md:h-[15px] md:w-5"
                style={{ backgroundColor: couleurDuRevenu(palier) }}
              />
              <span>{dollars.format(palier)}</span>
            </div>
          ))}

      <div className="flex items-center max-md:text-xs">
        <div className="mr-1.5 h-3 w-3.5 shrink-0 bg-nodata md:mr-4 md:h-[15px] md:w-5" />
        <span>No data</span>
      </div>
    </div>
  )
}
