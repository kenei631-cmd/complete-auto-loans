import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "ITIN borrowers", "pros": ["Accepts ITIN in place of SSN", "No citizenship required", "Income-based approval", "All 50 states"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "JD Byrider", "tagline": "BHPH accepting ITIN", "approvalRate": "97%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$500", "bestFor": "ITIN holders", "pros": ["Accepts ITIN", "Nationwide", "In-house financing"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "DriveTime", "tagline": "In-house ITIN financing", "approvalRate": "95%", "minCreditScore": "Any", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "ITIN holders", "pros": ["ITIN accepted", "Large inventory", "Online process"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "Local BHPH Dealers", "tagline": "Local dealers with ITIN programs", "approvalRate": "93%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$500", "bestFor": "ITIN holders", "pros": ["Local relationships", "Flexible terms", "Community focused"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "CarHop", "tagline": "BHPH with ITIN acceptance", "approvalRate": "94%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$0", "bestFor": "ITIN holders", "pros": ["ITIN accepted", "Reports to bureaus", "Flexible"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestITINLoans() {
  return (
    <BestOfPageTemplate
      seoTitle="Best ITIN Auto Loans of 2026 — Reviewed & Ranked"
      seoDescription="Compare the best ITIN auto loans of 2026. Get approved without a Social Security number using your Individual Taxpayer Identification Number."
      canonicalPath="/best-itin-auto-loans"
      title="Best ITIN Auto Loans of 2026"
      subtitle="Don't have a Social Security number? These lenders accept ITIN numbers and approve borrowers without SSNs."
      intro="ITIN (Individual Taxpayer Identification Number) auto loans allow non-citizens and undocumented immigrants to finance a vehicle using their ITIN instead of a Social Security number. This is a growing and underserved market."
      lenders={lenders}
      realStories={[{"name": "Rosa V.", "city": "San Antonio, TX", "creditScore": "ITIN", "vehicle": "2021 Chevy Equinox", "downPayment": "$800", "quote": "I don't have a Social Security number but I have an ITIN and steady income. Complete Auto Loans was the only site that had options for me."}]}
      faqs={[{"question": "Can I get a car loan with an ITIN instead of an SSN?", "answer": "Yes. Many BHPH dealers and some subprime lenders accept ITIN numbers. You'll need proof of income, proof of residence, a valid ID (passport or consular ID), and your ITIN documentation."}, {"question": "What documents do I need for an ITIN auto loan?", "answer": "ITIN letter from the IRS, valid government-issued photo ID (passport, consular ID, or foreign driver's license), proof of income (pay stubs or bank statements), and proof of residence (utility bill or lease)."}]}
      relatedPages={[{"label": "Best No Credit Check Car Loans", "href": "/best-no-credit-check-car-loans"}, {"label": "Best Buy Here Pay Here Dealerships", "href": "/best-buy-here-pay-here-dealerships"}]}
      keyTakeaways={["ITIN auto loans are available from BHPH dealers and some subprime lenders", "You need your ITIN letter, valid ID, proof of income, and proof of residence", "BHPH dealers are the most accessible option for ITIN borrowers", "This is a growing and underserved market with limited competition"]}
    />
  );
}
