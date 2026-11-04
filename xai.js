/* X / xAI pack: original practice questions. Not affiliated with X Corp or xAI. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "X / xAI",
  slug: "xai",
  blurb: "Fast GPU cluster builds like Colossus and the Linux fleet that runs them.",
  values: [
    ["Speed", "Show the fastest you've ever shipped something real."],
    ["First principles", "Explain why, not just what you did."],
    ["Hands-on", "You fix it yourself."],
    ["Intensity", "Long pushes and how you stayed effective."],
    ["Ownership", "No handoffs needed."]
  ],
  roles: [
    {
      id: "xai-dc-tech",
      title: "Data Center Technician, GPU Cluster",
      family: "Data center ops",
      level: "Entry to mid",
      fit: 88,
      posting: "https://x.ai/careers",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Build and repair large GPU clusters on aggressive timelines: racking, liquid cooling, optics, burn-in and break-fix.",
      topics: ["Build-out", "Optics", "Cooling", "Burn-in"],
      yourEdge: ["The fastest large install you've been part of.", "A cabling job with hundreds of links you got right.", "A hardware failure you diagnosed on the floor."],
      mc: [
        { topic: "Build-out", q: "xAI's Colossus cluster in Memphis connected its GPUs with which kind of network, according to NVIDIA?", o: ["Wi-Fi", "Spectrum-X Ethernet", "Token Ring", "USB"], a: 1, why: "NVIDIA said Colossus used Spectrum-X Ethernet for its RDMA fabric." },
        { topic: "Optics", q: "A transceiver's DOM data shows very low receive power. Most likely?", o: ["The switch is overloaded", "A dirty, damaged or wrong fiber on that link", "DNS", "Too much cooling"], a: 1, why: "Digital optical monitoring reads TX/RX power. Low RX usually means the physical path." },
        { topic: "Burn-in", q: "Why run NCCL tests during bring-up?", o: ["To test the BIOS", "To measure GPU-to-GPU collective bandwidth across nodes and catch bad links", "To install drivers", "To format disks"], a: 1, why: "all_reduce_perf shows whether the fabric performs as expected." },
        { topic: "Cooling", q: "Before disconnecting a liquid-cooled tray, you:", o: ["Pull it fast", "Follow the procedure for quick disconnects and check for leaks", "Turn off the room", "Pour out the coolant"], a: 1, why: "Quick disconnects are designed to seal, but procedure and leak checks prevent damage." },
        { topic: "Build-out", q: "When racking hundreds of servers fast, what prevents most rework?", o: ["Skipping labels", "Following the elevation and cabling plan and labeling both ends as you go", "Doing cables last without a plan", "Guessing"], a: 1, why: "Speed comes from not having to redo work." },
        { topic: "Burn-in", q: "A node passes single-GPU tests but slows down multi-node jobs. Suspect:", o: ["The GPU fans", "Its network links or NIC", "The keyboard", "The OS font"], a: 1, why: "Single-node tests don't exercise the fabric." }
      ],
      tech: [
        { topic: "Build-out", q: "You need to bring up 500 racks in weeks, not months. How do you organize it?", probe: "Throughput thinking.",
          points: ["Assembly-line stages: receive, rack, power, cable, test", "Dedicated crews per stage", "Pre-staged parts and cables per rack", "Labels and plans printed ahead", "Daily throughput targets and blockers board", "Parallel burn-in with fast RMA loop"],
          answer: "Treat it like an assembly line: receiving, racking, power, cabling, then testing, each with its own crew. Parts and pre-labeled cables are staged per rack so nobody hunts for anything. Daily targets and a blockers board keep everyone honest, and burn-in runs in parallel with failed nodes going straight to a fast RMA or swap loop.",
          follow: ["Cabling is the bottleneck. What do you change?"] },
        { topic: "Optics", q: "50 links in a new pod won't come up. How do you attack it?", probe: "Systematic physical-layer work.",
          points: ["Check for a pattern: same switch, same cable batch, same optic type", "Verify transceiver compatibility and firmware", "Inspect and clean fibers", "Check polarity and the cabling map", "Swap known-good optics to isolate"],
          answer: "First look for a pattern: same switch, same cable batch, same optic type. A batch issue or the wrong part number causes many failures at once. Then verify optics are supported and on the right firmware, inspect and clean fiber, and check polarity against the map. Swapping in known-good optics isolates the rest quickly.",
          follow: ["They're all on one switch. Next?"] },
        { topic: "Burn-in", q: "What should a burn-in checklist cover before a GPU node joins the cluster?", probe: "Quality gates.",
          points: ["Firmware and driver versions match", "GPU diagnostics (DCGM)", "Memory and ECC checks", "Thermal under sustained load", "NCCL multi-node bandwidth", "Network link errors zero"],
          answer: "Matching firmware and driver versions, GPU diagnostics, memory and ECC checks, a sustained thermal load test, multi-node NCCL bandwidth against target, and zero link errors on its network ports. A node that misses any of these doesn't join.",
          follow: ["What if NCCL bandwidth is 90% of target?"] }
      ],
      behavioral: [
        { q: "Tell me about the most intense deadline you've worked under.", story: "A push where you delivered.", star: ["Deadline", "Your role", "How you kept quality", "Result"] }
      ]
    },
    {
      id: "xai-linux-infra",
      title: "Linux Infrastructure Engineer",
      family: "Infra automation",
      level: "Mid",
      fit: 70,
      posting: "https://x.ai/careers",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Provision and operate thousands of Linux GPU nodes: imaging, config management, Kubernetes or Slurm, monitoring and on-call.",
      topics: ["Provisioning", "Config management", "Orchestration", "Monitoring"],
      yourEdge: ["Automation that provisioned many machines.", "A fleet-wide problem you fixed with a script.", "An on-call incident you handled."],
      mc: [
        { topic: "Orchestration", q: "A Kubernetes node shows NotReady. Where do you look first?", o: ["The pod's README", "kubelet status and logs on the node, plus disk, memory and network", "The cluster's DNS name", "The load balancer"], a: 1, why: "NotReady usually means the kubelet can't report: crashed, resource pressure or network." },
        { topic: "Config management", q: "Ansible playbooks should be:", o: ["Run once only", "Idempotent: safe to run repeatedly with the same result", "Random", "Manual"], a: 1, why: "Idempotency makes re-runs and drift correction safe." },
        { topic: "Provisioning", q: "Config drift means:", o: ["Servers moving racks", "Machines slowly diverging from the intended configuration", "Network latency", "Disk fragmentation"], a: 1, why: "Detect and correct drift with config management." },
        { topic: "Monitoring", q: "Which is the standard way to collect GPU metrics into Prometheus?", o: ["DCGM Exporter", "Email", "cron + echo", "SNMP only"], a: 0, why: "DCGM Exporter exposes NVIDIA GPU telemetry." },
        { topic: "Orchestration", q: "Container vs VM:", o: ["Same thing", "Containers share the host kernel; VMs run their own kernel on a hypervisor", "VMs are always faster", "Containers need their own hardware"], a: 1, why: "Containers are lighter weight; VMs give stronger isolation." },
        { topic: "Provisioning", q: "Fastest reliable way to install an OS on 1,000 new nodes?", o: ["USB sticks", "Network boot (PXE) with automated install and post-install config", "Clone one disk by hand", "Ask vendors"], a: 1, why: "PXE plus kickstart/autoinstall plus config management scales." }
      ],
      tech: [
        { topic: "Provisioning", q: "Design provisioning for 1,000 new GPU nodes arriving next week.", probe: "Automation at scale.",
          points: ["Inventory from vendor manifests: serials, MACs", "DHCP/PXE with automated OS install", "Config management for drivers, users, monitoring", "Health checks and burn-in before joining", "Register in scheduler or Kubernetes automatically", "Track status per node"],
          answer: "Load the vendor manifest so every serial and MAC is known before the racks arrive. Nodes PXE boot into an automated install, then config management installs drivers, monitoring and access. Health checks and burn-in run automatically, and only passing nodes register with the scheduler. A status board tracks every node through each step.",
          follow: ["30 nodes fail PXE. Where do you look?"] },
        { topic: "Config management", q: "Half the fleet has a different driver version than intended. Fix it safely.", probe: "Safe remediation.",
          points: ["Confirm with an inventory query", "Understand why: failed runs, manual changes", "Pin the version in config", "Drain and update in batches", "Verify and alert on future drift"],
          answer: "Confirm the scope with an inventory query, then find out how it happened: failed config runs or manual changes. Pin the intended version in config management, then drain and update nodes in batches so running jobs aren't killed. Add a drift check that alerts if versions diverge again.",
          follow: ["Users say the new driver is slower. What now?"] },
        { topic: "Monitoring", q: "You're on call and 200 nodes go unhealthy at once. What do you think first?", probe: "Common-cause thinking.",
          points: ["Many at once means a shared cause", "Check what they share: rack, switch, PDU, image, recent change", "Check monitoring itself isn't broken", "Mitigate, communicate, then root cause"],
          answer: "Two hundred at once is almost never 200 separate failures. I look for what they share: a switch, a PDU, a row, a recent deploy or image. I also make sure the monitoring system itself isn't what broke. Then mitigate, communicate, and root cause.",
          follow: ["They share nothing obvious. Next?"] }
      ],
      behavioral: [
        { q: "Explain a technical decision from first principles.", story: "A design choice where you reasoned from basics.", star: ["Problem", "Assumptions you questioned", "Decision", "Result"] }
      ]
    }
  ]
});
