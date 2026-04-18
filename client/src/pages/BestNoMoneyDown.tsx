import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "$0 down approvals", "pros": ["$0 down options available", "Income-based approval", "All credit types welcome", "Fast same-day decisions"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "Auto Credit Express", "tagline": "Subprime specialist with $0 down programs", "approvalRate": "92%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$0", "bestFor": "No down payment", "pros": ["Dedicated $0 down program", "Large lender network", "Fast approval"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "Carvana", "tagline": "Online dealer with $0 down financing", "approvalRate": "88%", "minCreditScore": "450+", "minIncome": "$4,000/mo", "downPayment": "$0", "bestFor": "Online buyers", "pros": ["No dealership visit needed", "7-day return", "$0 down available"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "CarMax Auto Finance", "tagline": "Large dealer with flexible terms", "approvalRate": "85%", "minCreditScore": "500+", "minIncome": "$2,000/mo", "downPayment": "$0", "bestFor": "Used car buyers", "pros": ["Large inventory", "No-haggle pricing", "$0 down options"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "RoadLoans", "tagline": "Santander-backed subprime lender", "approvalRate": "82%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$0", "bestFor": "Deep subprime", "pros": ["Accepts very low scores", "Fast decisions", "National coverage"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestNoMoneyDown() {
  return (
    <BestOfPageTemplate
      seoTitle="Best No Money Down Car Loans for Bad Credit (2026) — Reviewed"
      seoDescription="Compare the best $0 down car loans for bad credit in 2026. Get approved with no down payment even with a low credit score. 500+ lender network."
      canonicalPath="/best-no-money-down-car-loans-bad-credit"
      title="Best No Money Down Car Loans for Bad Credit (2026)"
      subtitle="You don't always need a down payment to get approved. Here are the lenders most likely to approve you with $0 down."
      intro="No money down auto loans are possible even with bad credit, but they require the right lender. These lenders prioritize income and employment stability over credit scores and down payments."
      lenders={lenders}
      realStories={[{"name": "James W.", "city": "Columbus, OH", "creditScore": "521", "vehicle": "2018 Toyota Camry", "downPayment": "$0 down", "quote": "Lost my savings in a medical emergency. Couldn't put anything down. Complete Auto Loans found me a $0 down option with a payment I could afford."}, {"name": "Angela M.", "city": "Charlotte, NC", "creditScore": "487", "vehicle": "2019 Honda CR-V", "downPayment": "$0 down", "quote": "Didn't have $500 to spare. Got approved with $0 down and a steady job. Payment is $289/month."}]}
      faqs={[{"question": "Can I really get a car loan with no money down and bad credit?", "answer": "Yes, but it's harder. Lenders compensate for the higher risk with higher interest rates. You'll need steady income — typically $1,500+/month — and a stable employment history."}, {"question": "How much higher is the rate with no down payment?", "answer": "Expect rates 3–7 percentage points higher than with a down payment. On a $10,000 loan, that's roughly $20–$40 more per month."}]}
      relatedPages={[{"label": "Best Bad Credit Auto Loans", "href": "/best-bad-credit-auto-loans"}, {"label": "Best Guaranteed Approval Auto Loans", "href": "/best-guaranteed-approval-auto-loans"}]}
      keyTakeaways={["$0 down is possible with bad credit if you have steady income", "Expect rates 3–7% higher than with a down payment", "Income of $1,500+/month significantly improves approval odds", "Even $200–$300 down can unlock better rates"]}
    />
  );
}
