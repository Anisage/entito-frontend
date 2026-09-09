import LegalLayout from "./LegalLayout";

const Terms = () => (
  <LegalLayout
    breadcrumb="Terms"
    title="Terms of service"
    subtitle="The agreement between you and BR.F when you browse, shop, or use any feature of our site. By using BR.F, you agree to these terms."
    lastUpdated="May 2026"
    sections={[
      {
        heading: "Using the site",
        body: [
          "You may use BR.F if you are 18 or older, or with the consent of a parent or guardian if you are between 13 and 18. We do not knowingly serve under-13s.",
          "Don't try to interfere with the site (scraping, spamming, probing for vulnerabilities). If you find a security issue, please disclose responsibly to security@br-f.co.ke — we appreciate it.",
        ],
      },
      {
        heading: "Account",
        body:
          "You're responsible for keeping your account credentials secure. If you suspect unauthorised access, change your password and let us know. We may suspend accounts that violate these terms or the law.",
      },
      {
        heading: "Orders and payment",
        body: [
          "All prices are listed in Kenyan Shillings (KSh) and include VAT where applicable. Delivery fees are calculated and displayed at checkout.",
          "Once we accept your order (you'll receive a confirmation email/SMS), a contract is formed. We may decline orders for any lawful reason, including stock issues or suspected fraud.",
          "Payment is processed by Safaricom (M-Pesa), our card processor, or via cash on delivery where available. Until payment clears we may delay dispatch.",
        ],
      },
      {
        heading: "Try-on and visual search",
        body: [
          "Our AI try-on tools are provided 'as is' — they're a guide, not a guarantee. Final colour, fit, and feel may differ in person.",
          "Photos you upload to try-on are processed on our servers and deleted immediately after rendering unless you save them to your gallery. See our Privacy policy for details.",
        ],
      },
      {
        heading: "Returns and refunds",
        body:
          "Our returns policy is set out in full on the Returns page and forms part of these terms. You retain your statutory rights under Kenyan consumer law in addition to our policy.",
      },
      {
        heading: "Intellectual property",
        body:
          "All site content (logos, photography, copy, code) is owned by BR.F or licensed to us. You may use it for personal browsing only — not for resale, republication, or training of AI models without our written permission.",
      },
      {
        heading: "Liability",
        body:
          "We work hard to keep BR.F running smoothly and accurately, but we cannot guarantee uninterrupted service or error-free content. To the extent permitted by law, our liability is limited to the value of your order. We do not exclude liability for death or personal injury caused by our negligence.",
      },
      {
        heading: "Governing law",
        body:
          "These terms are governed by the laws of Kenya. Any dispute will be resolved in the courts of Nairobi. Before going to court, please contact us — we'd much rather sort it out directly.",
      },
      {
        heading: "Changes",
        body:
          "We may update these terms from time to time. We'll post the new version with a fresh 'last updated' date and, for material changes, email you in advance.",
      },
    ]}
  />
);

export default Terms;
