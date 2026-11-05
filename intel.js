/* Intel pack: original practice questions. Not affiliated with Intel. Paid drills load after sign-in. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Intel",
  slug: "intel",
  blurb: "Post-silicon validation and lab roles for processors and server platforms.",
  values: [
    ["Data over opinion", "Bring measurements to technical decisions."],
    ["Root cause", "Find why it failed, not just that it failed."],
    ["Execution", "Show how you hit dates on complex programs."],
    ["Collaboration", "Design, firmware, validation and manufacturing together."],
    ["Quality", "Protect customers from escapes."]
  ],
  roles: [
    {
      id: "intel-post-silicon",
      title: "Post-Silicon Validation Engineer",
      family: "Hardware validation",
      level: "Mid",
      fit: 80,
      posting: "https://jobs.intel.com/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Validate new processors on real hardware: bring-up, stress, PCIe and memory, machine check debug, and voltage and frequency margining.",
      topics: ["Debug", "Interconnect", "Memory", "Test planning"],
      yourEdge: ["A hard bug you root-caused from logs.", "Stress tests you automated.", "A hardware and firmware issue you separated."],
      mc: [
        { topic: "Debug", q: "On a Linux server, machine check errors usually report:", o: ["Web traffic", "Hardware problems such as memory, cache or bus errors", "User passwords", "Fan colors"], a: 1, why: "The Machine Check Architecture records hardware errors in MCA banks." },
        { topic: "Debug", q: "A silicon stepping such as A0 to B0 means:", o: ["A new revision of the chip", "A faster fan", "A BIOS menu", "A different socket color"], a: 0, why: "Steppings mark silicon revisions, usually with fixes." },
        { topic: "Debug", q: "JTAG is commonly used to:", o: ["Debug and test hardware at a low level", "Stream video", "Assign IP addresses", "Cool the board"], a: 0, why: "JTAG gives low-level access for boundary scan and debug." },
        { topic: "Interconnect", q: "In lspci output, LnkSta shows:", o: ["The link speed and width currently negotiated", "The device's price", "The BIOS password", "The CPU temperature"], a: 0, why: "Compare LnkSta to LnkCap to see if a link trained below its capability." },
        { topic: "Interconnect", q: "CXL is built on top of:", o: ["USB", "SATA", "The PCIe physical layer", "Wi-Fi"], a: 2, why: "CXL reuses the PCIe physical layer and adds cache and memory protocols." },
        { topic: "Memory", q: "A rising count of ECC correctable errors on one DIMM suggests:", o: ["Everything is fine, ignore it", "That DIMM may be degrading and should be watched or replaced", "The CPU is too new", "The network is down"], a: 1, why: "Correctable errors are fixed, but a rising rate is an early warning." }
      ],
      tech: [{ topic: "Debug" }, { topic: "Interconnect" }, { topic: "Test planning" }],
      behavioral: [{}]
    },
    {
      id: "intel-validation-lab",
      title: "Validation Lab Technician",
      family: "Lab operations",
      level: "Entry to mid",
      fit: 92,
      posting: "https://jobs.intel.com/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Keep validation labs running: build and rework systems, swap CPUs and DIMMs, flash BIOS, troubleshoot no-boot failures and manage inventory.",
      topics: ["Bring-up", "Lab operations", "Safety and handling", "Tools"],
      yourEdge: ["A lab you organized or ran.", "A no-boot failure you solved.", "Scripts you used to image or inventory systems."],
      mc: [
        { topic: "Bring-up", q: "A board shows a POST code and stops. What is the code for?", o: ["It identifies the boot stage where it stopped", "It sets the network speed", "It is a warranty number", "It is the CPU price"], a: 0, why: "POST codes narrow a no-boot failure to a stage, such as memory training." },
        { topic: "Bring-up", q: "For a no-boot system, a good first step is:", o: ["Replace the CPU right away", "Reduce to minimum config, then add parts back", "Reinstall the OS", "Change the IP address"], a: 1, why: "A minimum config isolates the part that causes the failure." },
        { topic: "Safety and handling", q: "Before handling a motherboard you should:", o: ["Use a grounded ESD strap and power it down", "Wear wool gloves", "Keep it powered on", "Clean it with water"], a: 0, why: "Static and live power can both damage parts or harm you." },
        { topic: "Safety and handling", q: "Thermal interface material is used to:", o: ["Move heat from the chip into the heatsink", "Glue the CPU permanently", "Insulate the CPU from the heatsink", "Improve Wi-Fi"], a: 0, why: "It fills tiny air gaps so heat transfers efficiently." },
        { topic: "Tools", q: "To read rail voltages on a powered board, you would normally use:", o: ["A multimeter", "A label printer", "A crimper", "A network sniffer"], a: 0, why: "A multimeter measures steady DC voltages. A scope shows fast changes." },
        { topic: "Lab operations", q: "A BMC lets you:", o: ["Manage a server remotely, even with the OS down", "Increase CPU cores", "Replace the BIOS chip by hand", "Cool the rack"], a: 0, why: "Out-of-band management provides power control, logs and sensors." }
      ],
      tech: [{ topic: "Bring-up" }, { topic: "Lab operations" }, { topic: "Safety and handling" }],
      behavioral: [{}]
    }
  ]
});
