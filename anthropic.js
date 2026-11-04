/* Anthropic pack: original practice questions. Not affiliated with Anthropic. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Anthropic",
  slug: "anthropic",
  blurb: "Infrastructure and compute programs across GPUs, TPUs and Trainium for an AI safety company.",
  values: [
    ["Mission and safety", "Why building AI responsibly matters to you."],
    ["Honesty", "Say what you don't know; own mistakes clearly."],
    ["Low ego, high ownership", "Do what the team needs."],
    ["Clear writing", "Explain technical work plainly."],
    ["Pragmatism", "The simplest thing that works."]
  ],
  roles: [
    {
      id: "anthropic-infra",
      title: "Infrastructure Engineer, Compute",
      family: "Infra automation",
      level: "Mid to senior",
      fit: 62,
      posting: "https://www.anthropic.com/jobs",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Run training and inference infrastructure across several accelerator platforms: Kubernetes, infrastructure as code, observability and reliability.",
      topics: ["Accelerators", "Kubernetes", "Infrastructure as code", "Reliability"],
      yourEdge: ["Infrastructure you automated end to end.", "A reliability improvement with numbers.", "Working across different hardware platforms."],
      mc: [
        { topic: "Accelerators", q: "Anthropic has said it trains and runs models on which accelerator families?", o: ["Only CPUs", "NVIDIA GPUs, Google TPUs and AWS Trainium", "Only FPGAs", "Only Apple silicon"], a: 1, why: "Anthropic has publicly described using multiple platforms across cloud providers." },
        { topic: "Infrastructure as code", q: "Terraform is used to:", o: ["Monitor GPUs", "Declare cloud infrastructure as code and apply changes reproducibly", "Write Python tests", "Compress logs"], a: 1, why: "terraform plan shows the diff before apply." },
        { topic: "Kubernetes", q: "Which Kubernetes object keeps a set number of identical pods running?", o: ["Deployment", "ConfigMap", "Secret", "Namespace"], a: 0, why: "A Deployment manages a ReplicaSet to maintain the desired replica count." },
        { topic: "Reliability", q: "'Blast radius' refers to:", o: ["Explosion safety", "How much of the system a single failure or bad change can affect", "Network range", "GPU heat"], a: 1, why: "Cells, staged rollouts and isolation keep it small." },
        { topic: "Reliability", q: "Before a risky infrastructure change, the best practice is:", o: ["Apply everywhere at once", "Review the plan, canary it, and have a tested rollback", "Do it Friday night", "Skip review if urgent"], a: 1, why: "Small, reversible steps." },
        { topic: "Kubernetes", q: "Requests vs limits in Kubernetes:", o: ["The same thing", "Requests are what the scheduler reserves; limits are the hard cap at runtime", "Limits reserve resources", "Neither affects scheduling"], a: 1, why: "Memory over the limit gets the container OOM-killed." }
      ],
      tech: [
        { topic: "Accelerators", q: "How would you operate workloads across three different accelerator platforms?", probe: "Abstraction and pragmatism.",
          points: ["Common layer for scheduling, monitoring and deployment where possible", "Platform-specific health checks and telemetry", "Capacity view across platforms", "Same runbooks and SLOs; platform-specific details inside", "Avoid over-abstracting what truly differs"],
          answer: "Share what can be shared: one way to deploy, schedule, monitor and page, with the same SLOs and runbook structure. Keep platform-specific parts where they really differ: health checks, telemetry sources and failure modes for each accelerator. A single capacity view across all three helps decide where work runs. The mistake to avoid is forcing an abstraction that hides important differences.",
          follow: ["One platform has much worse failure rates. What do you do?"] },
        { topic: "Reliability", q: "A config change took down a service in one region. Walk through response and prevention.", probe: "Incident and change management.",
          points: ["Roll back first", "Communicate", "Confirm recovery", "Postmortem: why review and canary didn't catch it", "Add tests, staged rollout or validation", "Smaller blast radius"],
          answer: "Roll back immediately, communicate, and confirm recovery. Then a blameless postmortem asking why review and canarying didn't catch it. Fixes usually mean a validation check on that config, a slower staged rollout, or splitting the system so one change can't take out a whole region.",
          follow: ["Rollback isn't possible. Now what?"] },
        { topic: "Infrastructure as code", q: "Someone made manual changes in the cloud console. Why is that a problem and how do you prevent it?", probe: "IaC discipline.",
          points: ["Drift from the declared state", "Next apply may revert or conflict", "No review or audit trail", "Detect drift with plan in CI", "Restrict console write access", "Make the right path easy"],
          answer: "Manual changes drift from the code, so the next apply either reverts them or conflicts, and there's no review or history. I'd run plan in CI to detect drift, restrict console write access, and make the code path easy enough that nobody needs a shortcut.",
          follow: ["What about emergencies?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you were wrong and how you handled it.", story: "Honesty over ego.", star: ["What you believed", "How you found out", "What you did", "What changed"] }
      ]
    },
    {
      id: "anthropic-tpm-compute",
      title: "Technical Program Manager, Compute",
      family: "Program management",
      level: "Senior",
      fit: 55,
      posting: "https://www.anthropic.com/jobs",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Coordinate compute capacity across cloud partners: delivery schedules, capacity planning, cross-team programs and clear written updates.",
      topics: ["Capacity", "Partners", "Planning", "Writing"],
      yourEdge: ["Coordinating with an external partner on a deadline.", "A forecast or plan you built.", "A written update that drove a decision."],
      mc: [
        { topic: "Capacity", q: "Compute bought from cloud partners differs from owned data centers mainly in:", o: ["Nothing", "Less control over hardware and timing, more dependence on partner commitments and contracts", "It's always cheaper", "No planning needed"], a: 1, why: "Programs then hinge on partner delivery and clear contracts." },
        { topic: "Planning", q: "A RACI 'A' means:", o: ["Assigned, many people", "Accountable, exactly one person", "Advisor", "Approver, at least two"], a: 1, why: "One accountable owner per deliverable." },
        { topic: "Partners", q: "A partner's delivery date keeps moving. Best approach:", o: ["Accept each slip", "Track commitments in writing, ask for root cause and recovery plans, and escalate per the agreement", "Stop talking to them", "Build your own data center tomorrow"], a: 1, why: "Written commitments and escalation paths." },
        { topic: "Writing", q: "A strong written project update:", o: ["Is long and complete", "States status and decisions needed first, then details", "Avoids bad news", "Uses lots of jargon"], a: 1, why: "Readers skim; lead with what matters." },
        { topic: "Capacity", q: "Which helps most in deciding where a new workload runs?", o: ["Gut feel", "A capacity view across platforms with availability, cost and fit for the workload", "Alphabetical order", "Whoever asks loudest"], a: 1, why: "Data-driven placement." },
        { topic: "Planning", q: "Buffer in a schedule should go:", o: ["Evenly everywhere", "Where uncertainty and risk are highest", "Only at the end", "Nowhere"], a: 1, why: "Buffer is protection for the riskiest steps." }
      ],
      tech: [
        { topic: "Capacity", q: "How would you build a quarterly compute capacity plan?", probe: "Planning across demand and supply.",
          points: ["Demand from teams with priorities", "Supply: committed partner deliveries by date and platform", "Gap analysis", "Scenarios: delays, demand spikes", "Decisions needed", "Review cadence"],
          answer: "Gather demand from each team with priority and timing, then lay supply against it: committed deliveries by date and platform. The gap analysis shows shortfalls and surpluses. I'd model a couple of scenarios like a partner delay or a demand spike, list the decisions leadership needs to make, and review it on a fixed cadence.",
          follow: ["Demand is 30% above supply. What do you recommend?"] },
        { topic: "Writing", q: "Write a short update announcing a 2-week compute delay.", probe: "Clear, honest writing.",
          points: ["Lead with the impact and new date", "Cause in one sentence", "Who is affected", "Mitigation and decisions needed", "Next update date"],
          answer: "Example: 'The new cluster will be ready Apr 14, two weeks later than planned, because a partner's power work slipped. Teams A and B are affected. We can move B's evaluation runs to existing capacity this week; A needs to choose between waiting or a smaller allocation by Friday. Next update Thursday.'",
          follow: ["How do you write it when the cause is your own team's mistake?"] },
        { topic: "Partners", q: "How do you run a weekly sync with a major partner so it's useful?", probe: "Meeting discipline.",
          points: ["Shared tracker of commitments", "Agenda: risks and blockers first", "Decisions and owners recorded", "Escalations flagged early", "Short written recap"],
          answer: "Keep one shared tracker of commitments both sides see. The agenda starts with risks and blockers, not status reading. Every decision gets an owner and date, escalations get flagged early, and a short written recap goes out the same day.",
          follow: ["The partner keeps sending different people. What do you do?"] }
      ],
      behavioral: [
        { q: "Why do you want to work at an AI safety company?", story: "An honest answer, not a slogan.", star: ["What you care about", "Relevant experience", "What you'd contribute", "Questions you'd ask them"] }
      ]
    }
  ]
});
