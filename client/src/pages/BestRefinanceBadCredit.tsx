import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "Bad credit refinancing", "pros": ["Refinances existing high-rate loans", "Rate reduction guaranteed or we pay you $100", "Soft credit check to check rates", "Average savings of $87/month"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "RefiJet", "tagline": "Dedicated auto refinance specialist", "approvalRate": "88%", "minCreditScore": "500+", "minIncome": "$1,800/mo", "downPayment": "$0", "bestFor": "Refinancing", "pros": ["Refinance specialist", "Rate match", "Fast"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "OpenRoad Lending", "tagline": "Subprime refinance lender", "approvalRate": "85%", "minCreditScore": "500+", "minIncome": "$1,800/mo", "downPayment": "$0", "bestFor": "Refinancing", "pros": ["Subprime refi", "Online process", "Fast decisions"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "RateGenius", "tagline": "Multi-lender refinance marketplace", "approvalRate": "83%", "minCreditScore": "500+", "minIncome": "$2,000/mo", "downPayment": "$0", "bestFor": "Rate shopping", "pros": ["Multiple refi offers", "No application fee", "Fast"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "Capital One Auto Navigator", "tagline": "Bank-backed refinance program", "approvalRate": "80%", "minCreditScore": "500+", "minIncome": "$1,800/mo", "downPayment": "$0", "bestFor": "Trusted brand", "pros": ["Trusted brand", "Large network", "Soft pull"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestRefinanceBadCredit() {
  return (
    <BestOfPageTemplate
      seoTitle="Best Auto Refinance Loans for Bad Credit (2026) — Reviewed & Ranked"
      seoDescription="Find the best auto refinance options for bad credit in 2026. Lower your monthly payment or interest rate even with a score under 600."
      canonicalPath="/best-auto-refinance-bad-credit"
      title="Best Auto Refinance Loans for Bad Credit (2026)"
      subtitle="Already have a high-rate car loan? These lenders can refinance it — even with bad credit."
      intro="If you got a car loan at a high rate due to bad credit, refinancing after 12–18 months of on-time payments can save you hundreds per year. These lenders specialize in refinancing subprime borrowers."
      lenders={lenders}
      realStories={[{"name": "Carlos M.", "city": "Houston, TX", "creditScore": "561", "vehicle": "2018 Chevy Silverado", "downPayment": "N/A (refi)", "quote": "Got my original loan at 24% APR. After 14 months of on-time payments, refinanced at 14% APR. Saving $112/month. Wish I'd done it sooner."}]}
      faqs={[{"question": "How soon can I refinance after getting a car loan?", "answer": "Most lenders require 6–12 months of payment history before refinancing. The sweet spot is 12–18 months, when your payment history is strong enough to unlock better rates."}, {"question": "How much can I save by refinancing?", "answer": "The average bad credit borrower who refinances after 12 months saves $87/month. Over the remaining loan term, that's often $2,000–$4,000 in total savings."}]}
      relatedPages={[{"label": "Best Pre-Approved Car Loans", "href": "/best-pre-approved-car-loans-bad-credit"}, {"label": "Best Bad Credit Auto Loans", "href": "/best-bad-credit-auto-loans"}]}
      keyTakeaways={["Refinancing after 12–18 months of on-time payments can save $87+/month on average", "Your credit score improves significantly after 12 months of on-time payments", "The best time to refinance is when your score has improved 50+ points", "Soft credit checks let you shop rates without hurting your score"]}
    />
  );
}
