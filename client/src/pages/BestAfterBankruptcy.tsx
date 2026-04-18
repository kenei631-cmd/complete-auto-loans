import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "Post-bankruptcy approvals", "pros": ["Approves Chapter 7 and Chapter 13", "No waiting period required", "Discharge not required to apply", "Rebuilds credit with on-time payments"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "Auto Credit Express", "tagline": "Bankruptcy specialist network", "approvalRate": "91%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Post-bankruptcy", "pros": ["Bankruptcy specialists", "No waiting period", "Multiple lenders"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "RoadLoans", "tagline": "Santander-backed bankruptcy lender", "approvalRate": "88%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Bankruptcy", "pros": ["Accepts open bankruptcy", "Fast decisions", "National"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "DriveTime", "tagline": "In-house financing post-bankruptcy", "approvalRate": "96%", "minCreditScore": "Any", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Any bankruptcy", "pros": ["No credit check", "Large inventory", "Guaranteed"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "Capital One Auto Navigator", "tagline": "Bank with bankruptcy program", "approvalRate": "82%", "minCreditScore": "500+", "minIncome": "$1,800/mo", "downPayment": "$0", "bestFor": "Discharged BK", "pros": ["Trusted brand", "Post-discharge program", "Large network"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestAfterBankruptcy() {
  return (
    <BestOfPageTemplate
      seoTitle="Best Car Loans After Bankruptcy of 2026 — Reviewed & Ranked"
      seoDescription="Compare the best auto loans after bankruptcy in 2026. Get approved after Chapter 7 or Chapter 13. Lenders that work with discharged and active BK."
      canonicalPath="/best-car-loans-after-bankruptcy"
      title="Best Car Loans After Bankruptcy (2026)"
      subtitle="Bankruptcy doesn't end your ability to get a car loan. These lenders specialize in post-bankruptcy financing."
      intro="Getting a car loan after bankruptcy is possible — and often easier than people expect. Lenders know that a bankruptcy discharge means your debt slate is clean and you legally can't file again for several years, which actually makes you a lower risk."
      lenders={lenders}
      realStories={[{"name": "David & Lisa M.", "city": "Chicago, IL", "creditScore": "538", "vehicle": "2018 Ford Explorer", "downPayment": "$1,000", "quote": "Chapter 7 bankruptcy discharged 8 months ago. We needed an SUV for our kids. Got approved for a rate we could actually afford."}]}
      faqs={[{"question": "How soon after bankruptcy can I get a car loan?", "answer": "You can apply immediately — even while the bankruptcy is still open. Some lenders require a discharge, but many do not. BHPH dealers will approve you regardless."}, {"question": "Will my bankruptcy affect my interest rate?", "answer": "Yes. Expect rates of 18–29% APR post-bankruptcy. However, after 12–18 months of on-time payments, you can often refinance at a significantly lower rate."}]}
      relatedPages={[{"label": "Best Second Chance Auto Loans", "href": "/best-second-chance-auto-loans"}, {"label": "Best Auto Loans After Repossession", "href": "/best-auto-loans-after-repossession"}]}
      keyTakeaways={["You can apply for a car loan immediately after bankruptcy, even before discharge", "A bankruptcy discharge can actually make you less risky to some lenders", "Expect rates of 18–29% APR, but plan to refinance after 12–18 months", "BHPH dealers will approve you regardless of bankruptcy status"]}
    />
  );
}
