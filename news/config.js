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
        subtitle: "Rising star's sudden death raises questions as autopsy reveals unexplained surgical scars / 新星突然离世引发质疑，尸检发现不明手术疤痕",
        author: "Anna Weber",
        publishDate: "15 November 2024",
        publishTime: "09:32 CET",
        category: "OBITUARY",
        image: "../assets/images/pianist.jpg",
        imageCaption: "Lucio performing at a private recital in Prague, October 2024 (file photo)",

        content: `
            <p class="lead"><strong>VIENNA</strong> — Young pianist Lucio was found dead in his private residence in Vienna's 1st District on the evening of November 14th. He was 28 years old. Vienna police have stated that the cause of death remains under investigation and no possibilities have been ruled out.</p>
            <p class="cn"><strong>维也纳</strong>——青年钢琴家Lucio于11月14日晚间被发现死于其位于维也纳第一区的私人寓所，年仅28岁。维也纳警方表示，死因仍在调查中，尚未排除任何可能性。</p>

            <p>Lucio was born into one of Europe's most prominent industrial dynasties. His father, Heinrich Hoffmann, is the chairman of Hoffmann Industrial Group, a Bavarian steel conglomerate with estimated assets exceeding €1.2 billion. Despite the family's vast business empire, Lucio showed a passionate devotion to the piano from the age of five. He studied at the Vienna Conservatory from age 18 and had since become a permanent resident of the Austrian capital, building a modest following through intimate, salon-style private recitals.</p>
            <p class="cn">Lucio出身于欧洲最显赫的工业家族之一。其父Heinrich Hoffmann是霍夫曼工业集团的董事长，该集团是一家总部位于巴伐利亚的钢铁企业，估计资产超过12亿欧元。尽管家族拥有庞大的商业帝国，Lucio自五岁起便对钢琴展现出热忱。他18岁进入维也纳音乐学院学习，此后定居奥地利首都，通过私密的沙龙式演奏会积累了一批忠实听众。</p>

            <p>"His playing had a certain emotional intensity," said an anonymous attendee of one of his private performances. "Though his technique was sometimes questioned by professionals, his compositions always carried something hard to define — as if the voice in the music wasn't entirely his own."</p>
            <p class="cn">"他的演奏有一种特殊的情感力量，"一位匿名的私人演奏会听众说道。"虽然他的技巧有时会受到专业人士的质疑，但他的作品总带着一种难以言说的东西——仿佛音乐中的声音并非完全属于他自己。"</p>

            <p>Notably, Lucio had in recent years avoided large public performances and professional adjudication panels. His management team attributed this to his "artistic philosophy." However, industry insiders have revealed that several music critics had previously raised questions about the originality of his compositions, though such discussions were swiftly suppressed.</p>
            <p class="cn">值得注意的是，Lucio近年来一直回避大型公开演出和专业评审。其经纪团队将此归因于他的"艺术理念"。然而，业内人士透露，此前已有多位乐评人对其作品的原创性提出质疑，但相关讨论均被迅速压制。</p>

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
                { label: "Occupation", value: "Pianist (freelance)" },
                { label: "Known for", value: "Whispers of the Night, The Forgotten Waltz, Moonlit Monologue" },
                { label: "Family", value: "Father: Heinrich Hoffmann (Chairman, Hoffmann Industrial Group)" },
                { label: "Nationality", value: "German" },
                { label: "Education", value: "Vienna Conservatory (degree unfinished)" }
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
