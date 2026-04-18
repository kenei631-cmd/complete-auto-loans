import BestOfPageTemplate from "../components/BestOfPageTemplate";
import type { Lender } from "../components/LenderCard";

const lenders: Lender[] = [{"rank": 1, "name": "Complete Auto Loans", "tagline": "Our top-rated network for bad credit borrowers", "approvalRate": "98%", "minCreditScore": "Any Score", "minIncome": "$1,200/mo", "downPayment": "$0–$500", "bestFor": "Online pre-approval", "pros": ["Pre-approval in 2 minutes", "Soft credit check only", "Real offers, not estimates", "Use at any dealer in our network"], "featured": true, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 2, "name": "Capital One Auto Navigator", "tagline": "Bank-backed pre-approval tool", "approvalRate": "87%", "minCreditScore": "500+", "minIncome": "$1,800/mo", "downPayment": "$0", "bestFor": "Pre-approval", "pros": ["Pre-qualify without hard pull", "See real rates", "Large dealer network"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 3, "name": "MyAutoloan", "tagline": "Multi-lender pre-approval marketplace", "approvalRate": "85%", "minCreditScore": "575+", "minIncome": "$1,800/mo", "downPayment": "$0", "bestFor": "Rate shopping", "pros": ["Multiple offers at once", "No application fee", "Fast process"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 4, "name": "LendingClub Auto", "tagline": "Peer-to-peer pre-approval lender", "approvalRate": "82%", "minCreditScore": "600+", "minIncome": "$2,000/mo", "downPayment": "$0", "bestFor": "Fair credit", "pros": ["Competitive rates", "Soft pull pre-approval", "Online process"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}, {"rank": 5, "name": "RefiJet", "tagline": "Pre-approval and refinance specialist", "approvalRate": "80%", "minCreditScore": "550+", "minIncome": "$1,800/mo", "downPayment": "$0", "bestFor": "Refinancing", "pros": ["Pre-approval and refi", "Rate match guarantee", "Fast decisions"], "featured": false, "ctaHref": "/apply", "ctaLabel": "Get Pre-Approved →"}];

export default function BestPreApproved() {
  return (
    <BestOfPageTemplate
      seoTitle="Best Pre-Approved Car Loans for Bad Credit (2026) — Reviewed"
      seoDescription="Get pre-approved for a car loan with bad credit in 2026. Compare lenders offering soft-pull pre-approval with no impact to your credit score."
      canonicalPath="/best-pre-approved-car-loans-bad-credit"
      title="Best Pre-Approved Car Loans for Bad Credit (2026)"
      subtitle="Get pre-approved before you visit a dealership. Know your budget, your rate, and your power before you walk in the door."
      intro="Pre-approval gives you the power of a cash buyer at the dealership. Even with bad credit, getting pre-approved online before visiting a dealer protects you from dealer markups and high-pressure financing tactics."
      lenders={lenders}
      realStories={[{"name": "Patricia H.", "city": "Indianapolis, IN", "creditScore": "541", "vehicle": "2020 Kia Sorento", "downPayment": "$0 down", "quote": "Got pre-approved before I went to the dealer. Walked in knowing my rate and my budget. The dealer tried to offer me a higher rate and I just showed them my pre-approval. Done."}]}
      faqs={[{"question": "Does pre-approval guarantee I'll get the loan?", "answer": "Pre-approval is a strong indicator but not a guarantee. The final approval depends on the specific vehicle you choose and a full credit review. However, pre-approvals from our network are honored 94% of the time."}, {"question": "How long is a pre-approval valid?", "answer": "Most pre-approvals are valid for 30–60 days. Use it within that window to avoid having to reapply."}]}
      relatedPages={[{"label": "Best Bad Credit Auto Loans", "href": "/best-bad-credit-auto-loans"}, {"label": "Best Auto Refinance Bad Credit", "href": "/best-auto-refinance-bad-credit"}]}
      keyTakeaways={["Pre-approval protects you from dealer financing markups", "Soft credit checks during pre-approval won't hurt your score", "Pre-approvals are typically valid for 30–60 days", "Having a pre-approval gives you negotiating power at the dealership"]}
    />
  );
}
