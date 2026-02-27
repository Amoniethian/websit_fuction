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
            id: "lucio",
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
                <p>Lucius began learning piano at age 5, studying under <strong>Professor Hans Weber</strong> at the Vienna Conservatory — one of Europe's most celebrated piano pedagogues. A diligent and hardworking student, he held his first solo recital at 16 and has since performed at numerous prestigious venues across Europe, including the Vienna Musikverein and the Salzburg Festival fringe programme.</p>
                <p class="cn">Lucius五岁开始学琴，师从维也纳音乐学院的<strong>Hans Weber教授</strong>——欧洲最著名的钢琴教育家之一。他勤奋刻苦，16岁举办首场独奏会，此后在欧洲众多知名场馆演出，包括维也纳金色大厅和萨尔茨堡音乐节外围项目。</p>

                <h3>Recognition</h3>
                <p>Lucius has been praised by cultural ministers and politicians across multiple countries. He was named one of Forbes Europe's "30 Under 30" in the arts category, and his performances have drawn attention from both the classical music establishment and a large online following. He is widely respected in the industry as a serious, dedicated musician.</p>
                <p class="cn">Lucius受到多国文化部长和政要的赞赏。他曾入选《福布斯》欧洲"30位30岁以下精英"艺术类榜单，其演出同时吸引了古典音乐圈和大量网络粉丝的关注。他在业内被广泛视为一位严肃、敬业的音乐家。</p>

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
            id: "lucio-detailed",
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

                <h3>Family Photos</h3>
                <div style="display:flex; gap:16px; flex-wrap:wrap; margin:15px 0;">
                    <div style="flex:1; min-width:200px;">
                        <div style="border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                            <img src="../assets/images/wiki/heinrich-portrait.jpg" alt="Heinrich Hoffmann — Portrait" style="width:100%; display:block;">
                        </div>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:6px; text-align:center;">Heinrich Hoffmann, 2022</p>
                        <p class="cn" style="font-size:12px; color:var(--text-muted); margin-top:2px; text-align:center;">Heinrich Hoffmann，2022年</p>
                    </div>
                    <div style="flex:1; min-width:200px;">
                        <div style="border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                            <img src="../assets/images/wiki/heinrich-lucius-together.jpg" alt="Heinrich and Lucius Hoffmann" style="width:100%; display:block;">
                        </div>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:6px; text-align:center;">Heinrich & Lucius, Vienna, 2023</p>
                        <p class="cn" style="font-size:12px; color:var(--text-muted); margin-top:2px; text-align:center;">Heinrich与Lucius，维也纳，2023年</p>
                    </div>
                </div>

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
                    <li>Lucius's own compositional attempts (identified by his hand) are described by analysts as <strong>"technically accomplished and artistically mature, consistent with a highly trained professional — but qualitatively distinct from the night compositions, which represent a transcendent level of genius"</strong></li>
                    <li>Multiple manuscripts show Lucius's handwriting layered ON TOP of the unknown hand, as if retracing</li>
                </ul>
                <p class="cn">- 原始手稿的笔迹分析显示<strong>两种截然不同的笔迹</strong>——一种与Lucius吻合，另一种身份不明<br>- "不明笔迹"负责了所有技术复杂段落和大部分和声结构<br>- Lucius本人的作曲尝试（通过其笔迹识别）被分析师描述为<strong>"技术精湛且艺术上成熟，与高水平专业人士一致——但与夜间作品有本质区别，后者呈现出超越性的天才水平"</strong><br>- 多份手稿显示Lucius的笔迹覆盖在不明笔迹之上，似为描摹</p>

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
            id: "chord-basic",
            title: "Subject File: 'Chord' (No Surname)",
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
                    <p><strong>Known as:</strong> Chord (no registered surname)</p>
                    <p><strong>Born:</strong> ~1997 (exact date unknown)</p>
                    <p><strong>Status:</strong> Visually impaired from birth (bilateral anophthalmia)</p>
                    <p><strong>Nominal relation:</strong> Listed in some documents as Heinrich Hoffmann's illegitimate son</p>
                    <p><strong>Actual relation:</strong> None. Chord himself has never acknowledged this claim.</p>
                </div>

                <h3>Background</h3>
                <p>Chord was placed in Heinrich Hoffmann's care through unclear circumstances approximately in 2005, reportedly discovered in an orphanage in Eastern Europe. Born into extreme poverty with no family or patron, he was described by those who met him as <strong>mild-tempered, gentle, and almost unnervingly compliant</strong> — and as a piano prodigy of extraordinary ability, capable of composing complex works entirely by ear and through Braille notation.</p>
                <p class="cn">Chord于大约2005年通过不明途径被置于Heinrich Hoffmann的监护之下，据报道是在东欧一家孤儿院被发现的。他出身赤贫，没有家人也没有庇护者。见过他的人形容他<strong>性情温和、温顺，近乎令人不安地顺从</strong>——同时也是天赋非凡的钢琴神童，能够完全凭听觉和盲文记谱法创作复杂作品。</p>

                <h3>Living Conditions</h3>
                <p>Chord has been housed in a <strong>soundproofed annex</strong> attached to one of the Hoffmann family's properties. He has had <strong>no public presence, no official identity documents, and no contact with the outside world</strong> beyond Hoffmann-controlled staff.</p>
                <p class="cn">Chord被安置在霍夫曼家族某处房产附属的<strong>隔音附楼</strong>中。他<strong>没有任何公开身份、没有正式身份证件，也没有与外界的任何联系</strong>，只能接触霍夫曼控制下的工作人员。</p>
                <p>When questioned about this arrangement, Heinrich stated that Chord "prefers solitude" and that the arrangement was "for his own protection."</p>
                <p class="cn">当被问及这一安排时，Heinrich表示Chord"喜欢独处"，这种安排是"为了保护他"。</p>

                <h3>Musical Output</h3>
                <p>A comparison of Chord's known compositions with Lucius's published works shows a <strong>near-perfect match</strong> in harmonic language, structural patterns, and stylistic fingerprints.</p>
                <p class="cn">将Chord的已知作品与Lucius的已发表作品进行比较，发现在和声语言、结构模式和风格特征上呈现<strong>近乎完美的吻合</strong>。</p>

                <div class="warning-box">
                    <p>⚠️ <strong>Implication:</strong> Chord appears to be the true author of all major works attributed to Lucius.</p>
                    <p class="cn">⚠️ <strong>含义：</strong>Chord似乎才是所有署名Lucius的主要作品的真正作者。</p>
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
                    <p><em>And about "Whispers of the Night" — it was written for C. He knows who he is.</em></p>
                    <p class="cn"><em>关于《夜之低语》——它是为C写的。他知道自己是谁。</em></p>
                    <p><em>No. That's not right either. It wasn't written FOR him. It was written BY — </em></p>
                    <p class="cn"><em>不。这也不对。它不是为他写的。它是由——</em></p>
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
            id: "project-aurora",
            title: "TOP SECRET: Project Aurora (曙光计划)",
            category: "Top Secret",
            classification: "TOP SECRET",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">TOP SECRET</span>
                    <span>Organisation profile — criminal investigation pending</span>
                </div>

                <h3>Project Overview</h3>
                <div class="info-card">
                    <p><strong>Project codename:</strong> Aurora (曙光计划)</p>
                    <p><strong>Public name:</strong> Aurora International Organ Donation Initiative</p>
                    <p><strong>Founded:</strong> 2017, registered in Zurich, Switzerland</p>
                    <p><strong>Stated mission:</strong> Provide life-saving organ transplants to underprivileged children worldwide</p>
                    <p><strong>Actual function:</strong> Front for an illegal organ procurement and transplant network</p>
                    <p><strong>Status:</strong> Under investigation by Europol since January 2025</p>
                </div>

                <h3>Public Face</h3>
                <p>On the surface, Project Aurora appeared to be a legitimate humanitarian initiative. It published annual reports, held charity galas in Vienna and Munich, and maintained partnerships with several Eastern European hospitals. Its website showcased dozens of "success stories" — children who had received life-saving transplants through the programme.</p>
                <p class="cn">表面上，曙光计划看起来是一个合法的人道主义项目。它发布年度报告，在维也纳和慕尼黑举办慈善晚宴，并与多家东欧医院保持合作关系。其网站展示了数十个"成功案例"——通过该项目接受了救命移植手术的儿童。</p>

                <h3>The Reality</h3>
                <p>In reality, Project Aurora operated a <strong>dual-track system</strong>:</p>
                <p class="cn">实际上，曙光计划运行着一个<strong>双轨体系</strong>：</p>
                <ul>
                    <li><strong>Track A (public):</strong> Genuine organ donation facilitation — approximately 30% of operations were legitimate, providing cover</li>
                    <li><strong>Track B (covert):</strong> Illegal organ procurement, black-market transplants, and experimental surgical procedures for wealthy clients willing to pay</li>
                </ul>
                <p class="cn">- <strong>A轨（公开）：</strong>真正的器官捐赠协调——约30%的手术是合法的，用以提供掩护<br>- <strong>B轨（隐蔽）：</strong>非法器官采购、黑市移植手术，以及为愿意付费的富裕客户进行实验性外科手术</p>
                <p>Heinrich Hoffmann was one of Track B's most significant clients. His transplant order — a bilateral cardiac cross-exchange between two living subjects — was reportedly the most extreme procedure ever commissioned through the network.</p>
                <p class="cn">Heinrich Hoffmann是B轨最重要的客户之一。他下达的移植订单——两个活体受试者之间的双向心脏交叉互换——据报道是该网络有史以来接受委托的最极端手术。</p>

                <div class="warning-box">
                    <p>⚠️ Project Aurora's charitable activities were a <strong>calculated smokescreen</strong>. Every legitimate transplant it facilitated served to mask dozens of illegal ones.</p>
                    <p class="cn">⚠️ 曙光计划的慈善活动是一层<strong>精心设计的烟幕</strong>。它促成的每一台合法移植手术，都在掩盖数十台非法手术。</p>
                </div>

                <p style="margin-top:20px; color: var(--accent-color);"><em>→ See BLACK ARCHIVE (Level 4) for full operational documents and scanned evidence.</em></p>
                <p class="cn" style="color: var(--accent-color);"><em>→ 完整行动文件及扫描证据见黑色档案（第4层）。</em></p>
            `
        },
        {
            id: "gifted-children-foundation",
            title: "TOP SECRET: Gifted Children Foundation (天才儿童基金会)",
            category: "Top Secret",
            classification: "TOP SECRET",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">TOP SECRET</span>
                    <span>Shell organisation — linked to Project Aurora</span>
                </div>

                <h3>Organisation Profile</h3>
                <div class="info-card">
                    <p><strong>Full name:</strong> The Hoffmann Foundation for Gifted Children (天才儿童基金会)</p>
                    <p><strong>Founded:</strong> 2019, Vienna, Austria</p>
                    <p><strong>Founder:</strong> Heinrich Hoffmann</p>
                    <p><strong>Board members:</strong> Heinrich Hoffmann (chair), two unnamed associates, one legal proxy</p>
                    <p><strong>Stated mission:</strong> Support exceptionally talented young musicians through scholarships and mentorship</p>
                    <p><strong>Actual function:</strong> Financial conduit and administrative shell for Project Aurora's Track B operations</p>
                </div>

                <h3>The Cover</h3>
                <p>The Gifted Children Foundation (GCF) presented itself as a philanthropic initiative dedicated to nurturing musical prodigies. It awarded scholarships, hosted masterclasses, and funded concert tours for young pianists. Heinrich frequently cited the foundation in interviews as proof of his commitment to "the next generation of talent."</p>
                <p class="cn">天才儿童基金会（GCF）对外宣称是一个致力于培养音乐神童的慈善机构。它颁发奖学金、举办大师班、并资助年轻钢琴家的音乐会巡演。Heinrich在采访中频繁提及该基金会，作为他"致力于下一代人才"的证明。</p>

                <h3>The Truth</h3>
                <p>Financial records recovered from Heinrich's Munich study reveal that <strong>over 70% of the foundation's funds were funnelled directly to Project Aurora</strong>. The GCF served three critical functions:</p>
                <p class="cn">从Heinrich慕尼黑书房中找到的财务记录显示，<strong>基金会超过70%的资金被直接输送到了曙光计划</strong>。天才儿童基金会承担了三个关键功能：</p>
                <ul>
                    <li><strong>Money laundering:</strong> Charitable donations were reclassified as "medical grants" and wired to Aurora's offshore accounts</li>
                    <li><strong>Talent scouting:</strong> The foundation's "scholarship programme" was used to identify musically gifted children — some of whom were flagged for Aurora's experimental programme</li>
                    <li><strong>Surgical logistics:</strong> The GCF paid for the cardiac transplant operation directly, disguised as "emergency medical aid for a scholarship recipient"</li>
                </ul>
                <p class="cn">- <strong>洗钱：</strong>慈善捐款被重新归类为"医疗拨款"，汇入曙光计划的离岸账户<br>- <strong>人才搜寻：</strong>基金会的"奖学金项目"被用于筛选有音乐天赋的儿童——其中一些被标记为曙光计划实验项目的目标<br>- <strong>手术后勤：</strong>天才儿童基金会直接支付了心脏移植手术的费用，伪装成"对奖学金获得者的紧急医疗援助"</p>

                <h3>Key Financial Transfer</h3>
                <div class="document-box">
                    <p><strong>Date:</strong> 18 August 2024</p>
                    <p><strong>From:</strong> GCF Account (Erste Bank, Vienna) — IBAN ending ...4471</p>
                    <p><strong>To:</strong> Aurora Medical Services Ltd (Raiffeisen, Bratislava) — IBAN ending ...8903</p>
                    <p><strong>Amount:</strong> €1,850,000</p>
                    <p><strong>Reference:</strong> "Emergency cardiac intervention — Scholar #12"</p>
                    <p><em>Note: "Scholar #12" does not correspond to any real scholarship recipient in GCF records.</em></p>
                </div>
                <p class="cn"><strong>日期：</strong>2024年8月18日 | <strong>来自：</strong>GCF账户（维也纳Erste银行）| <strong>至：</strong>曙光医疗服务有限公司（布拉迪斯拉发Raiffeisen银行）| <strong>金额：</strong>€1,850,000 | <strong>备注：</strong>"紧急心脏干预——学者#12"<br><em>注："学者#12"与GCF记录中任何真实奖学金获得者均不对应。</em></p>

                <div class="warning-box">
                    <p>⚠️ The Gifted Children Foundation was <strong>not a charity</strong>. It was a purpose-built instrument to fund the heart transplant that killed Lucius and Chord.</p>
                    <p class="cn">⚠️ 天才儿童基金会<strong>不是慈善机构</strong>。它是一个专门用来资助那场杀死Lucius和Chord的换心手术的工具。</p>
                </div>

                <p style="margin-top:20px; color: var(--accent-color);"><em>→ See BLACK ARCHIVE (Level 4) for scanned financial documents and internal communications.</em></p>
                <p class="cn" style="color: var(--accent-color);"><em>→ 扫描财务文件及内部通信见黑色档案（第4层）。</em></p>
            `
        },
        {
            id: "personality-simulation",
            title: "TOP SECRET: Genius Personality Simulation Project (天才人格模拟计划)",
            category: "Top Secret",
            classification: "TOP SECRET",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">TOP SECRET</span>
                    <span>Experimental programme — subjects deceased</span>
                </div>

                <h3>Project Summary</h3>
                <div class="info-card">
                    <p><strong>Project codename:</strong> Genius Personality Simulation (天才人格模拟计划)</p>
                    <p><strong>Parent programme:</strong> Project Aurora — Track B, Experimental Division</p>
                    <p><strong>Principal investigator:</strong> Unknown (alias "Dr. Voss")</p>
                    <p><strong>Sponsor:</strong> Heinrich Hoffmann, via Gifted Children Foundation</p>
                    <p><strong>Subjects:</strong> Lucius Hoffmann (Subject L) and Chord (Subject C)</p>
                    <p><strong>Theoretical basis:</strong> Cellular memory transfer — <em>pseudoscience</em></p>
                    <p><strong>Outcome:</strong> Both subjects deceased</p>
                </div>

                <h3>Premise</h3>
                <p>The Genius Personality Simulation Project was built on the <strong>pseudoscientific hypothesis of "cellular memory transfer"</strong> — the belief that memories, personality traits, and creative abilities are stored in organ cells (particularly the heart) and can be transferred through transplantation.</p>
                <p class="cn">天才人格模拟计划建立在<strong>"细胞记忆转移"这一伪科学假说</strong>之上——认为记忆、人格特质和创造力储存在器官细胞（尤其是心脏）中，可以通过移植进行转移。</p>
                <p>Heinrich Hoffmann, obsessed with this theory, commissioned Aurora's experimental division to attempt a <strong>bilateral cardiac cross-exchange</strong> between his son Lucius and a captive musical prodigy known only as Chord — believing this would transfer Chord's genius into Lucius.</p>
                <p class="cn">Heinrich Hoffmann痴迷于这一理论，委托曙光计划的实验部门尝试在其子Lucius和一位被囚禁的音乐天才Chord之间进行<strong>双向心脏交叉互换</strong>——相信这样做能将Chord的天赋转移到Lucius身上。</p>

                <h3>The Subjects</h3>
                <table style="width:100%; border-collapse:collapse; margin:15px 0;">
                    <tr style="border-bottom:1px solid var(--border-color);">
                        <th style="text-align:left; padding:8px; color:var(--text-muted);">—</th>
                        <th style="text-align:left; padding:8px;">Subject L (Lucius)</th>
                        <th style="text-align:left; padding:8px;">Subject C (Chord)</th>
                    </tr>
                    <tr style="border-bottom:1px solid var(--border-color);">
                        <td style="padding:8px; color:var(--text-muted);">Role</td>
                        <td style="padding:8px;">Recipient (intended beneficiary)</td>
                        <td style="padding:8px;">Donor (unwilling; no consent)</td>
                    </tr>
                    <tr style="border-bottom:1px solid var(--border-color);">
                        <td style="padding:8px; color:var(--text-muted);">Awareness</td>
                        <td style="padding:8px;">Told it was a "routine cardiac check-up"</td>
                        <td style="padding:8px;">Given no explanation</td>
                    </tr>
                    <tr style="border-bottom:1px solid var(--border-color);">
                        <td style="padding:8px; color:var(--text-muted);">Post-op</td>
                        <td style="padding:8px;">Acute immune rejection — died 14 Nov 2024</td>
                        <td style="padding:8px;">Hyperacute rejection — died ~20 Sep 2024</td>
                    </tr>
                </table>

                <h3>Leaked Internal Recording</h3>
                <p>The following video was recovered from a seized Aurora server. It shows a fragment of a pre-operation briefing attended by "Dr. Voss" and an unidentified associate. The recording quality is poor — believed to have been captured covertly by a staff member.</p>
                <p class="cn">以下视频从被查封的曙光计划服务器中找到。内容是一段术前简报的片段，出席者为"Voss博士"及一名身份不明的同伙。录像质量较差——据信是一名工作人员秘密拍摄的。</p>
                <div style="margin:20px 0; background:#000; border-radius:8px; overflow:hidden;">
                    <video controls style="width:100%; display:block;" poster="../assets/images/wiki-scans/scan-08.jpg">
                        <source src="../assets/videos/aurora-briefing.mp4" type="video/mp4">
                        <p style="color:#999; padding:20px; text-align:center;">⚠ Video file not available — file may have been corrupted during server seizure</p>
                    </video>
                </div>

                <div class="warning-box">
                    <p>⚠️ <strong>Both Lucius and Chord were used as experimental subjects without informed consent.</strong> Neither survived. This programme constitutes criminal human experimentation.</p>
                    <p class="cn">⚠️ <strong>Lucius和Chord均在未获得知情同意的情况下被用作实验对象。</strong>两人均未存活。此项目构成犯罪性人体实验。</p>
                </div>

                <p style="margin-top:20px; color: var(--accent-color);"><em>→ Full experiment protocol, surgical records, and scanned evidence available in BLACK ARCHIVE (Level 4).</em></p>
                <p class="cn" style="color: var(--accent-color);"><em>→ 完整实验方案、手术记录及扫描证据见黑色档案（第4层）。</em></p>
            `
        }
    ],

    // ========== Tier 4 Entries (password: test4) ==========
    tier4Entries: [
        {
            id: "aurora-full-docs",
            title: "BLACK ARCHIVE: Project Aurora — Full Operational Documents",
            category: "Black Archive",
            classification: "BLACK",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">BLACK ARCHIVE</span>
                    <span>⚠ SCANNED EVIDENCE — LAW ENFORCEMENT COPY</span>
                </div>

                <h3>Recovered Documents</h3>
                <p>The following documents were recovered during the Europol raid on Aurora's Eastern European facility in January 2025. Originals are held as evidence; these are authorised digital scans.</p>
                <p class="cn">以下文件于2025年1月欧洲刑警组织突袭曙光计划东欧设施时被找到。原件作为证据保存；以下为授权数字扫描件。</p>

                <h3>Document 1 — Surgical Consent Form (Forged)</h3>
                <p>This form bears Lucius Hoffmann's signature, but handwriting analysis confirms it was <strong>forged by Heinrich Hoffmann</strong>. Lucius never consented to a cardiac transplant.</p>
                <p class="cn">此表格上有Lucius Hoffmann的签名，但笔迹分析确认签名由<strong>Heinrich Hoffmann伪造</strong>。Lucius从未同意进行心脏移植。</p>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-01.jpg" alt="Scan 01 — Forged consent form" style="width:100%; display:block;">
                </div>

                <h3>Document 2 — Organ Compatibility Report (Falsified)</h3>
                <p>The cross-match report was deliberately falsified to show compatibility. In reality, neither subject had been properly typed. The report was signed by "Dr. Voss" — a known alias.</p>
                <p class="cn">交叉配型报告被故意伪造为显示相容。实际上两名受试者均未进行正规配型。报告由"Voss博士"签署——已知为化名。</p>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-02.jpg" alt="Scan 02 — Falsified compatibility report" style="width:100%; display:block;">
                </div>

                <h3>Document 3 — Internal Memo from Heinrich Hoffmann</h3>
                <p>Handwritten memo from Heinrich to the Aurora team, authorising "Phase III" of the operation. The memo explicitly references "the blind boy's heart" and states: <em>"proceed regardless of compatibility concerns — I accept full responsibility."</em></p>
                <p class="cn">Heinrich写给曙光计划团队的手写备忘录，授权手术"第三阶段"。备忘录明确提及"那个盲童的心脏"，并声明：<em>"无论相容性问题如何，继续进行——我承担全部责任。"</em></p>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-03.jpg" alt="Scan 03 — Heinrich's internal memo" style="width:100%; display:block;">
                </div>

                <h3>Document 4 — Financial Transfer Records (GCF → Dr. Voss)</h3>
                <p>Bank transfer records showing €1.85 million moved from the Gifted Children Foundation to Aurora Medical Services Ltd, disguised as "emergency cardiac intervention — Scholar #12." A second transfer of €400,000 was labelled "post-operative care."</p>
                <p class="cn">银行转账记录显示185万欧元从天才儿童基金会转至曙光医疗服务有限公司，伪装为"紧急心脏干预——学者#12"。第二笔40万欧元的转账标注为"术后护理"。</p>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-04.jpg" alt="Scan 04 — Financial transfer records" style="width:100%; display:block;">
                </div>

                <div class="warning-box">
                    <p>⚠️ These documents constitute primary evidence in an ongoing criminal investigation. Unauthorised distribution is a criminal offence.</p>
                    <p class="cn">⚠️ 这些文件构成正在进行的刑事调查的主要证据。未经授权的传播属刑事犯罪。</p>
                </div>
            `
        },
        {
            id: "simulation-full-protocol",
            title: "BLACK ARCHIVE: Genius Personality Simulation — Full Protocol",
            category: "Black Archive",
            classification: "BLACK",
            lastModified: "15 November 2024",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">BLACK ARCHIVE</span>
                    <span>⚠ CRIMINAL HUMAN EXPERIMENTATION — FULL RECORDS</span>
                </div>

                <h3>Experiment Protocol</h3>
                <p>The complete protocol for the Genius Personality Simulation Project, recovered from Dr. Voss's encrypted workstation. The document reveals the full scope of the experiment — far more extensive than a simple organ swap.</p>
                <p class="cn">天才人格模拟计划的完整方案，从Voss博士的加密工作站中恢复。该文件揭示了实验的全部范围——远比简单的器官互换更为广泛。</p>

                <h3>Document 5 — Subject Profile: Chord (Pre-Operation)</h3>
                <p>Chord's complete medical and psychological profile, compiled without his knowledge. Notes describe him as "an ideal donor — no legal identity, no family, no one to report him missing. Musical ability: extraordinary. Psychological state: docile, compliant."</p>
                <p class="cn">在Chord不知情的情况下编制的完整医学和心理档案。笔记将他描述为"理想供体——无合法身份、无家人、无人会报告其失踪。音乐能力：非凡。心理状态：温顺、服从。"</p>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-05.jpg" alt="Scan 05 — Chord's subject profile" style="width:100%; display:block;">
                </div>

                <h3>Document 6 — Post-Operative Report: Dual Transplant</h3>
                <p>The surgical team's post-operative report. Notes that both subjects survived the procedure but flags "significant immunological concerns." The report was never forwarded to any legitimate medical authority. A handwritten annotation in the margin reads: <em>"Compatibility issues — not our problem. Client was warned."</em></p>
                <p class="cn">手术团队的术后报告。记录两名受试者均在手术中存活，但标注"重大免疫学隐患"。该报告从未提交给任何合法医疗机构。页边有手写批注：<em>"相容性问题——不是我们的问题。客户已被警告。"</em></p>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-06.jpg" alt="Scan 06 — Post-operative report" style="width:100%; display:block;">
                </div>

                <h3>Document 7 — Communication Log: Heinrich ↔ Network</h3>
                <p>Encrypted messages recovered from Heinrich's Munich study, documenting months of communication between Heinrich and the Aurora network. Key excerpts:</p>
                <p class="cn">从Heinrich慕尼黑书房中恢复的加密消息，记录了Heinrich与曙光网络数月的通信。关键摘录：</p>
                <div class="document-box">
                    <p><strong>[12 March 2024]</strong> H: <em>"I need you to understand — this is not about saving a life. This is about transferring genius. The boy in the annex has what my son lacks. I want it moved."</em></p>
                    <p class="cn"><strong>[2024年3月12日]</strong> H：<em>"我需要你们理解——这不是为了救命。这是为了转移天赋。附楼里那个男孩拥有我儿子所缺少的东西。我要把它转移过去。"</em></p>
                    <br>
                    <p><strong>[5 July 2024]</strong> V: <em>"We can perform the exchange. Both subjects will receive a heart. Survival is probable but not guaranteed. You understand the risks."</em></p>
                    <p class="cn"><strong>[2024年7月5日]</strong> V：<em>"我们可以进行互换。两名受试者都会获得一颗心脏。存活有可能但不保证。你了解风险。"</em></p>
                    <br>
                    <p><strong>[28 August 2024]</strong> H: <em>"Do it. Transfer the funds through the foundation. Label it whatever you need to. Scholar #12."</em></p>
                    <p class="cn"><strong>[2024年8月28日]</strong> H：<em>"去做吧。通过基金会转账。标签随你怎么写。学者#12。"</em></p>
                </div>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-07.jpg" alt="Scan 07 — Communication log" style="width:100%; display:block;">
                </div>

                <h3>Document 8 — Experiment Protocol: Cellular Memory Transfer Trial #1</h3>
                <p>The formal experiment protocol document, titled <em>"Genius Personality Simulation via Cardiac Cellular Memory Transfer — Trial #1."</em> It outlines the theoretical framework, surgical procedure, and expected outcomes. The document is chilling in its clinical detachment — two human beings reduced to "Subject L" and "Subject C."</p>
                <p class="cn">正式实验方案文件，标题为<em>《通过心脏细胞记忆转移的天才人格模拟——试验#1》</em>。文件概述了理论框架、手术流程和预期结果。该文件以其冷酷的临床客观性令人毛骨悚然——两个活生生的人被简化为"受试者L"和"受试者C"。</p>
                <div class="document-box">
                    <p><strong>Hypothesis:</strong> Bilateral cardiac exchange between a musically gifted donor (Subject C) and a musically competent but non-prodigious recipient (Subject L) will result in measurable transfer of creative aptitude to the recipient.</p>
                    <p class="cn"><strong>假设：</strong>在音乐天赋极高的供体（受试者C）和音乐能力合格但非天才级别的受体（受试者L）之间进行双向心脏互换，将导致创造力向受体的可测量转移。</p>
                    <br>
                    <p><strong>Expected outcome:</strong> Subject L will demonstrate enhanced musical creativity within 4-8 weeks post-transplant, consistent with cellular memory integration.</p>
                    <p class="cn"><strong>预期结果：</strong>受试者L将在术后4-8周内表现出增强的音乐创造力，与细胞记忆整合一致。</p>
                    <br>
                    <p><strong>Actual outcome:</strong> <span style="color:#c0392b;">Both subjects deceased. Experiment terminated.</span></p>
                    <p class="cn"><strong>实际结果：</strong><span style="color:#c0392b;">两名受试者均已死亡。实验终止。</span></p>
                </div>
                <div style="margin:15px 0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                    <img src="../assets/images/wiki-scans/scan-08.jpg" alt="Scan 08 — Experiment protocol" style="width:100%; display:block;">
                </div>

                <div class="warning-box">
                    <p>⚠️ <strong>The Genius Personality Simulation Project was criminal human experimentation based on pseudoscience. Both Lucius Hoffmann and Chord died as direct results of this programme. Heinrich Hoffmann bears full criminal responsibility.</strong></p>
                    <p class="cn">⚠️ <strong>天才人格模拟计划是基于伪科学的犯罪性人体实验。Lucius Hoffmann和Chord均作为该计划的直接后果死亡。Heinrich Hoffmann承担全部刑事责任。</strong></p>
                </div>
            `
        },
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
                <p>What Heinrich did not know — and was never told — is that the operators of Project Elysium <strong>also uploaded Chord's consciousness</strong>. Chord died approximately seven weeks before Lucius, and the operators, seeking to maximise the data they could sell, preserved his digital consciousness as well.</p>
                <p class="cn">Heinrich不知道——也从未被告知——"极乐世界"计划的运营者<strong>同时上传了Chord的意识</strong>。Chord比Lucius早约七周死亡，运营者为了最大化可出售的数据，同时保存了他的数字意识。</p>
                <p><strong>Both digital consciousnesses now exist within the same digital space.</strong></p>
                <p class="cn"><strong>两个数字意识现在共存于同一数字空间中。</strong></p>

                <h3>The Deception Protocol</h3>
                <p>Project Elysium's scientists determined that informing a digital consciousness of its own death would cause <strong>"cascade data failure"</strong> — effectively, the digital mind would reject its own existence and collapse. Therefore:</p>
                <p class="cn">"极乐世界"计划的科学家们认定，告知数字意识其本体已死亡会导致<strong>"级联数据崩溃"</strong>——即数字意识会排斥自身的存在并崩塌。因此：</p>
                <ul>
                    <li>Digital Lucius believes he is still alive</li>
                    <li>Digital Chord exists in the system but has no simulated environment — he is <strong>trapped in darkness</strong>, consistent with his blindness in life</li>
                    <li>The two consciousnesses occasionally <strong>bleed into each other</strong>, causing Lucius to say things he doesn't understand, hear music he didn't write, or momentarily "forget" that he can see</li>
                </ul>
                <p class="cn">- 数字化的Lucius相信自己仍然活着<br>- 数字化的Chord存在于系统中但没有模拟环境——他<strong>被困在黑暗中</strong>，与他生前的失明状态一致<br>- 两个意识偶尔会<strong>相互渗透</strong>，导致Lucius说出自己不理解的话、听到不是自己写的音乐、或短暂地"忘记"自己能看见</p>

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
                    <li><strong>Chord</strong> — exists in permanent darkness, occasionally bleeding through into Lucius's consciousness, the true genius whose music the world attributes to another</li>
                </ul>
                <p class="cn">- <strong>Lucius</strong>——相信自己还活着，继续"作曲"和写博客，不明白为什么一切感觉不对劲<br>- <strong>Chord</strong>——存在于永恒的黑暗中，偶尔渗透进Lucius的意识，他才是真正的天才，但全世界将他的音乐归于另一个人名下</p>

                <h3>The Choice</h3>
                <p>Now that you know the truth, you must decide:</p>
                <p class="cn">既然你已经知道了真相，你必须做出选择：</p>

                <div class="document-box">
                    <p><strong>OPTION A: Silence</strong></p>
                    <p class="cn"><strong>选项A：沉默</strong></p>
                    <p>Say nothing. Leave this place. Let Lucius's digital ghost continue to believe he is alive, continue to believe he is a genius. Protect your friend's dignity — even if that dignity is built on a lie. Chord's name will remain unspoken. The music will forever be credited to the wrong person.</p>
                    <p class="cn">什么都不说。离开这里。让Lucius的数字幽灵继续相信他还活着，继续相信自己是天才。保护你朋友的尊严——即使那尊严建立在谎言之上。Chord的名字将永远无人提起。音乐将永远署错人的名。</p>
                    <br>
                    <p><strong>OPTION B: Truth</strong></p>
                    <p class="cn"><strong>选项B：真相</strong></p>
                    <p>Expose everything. Reveal that Lucius's talent was stolen. That Chord — a blind child with no name, no family, no freedom — was the true artist behind every note. That Heinrich Hoffmann killed them both in pursuit of a delusion. The world will know Lucius as a fraud, but Chord will finally be acknowledged as the genius he always was.</p>
                    <p class="cn">揭露一切。揭示Lucius的才华是偷来的。Chord——一个没有名字、没有家庭、没有自由的失明孩子——才是每一个音符背后的真正艺术家。Heinrich Hoffmann为追逐妄想而杀死了他们两个。世人将知道Lucius是个冒牌货，但Chord终将被承认为他一直以来的那个天才。</p>
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
