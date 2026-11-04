/* Government contracting pack: original practice questions. Not affiliated with any agency or contractor. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Gov Contractors",
  slug: "gov",
  blurb: "Cleared network, systems and lab roles at defense and federal contractors: compliance, STIGs, RMF and secure facilities.",
  values: [
    ["Integrity", "Clearances depend on trust. Be precise and honest."],
    ["Compliance", "Show you follow security controls exactly."],
    ["Documentation", "If it's not written down, it didn't happen."],
    ["Mission focus", "Why the work matters to the end user."],
    ["Reliability", "Steady performance in constrained environments."]
  ],
  roles: [
    {
      id: "gov-cleared-netsys",
      title: "Cleared Network / Systems Engineer",
      family: "Networking",
      level: "Mid",
      fit: 80,
      posting: "https://www.clearancejobs.com/jobs?keywords=network%20engineer",
      postingLabel: "Search cleared roles",
      pay: "Varies by contract and clearance",
      summary: "Build and maintain networks and systems for defense and federal programs: STIG hardening, RMF documentation, patching, and DoD 8140 certifications.",
      topics: ["Clearances", "Compliance", "Hardening", "Operations"],
      yourEdge: ["Networks you configured and hardened.", "Documentation you kept for audits or change control.", "Certifications you hold or are working toward (Security+, CCNA)."],
      mc: [
        { topic: "Compliance", q: "Under DoD 8570/8140, which certification is the common baseline for many IT technical roles?", o: ["PMP", "CompTIA Security+", "Six Sigma", "Scrum Master"], a: 1, why: "Security+ is a widely accepted baseline; many contracts require it before day one." },
        { topic: "Hardening", q: "What is a STIG?", o: ["A cable type", "A DISA Security Technical Implementation Guide: a required secure configuration baseline", "A clearance level", "A ticket system"], a: 1, why: "STIGs are checked with tools like SCAP scanners and STIG Viewer." },
        { topic: "Compliance", q: "The NIST Risk Management Framework (RMF) steps are:", o: ["Plan, Do, Check, Act", "Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor", "Build, Test, Deploy", "Identify, Protect, Detect, Respond, Recover"], a: 1, why: "NIST SP 800-37 Rev. 2. The last option is the Cybersecurity Framework's functions." },
        { topic: "Compliance", q: "NIST SP 800-171 protects:", o: ["Classified data", "Controlled Unclassified Information (CUI) on contractor systems", "Public websites", "Personal email"], a: 1, why: "CMMC Level 2 aligns with the 110 controls in 800-171." },
        { topic: "Clearances", q: "Which is the correct order of US clearance levels, lowest to highest?", o: ["Secret, Confidential, Top Secret", "Confidential, Secret, Top Secret", "Top Secret, Secret, Confidential", "Public, Secret, Confidential"], a: 1, why: "SCI and special access are additional controls on top of Top Secret." },
        { topic: "Operations", q: "How are patches usually delivered to an air-gapped network?", o: ["Automatic internet updates", "Downloaded on a connected system, scanned and approved, then transferred on authorized media under procedure", "Over Wi-Fi", "Never patched"], a: 1, why: "Media transfer follows strict, documented procedures." }
      ],
      tech: [
        { topic: "Hardening", q: "Walk me through bringing a new server into STIG compliance.", probe: "Hands-on compliance work.",
          points: ["Pick the right STIG for the OS and applications", "Run a SCAP scan for a baseline", "Remediate findings, prioritizing CAT I", "Document exceptions with justification", "Rescan and save results as evidence", "Keep it compliant through change control"],
          answer: "Start with the right STIGs for the OS and applications, run a SCAP scan to get a baseline, and remediate in priority order with CAT I findings first. Anything that can't be fixed gets a documented exception with justification and approval. Rescan, save the results as evidence for the RMF package, and keep the system compliant through change control afterward.",
          follow: ["A STIG setting breaks the application. What do you do?"] },
        { topic: "Clearances", q: "You discover classified information on an unclassified system (a spillage). What do you do?", probe: "Security incident discipline.",
          points: ["Stop using the system; don't delete, forward or copy", "Isolate it as directed", "Report immediately to the security officer (FSO/ISSM)", "Follow their instructions", "Document what you observed"],
          answer: "Stop and don't touch it further: no deleting, forwarding or copying, because that spreads it. Report immediately to the security officer or ISSM and follow their direction on isolating the system. Write down exactly what I saw and when. Spillage is handled by the security team, not fixed quietly.",
          follow: ["A coworker says just delete it. Response?"] },
        { topic: "Operations", q: "How do you run change control in a regulated environment?", probe: "Process maturity.",
          points: ["Change request with risk and rollback", "Review board approval", "Scheduled window", "Implement per plan", "Verify and document", "Update system documentation and the RMF package if needed"],
          answer: "Every change gets a request with its purpose, risk and rollback plan, then goes to the change board for approval and a scheduled window. I implement exactly per plan, verify, and document the result. If it affects security posture, the system documentation and RMF package get updated too.",
          follow: ["An emergency change is needed at 2 a.m. How does that work?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you followed a rule you disagreed with.", story: "Compliance even when it was inconvenient.", star: ["The rule", "Why you disagreed", "What you did", "How you raised it properly"] }
      ]
    },
    {
      id: "gov-lab-dc-tech",
      title: "Cleared Data Center / Lab Technician",
      family: "Data center ops",
      level: "Entry to mid",
      fit: 85,
      posting: "https://www.clearancejobs.com/jobs?keywords=data%20center%20technician",
      postingLabel: "Search cleared roles",
      pay: "Varies by contract and clearance",
      summary: "Hardware, cabling and lab support in secure facilities: media handling, chain of custody, export-controlled data and documented procedures.",
      topics: ["Secure facilities", "Media handling", "Export control", "Hardware"],
      yourEdge: ["Data center or lab work with strict procedures.", "Asset tracking and inventory accuracy.", "Hardware repair and cabling."],
      mc: [
        { topic: "Secure facilities", q: "A SCIF is:", o: ["A cooling system", "A Sensitive Compartmented Information Facility, accredited for classified work", "A server brand", "A network switch"], a: 1, why: "SCIFs restrict personal electronics and control access." },
        { topic: "Media handling", q: "Which NIST guide covers sanitizing storage media before reuse or disposal?", o: ["SP 800-88", "SP 800-53", "SP 800-171", "SP 800-37"], a: 0, why: "800-88 defines Clear, Purge and Destroy." },
        { topic: "Media handling", q: "Chain of custody for a failed drive from a secure system means:", o: ["Shipping it to the vendor quickly", "Documenting every handoff so you can prove who had it and when until destruction", "Labeling it 'broken'", "Throwing it away"], a: 1, why: "Drives from secure systems usually can't be returned for RMA; they're destroyed under procedure." },
        { topic: "Export control", q: "ITAR controls:", o: ["Tax filing", "Export of defense-related articles, services and technical data", "Internet speeds", "Office supplies"], a: 1, why: "Sharing ITAR technical data with foreign persons can count as an export." },
        { topic: "Secure facilities", q: "Can you bring your personal phone into a SCIF?", o: ["Yes", "Generally no; follow the facility's rules and lockers outside", "Only on silent", "Only if off"], a: 1, why: "Personal electronics are typically prohibited." },
        { topic: "Hardware", q: "A cleared system's drive fails. What usually happens to it?", o: ["RMA to the vendor", "It's retained and sanitized or destroyed per policy, and the vendor gets a certificate instead of the drive", "Thrown away", "Reused elsewhere"], a: 1, why: "Many vendors offer 'keep your drive' service for this reason." }
      ],
      tech: [
        { topic: "Hardware", q: "Replace a failed server component in a secure facility. Walk me through it.", probe: "Procedure plus technical skill.",
          points: ["Follow the work order and escort rules", "Verify the right system and part", "Use approved spares only", "Handle removed media per policy", "Log everything: serials, times, people", "Verify the system and close the ticket"],
          answer: "Follow the work order and escort requirements, verify the exact system and part, and use only approved spares. Removed storage media is never shipped out; it goes into the sanitization or destruction process with chain of custody. I log serials, times and who was present, verify the system works, and close the ticket with the documentation.",
          follow: ["The spare part isn't on the approved list. What do you do?"] },
        { topic: "Export control", q: "A foreign national vendor engineer asks for a system diagram. What do you check?", probe: "Export-control awareness.",
          points: ["Is the information ITAR/EAR controlled?", "Is there a license or authorization?", "Ask the export compliance officer", "Don't share until cleared"],
          answer: "Before sharing anything I'd check whether the diagram is export-controlled and whether we have an authorization covering that person. If I'm not sure, I ask the export compliance officer and don't share until they approve. Getting this wrong can be a violation even if it seems harmless.",
          follow: ["The program manager says it's fine. Is that enough?"] },
        { topic: "Media handling", q: "Explain Clear, Purge and Destroy.", probe: "Media sanitization knowledge.",
          points: ["Clear: overwrite, protects against simple recovery", "Purge: makes lab recovery infeasible (crypto erase, degauss for magnetic)", "Destroy: shred, disintegrate, incinerate", "Choice depends on classification and media type"],
          answer: "From NIST 800-88: Clear overwrites data so normal tools can't recover it. Purge makes even lab-grade recovery infeasible, for example cryptographic erase or degaussing magnetic media. Destroy physically shreds or disintegrates the media. Which one applies depends on the data's sensitivity, the media type and the program's rules.",
          follow: ["Why doesn't degaussing work on SSDs?"] }
      ],
      behavioral: [
        { q: "Tell me about a time accuracy mattered more than speed.", story: "Inventory, documentation or procedure where details counted.", star: ["Situation", "What was at stake", "How you made sure", "Result"] }
      ]
    }
  ]
});
