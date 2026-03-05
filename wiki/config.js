/**
 * Genius Persona Simulator — Archive Configuration
 * ==================================================
 * 3-tier password system
 * Passwords: test1, test2, test3
 * Watermarks on each tier page: 2002, 2018, 2021
 */

const WIKI_CONFIG = {
    // ========== Site Info ==========
    siteName: "Genius Persona Simulator",
    siteSubtitle: "Classified Archive",
    siteDescription: "Unauthorised access prohibited. Enter passphrase to proceed.",
    lastUpdated: "14 November 2024",

    // ========== Password Tiers ==========
    tiers: [
        {
            id: 1,
            password: "test1",
            label: "Level 1 \u2014 Project Origins",
            unlockMessage: "Level 1 access granted \u2014 Project Origins unlocked"
        },
        {
            id: 2,
            password: "test2",
            label: "Level 2 \u2014 Recipient Files",
            unlockMessage: "Level 2 access granted \u2014 Recipient archives unlocked"
        },
        {
            id: 3,
            password: "test3",
            label: "Level 3 \u2014 Donor Files",
            unlockMessage: "Level 3 access granted \u2014 Donor archives unlocked"
        }
    ],

    // ========== Categories ==========
    categories: [
        { name: "Project", icon: "\ud83d\udcca" },
        { name: "Medical", icon: "\ud83c\udfe5" },
        { name: "Subject", icon: "\ud83d\udc64" },
        { name: "Record", icon: "\ud83d\udcc4" }
    ],

    // ========== UI ==========
    ui: {
        loginTitle: "Archive Access",
        loginSubtitle: "Enter passphrase to unlock restricted files",
        loginError: "Invalid passphrase. Access denied."
    },

    // ========== Public Entries (none \u2014 archive requires password) ==========
    publicEntries: [],

    // ========== Tier 1: Project Origins (password: test1) ==========
    tier1Entries: [
        {
            id: "project-origins",
            title: "Project Origins \u2014 The Dawn Project",
            category: "Project",
            classification: "RESTRICTED",
            lastModified: "2002",
            content: `
                <div style="padding:20px;background:#f9f5f0;border-left:4px solid #c9a96e;margin-bottom:20px;border-radius:2px;">
                    <p><strong>PROJECT CLASSIFICATION: RESTRICTED</strong></p>
                </div>

                <p>This project originated from the <strong>Dawn Project</strong> \u2014 a medical programme launched in 1994 by the National Institute of Perceptual Research in the United Kingdom, designed to help "highly sensitive adolescents" stabilise and develop their talents through neuroscience and artistic training.</p>
                <p class="cn">本项目起源于<strong>曙光计划</strong>\u2014\u20141994年由英国国家感知研究院启动的医学项目，旨在通过神经科学与艺术训练，帮助"高敏感青少年"稳定并发展其天赋。</p>

                <p>The Dawn Project was reported for ethical violations and excessive risk shortly after launch, and faced mandatory shutdown. Mr. Hoffmann submitted an independent commission application to the Dawn Project before its closure, which was <strong>rejected</strong>.</p>
                <p class="cn">曙光计划于项目启动后不久，因伦理争议及风险过高被举报，随即面临强制关停。霍夫曼先生于关停前向曙光计划提交独立委托申请，遭<strong>拒绝</strong>。</p>

                <p>Subsequently, Mr. Hoffmann sought independent channels to advance the research on his own, and sponsored the establishment of this archive.</p>
                <p class="cn">此后，霍夫曼先生转而寻求独立渠道，自行主导推进相关研究，并赞助建立本档案馆。</p>

                <h3>Core Experiment</h3>
                <h3 class="cn">核心实验</h3>
                <p>The core experiment of this project is a <strong>bilateral cross-transplant of hearts between two living subjects</strong>, followed by subsequent neural grafting surgery.</p>
                <p class="cn">本项目核心实验为两名活体受试者之间的<strong>双向心脏交叉互换手术</strong>及后续神经移植手术。</p>

                <p>According to this network's records, this is the <strong>most extreme surgical commission ever accepted</strong>.</p>
                <p class="cn">据本网络记录，这是迄今接受委托的<strong>最极端手术方案</strong>。</p>

                <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                    <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;width:40%;">Commissioner</td><td style="padding:8px;">Mr. Hoffmann</td></tr>
                    <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">Subjects</td><td style="padding:8px;">Two students of the Royal Academy of Music</td></tr>
                    <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">Surgical Objective</td><td style="padding:8px;">Musical talent transfer via cellular memory</td></tr>
                </table>
                <table style="width:100%;border-collapse:collapse;margin:20px 0;" class="cn">
                    <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;width:40%;">委托方</td><td style="padding:8px;">霍夫曼先生</td></tr>
                    <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">受试者</td><td style="padding:8px;">两名英国皇家音乐学院学生</td></tr>
                    <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">手术目标</td><td style="padding:8px;">通过细胞记忆转移，实现音乐天赋迁移</td></tr>
                </table>

                <h3>Surgical Risk Assessment</h3>
                <h3 class="cn">手术风险评估</h3>
                <p>Following organ transplantation, some recipients have reported experiencing memories, emotions, or personality changes associated with the donor. Mainstream medicine tends to attribute these to drug reactions or psychological suggestion, but such cases cannot be dismissed.</p>
                <p class="cn">器官移植后，部分受体报告出现与供体相关的记忆、情绪或人格变化。主流医学界倾向于将其解释为药物反应或心理暗示，但相关案例不容忽视。</p>

                <p>The most thoroughly documented case: <strong>an 8-year-old girl received the heart of a murdered girl. After the transplant, she began having extremely vivid nightmares of a man killing her in a forest. Her descriptions were so detailed \u2014 including time, location, the killer's clothing, and even the killer's words \u2014 that police used the details she provided to actually apprehend the murderer. It was an unsolved case from before the donor's death.</strong></p>
                <p class="cn">其中记录最为详尽的一例：<strong>一名8岁女孩接受了一颗被谋杀女孩的心脏后，开始梦见供体遇害的经过，包括地点、时间、凶手衣着与凶手说的话。警方依据女孩提供的细节竟然真的将凶手抓获，那是供体生前从未告破的命案。</strong></p>

                <p>This project therefore infers: <em>if memory can transfer with the heart, perhaps talent can too.</em></p>
                <p class="cn">本项目由此推断：<em>如果记忆可以随心脏转移，天赋或许也可以。</em></p>

            `
        }
    ],

    // ========== Tier 2: Recipient Files (password: test2) ==========
    tier2Entries: [
        {
            id: "surgery-report",
            title: "Surgery Result Report",
            category: "Medical",
            classification: "TOP SECRET",
            lastModified: "2002",
            content: `
                <div style="padding:15px;background:#fff3f3;border-left:4px solid #cc0000;margin-bottom:20px;border-radius:2px;">
                    <p><strong>\u26a0 CLASSIFICATION: TOP SECRET \u2014 RECIPIENT FILE</strong></p>
                </div>

                <div style="background:#f5f5f5;padding:15px;border-radius:4px;margin-bottom:20px;">
                    <h4>Surgery Result Report</h4>
                    <h4 class="cn">手术结果报告</h4>
                    <p>The surgery encountered <strong>irreversible complications at the third hour</strong>.</p>
                    <p class="cn">手术于<strong>第三小时出现不可逆并发症</strong>。</p>
                    <p>Bilateral heart cross-transplant completed. <strong>Neural grafting failed.</strong></p>
                    <p class="cn">双向心脏交叉互换完成。<strong>神经接驳失败。</strong></p>
                    <p>Both subjects ceased vital signs on the operating table.</p>
                    <p class="cn">两名受试者于手术台上相继停止生命体征。</p>
                    <ul style="margin:10px 0 10px 20px;">
                        <li><strong>Recipient Lucius Hoffmann:</strong> Faint brainwave activity. Residual consciousness signals detected.</li>
                        <li><strong>Donor Chord:</strong> Heart merged into Subject A's body. Residual consciousness signals of unknown origin detected.</li>
                    </ul>
                    <ul style="margin:10px 0 10px 20px;" class="cn">
                        <li><strong>受体 Lucius Hoffmann：</strong>脑电波微弱，存在残留意识信号。</li>
                        <li><strong>供体 Chord：</strong>心脏并入受试者A体内，意识信号残留，来源不明。</li>
                    </ul>
                    <p style="color:#cc0000;font-weight:bold;">Recommendation: Terminate project.</p>
                    <p style="color:#cc0000;font-weight:bold;" class="cn">建议终止项目。</p>
                </div>
            `
        },
        {
            id: "commissioner-decision",
            title: "Commissioner Decision Record",
            category: "Record",
            classification: "TOP SECRET",
            lastModified: "2002",
            content: `
                <div style="background:#f5f5f5;padding:15px;border-radius:4px;margin-bottom:20px;">
                    <h4>Heinrich Hoffmann \u2014 Dictated Record</h4>
                    <h4 class="cn">Heinrich Hoffmann \u2014 口述记录</h4>
                    <blockquote style="border-left:3px solid #c9a96e;padding:10px 15px;margin:15px 0;font-style:italic;background:#faf8f5;">
                        <p>"I do not accept this outcome. The body can wait. Consciousness must not be allowed to dissipate.</p>
                        <p>Initiate backup protocol immediately. Upload all data from both subjects and merge. Freeze the bodies for preservation, awaiting future medical conditions for physical restoration.</p>
                        <p>The project will continue. Designation: <strong>Genius Persona Simulator</strong>."</p>
                    </blockquote>
                    <blockquote style="border-left:3px solid #c9a96e;padding:10px 15px;margin:15px 0;font-style:italic;background:#faf8f5;" class="cn">
                        <p>"我不接受这个结果。肉体可以等待，意识不能消散。</p>
                        <p>即刻启动备用方案，将两人全部数据上传并合并。肉体冷冻保存，等待医学条件成熟后复原。</p>
                        <p>项目继续运行，命名：<strong>天才人格模拟器</strong>。"</p>
                    </blockquote>
                </div>
            `
        },
        {
            id: "recipient-timeline",
            title: "Recipient Lucius Hoffmann \u2014 Consciousness Status Log",
            category: "Subject",
            classification: "TOP SECRET",
            lastModified: "2021",
            content: `
                <div style="padding:15px;background:#fff3f3;border-left:4px solid #cc0000;margin-bottom:20px;border-radius:2px;">
                    <p><strong>CONSCIOUSNESS STATUS LOG \u2014 RECIPIENT</strong></p>
                </div>

                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:#f5f5f5;"><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">Year</th><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">Status</th></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 1</td><td style="padding:10px;">Recipient consciousness stable. No anomalies detected. Subject believes he is living normally. Practises piano daily.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 9</td><td style="padding:10px;">Recipient established online accounts. Attracted large following of internet fans. Constant controversy. Conversations with certain netizens <strong>reinforced the recipient's consciousness</strong>.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 12</td><td style="padding:10px;">Recipient self-reported: "My heartbeat sometimes doesn't feel like my own." Episodes brief, did not raise alarm.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 15</td><td style="padding:10px;">Recipient began experiencing perceptual anomalies. Light sensitivity. Intermittent perception fragments inconsistent with own memories. Attributed symptoms to fatigue.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 18</td><td style="padding:10px;">Pronounced personality fluctuations. Voluntarily shut off room lights. Navigated space by touch in darkness. <strong>Intermittently composed musical notes not belonging to own memory.</strong> Unable to explain these behaviours.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 19</td><td style="padding:10px;color:#cc0000;">Commissioner gravely ill. Funding drastically reduced. System entered power-saving mode. Continuous data loss.</td></tr>
                </table>
                <table style="width:100%;border-collapse:collapse;" class="cn">
                    <tr style="background:#f5f5f5;"><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">年份</th><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">状态</th></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第1年</td><td style="padding:10px;">受体意识稳定，未察觉异常，以为自己正常生活，每日练琴。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第9年</td><td style="padding:10px;">受体建立了网络账号，吸引大量网络粉丝的关注，争议不断。其与一些网友的对话<strong>强化了受体的意识</strong>。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第12年</td><td style="padding:10px;">受体自述"心跳节拍有时候不像自己的"，持续时间短暂，未引起警觉。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第15年</td><td style="padding:10px;">受体开始出现感知异常，对光线产生不适，间歇性出现与自身记忆不符的感知片段。受体将上述症状归因于疲劳，未深究。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第18年</td><td style="padding:10px;">受体出现明显人格波动，自主关闭房间灯光，在黑暗中以触觉感知空间，<strong>间歇性创造出不属于自己记忆的音符</strong>。受体无法对上述行为进行解释。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第19年</td><td style="padding:10px;color:#cc0000;">委托方病重，资金大幅削减。系统进入节能模式，数据持续丢失。</td></tr>
                </table>

            `
        }
    ],

    // ========== Tier 3: Donor Files (password: test3) ==========
    tier3Entries: [
        {
            id: "donor-adoption",
            title: "Donor Adoption Record \u2014 Chord Paul",
            category: "Record",
            classification: "TOP SECRET",
            lastModified: "2000",
            content: `
                <div style="padding:15px;background:#fff3f3;border-left:4px solid #cc0000;margin-bottom:20px;border-radius:2px;">
                    <p><strong>\u26a0 CLASSIFICATION: TOP SECRET \u2014 DONOR FILE</strong></p>
                </div>

                <div style="background:#f5f5f5;padding:15px;border-radius:4px;margin-bottom:20px;">
                    <h4>Adoption Record</h4>
                    <h4 class="cn">收养记录</h4>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;width:35%;">Applicant</td><td style="padding:8px;">Heinrich Hoffmann</td></tr>
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">Adopted Person</td><td style="padding:8px;">Chord Paul</td></tr>
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">Date of Adoption</td><td style="padding:8px;">March 2000</td></tr>
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">Stated Reason</td><td style="padding:8px;">Orphan, exceptionally talented. Applicant to bear all living and educational expenses.</td></tr>
                        <tr><td style="padding:8px;font-weight:bold;">Status</td><td style="padding:8px;color:green;">Adoption approved.</td></tr>
                    </table>
                    <table style="width:100%;border-collapse:collapse;" class="cn">
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;width:35%;">申请人</td><td style="padding:8px;">Heinrich Hoffmann</td></tr>
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">被收养人</td><td style="padding:8px;">Chord Paul</td></tr>
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">收养日期</td><td style="padding:8px;">2000年3月</td></tr>
                        <tr style="border-bottom:1px solid #ddd;"><td style="padding:8px;font-weight:bold;">理由</td><td style="padding:8px;">孤儿，天赋卓越，申请人承担其生活及教育费用</td></tr>
                        <tr><td style="padding:8px;font-weight:bold;">状态</td><td style="padding:8px;color:green;">收养批准。</td></tr>
                    </table>
                </div>

                <div style="background:#2a2a2a;color:#ff6666;padding:15px;border-radius:4px;margin-bottom:20px;">
                    <h4 style="color:#ff9999;">Internal Notes</h4>
                    <h4 style="color:#ff9999;" class="cn">内部备注</h4>
                    <p>Adopted person has been moved to a separate room in the estate. <strong>Room is soundproofed.</strong> Equipped with piano and recording devices. Minimum 8 hours of daily piano practice required. Data archived in real-time.</p>
                    <p class="cn">被收养人已移入庄园独立房间。<strong>房间隔音</strong>，配置钢琴及录音设备。每日练琴不低于8小时，数据实时存档。</p>
                    <p><strong>No external communication permitted. No independent outings.</strong></p>
                    <p class="cn"><strong>无对外通讯，不得独自外出。</strong></p>
                    <p>All performance data, after processing, to be used as material for Recipient Lucius Hoffmann's perceptual training.</p>
                    <p class="cn">所有演奏数据经处理后作为素材用于受体Lucius Hoffmann的感知训练。</p>
                    <p>Adopted person made multiple attempts to contact the outside world in the initial period.</p>
                    <p class="cn">被收养人初期多次尝试与外界联系。</p>
                    <p style="color:#ff9999;"><strong>In 2002, adopted person was transferred to the operating theatre. No further records exist.</strong></p>
                    <p style="color:#ff9999;" class="cn"><strong>2002年，被收养人被移送手术室。此后无相关记录。</strong></p>
                    <p style="margin-top:10px;font-style:italic;">Official statement: "The individual voluntarily went into seclusion and suspended public performances."</p>
                    <p style="margin-top:10px;font-style:italic;" class="cn">对外口径："本人自愿隐居，暂停公开演出。"</p>
                </div>
            `
        },
        {
            id: "donor-timeline",
            title: "Donor Chord Paul \u2014 Consciousness Status Log",
            category: "Subject",
            classification: "TOP SECRET",
            lastModified: "2021",
            content: `
                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:#f5f5f5;"><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">Year</th><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">Status</th></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 1</td><td style="padding:10px;">Donor consciousness signal faint. Completely suppressed.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 9</td><td style="padding:10px;">Donor consciousness continues suppressed. No significant activity.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 12</td><td style="padding:10px;">Donor exhibits intermittent consciousness activity.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 15</td><td style="padding:10px;">Donor consciousness infiltration frequency increasing.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 18</td><td style="padding:10px;"><strong>Donor consciousness suppression has failed.</strong> Infiltration frequency significantly elevated.</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">Year 19</td><td style="padding:10px;color:#cc0000;">Commissioner gravely ill. Funding drastically reduced. System entered power-saving mode. Continuous data loss. <strong>Donor consciousness can no longer be suppressed. Both consciousnesses now alternate frequently.</strong> System unstable. Collapse imminent.</td></tr>
                </table>
                <table style="width:100%;border-collapse:collapse;" class="cn">
                    <tr style="background:#f5f5f5;"><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">年份</th><th style="padding:10px;text-align:left;border-bottom:2px solid #ddd;">状态</th></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第1年</td><td style="padding:10px;">供体意识信号微弱，完全受压制。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第9年</td><td style="padding:10px;">供体意识持续受压制，无明显活动。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第12年</td><td style="padding:10px;">供体出现间歇性意识活动。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第15年</td><td style="padding:10px;">供体意识渗透频率增加。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第18年</td><td style="padding:10px;"><strong>供体意识压制失效</strong>，渗透频率显著上升。</td></tr>
                    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px;font-weight:bold;">第19年</td><td style="padding:10px;color:#cc0000;">委托方病重，资金大幅削减。系统进入节能模式，数据持续丢失。<strong>供体意识已无法压制，两人意识频繁交替出现。</strong>系统不稳定，随时面临崩溃。</td></tr>
                </table>

                <div style="margin-top:30px;padding:20px;background:#1a1a1a;color:#ff6666;border-radius:4px;text-align:center;">
                    <p style="font-size:14px;margin-bottom:8px;"><strong>\u26a0 SYSTEM NOTICE</strong></p>
                    <p style="font-size:14px;margin-bottom:8px;" class="cn"><strong>\u26a0 系统通知</strong></p>
                    <p>Commissioner deceased (Year 20). Project has lost all funding support.</p>
                    <p class="cn">委托方已于第20年离世。项目失去资金支持。</p>
                    <p>Server fees overdue. Current system storage critically insufficient.</p>
                    <p class="cn">服务器欠费，当前系统储存空间严重不足。</p>
                    <p style="font-size:16px;font-weight:bold;margin-top:10px;color:#fff;">After system assessment: remaining computing power can only sustain ONE consciousness.</p>
                    <p style="font-size:16px;font-weight:bold;margin-top:10px;color:#fff;" class="cn">经系统评估，剩余算力仅可维持<strong>一个</strong>意识体运行。</p>
                </div>

            `
        }
    ],

    // ========== Tier 4: Not used ==========
    tier4Entries: []
};
