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
        title: "⊕ Young Pianist Lucius Found Dead in London Residence, Aged 28",
        titleCn: "⊕ 青年钢琴家Lucius被发现死于伦敦寓所，年仅28岁",
        author: "Anna Weber",
        publishDate: "15 November 2024",
        publishTime: "09:32 CET",
        category: "OBITUARY",
        image: "../assets/images/pianist.jpg",
        imageCaption: "Lucius performing at a private recital in Prague, October 2024 (file photo)",

        content: `
            <p class="lead"><strong>LONDON</strong> — Young pianist Lucius was found dead in his private residence in London's Marylebone on the evening of November 14th. He was 28 years old. Metropolitan Police have stated that the cause of death remains under investigation and no possibilities have been ruled out.</p>
            <p class="cn"><strong>伦敦</strong>——青年钢琴家Lucius于11月14日晚间被发现死于其位于伦敦马里波恩区的私人寓所，年仅28岁。伦敦警方表示，死因仍在调查中，尚未排除任何可能性。</p>

            <p>Lucius was born into one of Europe's most prominent industrial dynasties. His late father, Heinrich Hoffmann, was the chairman of Hoffmann Industrial Group, a Bavarian steel conglomerate with estimated assets exceeding €1.2 billion. Despite the family's vast business empire, Lucius showed a passionate devotion to the piano from the age of five. A diligent and gifted student, he studied under the renowned Professor Hans Weber at the Royal Academy of Music, held his first solo recital at 16, and went on to perform at prestigious venues including the Royal Albert Hall and the BBC Proms. He was named in Forbes Europe's "30 Under 30" in the arts category and had been publicly praised by cultural ministers across multiple countries.</p>
            <p class="cn">Lucius出身于欧洲最显赫的工业家族之一。其父Heinrich Hoffmann是霍夫曼工业集团的董事长，该集团是一家总部位于巴伐利亚的钢铁企业，估计资产超过12亿欧元。尽管家族拥有庞大的商业帝国，Lucius自五岁起便对钢琴展现出热忱。他天资聪颖又勤奋刻苦，师从著名的Hans Weber教授在皇家音乐学院学习，16岁举办首场独奏会，此后在皇家阿尔伯特音乐厅和BBC逍遥音乐节等知名场馆演出。他曾入选《福布斯》欧洲"30位30岁以下精英"艺术类榜单，并受到多国文化部长的公开赞誉。</p>

            <p>"He was a genuinely gifted player — disciplined, emotional, technically strong," said Professor Hans Weber, his long-time mentor at the Royal Academy of Music. "But his published compositions... they existed on a different plane entirely from his playing. There was always a gap between the Lucius I taught and the Lucius on the page. I could never explain it."</p>
            <p class="cn">"他确实是一位有天赋的演奏者——自律、富有情感、技术扎实，"他在皇家音乐学院的长期导师Hans Weber教授说。"但他发表的作品……与他的演奏完全不在一个层面上。我教的那个Lucius和乐谱上的Lucius之间总有一道鸿沟。我始终无法解释。"</p>

            <p>Despite his public success and industry recognition, some music critics had quietly raised questions about the gap between Lucius's live performance level and the extraordinary complexity of his published compositions. Such discussions were swiftly suppressed, reportedly through the influence of the Hoffmann family's legal and media apparatus.</p>
            <p class="cn">尽管Lucius在公众和业界都获得了认可，一些乐评人私下对他现场演奏水平与其发表作品的非凡复杂度之间的差距提出了质疑。相关讨论据报道在霍夫曼家族法律和媒体力量的干预下被迅速压制。</p>

            <h3>Family Statement</h3>
            <h3 class="cn">家属声明</h3>
            <p>The Hoffmann family, through legal counsel, issued a brief statement expressing that they are "devastated beyond words" by the loss, and implored the media to respect the family's privacy. Heinrich Hoffmann, Lucius's father, passed away in 2022. The statement emphasized that the funeral would be held "in the most private manner possible" and that no outside condolences would be accepted.</p>
            <p class="cn">霍夫曼家族通过法律顾问发表了简短声明，表示对这一损失"悲痛万分，无以言表"，并恳请媒体尊重家属的隐私。Lucius的父亲Heinrich Hoffmann已于2022年去世。声明强调葬礼将"以最私密的方式"举行，不接受外界吊唁。</p>

            <p>The statement also mentioned that the family intends to establish a music scholarship in Lucius's name, but <strong>did not specify the beneficiary institution</strong>. Sources familiar with the matter noted that Lucius had made multiple donations during his lifetime to an organization called the "<strong>New Melody Children's Music Education Foundation</strong>," though the foundation's operational background remains opaque.</p>
            <p class="cn">声明还提到，家族拟以Lucius之名设立音乐奖学金，但<strong>未指明受益机构</strong>。知情人士指出，Lucius生前曾多次向一家名为"<strong>新旋律儿童音乐教育基金会</strong>"的组织捐款，但该基金会的运营背景不甚透明。</p>

            <h3>Online Reaction</h3>
            <h3 class="cn">网络反应</h3>
            <p>Lucius maintained a dedicated following on his personal blog, which saw a dramatic spike in traffic following the news. Many fans left messages of mourning, though some commenters pointed out that "very few of his followers actually understand classical music — most were drawn to his lifestyle and apparent wealth."</p>
            <p class="cn">Lucius在个人博客上拥有一批忠实粉丝，消息传出后博客访问量激增。许多粉丝留言悼念，但也有评论者指出，"他的关注者中真正懂古典音乐的寥寥无几——大多数人是被他的生活方式和显赫家世所吸引。"</p>

            <div class="memorial-notice" style="margin-top: 35px; padding: 25px; background: #f9f5f0; border-left: 4px solid #555; border-radius: 2px;">
                <p style="font-size: 16px; line-height: 1.8; color: #444;">We understand the profound sense of loss felt by Lucius's fans, friends, and loved ones. His music touched countless lives, and the grief of his sudden departure is shared by many across the world. While the Hoffmann family has chosen a private funeral, we believe everyone who cared for Lucius deserves a space to honour his memory.</p>
                <p class="cn" style="font-size: 15px; line-height: 1.8; color: #888;">我们理解Lucius的粉丝、朋友和亲人们心中深切的惋惜与哀痛。他的音乐曾触动无数人的心灵，他突然离去的悲伤被世界各地的人们共同承担。尽管霍夫曼家族选择了私人葬礼，但我们相信每一个在乎Lucius的人都应该拥有一个缅怀他的空间。</p>
                <p style="margin-top: 15px; font-size: 16px;"><a href="../memorial/index.html" style="color: #bb1919; text-decoration: underline; font-weight: bold;">Click here to attend the online memorial service →</a></p>
                <p class="cn" style="margin-top: 5px; font-size: 15px;"><a href="../memorial/index.html" style="color: #bb1919; text-decoration: underline; font-weight: bold;">点击此处参加线上哀悼 →</a></p>
            </div>
        `,

        // Info box
        infoBox: {
            title: "Lucius",
            items: [
                { label: "Born", value: "12 March 1996" },
                { label: "Died", value: "14 November 2024, London, England" },
                { label: "Occupation", value: "Pianist, Composer" },
                { label: "Known for", value: "Whispers of the Night, The Forgotten Waltz, Moonlit Monologue" },
                { label: "Family", value: "Father: Heinrich Hoffmann (Chairman, Hoffmann Industrial Group)" },
                { label: "Nationality", value: "German" },
                { label: "Education", value: "Royal Academy of Music (student of Prof. Hans Weber)" }
            ]
        }
    },

    // Sidebar news (with embedded clues)
    sidebarNews: [
        {
            title: "Transnational Illegal Organ Trafficking Ring Dismantled in Joint Operation",
            titleCn: "跨国非法器官贩卖网络在联合行动中被捣毁",
            time: "Today 14:20",
            category: "WORLD"
        },
        {
            title: "'Consciousness Upload' — Science or Scam? The Digital Afterlife Debate",
            titleCn: "'意识上传'——科学还是骗局？数字永生之争",
            time: "Today 11:45",
            category: "TECH"
        },
        {
            title: "ECB Holds Interest Rates as Economic Downturn Persists",
            titleCn: "欧洲央行维持利率不变，经济低迷持续",
            time: "Yesterday 22:30",
            category: "FINANCE"
        },
        {
            title: "Abandoned Commercial Building in London to Be Converted into Art University",
            titleCn: "伦敦废弃商业建筑将被改建为艺术大学",
            time: "Yesterday 18:00",
            category: "CULTURE"
        },
        {
            title: "Children's Music Foundation Under Scrutiny Over Opaque Fund Allocation",
            titleCn: "儿童音乐基金会因资金流向不透明遭审查",
            time: "Yesterday 09:15",
            category: "SOCIETY"
        }
    ],

    // Footer
    footer: {
        copyright: "© 2024 European Daily News",
        address: "Headquarters: Berlin, Germany | Bureaus: London, Paris, Rome, Madrid",
        disclaimer: "This website is a fictional prop created for an escape room experience"
    }
};
