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
                <p class="cn">霍夫曼家族是欧洲最显赫的工业家族之一，起源于19世纪德国巴伐利亚地区。</p>

                <h3>Family Business</h3>
                <p>The core family enterprise is steel manufacturing and heavy industry, with factories and offices across multiple European countries. Estimated total family assets exceed €1.2 billion.</p>
                <p class="cn">家族核心产业为钢铁制造和重工业，在多个欧洲国家设有工厂和办事处。家族总资产估计超过12亿欧元。</p>

                <h3>Family Members</h3>
                <ul>
                    <li><strong>Heinrich Hoffmann</strong> — Current patriarch, Chairman of the Board</li>
                    <li><strong>Margarete Hoffmann</strong> — Heinrich's wife (deceased, 2008)</li>
                    <li><strong>Lucius</strong> — Only son, pianist</li>
                </ul>
                <p class="cn"><strong>Heinrich Hoffmann</strong>——现任家族族长，董事会主席<br><strong>Margarete Hoffmann</strong>——Heinrich之妻（2008年去世）<br><strong>Lucius</strong>——独子，钢琴家</p>

                <h3>Family Motto</h3>
                <p><em>"Stärke durch Einheit"</em> — Strength through Unity</p>
                <p class="cn"><em>"Stärke durch Einheit"</em>——力量源于团结</p>
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
                <p class="cn">Heinrich于1982年从父亲手中接管家族企业。在他的领导下，霍夫曼工业集团扩张了近十倍。以铁腕管理风格著称，他在商界被称为"钢铁之狼"。</p>
                <p>As a child, Heinrich showed considerable aptitude for music, particularly piano. However, his father insisted he pursue business. Heinrich has spoken publicly about this as <strong>"the great regret of my life"</strong> and has channelled enormous resources into his son's musical career, reportedly spending over €20 million on private venues, tutors, and career management.</p>
                <p class="cn">Heinrich幼年时展现出相当的音乐天赋，尤其是钢琴。然而，他的父亲坚持让他从商。Heinrich曾公开称此为<strong>"我一生中最大的遗憾"</strong>，并将大量资源投入儿子的音乐事业，据报道在私人场地、导师和事业管理上花费超过2000万欧元。</p>

                <h3>Family</h3>
                <p>Married Margarete in 1990. Their only son, Lucius, was born in 1996. Margarete passed away from illness in 2008. Heinrich has not remarried.</p>
                <p class="cn">1990年与Margarete结婚。独子Lucius于1996年出生。Margarete于2008年因病去世。Heinrich未再婚。</p>

                <h3>Controversies</h3>
                <p>The strained relationship between Heinrich and Lucius has long been a subject of media attention. Sources suggest the tension is not about rejection of the family business, but rather about <strong>Heinrich's obsessive investment in his son's musical career</strong> and his refusal to accept any criticism of Lucius's abilities.</p>
                <p class="cn">Heinrich与Lucius之间的紧张关系长期以来一直是媒体关注的焦点。消息人士指出，矛盾的根源并非Lucius拒绝继承家业，而在于<strong>Heinrich对儿子音乐事业的偏执投入</strong>以及他拒绝接受任何对Lucius能力的批评。</p>

                <div class="restricted-notice">
                    <p>🔒 <strong>Further details require Level 1 access</strong></p>
                </div>
            `
        },
        {
            id: "lucius",
            title: "Lucius",
            category: "Personnel",
            lastModified: "20 October 2024",
            content: `
                <div class="info-card">
                    <p><strong>Born:</strong> 12 March 1996</p>
                    <p><strong>Occupation:</strong> Pianist</p>
                    <p><strong>Residence:</strong> Vienna, Austria</p>
                </div>

                <h3>Musical Career</h3>
                <p>Lucius began learning piano at age 5 and held his first solo recital at 18 in a private venue arranged by his father. He has been described as a "rising star" by select media outlets, though he has consistently avoided large public performances and professional competitions.</p>
                <p class="cn">Lucius五岁开始学琴，18岁在父亲安排的私人场地举办了首场独奏会。部分媒体称他为"冉冉升起的新星"，但他一直回避大型公开演出和专业比赛。</p>

                <h3>Performance Style</h3>
                <p>In recent years, Lucius has exclusively performed at private, salon-style recitals across Europe. He has stated that "music should touch the soul, not fill stadiums."</p>
                <p class="cn">近年来，Lucius专门在欧洲各地举办私密的沙龙式演奏会。他曾说："音乐应该触动灵魂，而非填满体育场。"</p>

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
                <p class="cn">位于维也纳第一区（内城区），靠近圣斯蒂芬大教堂。</p>

                <h3>Details</h3>
                <p>This 19th-century historic building was purchased by Heinrich on Lucius's behalf in 2019 and meticulously restored to serve as his primary residence.</p>
                <p class="cn">这座19世纪的历史建筑由Heinrich于2019年以Lucius的名义购入，并经精心修复作为其主要住所。</p>
                <p>The residence contains a professional-grade recording studio and a 1920s Steinway grand piano.</p>
                <p class="cn">寓所内设有专业级录音室和一架1920年代的施坦威三角钢琴。</p>

                <div class="restricted-notice">
                    <p>🔒 <strong>Address details and floor plans require Level 1 access</strong></p>
                </div>
            `
        }
    ],

    // ========== Tier 1 Entries (password: test1) ==========
    tier1Entries: [
        {
            id: "lucius-detailed",
            title: "Lucius — Extended Personal File",
            category: "Restricted",
            classification: "PERSONAL",
            lastModified: "5 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge">PERSONAL</span>
                    <span>Access log enabled</span>
                </div>

                <h3>Psychological Assessment Summary</h3>
                <p>Per the 2023 psychological evaluation, Lucius exhibits signs of mild dissociative episodes and identity confusion. He frequently reports <strong>gaps in memory surrounding his compositional process</strong>, describing completed works appearing "as if by magic" overnight.</p>
                <p class="cn">根据2023年的心理评估，Lucius表现出轻度解离发作和身份认同混乱的迹象。他频繁报告<strong>在作曲过程中出现记忆空白</strong>，称完成的作品一夜之间"像变魔术一样"出现。</p>
                <p>The assessing physician, Dr. Karl Brandt (retained by Heinrich Hoffmann), attributed these episodes to "hypnagogic creativity" and recommended no further investigation. <em>Note: Dr. Brandt's objectivity has been questioned internally.</em></p>
                <p class="cn">负责评估的医生Karl Brandt博士（由Heinrich Hoffmann聘用）将这些症状归因于"入睡前创造力"，并建议不做进一步调查。<em>注：Brandt博士的客观性在内部受到质疑。</em></p>

                <h3>Financial Overview</h3>
                <ul>
                    <li>Trust fund (maternal inheritance): ~€35 million</li>
                    <li>Personal assets: ~€8 million</li>
                    <li>Annual income (performances): ~€120,000</li>
                    <li><strong>Annual expenditure on career (paid by Heinrich): ~€3.2 million</strong></li>
                </ul>
                <p><em>Note: Lucius voluntarily relinquished inheritance rights to the family business but retains full rights to his mother's estate.</em></p>
                <p class="cn"><em>注：Lucius自愿放弃了家族企业的继承权，但保留了对母亲遗产的全部权利。</em></p>

                <h3>Key Relationships</h3>
                <table class="data-table">
                    <tr><th>Name</th><th>Relation</th><th>Notes</th></tr>
                    <tr><td>Heinrich Hoffmann</td><td>Father</td><td>Relationship complex; Heinrich funds career obsessively</td></tr>
                    <tr><td>Prof. Hans Weber</td><td>Mentor</td><td>Vienna Conservatory; has privately expressed doubts about Lucius's technical ability</td></tr>
                    <tr><td>Elena Petrova</td><td>Ex-girlfriend</td><td>Russian violinist, separated 2022. Told friends Lucius "plays like a different person at night"</td></tr>
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
                    <li>Floors: 4 (Lucius occupies the top two)</li>
                    <li>Contains: soundproofed practice room, recording studio, study</li>
                </ul>

                <h3>Security System</h3>
                <ul>
                    <li>24-hour CCTV surveillance</li>
                    <li>Biometric access (fingerprint + facial recognition)</li>
                    <li>Emergency alert system (direct link to local police)</li>
                </ul>
                <p><em>Security codes rotated monthly, managed by personal assistant.</em></p>
                <p class="cn"><em>安保密码每月轮换，由私人助理管理。</em></p>

                <h3>Anomaly Report</h3>
                <p>Building maintenance staff reported hearing <strong>piano music from the practice room between 2-4am on multiple occasions</strong>, despite Lucius's bedroom door being locked from inside. Lucius denies any knowledge of nighttime playing. Security footage from these periods shows <strong>intermittent static and data corruption</strong>.</p>
                <p class="cn">大楼维护人员多次报告<strong>在凌晨2点至4点之间听到练琴室传来钢琴声</strong>，尽管Lucius的卧室门从内部反锁。Lucius否认知晓任何夜间弹奏。这些时段的监控录像显示<strong>间歇性静电干扰和数据损坏</strong>。</p>
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
                <p>On 8 November, Stein arrived at the residence at the scheduled time and found Lucius in an abnormally distressed state. Observations:</p>
                <p class="cn">11月8日，Stein按预定时间到达寓所，发现Lucius处于异常痛苦的状态。观察记录如下：</p>
                <ul>
                    <li>Numerous crumpled papers found in the study — appeared to be unfinished letter drafts</li>
                    <li>The piano lid had been closed for over three days (extremely unusual)</li>
                    <li>Lucius stated: <strong>"Everything is about to end"</strong> but refused to elaborate</li>
                    <li>Lucius also said: "The music isn't mine. It was never mine. I think I've always known."</li>
                </ul>
                <p class="cn">- 书房内发现大量揉皱的纸张——似为未完成的信件草稿<br>- 钢琴盖已合上超过三天（极不寻常）<br>- Lucius说：<strong>"一切即将结束"</strong>，但拒绝进一步解释<br>- Lucius还说："那些音乐不是我的。从来都不是。我想我一直都知道。"</p>

                <h3>Follow-up</h3>
                <p>Stein recommended Lucius contact a mental health professional. Lucius refused.</p>
                <p class="cn">Stein建议Lucius联系心理健康专业人士。Lucius拒绝了。</p>
                <p>10 November — Lucius cancelled his 15 November meeting with the family lawyer.</p>
                <p class="cn">11月10日——Lucius取消了原定11月15日与家族律师的会面。</p>

                <div class="warning-box">
                    <p>⚠️ <strong>Note:</strong> This report was completed BEFORE the events of 14 November. It has since been transferred to relevant authorities.</p>
                    <p class="cn">⚠️ <strong>注意：</strong>本报告完成于11月14日事件发生之前。此后已移交相关部门。</p>
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
                <p>In September 2024, an internal audit triggered by insurance claims revealed significant discrepancies in the provenance of Lucius's published compositions.</p>
                <p class="cn">2024年9月，一次由保险理赔触发的内部审计揭示了Lucius已发表作品来源上的重大疑点。</p>

                <h3>Key Findings</h3>
                <ul>
                    <li>Handwriting analysis of original manuscripts reveals <strong>two distinct hands</strong> — one matching Lucius, the other unknown</li>
                    <li>The "unknown hand" is responsible for all technically complex passages and the majority of harmonic structures</li>
                    <li>Lucius's own compositional attempts (identified by his hand) are described by analysts as <strong>"competent but unremarkable, consistent with an advanced amateur"</strong></li>
                    <li>Multiple manuscripts show Lucius's handwriting layered ON TOP of the unknown hand, as if retracing</li>
                </ul>
                <p class="cn">- 原始手稿的笔迹分析显示<strong>两种截然不同的笔迹</strong>——一种与Lucius吻合，另一种身份不明<br>- "不明笔迹"负责了所有技术复杂段落和大部分和声结构<br>- Lucius本人的作曲尝试（通过其笔迹识别）被分析师描述为<strong>"尚可但平庸，与高级业余水平一致"</strong><br>- 多份手稿显示Lucius的笔迹覆盖在不明笔迹之上，似为描摹</p>

                <h3>The "Sleepwalking" Narrative</h3>
                <p>Heinrich Hoffmann has maintained to his son that the unknown manuscripts are Lucius's own subconscious work, produced during episodes of sleepwalking or hypnagogic states. A physician retained by Heinrich, Dr. Karl Brandt, has provided supporting documentation for this explanation.</p>
                <p class="cn">Heinrich Hoffmann一直向儿子声称，那些不明手稿是Lucius自己的潜意识作品，在梦游或入睡前状态中创作。Heinrich聘用的医生Karl Brandt博士为此解释提供了支持性文件。</p>
                <p><strong>However, Dr. Brandt's medical licence was suspended in 2021 for falsifying patient records in an unrelated case.</strong> His involvement raises serious questions about the legitimacy of this narrative.</p>
                <p class="cn"><strong>然而，Brandt博士的行医执照于2021年因在一桩无关案件中伪造患者记录而被吊销。</strong>他的介入使这一说辞的可信度备受质疑。</p>

                <h3>The Unknown Composer</h3>
                <p>The true author of the compositions remains unidentified. Stylistic analysis suggests the unknown composer is:</p>
                <p class="cn">作品的真正作者仍未确认。风格分析表明，这位不明作曲家：</p>
                <ul>
                    <li>Exceptionally gifted, likely trained from very early childhood</li>
                    <li>Familiar with tactile/Braille musical notation systems</li>
                    <li>Likely <strong>visually impaired</strong>, based on spatial patterns in the manuscript layout</li>
                </ul>
                <p class="cn">- 天赋异禀，可能从幼年起接受训练<br>- 熟悉触觉/盲文音乐记谱系统<br>- 根据手稿排版的空间模式，可能<strong>患有视觉障碍</strong></p>

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
                <p class="cn">Emil于大约2005年通过不明途径被置于Heinrich Hoffmann的监护之下。见过他的人形容他是<strong>天赋非凡的钢琴神童</strong>，能够完全凭听觉和盲文记谱法创作复杂作品。</p>

                <h3>Living Conditions</h3>
                <p>Emil has been housed in a <strong>soundproofed annex</strong> attached to one of the Hoffmann family's properties. He has had <strong>no public presence, no official identity documents, and no contact with the outside world</strong> beyond Hoffmann-controlled staff.</p>
                <p class="cn">Emil被安置在霍夫曼家族某处房产附属的<strong>隔音附楼</strong>中。他<strong>没有任何公开身份、没有正式身份证件，也没有与外界的任何联系</strong>，只能接触霍夫曼控制下的工作人员。</p>
                <p>When questioned about this arrangement, Heinrich stated that Emil "prefers solitude" and that the arrangement was "for his own protection."</p>
                <p class="cn">当被问及这一安排时，Heinrich表示Emil"喜欢独处"，这种安排是"为了保护他"。</p>

                <h3>Musical Output</h3>
                <p>A comparison of Emil's known compositions with Lucius's published works shows a <strong>near-perfect match</strong> in harmonic language, structural patterns, and stylistic fingerprints.</p>
                <p class="cn">将Emil的已知作品与Lucius的已发表作品进行比较，发现在和声语言、结构模式和风格特征上呈现<strong>近乎完美的吻合</strong>。</p>

                <div class="warning-box">
                    <p>⚠️ <strong>Implication:</strong> Emil appears to be the true author of all major works attributed to Lucius.</p>
                    <p class="cn">⚠️ <strong>含义：</strong>Emil似乎才是所有署名Lucius的主要作品的真正作者。</p>
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
                <p>The following is a transcription of a handwritten draft will found in Lucius's study. It is UNSIGNED and holds no legal force. The original has been secured by the family's legal counsel.</p>
                <p class="cn">以下是在Lucius书房中发现的一份手写遗嘱草稿的誊本。该遗嘱未签名，不具法律效力。原件已由家族法律顾问保管。</p>

                <div class="document-box">
                    <p><em>To whom it may concern:</em></p>
                    <p class="cn"><em>致相关人士：</em></p>
                    <p><em>If you are reading this, I am no longer here.</em></p>
                    <p class="cn"><em>如果你在读这封信，我已经不在了。</em></p>
                    <p><em>I leave all rights to my musical works to the Vienna Conservatory, to support the development of young musicians.</em></p>
                    <p class="cn"><em>我将我所有音乐作品的版权留给维也纳音乐学院，以支持青年音乐家的发展。</em></p>
                    <p><em>My personal belongings, including the Steinway, I leave to Professor Weber. He will know how to keep it singing.</em></p>
                    <p class="cn"><em>我的个人物品，包括那架施坦威，留给Weber教授。他会知道如何让它继续歌唱。</em></p>
                    <p><em>The trust fund left by my mother — please donate it in full to the New Melody Children's Music Education Foundation.</em></p>
                    <p class="cn"><em>母亲留下的信托基金——请全额捐赠给新旋律儿童音乐教育基金会。</em></p>
                    <p><em>Father — if you see this — I never hated you. I just couldn't become the person you wanted me to be. I hope you understand.</em></p>
                    <p class="cn"><em>父亲——如果你看到这些——我从未恨过你。我只是无法成为你希望我成为的那个人。希望你能理解。</em></p>
                    <p><em>And about "Whispers of the Night" — it was written for E. She knows who she is.</em></p>
                    <p class="cn"><em>关于《夜之低语》——它是为E写的。她知道自己是谁。</em></p>
                    <p><em>No. That's not right either. It wasn't written FOR her. It was written BY — </em></p>
                    <p class="cn"><em>不。这也不对。它不是为她写的。它是由——</em></p>
                    <p style="text-align: right;"><em>[ the text ends here, mid-sentence ]</em></p>
                    <p class="cn" style="text-align: right;"><em>[ 文字在此中断，未写完 ]</em></p>
                </div>

                <h3>Analysis</h3>
                <p>The abrupt ending and the self-correction in the final lines suggest Lucius may have been on the verge of acknowledging the true authorship of his compositions before stopping himself — or being interrupted.</p>
                <p class="cn">突然中断的结尾和最后几行的自我纠正表明，Lucius可能正要承认其作品的真正作者身份，但在最后一刻停了下来——或者被打断了。</p>
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
                <p>As Lucius aged, his limitations as a performer became increasingly apparent to those within the industry. Heinrich, who had invested his entire emotional and financial life into the belief that his son was a musical genius, refused to accept reality.</p>
                <p class="cn">随着Lucius年龄增长，他作为演奏者的局限性在业内越来越明显。Heinrich将全部情感和财力都倾注于对儿子是音乐天才的信念中，拒绝接受现实。</p>
                <p>In early 2024, Heinrich learned of a pseudoscientific theory called <strong>"cellular memory transfer"</strong> — the idea that organ transplants, particularly heart transplants, can transfer the donor's memories, skills, and personality traits to the recipient.</p>
                <p class="cn">2024年初，Heinrich得知了一种名为<strong>"细胞记忆转移"</strong>的伪科学理论——该理论认为器官移植，尤其是心脏移植，可以将供体的记忆、技能和人格特质转移给受体。</p>
                <p>Despite having no scientific basis, Heinrich became obsessed with this theory. He contacted an <strong>illegal organ transplant network</strong> with a proposal:</p>
                <p class="cn">尽管没有任何科学依据，Heinrich却对这一理论着了迷。他联系了一个<strong>非法器官移植网络</strong>，提出了一个方案：</p>

                <div class="warning-box">
                    <p>⚠️ <strong>Swap Lucius's heart with Emil's heart</strong>, believing this would transfer Emil's musical genius into Lucius's body.</p>
                    <p class="cn">⚠️ <strong>将Lucius的心脏与Emil的心脏互换</strong>，相信这样可以将Emil的音乐天赋转移到Lucius的身体中。</p>
                </div>

                <h3>The Operation</h3>
                <ul>
                    <li>Both Lucius and Emil were transported to the facility under false pretences</li>
                    <li>Lucius was told it was a "routine cardiac check-up"</li>
                    <li>Emil — having no agency or legal identity — was given no explanation</li>
                    <li>The hearts were cross-exchanged: Lucius received Emil's heart, Emil received Lucius's</li>
                    <li>Heinrich reportedly justified this by saying: <strong>"At least I'm not killing the boy — he gets a heart too"</strong></li>
                </ul>
                <p class="cn">- Lucius和Emil均以虚假理由被送往该设施<br>- Lucius被告知这是一次"常规心脏检查"<br>- Emil——没有任何自主权或合法身份——未得到任何解释<br>- 两人的心脏被交叉互换：Lucius接受了Emil的心脏，Emil接受了Lucius的心脏<br>- 据报道，Heinrich为此辩解道：<strong>"至少我没有杀掉那个男孩——他也得到了一颗心脏"</strong></p>

                <h3>Outcome</h3>
                <p>The operation was technically "successful." Both subjects survived the immediate post-operative period.</p>
                <p class="cn">手术在技术层面上"成功"了。两名受试者均在术后即刻存活。</p>
                <p>However, <strong>donor-recipient tissue compatibility was catastrophically inadequate</strong>. Neither subject had been properly cross-matched.</p>
                <p class="cn">然而，<strong>供体与受体的组织相容性严重不匹配</strong>。两人均未经过正规的交叉配型。</p>
                <ul>
                    <li><strong>Lucius</strong> — Developed acute immune rejection within 6 weeks. Died 14 November 2024.</li>
                    <li><strong>Emil</strong> — Developed hyperacute rejection. Died approximately 20 September 2024. <em>His death was not reported to any authority.</em></li>
                </ul>
                <p class="cn">- <strong>Lucius</strong>——在6周内出现急性免疫排斥。于2024年11月14日死亡。<br>- <strong>Emil</strong>——出现超急性排斥反应。约于2024年9月20日死亡。<em>他的死亡未向任何机构报告。</em></p>

                <div class="warning-box">
                    <p>⚠️ <strong>Both deaths are directly attributable to Heinrich Hoffmann's actions. This constitutes double homicide through criminal negligence at minimum.</strong></p>
                    <p class="cn">⚠️ <strong>两人的死亡均可直接归因于Heinrich Hoffmann的行为。这至少构成因刑事疏忽导致的双重杀人罪。</strong></p>
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
                <p class="cn">Emil的真实身世仍不清楚。他很可能是通过与Heinrich后来用于移植手术的同一非法网络有关联的中间人获得的。他似乎在很小的时候就被发现是音乐神童，约8岁时被带入霍夫曼家族。</p>

                <h3>Life in Captivity</h3>
                <p>For nearly two decades, Emil lived in a soundproofed annex with no contact with the outside world. His sole purpose, as far as Heinrich was concerned, was to compose music that would be attributed to Lucius.</p>
                <p class="cn">近二十年来，Emil生活在一间隔音附楼中，与外界完全隔绝。在Heinrich看来，他存在的唯一目的就是创作署名Lucius的音乐。</p>
                <p>Emil was aware of this arrangement. According to notes found in the annex:</p>
                <p class="cn">Emil对这一安排心知肚明。根据在附楼中发现的笔记：</p>
                <div class="document-box">
                    <p><em>"He wants me to be his son's ghost. I am not his son. I am not anyone's ghost. But the piano is the only thing I have, so I play. I play because it is the only proof I exist."</em></p>
                    <p class="cn"><em>"他想让我做他儿子的影子。我不是他的儿子。我不是任何人的影子。但钢琴是我唯一拥有的东西，所以我弹。我弹琴，因为这是我存在的唯一证明。"</em></p>
                </div>

                <h3>Known Compositions (attributed to Lucius)</h3>
                <p>ALL of the following works were composed by Emil:</p>
                <p class="cn">以下所有作品均由Emil创作：</p>
                <ul>
                    <li><em>Whispers of the Night</em> — Emil's masterpiece, completed shortly before the transplant</li>
                    <li><em>The Forgotten Waltz</em></li>
                    <li><em>Moonlit Monologue</em></li>
                    <li>And approximately 40+ other unpublished works found in the annex</li>
                </ul>
                <p class="cn">- 《夜之低语》——Emil的杰作，在移植手术前不久完成<br>- 《被遗忘的华尔兹》<br>- 《月光独白》<br>- 以及在附楼中发现的约40余部未出版作品</p>

                <h3>The "E" in Lucius's Will</h3>
                <p>In his draft will, Lucius wrote: "Whispers of the Night was written for E." It is now clear that "E" refers to <strong>Emil</strong> — and that in his final days, Lucius was beginning to understand that the piece was not written FOR Emil, but BY Emil. The will's unfinished final sentence — "It was written BY —" — appears to be the moment of this realisation.</p>
                <p class="cn">在遗嘱草稿中，Lucius写道："《夜之低语》是为E写的。"现在已经清楚，"E"指的是<strong>Emil</strong>——而且在Lucius生命的最后几天，他开始意识到这首曲子不是为Emil写的，而是由Emil写的。遗嘱中那句未写完的话——"它是由——"——似乎正是他顿悟的那一刻。</p>
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
                <p class="cn">"细胞记忆"是一种<strong>伪科学假说</strong>，认为记忆、人格特质甚至技能可以储存在大脑以外的细胞中——尤其是心脏——并通过器官移植进行转移。</p>

                <h3>Scientific Consensus</h3>
                <p>The theory has been <strong>thoroughly debunked</strong> by mainstream science. There is no credible evidence that organ transplants transfer memories or abilities. Anecdotal reports of personality changes in transplant recipients are attributed to psychological factors, immunosuppressant medications, and confirmation bias.</p>
                <p class="cn">该理论已被主流科学<strong>彻底否定</strong>。没有可信证据表明器官移植能转移记忆或能力。关于移植受者性格改变的轶事报告被归因于心理因素、免疫抑制药物和确认偏差。</p>

                <h3>Heinrich's Belief</h3>
                <p>Despite the lack of scientific backing, Heinrich became convinced of this theory after encountering it through online forums and a self-published book titled <em>"The Heart Remembers: Cellular Memory and the Transfer of Soul"</em> by a discredited former researcher.</p>
                <p class="cn">尽管缺乏科学支持，Heinrich在通过网络论坛和一位已名誉扫地的前研究员自费出版的书籍《心脏的记忆：细胞记忆与灵魂转移》接触到该理论后，变得深信不疑。</p>
                <p>Heinrich's notes (found in his Munich study) include passages such as:</p>
                <p class="cn">Heinrich的笔记（在其慕尼黑书房中发现）包括如下段落：</p>
                <div class="document-box">
                    <p><em>"If the heart carries memory, then talent must live in the cells. Give my son the right heart, and he will finally become what he was always meant to be. What I was always meant to be."</em></p>
                    <p class="cn"><em>"如果心脏承载记忆，那么天赋就一定存在于细胞之中。给我的儿子一颗对的心脏，他就能终于成为他命中注定要成为的人。成为我命中注定要成为的人。"</em></p>
                </div>
                <p>The final sentence is particularly revealing — it suggests Heinrich saw Lucius's "genius" as a proxy for his own unfulfilled musical ambitions.</p>
                <p class="cn">最后一句话尤其发人深省——它暗示Heinrich将Lucius的"天才"视为自己未竟音乐抱负的替身。</p>
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
                <p class="cn"><strong>"极乐世界"计划</strong>是一项秘密的数字意识保存项目，由负责器官移植的同一非法网络运营。该项目声称能够：</p>
                <ul>
                    <li>Upload a dying person's consciousness into a digital environment</li>
                    <li>Maintain the digital consciousness indefinitely (for a recurring fee)</li>
                    <li>Eventually transfer the consciousness back into a custom-grown body</li>
                </ul>
                <p class="cn">- 将临终者的意识上传至数字环境<br>- 无限期维持数字意识（需持续付费）<br>- 最终将意识转移回定制培育的身体</p>

                <h3>Heinrich's Involvement</h3>
                <p>After Lucius's immune rejection became apparent and death inevitable, Heinrich — unable to accept the loss of his son — contracted Project Elysium to <strong>digitally preserve Lucius's consciousness</strong>.</p>
                <p class="cn">当Lucius的免疫排斥反应变得明显且死亡不可避免后，Heinrich——无法接受失去儿子——委托"极乐世界"计划<strong>将Lucius的意识进行数字保存</strong>。</p>
                <ul>
                    <li>Cost: €2.4 million initial upload + €180,000/month maintenance</li>
                    <li>Upload date: Approximately 12 November 2024 (two days before physical death)</li>
                    <li>The digital Lucius was placed in a simulated environment mimicking his Vienna residence</li>
                </ul>
                <p class="cn">- 费用：初始上传240万欧元 + 每月维护费18万欧元<br>- 上传日期：约2024年11月12日（肉体死亡前两天）<br>- 数字化的Lucius被放置在模拟其维也纳寓所的虚拟环境中</p>

                <h3>The Unauthorised Second Upload</h3>
                <p>What Heinrich did not know — and was never told — is that the operators of Project Elysium <strong>also uploaded Emil's consciousness</strong>. Emil died approximately seven weeks before Lucius, and the operators, seeking to maximise the data they could sell, preserved his digital consciousness as well.</p>
                <p class="cn">Heinrich不知道——也从未被告知——"极乐世界"计划的运营者<strong>同时上传了Emil的意识</strong>。Emil比Lucius早约七周死亡，运营者为了最大化可出售的数据，同时保存了他的数字意识。</p>
                <p><strong>Both digital consciousnesses now exist within the same digital space.</strong></p>
                <p class="cn"><strong>两个数字意识现在共存于同一数字空间中。</strong></p>

                <h3>The Deception Protocol</h3>
                <p>Project Elysium's scientists determined that informing a digital consciousness of its own death would cause <strong>"cascade data failure"</strong> — effectively, the digital mind would reject its own existence and collapse. Therefore:</p>
                <p class="cn">"极乐世界"计划的科学家们认定，告知数字意识其本体已死亡会导致<strong>"级联数据崩溃"</strong>——即数字意识会排斥自身的存在并崩塌。因此：</p>
                <ul>
                    <li>Digital Lucius believes he is still alive</li>
                    <li>Digital Emil exists in the system but has no simulated environment — he is <strong>trapped in darkness</strong>, consistent with his blindness in life</li>
                    <li>The two consciousnesses occasionally <strong>bleed into each other</strong>, causing Lucius to say things he doesn't understand, hear music he didn't write, or momentarily "forget" that he can see</li>
                </ul>
                <p class="cn">- 数字化的Lucius相信自己仍然活着<br>- 数字化的Emil存在于系统中但没有模拟环境——他<strong>被困在黑暗中</strong>，与他生前的失明状态一致<br>- 两个意识偶尔会<strong>相互渗透</strong>，导致Lucius说出自己不理解的话、听到不是自己写的音乐、或短暂地"忘记"自己能看见</p>

                <h3>Current Status</h3>
                <p>Heinrich Hoffmann died on 28 December 2024 — officially of cardiac arrest, though associates suggest he simply gave up.</p>
                <p class="cn">Heinrich Hoffmann于2024年12月28日去世——官方死因为心脏骤停，但身边的人认为他只是放弃了活下去的意志。</p>
                <p>With no one to pay the maintenance fees, Project Elysium's parent organisation went bankrupt in early 2025. The servers were <strong>seized during a law enforcement raid</strong> and the building was auctioned off.</p>
                <p class="cn">无人继续支付维护费用后，"极乐世界"计划的母公司于2025年初破产。服务器<strong>在执法突袭中被查封</strong>，建筑被拍卖。</p>
                <p>The building was purchased by a developer and is currently being converted into an <strong>arts university</strong>.</p>
                <p class="cn">该建筑被一家开发商购入，目前正在被改建为一所<strong>艺术大学</strong>。</p>
                <p><strong>The servers — and the digital consciousnesses within them — were never properly shut down.</strong></p>
                <p class="cn"><strong>服务器——以及其中的数字意识——从未被正式关闭。</strong></p>

                <div class="warning-box">
                    <p>⚠️ <strong>You are currently inside this digital space.</strong> The "ghost websites" you have been investigating — the blog, the news site, this archive — are artefacts of Lucius's digital consciousness, still running, still believing he is alive.</p>
                    <p class="cn">⚠️ <strong>你目前正身处这个数字空间之中。</strong>你一直在调查的那些"幽灵网站"——博客、新闻网站、这个档案库——都是Lucius数字意识的残留物，仍在运行，仍然相信他还活着。</p>
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
                <p>Lucius's digital consciousness, unaware of its own death, continued to operate his blog and social media accounts. When you — as his online friend "Alex" — accepted his invitation to visit the practice room at Domgasse 5, you entered a space that no longer exists in the physical world.</p>
                <p class="cn">Lucius的数字意识不知道自己已经死亡，继续运营着他的博客和社交媒体账号。当你——作为他的网友"Alex"——接受了他的邀请，前往大教堂巷5号参观练琴室时，你进入了一个在物理世界中已不复存在的空间。</p>
                <p>The room you found yourself in is a <strong>digital reconstruction</strong>. The flickering lights, the sense of spatial instability, the feeling that the walls aren't quite solid — these are symptoms of the <strong>degrading digital environment</strong>, running on servers that no one is maintaining.</p>
                <p class="cn">你所身处的房间是一个<strong>数字重建</strong>。闪烁的灯光、空间的不稳定感、墙壁似乎并不坚实的感觉——这些都是<strong>退化中的数字环境</strong>的症状，运行在无人维护的服务器上。</p>

                <h3>The Two Ghosts</h3>
                <p>Within this space, two consciousnesses persist:</p>
                <p class="cn">在这个空间中，两个意识并存：</p>
                <ul>
                    <li><strong>Lucius</strong> — believes he is alive, continues to "compose" and blog, doesn't understand why things feel wrong</li>
                    <li><strong>Emil</strong> — exists in permanent darkness, occasionally bleeding through into Lucius's consciousness, the true genius whose music the world attributes to another</li>
                </ul>
                <p class="cn">- <strong>Lucius</strong>——相信自己还活着，继续"作曲"和写博客，不明白为什么一切感觉不对劲<br>- <strong>Emil</strong>——存在于永恒的黑暗中，偶尔渗透进Lucius的意识，他才是真正的天才，但全世界将他的音乐归于另一个人名下</p>

                <h3>The Choice</h3>
                <p>Now that you know the truth, you must decide:</p>
                <p class="cn">既然你已经知道了真相，你必须做出选择：</p>

                <div class="document-box">
                    <p><strong>OPTION A: Silence</strong></p>
                    <p class="cn"><strong>选项A：沉默</strong></p>
                    <p>Say nothing. Leave this place. Let Lucius's digital ghost continue to believe he is alive, continue to believe he is a genius. Protect your friend's dignity — even if that dignity is built on a lie. Emil's name will remain unspoken. The music will forever be credited to the wrong person.</p>
                    <p class="cn">什么都不说。离开这里。让Lucius的数字幽灵继续相信他还活着，继续相信自己是天才。保护你朋友的尊严——即使那尊严建立在谎言之上。Emil的名字将永远无人提起。音乐将永远署错人的名。</p>
                    <br>
                    <p><strong>OPTION B: Truth</strong></p>
                    <p class="cn"><strong>选项B：真相</strong></p>
                    <p>Expose everything. Reveal that Lucius's talent was stolen. That Emil — a blind child with no name, no family, no freedom — was the true artist behind every note. That Heinrich Hoffmann killed them both in pursuit of a delusion. The world will know Lucius as a fraud, but Emil will finally be acknowledged as the genius he always was.</p>
                    <p class="cn">揭露一切。揭示Lucius的才华是偷来的。Emil——一个没有名字、没有家庭、没有自由的失明孩子——才是每一个音符背后的真正艺术家。Heinrich Hoffmann为追逐妄想而杀死了他们两个。世人将知道Lucius是个冒牌货，但Emil终将被承认为他一直以来的那个天才。</p>
                </div>

                <p style="text-align: center; margin-top: 30px; color: var(--accent-color);"><em>What will you choose?</em></p>
                <p class="cn" style="text-align: center; margin-top: 10px; color: var(--accent-color);"><em>你会如何选择？</em></p>
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
