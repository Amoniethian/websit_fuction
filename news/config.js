/**
 * News Website Configuration
 * ===========================
 * Edit this file to customize all news content
 */

const NEWS_CONFIG = {
    // Site info
    siteName: "European Daily News",
    siteSlogan: "Truth, Objectivity, Timeliness",

    // Headline (Obituary)
    headline: {
        title: "Young Pianist Lucio Found Dead in Vienna Residence, Aged 28",
        subtitle: "Rising star's sudden death raises questions as autopsy reveals unexplained surgical scars",
        author: "Anna Weber",
        publishDate: "15 November 2024",
        publishTime: "09:32 CET",
        category: "OBITUARY",
        image: "../assets/images/pianist.jpg",
        imageCaption: "Lucio performing at a private recital in Prague, October 2024 (file photo)",

        content: `
            <p class="lead"><strong>VIENNA</strong> — Young pianist Lucio was found dead in his private residence in Vienna's 1st District on the evening of November 14th. He was 28 years old. Vienna police have stated that the cause of death remains under investigation and no possibilities have been ruled out.</p>

            <p>Lucio was born into one of China's most prominent industrial families. His father, Lu Heming, is the founder and chairman of Heming Industrial Group, a steel conglomerate with estimated assets exceeding €1.2 billion. Despite the family's business empire, Lucio showed a passionate devotion to the piano from the age of five, moving to Europe at 18 to pursue his musical studies in Vienna. He had since become a permanent resident of the Austrian capital, building a modest following through intimate, salon-style private recitals.</p>

            <p>"His playing had a certain emotional intensity," said an anonymous attendee of one of his private performances. "Though his technique was sometimes questioned by professionals, his compositions always carried something hard to define — as if the voice in the music wasn't entirely his own."</p>

            <p>Notably, Lucio had in recent years avoided large public performances and professional adjudication panels. His management team attributed this to his "artistic philosophy." However, industry insiders have revealed that several music critics had previously raised questions about the originality of his compositions, though such discussions were swiftly suppressed.</p>

            <h3>Questions and Investigation</h3>
            <p>In their official statement, Vienna police disclosed that the preliminary autopsy revealed <strong>extensive old surgical scarring across the deceased's thoracic cavity</strong>, inconsistent with his known medical history. Police have reached out to Lucio's private physician in Vienna as well as his family, but as of press time, the family has not responded to inquiries regarding the scars.</p>

            <p>Additionally, this newspaper has learned that <strong>a large number of handwritten musical score drafts</strong> were found in Lucio's residence, some of which bear handwriting that differs significantly from Lucio's known manuscripts. These items have been seized as evidence by police.</p>

            <h3>Family Statement</h3>
            <p>Lu Heming, through the family's legal counsel, issued a brief statement expressing that he is "devastated beyond words" by the loss of his only son, and implored the media to respect the family's privacy. The statement emphasized that the funeral would be held "in the most private manner possible" and that no outside condolences would be accepted.</p>

            <p>The statement also mentioned that the family intends to establish a music scholarship in Lucio's name, but <strong>did not specify the beneficiary institution</strong>. Sources familiar with the matter noted that Lucio had made multiple donations during his lifetime to an organization called the "<strong>New Melody Children's Music Education Foundation</strong>," though the foundation's operational background remains opaque.</p>

            <h3>Online Reaction</h3>
            <p>Lucio maintained a dedicated following on his personal blog, which saw a dramatic spike in traffic following the news. Many fans left messages of mourning, though some commenters pointed out that "very few of his followers actually understand classical music — most were drawn to his lifestyle and apparent wealth."</p>

            <p>As of press time, Lucio's personal blog and social media accounts remain active. His last blog post was published on October 28th.</p>

            <p class="editor-note"><em>Editor's note: Follow-up reporting on the "old surgical scars" and handwriting analysis will appear in Section A3. This newspaper will continue to monitor developments in this case.</em></p>
        `,

        // Info box
        infoBox: {
            title: "Lucio",
            items: [
                { label: "Born", value: "12 March 1996" },
                { label: "Died", value: "14 November 2024, Vienna, Austria" },
                { label: "Occupation", value: "Pianist (freelance)" },
                { label: "Known for", value: "Whispers of the Night, The Forgotten Waltz, Moonlit Monologue" },
                { label: "Family", value: "Father: Lu Heming (Chairman, Heming Industrial Group)" },
                { label: "Education", value: "Vienna Conservatory (degree unfinished)" }
            ]
        }
    },

    // Sidebar news (with embedded clues)
    sidebarNews: [
        {
            title: "Transnational Illegal Organ Trafficking Ring Dismantled in Joint Operation",
            time: "Today 14:20",
            category: "WORLD"
        },
        {
            title: "'Consciousness Upload' — Science or Scam? The Digital Afterlife Debate",
            time: "Today 11:45",
            category: "TECH"
        },
        {
            title: "ECB Holds Interest Rates as Economic Downturn Persists",
            time: "Yesterday 22:30",
            category: "FINANCE"
        },
        {
            title: "Abandoned Commercial Building in Vienna to Be Converted into Art University",
            time: "Yesterday 18:00",
            category: "CULTURE"
        },
        {
            title: "Children's Music Foundation Under Scrutiny Over Opaque Fund Allocation",
            time: "Yesterday 09:15",
            category: "SOCIETY"
        }
    ],

    // Footer
    footer: {
        copyright: "© 2024 European Daily News",
        address: "Headquarters: Berlin, Germany | Bureaus: London, Paris, Vienna, Rome",
        disclaimer: "This website is a fictional prop created for an escape room experience"
    }
};
