/* Apple pack: original practice questions. Not affiliated with Apple. */
window.BURNIN_PACKS = window.BURNIN_PACKS || [];
window.BURNIN_PACKS.push({
  company: "Apple",
  slug: "apple",
  blurb: "Wireless, hardware test and lab roles behind iPhone, Mac and accessories.",
  values: [
    ["Attention to detail", "Small defects matter. Show how you catch what others miss."],
    ["Discretion", "Unreleased products. Show you can work on need-to-know projects."],
    ["Ownership", "Directly responsible individuals. Name what you owned end to end."],
    ["User focus", "Tie test results to what a customer would actually feel."],
    ["Cross-functional work", "Hardware, software, firmware and partners in one loop."]
  ],
  roles: [
    {
      id: "apple-wireless-test",
      title: "Wireless Test Engineer, Wi-Fi & Bluetooth",
      family: "Wireless test",
      level: "Mid",
      fit: 90,
      posting: "https://jobs.apple.com/en-us/search?search=wireless%20test",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Validate Wi-Fi and Bluetooth on devices and accessories: interop, throughput, roaming, audio profiles, sniffer captures and clear bug reports.",
      topics: ["802.11", "Bluetooth", "Throughput", "Debug"],
      yourEdge: [
        "A wireless bug you root-caused from an over-the-air capture.",
        "An interop matrix you ran against third-party devices or accessories.",
        "A throughput or range test you designed, with the numbers."
      ],
      mc: [
        { topic: "Bluetooth", q: "Which Bluetooth profile streams stereo music to headphones or a car?", o: ["HFP", "A2DP", "AVRCP", "HID"], a: 1, why: "A2DP carries high-quality audio. HFP is hands-free calling, AVRCP is remote control (play/pause, track info)." },
        { topic: "Bluetooth", q: "Play and pause buttons on a car's steering wheel control the phone through which profile?", o: ["AVRCP", "A2DP", "PAN", "SPP"], a: 0, why: "AVRCP is the Audio/Video Remote Control Profile." },
        { topic: "802.11", q: "What does WPA3-Personal use instead of the WPA2 pre-shared key exchange?", o: ["WEP", "SAE (Simultaneous Authentication of Equals)", "TKIP", "Open authentication"], a: 1, why: "SAE resists offline dictionary attacks. The 4-way handshake still follows to derive session keys." },
        { topic: "802.11", q: "A 5 GHz access point suddenly switches channels and clients briefly drop. A likely cause?", o: ["DFS: the AP detected radar and had to vacate the channel", "The client's battery is low", "WPA3 rekeying", "DNS timeout"], a: 0, why: "DFS channels require APs to monitor for radar and move when it's detected." },
        { topic: "Throughput", q: "With iPerf3, which flag makes the server send to the client to test the download direction?", o: ["-u", "-R", "-P", "-t"], a: 1, why: "-R reverses direction. -u is UDP, -P is parallel streams, -t is test duration." },
        { topic: "Throughput", q: "A client shows RSSI of -82 dBm and throughput is low. Most likely explanation?", o: ["Weak signal forcing a low MCS rate", "Too much RAM", "The AP uses WPA3", "The test used TCP"], a: 0, why: "At very low RSSI the link drops to robust, slow modulation rates. Check distance, orientation, antennas and interference." }
      ],
      tech: [
        { topic: "Throughput", q: "Write a Wi-Fi throughput test plan for a new device.", probe: "Structured, repeatable RF testing.",
          points: ["Controlled environment: shielded or RF chamber, known AP, fixed channel and bandwidth", "Baseline against a reference device", "Matrix: bands (2.4/5/6 GHz), bandwidths, MCS, distances or attenuation steps", "TCP and UDP, both directions, multiple runs", "Rate vs range curve with attenuation", "Pass/fail against spec or reference, with logs saved per run"],
          answer: "Start controlled: an RF chamber or shielded room, a known access point locked to a channel and bandwidth, and a reference device for baseline. Then build a matrix across bands, bandwidths and attenuation steps to get a rate-versus-range curve, running iPerf3 TCP and UDP in both directions several times per point. Every run saves logs and the device's link stats (RSSI, MCS, retries). Pass/fail compares against the spec and the reference device, so a regression shows up as a number, not a feeling.",
          follow: ["Results vary 20% run to run. What do you check?"] },
        { topic: "Bluetooth", q: "Users report Bluetooth audio drops in one car model. How do you debug it?", probe: "Interop debugging with logs and isolation.",
          points: ["Reproduce: same car model, head unit firmware, phone OS", "Capture HCI logs on the phone and an air sniffer if possible", "Check for Wi-Fi coexistence on 2.4 GHz, codec negotiation, link supervision timeouts", "Compare with other phones on the same car", "Isolate whether phone stack or head unit is at fault", "File a clear bug with logs and repro steps"],
          answer: "First reproduce it with the same car model, head unit firmware and phone OS. Then capture HCI logs on the phone and, if available, an over-the-air sniffer. I look for codec renegotiation, link supervision timeouts, and Wi-Fi coexistence pressure on 2.4 GHz. Testing other phones on the same car tells me whether it's our stack or the head unit. The bug report gets the logs, the exact repro and which side I believe owns it.",
          follow: ["The head unit vendor says it's your bug. What do you send them?"] },
        { topic: "Debug", q: "How do you capture and analyze Wi-Fi traffic over the air?", probe: "Practical sniffing skill.",
          points: ["Sniffer in monitor mode on the same channel and bandwidth", "Capture association, 4-way handshake and data frames", "Decrypt with the passphrase plus captured handshake if needed", "Wireshark filters such as wlan.fc.type_subtype and eapol", "Look at retries, rates, deauth reasons and timing"],
          answer: "Put a sniffer interface in monitor mode on the device's channel and bandwidth, then capture from before association so I get the handshake. In Wireshark I filter for management frames and EAPOL, check deauth and disassoc reason codes, and look at retry rates and data rates. If the network is encrypted, adding the passphrase plus the captured handshake lets Wireshark decrypt data frames.",
          follow: ["Why might your sniffer miss frames the device actually sent?"] }
      ],
      behavioral: [
        { q: "Tell me about working on something confidential.", story: "A project where you couldn't share details with friends or other teams.", star: ["What it was (at a high level)", "How you protected it", "How you still collaborated", "Result"] }
      ]
    },
    {
      id: "apple-hw-test",
      title: "Hardware Test Engineer / Lab Technician",
      family: "Hardware test",
      level: "Entry to mid",
      fit: 85,
      posting: "https://jobs.apple.com/en-us/search?search=hardware%20test%20lab",
      postingLabel: "Search open roles",
      pay: "Varies by level",
      summary: "Build and run hardware test setups through EVT, DVT and PVT: fixtures, rework, instruments, inventory and failure triage.",
      topics: ["Product phases", "Lab practice", "Instruments", "Failure analysis"],
      yourEdge: [
        "A fixture or testbed you built and what it improved.",
        "A failure you traced to a component or assembly issue.",
        "How you kept a lab's inventory or calibration in order."
      ],
      mc: [
        { topic: "Product phases", q: "Which build phase uses production-intent parts to prove the design meets spec?", o: ["Proto", "EVT", "DVT", "MP"], a: 2, why: "DVT validates the design against spec with production-intent parts. EVT proves the engineering design works; PVT proves the line." },
        { topic: "Lab practice", q: "Before handling a bare PCBA, what's the essential precaution?", o: ["Wear gloves only", "Use a grounded ESD wrist strap and mat", "Cool the board", "Remove the battery from your phone"], a: 1, why: "Static discharge can damage parts without visible signs." },
        { topic: "Instruments", q: "You need to see a glitch on a signal that lasts a few nanoseconds. Which tool?", o: ["Multimeter", "Oscilloscope", "Clamp meter", "Label printer"], a: 1, why: "A multimeter averages; a scope shows the waveform over time." },
        { topic: "Lab practice", q: "Reworking an 0201 component is best done with:", o: ["A soldering gun and no magnification", "Hot air or fine-tip iron under a microscope", "A heat gun from 30 cm away", "Glue"], a: 1, why: "0201 parts are about 0.6 × 0.3 mm. Magnification and controlled heat are required." },
        { topic: "Failure analysis", q: "First-pass yield is:", o: ["Units shipped per day", "The share of units that pass test the first time without rework", "Total units built", "Average test time"], a: 1, why: "FPY shows how clean the build and test process is." },
        { topic: "Instruments", q: "Why do test instruments have calibration due dates?", o: ["For warranty only", "So measurements stay traceable and accurate; out-of-cal data may be invalid", "Because batteries expire", "To limit who can use them"], a: 1, why: "Results taken on an out-of-calibration instrument may need to be repeated." }
      ],
      tech: [
        { topic: "Failure analysis", q: "A board fails functional test intermittently. Walk me through finding the cause.", probe: "Methodical isolation.",
          points: ["Confirm the failure and its rate; collect serials and logs", "Look for patterns: lot, station, operator, temperature, time", "Swap: move the board to another station, a good board to this station", "Inspect: visual, X-ray, reflow issues, connector damage", "Narrow to component with measurements or substitution", "Document and feed back to the line"],
          answer: "First I confirm it and measure how often it happens, recording serials and logs. Then I look for patterns across lot, test station, operator and temperature, because intermittent usually means something varies. Swapping a known-good board onto the station and the bad board onto another station separates the board from the fixture. Then inspection and measurements to narrow to a component or joint, and the result goes back to the line with a fix.",
          follow: ["It only fails when warm. What next?"] },
        { topic: "Lab practice", q: "How would you organize a lab's inventory and equipment so nothing goes missing?", probe: "Process discipline.",
          points: ["One system of record with asset tags or barcodes", "Check-in and check-out for devices and instruments", "Calibration schedule with alerts", "Labeled storage locations", "Regular audits", "Clear ownership"],
          answer: "One system of record with every device and instrument tagged, check-in and check-out so you always know who has what, labeled storage locations, and a calibration schedule that alerts before things go out of date. A short weekly audit catches drift early.",
          follow: ["How do you get engineers to actually use it?"] },
        { topic: "Product phases", q: "What changes in your work between EVT, DVT and PVT?", probe: "NPI awareness.",
          points: ["EVT: bring-up, functional bugs, lots of rework", "DVT: spec margins, stress, environmental, reliability", "PVT: line test coverage, yield, process issues", "Volume of units and documentation rises each phase"],
          answer: "EVT is bring-up and finding functional bugs, with a lot of rework and quick experiments. DVT is about proving margins: stress, environmental and reliability tests on production-intent parts. PVT moves to the factory line, so the focus is test coverage, yield and process issues. Unit counts and the need for documentation go up at each phase.",
          follow: ["What would make you block a phase exit?"] }
      ],
      behavioral: [
        { q: "Tell me about a time you found a problem nobody else noticed.", story: "A defect, data anomaly or setup error you caught.", star: ["What you noticed", "How you proved it", "Who you told", "What changed"] }
      ]
    }
  ]
});
