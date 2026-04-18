/**
 * Privacy Policy — Complete Auto Loans
 * Design: Premium Editorial Finance
 */
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { buildWebPageSchema } from "@/lib/schema";

export default function PrivacyPolicy() {
  useSEO({
    title: "Privacy Policy | Complete Auto Loans",
    description: "Read the Complete Auto Loans privacy policy. Learn how we collect, use, and protect your personal information when you apply for auto loan matching.",
    canonical: "/privacy-policy",
    noIndex: true,
    schema: [
      buildWebPageSchema({
        title: "Privacy Policy | Complete Auto Loans",
        description: "Complete Auto Loans privacy policy — how we collect, use, and protect your personal information.",
        url: "/privacy-policy",
      }),
    ],
  });

  const sections = [
    {
      title: "1. Information We Collect",
      content: `When you submit an application through Complete Auto Loans, we collect personal information you voluntarily provide, including your name, email address, phone number, ZIP code, vehicle preferences, and self-reported credit information. We may also collect technical information such as your IP address, browser type, and pages visited through cookies and similar tracking technologies.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information you provide to match you with auto lenders in our network who may be able to offer you financing. Your information may be shared with one or more lenders, dealers, or lead buyers who will contact you regarding auto loan offers. We may also use your information to improve our services, send you relevant communications, and comply with legal obligations.`,
    },
    {
      title: "3. Sharing Your Information",
      content: `Complete Auto Loans is a lead generation service. By submitting your application, you expressly consent to having your information shared with our network of lenders, dealers, and marketing partners. We do not sell your personal information to third parties for their own unrelated marketing purposes. We may share your information with service providers who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential.`,
    },
    {
      title: "4. Cookies and Tracking Technologies",
      content: `We use cookies, web beacons, and similar technologies to enhance your experience on our site, analyze site traffic, and serve relevant advertising. You may disable cookies through your browser settings; however, doing so may affect the functionality of our website. We use Google Analytics and other third-party analytics services to understand how visitors use our site.`,
    },
    {
      title: "5. Data Security",
      content: `We implement industry-standard security measures, including 256-bit SSL encryption, to protect your personal information during transmission. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee the absolute security of your information.`,
    },
    {
      title: "6. Your Rights and Choices",
      content: `You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, contact us at privacy@completeautoloans.com. California residents may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and the right to opt out of the sale of personal information.`,
    },
    {
      title: "7. Children's Privacy",
      content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately and we will take steps to delete that information.`,
    },
    {
      title: "8. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes your acceptance of the updated policy.`,
    },
    {
      title: "9. Contact Us",
      content: `If you have questions about this Privacy Policy or our data practices, please contact us at: privacy@completeautoloans.com. Complete Auto Loans, United States.`,
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
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Privacy Policy</span>
          </div>
          <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2 }}>
            Privacy Policy
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
            Complete Auto Loans ("we," "us," or "our") operates as a lead generation and auto loan comparison service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit an application.
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
              <strong>Disclaimer:</strong> Complete Auto Loans is a lead generation and comparison service, not a lender or financial institution. We do not make credit decisions or guarantee loan approval. Rates, terms, and approval are determined solely by the lenders in our network.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
