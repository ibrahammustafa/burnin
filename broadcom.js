/* Broadcom pack: original practice questions. Not affiliated with Broadcom. Paid drills load after sign-in. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Broadcom",
  slug: "broadcom",
  blurb: "Silicon validation for Ethernet switches, AI networking and Wi-Fi chips.",
  values: [
    ["Engineering rigor", "Prove it with measurements."],
    ["Customer impact", "Partners build products on your silicon."],
    ["Ownership", "Stay with an issue until it is closed."],
    ["Efficiency", "Automate what you repeat."],
    ["Clear communication", "Share evidence a partner can act on."]
  ],
  roles: [
    {
      id: "broadcom-switch-validation",
      title: "Ethernet Switch Validation Engineer",
      family: "Hardware validation",
      level: "Mid",
      fit: 82,
      posting: "https://www.broadcom.com/company/careers",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Validate high-bandwidth switch silicon and AI fabrics: SerDes, FEC, buffers, ECMP, PFC and RoCE traffic with traffic generators and Python.",
      topics: ["Silicon validation", "AI networking", "SerDes", "Automation"],
      yourEdge: ["Traffic testing you ran with real numbers.", "A link or congestion issue you debugged.", "Python you wrote to automate validation."],
      mc: [
        { topic: "SerDes", q: "PAM4 carries how many bits per symbol?", o: ["1", "2", "4", "8"], a: 1, why: "Four voltage levels encode two bits per symbol." },
        { topic: "SerDes", q: "Why do high-speed PAM4 links rely on forward error correction?", o: ["To make cables shorter", "Smaller signal margins mean more raw bit errors to correct", "To add encryption", "To reduce port count"], a: 1, why: "FEC corrects raw errors that are expected at these speeds." },
        { topic: "AI networking", q: "RoCEv2 runs over:", o: ["UDP/IP", "TCP only", "USB", "Fibre Channel"], a: 0, why: "RoCEv2 carries RDMA over UDP/IP, using destination port 4791." },
        { topic: "AI networking", q: "Priority Flow Control (802.1Qbb) is used to:", o: ["Pause traffic per priority to avoid drops", "Assign VLANs", "Encrypt frames", "Update switch firmware"], a: 0, why: "PFC helps create lossless classes for traffic such as RoCE." },
        { topic: "AI networking", q: "ECMP spreads traffic by:", o: ["Sending flows across several equal-cost paths", "Copying each packet to all ports", "Slowing all links equally", "Using one backup path only"], a: 0, why: "A hash usually selects the path. Poor hashing can overload some links." },
        { topic: "Silicon validation", q: "Tomahawk is best known as:", o: ["A Broadcom Ethernet switch chip family", "A Wi-Fi security protocol", "A Linux distribution", "A server rack brand"], a: 0, why: "Tomahawk is Broadcom's high-bandwidth data center switch silicon line." }
      ],
      tech: [{ topic: "Silicon validation" }, { topic: "AI networking" }, { topic: "SerDes" }],
      behavioral: [{}]
    },
    {
      id: "broadcom-wifi-test",
      title: "Wi-Fi Chipset Test Engineer",
      family: "Wireless test",
      level: "Mid",
      fit: 91,
      posting: "https://www.broadcom.com/company/careers",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Test Wi-Fi 6E and Wi-Fi 7 silicon: RF measurements, rate versus range, interop, Bluetooth coexistence and automated regressions.",
      topics: ["802.11", "RF test", "Performance", "Coexistence"],
      yourEdge: ["An RF or throughput test you designed.", "An interop issue you debugged from captures.", "Automation you built around iPerf or instruments."],
      mc: [
        { topic: "802.11", q: "Which is a headline feature of Wi-Fi 7 (802.11be)?", o: ["Multi-Link Operation", "WEP encryption", "2 Mbps maximum rate", "Removal of 5 GHz"], a: 0, why: "MLO lets a device use multiple links at once. Wi-Fi 7 also adds 320 MHz channels and 4096-QAM." },
        { topic: "802.11", q: "OFDMA helps by:", o: ["Serving several clients at once on parts of a channel", "Removing the need for an access point", "Increasing antenna size", "Disabling encryption"], a: 0, why: "Resource units divide a channel between clients." },
        { topic: "RF test", q: "EVM measures:", o: ["How far transmitted symbols are from their ideal positions", "Battery life", "Number of connected clients", "Cable length"], a: 0, why: "Error Vector Magnitude reflects modulation quality." },
        { topic: "RF test", q: "Conducted testing is usually preferred for repeatable RF numbers because:", o: ["It looks better", "A cable removes much of the over-the-air variation", "It requires no instruments", "It tests antennas best"], a: 1, why: "It reduces reflections and interference, though antenna behavior needs radiated tests." },
        { topic: "Performance", q: "A rate-versus-range test commonly uses:", o: ["Programmable attenuators in a shielded setup", "A longer office hallway only", "A ping to a website", "A BIOS update"], a: 0, why: "Attenuation steps simulate distance in a repeatable way." },
        { topic: "Coexistence", q: "Wi-Fi and Bluetooth most directly share spectrum in:", o: ["2.4 GHz", "5 GHz", "6 GHz", "60 GHz"], a: 0, why: "Both use 2.4 GHz, so chips need coexistence arbitration." }
      ],
      tech: [{ topic: "RF test" }, { topic: "Performance" }, { topic: "Coexistence" }],
      behavioral: [{}]
    }
  ]
});
