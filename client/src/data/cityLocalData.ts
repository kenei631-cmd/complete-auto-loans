/**
 * cityLocalData.ts
 * Unique local market facts for each of the 10 covered cities.
 * Used by CityServicePageTemplate to render a "Local Market Facts" section
 * that differentiates each city page from the others.
 *
 * Sources:
 * - State DMV / title fee data: each state's official DMV website
 * - Average used car prices: Edmunds & NADA market reports
 * - Subprime loan share: Experian State of the Automotive Finance Market
 * - State usury / rate cap: state statutes
 * - Unemployment / income: U.S. Bureau of Labor Statistics
 */

export interface CityLocalFact {
  label: string;
  value: string;
  note?: string;
}

export interface CityLocalData {
  /** City + state label, e.g. "Phoenix, AZ" */
  cityLabel: string;
  /** 1–2 sentence market context paragraph */
  marketContext: string;
  /** State-specific auto loan law note */
  stateLawNote: string;
  /** 4–6 local market stats */
  facts: CityLocalFact[];
  /** State abbreviation for display */
  state: string;
}

const cityLocalData: Record<string, CityLocalData> = {
  "phoenix-az": {
    cityLabel: "Phoenix, AZ",
    state: "AZ",
    marketContext:
      "Phoenix is one of the fastest-growing metro areas in the U.S., with a population of over 4.9 million in the Greater Phoenix area. The city's sprawling layout and limited public transit make personal vehicle ownership effectively a necessity — the average Phoenix commuter drives 26 miles each way. This high vehicle dependency, combined with a large population of transplants and first-time buyers, creates one of the most active subprime auto loan markets in the Southwest.",
    stateLawNote:
      "Arizona does not cap interest rates on auto loans above $3,000, meaning subprime lenders can charge market-rate APRs. However, Arizona's Retail Installment Sales Act requires all dealers to provide a written contract with the full APR, total finance charge, and payment schedule before you sign. You have the right to a copy of your contract at the time of signing.",
    facts: [
      { label: "State Title Fee", value: "$4 + $1.50 per lien", note: "Plus registration fees based on vehicle value" },
      { label: "Avg. Used Car Price (Phoenix Metro)", value: "$22,400", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (AZ)", value: "24.3%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "5.6% state + local", note: "City/county rates vary; Maricopa County adds 0.7%" },
      { label: "Rate Cap (Auto Loans)", value: "None above $3,000", note: "Arizona Revised Statutes § 44-291" },
      { label: "Median Household Income (Phoenix)", value: "$65,400", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "dallas-tx": {
    cityLabel: "Dallas, TX",
    state: "TX",
    marketContext:
      "The Dallas–Fort Worth metroplex is the fourth-largest metro area in the United States, with over 7.7 million residents. Texas has no state income tax, which attracts a high volume of relocating workers — many of whom arrive without established local credit histories and need vehicle financing quickly. The DFW area has one of the highest concentrations of buy here pay here dealerships in the country, but also a robust network of subprime specialty lenders who offer better rates and always report to credit bureaus.",
    stateLawNote:
      "Texas does not cap interest rates on motor vehicle installment sales contracts. The Texas Finance Code (Chapter 348) governs retail installment sales and requires dealers to disclose the APR, total amount financed, and total of payments. Texas also has a strong consumer protection law: if a dealer repossesses your vehicle, they must notify you within 24 hours and give you the right to redeem it before selling.",
    facts: [
      { label: "State Title Fee", value: "$28–$33", note: "Varies by county; Dallas County is $33" },
      { label: "Avg. Used Car Price (DFW Metro)", value: "$23,100", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (TX)", value: "26.1%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "6.25%", note: "No additional local vehicle tax in Texas" },
      { label: "Rate Cap (Auto Loans)", value: "None", note: "Texas Finance Code § 348" },
      { label: "Median Household Income (Dallas)", value: "$58,900", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "chicago-il": {
    cityLabel: "Chicago, IL",
    state: "IL",
    marketContext:
      "Chicago is the third-largest city in the United States, with a metro population of over 9.5 million. While Chicago has an extensive public transit system (the CTA), vehicle ownership remains essential for residents in the suburbs and outer neighborhoods. Illinois has one of the highest concentrations of subprime borrowers in the Midwest, driven in part by high living costs and a large working-class population. The Chicago metro area also has a significant ITIN borrower community, and several local lenders specialize in ITIN-based auto financing.",
    stateLawNote:
      "Illinois does not cap interest rates on auto loans above $25,000. For loans under $25,000, the Illinois Interest Act caps rates at 9% annually — but most auto loans are structured as retail installment sales contracts under the Illinois Motor Vehicle Retail Installment Sales Act, which exempts them from the 9% cap. Illinois requires dealers to provide a written disclosure of the APR and total finance charge. Illinois also has a strong right-of-redemption law: after repossession, you have 21 days to redeem the vehicle by paying the full outstanding balance.",
    facts: [
      { label: "State Title Fee", value: "$150", note: "One of the higher title fees in the Midwest" },
      { label: "Avg. Used Car Price (Chicago Metro)", value: "$21,800", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (IL)", value: "22.8%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "6.25% state + local", note: "Chicago adds 1.25%; total can reach 10.25%" },
      { label: "Rate Cap (Auto Loans)", value: "None for retail installment sales", note: "Illinois Motor Vehicle Retail Installment Sales Act" },
      { label: "Median Household Income (Chicago)", value: "$62,100", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "houston-tx": {
    cityLabel: "Houston, TX",
    state: "TX",
    marketContext:
      "Houston is the fourth-largest city in the United States and the largest in Texas, with a metro population of over 7.3 million. The city's energy sector drives significant economic activity, but also creates income volatility — oil price swings can affect employment for a large portion of the workforce. Houston has one of the most diverse populations of any U.S. city, with a large immigrant community that often needs ITIN-based financing. The city's flat terrain and lack of zoning create a sprawling layout where car ownership is essentially mandatory.",
    stateLawNote:
      "Texas does not cap interest rates on motor vehicle installment sales contracts. The Texas Finance Code (Chapter 348) governs retail installment sales and requires full APR disclosure. Houston-area dealers are subject to the same Texas consumer protection laws as Dallas, including the 24-hour repossession notification requirement and the right to redeem before sale.",
    facts: [
      { label: "State Title Fee", value: "$28–$33", note: "Harris County is $33" },
      { label: "Avg. Used Car Price (Houston Metro)", value: "$22,700", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (TX)", value: "26.1%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "6.25%", note: "No additional local vehicle tax in Texas" },
      { label: "Rate Cap (Auto Loans)", value: "None", note: "Texas Finance Code § 348" },
      { label: "Median Household Income (Houston)", value: "$55,800", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "los-angeles-ca": {
    cityLabel: "Los Angeles, CA",
    state: "CA",
    marketContext:
      "Los Angeles County is the most populous county in the United States, with over 10 million residents. Despite having the Metro Rail system, the vast majority of Angelenos rely on personal vehicles — the average LA commuter spends 119 hours per year in traffic, the highest of any U.S. metro. California has some of the strongest consumer protection laws for auto loan borrowers in the country, including a mandatory 2-day right to cancel on many dealer-financed purchases. The LA metro area has a very large subprime lending market, with dozens of specialty lenders competing for borrowers.",
    stateLawNote:
      "California does not cap interest rates on auto loans above $2,500 (Civil Code § 1799.8). However, California's Rees-Levering Automobile Sales Finance Act is one of the most borrower-protective auto loan laws in the country. Key provisions: dealers must provide a written contract with full APR disclosure; you have the right to cancel a purchase within 2 days if the dealer arranged financing (the 'spot delivery' rule); and after repossession, the lender must send a Notice of Intent to Dispose at least 15 days before selling the vehicle.",
    facts: [
      { label: "State Title Fee", value: "$21 + $15 transfer fee", note: "Plus registration fees based on vehicle value" },
      { label: "Avg. Used Car Price (LA Metro)", value: "$26,300", note: "Edmunds, Q1 2026 — highest of the 10 covered cities" },
      { label: "Subprime Loan Share (CA)", value: "19.4%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "7.25% state + local", note: "LA County adds 2.25%; total is 10.25%" },
      { label: "Rate Cap (Auto Loans)", value: "None above $2,500", note: "California Civil Code § 1799.8" },
      { label: "Median Household Income (LA)", value: "$72,800", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "san-antonio-tx": {
    cityLabel: "San Antonio, TX",
    state: "TX",
    marketContext:
      "San Antonio is the second-largest city in Texas and the seventh-largest in the United States, with a metro population of over 2.6 million. The city has a large military presence (Joint Base San Antonio is one of the largest military installations in the country), which creates a unique lending dynamic — active-duty service members have strong income stability but often have thin credit files due to frequent relocations. San Antonio also has a large Hispanic population, with a significant ITIN borrower community. The city's relatively low cost of living compared to other major Texas metros makes vehicle payments more manageable.",
    stateLawNote:
      "Texas does not cap interest rates on motor vehicle installment sales contracts. San Antonio-area dealers are subject to the same Texas Finance Code (Chapter 348) requirements as other Texas cities. Military borrowers have additional federal protections under the Military Lending Act (MLA), which caps interest rates at 36% MAPR (Military Annual Percentage Rate) for active-duty service members and their dependents.",
    facts: [
      { label: "State Title Fee", value: "$28–$33", note: "Bexar County is $33" },
      { label: "Avg. Used Car Price (San Antonio Metro)", value: "$21,200", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (TX)", value: "26.1%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "6.25%", note: "No additional local vehicle tax in Texas" },
      { label: "Military Borrower Protection", value: "36% MAPR cap", note: "Military Lending Act — applies to active duty + dependents" },
      { label: "Median Household Income (San Antonio)", value: "$53,200", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "miami-fl": {
    cityLabel: "Miami, FL",
    state: "FL",
    marketContext:
      "Miami-Dade County has a population of over 2.7 million and is one of the most diverse metros in the United States. The Miami area has an exceptionally large immigrant population — over 70% of Miami-Dade residents are foreign-born or have foreign-born parents — creating significant demand for ITIN-based auto financing. Florida's lack of state income tax and warm climate attract retirees and remote workers, many of whom arrive without established Florida credit histories. The Miami metro area has one of the highest concentrations of ITIN auto lenders in the country.",
    stateLawNote:
      "Florida caps interest rates on consumer loans at 18% annually for loans under $500,000 (Florida Statutes § 687.03). However, motor vehicle retail installment sales contracts are governed separately under the Florida Motor Vehicle Retail Sales Finance Act (Chapter 520), which sets its own rate schedule: for used vehicles, the maximum rate is 30% on the first $2,000, 24% on the next $1,000, and 18% on the remainder. These caps are higher than the general usury limit but still provide meaningful consumer protection.",
    facts: [
      { label: "State Title Fee", value: "$75.25 + $2.50 per lien", note: "One of the higher title fees in the Southeast" },
      { label: "Avg. Used Car Price (Miami Metro)", value: "$24,100", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (FL)", value: "21.7%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "6% state + local surtax", note: "Miami-Dade adds 1%; total is 7%" },
      { label: "Rate Cap (Used Auto Loans)", value: "18–30% depending on amount", note: "Florida Motor Vehicle Retail Sales Finance Act" },
      { label: "Median Household Income (Miami)", value: "$48,900", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "atlanta-ga": {
    cityLabel: "Atlanta, GA",
    state: "GA",
    marketContext:
      "The Atlanta metro area has a population of over 6.2 million and is one of the fastest-growing metros in the Southeast. Atlanta's economy is driven by logistics, film production, technology, and healthcare — industries with a wide range of income levels and employment stability. The city has a large African American middle class and a growing immigrant community, both of which represent significant segments of the subprime auto lending market. Georgia's MARTA transit system covers only a portion of the metro, making vehicle ownership essential for most residents.",
    stateLawNote:
      "Georgia caps interest rates on installment loans at 16% annually for loans between $3,000 and $10,000, and 10% for loans above $10,000 (Georgia Industrial Loan Act). However, motor vehicle retail installment sales contracts are governed by the Georgia Motor Vehicle Sales Finance Act, which sets a separate rate schedule. For used vehicles, the maximum finance charge is 18% on the first $1,000, 12% on the next $2,000, and 9% on the remainder — making Georgia one of the more rate-protective states for auto loan borrowers.",
    facts: [
      { label: "State Title Fee", value: "$18", note: "Plus ad valorem tax based on vehicle value" },
      { label: "Avg. Used Car Price (Atlanta Metro)", value: "$21,600", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (GA)", value: "23.5%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "Title Ad Valorem Tax (TAVT) 7%", note: "Georgia replaced traditional sales tax with TAVT in 2013" },
      { label: "Rate Cap (Used Auto Loans)", value: "9–18% depending on amount", note: "Georgia Motor Vehicle Sales Finance Act" },
      { label: "Median Household Income (Atlanta)", value: "$68,400", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "las-vegas-nv": {
    cityLabel: "Las Vegas, NV",
    state: "NV",
    marketContext:
      "The Las Vegas metro area (Clark County) has a population of over 2.3 million and is one of the most vehicle-dependent cities in the country. The hospitality and gaming industries dominate the local economy, creating a large workforce with variable income — tips, shift differentials, and seasonal fluctuations are common. This income variability, combined with a transient population and high cost of living relative to wages, creates significant demand for subprime auto financing. Nevada has no state income tax, which helps with affordability, but the state also has relatively few consumer protections for auto loan borrowers.",
    stateLawNote:
      "Nevada does not cap interest rates on motor vehicle retail installment sales contracts. The Nevada Retail Installment Sales Act (NRS Chapter 97) requires dealers to disclose the APR and total finance charge but does not limit the rate. Nevada also has relatively weak repossession protections compared to other states — lenders can repossess without prior notice as long as they do not breach the peace.",
    facts: [
      { label: "State Title Fee", value: "$28.25", note: "Plus registration fees based on vehicle weight" },
      { label: "Avg. Used Car Price (Las Vegas Metro)", value: "$22,900", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (NV)", value: "25.8%", note: "Experian Automotive, 2025 — among the highest in the West" },
      { label: "State Sales Tax on Vehicles", value: "6.85% state + local", note: "Clark County adds 1.53%; total is 8.38%" },
      { label: "Rate Cap (Auto Loans)", value: "None", note: "Nevada Retail Installment Sales Act (NRS § 97)" },
      { label: "Median Household Income (Las Vegas)", value: "$58,200", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "charlotte-nc": {
    cityLabel: "Charlotte, NC",
    state: "NC",
    marketContext:
      "Charlotte is the largest city in North Carolina and the second-largest in the Southeast, with a metro population of over 2.7 million. The city is a major financial services hub — Bank of America and Wells Fargo both have significant operations here — which creates a wide range of income levels and credit profiles. Charlotte has experienced rapid population growth driven by transplants from the Northeast and Midwest, many of whom arrive with established credit histories. However, the city also has a large working-class population in manufacturing and logistics that represents a significant share of the subprime auto lending market.",
    stateLawNote:
      "North Carolina caps interest rates on consumer loans at 16% annually for loans between $3,500 and $10,000, and 30% for loans under $3,500 (NC General Statutes § 24-1.1). Motor vehicle retail installment sales contracts are governed by the NC Motor Vehicle Dealers and Manufacturers Licensing Law and the NC Retail Installment Sales Act, which requires full APR disclosure. North Carolina also has strong repossession protections: lenders must provide written notice before repossession and give borrowers 20 days to cure a default.",
    facts: [
      { label: "State Title Fee", value: "$56", note: "Plus highway use tax of 3% of vehicle value" },
      { label: "Avg. Used Car Price (Charlotte Metro)", value: "$21,900", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (NC)", value: "21.3%", note: "Experian Automotive, 2025" },
      { label: "State Tax on Vehicles", value: "Highway Use Tax 3%", note: "NC replaced sales tax with HUT in 1989; no additional local tax" },
      { label: "Rate Cap (Auto Loans)", value: "16% for loans $3,500–$10,000", note: "NC General Statutes § 24-1.1" },
      { label: "Median Household Income (Charlotte)", value: "$67,200", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "colorado-springs-co": {
    cityLabel: "Colorado Springs, CO",
    state: "CO",
    marketContext:
      "Colorado Springs is the second-largest city in Colorado, with a population of over 500,000 in the city proper and over 750,000 in El Paso County. The city has a major military presence — Fort Carson, Peterson Space Force Base, and the Air Force Academy are all located here — which creates a large population of active-duty service members and veterans. Military borrowers have strong income stability but often have thin credit files due to frequent relocations. Colorado Springs also has a significant veteran community that may have credit challenges related to service-related financial hardships.",
    stateLawNote:
      "Colorado caps interest rates on consumer loans at 21% annually for loans under $75,000 (Colorado Revised Statutes § 5-2-201). This cap applies to motor vehicle retail installment sales contracts and is one of the more protective rate caps in the country. Military borrowers have additional federal protections under the Military Lending Act (MLA), which caps rates at 36% MAPR for active-duty service members and their dependents — though Colorado's 21% cap is already lower than the MLA cap.",
    facts: [
      { label: "State Title Fee", value: "$7.20", note: "One of the lowest title fees in the country" },
      { label: "Avg. Used Car Price (Colorado Springs)", value: "$22,100", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (CO)", value: "18.9%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "2.9% state + local", note: "El Paso County adds 1.23%; Colorado Springs adds 3.12%" },
      { label: "Rate Cap (Auto Loans)", value: "21% APR", note: "Colorado Revised Statutes § 5-2-201" },
      { label: "Military Borrower Protection", value: "36% MAPR cap", note: "Military Lending Act — applies to active duty + dependents" },
    ],
  },

  "columbus-oh": {
    cityLabel: "Columbus, OH",
    state: "OH",
    marketContext:
      "Columbus is the capital and largest city in Ohio, with a metro population of over 2.1 million. The city is home to The Ohio State University, which creates a large student and young professional population — many of whom are first-time car buyers with thin or no credit histories. Columbus has a diverse economy spanning healthcare, education, technology, and financial services. Ohio has one of the largest concentrations of buy here pay here dealerships in the Midwest, but also a competitive subprime lending market with multiple specialty lenders offering better rates.",
    stateLawNote:
      "Ohio caps interest rates on consumer installment loans at 28% annually for loans under $5,000, and 21% for loans between $5,000 and $10,000 (Ohio Revised Code § 1321.13). Motor vehicle retail installment sales contracts are governed by the Ohio Retail Installment Sales Act (ORC § 1317), which requires full APR disclosure and sets a maximum finance charge schedule. Ohio also has a strong right-of-redemption law: after repossession, you have the right to redeem the vehicle within 15 days by paying the full outstanding balance plus repossession costs.",
    facts: [
      { label: "State Title Fee", value: "$15", note: "Plus $5 per lien notation" },
      { label: "Avg. Used Car Price (Columbus Metro)", value: "$20,800", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (OH)", value: "23.1%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "5.75% state + local", note: "Franklin County adds 1.25%; total is 7.5% in Columbus" },
      { label: "Rate Cap (Auto Loans)", value: "21–28% depending on amount", note: "Ohio Revised Code § 1321.13" },
      { label: "Median Household Income (Columbus)", value: "$59,400", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "detroit-mi": {
    cityLabel: "Detroit, MI",
    state: "MI",
    marketContext:
      "Detroit is the largest city in Michigan and the historic center of the U.S. automotive industry, with a metro population of over 4.4 million. The city has experienced significant economic challenges over the past two decades, including its 2013 municipal bankruptcy — the largest in U.S. history. This economic history means Detroit has one of the highest concentrations of subprime borrowers of any major U.S. metro. However, the city is in the midst of a significant economic revival, with new investment in technology, healthcare, and manufacturing. Detroit also has a large working-class population for whom reliable vehicle transportation is essential.",
    stateLawNote:
      "Michigan does not cap interest rates on motor vehicle retail installment sales contracts. The Michigan Motor Vehicle Sales Finance Act (MCL § 492.101) governs these contracts and requires full APR disclosure but does not set a maximum rate. Michigan has relatively strong repossession protections: lenders must send a written notice of right to cure before repossession, giving borrowers 15 days to make up missed payments. After repossession, borrowers have 15 days to redeem the vehicle.",
    facts: [
      { label: "State Title Fee", value: "$15", note: "Plus $15 transfer fee" },
      { label: "Avg. Used Car Price (Detroit Metro)", value: "$20,400", note: "Edmunds, Q1 2026 — below national average" },
      { label: "Subprime Loan Share (MI)", value: "24.7%", note: "Experian Automotive, 2025 — among the highest in the Midwest" },
      { label: "State Sales Tax on Vehicles", value: "6%", note: "No additional local vehicle tax in Michigan" },
      { label: "Rate Cap (Auto Loans)", value: "None", note: "Michigan Motor Vehicle Sales Finance Act (MCL § 492.101)" },
      { label: "Median Household Income (Detroit)", value: "$37,900", note: "U.S. Census Bureau, 2024 estimate — well below national median" },
    ],
  },

  "fort-worth-tx": {
    cityLabel: "Fort Worth, TX",
    state: "TX",
    marketContext:
      "Fort Worth is the fifth-largest city in Texas and the 13th-largest in the United States, with a city population of over 950,000 and a DFW metro population of over 7.7 million. Fort Worth has a distinct identity from Dallas — it is known for its Western heritage, stockyards, and a strong manufacturing and defense industry base. The city has a large working-class population in manufacturing, logistics, and construction, many of whom are subprime borrowers. Fort Worth also has a significant Hispanic population with a large ITIN borrower community.",
    stateLawNote:
      "Texas does not cap interest rates on motor vehicle installment sales contracts. The Texas Finance Code (Chapter 348) governs retail installment sales and requires full APR disclosure. Fort Worth-area dealers are subject to the same Texas consumer protection laws as Dallas, including the 24-hour repossession notification requirement and the right to redeem before sale. Military borrowers at NAS Fort Worth JRB have additional protections under the Military Lending Act.",
    facts: [
      { label: "State Title Fee", value: "$28–$33", note: "Tarrant County is $33" },
      { label: "Avg. Used Car Price (Fort Worth Metro)", value: "$22,800", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (TX)", value: "26.1%", note: "Experian Automotive, 2025" },
      { label: "State Sales Tax on Vehicles", value: "6.25%", note: "No additional local vehicle tax in Texas" },
      { label: "Rate Cap (Auto Loans)", value: "None", note: "Texas Finance Code § 348" },
      { label: "Median Household Income (Fort Worth)", value: "$60,100", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "tulsa-ok": {
    cityLabel: "Tulsa, OK",
    state: "OK",
    marketContext:
      "Tulsa is the second-largest city in Oklahoma, with a metro population of over 1 million. The city's economy has historically been tied to the oil and gas industry, which creates significant income volatility — boom and bust cycles affect employment and income stability for a large portion of the workforce. This economic volatility, combined with a relatively low median income, creates significant demand for subprime auto financing. Tulsa also has a large Native American population, some of whom may have unique financing needs or preferences for tribal lending institutions.",
    stateLawNote:
      "Oklahoma caps interest rates on consumer loans at 10% annually under the general usury law (Oklahoma Statutes § 15-266). However, motor vehicle retail installment sales contracts are governed by the Oklahoma Uniform Consumer Credit Code (UCCC), which allows higher rates: up to 30% on the first $1,000, 21% on the next $1,000, and 15% on the remainder. Oklahoma also has a right-to-cure provision: lenders must give borrowers 20 days written notice before repossession.",
    facts: [
      { label: "State Title Fee", value: "$11", note: "Plus $1.50 per lien" },
      { label: "Avg. Used Car Price (Tulsa Metro)", value: "$19,800", note: "Edmunds, Q1 2026 — one of the most affordable markets" },
      { label: "Subprime Loan Share (OK)", value: "27.4%", note: "Experian Automotive, 2025 — among the highest in the South" },
      { label: "State Sales Tax on Vehicles", value: "3.25% excise tax", note: "Plus local sales tax; Tulsa County total is approximately 8.52%" },
      { label: "Rate Cap (Auto Loans)", value: "15–30% depending on amount", note: "Oklahoma UCCC" },
      { label: "Median Household Income (Tulsa)", value: "$50,100", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },

  "denver-co": {
    cityLabel: "Denver, CO",
    state: "CO",
    marketContext:
      "The Denver metro area has a population of over 2.9 million and has experienced rapid growth over the past decade, driven by the technology, aerospace, and outdoor recreation industries. Denver attracts a large number of young professionals and transplants from other states, many of whom arrive with thin credit files or student loan debt that has impacted their scores. Colorado's relatively high cost of living — particularly housing — means that many residents have less disposable income for vehicle purchases, making financing essential. The Denver metro area has a competitive subprime lending market with multiple specialty lenders.",
    stateLawNote:
      "Colorado caps interest rates on consumer loans at 21% annually for loans under $75,000 (Colorado Revised Statutes § 5-2-201). Motor vehicle retail installment sales contracts are covered under this cap. This is one of the lower rate caps among the 10 covered cities, which means Colorado borrowers have meaningful protection against the highest subprime rates — but it also means some specialty lenders may not operate in Colorado.",
    facts: [
      { label: "State Title Fee", value: "$7.20", note: "One of the lowest title fees in the country" },
      { label: "Avg. Used Car Price (Denver Metro)", value: "$23,400", note: "Edmunds, Q1 2026" },
      { label: "Subprime Loan Share (CO)", value: "18.9%", note: "Experian Automotive, 2025 — below national average" },
      { label: "State Sales Tax on Vehicles", value: "2.9% state + local", note: "Denver adds 4.31%; total can reach 8.81%" },
      { label: "Rate Cap (Auto Loans)", value: "21% APR", note: "Colorado Revised Statutes § 5-2-201" },
      { label: "Median Household Income (Denver)", value: "$72,600", note: "U.S. Census Bureau, 2024 estimate" },
    ],
  },
};

export default cityLocalData;
