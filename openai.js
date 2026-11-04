/* OpenAI pack: original practice questions. Not affiliated with OpenAI. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "OpenAI",
  slug: "openai",
  blurb: "Compute infrastructure and programs behind large training clusters and the Stargate buildout.",
  values: [
    ["Mission focus", "Why safe, beneficial AI matters to you."],
    ["Scale", "Problems that only show up at huge scale."],
    ["Intensity and pragmatism", "Ship what works now, improve it after."],
    ["Clear thinking", "Explain trade-offs simply."],
    ["Collaboration", "Research and infra working as one team."]
  ],
  roles: [
    {
      id: "openai-hw-infra",
      title: "Hardware / Data Center Infrastructure Engineer",
      family: "Data center ops",
      level: "Mid to senior",
      fit: 75,
      posting: "https://openai.com/careers/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Keep large training clusters productive: hardware failure triage, fleet health, uptime for long jobs, and working with data center partners.",
      topics: ["Reliability at scale", "Training jobs", "Fleet health", "Partners"],
      yourEdge: ["A fleet health system you built.", "A time you reduced downtime with data.", "Working with a vendor or partner to fix hardware."],
      mc: [
        { topic: "Reliability at scale", q: "Why do failures matter more as a training cluster grows?", o: ["They don't", "With tens of thousands of GPUs, something is almost always failing, and one failure can stop a synchronized job", "Big clusters never fail", "Only software fails"], a: 1, why: "Mean time between failures for the whole cluster shrinks as component count grows." },
        { topic: "Training jobs", q: "Why do long training jobs save checkpoints?", o: ["For logging only", "So they can resume from recent progress after a failure instead of starting over", "To free GPU memory", "For security"], a: 1, why: "Checkpoint frequency trades I/O cost against lost work." },
        { topic: "Training jobs", q: "'Goodput' in a training cluster means:", o: ["Network speed", "The share of time and compute that makes real training progress", "GPU temperature", "Number of jobs"], a: 1, why: "Failures, restarts and slow nodes all eat into goodput." },
        { topic: "Fleet health", q: "A single slow GPU in a synchronized job causes:", o: ["Nothing", "The whole job to run at the slowest worker's pace", "Only that GPU to slow down", "Faster training"], a: 1, why: "Collectives wait for every participant. Finding stragglers is a key ops task." },
        { topic: "Fleet health", q: "Best place to catch a bad node before it hurts a job?", o: ["After the job crashes", "Health checks and burn-in before nodes join, plus continuous checks", "During the postmortem", "Never"], a: 1, why: "Prevention is cheaper than restarts." },
        { topic: "Partners", q: "OpenAI's large data center buildout announced in 2025 is called:", o: ["Stargate", "Colossus", "Andromeda", "Polaris"], a: 0, why: "Stargate is the multi-site AI infrastructure project announced in January 2025." }
      ],
      tech: [
        { topic: "Reliability at scale", q: "How would you maximize uptime for a 10,000-GPU training run?", probe: "Systems thinking about goodput.",
          points: ["Strict burn-in before nodes join", "Continuous health checks; drain bad nodes fast", "Hot spares to swap in", "Fast checkpointing and restart", "Straggler detection", "Track goodput and the causes of lost time"],
          answer: "Keep bad hardware out with strict burn-in, then catch new failures fast with continuous health checks that drain nodes automatically. Keep hot spares so a failed node is replaced in minutes. Make checkpointing and restart fast, detect stragglers, and track goodput with a breakdown of where time is lost, so the biggest cause gets fixed first.",
          follow: ["Checkpointing takes 10 minutes. How often should you do it?"] },
        { topic: "Fleet health", q: "Build a hardware failure triage pipeline.", probe: "Automation plus judgment.",
          points: ["Collect signals: Xid, ECC, link errors, thermals", "Classify known signatures automatically", "Auto-drain and ticket with evidence", "Route to partner or vendor with RMA data", "Track repeat offenders", "Feed back into burn-in tests"],
          answer: "Collect signals like Xid codes, ECC counts, link errors and thermals. Known signatures get classified automatically: drain the node and open a ticket with the evidence attached, routed to the data center partner or vendor with what they need for RMA. Repeat offenders are tracked separately, and every new failure type becomes a new burn-in check.",
          follow: ["How do you handle a signature you've never seen?"] },
        { topic: "Partners", q: "A data center partner keeps missing repair SLAs. What do you do?", probe: "Partner management.",
          points: ["Data: which SLAs, how often, impact", "Root cause with them: parts, staffing, process", "Agree on fixes and checkpoints", "Escalate through the contract if needed", "Mitigate meanwhile: spares, automation"],
          answer: "Get the data first: which SLAs, how often, and the compute lost. Then work through root cause with the partner: parts stocking, staffing or process. Agree on fixes with weekly checkpoints, escalate through the contract if it doesn't improve, and meanwhile reduce my exposure with more spares and automation.",
          follow: ["What would you put in the next contract?"] }
      ],
      behavioral: [
        { q: "Why do you want to work on AI infrastructure?", story: "Your honest reason, tied to your experience.", star: ["What draws you", "What you've done that's relevant", "What you want to build", "Why here"] }
      ]
    },
    {
      id: "openai-tpm-compute",
      title: "Technical Program Manager, Compute",
      family: "Program management",
      level: "Senior",
      fit: 55,
      posting: "https://openai.com/careers/",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Deliver compute capacity on time: cluster bring-up programs, vendor and partner coordination, capacity planning and exec communication.",
      topics: ["Planning", "Capacity", "Risk", "Communication"],
      yourEdge: ["A cross-team program you drove.", "A schedule you recovered.", "A capacity plan or forecast you built."],
      mc: [
        { topic: "Planning", q: "The critical path is:", o: ["The riskiest tasks", "The longest chain of dependent tasks, setting the earliest finish", "The tasks execs care about", "Tasks with the most people"], a: 1, why: "Slips on the critical path slip the whole program." },
        { topic: "Capacity", q: "A capacity forecast for AI compute must consider:", o: ["Only GPU count", "Demand by team, delivery schedules, power and space, failure rates and utilization", "Office seats", "Stock price"], a: 1, why: "GPUs are useless without power, space, network and healthy utilization." },
        { topic: "Risk", q: "A key vendor slips 4 weeks on a critical-path item. Your first move:", o: ["Wait", "Quantify impact, line up options, and brief stakeholders with a recommendation", "Blame the vendor publicly", "Hide it"], a: 1, why: "Impact plus options plus recommendation." },
        { topic: "Communication", q: "A good exec update leads with:", o: ["The full task list", "Status, top risks, and any decision needed", "Thank-yous", "Technical details"], a: 1, why: "Busy readers read the first lines." },
        { topic: "Planning", q: "Two research teams want the same new cluster. You:", o: ["Split evenly", "Bring the trade-off with data to whoever owns the priority call, then communicate the decision", "First come, first served", "Let them fight"], a: 1, why: "TPMs drive the decision, not make it alone." },
        { topic: "Risk", q: "Which is most often the long-lead constraint for new AI capacity?", o: ["Desks", "Power and electrical equipment", "Keyboards", "Software licenses"], a: 1, why: "Power availability gates many AI data center schedules." }
      ],
      tech: [
        { topic: "Planning", q: "Plan delivery of a new training cluster on a fixed date.", probe: "Structured program planning.",
          points: ["Work back from the date: acceptance, burn-in, install, delivery, orders", "Identify long-lead items and critical path", "Owners for every workstream", "Weekly risk review", "Clear acceptance criteria", "Buffer on the riskiest steps"],
          answer: "Work backward from the date: acceptance tests, burn-in, install, delivery and orders, which shows the critical path and long-lead items right away. Every workstream gets one owner, risks get reviewed weekly, and acceptance criteria are agreed up front. Buffer goes where the risk is highest, not spread evenly.",
          follow: ["Halfway through, you're 2 weeks behind. What do you do?"] },
        { topic: "Communication", q: "Write the first three lines of an exec update for a slipping program.", probe: "Crisp communication.",
          points: ["Status in one word with the date impact", "The cause in one line", "Options and the ask"],
          answer: "Example: 'Status: at risk, cluster acceptance moves from Mar 3 to Mar 17 unless we act. Cause: optics delivery slipped 2 weeks at the vendor. Ask: approve air-freighting the remaining optics ($X) to recover 10 days, or accept the new date.'",
          follow: ["What if you don't know the new date yet?"] },
        { topic: "Capacity", q: "How would you know a cluster is being used well after delivery?", probe: "Day 2 metrics.",
          points: ["Allocation vs actual utilization", "Goodput for big jobs", "Queue wait times", "Failure and repair rates", "Feedback from research teams"],
          answer: "Compare allocated versus actually used capacity, track goodput for large jobs, queue wait times, and failure and repair rates. And talk to the research teams, because the numbers can look fine while they're blocked.",
          follow: ["Utilization is 60%. Is that bad?"] }
      ],
      behavioral: [
        { q: "Tell me about a program that went wrong and what you learned.", story: "A real miss, owned honestly.", star: ["Program", "What went wrong", "Your part", "What you changed"] }
      ]
    }
  ]
});
