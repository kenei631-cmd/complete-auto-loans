import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "Second chance borrowers", "pros": ["True second chance program", "No judgment on past credit", "Income-focused approval", "Credit rebuilding support"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "Auto Credit Express", "tagline": "Second chance specialist", "approvalRate": "92%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Second chance", "pros": ["True second chance", "Multiple lenders", "Fast"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "CarHop", "tagline": "BHPH with second chance focus", "approvalRate": "97%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$0", "bestFor": "Credit building", "pros": ["Second chance", "Reports to bureaus", "Flexible"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "DriveTime", "tagline": "In-house second chance financing", "approvalRate": "96%", "minCreditScore": "Any", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Any situation", "pros": ["No credit check", "Large inventory", "Guaranteed"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "JD Byrider", "tagline": "National second chance BHPH", "approvalRate": "99%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$500", "bestFor": "Any credit", "pros": ["Near-guaranteed", "Nationwide", "In-house"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestSecondChance() {
  return (
    <BestOfPageTemplate
      seoTitle="Best Second Chance Auto Loans of 2026 — Reviewed & Ranked"
      seoDescription="Compare the best second chance auto loans of 2026. Designed for borrowers with past credit problems. Get a fresh start with lenders that look beyond your score."
      canonicalPath="/best-second-chance-auto-loans"
      cityServiceSlug="second-chance-auto-loans"
      title="Best Second Chance Auto Loans of 2026"
      subtitle="Second chance lenders specialize in borrowers who have been rejected elsewhere. Here's who gives real second chances."
      intro="Second chance auto loans are designed for borrowers who have been turned down by traditional lenders. These lenders look at your current situation — income, stability, and ability to pay — rather than your past mistakes."
      lenders={lenders}
      realStories={[{"name": "Tanya B.", "city": "Atlanta, GA", "creditScore": "518", "vehicle": "2020 Nissan Sentra", "downPayment": "$0 down", "quote": "Single mom, 518 credit score, needed a car for work. Complete Auto Loans found me a lender that didn't care about my past."}]}
      faqs={[{"question": "What makes a lender a 'second chance' lender?", "answer": "Second chance lenders specifically design their programs for borrowers with bad credit, bankruptcies, repossessions, or other negative credit events. They use income and stability as primary approval factors."}]}
      relatedPages={[{"label": "Best Bad Credit Auto Loans", "href": "/best-bad-credit-auto-loans"}, {"label": "Best Car Loans After Bankruptcy", "href": "/best-car-loans-after-bankruptcy"}]}
      keyTakeaways={["Second chance lenders focus on current income, not past credit mistakes", "Many second chance programs include credit rebuilding features", "BHPH dealers offer the most accessible second chance financing"]}
    />
  );
}
