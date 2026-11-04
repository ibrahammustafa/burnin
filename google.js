/* Google pack: original practice questions. Not affiliated with Google. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Google",
  slug: "google",
  blurb: "Data center technicians and reliability engineers for the fleet behind Search, Cloud and TPUs.",
  values: [
    ["Comfort with ambiguity", "Show how you made progress without a full spec."],
    ["Bias to action", "You moved first and fixed forward."],
    ["Collaboration", "You made the people around you better."],
    ["Structured thinking", "Talk through problems step by step, out loud."],
    ["User focus", "Uptime and fixes framed around who was affected."]
  ],
  roles: [
    {
      id: "google-dc-tech",
      title: "Data Center Technician",
      family: "Data center ops",
      level: "Entry to mid",
      fit: 90,
      posting: "https://www.google.com/about/careers/applications/jobs/results/?q=data%20center%20technician",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Install, repair and maintain servers, networking and accelerators in a hyperscale fleet: break-fix, cabling, safety and process.",
      topics: ["Hardware", "Cabling", "Safety", "Process"],
      yourEdge: ["A repair you did fast without cutting corners.", "A time you followed a safety procedure under pressure.", "A process you improved for a repetitive task."],
      mc: [
        { topic: "Hardware", q: "What is a TPU?", o: ["A cooling unit", "Google's custom accelerator for machine learning", "A type of fiber connector", "A power distribution unit"], a: 1, why: "Tensor Processing Units are Google-designed chips for ML training and inference." },
        { topic: "Cabling", q: "A fiber link shows high errors after a reconnect. Most common cause?", o: ["Wrong VLAN", "A dirty connector end face", "Too much bandwidth", "DNS"], a: 1, why: "Contamination is the top cause of fiber problems. Inspect with a scope and clean before every mating." },
        { topic: "Safety", q: "Before working on equipment that could be energized, you:", o: ["Work fast", "Follow lockout/tagout and verify zero energy", "Ask a coworker to hold the breaker", "Wear rubber shoes only"], a: 1, why: "LOTO and verification prevent unexpected energization." },
        { topic: "Hardware", q: "Hot-swappable means:", o: ["The part runs hot", "You can replace it while the system stays powered and running", "It needs a reboot", "It's under warranty"], a: 1, why: "Drives, fans and PSUs are often hot-swappable in redundant designs." },
        { topic: "Process", q: "A repair ticket says replace DIMM in slot B2, but diagnostics flag slot B3. You:", o: ["Replace B2 as written", "Stop, verify with diagnostics and logs, and confirm with the ticket owner", "Replace both without telling anyone", "Close the ticket"], a: 1, why: "Verify before you act. Swapping the wrong part wastes time and spares." },
        { topic: "Process", q: "Why scan serial numbers of parts removed and installed?", o: ["For fun", "To keep inventory, warranty/RMA and failure tracking accurate", "It's faster than typing", "Only for audits"], a: 1, why: "Accurate records feed RMA, spares planning and failure analysis." }
      ],
      tech: [
        { topic: "Process", q: "You have 40 repair tickets and one shift. How do you plan it?", probe: "Prioritization and efficiency.",
          points: ["Sort by impact: capacity, customer-facing, redundancy already lost", "Group by location to cut walking", "Check parts availability first", "Batch similar repairs", "Escalate anything blocked early", "Update tickets as you go"],
          answer: "I sort by impact first: anything where redundancy is already lost or capacity is down goes to the top. Then I check parts so I'm not walking to a rack without the spare, and group the rest by row so I'm not crossing the floor 40 times. Similar repairs get batched. Anything blocked gets escalated at the start of the shift, not the end, and I update tickets as I close them.",
          follow: ["A high-priority ticket arrives mid-shift. What do you do?"] },
        { topic: "Hardware", q: "A server won't power on after a repair. Troubleshoot it.", probe: "Logical hardware isolation.",
          points: ["Check power: cords, PDU outlet, PSU LEDs", "Reseat what you touched", "Check BMC for errors and sensor readings", "Minimum config boot", "Swap with known-good parts", "Document and escalate with evidence"],
          answer: "Start with what changed: reseat everything I touched. Then power: cords, PDU outlet and PSU LEDs. The BMC usually tells you why it won't start, so I check its event log and sensors. If that's not clear, boot with a minimum configuration and add parts back, swapping in known-good spares to isolate. Whatever I find goes in the ticket.",
          follow: ["The BMC shows a voltage fault on one rail. Next?"] },
        { topic: "Cabling", q: "How do you keep cabling clean and correct at scale?", probe: "Standards discipline.",
          points: ["Follow the cabling plan and labeling standard", "Inspect and clean fiber before every connection", "Respect bend radius", "Verify link and neighbor after connecting", "Dress cables so airflow and service access stay clear"],
          answer: "Follow the plan and label standard exactly, inspect and clean every fiber end face before connecting, respect bend radius, and verify the link comes up to the right neighbor before I walk away. Good dressing keeps airflow and service access clear for the next tech.",
          follow: ["What's the cost of skipping the inspection step?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you had to learn something fast with no documentation.", story: "A new system, tool or part you figured out on your own.", star: ["What was unknown", "How you learned it", "What you built or fixed", "What you documented for others"] }
      ]
    },
    {
      id: "google-sre-systems",
      title: "Systems Engineer / SRE (Linux)",
      family: "Reliability",
      level: "Mid",
      fit: 65,
      posting: "https://www.google.com/about/careers/applications/jobs/results/?q=site%20reliability%20engineer",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Keep production services reliable: Linux troubleshooting, networking, SLOs, monitoring, incident response and postmortems.",
      topics: ["Linux", "Networking", "SLOs", "Incidents"],
      yourEdge: ["An outage you helped resolve.", "Automation that removed manual toil.", "A metric or alert you created that caught a real problem."],
      mc: [
        { topic: "Linux", q: "A 4-core server shows a load average of 12. What does that suggest?", o: ["It's idle", "Far more runnable or waiting tasks than cores: CPU or I/O contention", "It has 12 cores", "Memory is free"], a: 1, why: "Load counts tasks running or waiting (including on I/O). Check top, vmstat and iostat." },
        { topic: "Networking", q: "Which tool shows the DNS answer a resolver returns for a name?", o: ["ping", "dig", "traceroute", "chmod"], a: 1, why: "dig queries DNS directly and shows the answer, TTL and which server responded." },
        { topic: "Networking", q: "What's the order of the TCP handshake?", o: ["ACK, SYN, FIN", "SYN, SYN-ACK, ACK", "SYN, ACK, RST", "HELLO, ACK"], a: 1, why: "Client SYN, server SYN-ACK, client ACK." },
        { topic: "Incidents", q: "A service returns HTTP 503. Generally that means:", o: ["Not found", "Service unavailable: overloaded or no healthy backends", "Unauthorized", "Success"], a: 1, why: "503 points at capacity or health of the backend, not the client's request." },
        { topic: "SLOs", q: "An error budget is:", o: ["The money for outages", "The allowed amount of unreliability under the SLO", "A list of bugs", "Overtime pay"], a: 1, why: "If you've spent it, slow risky launches; if you haven't, you can move faster." },
        { topic: "Linux", q: "A process seems stuck. Which tool shows the system calls it's making?", o: ["strace", "lsblk", "uname", "crontab"], a: 0, why: "strace -p <pid> shows what it's waiting on, such as a read on a socket or file." }
      ],
      tech: [
        { topic: "Incidents", q: "A web service got slow 20 minutes ago. Walk me through it.", probe: "Calm, structured incident response.",
          points: ["Check what changed: deploys, config, traffic", "Golden signals: latency, traffic, errors, saturation", "Find the slow layer: frontend, backend, database, network", "Mitigate first: roll back, shift traffic, add capacity", "Communicate status", "Root cause and postmortem after"],
          answer: "First, what changed in the last 30 minutes: deploys, config pushes, traffic shifts. Then the golden signals, latency, traffic, errors and saturation, to find which layer is slow. If a recent change lines up, I mitigate first by rolling back or shifting traffic, and dig into root cause once users are okay. I keep a status update going the whole time, and a blameless postmortem follows.",
          follow: ["Rollback didn't help. Now what?"] },
        { topic: "SLOs", q: "Define an SLO for an internal file service and how you'd alert on it.", probe: "Practical SLO thinking.",
          points: ["Pick a user-facing indicator: success rate, latency at p99", "Target, e.g. 99.9% of requests succeed under 300 ms over 30 days", "Alert on burn rate, not single errors", "Fast-burn page, slow-burn ticket", "Review with users"],
          answer: "I'd measure what users feel: the share of requests that succeed in under, say, 300 ms. Target 99.9% over 30 days. Alerts fire on how fast the error budget is burning: a fast burn pages someone, a slow burn opens a ticket. That keeps pages rare and meaningful.",
          follow: ["Why not alert on every 5xx?"] },
        { topic: "Incidents", q: "What makes a good postmortem?", probe: "Learning culture.",
          points: ["Blameless", "Timeline with evidence", "Impact in user terms", "Root cause and contributing factors", "Action items with owners and dates", "Shared widely"],
          answer: "Blameless, with a clear timeline backed by evidence, impact in user terms, the root cause plus contributing factors, and action items with owners and dates. Then actually share it so other teams learn from it.",
          follow: ["How do you make sure action items get done?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you disagreed with a teammate on a technical approach.", story: "A real disagreement and how it resolved.", star: ["The disagreement", "How you made your case with data", "How it was decided", "What you learned"] }
      ]
    }
  ]
});
