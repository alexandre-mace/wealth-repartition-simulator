// Genere par scripts/build-data.mjs, ne pas editer a la main.
// Source : Banque mondiale, RNB par habitant methode Atlas (NY.GNP.PCAP.CD)
// et population totale (SP.POP.TOTL), annee 2024, extraits le 2026-07-13.

export type Pays = {
  code: string
  nom: string
  /** RNB par habitant en dollars courants. Absent si la Banque mondiale ne publie rien. */
  income?: number
  population?: number
}

export const ANNEE_DONNEES = 2024
export const DERNIERE_MISE_A_JOUR = "2026-07-13"
/** Agregat « World » publie par la Banque mondiale, sert de controle. */
export const RNB_MONDIAL_PUBLIE = 13433

export const countries: Pays[] = [
  {
    "code": "AF",
    "nom": "Afghanistan",
    "income": 390,
    "population": 42647492
  },
  {
    "code": "AL",
    "nom": "Albania",
    "income": 9910,
    "population": 2377128
  },
  {
    "code": "DZ",
    "nom": "Algeria",
    "income": 5370,
    "population": 46814308
  },
  {
    "code": "AD",
    "nom": "Andorra",
    "income": 47740,
    "population": 81938
  },
  {
    "code": "AO",
    "nom": "Angola",
    "income": 2850,
    "population": 37885849
  },
  {
    "code": "AI",
    "nom": "Anguilla"
  },
  {
    "code": "AG",
    "nom": "Antigua and Barb.",
    "income": 21200,
    "population": 93772
  },
  {
    "code": "AR",
    "nom": "Argentina",
    "income": 13530,
    "population": 45696159
  },
  {
    "code": "AM",
    "nom": "Armenia",
    "income": 7810,
    "population": 3033500
  },
  {
    "code": "AW",
    "nom": "Aruba",
    "income": 35200,
    "population": 107995
  },
  {
    "code": "AU",
    "nom": "Australia",
    "income": 62680,
    "population": 27194286
  },
  {
    "code": "AT",
    "nom": "Austria",
    "income": 54760,
    "population": 9177982
  },
  {
    "code": "AZ",
    "nom": "Azerbaijan",
    "income": 7340,
    "population": 10202830
  },
  {
    "code": "BS",
    "nom": "Bahamas",
    "income": 37020,
    "population": 401283
  },
  {
    "code": "BD",
    "nom": "Bangladesh",
    "income": 2820,
    "population": 173562364
  },
  {
    "code": "BB",
    "nom": "Barbados",
    "income": 25360,
    "population": 282467
  },
  {
    "code": "BY",
    "nom": "Belarus",
    "income": 8380,
    "population": 9132629
  },
  {
    "code": "BE",
    "nom": "Belgium",
    "income": 55290,
    "population": 11858610
  },
  {
    "code": "BZ",
    "nom": "Belize",
    "income": 7150,
    "population": 417072
  },
  {
    "code": "BJ",
    "nom": "Benin",
    "income": 1430,
    "population": 14462724
  },
  {
    "code": "BM",
    "nom": "Bermuda",
    "income": 139370,
    "population": 64636
  },
  {
    "code": "BT",
    "nom": "Bhutan",
    "income": 3910,
    "population": 791524
  },
  {
    "code": "BO",
    "nom": "Bolivia",
    "income": 4160,
    "population": 12413315
  },
  {
    "code": "BA",
    "nom": "Bosnia and Herz.",
    "income": 8810,
    "population": 3164253
  },
  {
    "code": "BW",
    "nom": "Botswana",
    "income": 7610,
    "population": 2521139
  },
  {
    "code": "BR",
    "nom": "Brazil",
    "income": 9930,
    "population": 211998573
  },
  {
    "code": "VG",
    "nom": "British Virgin Is."
  },
  {
    "code": "BN",
    "nom": "Brunei",
    "income": 36020,
    "population": 462721
  },
  {
    "code": "BG",
    "nom": "Bulgaria",
    "income": 15370,
    "population": 6441421
  },
  {
    "code": "BF",
    "nom": "Burkina Faso",
    "income": 850,
    "population": 23548781
  },
  {
    "code": "BI",
    "nom": "Burundi",
    "income": 250,
    "population": 14047786
  },
  {
    "code": "KH",
    "nom": "Cambodia",
    "income": 2550,
    "population": 17638801
  },
  {
    "code": "CM",
    "nom": "Cameroon",
    "income": 1690,
    "population": 29123744
  },
  {
    "code": "CA",
    "nom": "Canada",
    "income": 54110,
    "population": 41262329
  },
  {
    "code": "IC",
    "nom": "Canary Islands"
  },
  {
    "code": "CV",
    "nom": "Cape Verde",
    "income": 4940,
    "population": 524877
  },
  {
    "code": "KY",
    "nom": "Cayman Is.",
    "income": 81920,
    "population": 74457
  },
  {
    "code": "CF",
    "nom": "Central African Rep.",
    "income": 510,
    "population": 5330690
  },
  {
    "code": "TD",
    "nom": "Chad",
    "income": 930,
    "population": 20299123
  },
  {
    "code": "CL",
    "nom": "Chile",
    "income": 15840,
    "population": 19764771
  },
  {
    "code": "CN",
    "nom": "China",
    "income": 13660,
    "population": 1408975000
  },
  {
    "code": "CO",
    "nom": "Colombia",
    "income": 7090,
    "population": 52886363
  },
  {
    "code": "KM",
    "nom": "Comoros",
    "income": 1730,
    "population": 866628
  },
  {
    "code": "CG",
    "nom": "Congo",
    "income": 2270,
    "population": 6332961
  },
  {
    "code": "CR",
    "nom": "Costa Rica",
    "income": 15710,
    "population": 5129910
  },
  {
    "code": "CI",
    "nom": "Côte d'Ivoire",
    "income": 2520,
    "population": 31934230
  },
  {
    "code": "HR",
    "nom": "Croatia",
    "income": 22230,
    "population": 3866200
  },
  {
    "code": "CU",
    "nom": "Cuba"
  },
  {
    "code": "CW",
    "nom": "Curaco",
    "income": 22570,
    "population": 155967
  },
  {
    "code": "CY",
    "nom": "Cyprus",
    "income": 32870,
    "population": 1358282
  },
  {
    "code": "CZ",
    "nom": "Czech Rep.",
    "income": 29570,
    "population": 10905028
  },
  {
    "code": "CD",
    "nom": "Dem. Rep. Congo",
    "income": 680,
    "population": 109276265
  },
  {
    "code": "KP",
    "nom": "Dem. Rep. Korea"
  },
  {
    "code": "DK",
    "nom": "Denmark",
    "income": 72540,
    "population": 5976992
  },
  {
    "code": "DJ",
    "nom": "Djibouti",
    "income": 3640,
    "population": 1168722
  },
  {
    "code": "DM",
    "nom": "Dominica",
    "income": 9930,
    "population": 66205
  },
  {
    "code": "DO",
    "nom": "Dominican Rep.",
    "income": 10310,
    "population": 11427557
  },
  {
    "code": "EC",
    "nom": "Ecuador",
    "income": 6400,
    "population": 18135478
  },
  {
    "code": "EG",
    "nom": "Egypt",
    "income": 3510,
    "population": 116538258
  },
  {
    "code": "SV",
    "nom": "El Salvador",
    "income": 5070,
    "population": 6338193
  },
  {
    "code": "GQ",
    "nom": "Eq. Guinea",
    "income": 6050,
    "population": 1892516
  },
  {
    "code": "ER",
    "nom": "Eritrea"
  },
  {
    "code": "EE",
    "nom": "Estonia",
    "income": 28880,
    "population": 1372341
  },
  {
    "code": "ET",
    "nom": "Ethiopia",
    "income": 1100,
    "population": 132059767
  },
  {
    "code": "FO",
    "nom": "Faeroe Is.",
    "income": 73120,
    "population": 54640
  },
  {
    "code": "FK",
    "nom": "Falkland Is."
  },
  {
    "code": "FJ",
    "nom": "Fiji",
    "income": 5820,
    "population": 928784
  },
  {
    "code": "FI",
    "nom": "Finland",
    "income": 51710,
    "population": 5619911
  },
  {
    "code": "PF",
    "nom": "Fr. Polynesia",
    "income": 24100,
    "population": 281807
  },
  {
    "code": "FR",
    "nom": "France",
    "income": 45160,
    "population": 68551653
  },
  {
    "code": "GF",
    "nom": "French Guiana"
  },
  {
    "code": "GA",
    "nom": "Gabon",
    "income": 7870,
    "population": 2538952
  },
  {
    "code": "GM",
    "nom": "Gambia",
    "income": 880,
    "population": 2759988
  },
  {
    "code": "GE",
    "nom": "Georgia",
    "income": 7870,
    "population": 3812518
  },
  {
    "code": "DE",
    "nom": "Germany",
    "income": 55090,
    "population": 83516593
  },
  {
    "code": "GH",
    "nom": "Ghana",
    "income": 2260,
    "population": 34427414
  },
  {
    "code": "GR",
    "nom": "Greece",
    "income": 22730,
    "population": 10405134
  },
  {
    "code": "GL",
    "nom": "Greenland"
  },
  {
    "code": "GD",
    "nom": "Grenada",
    "income": 10790,
    "population": 117207
  },
  {
    "code": "GP",
    "nom": "Guadeloupe"
  },
  {
    "code": "GT",
    "nom": "Guatemala",
    "income": 5780,
    "population": 18406359
  },
  {
    "code": "GN",
    "nom": "Guinea",
    "income": 1440,
    "population": 14754785
  },
  {
    "code": "GW",
    "nom": "Guinea-Bissau",
    "income": 980,
    "population": 2201352
  },
  {
    "code": "GY",
    "nom": "Guyana",
    "income": 26400,
    "population": 831087
  },
  {
    "code": "HT",
    "nom": "Haiti",
    "income": 1730,
    "population": 11772557
  },
  {
    "code": "HN",
    "nom": "Honduras",
    "income": 3020,
    "population": 10825703
  },
  {
    "code": "HK",
    "nom": "Hong Kong",
    "income": 57410,
    "population": 7524100
  },
  {
    "code": "HU",
    "nom": "Hungary",
    "income": 20800,
    "population": 9562065
  },
  {
    "code": "IS",
    "nom": "Iceland",
    "income": 80910,
    "population": 386506
  },
  {
    "code": "IN",
    "nom": "India",
    "income": 2550,
    "population": 1450935791
  },
  {
    "code": "ID",
    "nom": "Indonesia",
    "income": 4920,
    "population": 283487931
  },
  {
    "code": "IR",
    "nom": "Iran",
    "income": 5130,
    "population": 91567738
  },
  {
    "code": "IQ",
    "nom": "Iraq",
    "income": 6030,
    "population": 46042015
  },
  {
    "code": "IE",
    "nom": "Ireland",
    "income": 80650,
    "population": 5395790
  },
  {
    "code": "IL",
    "nom": "Israel",
    "income": 53090,
    "population": 10002200
  },
  {
    "code": "IT",
    "nom": "Italy",
    "income": 38640,
    "population": 58952704
  },
  {
    "code": "JM",
    "nom": "Jamaica",
    "income": 7190,
    "population": 2839175
  },
  {
    "code": "JP",
    "nom": "Japan",
    "income": 37170,
    "population": 123975371
  },
  {
    "code": "JO",
    "nom": "Jordan",
    "income": 4880,
    "population": 11552876
  },
  {
    "code": "KZ",
    "nom": "Kazakhstan",
    "income": 12100,
    "population": 20592571
  },
  {
    "code": "KE",
    "nom": "Kenya",
    "income": 2070,
    "population": 56432944
  },
  {
    "code": "KR",
    "nom": "Korea",
    "income": 36750,
    "population": 51751065
  },
  {
    "code": "KW",
    "nom": "Kuwait",
    "income": 41110,
    "population": 4897263
  },
  {
    "code": "KG",
    "nom": "Kyrgyzstan",
    "income": 2260,
    "population": 7221868
  },
  {
    "code": "LA",
    "nom": "Lao PDR",
    "income": 2000,
    "population": 7769819
  },
  {
    "code": "LV",
    "nom": "Latvia",
    "income": 21520,
    "population": 1866124
  },
  {
    "code": "LB",
    "nom": "Lebanon",
    "income": 3560,
    "population": 5805962
  },
  {
    "code": "LS",
    "nom": "Lesotho",
    "income": 1240,
    "population": 2337423
  },
  {
    "code": "LR",
    "nom": "Liberia",
    "income": 750,
    "population": 5612817
  },
  {
    "code": "LY",
    "nom": "Libya",
    "income": 6790,
    "population": 7381023
  },
  {
    "code": "LI",
    "nom": "Liechtenstein"
  },
  {
    "code": "LT",
    "nom": "Lithuania",
    "income": 27110,
    "population": 2888278
  },
  {
    "code": "LU",
    "nom": "Luxembourg",
    "income": 84650,
    "population": 677012
  },
  {
    "code": "MK",
    "nom": "Macedonia",
    "income": 8300,
    "population": 1824359
  },
  {
    "code": "MG",
    "nom": "Madagascar",
    "income": 520,
    "population": 31964956
  },
  {
    "code": "MW",
    "nom": "Malawi",
    "income": 570,
    "population": 21655286
  },
  {
    "code": "MY",
    "nom": "Malaysia",
    "income": 11650,
    "population": 35557673
  },
  {
    "code": "MV",
    "nom": "Maldives",
    "income": 11540,
    "population": 527799
  },
  {
    "code": "ML",
    "nom": "Mali",
    "income": 1030,
    "population": 24478595
  },
  {
    "code": "MT",
    "nom": "Malta",
    "income": 36540,
    "population": 568847
  },
  {
    "code": "MQ",
    "nom": "Martinique"
  },
  {
    "code": "MR",
    "nom": "Mauritania",
    "income": 2110,
    "population": 5169395
  },
  {
    "code": "MU",
    "nom": "Mauritius",
    "income": 12960,
    "population": 1245779
  },
  {
    "code": "YT",
    "nom": "Mayotte"
  },
  {
    "code": "MX",
    "nom": "Mexico",
    "income": 12760,
    "population": 130861007
  },
  {
    "code": "MD",
    "nom": "Moldova",
    "income": 6890,
    "population": 2402306
  },
  {
    "code": "MN",
    "nom": "Mongolia",
    "income": 5380,
    "population": 3524788
  },
  {
    "code": "ME",
    "nom": "Montenegro",
    "income": 12210,
    "population": 623525
  },
  {
    "code": "MS",
    "nom": "Montserrat"
  },
  {
    "code": "MA",
    "nom": "Morocco",
    "income": 3840,
    "population": 38081173
  },
  {
    "code": "MZ",
    "nom": "Mozambique",
    "income": 550,
    "population": 34631766
  },
  {
    "code": "MM",
    "nom": "Myanmar",
    "income": 1210,
    "population": 54500091
  },
  {
    "code": "NA",
    "nom": "Namibia",
    "income": 4290,
    "population": 3030131
  },
  {
    "code": "NR",
    "nom": "Nauru",
    "income": 21940,
    "population": 11947
  },
  {
    "code": "NP",
    "nom": "Nepal",
    "income": 1480,
    "population": 29651054
  },
  {
    "code": "NL",
    "nom": "Netherlands",
    "income": 62500,
    "population": 17993485
  },
  {
    "code": "NC",
    "nom": "New Caledonia",
    "income": 30070,
    "population": 292639
  },
  {
    "code": "NZ",
    "nom": "New Zealand",
    "income": 47070,
    "population": 5290000
  },
  {
    "code": "NI",
    "nom": "Nicaragua",
    "income": 2510,
    "population": 6916140
  },
  {
    "code": "NE",
    "nom": "Niger",
    "income": 670,
    "population": 27032412
  },
  {
    "code": "NG",
    "nom": "Nigeria",
    "income": 1710,
    "population": 232679478
  },
  {
    "code": "NO",
    "nom": "Norway",
    "income": 100030,
    "population": 5572279
  },
  {
    "code": "OM",
    "nom": "Oman",
    "income": 19520,
    "population": 5281538
  },
  {
    "code": "PK",
    "nom": "Pakistan",
    "income": 1430,
    "population": 251269164
  },
  {
    "code": "PS",
    "nom": "Palestine",
    "income": 2980,
    "population": 5289152
  },
  {
    "code": "PA",
    "nom": "Panama",
    "income": 17950,
    "population": 4515577
  },
  {
    "code": "PG",
    "nom": "Papua New Guinea",
    "income": 2860,
    "population": 10576502
  },
  {
    "code": "PY",
    "nom": "Paraguay",
    "income": 6290,
    "population": 6929153
  },
  {
    "code": "PE",
    "nom": "Peru",
    "income": 7530,
    "population": 34217848
  },
  {
    "code": "PH",
    "nom": "Philippines",
    "income": 4470,
    "population": 115843670
  },
  {
    "code": "PN",
    "nom": "Pitcairn Is."
  },
  {
    "code": "PL",
    "nom": "Poland",
    "income": 21590,
    "population": 36559233
  },
  {
    "code": "PT",
    "nom": "Portugal",
    "income": 26940,
    "population": 10694681
  },
  {
    "code": "PR",
    "nom": "Puerto Rico",
    "income": 25870,
    "population": 3202521
  },
  {
    "code": "QA",
    "nom": "Qatar",
    "income": 76570,
    "population": 2857822
  },
  {
    "code": "RE",
    "nom": "Reunion"
  },
  {
    "code": "RO",
    "nom": "Romania",
    "income": 17600,
    "population": 19051804
  },
  {
    "code": "RU",
    "nom": "Russia",
    "income": 15330,
    "population": 143669648
  },
  {
    "code": "RW",
    "nom": "Rwanda",
    "income": 1070,
    "population": 14256567
  },
  {
    "code": "SS",
    "nom": "S. Sudan"
  },
  {
    "code": "LC",
    "nom": "Saint Lucia",
    "income": 12840,
    "population": 179744
  },
  {
    "code": "ST",
    "nom": "São Tomé and Principe",
    "income": 2910,
    "population": 235536
  },
  {
    "code": "SA",
    "nom": "Saudi Arabia",
    "income": 35990,
    "population": 35300280
  },
  {
    "code": "SN",
    "nom": "Senegal",
    "income": 1630,
    "population": 18501984
  },
  {
    "code": "RS",
    "nom": "Serbia",
    "income": 11610,
    "population": 6586476
  },
  {
    "code": "SC",
    "nom": "Seychelles",
    "income": 17700,
    "population": 121354
  },
  {
    "code": "SL",
    "nom": "Sierra Leone",
    "income": 820,
    "population": 8642022
  },
  {
    "code": "SG",
    "nom": "Singapore",
    "income": 75820,
    "population": 6036860
  },
  {
    "code": "SX",
    "nom": "Sint Maarten",
    "income": 38950,
    "population": 43350
  },
  {
    "code": "SK",
    "nom": "Slovakia",
    "income": 23560,
    "population": 5422069
  },
  {
    "code": "SI",
    "nom": "Slovenia",
    "income": 31790,
    "population": 2127400
  },
  {
    "code": "SB",
    "nom": "Solomon Is.",
    "income": 1910,
    "population": 819198
  },
  {
    "code": "SO",
    "nom": "Somalia",
    "income": 620,
    "population": 19009151
  },
  {
    "code": "ZA",
    "nom": "South Africa",
    "income": 6110,
    "population": 64007187
  },
  {
    "code": "ES",
    "nom": "Spain",
    "income": 33550,
    "population": 48848840
  },
  {
    "code": "LK",
    "nom": "Sri Lanka",
    "income": 3870,
    "population": 21916000
  },
  {
    "code": "KN",
    "nom": "St. Kitts and Nevis",
    "income": 21960,
    "population": 46843
  },
  {
    "code": "VC",
    "nom": "St. Vin. and Gren.",
    "income": 11210,
    "population": 100616
  },
  {
    "code": "SD",
    "nom": "Sudan",
    "income": 710,
    "population": 50448963
  },
  {
    "code": "SR",
    "nom": "Suriname",
    "income": 5690,
    "population": 634431
  },
  {
    "code": "SZ",
    "nom": "Swaziland",
    "income": 3440,
    "population": 1242822
  },
  {
    "code": "SE",
    "nom": "Sweden",
    "income": 58510,
    "population": 10569709
  },
  {
    "code": "CH",
    "nom": "Switzerland",
    "income": 99920,
    "population": 9005582
  },
  {
    "code": "SY",
    "nom": "Syria"
  },
  {
    "code": "TW",
    "nom": "Taiwan"
  },
  {
    "code": "TJ",
    "nom": "Tajikistan",
    "income": 1650,
    "population": 10590927
  },
  {
    "code": "TZ",
    "nom": "Tanzania",
    "income": 1210,
    "population": 68560157
  },
  {
    "code": "TH",
    "nom": "Thailand",
    "income": 7130,
    "population": 71668011
  },
  {
    "code": "TL",
    "nom": "Timor-Leste",
    "income": 1650,
    "population": 1400638
  },
  {
    "code": "TG",
    "nom": "Togo",
    "income": 1220,
    "population": 8406558
  },
  {
    "code": "TO",
    "nom": "Tonga",
    "income": 6270,
    "population": 104175
  },
  {
    "code": "TT",
    "nom": "Trinidad and Tobago",
    "income": 19290,
    "population": 1368333
  },
  {
    "code": "TN",
    "nom": "Tunisia",
    "income": 3880,
    "population": 12277109
  },
  {
    "code": "TR",
    "nom": "Turkey",
    "income": 13430,
    "population": 85518661
  },
  {
    "code": "TM",
    "nom": "Turkmenistan",
    "income": 5640,
    "population": 7494498
  },
  {
    "code": "TC",
    "nom": "Turks and Caicos Is.",
    "income": 36760,
    "population": 46535
  },
  {
    "code": "VI",
    "nom": "U.S. Virgin Is."
  },
  {
    "code": "UG",
    "nom": "Uganda",
    "income": 1010,
    "population": 50015092
  },
  {
    "code": "UA",
    "nom": "Ukraine",
    "income": 5230,
    "population": 37860221
  },
  {
    "code": "AE",
    "nom": "United Arab Emirates",
    "income": 51550,
    "population": 10986400
  },
  {
    "code": "GB",
    "nom": "United Kingdom",
    "income": 49320,
    "population": 69281000
  },
  {
    "code": "US",
    "nom": "United States",
    "income": 82910,
    "population": 340003797
  },
  {
    "code": "UY",
    "nom": "Uruguay",
    "income": 22000,
    "population": 3386588
  },
  {
    "code": "UZ",
    "nom": "Uzbekistan",
    "income": 3170,
    "population": 36361859
  },
  {
    "code": "VU",
    "nom": "Vanuatu",
    "income": 4130,
    "population": 327777
  },
  {
    "code": "VE",
    "nom": "Venezuela",
    "income": 3840,
    "population": 28405543
  },
  {
    "code": "VN",
    "nom": "Vietnam",
    "income": 4490,
    "population": 100987686
  },
  {
    "code": "EH",
    "nom": "W. Sahara"
  },
  {
    "code": "YE",
    "nom": "Yemen"
  },
  {
    "code": "ZM",
    "nom": "Zambia",
    "income": 1190,
    "population": 21314956
  },
  {
    "code": "ZW",
    "nom": "Zimbabwe",
    "income": 2400,
    "population": 16634373
  }
]
