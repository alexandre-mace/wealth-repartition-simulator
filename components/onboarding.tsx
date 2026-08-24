"use client"

import { Button } from "@/components/ui/button"

/**
 * L'écran d'accueil de 2019, avec son illustration et sa liste de puces. Le
 * texte est celui d'origine, à une retouche près : la moyenne mondiale est
 * désormais pondérée par la population.
 */
export function Onboarding({
  illustration,
  onStart,
}: {
  illustration: string
  onStart: () => void
}) {
  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-background px-6 py-8 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center gap-5 text-center md:gap-6">
        <h1 className="text-2xl font-normal text-balance sm:text-3xl md:text-4xl">
          Welcome on the wealth repartition simulator !
        </h1>

        <div
          aria-hidden="true"
          className="[&_svg]:block [&_svg]:h-auto [&_svg]:max-h-[20dvh] [&_svg]:w-full [&_svg]:max-w-[200px] md:[&_svg]:max-h-[28dvh] md:[&_svg]:max-w-[320px]"
          dangerouslySetInnerHTML={{ __html: illustration }}
        />

        <p className="text-sm leading-relaxed text-pretty md:text-base">
          I wanted to know what would happen if the world wealth was shared
          across countries, and what impact it would have on poverty. So here is
          what I did :
        </p>

        <ul className="list-disc space-y-1 pl-5 text-left text-sm leading-relaxed md:text-base">
          <li>Download the world map in scalable vector graphics format</li>
          <li>Find national average income by country</li>
          <li>
            Construct data and link it to svg thanks to{" "}
            <a
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
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
          <li>
            Make a bit of math to calculate the color and income step and
            progressive ratio
          </li>
        </ul>

        <Button size="lg" onClick={onStart}>
          See the map
        </Button>
      </div>
    </div>
  )
}
