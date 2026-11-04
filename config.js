/* Site settings. This is the only file you need to edit to launch. */
window.BURNIN_CONFIG = {
  brand: "BurnIn",
  tagline: "Interview prep for hardware, lab and data center roles at the companies building AI.",

  /* Owner mode unlocks every track on this device so you can study for free.
     Set to false before you launch so visitors see the free / Pro split. */
  ownerMode: false,

  /* Free trial on Pro (days). Card is collected up front by Stripe; charged on day 8.
     Set the same number on your Stripe Payment Links ("Include a free trial"). */
  trialDays: 7,

  /* GoatCounter site code for visitor stats (e.g. "burnin" for burnin.goatcounter.com).
     Leave "" to turn analytics off. */
  goatcounter: "",

  /* Free plan: diagnostics for every role + full access to this many role tracks. */
  freeFullTracks: 1,

  /* Supabase: public project URL and public anon key. Safe in the browser; row-level security protects the data. */
  supabaseUrl: "https://uabjuccatxluvbhwpati.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYmp1Y2NhdHhsdXZiaHdwYXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3NTU5NzgsImV4cCI6MjEwOTMzMTk3OH0.SJvxBjPRRWixKdF_kixp0nws00UdUt1vHrFLYH80p0E",

  /* Sandbox checkout, used only when the site is opened with ?stripe=test. Delete before launch. */
  testCheckout: {
    proMonthly: "https://buy.stripe.com/test_eVqeVeb7c0xb3uCcxG6c000",
    proYearly: "https://buy.stripe.com/test_aFa7sM4IO3Jnc189lu6c001",
    sprint: "https://buy.stripe.com/test_28E7sM0sy3Jn3uCbtC6c002"
  },

  /* Where customers cancel or change a subscription. */
  manageUrl: "https://app.link.com",

  /* Stripe Payment Links. Create them at dashboard.stripe.com → Payment Links,
     paste each URL here. Leave "" to show the "checkout not connected" notice. */
  checkout: {
    proMonthly: "",
    proYearly: "",
    sprint: ""
  },

  prices: {
    proMonthly: 19,
    proYearly: 149,
    sprint: 39
  },

  /* Companies shown in the catalog that don't have packs yet (waitlist). */
  comingSoon: [
    { company: "AWS", roles: ["Data Center Engineer", "Infrastructure Ops"] },
    { company: "Microsoft", roles: ["Datacenter Technician", "Hardware Engineer"] },
    { company: "Tesla", roles: ["Validation Engineer", "Test Automation"] }
  ],

  /* Waitlist form. Paste a Formspree (or similar) endpoint to collect real emails,
     e.g. "https://formspree.io/f/abcdwxyz". Leave "" until you have one. */
  waitlistEndpoint: "",

  contactEmail: "abeem48@gmail.com"
};
