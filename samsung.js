/* Samsung pack: original practice questions. Not affiliated with Samsung. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Samsung",
  slug: "samsung",
  blurb: "Memory, SSD and semiconductor roles behind HBM, NVMe drives and fab equipment.",
  values: [
    ["Quality first", "Data and process discipline over shortcuts."],
    ["Precision", "Specs, tolerances and documented procedures."],
    ["Teamwork across sites", "US teams work closely with Korea; clear handoffs matter."],
    ["Continuous improvement", "Show a metric you moved."],
    ["Safety", "Fab and lab safety is non-negotiable."]
  ],
  roles: [
    {
      id: "samsung-ssd-validation",
      title: "SSD / Memory Validation Engineer",
      family: "Hardware validation",
      level: "Mid",
      fit: 72,
      posting: "https://semiconductor.samsung.com/us/careers/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Validate NVMe SSDs and memory products: performance, endurance, power-loss and compatibility testing with Linux tools and automation.",
      topics: ["Storage", "Endurance", "Memory", "Test automation"],
      yourEdge: ["A performance test you designed and the numbers it produced.", "Automation that ran long tests unattended.", "A compatibility issue you found across platforms."],
      mc: [
        { topic: "Storage", q: "Why is NVMe faster than SATA for SSDs?", o: ["It uses bigger cables", "It runs over PCIe with many deep parallel queues instead of one AHCI queue", "It spins faster", "It compresses everything"], a: 1, why: "NVMe was designed for flash: PCIe bandwidth and up to 64K queues." },
        { topic: "Storage", q: "Which tool is the standard for generating storage I/O workloads on Linux?", o: ["fio", "ping", "top", "git"], a: 0, why: "fio controls block size, queue depth, read/write mix and patterns." },
        { topic: "Endurance", q: "DWPD means:", o: ["Drive writes per day over the warranty period", "Data with parity disks", "Disk wear prediction daily", "Direct write path driver"], a: 0, why: "A 1 TB drive rated 1 DWPD can take 1 TB of writes per day for its warranty life." },
        { topic: "Endurance", q: "Write amplification is:", o: ["Louder drives", "The ratio of data the flash actually writes to data the host asked to write", "Faster writes", "RAID mirroring"], a: 1, why: "Garbage collection and wear leveling cause extra internal writes; lower is better." },
        { topic: "Storage", q: "Which command shows an NVMe drive's health, temperature and media errors?", o: ["nvme smart-log /dev/nvme0", "lsusb", "df -h", "ip a"], a: 0, why: "nvme-cli exposes SMART/health data including percentage used and media errors." },
        { topic: "Memory", q: "Why is HBM important for AI accelerators?", o: ["It's cheaper than DDR", "It delivers far higher bandwidth by stacking DRAM dies next to the processor", "It never fails", "It stores data without power"], a: 1, why: "Training and inference are often limited by memory bandwidth." }
      ],
      tech: [
        { topic: "Storage", q: "An SSD's write performance drops sharply after an hour of testing. Why, and how do you test properly?", probe: "Understanding steady-state behavior.",
          points: ["Fresh-out-of-box performance is inflated by empty blocks and SLC cache", "As the drive fills, garbage collection kicks in", "Precondition the drive (fill and write randomly) before measuring", "Measure steady state per SNIA-style methodology", "Report both burst and steady-state"],
          answer: "A fresh drive looks fast because it has empty blocks and a fast cache. Once those fill, garbage collection has to free space while you write, so throughput drops to steady state. Proper testing preconditions the drive by filling it and running random writes until performance stabilizes, then measures. I'd report both burst and steady-state numbers so nobody is surprised in production.",
          follow: ["How do you know you've reached steady state?"] },
        { topic: "Endurance", q: "Design a power-loss test for an SSD.", probe: "Data integrity testing.",
          points: ["Controlled power cuts with a programmable supply or relay", "Cut during heavy writes at random points", "Verify data integrity with checksums after power returns", "Check the drive mounts and reports health", "Thousands of cycles with logging", "Track any corruption or bricking"],
          answer: "Use a programmable power supply or relay to cut power at random moments during heavy writes. After power returns, the drive must enumerate, report healthy, and every acknowledged write must verify against checksums. Run thousands of cycles with full logging, because the failures you care about are rare.",
          follow: ["What's the difference between data acknowledged and data in flight?"] },
        { topic: "Test automation", q: "How would you automate a 30-day endurance test across 100 drives?", probe: "Long-running automation.",
          points: ["Scripted fio jobs per drive with logs", "Periodic SMART collection", "Watchdog for hangs; auto power-cycle", "Central results database and dashboard", "Alerts on failures", "Resume after interruptions"],
          answer: "Script fio jobs per drive, collect SMART data on a schedule, and store everything centrally with a dashboard. A watchdog detects hung drives and power-cycles them, logging the event. Alerts fire on failures, and the harness resumes cleanly after a reboot so one hiccup doesn't cost a month.",
          follow: ["How do you tell a drive failure from a test harness bug?"] }
      ],
      behavioral: [
        { q: "Tell me about working with a team in another time zone.", story: "A handoff across regions that worked or broke.", star: ["Setup", "Challenge", "What you changed", "Result"] }
      ]
    },
    {
      id: "samsung-fab-tech",
      title: "Semiconductor Equipment Technician",
      family: "Manufacturing",
      level: "Entry to mid",
      fit: 60,
      posting: "https://semiconductor.samsung.com/us/careers/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Maintain and troubleshoot fab tools in a cleanroom: preventive maintenance, downtime recovery, SPC and safety.",
      topics: ["Maintenance", "SPC", "Safety", "Troubleshooting"],
      yourEdge: ["Equipment you kept running and how you measured uptime.", "A safety procedure you followed or improved.", "A troubleshooting win under time pressure."],
      mc: [
        { topic: "Maintenance", q: "Preventive maintenance (PM) means:", o: ["Fixing a tool after it breaks", "Scheduled service to prevent failures", "Replacing the whole tool", "Ignoring alarms"], a: 1, why: "PMs trade planned downtime for fewer unplanned failures." },
        { topic: "SPC", q: "On a control chart, a point falls outside the control limits. What does that indicate?", o: ["Normal variation", "A likely special cause; investigate the process", "The chart is wrong", "Nothing"], a: 1, why: "Out-of-control signals mean something changed beyond common-cause variation." },
        { topic: "Maintenance", q: "MTBF stands for:", o: ["Mean time between failures", "Maximum tool build factor", "Monthly test before fab", "Minimum time before flush"], a: 0, why: "Higher MTBF means a more reliable tool." },
        { topic: "Safety", q: "Before opening a tool for maintenance you must:", o: ["Ask the operator to stand back", "Apply lockout/tagout on all energy sources and verify", "Turn off the lights", "Just unplug it"], a: 1, why: "Electrical, pneumatic, chemical and RF energy all need isolation." },
        { topic: "Safety", q: "Why do cleanrooms require gowning?", o: ["Branding", "People shed particles that cause wafer defects", "Temperature", "Noise"], a: 1, why: "Particle control directly affects yield." },
        { topic: "Troubleshooting", q: "A tool alarms with the same error after every PM. Most likely?", o: ["Random chance", "Something done or missed during the PM procedure", "Operator error", "Wafers are bad"], a: 1, why: "Look at what the PM touches and compare against the procedure." }
      ],
      tech: [
        { topic: "Troubleshooting", q: "A tool goes down mid-shift. Walk through your response.", probe: "Structured recovery.",
          points: ["Safe the tool and wafers", "Read alarms and logs", "Check recent changes or PMs", "Follow the troubleshooting guide; escalate if needed", "Restore, qualify, release", "Document and look for repeat patterns"],
          answer: "First safe the tool and protect the wafers inside. Then read the alarm and logs and check what changed recently, including the last PM. I work the troubleshooting guide, escalate early if it's beyond my level, and after the fix the tool is qualified before release. The event gets documented so repeat failures show up as a pattern.",
          follow: ["Production is pushing to release before qualification. What do you do?"] },
        { topic: "Maintenance", q: "How would you reduce unplanned downtime on a tool group?", probe: "Data-driven improvement.",
          points: ["Pareto of downtime causes", "Fix the top cause first", "Adjust PM content and intervals", "Spares on hand for frequent failures", "Training and standard work", "Track MTBF and MTTR"],
          answer: "Pull the downtime data and make a Pareto chart of causes, then attack the biggest one. Often that means adjusting what a PM covers or how often, stocking the parts that fail most, and making sure everyone follows the same procedure. MTBF and MTTR show whether it's working.",
          follow: ["MTTR is high but MTBF is fine. Where do you look?"] },
        { topic: "SPC", q: "Explain how you'd respond to an SPC out-of-control signal.", probe: "Process discipline.",
          points: ["Stop or hold per the reaction plan", "Verify the measurement", "Investigate recent changes: tool, material, recipe", "Correct and verify", "Document"],
          answer: "Follow the reaction plan, which usually means holding the affected lots. Verify the measurement isn't the problem, then look at what changed: tool maintenance, materials, recipe. Correct it, confirm the process is back in control, and document it.",
          follow: ["The measurement tool itself drifted. Now what?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you followed a procedure even when it slowed you down.", story: "Safety or quality over speed.", star: ["Pressure to skip", "What you did", "Why", "Outcome"] }
      ]
    }
  ]
});
