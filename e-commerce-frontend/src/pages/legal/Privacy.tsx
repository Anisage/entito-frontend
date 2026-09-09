import LegalLayout from "./LegalLayout";

const Privacy = () => (
  <LegalLayout
    breadcrumb="Privacy"
    title="Privacy policy"
    subtitle="How we collect, use, and protect your information when you use BR.F. Written in plain English — and compliant with Kenya's Data Protection Act, 2019."
    lastUpdated="May 2026"
    sections={[
      {
        heading: "Who we are",
        body: [
          "BR.F is operated by BR.F Limited, a company registered in Kenya (registration number TBA). Our registered office is at The Mall, Westlands, Nairobi.",
          "For the purposes of the Data Protection Act, 2019, we are the data controller of personal information you provide to us.",
        ],
      },
      {
        heading: "What we collect",
        body: [
          "Account information — name, email, phone number, and a password hash.",
          "Order and delivery information — items purchased, delivery address, and M-Pesa transaction references provided by Safaricom (we never see your PIN).",
          "Try-on inputs — photos you upload for our visual search and AI try-on features. These are processed in-memory and deleted immediately after rendering, unless you explicitly save a look to your gallery.",
          "Device and analytics — IP address, browser type, and basic event data, used solely to keep the site working and to spot abuse.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To fulfil your orders and provide customer support.",
          "To improve our products and service — including aggregated and de-identified analytics on what people browse, try on, and buy.",
          "To communicate with you about orders, returns, and (only with your consent) marketing.",
          "We do not sell your personal information to anyone, and we do not allow advertising platforms to fingerprint you on our site.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under the Data Protection Act, you have the right to access, correct, or delete your personal information; to object to processing; and to lodge a complaint with the Office of the Data Protection Commissioner (ODPC).",
          "To exercise any of these rights, email privacy@br-f.co.ke. We respond within 14 days.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Order data — six years after the order, to comply with Kenyan tax and consumer-law requirements.",
          "Account data — for as long as your account is active; we delete or anonymise within 90 days of account closure.",
          "Try-on images — held in volatile memory for the duration of the request only. Saved looks are stored until you delete them.",
        ],
      },
      {
        heading: "Security",
        body:
          "We protect your data with TLS in transit, encryption at rest, role-based access controls, and routine penetration testing. Payment details are handled by Safaricom (M-Pesa) and our card processor — they never touch our servers.",
      },
      {
        heading: "Contact",
        body: "Questions about this policy? Email privacy@br-f.co.ke. We're a small team — you'll get a real person.",
      },
    ]}
  />
);

export default Privacy;
