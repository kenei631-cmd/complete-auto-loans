import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "Post-repossession approvals", "pros": ["Works with recent repossessions", "No waiting period", "Income-based approval", "All 50 states"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "Auto Credit Express", "tagline": "Repo specialist network", "approvalRate": "89%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Post-repo", "pros": ["Repo specialists", "Multiple lenders", "Fast"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "JD Byrider", "tagline": "BHPH with repo acceptance", "approvalRate": "98%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$500", "bestFor": "Any repo", "pros": ["Accepts any repo", "Nationwide", "Guaranteed"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "RoadLoans", "tagline": "Subprime lender accepting repos", "approvalRate": "85%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Recent repo", "pros": ["Accepts recent repos", "Fast decisions", "National"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "DriveTime", "tagline": "In-house financing post-repo", "approvalRate": "96%", "minCreditScore": "Any", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Any repo", "pros": ["No credit check", "Large inventory", "Guaranteed"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestAfterRepossession() {
  return (
    <BestOfPageTemplate
      seoTitle="Best Auto Loans After Repossession of 2026 — Reviewed & Ranked"
      seoDescription="Find the best auto loans after a repossession in 2026. Get approved even with a recent repo on your record. Compare lenders with second-chance programs."
      canonicalPath="/best-auto-loans-after-repossession"
      title="Best Auto Loans After Repossession (2026)"
      subtitle="A repossession on your record doesn't have to mean no car. These lenders work with repo borrowers every day."
      intro="A repossession is one of the hardest credit events to recover from, but it doesn't make getting a car loan impossible. The lenders on this list specifically work with borrowers who have a repo on their record."
      lenders={lenders}
      realStories={[{"name": "Marcus T.", "city": "Phoenix, AZ", "creditScore": "492", "vehicle": "2019 Honda Civic", "downPayment": "$500", "quote": "Had a repo from 2021 and thought no one would touch me. Complete Auto Loans matched me in 10 minutes and I drove home same day."}]}
      faqs={[{"question": "How long does a repossession stay on my credit?", "answer": "A repossession stays on your credit report for 7 years from the date of the original missed payment. However, its impact on your score decreases significantly after 2–3 years."}, {"question": "Do I need to pay off the old repo balance first?", "answer": "Not necessarily. Many lenders will approve you with an outstanding repo deficiency balance. However, paying it off significantly improves your approval odds and rate."}]}
      relatedPages={[{"label": "Best Second Chance Auto Loans", "href": "/best-second-chance-auto-loans"}, {"label": "Best Car Loans After Bankruptcy", "href": "/best-car-loans-after-bankruptcy"}]}
      keyTakeaways={["A repossession does not permanently disqualify you from getting a car loan", "BHPH dealers will approve you regardless of repo history", "Paying off the repo deficiency balance improves your rate significantly", "Repos have less impact on your score after 2–3 years"]}
    />
  );
}
