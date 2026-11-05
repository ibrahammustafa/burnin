/* Cisco pack: original practice questions. Not affiliated with Cisco. Paid drills load after sign-in. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Cisco",
  slug: "cisco",
  blurb: "Hardware validation and network test for switches, routers and data center gear.",
  values: [
    ["Customer focus", "Connect a test result to a network someone depends on."],
    ["Technical depth", "Know the protocol or circuit, not just the test script."],
    ["Teamwork", "Hardware, software and test working from the same evidence."],
    ["Quality", "Show how you prevent escapes, not just find bugs."],
    ["Ownership", "Say what you drove from start to finish."]
  ],
  roles: [
    {
      id: "cisco-edvt",
      title: "Hardware Validation Engineer, EDVT",
      family: "Hardware validation",
      level: "Mid",
      fit: 88,
      posting: "https://jobs.cisco.com/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Validate switches and routers across voltage and temperature: four-corner testing, power, signal integrity, thermal chambers and failure analysis.",
      topics: ["Environmental test", "Power", "Signal integrity", "Failure analysis"],
      yourEdge: ["A chamber or stress test you ran, with the numbers.", "A hardware failure you traced to its cause.", "Automation that made a test repeatable."],
      mc: [
        { topic: "Environmental test", q: "In EDVT, four-corner testing combines:", o: ["Four product colors", "High and low temperature with high and low input voltage", "Four network protocols", "Four test engineers"], a: 1, why: "The corners stress the product at the edges of its operating range." },
        { topic: "Environmental test", q: "HALT is designed to:", o: ["Prove the product meets normal specs only", "Push a design beyond its limits to expose weaknesses early", "Stop production", "Measure network latency"], a: 1, why: "Highly Accelerated Life Testing finds weak points quickly by stepping stress past spec." },
        { topic: "Power", q: "IEEE 802.3bt Type 4 PoE can deliver up to about what power from the switch port?", o: ["15.4 W", "30 W", "60 W", "90 W"], a: 3, why: "Type 4 allows up to 90 W at the switch, with about 71 W available at the device." },
        { topic: "Signal integrity", q: "An eye diagram that is closing suggests:", o: ["Better signal quality", "More noise, jitter or loss on the link", "A faster CPU", "A firmware license problem"], a: 1, why: "A smaller eye means less timing and voltage margin." },
        { topic: "Signal integrity", q: "Bit error rate is:", o: ["Errored bits divided by total bits sent", "Link speed divided by distance", "Packets per second", "Power per port"], a: 0, why: "BER expresses how often bits arrive wrong." },
        { topic: "Failure analysis", q: "A failure follows a board when moved to a new test station. That points to:", o: ["The station", "The board", "The room temperature", "The operator"], a: 1, why: "Swapping isolates the fault: if it follows the board, the station is less likely." }
      ],
      tech: [{ topic: "Environmental test" }, { topic: "Signal integrity" }, { topic: "Failure analysis" }],
      behavioral: [{}]
    },
    {
      id: "cisco-network-test",
      title: "Network Test Automation Engineer",
      family: "Infra automation",
      level: "Mid",
      fit: 90,
      posting: "https://jobs.cisco.com/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Test routing and switching features with Python automation: BGP, OSPF, VLANs, traffic generators and regression suites.",
      topics: ["Routing", "Switching", "Automation", "Performance"],
      yourEdge: ["A test framework or script you built.", "A routing or switching bug you isolated.", "A regression you caught before release."],
      mc: [
        { topic: "Routing", q: "BGP sessions run over:", o: ["UDP 179", "TCP 179", "ICMP", "TCP 443"], a: 1, why: "BGP uses TCP port 179 for reliable delivery between peers." },
        { topic: "Routing", q: "OSPF is best described as:", o: ["A link-state routing protocol", "A path-vector protocol", "A VLAN tagging method", "A file transfer protocol"], a: 0, why: "OSPF routers share link state and each compute shortest paths." },
        { topic: "Switching", q: "An IEEE 802.1Q tag adds how many bytes to an Ethernet frame?", o: ["2", "4", "8", "16"], a: 1, why: "The 4-byte tag carries the VLAN ID and priority." },
        { topic: "Switching", q: "LACP is used to:", o: ["Bundle multiple links into one logical link", "Assign IP addresses", "Encrypt traffic", "Update firmware"], a: 0, why: "LACP negotiates link aggregation between two devices." },
        { topic: "Automation", q: "pyATS is:", o: ["A Cisco Python framework for network test automation", "A cooling standard", "A routing protocol", "A cable type"], a: 0, why: "pyATS and its Genie libraries connect to devices, parse output and run tests." },
        { topic: "Performance", q: "RFC 2544 describes:", o: ["Benchmark tests for network devices", "A Wi-Fi security standard", "How to label cables", "A Linux kernel API"], a: 0, why: "It defines methods for throughput, latency, frame loss and related tests." }
      ],
      tech: [{ topic: "Routing" }, { topic: "Automation" }, { topic: "Performance" }],
      behavioral: [{}]
    }
  ]
});
