/**
 * Private Wiki Configuration
 * ===========================
 * 4-tier password system with layered content
 * Passwords: test1, test2, test3, test4
 */

const WIKI_CONFIG = {
    // ========== Site Info ==========
    siteName: "Hoffmann Family Archives",
    siteSubtitle: "Private Document Repository",
    siteDescription: "Internal archive of the Hoffmann family. Some content requires authorised access.",
    lastUpdated: "10 November 2024",

    // ========== Password Tiers ==========
    // Each tier unlocks progressively deeper content
    tiers: [
        {
            id: 1,
            password: "test1",
            label: "Level 1 — Personal",
            unlockMessage: "Level 1 access granted — Personal files unlocked"
        },
        {
            id: 2,
            password: "test2",
            label: "Level 2 — Confidential",
            unlockMessage: "Level 2 access granted — Confidential files unlocked"
        },
        {
            id: 3,
            password: "test3",
            label: "Level 3 — Top Secret",
            unlockMessage: "Level 3 access granted — Top secret files unlocked"
        },
        {
            id: 4,
            password: "test4",
            label: "Level 4 — Black Archive",
            unlockMessage: "Level 4 access granted — ⚠ BLACK ARCHIVE unlocked"
        }
    ],

    // ========== Public Entries (no password) ==========
    publicEntries: [
        {
            id: "family-overview",
            title: "Family Overview",
            category: "General",
            lastModified: "15 August 2024",
            content: `
                <p>The Hoffmann family is one of Europe's most prominent industrial dynasties, originating from the Bavarian region of Germany in the 19th century.</p>

                <h3>Family Business</h3>
                <p>The core family enterprise is steel manufacturing and heavy industry, with factories and offices across multiple European countries. Estimated total family assets exceed €1.2 billion.</p>

                <h3>Family Members</h3>
                <ul>
                    <li><strong>Heinrich Hoffmann</strong> — Current patriarch, Chairman of the Board</li>
                    <li><strong>Margarete Hoffmann</strong> — Heinrich's wife (deceased, 2008)</li>
                    <li><strong>Lucio</strong> — Only son, pianist</li>
                </ul>

                <h3>Family Motto</h3>
                <p><em>"Stärke durch Einheit"</em> — Strength through Unity</p>
            `
        },
        {
            id: "heinrich",
            title: "Heinrich Hoffmann",
            category: "Personnel",
            lastModified: "3 September 2024",
            content: `
                <div class="info-card">
                    <p><strong>Born:</strong> 22 April 1958</p>
                    <p><strong>Position:</strong> Chairman & CEO, Hoffmann Industrial Group</p>
                    <p><strong>Residence:</strong> Munich, Germany</p>
                </div>

                <h3>Biography</h3>
                <p>Heinrich took control of the family business from his father in 1982. Under his leadership, Hoffmann Industrial expanded nearly tenfold. Known for his iron-fisted management style, he has been nicknamed "The Steel Wolf" in business circles.</p>
                <p>As a child, Heinrich showed considerable aptitude for music, particularly piano. However, his father insisted he pursue business. Heinrich has spoken publicly about this as <strong>"the great regret of my life"</strong> and has channelled enormous resources into his son's musical career, reportedly spending over €20 million on private venues, tutors, and career management.</p>

                <h3>Family</h3>
                <p>Married Margarete in 1990. Their only son, Lucio, was born in 1996. Margarete passed away from illness in 2008. Heinrich has not remarried.</p>

                <h3>Controversies</h3>
                <p>The strained relationship between Heinrich and Lucio has long been a subject of media attention. Sources suggest the tension is not about rejection of the family business, but rather about <strong>Heinrich's obsessive investment in his son's musical career</strong> and his refusal to accept any criticism of Lucio's abilities.</p>

                <div class="restricted-notice">
                    <p>🔒 <strong>Further details require Level 1 access</strong></p>
                </div>
            `
        },
        {
            id: "luxiu",
            title: "Lucio",
            category: "Personnel",
            lastModified: "20 October 2024",
            content: `
                <div class="info-card">
                    <p><strong>Born:</strong> 12 March 1996</p>
                    <p><strong>Occupation:</strong> Pianist</p>
                    <p><strong>Residence:</strong> Vienna, Austria</p>
                </div>

                <h3>Musical Career</h3>
                <p>Lucio began learning piano at age 5 and held his first solo recital at 18 in a private venue arranged by his father. He has been described as a "rising star" by select media outlets, though he has consistently avoided large public performances and professional competitions.</p>

                <h3>Performance Style</h3>
                <p>In recent years, Lucio has exclusively performed at private, salon-style recitals across Europe. He has stated that "music should touch the soul, not fill stadiums."</p>

                <h3>Notable Works</h3>
                <ul>
                    <li><em>Whispers of the Night</em> (2024)</li>
                    <li><em>The Forgotten Waltz</em> (2023)</li>
                    <li><em>Moonlit Monologue</em> (2022)</li>
                </ul>

                <div class="restricted-notice">
                    <p>🔒 <strong>Detailed personal file requires Level 1 access</strong></p>
                </div>
            `
        },
        {
            id: "estate",
            title: "Vienna Residence",
            category: "Assets",
            lastModified: "8 July 2024",
            content: `
                <h3>Location</h3>
                <p>Located in Vienna's 1st District (Innere Stadt), near St. Stephen's Cathedral.</p>

                <h3>Details</h3>
                <p>This 19th-century historic building was purchased by Heinrich on Lucio's behalf in 2019 and meticulously restored to serve as his primary residence.</p>
                <p>The residence contains a professional-grade recording studio and a 1920s Steinway grand piano.</p>

                <div class="restricted-notice">
                    <p>🔒 <strong>Address details and floor plans require Level 1 access</strong></p>
                </div>
            `
        }
    ],

    // ========== Tier 1 Entries (password: test1) ==========
    tier1Entries: [
        {
            id: "luxiu-detailed",
            title: "Lucio — Extended Personal File",
            category: "Restricted",
            classification: "PERSONAL",
            lastModified: "5 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge">PERSONAL</span>
                    <span>Access log enabled</span>
                </div>

                <h3>Psychological Assessment Summary</h3>
                <p>Per the 2023 psychological evaluation, Lucio exhibits signs of mild dissociative episodes and identity confusion. He frequently reports <strong>gaps in memory surrounding his compositional process</strong>, describing completed works appearing "as if by magic" overnight.</p>
                <p>The assessing physician, Dr. Karl Brandt (retained by Heinrich Hoffmann), attributed these episodes to "hypnagogic creativity" and recommended no further investigation. <em>Note: Dr. Brandt's objectivity has been questioned internally.</em></p>

                <h3>Financial Overview</h3>
                <ul>
                    <li>Trust fund (maternal inheritance): ~€35 million</li>
                    <li>Personal assets: ~€8 million</li>
                    <li>Annual income (performances): ~€120,000</li>
                    <li><strong>Annual expenditure on career (paid by Heinrich): ~€3.2 million</strong></li>
                </ul>
                <p><em>Note: Lucio voluntarily relinquished inheritance rights to the family business but retains full rights to his mother's estate.</em></p>

                <h3>Key Relationships</h3>
                <table class="data-table">
                    <tr><th>Name</th><th>Relation</th><th>Notes</th></tr>
                    <tr><td>Heinrich Hoffmann</td><td>Father</td><td>Relationship complex; Heinrich funds career obsessively</td></tr>
                    <tr><td>Prof. Hans Weber</td><td>Mentor</td><td>Vienna Conservatory; has privately expressed doubts about Lucio's technical ability</td></tr>
                    <tr><td>Elena Petrova</td><td>Ex-girlfriend</td><td>Russian violinist, separated 2022. Told friends Lucio "plays like a different person at night"</td></tr>
                    <tr><td>Maximilian Stein</td><td>Personal assistant</td><td>Employed since 2020, reports directly to Heinrich</td></tr>
                </table>

                <h3>Recent Schedule (expired)</h3>
                <ul>
                    <li>28 October — Prague private recital</li>
                    <li>5 November — Return to Vienna</li>
                    <li>14 November — Scheduled meeting with family lawyer (cancelled)</li>
                </ul>
            `
        },
        {
            id: "estate-detailed",
            title: "Vienna Residence — Full Details",
            category: "Restricted",
            classification: "PERSONAL",
            lastModified: "20 June 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge">PERSONAL</span>
                    <span>Access log enabled</span>
                </div>

                <h3>Address</h3>
                <p><strong>Domgasse 5, 1010 Wien, Österreich</strong></p>
                <p>(Domgasse 5, Vienna 1st District)</p>

                <h3>Building Details</h3>
                <ul>
                    <li>Year built: 1872</li>
                    <li>Floor area: ~420 m²</li>
                    <li>Floors: 4 (Lucio occupies the top two)</li>
                    <li>Contains: soundproofed practice room, recording studio, study</li>
                </ul>

                <h3>Security System</h3>
                <ul>
                    <li>24-hour CCTV surveillance</li>
                    <li>Biometric access (fingerprint + facial recognition)</li>
                    <li>Emergency alert system (direct link to local police)</li>
                </ul>
                <p><em>Security codes rotated monthly, managed by personal assistant.</em></p>

                <h3>Anomaly Report</h3>
                <p>Building maintenance staff reported hearing <strong>piano music from the practice room between 2-4am on multiple occasions</strong>, despite Lucio's bedroom door being locked from inside. Lucio denies any knowledge of nighttime playing. Security footage from these periods shows <strong>intermittent static and data corruption</strong>.</p>
            `
        },
        {
            id: "incident-report",
            title: "Incident Report #2024-1108",
            category: "Restricted",
            classification: "PERSONAL",
            lastModified: "12 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge">PERSONAL</span>
                    <span>Authorised personnel only</span>
                </div>

                <h3>Incident Summary</h3>
                <p><strong>Date:</strong> 8 November 2024</p>
                <p><strong>Location:</strong> Vienna residence</p>
                <p><strong>Reported by:</strong> Maximilian Stein</p>

                <h3>Details</h3>
                <p>On 8 November, Stein arrived at the residence at the scheduled time and found Lucio in an abnormally distressed state. Observations:</p>
                <ul>
                    <li>Numerous crumpled papers found in the study — appeared to be unfinished letter drafts</li>
                    <li>The piano lid had been closed for over three days (extremely unusual)</li>
                    <li>Lucio stated: <strong>"Everything is about to end"</strong> but refused to elaborate</li>
                    <li>Lucio also said: "The music isn't mine. It was never mine. I think I've always known."</li>
                </ul>

                <h3>Follow-up</h3>
                <p>Stein recommended Lucio contact a mental health professional. Lucio refused.</p>
                <p>10 November — Lucio cancelled his 15 November meeting with the family lawyer.</p>

                <div class="warning-box">
                    <p>⚠️ <strong>Note:</strong> This report was completed BEFORE the events of 14 November. It has since been transferred to relevant authorities.</p>
                </div>
            `
        }
    ],

    // ========== Tier 2 Entries (password: test2) ==========
    tier2Entries: [
        {
            id: "ghostwriter",
            title: "CONFIDENTIAL: Composition Authenticity Investigation",
            category: "Confidential",
            classification: "CONFIDENTIAL",
            lastModified: "1 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge warning">CONFIDENTIAL</span>
                    <span>Internal investigation — do not distribute</span>
                </div>

                <h3>Background</h3>
                <p>In September 2024, an internal audit triggered by insurance claims revealed significant discrepancies in the provenance of Lucio's published compositions.</p>

                <h3>Key Findings</h3>
                <ul>
                    <li>Handwriting analysis of original manuscripts reveals <strong>two distinct hands</strong> — one matching Lucio, the other unknown</li>
                    <li>The "unknown hand" is responsible for all technically complex passages and the majority of harmonic structures</li>
                    <li>Lucio's own compositional attempts (identified by his hand) are described by analysts as <strong>"competent but unremarkable, consistent with an advanced amateur"</strong></li>
                    <li>Multiple manuscripts show Lucio's handwriting layered ON TOP of the unknown hand, as if retracing</li>
                </ul>

                <h3>The "Sleepwalking" Narrative</h3>
                <p>Heinrich Hoffmann has maintained to his son that the unknown manuscripts are Lucio's own subconscious work, produced during episodes of sleepwalking or hypnagogic states. A physician retained by Heinrich, Dr. Karl Brandt, has provided supporting documentation for this explanation.</p>
                <p><strong>However, Dr. Brandt's medical licence was suspended in 2021 for falsifying patient records in an unrelated case.</strong> His involvement raises serious questions about the legitimacy of this narrative.</p>

                <h3>The Unknown Composer</h3>
                <p>The true author of the compositions remains unidentified. Stylistic analysis suggests the unknown composer is:</p>
                <ul>
                    <li>Exceptionally gifted, likely trained from very early childhood</li>
                    <li>Familiar with tactile/Braille musical notation systems</li>
                    <li>Likely <strong>visually impaired</strong>, based on spatial patterns in the manuscript layout</li>
                </ul>

                <div class="restricted-notice">
                    <p>🔒 <strong>Identity of the composer requires Level 3 access</strong></p>
                </div>
            `
        },
        {
            id: "emil-basic",
            title: "Subject File: 'Emil' (No Surname)",
            category: "Confidential",
            classification: "CONFIDENTIAL",
            lastModified: "28 October 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge warning">CONFIDENTIAL</span>
                    <span>Restricted access</span>
                </div>

                <h3>Subject Overview</h3>
                <div class="info-card">
                    <p><strong>Known as:</strong> Emil (no registered surname)</p>
                    <p><strong>Born:</strong> ~1997 (exact date unknown)</p>
                    <p><strong>Status:</strong> Visually impaired from birth (bilateral anophthalmia)</p>
                    <p><strong>Nominal relation:</strong> Listed in some documents as Heinrich Hoffmann's illegitimate son</p>
                    <p><strong>Actual relation:</strong> None. Emil himself has never acknowledged this claim.</p>
                </div>

                <h3>Background</h3>
                <p>Emil was placed in Heinrich Hoffmann's care through unclear circumstances approximately in 2005. He has been described by those who met him as a <strong>piano prodigy of extraordinary ability</strong>, capable of composing complex works entirely by ear and through Braille notation.</p>

                <h3>Living Conditions</h3>
                <p>Emil has been housed in a <strong>soundproofed annex</strong> attached to one of the Hoffmann family's properties. He has had <strong>no public presence, no official identity documents, and no contact with the outside world</strong> beyond Hoffmann-controlled staff.</p>
                <p>When questioned about this arrangement, Heinrich stated that Emil "prefers solitude" and that the arrangement was "for his own protection."</p>

                <h3>Musical Output</h3>
                <p>A comparison of Emil's known compositions with Lucio's published works shows a <strong>near-perfect match</strong> in harmonic language, structural patterns, and stylistic fingerprints.</p>

                <div class="warning-box">
                    <p>⚠️ <strong>Implication:</strong> Emil appears to be the true author of all major works attributed to Lucio.</p>
                </div>

                <div class="restricted-notice">
                    <p>🔒 <strong>Full medical records and fate of subject require Level 3 access</strong></p>
                </div>
            `
        },
        {
            id: "draft-will",
            title: "Unsigned Draft Will — Found in Study",
            category: "Legal",
            classification: "CONFIDENTIAL",
            lastModified: "10 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge warning">CONFIDENTIAL</span>
                    <span>Legally sensitive document</span>
                </div>

                <h3>Document Description</h3>
                <p>The following is a transcription of a handwritten draft will found in Lucio's study. It is UNSIGNED and holds no legal force. The original has been secured by the family's legal counsel.</p>

                <div class="document-box">
                    <p><em>To whom it may concern:</em></p>
                    <p><em>If you are reading this, I am no longer here.</em></p>
                    <p><em>I leave all rights to my musical works to the Vienna Conservatory, to support the development of young musicians.</em></p>
                    <p><em>My personal belongings, including the Steinway, I leave to Professor Weber. He will know how to keep it singing.</em></p>
                    <p><em>The trust fund left by my mother — please donate it in full to the New Melody Children's Music Education Foundation.</em></p>
                    <p><em>Father — if you see this — I never hated you. I just couldn't become the person you wanted me to be. I hope you understand.</em></p>
                    <p><em>And about "Whispers of the Night" — it was written for E. She knows who she is.</em></p>
                    <p><em>No. That's not right either. It wasn't written FOR her. It was written BY — </em></p>
                    <p style="text-align: right;"><em>[ the text ends here, mid-sentence ]</em></p>
                </div>

                <h3>Analysis</h3>
                <p>The abrupt ending and the self-correction in the final lines suggest Lucio may have been on the verge of acknowledging the true authorship of his compositions before stopping himself — or being interrupted.</p>
            `
        }
    ],

    // ========== Tier 3 Entries (password: test3) ==========
    tier3Entries: [
        {
            id: "surgery-records",
            title: "TOP SECRET: Cardiac Transplant Operation Records",
            category: "Top Secret",
            classification: "TOP SECRET",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">TOP SECRET</span>
                    <span>Criminal evidence — handle with extreme caution</span>
                </div>

                <h3>Operation Summary</h3>
                <div class="info-card">
                    <p><strong>Date:</strong> 3 September 2024</p>
                    <p><strong>Facility:</strong> Undisclosed private clinic, believed to be in Eastern Europe</p>
                    <p><strong>Surgeon:</strong> Unknown (operating under alias "Dr. Voss")</p>
                    <p><strong>Commissioned by:</strong> Heinrich Hoffmann</p>
                    <p><strong>Procedure:</strong> Bilateral cardiac transplant — cross-exchange between two subjects</p>
                </div>

                <h3>Background & Motive</h3>
                <p>As Lucio aged, his limitations as a performer became increasingly apparent to those within the industry. Heinrich, who had invested his entire emotional and financial life into the belief that his son was a musical genius, refused to accept reality.</p>
                <p>In early 2024, Heinrich learned of a pseudoscientific theory called <strong>"cellular memory transfer"</strong> — the idea that organ transplants, particularly heart transplants, can transfer the donor's memories, skills, and personality traits to the recipient.</p>
                <p>Despite having no scientific basis, Heinrich became obsessed with this theory. He contacted an <strong>illegal organ transplant network</strong> with a proposal:</p>

                <div class="warning-box">
                    <p>⚠️ <strong>Swap Lucio's heart with Emil's heart</strong>, believing this would transfer Emil's musical genius into Lucio's body.</p>
                </div>

                <h3>The Operation</h3>
                <ul>
                    <li>Both Lucio and Emil were transported to the facility under false pretences</li>
                    <li>Lucio was told it was a "routine cardiac check-up"</li>
                    <li>Emil — having no agency or legal identity — was given no explanation</li>
                    <li>The hearts were cross-exchanged: Lucio received Emil's heart, Emil received Lucio's</li>
                    <li>Heinrich reportedly justified this by saying: <strong>"At least I'm not killing the boy — he gets a heart too"</strong></li>
                </ul>

                <h3>Outcome</h3>
                <p>The operation was technically "successful." Both subjects survived the immediate post-operative period.</p>
                <p>However, <strong>donor-recipient tissue compatibility was catastrophically inadequate</strong>. Neither subject had been properly cross-matched.</p>
                <ul>
                    <li><strong>Lucio</strong> — Developed acute immune rejection within 6 weeks. Died 14 November 2024.</li>
                    <li><strong>Emil</strong> — Developed hyperacute rejection. Died approximately 20 September 2024. <em>His death was not reported to any authority.</em></li>
                </ul>

                <div class="warning-box">
                    <p>⚠️ <strong>Both deaths are directly attributable to Heinrich Hoffmann's actions. This constitutes double homicide through criminal negligence at minimum.</strong></p>
                </div>
            `
        },
        {
            id: "emil-full",
            title: "Emil — Complete File (DECLASSIFIED)",
            category: "Top Secret",
            classification: "TOP SECRET",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">TOP SECRET</span>
                    <span>Subject deceased — file partially declassified</span>
                </div>

                <h3>Full Profile</h3>
                <div class="info-card">
                    <p><strong>Name:</strong> Emil (no surname; refused to use "Hoffmann")</p>
                    <p><strong>Born:</strong> circa 1997, exact date and location unknown</p>
                    <p><strong>Died:</strong> approximately 20 September 2024 (unreported)</p>
                    <p><strong>Condition:</strong> Blind from birth (bilateral anophthalmia)</p>
                    <p><strong>Nominal status:</strong> Listed as Heinrich's illegitimate son in private records</p>
                    <p><strong>Actual status:</strong> No biological relation. Emil always knew and refused to play along.</p>
                </div>

                <h3>Origins</h3>
                <p>Emil's true origins remain unclear. He was likely acquired through an intermediary connected to the same illegal network Heinrich later used for the transplant operation. He appears to have been identified as a musical prodigy at a very young age and brought into the Hoffmann household around age 8.</p>

                <h3>Life in Captivity</h3>
                <p>For nearly two decades, Emil lived in a soundproofed annex with no contact with the outside world. His sole purpose, as far as Heinrich was concerned, was to compose music that would be attributed to Lucio.</p>
                <p>Emil was aware of this arrangement. According to notes found in the annex:</p>
                <div class="document-box">
                    <p><em>"He wants me to be his son's ghost. I am not his son. I am not anyone's ghost. But the piano is the only thing I have, so I play. I play because it is the only proof I exist."</em></p>
                </div>

                <h3>Known Compositions (attributed to Lucio)</h3>
                <p>ALL of the following works were composed by Emil:</p>
                <ul>
                    <li><em>Whispers of the Night</em> — Emil's masterpiece, completed shortly before the transplant</li>
                    <li><em>The Forgotten Waltz</em></li>
                    <li><em>Moonlit Monologue</em></li>
                    <li>And approximately 40+ other unpublished works found in the annex</li>
                </ul>

                <h3>The "E" in Lucio's Will</h3>
                <p>In his draft will, Lucio wrote: "Whispers of the Night was written for E." It is now clear that "E" refers to <strong>Emil</strong> — and that in his final days, Lucio was beginning to understand that the piece was not written FOR Emil, but BY Emil. The will's unfinished final sentence — "It was written BY —" — appears to be the moment of this realisation.</p>
            `
        },
        {
            id: "cellular-memory",
            title: "Reference: Cellular Memory Theory",
            category: "Top Secret",
            classification: "TOP SECRET",
            lastModified: "8 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">TOP SECRET</span>
                    <span>Context document</span>
                </div>

                <h3>Overview</h3>
                <p>"Cellular memory" is a <strong>pseudoscientific hypothesis</strong> suggesting that memories, personality traits, and even skills can be stored in cells outside the brain — particularly in the heart — and transferred through organ transplantation.</p>

                <h3>Scientific Consensus</h3>
                <p>The theory has been <strong>thoroughly debunked</strong> by mainstream science. There is no credible evidence that organ transplants transfer memories or abilities. Anecdotal reports of personality changes in transplant recipients are attributed to psychological factors, immunosuppressant medications, and confirmation bias.</p>

                <h3>Heinrich's Belief</h3>
                <p>Despite the lack of scientific backing, Heinrich became convinced of this theory after encountering it through online forums and a self-published book titled <em>"The Heart Remembers: Cellular Memory and the Transfer of Soul"</em> by a discredited former researcher.</p>
                <p>Heinrich's notes (found in his Munich study) include passages such as:</p>
                <div class="document-box">
                    <p><em>"If the heart carries memory, then talent must live in the cells. Give my son the right heart, and he will finally become what he was always meant to be. What I was always meant to be."</em></p>
                </div>
                <p>The final sentence is particularly revealing — it suggests Heinrich saw Lucio's "genius" as a proxy for his own unfulfilled musical ambitions.</p>
            `
        }
    ],

    // ========== Tier 4 Entries (password: test4) ==========
    tier4Entries: [
        {
            id: "digital-life",
            title: "BLACK ARCHIVE: Project Elysium — Digital Life Preservation",
            category: "Black Archive",
            classification: "BLACK",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">BLACK ARCHIVE</span>
                    <span>⚠ FINAL CLEARANCE LEVEL — NO FURTHER ACCESS EXISTS</span>
                </div>

                <h3>Project Overview</h3>
                <p><strong>Project Elysium</strong> is a clandestine digital consciousness preservation programme operated by the same illegal network responsible for the organ transplant. The programme claims to:</p>
                <ul>
                    <li>Upload a dying person's consciousness into a digital environment</li>
                    <li>Maintain the digital consciousness indefinitely (for a recurring fee)</li>
                    <li>Eventually transfer the consciousness back into a custom-grown body</li>
                </ul>

                <h3>Heinrich's Involvement</h3>
                <p>After Lucio's immune rejection became apparent and death inevitable, Heinrich — unable to accept the loss of his son — contracted Project Elysium to <strong>digitally preserve Lucio's consciousness</strong>.</p>
                <ul>
                    <li>Cost: €2.4 million initial upload + €180,000/month maintenance</li>
                    <li>Upload date: Approximately 12 November 2024 (two days before physical death)</li>
                    <li>The digital Lucio was placed in a simulated environment mimicking his Vienna residence</li>
                </ul>

                <h3>The Unauthorised Second Upload</h3>
                <p>What Heinrich did not know — and was never told — is that the operators of Project Elysium <strong>also uploaded Emil's consciousness</strong>. Emil died approximately seven weeks before Lucio, and the operators, seeking to maximise the data they could sell, preserved his digital consciousness as well.</p>
                <p><strong>Both digital consciousnesses now exist within the same digital space.</strong></p>

                <h3>The Deception Protocol</h3>
                <p>Project Elysium's scientists determined that informing a digital consciousness of its own death would cause <strong>"cascade data failure"</strong> — effectively, the digital mind would reject its own existence and collapse. Therefore:</p>
                <ul>
                    <li>Digital Lucio believes he is still alive</li>
                    <li>Digital Emil exists in the system but has no simulated environment — he is <strong>trapped in darkness</strong>, consistent with his blindness in life</li>
                    <li>The two consciousnesses occasionally <strong>bleed into each other</strong>, causing Lucio to say things he doesn't understand, hear music he didn't write, or momentarily "forget" that he can see</li>
                </ul>

                <h3>Current Status</h3>
                <p>Heinrich Hoffmann died on 28 December 2024 — officially of cardiac arrest, though associates suggest he simply gave up.</p>
                <p>With no one to pay the maintenance fees, Project Elysium's parent organisation went bankrupt in early 2025. The servers were <strong>seized during a law enforcement raid</strong> and the building was auctioned off.</p>
                <p>The building was purchased by a developer and is currently being converted into an <strong>arts university</strong>.</p>
                <p><strong>The servers — and the digital consciousnesses within them — were never properly shut down.</strong></p>

                <div class="warning-box">
                    <p>⚠️ <strong>You are currently inside this digital space.</strong> The "ghost websites" you have been investigating — the blog, the news site, this archive — are artefacts of Lucio's digital consciousness, still running, still believing he is alive.</p>
                </div>
            `
        },
        {
            id: "your-situation",
            title: "BLACK ARCHIVE: Why You Are Here",
            category: "Black Archive",
            classification: "BLACK",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">BLACK ARCHIVE</span>
                    <span>⚠ READ CAREFULLY</span>
                </div>

                <h3>The Invitation</h3>
                <p>Lucio's digital consciousness, unaware of its own death, continued to operate his blog and social media accounts. When you — as his online friend "Alex" — accepted his invitation to visit the practice room at Domgasse 5, you entered a space that no longer exists in the physical world.</p>
                <p>The room you found yourself in is a <strong>digital reconstruction</strong>. The flickering lights, the sense of spatial instability, the feeling that the walls aren't quite solid — these are symptoms of the <strong>degrading digital environment</strong>, running on servers that no one is maintaining.</p>

                <h3>The Two Ghosts</h3>
                <p>Within this space, two consciousnesses persist:</p>
                <ul>
                    <li><strong>Lucio</strong> — believes he is alive, continues to "compose" and blog, doesn't understand why things feel wrong</li>
                    <li><strong>Emil</strong> — exists in permanent darkness, occasionally bleeding through into Lucio's consciousness, the true genius whose music the world attributes to another</li>
                </ul>

                <h3>The Choice</h3>
                <p>Now that you know the truth, you must decide:</p>

                <div class="document-box">
                    <p><strong>OPTION A: Silence</strong></p>
                    <p>Say nothing. Leave this place. Let Lucio's digital ghost continue to believe he is alive, continue to believe he is a genius. Protect your friend's dignity — even if that dignity is built on a lie. Emil's name will remain unspoken. The music will forever be credited to the wrong person.</p>
                    <br>
                    <p><strong>OPTION B: Truth</strong></p>
                    <p>Expose everything. Reveal that Lucio's talent was stolen. That Emil — a blind child with no name, no family, no freedom — was the true artist behind every note. That Heinrich Hoffmann killed them both in pursuit of a delusion. The world will know Lucio as a fraud, but Emil will finally be acknowledged as the genius he always was.</p>
                </div>

                <p style="text-align: center; margin-top: 30px; color: var(--accent-color);"><em>What will you choose?</em></p>
            `
        }
    ],

    // ========== Categories ==========
    categories: [
        { id: "general", name: "General", icon: "📋" },
        { id: "personnel", name: "Personnel", icon: "👤" },
        { id: "assets", name: "Assets", icon: "🏛️" },
        { id: "restricted", name: "Restricted", icon: "🔒" },
        { id: "confidential", name: "Confidential", icon: "🔐" },
        { id: "topsecret", name: "Top Secret", icon: "☢️" },
        { id: "black", name: "Black Archive", icon: "⬛" },
        { id: "legal", name: "Legal", icon: "📄" }
    ],

    // ========== UI Config ==========
    ui: {
        primaryColor: "#1a1a2e",
        accentColor: "#4a90a4",
        loginTitle: "Access Verification",
        loginSubtitle: "Enter passphrase to access restricted content",
        loginError: "Incorrect passphrase. Access denied.",
        loggedInMessage: "Access granted"
    }
};
