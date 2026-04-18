import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "Low income borrowers", "pros": ["Programs starting at $1,200/month income", "Payment plans from $150/month", "All income types accepted", "SSI, disability, and gig income OK"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "CarHop", "tagline": "BHPH with low income programs", "approvalRate": "95%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$0", "bestFor": "Low income", "pros": ["$1,200/mo minimum", "Flexible payments", "Credit building"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "JD Byrider", "tagline": "BHPH with flexible income requirements", "approvalRate": "97%", "minCreditScore": "Any", "minIncome": "$1,200/mo", "downPayment": "$500", "bestFor": "Low income", "pros": ["Low income OK", "Nationwide", "In-house"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "Auto Credit Express", "tagline": "Low income subprime network", "approvalRate": "88%", "minCreditScore": "300+", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Low income", "pros": ["Low income specialists", "Multiple lenders", "Fast"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "DriveTime", "tagline": "In-house low income financing", "approvalRate": "94%", "minCreditScore": "Any", "minIncome": "$1,500/mo", "downPayment": "$500", "bestFor": "Low income", "pros": ["Low income OK", "Large inventory", "Online"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestLowIncome() {
  return (
    <BestOfPageTemplate
      seoTitle="Best Car Loans for Low Income Borrowers of 2026 — Reviewed"
      seoDescription="Compare the best car loans for low income borrowers in 2026. Get approved with income as low as $1,200/month. No minimum credit score required."
      canonicalPath="/best-car-loans-low-income"
      title="Best Car Loans for Low Income Buyers (2026)"
      subtitle="Lower income doesn't mean no options. These lenders have programs designed for borrowers earning $1,200-$2,500/month."
      intro="Low income borrowers face a double challenge: bad credit and limited income. The lenders on this list have specifically designed programs for borrowers earning $1,200-$2,500/month, with payment structures that fit tighter budgets."
      lenders={lenders}
      realStories={[{"name": "Sandra L.", "city": "Houston, TX", "creditScore": "No Credit", "vehicle": "2018 Ford Focus", "downPayment": "$300", "quote": "I work part-time and get SSI. My income is only $1,400/month. Complete Auto Loans found me a lender that accepted all my income sources and got me approved."}]}
      faqs={[{"question": "What is the minimum income for a car loan?", "answer": "Most lenders require $1,200-$1,500/month in verifiable income. Some BHPH dealers will work with as little as $1,000/month. All income sources count — job, SSI, disability, child support, gig work."}, {"question": "Can I use SSI or disability income to qualify?", "answer": "Yes. Government benefits including SSI, SSDI, and disability payments all count as verifiable income for auto loan purposes."}]}
      relatedPages={[{"label": "Best Buy Here Pay Here Dealerships", "href": "/best-buy-here-pay-here-dealerships"}, {"label": "Best No Money Down Car Loans", "href": "/best-no-money-down-car-loans"}]}
      keyTakeaways={["SSI, disability, and gig income all count toward the income requirement", "$1,200/month is the typical minimum income threshold", "BHPH dealers have the most flexible income requirements", "Payments as low as $150/month are available on some programs"]}
    />
  );
}
