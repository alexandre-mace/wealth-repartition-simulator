"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ANNEE_DONNEES, RNB_MONDIAL_PUBLIE } from "@/lib/data/countries"
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
} from "@/lib/domain/model"

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const habitants = (n: number) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(2)} billion` : `${Math.round(n / 1e6)} million`

export function InfoPanel({ part }: { part: number }) {
  const pauvres = populationAFaibleRevenu(part)

  return (
    <Popover>
      <PopoverTrigger render={<Button size="lg" variant="outline" />}>
        Extra info
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        className="max-h-[70dvh] w-[min(26rem,calc(100vw-2rem))] gap-0 overflow-y-auto p-0"
      >
        <Table aria-label="World income figures" className="px-1.5">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Type</TableHead>
              <TableHead scope="col" className="text-right">
                Country
              </TableHead>
              <TableHead scope="col" className="text-right">
                Income per capita
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Average</TableCell>
              <TableCell className="text-right">World</TableCell>
              <TableCell className="text-right">
                {dollars.format(revenuMoyenMondial)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lowest</TableCell>
              <TableCell className="text-right">
                {paysLePlusPauvre.nom}
              </TableCell>
              <TableCell className="text-right">
                {dollars.format(paysLePlusPauvre.income)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Highest</TableCell>
              <TableCell className="text-right">
                {paysLePlusRiche.nom}
              </TableCell>
              <TableCell className="text-right">
                {dollars.format(paysLePlusRiche.income)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>In low income countries</TableCell>
              <TableCell className="text-right">
                {part === 0 ? "today" : `at ${Math.round(part * 100)}%`}
              </TableCell>
              <TableCell className="text-right">
                {pauvres === 0 ? "nobody" : `${habitants(pauvres)} people`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="space-y-2.5 border-t p-4 text-xs leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">
              Where the numbers come from.
            </strong>{" "}
            Gross national income per capita, Atlas method, current US dollars,
            and total population, both for {ANNEE_DONNEES}, from the{" "}
            <a
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              href="https://data.worldbank.org/indicator/NY.GNP.PCAP.CD"
              target="_blank"
              rel="noreferrer"
            >
              World Bank open data
            </a>
            . {paysConnus.length} countries have both figures, covering{" "}
            {habitants(populationCouverte)} people.
          </p>
          <p>
            <strong className="text-foreground">
              The world average is weighted by population.
            </strong>{" "}
            It is total income divided by total people, not the average of
            national averages. That distinction matters: the unweighted figure
            would be {dollars.format(moyenneNonPonderee)}, roughly{" "}
            {Math.round((moyenneNonPonderee / revenuMoyenMondial - 1) * 100)}%
            too high, because it gives Liechtenstein the same weight as India.
            The 2019 version of this page made that mistake. As a check, the
            World Bank publishes its own world aggregate at{" "}
            {dollars.format(RNB_MONDIAL_PUBLIE)}.
          </p>
          <p>
            <strong className="text-foreground">
              Shared equally, everyone would be{" "}
              {LIBELLE_CATEGORIE[categorie(revenuMoyenMondial)]}.
            </strong>{" "}
            The World Bank draws the low income line at{" "}
            {dollars.format(SEUILS.faible)} and the high income line at{" "}
            {dollars.format(SEUILS.intermediaireHaut)}, on this very indicator (
            <a
              className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              href="https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099062525111074500"
              target="_blank"
              rel="noreferrer"
            >
              FY26 classification
            </a>
            ). The world average sits{" "}
            {dollars.format(SEUILS.intermediaireHaut - revenuMoyenMondial)} below
            the high income line.
          </p>
          <p>
            <strong className="text-foreground">
              What this cannot show.
            </strong>{" "}
            Each country is a single average, so inequality inside a country is
            invisible here. A perfectly equal world by this measure would still
            contain very rich and very poor people. And the Atlas method converts
            at market exchange rates, not purchasing power, so a dollar does not
            buy the same thing everywhere.
          </p>
          <p>
            {211 - paysConnus.length} territories on the map have no published
            figure and stay grey.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
