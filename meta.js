/* Meta pack: original practice questions. Not affiliated with Meta. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Meta",
  slug: "meta",
  blurb: "Data center operations and network engineering for one of the largest server fleets.",
  values: [
    ["Move fast", "Show speed with judgment."],
    ["Long-term impact", "Fixes that scale across the fleet, not one-offs."],
    ["Be direct", "Clear, respectful disagreement."],
    ["Ownership", "You saw a problem and took it on."],
    ["Data", "Back claims with numbers."]
  ],
  roles: [
    {
      id: "meta-dc-ops",
      title: "Data Center Operations Engineer",
      family: "Data center ops",
      level: "Mid",
      fit: 90,
      posting: "https://www.metacareers.com/jobs?q=data%20center",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Keep a hyperscale fleet healthy: repairs at scale, automation of break-fix workflows, OCP hardware, power and cooling efficiency.",
      topics: ["Fleet repair", "Hardware", "Efficiency", "Automation"],
      yourEdge: ["A repair workflow you sped up.", "Automation that handled a repetitive task across many machines.", "A metric you improved with numbers."],
      mc: [
        { topic: "Hardware", q: "The Open Compute Project (OCP) was started by which company in 2011?", o: ["Meta (then Facebook)", "IBM", "Dell", "Intel"], a: 0, why: "OCP shares open hardware designs for servers, racks and data centers." },
        { topic: "Efficiency", q: "PUE (power usage effectiveness) is:", o: ["IT power ÷ total power", "Total facility power ÷ IT equipment power", "Servers per rack", "Cooling cost"], a: 1, why: "1.0 is perfect; lower is more efficient." },
        { topic: "Fleet repair", q: "At fleet scale, the most effective way to cut repair time is usually:", o: ["Hire faster techs", "Automate detection, diagnosis and ticket creation so techs arrive with the right part", "Repair only weekly", "Skip diagnostics"], a: 1, why: "Most time is lost before the repair: finding the fault and getting parts." },
        { topic: "Hardware", q: "A server reports a failing drive. With RAID or replicated storage, the right first step is:", o: ["Pull it immediately", "Confirm the data is redundant elsewhere, then replace per procedure", "Reboot the server", "Ignore it"], a: 1, why: "Know the redundancy state before touching disks." },
        { topic: "Fleet repair", q: "MTTR measures:", o: ["Mean time to repair", "Max traffic to router", "Monthly test rate", "Memory test result"], a: 0, why: "Lower MTTR means capacity comes back faster." },
        { topic: "Efficiency", q: "Raising the cold-aisle supply temperature within equipment specs mainly:", o: ["Breaks servers", "Saves cooling energy", "Increases noise", "Reduces network speed"], a: 1, why: "Hyperscalers run warmer to cut chiller energy, within vendor limits." }
      ],
      tech: [
        { topic: "Automation", q: "Design an automated break-fix workflow for 100,000 servers.", probe: "Scale thinking.",
          points: ["Health signals: hardware logs, BMC events, application errors", "Auto-diagnose to a part-level fault", "Drain the server automatically", "Create a ticket with the part, location and evidence", "Parts reserved in inventory", "Tech repairs; automated validation returns it to service", "Metrics: MTTR, repeat failures"],
          answer: "Signals flow in from hardware logs, BMC events and the application layer. Automation maps them to a likely part, drains the server so jobs move away, and opens a ticket with the part, rack location and evidence, with the spare already reserved. The tech repairs it, then automated tests validate it before it rejoins the pool. I'd watch MTTR and repeat-failure rates to find bad diagnoses.",
          follow: ["The same server keeps coming back with the same fault. What's wrong?"] },
        { topic: "Fleet repair", q: "A whole row loses cooling. What do you do?", probe: "Incident priorities.",
          points: ["Safety first", "Alert facilities and incident channel", "Reduce heat: shift or throttle workloads", "Monitor inlet temps", "Restore cooling; bring load back gradually", "Postmortem"],
          answer: "Safety first, then raise it in the incident channel and with facilities right away. While cooling is down, reduce heat by shifting or throttling workloads in that row and watch inlet temperatures closely. Once cooling is restored, bring load back gradually and run a postmortem.",
          follow: ["Who decides which workloads move?"] },
        { topic: "Hardware", q: "How do you decide whether a recurring failure is a bad part batch or a design issue?", probe: "Data analysis.",
          points: ["Group failures by part number, lot, vendor, date code", "Compare against the installed base", "Look for environment correlation: rack position, temperature", "Engage vendor with data"],
          answer: "Group the failures by part number, lot and date code, and compare each against how many are installed. If one lot fails at 5x the rate, it's the batch. If it's spread evenly but correlates with temperature or rack position, it's more likely design or environment. Either way the vendor gets the data.",
          follow: ["How many failures do you need before calling it a trend?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you moved fast and something broke.", story: "Speed vs quality trade-off you owned.", star: ["Decision", "What broke", "How you fixed it", "What you'd do differently"] }
      ]
    },
    {
      id: "meta-dc-network",
      title: "Data Center Network Engineer",
      family: "Networking",
      level: "Mid to senior",
      fit: 68,
      posting: "https://www.metacareers.com/jobs?q=network%20engineer",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Design and operate data center fabrics: Clos topologies, BGP, ECMP, automation and troubleshooting at scale.",
      topics: ["Fabric design", "Routing", "Troubleshooting", "Automation"],
      yourEdge: ["A network you built or cut over.", "A routing problem you debugged.", "Config automation you wrote."],
      mc: [
        { topic: "Fabric design", q: "A leaf-spine (Clos) fabric gives:", o: ["One big switch", "Predictable hop count and many equal-cost paths between any two leaves", "Spanning tree everywhere", "Fewer cables than a ring"], a: 1, why: "Every leaf connects to every spine, so traffic spreads across paths." },
        { topic: "Routing", q: "ECMP lets a router:", o: ["Encrypt packets", "Spread flows across multiple equal-cost next hops", "Drop duplicates", "Compress routes"], a: 1, why: "Usually hashed per flow so packets in one flow stay in order." },
        { topic: "Routing", q: "Why do many large data center fabrics run BGP even inside the building?", o: ["It's required by law", "It scales well, is simple to operate per link, and gives fine policy control", "OSPF doesn't work on Ethernet", "BGP is faster to type"], a: 1, why: "RFC 7938 describes BGP as the routing protocol for large-scale data centers." },
        { topic: "Troubleshooting", q: "Which protocol lets a switch learn what device is on the other end of a cable?", o: ["LLDP", "NTP", "SNMP traps", "DHCP"], a: 0, why: "LLDP neighbor data is great for verifying cabling against the plan." },
        { topic: "Troubleshooting", q: "Packet loss happens only for some flows between two racks. A likely cause?", o: ["One bad link or optic in an ECMP group; only flows hashed to it suffer", "DNS", "The whole fabric is down", "Wrong time zone"], a: 0, why: "Partial loss is the signature of one bad path among many." },
        { topic: "Fabric design", q: "Anycast means:", o: ["Broadcasting to all", "The same IP is announced from several places; routing sends users to the nearest", "Multicast video", "Static routes only"], a: 1, why: "Common for DNS and load balancer VIPs." }
      ],
      tech: [
        { topic: "Troubleshooting", q: "Some users see slow transfers between two clusters. Find it.", probe: "Path-level debugging.",
          points: ["Confirm it's specific flows, not all", "Check interface errors and drops on every hop", "Look for one bad member in ECMP or LAG groups", "Optics: power levels, errors", "Drain the suspect link and confirm"],
          answer: "First confirm it's some flows, not all, because that points at one bad path among many. Then check every hop for interface errors, discards and optic receive power, and look for one bad member in the ECMP or LAG group. Draining that link should fix it instantly, which confirms the diagnosis before the hardware gets replaced.",
          follow: ["How would you find this automatically before users notice?"] },
        { topic: "Automation", q: "How do you safely push a config change to 5,000 switches?", probe: "Change safety.",
          points: ["Template from source of truth", "Review and test in a lab", "Canary a few devices", "Staged rollout with health checks", "Automatic rollback on failure", "Audit trail"],
          answer: "Generate configs from a source of truth, review and test in a lab, then canary on a few devices with health checks before rolling out in stages. Any failed check triggers automatic rollback, and every change is logged.",
          follow: ["The canary passes but wave 3 breaks. Why might that happen?"] },
        { topic: "Fabric design", q: "Design a small leaf-spine fabric for 20 racks.", probe: "Basic design reasoning.",
          points: ["Leaf per rack (or pair)", "2 to 4 spines depending on bandwidth", "Every leaf to every spine", "eBGP per link, ECMP", "Oversubscription target", "Out-of-band management network"],
          answer: "One leaf per rack, or a pair for redundancy, with every leaf connected to each of 2 to 4 spines depending on bandwidth needs. Run eBGP on each link with ECMP across spines. I'd pick an oversubscription ratio based on traffic patterns and keep a separate out-of-band management network so I can reach everything when the fabric has problems.",
          follow: ["When would you add a third tier?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you disagreed directly with someone senior.", story: "A respectful pushback with data.", star: ["Disagreement", "How you raised it", "Outcome", "Relationship after"] }
      ]
    }
  ]
});
