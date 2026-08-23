import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { Simulator } from "@/components/simulator"

/**
 * La carte et l'illustration d'accueil sont lues au rendu depuis `public/`.
 * `map.svg` est le fichier d'origine de 2019, jamais retouché : c'est lui qui
 * porte les 211 tracés et leurs codes ISO.
 */
export default async function Page() {
  const [carte, illustration] = await Promise.all([
    readFile(join(process.cwd(), "public", "map.svg"), "utf8"),
    readFile(join(process.cwd(), "public", "welcome.svg"), "utf8"),
  ])

  return <Simulator carte={carte} illustration={illustration} />
}
