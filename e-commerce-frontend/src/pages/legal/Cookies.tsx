import LegalLayout from "./LegalLayout";

const Cookies = () => (
  <LegalLayout
    breadcrumb="Cookies"
    title="Cookie policy"
    subtitle="What cookies and similar technologies we use on BR.F, and how you can control them. Read alongside our Privacy policy."
    lastUpdated="May 2026"
    sections={[
      {
        heading: "What cookies are",
        body:
          "Cookies are small text files placed on your device when you visit a site. They let us remember your preferences (like which items you've added to your bag), keep you logged in, and understand how the site is used so we can make it better.",
      },
      {
        heading: "What we use",
        body: [
          "Essential cookies — these keep the site working: your session, your cart, CSRF protection. You can't turn these off without breaking the site.",
          "Preference cookies — remember your settings (language, recent searches, last-viewed items) so the site feels personal across visits.",
          "Analytics cookies — give us aggregated, anonymised data on what works and what doesn't. We use a privacy-respecting tool and never share personally identifiable analytics data.",
          "We do not use advertising or third-party tracking cookies.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "On your first visit you'll see a banner letting you accept or reject non-essential cookies. You can change your choice anytime from the cookie settings link in the footer (coming soon).",
          "You can also clear or block cookies from your browser settings. If you do, parts of the site (like your cart) may not work as expected.",
        ],
      },
      {
        heading: "How long they last",
        body:
          "Session cookies expire when you close your browser. Persistent cookies expire automatically — preferences last 12 months, analytics last 13 months at most.",
      },
      {
        heading: "Updates",
        body:
          "We'll update this policy if we change what cookies we use. The 'last updated' date at the top will tell you when.",
      },
    ]}
  />
);

export default Cookies;
