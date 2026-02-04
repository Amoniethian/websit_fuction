/**
 * 私人 Wiki 配置文件
 * ==================
 * 修改此文件来自定义所有 Wiki 内容和密码
 */

const WIKI_CONFIG = {
    // ========== 网站基本信息 ==========
    siteName: "Hoffmann Family Archives",
    siteSubtitle: "私人档案库",
    siteDescription: "冯·霍夫曼家族内部资料存档",
    lastUpdated: "2024年11月10日",

    // ========== 登录配置 ==========
    // 用于解锁加密内容的凭据
    credentials: {
        username: "tester",
        password: "test1234"
    },

    // ========== Wiki 条目（公开内容）==========
    // 无需登录即可查看的内容
    publicEntries: [
        {
            id: "family-overview",
            title: "家族概述",
            category: "基本信息",
            lastModified: "2024年8月15日",
            content: `
                <p>冯·霍夫曼家族是欧洲最显赫的工业家族之一，起源于19世纪的德国巴伐利亚地区。</p>

                <h3>家族产业</h3>
                <p>家族核心产业为钢铁制造和重工业，在欧洲多国设有工厂和办事处。据估计，家族资产总值超过120亿欧元。</p>

                <h3>家族成员</h3>
                <ul>
                    <li><strong>海因里希·冯·霍夫曼</strong> - 现任家族掌门人，集团董事长</li>
                    <li><strong>玛格丽特·冯·霍夫曼</strong> - 海因里希之妻（已故）</li>
                    <li><strong>艾德里安·冯·霍夫曼</strong> - 独子，钢琴演奏家</li>
                </ul>

                <h3>家族格言</h3>
                <p><em>"Stärke durch Einheit"</em> —— 团结铸就力量</p>
            `
        },
        {
            id: "heinrich",
            title: "海因里希·冯·霍夫曼",
            category: "人物档案",
            lastModified: "2024年9月3日",
            content: `
                <div class="info-card">
                    <p><strong>出生：</strong>1958年4月22日</p>
                    <p><strong>职位：</strong>霍夫曼工业集团董事长兼CEO</p>
                    <p><strong>居住地：</strong>德国慕尼黑</p>
                </div>

                <h3>生平简介</h3>
                <p>海因里希于1982年从其父手中接管家族企业，在其领导下，霍夫曼工业的规模扩大了近十倍。他以铁腕管理风格著称，被称为"钢铁之狼"。</p>

                <h3>家庭</h3>
                <p>1990年与玛格丽特结婚，1996年独子艾德里安出生。2008年，玛格丽特因病去世，海因里希此后未再婚。</p>

                <h3>争议</h3>
                <p>海因里希与儿子艾德里安的关系一直是媒体关注的焦点。据传，父子二人因艾德里安拒绝继承家业而关系紧张。</p>
            `
        },
        {
            id: "adrian",
            title: "艾德里安·冯·霍夫曼",
            category: "人物档案",
            lastModified: "2024年10月20日",
            content: `
                <div class="info-card">
                    <p><strong>出生：</strong>1996年3月12日</p>
                    <p><strong>职业：</strong>钢琴演奏家</p>
                    <p><strong>居住地：</strong>奥地利维也纳</p>
                </div>

                <h3>音乐生涯</h3>
                <p>艾德里安5岁开始学习钢琴，12岁便在柏林爱乐大厅举办首场个人演奏会，被誉为"欧洲最有才华的青年钢琴家"。</p>

                <h3>演出风格</h3>
                <p>近年来，艾德里安选择远离大型商业演出，转而在欧洲各国举办私人沙龙式音乐会。他认为"音乐应该触及灵魂，而不是填满场馆"。</p>

                <h3>代表作品</h3>
                <ul>
                    <li>《夜之絮语》（2024）</li>
                    <li>《遗忘的华尔兹》（2023）</li>
                    <li>《月下独白》（2022）</li>
                </ul>

                <div class="restricted-notice">
                    <p>🔒 <strong>更多详细信息需要授权访问</strong></p>
                </div>
            `
        },
        {
            id: "estate",
            title: "维也纳私人寓所",
            category: "资产档案",
            lastModified: "2024年7月8日",
            content: `
                <h3>位置</h3>
                <p>位于维也纳第一区内城区，靠近斯蒂芬大教堂。</p>

                <h3>详情</h3>
                <p>这座19世纪的历史建筑于2019年由艾德里安购入，经过精心修复后成为其主要居所。</p>
                <p>寓所内设有专业级录音室和一架1920年代的斯坦威三角钢琴。</p>

                <div class="restricted-notice">
                    <p>🔒 <strong>地址详情和平面图需要授权访问</strong></p>
                </div>
            `
        }
    ],

    // ========== Wiki 条目（加密内容）==========
    // 需要登录后才能查看的内容
    restrictedEntries: [
        {
            id: "adrian-detailed",
            title: "艾德里安·冯·霍夫曼 - 详细档案",
            category: "机密档案",
            classification: "内部资料",
            lastModified: "2024年11月5日",
            content: `
                <div class="classified-header">
                    <span class="classification-badge">内部资料</span>
                    <span>访问记录已启用</span>
                </div>

                <h3>心理评估摘要</h3>
                <p>根据2023年的心理评估报告，艾德里安表现出轻度抑郁倾向，主要源于与父亲的长期紧张关系以及对公众关注的厌恶。</p>
                <p>评估建议减少公开演出，增加私人社交活动。</p>

                <h3>财务状况</h3>
                <ul>
                    <li>信托基金：约3500万欧元（母亲遗产）</li>
                    <li>个人资产：约800万欧元</li>
                    <li>年收入（演出）：约120万欧元</li>
                </ul>
                <p><em>注：艾德里安主动放弃了家族企业的继承权，但保留了母亲遗产的全部权益。</em></p>

                <h3>重要关系人</h3>
                <table class="data-table">
                    <tr><th>姓名</th><th>关系</th><th>备注</th></tr>
                    <tr><td>海因里希·冯·霍夫曼</td><td>父亲</td><td>关系紧张，近年来鲜有联系</td></tr>
                    <tr><td>汉斯·韦伯教授</td><td>导师</td><td>维也纳音乐学院，亦师亦友</td></tr>
                    <tr><td>艾琳娜·佩特洛娃</td><td>前女友</td><td>俄罗斯小提琴家，2022年分手</td></tr>
                    <tr><td>马克西米利安·施泰因</td><td>私人助理</td><td>自2020年起服务</td></tr>
                </table>

                <h3>近期行程（已过期）</h3>
                <ul>
                    <li>10月28日 - 布拉格私人演出</li>
                    <li>11月5日 - 返回维也纳</li>
                    <li>11月14日 - 计划会见家族律师</li>
                </ul>
            `
        },
        {
            id: "estate-detailed",
            title: "维也纳寓所 - 详细信息",
            category: "机密档案",
            classification: "内部资料",
            lastModified: "2024年6月20日",
            content: `
                <div class="classified-header">
                    <span class="classification-badge">内部资料</span>
                    <span>访问记录已启用</span>
                </div>

                <h3>地址</h3>
                <p><strong>Domgasse 5, 1010 Wien, Österreich</strong></p>
                <p>（多姆巷5号，维也纳第一区）</p>

                <h3>建筑详情</h3>
                <ul>
                    <li>建筑年代：1872年</li>
                    <li>建筑面积：约420平方米</li>
                    <li>楼层：4层（艾德里安占用顶部两层）</li>
                </ul>

                <h3>安保系统</h3>
                <p>配备现代化安保系统，包括：</p>
                <ul>
                    <li>24小时监控摄像</li>
                    <li>生物识别门禁（指纹+面部）</li>
                    <li>应急警报系统（直连当地警局）</li>
                </ul>
                <p><em>安保密码每月更新，由私人助理管理。</em></p>

                <h3>紧急联系人</h3>
                <p>马克西米利安·施泰因（私人助理）：+43 XXX XXXXXX</p>
            `
        },
        {
            id: "incident-report",
            title: "事件报告 #2024-1108",
            category: "机密档案",
            classification: "高度机密",
            lastModified: "2024年11月12日",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">高度机密</span>
                    <span>仅限授权人员查看</span>
                </div>

                <h3>事件概述</h3>
                <p><strong>日期：</strong>2024年11月8日</p>
                <p><strong>地点：</strong>维也纳私人寓所</p>
                <p><strong>报告人：</strong>马克西米利安·施泰因</p>

                <h3>事件经过</h3>
                <p>11月8日下午，施泰因先生按约定时间前往寓所，发现艾德里安先生情绪异常低落。据观察：</p>
                <ul>
                    <li>书房内发现大量揉皱的纸张，似为未完成的信件草稿</li>
                    <li>钢琴盖已关闭超过三天（极为罕见）</li>
                    <li>艾德里安提及"一切都要结束了"，但拒绝进一步解释</li>
                </ul>

                <h3>后续跟进</h3>
                <p>施泰因先生建议艾德里安联系心理咨询师，但被拒绝。</p>
                <p>11月10日，艾德里安取消了原定于11月15日与家族律师的会面。</p>

                <div class="warning-box">
                    <p>⚠️ <strong>备注：</strong>此报告于11月14日事件发生前完成。目前已移交相关部门。</p>
                </div>
            `
        },
        {
            id: "secret-document",
            title: "遗嘱草稿",
            category: "法律文件",
            classification: "高度机密",
            lastModified: "2024年11月10日",
            content: `
                <div class="classified-header">
                    <span class="classification-badge danger">高度机密</span>
                    <span>法律敏感文件</span>
                </div>

                <h3>文件说明</h3>
                <p>以下为在艾德里安寓所书房发现的手写遗嘱草稿（未签署）转录：</p>

                <div class="document-box">
                    <p><em>致可能关心的人：</em></p>
                    <p><em>如果你正在读这封信，说明我已经不在了。</em></p>
                    <p><em>我将我所有的音乐作品版权赠予维也纳音乐学院，用于支持年轻音乐家的培养。</em></p>
                    <p><em>我的私人物品，包括那架斯坦威，留给韦伯教授。他会知道如何让它继续歌唱。</em></p>
                    <p><em>至于母亲留下的信托基金，请全部捐赠给欧洲儿童音乐教育基金会。</em></p>
                    <p><em>父亲，如果你看到这个——我从未恨过你。我只是无法成为你想要的那个人。希望你能理解。</em></p>
                    <p><em>最后，关于那首《夜之絮语》，它是写给 E 的。她知道是谁。</em></p>
                    <p><em>再见。</em></p>
                    <p style="text-align: right;"><em>—— A</em></p>
                </div>

                <h3>文件状态</h3>
                <p>此草稿未经签署，不具备法律效力。原件已由家族律师保管。</p>
            `
        }
    ],

    // ========== 分类配置 ==========
    categories: [
        { id: "basic", name: "基本信息", icon: "📋" },
        { id: "person", name: "人物档案", icon: "👤" },
        { id: "asset", name: "资产档案", icon: "🏛️" },
        { id: "classified", name: "机密档案", icon: "🔒" },
        { id: "legal", name: "法律文件", icon: "📄" }
    ],

    // ========== 界面配置 ==========
    ui: {
        primaryColor: "#1a1a2e",
        accentColor: "#4a90a4",
        loginTitle: "授权访问",
        loginSubtitle: "请输入凭据以访问受限内容",
        loginError: "用户名或密码错误",
        loggedInMessage: "已登录 - 可访问所有内容"
    }
};
