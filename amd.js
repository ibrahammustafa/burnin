/* AMD pack: original practice questions. Not affiliated with AMD. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "AMD",
  slug: "amd",
  blurb: "GPU, CPU and platform validation for Instinct accelerators and EPYC servers.",
  values: [
    ["Execution", "Deliver on schedule; show how you hit dates."],
    ["Deep debug", "Root cause, not workarounds."],
    ["Adaptability", "Shifting priorities on fast product cycles."],
    ["Collaboration", "Silicon, firmware, software and customers."],
    ["Customer impact", "Connect validation to what customers deploy."]
  ],
  roles: [
    {
      id: "amd-gpu-validation",
      title: "GPU Platform Validation Engineer",
      family: "Hardware validation",
      level: "Mid",
      fit: 78,
      posting: "https://careers.amd.com/careers-home/jobs?keywords=validation",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Validate data center GPUs and platforms: firmware and driver regressions, stress and thermal testing, PCIe and memory errors, and root cause.",
      topics: ["GPU stack", "Interconnect", "Memory", "Debug"],
      yourEdge: ["A firmware or driver regression you bisected.", "A stress test you automated and the failures it found.", "A thermal or power issue you correlated with performance."],
      mc: [
        { topic: "GPU stack", q: "What is ROCm?", o: ["A cooling standard", "AMD's open software stack for GPU computing", "A network protocol", "A BIOS setting"], a: 1, why: "ROCm includes drivers, runtimes, compilers and libraries for AMD GPUs." },
        { topic: "GPU stack", q: "Which CLI tool reports AMD GPU temperature, power and utilization?", o: ["nvidia-smi", "rocm-smi (or amd-smi)", "lspci", "ethtool"], a: 1, why: "rocm-smi and the newer amd-smi expose GPU telemetry." },
        { topic: "Interconnect", q: "AMD's Infinity Fabric is used to:", o: ["Cool the chip", "Connect chiplets, CPUs and GPUs with high-bandwidth links", "Store firmware", "Encrypt disks"], a: 1, why: "It's AMD's interconnect between dies and devices." },
        { topic: "Memory", q: "HBM is:", o: ["A hard disk format", "Stacked high-bandwidth memory placed next to the GPU die", "A BIOS mode", "A cooling loop"], a: 1, why: "HBM stacks DRAM dies for very high bandwidth, critical for AI accelerators." },
        { topic: "Debug", q: "The kernel log shows PCIe AER 'correctable' errors climbing on one GPU. Interpretation?", o: ["Normal, ignore", "The link is recovering from errors; it may be marginal and worth investigating", "The GPU is dead", "A software license issue"], a: 1, why: "Correctable errors are fixed by hardware, but a rising count often signals signal-integrity or seating problems." },
        { topic: "Memory", q: "ECC correctable vs uncorrectable memory errors:", o: ["Same thing", "Correctable are fixed automatically; uncorrectable corrupt data and usually crash or retire the page", "Uncorrectable are harmless", "Only CPUs have ECC"], a: 1, why: "Track correctable rates as a leading indicator of failing memory." }
      ],
      tech: [
        { topic: "Debug", q: "A GPU hangs after hours under a stress workload. How do you root cause it?", probe: "Systematic hang debug.",
          points: ["Reproduce reliably; note time-to-hang", "Capture kernel logs, GPU telemetry, temps and power before the hang", "Check driver and firmware versions; try known-good combos", "Vary one factor: workload, power cap, clocks, slot", "Swap hardware to separate unit vs design issue", "File with logs and minimal repro"],
          answer: "First get a reliable repro and measure time-to-hang. Then capture everything leading up to it: kernel log, GPU telemetry, temperature and power. I check driver and firmware versions against a known-good combo, then vary one factor at a time: workload, power cap, clocks, slot. Swapping the GPU into another system tells me if it's one unit or the design. The bug gets the logs and the smallest repro I can make.",
          follow: ["It only hangs on one of 8 GPUs in the node. What does that suggest?"] },
        { topic: "GPU stack", q: "Write a validation plan for a new GPU firmware release.", probe: "Coverage and regression thinking.",
          points: ["Smoke: enumerate, basic compute, telemetry", "Regression suite against previous firmware", "Stress: sustained compute, memory, thermal", "Power and reset cycling", "Multi-GPU and interconnect tests", "Compare performance to baseline", "Sign-off criteria"],
          answer: "Smoke tests first: the GPU enumerates, runs basic compute and reports telemetry. Then the full regression suite compared to the previous firmware, sustained stress on compute and memory at temperature, hundreds of power and reset cycles, and multi-GPU interconnect tests. Performance is compared to a baseline so a slowdown counts as a failure too. Sign-off needs explicit criteria agreed before testing starts.",
          follow: ["Performance dropped 3%. Block the release?"] },
        { topic: "Memory", q: "How would you track memory health across a fleet of accelerators?", probe: "Data-driven reliability.",
          points: ["Collect correctable and uncorrectable ECC counts per device", "Track rates over time, not just totals", "Thresholds that trigger page retirement or RMA", "Correlate with temperature and workload", "Dashboards and alerts"],
          answer: "Collect ECC counts per device continuously, and watch the rate of correctable errors over time, not just the total. Set thresholds that trigger page retirement or RMA before an uncorrectable error crashes a job. Correlating with temperature and workload shows whether it's a bad unit or an environment problem.",
          follow: ["One rack has 5x the error rate of others. What do you check?"] }
      ],
      behavioral: [
        { q: "Tell me about a bug that took you a long time to find.", story: "A hard root cause and how you stuck with it.", star: ["Symptom", "Dead ends", "Breakthrough", "Fix and prevention"] }
      ]
    },
    {
      id: "amd-dc-lab",
      title: "Data Center Lab / Systems Engineer",
      family: "Lab operations",
      level: "Mid",
      fit: 88,
      posting: "https://careers.amd.com/careers-home/jobs?keywords=lab%20engineer",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Bring up and maintain EPYC and Instinct server platforms in engineering labs: BIOS and BMC, imaging, NUMA tuning and lab automation.",
      topics: ["Platform", "BIOS & BMC", "Performance", "Lab automation"],
      yourEdge: ["A lab you ran with many shared systems.", "A server bring-up you did end to end.", "Automation you wrote to provision or image machines."],
      mc: [
        { topic: "BIOS & BMC", q: "Redfish is:", o: ["A GPU model", "A REST API standard for out-of-band server management", "A cooling fluid", "A Linux distro"], a: 1, why: "Redfish is the modern successor to IPMI for BMC management." },
        { topic: "Performance", q: "On a 2-socket server, a job runs slower when its memory sits on the other socket. Why?", o: ["NUMA: remote memory access has higher latency", "The disk is slow", "DNS", "Too many fans"], a: 0, why: "Pin processes and memory to the same NUMA node (numactl) for consistent performance." },
        { topic: "BIOS & BMC", q: "To pass a physical GPU or NIC directly to a VM, which BIOS feature must be on?", o: ["IOMMU (AMD-Vi)", "Secure Boot only", "Legacy USB", "Wake-on-LAN"], a: 0, why: "The IOMMU enables device passthrough and SR-IOV isolation." },
        { topic: "Lab automation", q: "Which lets a server boot an installer over the network?", o: ["PXE", "SATA", "HDMI", "Bluetooth"], a: 0, why: "PXE uses DHCP and TFTP/HTTP to load a boot image." },
        { topic: "BIOS & BMC", q: "Where do you look for hardware events like a failed DIMM or PSU on a server with a BMC?", o: ["Browser history", "The BMC system event log (SEL)", "/etc/hosts", "Crontab"], a: 1, why: "ipmitool sel list or the Redfish event log." },
        { topic: "Platform", q: "SR-IOV lets one PCIe device:", o: ["Run faster than its spec", "Present multiple virtual functions to VMs or containers", "Skip drivers", "Use less power"], a: 1, why: "One physical NIC or GPU can expose several isolated virtual functions." }
      ],
      tech: [
        { topic: "Platform", q: "Bring up a brand-new server platform in the lab. Walk me through it.", probe: "End-to-end bring-up discipline.",
          points: ["Inspect and record serials and config", "Rack, power and network with OOB access first", "Update BMC and BIOS to the target versions", "Set BIOS profile for the test plan", "Image the OS, install drivers", "Run burn-in and baseline benchmarks", "Hand off with documentation"],
          answer: "Record the configuration and serials, rack it, and get out-of-band access working before anything else so I'm never stuck walking to the lab. Then bring BMC and BIOS to the target versions, apply the BIOS profile the test plan needs, image the OS and install drivers. Burn-in and baseline benchmarks prove it's healthy, and the handoff includes the exact versions and settings so results are reproducible.",
          follow: ["Two identical servers benchmark 10% apart. Why?"] },
        { topic: "Lab automation", q: "200 lab systems, many users. How do you keep them in a known state?", probe: "Lab as a service.",
          points: ["Inventory and reservations", "Golden images and automated reimaging", "Config management for BIOS/BMC baselines", "Health checks between users", "Self-service with guardrails"],
          answer: "Inventory and reservations so every system has an owner, golden images with automated reimaging between users, scripted BIOS and BMC baselines through Redfish, and health checks before a system goes back in the pool. Self-service tools let engineers reset their own systems without filing tickets.",
          follow: ["Someone changed BIOS settings and didn't tell anyone. How would you detect that?"] },
        { topic: "Performance", q: "A customer says their workload is slower on a new platform. How do you investigate?", probe: "Performance methodology.",
          points: ["Reproduce with their workload or a proxy", "Compare configs: BIOS, firmware, OS, drivers", "Check NUMA placement, memory population, power profiles", "Profile: CPU, memory bandwidth, I/O", "Change one thing at a time"],
          answer: "Reproduce with their workload or a close proxy, then compare configurations line by line: BIOS settings, firmware, OS and drivers. Common culprits are NUMA placement, unbalanced memory population and power-saving profiles. I profile to see whether it's compute, memory bandwidth or I/O bound, and change one thing at a time.",
          follow: ["Memory channels are half populated. Why does that matter?"] }
      ],
      behavioral: [
        { q: "Tell me about supporting a demanding internal customer.", story: "An engineer or team who needed your lab or systems urgently.", star: ["Their need", "Constraints", "What you did", "Outcome"] }
      ]
    }
  ]
});
