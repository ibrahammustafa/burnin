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
