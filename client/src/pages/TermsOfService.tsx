/**
 * Terms of Service — Complete Auto Loans
 * Design: Premium Editorial Finance
 */
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema } from "@/lib/schema";

export default function TermsOfService() {
  useSEO({
    title: "Terms of Service | Complete Auto Loans",
    description: "Read the Complete Auto Loans terms of service. Understand your rights and responsibilities when using our auto loan matching and comparison service.",
    canonical: "/terms-of-service",
    noIndex: true,
    schema: [
      buildWebPageSchema({
        title: "Terms of Service | Complete Auto Loans",
        description: "Complete Auto Loans terms of service — your rights and responsibilities when using our service.",
        url: "/terms-of-service",
      }),
    ],
  });

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using the Complete Auto Loans website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the service constitutes acceptance of any changes.`,
    },
    {
      title: "2. Description of Service",
      content: `Complete Auto Loans is a lead generation and auto loan comparison service. We connect consumers seeking auto financing with a network of lenders, dealers, and financial institutions. We are not a lender, bank, or financial institution, and we do not make credit decisions. Any loan offers you receive are from third-party lenders, not from Complete Auto Loans.`,
    },
    {
      title: "3. No Guarantee of Approval",
      content: `Submitting an application through Complete Auto Loans does not guarantee that you will receive a loan offer or be approved for financing. Approval decisions are made solely by the lenders in our network based on their own underwriting criteria. Rates, terms, loan amounts, and approval are subject to lender review and may vary based on your creditworthiness, income, and other factors.`,
    },
    {
      title: "4. Consent to Contact",
      content: `By submitting your information through our website, you expressly consent to be contacted by Complete Auto Loans and its network partners via telephone, email, text message (SMS), and other electronic means regarding auto loan offers and related services. You may receive calls from automated dialing systems. Standard message and data rates may apply. You may opt out of communications at any time by contacting us.`,
    },
    {
      title: "5. Accuracy of Information",
      content: `You agree to provide accurate, current, and complete information when submitting an application. Providing false or misleading information may result in denial of service and could constitute fraud. You are responsible for maintaining the accuracy of any information you provide.`,
    },
    {
      title: "6. Intellectual Property",
      content: `All content on the Complete Auto Loans website, including text, graphics, logos, images, and software, is the property of Complete Auto Loans or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
    },
    {
      title: "7. Disclaimer of Warranties",
      content: `The Complete Auto Loans service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components. The information on this site is for general informational purposes only and should not be construed as financial advice.`,
    },
    {
      title: "8. Limitation of Liability",
      content: `To the maximum extent permitted by law, Complete Auto Loans shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our service or any loan products obtained through our network. Our total liability to you for any claims arising from these terms shall not exceed the amount you paid us, if any, in the twelve months preceding the claim.`,
    },
    {
      title: "9. Governing Law",
      content: `These Terms of Service shall be governed by and construed in accordance with the laws of the United States. Any disputes arising under these terms shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules, except that either party may seek injunctive relief in a court of competent jurisdiction.`,
    },
    {
      title: "10. Contact Information",
      content: `If you have questions about these Terms of Service, please contact us at: legal@completeautoloans.com. Complete Auto Loans, United States.`,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div style={{ background: "oklch(0.311 0.065 251)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container py-12">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.4)" }} className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Terms of Service</span>
          </div>
          <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2 }}>
            Terms of Service
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
            Last Updated: April 18, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-14">
        <div style={{ maxWidth: "760px" }}>
          <p className="mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.38 0.04 251)", fontSize: "0.95rem", lineHeight: 1.75 }}>
            These Terms of Service ("Terms") govern your use of the Complete Auto Loans website and services. Please read these Terms carefully before using our service. By using our service, you agree to be bound by these Terms.
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 700, color: "oklch(0.18 0.04 251)", marginBottom: "0.75rem" }}>
                  {section.title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.38 0.04 251)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-5 rounded-xl" style={{ background: "oklch(0.97 0.003 80)", border: "1px solid oklch(0.90 0.006 80)" }}>
            <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.50 0.04 251)", lineHeight: 1.65 }}>
              <strong>Important Notice:</strong> Complete Auto Loans is a lead generation and comparison service, not a lender or financial institution. We do not provide financial advice. Consult a qualified financial advisor before making any borrowing decisions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
