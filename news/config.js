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
        title: "Young Pianist Lucio Found Dead in Vienna Residence, Aged 28 / 青年钢琴家Lucio被发现死于维也纳寓所，年仅28岁",
        subtitle: "Acclaimed pianist's sudden death raises questions as autopsy reveals unexplained surgical scars / 知名钢琴家突然离世引发质疑，尸检发现不明手术疤痕",
        author: "Anna Weber",
        publishDate: "15 November 2024",
        publishTime: "09:32 CET",
        category: "OBITUARY",
        image: "../assets/images/pianist.jpg",
        imageCaption: "Lucio performing at a private recital in Prague, October 2024 (file photo)",

        content: `
            <p class="lead"><strong>VIENNA</strong> — Young pianist Lucio was found dead in his private residence in Vienna's 1st District on the evening of November 14th. He was 28 years old. Vienna police have stated that the cause of death remains under investigation and no possibilities have been ruled out.</p>
            <p class="cn"><strong>维也纳</strong>——青年钢琴家Lucio于11月14日晚间被发现死于其位于维也纳第一区的私人寓所，年仅28岁。维也纳警方表示，死因仍在调查中，尚未排除任何可能性。</p>

            <p>Lucio was born into one of Europe's most prominent industrial dynasties. His father, Heinrich Hoffmann, is the chairman of Hoffmann Industrial Group, a Bavarian steel conglomerate with estimated assets exceeding €1.2 billion. Despite the family's vast business empire, Lucio showed a passionate devotion to the piano from the age of five. A diligent and gifted student, he studied under the renowned Professor Hans Weber at the Vienna Conservatory, held his first solo recital at 16, and went on to perform at prestigious venues including the Vienna Musikverein and the Salzburg Festival. He was named in Forbes Europe's "30 Under 30" in the arts category and had been publicly praised by cultural ministers across multiple countries.</p>
            <p class="cn">Lucio出身于欧洲最显赫的工业家族之一。其父Heinrich Hoffmann是霍夫曼工业集团的董事长，该集团是一家总部位于巴伐利亚的钢铁企业，估计资产超过12亿欧元。尽管家族拥有庞大的商业帝国，Lucio自五岁起便对钢琴展现出热忱。他天资聪颖又勤奋刻苦，师从著名的Hans Weber教授在维也纳音乐学院学习，16岁举办首场独奏会，此后在维也纳金色大厅和萨尔茨堡音乐节等知名场馆演出。他曾入选《福布斯》欧洲"30位30岁以下精英"艺术类榜单，并受到多国文化部长的公开赞誉。</p>

            <p>"He was a genuinely gifted player — disciplined, emotional, technically strong," said Professor Hans Weber, his long-time mentor at the Vienna Conservatory. "But his published compositions... they existed on a different plane entirely from his playing. There was always a gap between the Lucio I taught and the Lucio on the page. I could never explain it."</p>
            <p class="cn">"他确实是一位有天赋的演奏者——自律、富有情感、技术扎实，"他在维也纳音乐学院的长期导师Hans Weber教授说。"但他发表的作品……与他的演奏完全不在一个层面上。我教的那个Lucio和乐谱上的Lucio之间总有一道鸿沟。我始终无法解释。"</p>

            <p>Despite his public success and industry recognition, some music critics had quietly raised questions about the gap between Lucio's live performance level and the extraordinary complexity of his published compositions. Such discussions were swiftly suppressed, reportedly through the influence of the Hoffmann family's legal and media apparatus.</p>
            <p class="cn">尽管Lucio在公众和业界都获得了认可，一些乐评人私下对他现场演奏水平与其发表作品的非凡复杂度之间的差距提出了质疑。相关讨论据报道在霍夫曼家族法律和媒体力量的干预下被迅速压制。</p>

            <h3>Questions and Investigation</h3>
            <p>In their official statement, Vienna police disclosed that the preliminary autopsy revealed <strong>extensive old surgical scarring across the deceased's thoracic cavity</strong>, inconsistent with his known medical history. Police have reached out to Lucio's private physician in Vienna as well as his family, but as of press time, the family has not responded to inquiries regarding the scars.</p>
            <p class="cn">维也纳警方在官方声明中透露，初步尸检发现<strong>死者胸腔有大面积陈旧手术疤痕</strong>，与其已知病史不符。警方已联系Lucio在维也纳的私人医生及其家属，但截至发稿时，家属尚未就疤痕一事作出回应。</p>

            <p>Additionally, this newspaper has learned that <strong>a large number of handwritten musical score drafts</strong> were found in Lucio's residence, some of which bear handwriting that differs significantly from Lucio's known manuscripts. These items have been seized as evidence by police.</p>
            <p class="cn">此外，本报获悉，在Lucio的寓所内发现了<strong>大量手写乐谱草稿</strong>，其中部分笔迹与Lucio已知的手稿有显著差异。这些物品已被警方作为证据扣押。</p>

            <h3>Family Statement</h3>
            <p>Heinrich Hoffmann, through the family's legal counsel, issued a brief statement expressing that he is "devastated beyond words" by the loss of his only son, and implored the media to respect the family's privacy. The statement emphasized that the funeral would be held "in the most private manner possible" and that no outside condolences would be accepted.</p>
            <p class="cn">Heinrich Hoffmann通过家族法律顾问发表了简短声明，表示对独子的离世"悲痛万分，无以言表"，并恳请媒体尊重家属的隐私。声明强调葬礼将"以最私密的方式"举行，不接受外界吊唁。</p>

            <p>The statement also mentioned that the family intends to establish a music scholarship in Lucio's name, but <strong>did not specify the beneficiary institution</strong>. Sources familiar with the matter noted that Lucio had made multiple donations during his lifetime to an organization called the "<strong>New Melody Children's Music Education Foundation</strong>," though the foundation's operational background remains opaque.</p>
            <p class="cn">声明还提到，家族拟以Lucio之名设立音乐奖学金，但<strong>未指明受益机构</strong>。知情人士指出，Lucio生前曾多次向一家名为"<strong>新旋律儿童音乐教育基金会</strong>"的组织捐款，但该基金会的运营背景不甚透明。</p>

            <h3>Online Reaction</h3>
            <p>Lucio maintained a dedicated following on his personal blog, which saw a dramatic spike in traffic following the news. Many fans left messages of mourning, though some commenters pointed out that "very few of his followers actually understand classical music — most were drawn to his lifestyle and apparent wealth."</p>
            <p class="cn">Lucio在个人博客上拥有一批忠实粉丝，消息传出后博客访问量激增。许多粉丝留言悼念，但也有评论者指出，"他的关注者中真正懂古典音乐的寥寥无几——大多数人是被他的生活方式和显赫家世所吸引。"</p>

            <p>As of press time, Lucio's personal blog and social media accounts remain active. His last blog post was published on October 28th.</p>
            <p class="cn">截至发稿时，Lucio的个人博客和社交媒体账号仍保持活跃。他最后一篇博文发表于10月28日。</p>

            <p class="editor-note"><em>Editor's note: Follow-up reporting on the "old surgical scars" and handwriting analysis will appear in Section A3. This newspaper will continue to monitor developments in this case.</em></p>
            <p class="cn"><em>编者注：关于"陈旧手术疤痕"及笔迹分析的后续报道将刊载于A3版。本报将持续关注案件进展。</em></p>
        `,

        // Info box
        infoBox: {
            title: "Lucio",
            items: [
                { label: "Born", value: "12 March 1996" },
                { label: "Died", value: "14 November 2024, Vienna, Austria" },
                { label: "Occupation", value: "Pianist, Composer" },
                { label: "Known for", value: "Whispers of the Night, The Forgotten Waltz, Moonlit Monologue" },
                { label: "Family", value: "Father: Heinrich Hoffmann (Chairman, Hoffmann Industrial Group)" },
                { label: "Nationality", value: "German" },
                { label: "Education", value: "Vienna Conservatory (student of Prof. Hans Weber)" }
            ]
        }
    },

    // Sidebar news (with embedded clues)
    sidebarNews: [
        {
            title: "Transnational Illegal Organ Trafficking Ring Dismantled in Joint Operation / 跨国非法器官贩卖网络在联合行动中被捣毁",
            time: "Today 14:20",
            category: "WORLD"
        },
        {
            title: "'Consciousness Upload' — Science or Scam? The Digital Afterlife Debate / '意识上传'——科学还是骗局？数字永生之争",
            time: "Today 11:45",
            category: "TECH"
        },
        {
            title: "ECB Holds Interest Rates as Economic Downturn Persists / 欧洲央行维持利率不变，经济低迷持续",
            time: "Yesterday 22:30",
            category: "FINANCE"
        },
        {
            title: "Abandoned Commercial Building in Vienna to Be Converted into Art University / 维也纳废弃商业建筑将被改建为艺术大学",
            time: "Yesterday 18:00",
            category: "CULTURE"
        },
        {
            title: "Children's Music Foundation Under Scrutiny Over Opaque Fund Allocation / 儿童音乐基金会因资金流向不透明遭审查",
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
