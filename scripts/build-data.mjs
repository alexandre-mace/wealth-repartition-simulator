/**
 * Reconstruit lib/data/countries.ts depuis l'API de la Banque mondiale.
 *
 * Deux indicateurs : le RNB par habitant (methode Atlas, dollars courants) et
 * la population. La population est indispensable : sans elle on ne peut pas
 * calculer le revenu moyen mondial, seulement la moyenne des moyennes
 * nationales, qui donne au Liechtenstein le meme poids qu'a la Chine.
 */
import { writeFileSync, readFileSync } from "node:fs";

const ANNEE = process.argv[2] ?? "2024";
const API = "https://api.worldbank.org/v2";

async function indicateur(code, annee) {
  const url = `${API}/country/all/indicator/${code}?date=${annee}&format=json&per_page=400`;
  const [meta, lignes] = await (await fetch(url)).json();
  if (!lignes) throw new Error(`aucune donnee pour ${code} en ${annee}`);
  return { lignes, misAJour: meta.lastupdated };
}

// Les agregats regionaux (« Africa Eastern and Southern »…) portent eux aussi
// un code a deux lettres : il faut les ecarter avant toute jointure.
async function vraisPays() {
  const url = `${API}/country?format=json&per_page=400`;
  const [, lignes] = await (await fetch(url)).json();
  return new Set(
    lignes
      .filter((p) => p.region?.id && p.region.id !== "NA")
      .map((p) => p.iso2Code),
  );
}

const svg = readFileSync(new URL("../public/map.svg", import.meta.url), "utf8");
const surLaCarte = new Map(
  [...svg.matchAll(/data-id="([A-Z]{2})" data-name="([^"]*)"/g)].map((m) => [
    m[1],
    m[2],
  ]),
);

const [pays, rnb, pop] = await Promise.all([
  vraisPays(),
  indicateur("NY.GNP.PCAP.CD", ANNEE),
  indicateur("SP.POP.TOTL", ANNEE),
]);

const revenus = new Map(
  rnb.lignes
    .filter((l) => l.value !== null && pays.has(l.country.id))
    .map((l) => [l.country.id, Math.round(l.value)]),
);
const habitants = new Map(
  pop.lignes
    .filter((l) => l.value !== null && pays.has(l.country.id))
    .map((l) => [l.country.id, Math.round(l.value)]),
);

const monde = rnb.lignes.find((l) => l.country.id === "1W");

const donnees = [];
for (const [code, nom] of surLaCarte) {
  const income = revenus.get(code);
  const population = habitants.get(code);
  donnees.push(
    income && population ? { code, nom, income, population } : { code, nom },
  );
}
donnees.sort((a, b) => a.nom.localeCompare(b.nom));

const couverts = donnees.filter((p) => p.income);
const totalPop = couverts.reduce((s, p) => s + p.population, 0);
const totalRevenu = couverts.reduce((s, p) => s + p.income * p.population, 0);
const moyennePonderee = Math.round(totalRevenu / totalPop);
const moyenneSimple = Math.round(
  couverts.reduce((s, p) => s + p.income, 0) / couverts.length,
);

console.log(`annee ${ANNEE}, donnees mises a jour le ${rnb.misAJour}`);
console.log(`pays sur la carte : ${surLaCarte.size}`);
console.log(`pays avec revenu et population : ${couverts.length}`);
console.log(`population couverte : ${(totalPop / 1e9).toFixed(2)} milliards`);
console.log(`moyenne ponderee (la bonne)   : ${moyennePonderee} $`);
console.log(`moyenne simple  (celle de 2019): ${moyenneSimple} $`);
console.log(`agregat « World » de la Banque : ${Math.round(monde.value)} $`);
console.log(
  `ecart a l'agregat : ${(((moyennePonderee - monde.value) / monde.value) * 100).toFixed(1)} %`,
);

const entete = `// Genere par scripts/build-data.mjs, ne pas editer a la main.
// Source : Banque mondiale, RNB par habitant methode Atlas (NY.GNP.PCAP.CD)
// et population totale (SP.POP.TOTL), annee ${ANNEE}, extraits le ${rnb.misAJour}.

export type Pays = {
  code: string
  nom: string
  /** RNB par habitant en dollars courants. Absent si la Banque mondiale ne publie rien. */
  income?: number
  population?: number
}

export const ANNEE_DONNEES = ${ANNEE}
export const DERNIERE_MISE_A_JOUR = ${JSON.stringify(rnb.misAJour)}
/** Agregat « World » publie par la Banque mondiale, sert de controle. */
export const RNB_MONDIAL_PUBLIE = ${Math.round(monde.value)}

export const countries: Pays[] = ${JSON.stringify(donnees, null, 2)}
`;

writeFileSync(new URL("../lib/data/countries.ts", import.meta.url), entete);
console.log("\nlib/data/countries.ts ecrit");
