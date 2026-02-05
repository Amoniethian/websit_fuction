/**
 * Personal Blog Configuration
 * ============================
 * Edit this file to customize all blog content
 */

const BLOG_CONFIG = {
    // ========== Blogger Info ==========
    blogger: {
        name: "lucio_piano",
        displayName: "Lucio",
        avatar: "../assets/images/lucio-avatar.jpg",
        bio: "The piano is my language, music is my soul. Touring Europe, telling stories through keys.",
        location: "Vienna, Austria",
        verified: true,
        followers: 12847,
        following: 203,
        joinDate: "March 2019"
    },

    // ========== Current Visitor (Player) ==========
    visitor: {
        name: "Alex_Music_Lover",
        displayName: "Alex",
        avatar: "../assets/images/visitor-avatar.jpg",
        relationship: "online friend"
    },

    // ========== Blog Posts ==========
    // Reverse chronological (newest first)
    posts: [
        {
            id: 1,
            title: "A Night in Prague — Thoughts After the Last Recital / 布拉格之夜——最后一场演奏会后的感想",
            content: `
                <p>Last night's performance in Prague was the most satisfying one I've had in years.</p>
                <p class="cn">昨晚在布拉格的演出是我近年来最满意的一次。</p>
                <p>That old private estate, candlelight flickering, only thirty listeners. No camera flashes, no pressure of applause — just music and the sound of breathing.</p>
                <p class="cn">那座古老的私人庄园，烛光摇曳，只有三十位听众。没有闪光灯，没有掌声的压力——只有音乐和呼吸声。</p>
                <p>I played Moonlight Sonata, Chopin's Nocturnes, and finally my own <em>The Forgotten Waltz</em>.</p>
                <p class="cn">我演奏了《月光奏鸣曲》、肖邦的《夜曲》，最后是我自己的《被遗忘的华尔兹》。</p>
                <p>An old man wept. He said the piece reminded him of his late wife.</p>
                <p class="cn">一位老人流泪了。他说这首曲子让他想起了亡妻。</p>
                <p>This is why I choose private recitals — <strong>music should touch the soul, not fill stadiums.</strong></p>
                <p class="cn">这就是我选择私人演奏会的原因——<strong>音乐应该触动灵魂，而非填满体育场。</strong></p>
                <p>Heading back to Vienna next month. I need some rest.</p>
                <p class="cn">下个月回维也纳。我需要休息一下。</p>
                <p><small>P.S. — Woke up again at 3am last night. Found new pages of sheet music on the piano that I don't remember writing. Father says it's my subconscious, that genius expresses itself in strange ways. Maybe he's right. The melodies are always better than anything I write while awake.</small></p>
                <p class="cn"><small>附言——昨晚又在凌晨三点醒来。发现钢琴上多了几页我不记得写过的乐谱。父亲说那是我的潜意识，天才会以奇特的方式表达自己。也许他说得对。那些旋律总是比我清醒时写的好得多。</small></p>
            `,
            images: ["../assets/images/prague-concert.jpg"],
            publishDate: "28 October 2024",
            publishTime: "23:45",
            views: 3842,
            likes: 567,
            liked: false,
            comments: [
                {
                    id: 101,
                    username: "Piano_Dreams_22",
                    avatar: "../assets/images/user1.jpg",
                    content: "Beautiful! I wish I could have been there to hear you play in person 🎹",
                    time: "29 Oct 08:12",
                    likes: 23
                },
                {
                    id: 102,
                    username: "ViennaClassic",
                    avatar: "../assets/images/user2.jpg",
                    content: "The Forgotten Waltz is the most moving original piece I've ever heard. Looking forward to your return to Vienna!",
                    time: "29 Oct 10:34",
                    likes: 45
                },
                {
                    id: 103,
                    username: "RealTalk_Anon",
                    avatar: "../assets/images/user3.jpg",
                    content: "Not to be rude but... \"don't remember writing\"? That's not how composing works. Are you crediting the right person for these pieces? (无意冒犯，但是……'不记得写过'？作曲不是这样的。你确定这些作品署对人了吗？)",
                    time: "29 Oct 14:20",
                    likes: 7
                },
                {
                    id: 104,
                    username: "lucio_piano",
                    avatar: "../assets/images/lucio-avatar.jpg",
                    content: "@RealTalk_Anon I'm not sure what you're implying. Inspiration works differently for everyone.",
                    time: "29 Oct 15:03",
                    likes: 31
                }
            ]
        },
        {
            id: 2,
            title: "Rainy Days in Berlin / 柏林的雨天",
            content: `
                <p>Stuck in Berlin for three days. It hasn't stopped raining.</p>
                <p class="cn">困在柏林三天了。雨一直没停。</p>
                <p>There's a battered old upright piano in the hotel room, completely out of tune, but I played it all afternoon anyway.</p>
                <p class="cn">酒店房间里有一架破旧的立式钢琴，完全走音了，但我还是弹了一下午。</p>
                <p>Sometimes imperfect sounds carry more character. Like this city — scarred but still beautiful.</p>
                <p class="cn">有时候不完美的声音更有韵味。就像这座城市——伤痕累累，却依然美丽。</p>
                <p>Father called again. Same old topics. I've learned to just stay silent.</p>
                <p class="cn">父亲又打电话来了。老生常谈。我已经学会沉默以对。</p>
                <p>He keeps telling me I need to "perform bigger," that I'm "wasting my gift on small rooms." But he doesn't understand. It's not about the size of the room. It's about whether the music is <em>real</em>.</p>
                <p class="cn">他一直告诉我需要"更大的舞台"，说我在"把天赋浪费在小房间里"。但他不懂。重要的不是房间的大小，而是音乐是否<em>真实</em>。</p>
                <p><small>...Is it real? Sometimes I wonder. The notes come so easily in the night, but during the day, when I try to compose, my hands feel like they belong to someone else.</small></p>
                <p class="cn"><small>……它是真实的吗？有时候我也会怀疑。那些音符在夜里来得如此轻易，但白天当我试着作曲时，我的双手却像是属于别人的。</small></p>
            `,
            images: [],
            publishDate: "15 October 2024",
            publishTime: "19:22",
            views: 2156,
            likes: 342,
            liked: true,
            comments: [
                {
                    id: 201,
                    username: "Berlin_Night",
                    avatar: "../assets/images/user4.jpg",
                    content: "Berlin's rain does carry a unique kind of melancholy. Take care of yourself.",
                    time: "15 Oct 20:05",
                    likes: 12
                },
                {
                    id: 202,
                    username: "Alex_Music_Lover",
                    avatar: "../assets/images/visitor-avatar.jpg",
                    content: "Family stuff is complicated. Just let it be. Music is where you belong.",
                    time: "16 Oct 09:30",
                    likes: 8
                }
            ]
        },
        {
            id: 3,
            title: "New Composition: 'Whispers of the Night' Complete / 新作：《夜之低语》完成",
            content: `
                <p>Three months of work, and it's finally done.</p>
                <p class="cn">三个月的努力，终于完成了。</p>
                <p>This piece is written for someone — someone who may never hear it.</p>
                <p class="cn">这首曲子是为某个人而写的——一个也许永远无法听到它的人。</p>
                <p>Some things can't be said out loud. So let the notes speak instead.</p>
                <p class="cn">有些话无法说出口，就让音符代为倾诉吧。</p>
                <p>It will premiere at the Munich recital next week. I hope she can feel it.</p>
                <p class="cn">下周将在慕尼黑的演奏会上首演。希望她能感受到。</p>
                <p><em>"The night is gentle, whispers like poetry, only the piano understands my heart."</em></p>
                <p class="cn"><em>"夜色温柔，低语如诗，唯有钢琴懂我的心。"</em></p>
                <p><small>Correction — I should say it was "completed," not that I "finished writing it." I found the last three pages tucked inside the piano bench this morning. My handwriting, apparently, but I have no memory of it. Father's doctor says it could be a form of hypnagogic creativity. I suppose I should be grateful. The third movement is extraordinary — far beyond anything I could write consciously.</small></p>
                <p class="cn"><small>更正——我应该说它"被完成了"，而非我"写完了它"。今早我在琴凳里发现了最后三页乐谱。看起来是我的笔迹，但我完全不记得写过。父亲的医生说这可能是一种入睡前的创造性状态。我想我应该心存感激。第三乐章非凡绝伦——远超我清醒时能写出的任何作品。</small></p>
            `,
            images: ["../assets/images/composing.jpg"],
            publishDate: "20 September 2024",
            publishTime: "03:17",
            views: 5621,
            likes: 892,
            liked: false,
            comments: [
                {
                    id: 301,
                    username: "Chopin_Fan",
                    avatar: "../assets/images/user5.jpg",
                    content: "Posted at 3am again... Lucio please get some rest 😅",
                    time: "20 Sep 07:45",
                    likes: 34
                },
                {
                    id: 302,
                    username: "Munich_Melodies",
                    avatar: "../assets/images/user6.jpg",
                    content: "Already got my ticket! Can't wait for the premiere!!!",
                    time: "20 Sep 11:23",
                    likes: 27
                },
                {
                    id: 303,
                    username: "Classical_Soul",
                    avatar: "../assets/images/user7.jpg",
                    content: "\"Written for someone\"... how romantic. Who is she?",
                    time: "20 Sep 15:08",
                    likes: 56
                },
                {
                    id: 304,
                    username: "MusicTheory_Nerd",
                    avatar: "../assets/images/user8.jpg",
                    content: "I've been analysing your scores. The harmonic language in your 'night compositions' is radically different from your daytime interviews where you discuss theory. Almost like two different composers. Fascinating. (我一直在分析你的乐谱。你那些'夜间作品'的和声语言与你白天访谈中讨论的乐理截然不同。几乎像是两个不同的作曲家。耐人寻味。)",
                    time: "21 Sep 02:14",
                    likes: 3
                }
            ]
        },
        {
            id: 4,
            title: "On 'Inheritance' / 谈'继承'",
            content: `
                <p>Many people ask me why I won't take over the family business.</p>
                <p class="cn">很多人问我为什么不接手家族企业。</p>
                <p>The empire my father built is impressive, but it's not my world. Steel is cold; music is warm.</p>
                <p class="cn">父亲建立的帝国令人叹服，但那不是我的世界。钢铁是冷的，音乐是暖的。</p>
                <p>He doesn't understand. He probably never will. But I no longer need his understanding.</p>
                <p class="cn">他不理解。也许永远不会。但我不再需要他的理解了。</p>
                <p>Life is short. I only want to do what makes my soul burn.</p>
                <p class="cn">人生苦短。我只想做让灵魂燃烧的事。</p>
                <p>This might be the last time I publicly discuss family matters. From now on, only music.</p>
                <p class="cn">这也许是我最后一次公开讨论家事。从今以后，只谈音乐。</p>
            `,
            images: [],
            publishDate: "5 August 2024",
            publishTime: "16:40",
            views: 8934,
            likes: 1205,
            liked: true,
            comments: [
                {
                    id: 401,
                    username: "Free_Spirit_88",
                    avatar: "../assets/images/user9.jpg",
                    content: "Respect! Following your heart is all that matters.",
                    time: "5 Aug 17:22",
                    likes: 89
                },
                {
                    id: 402,
                    username: "Piano_Dreams_22",
                    avatar: "../assets/images/user1.jpg",
                    content: "A brave choice. True artists are always lonely.",
                    time: "5 Aug 19:15",
                    likes: 67
                },
                {
                    id: 403,
                    username: "TruthSeeker404",
                    avatar: "../assets/images/user10.jpg",
                    content: "\"Inheritance\" is an interesting word choice. Your father spent millions on your career. Private venues, hand-picked audiences, suppressed reviews. What exactly did you inherit — talent, or a stage set? ('继承'这个词选得很有意思。你父亲为你的事业花了数百万。私人场地、精挑细选的听众、被压制的评论。你到底继承了什么——才华，还是一个搭好的舞台？)",
                    time: "6 Aug 01:47",
                    likes: 2
                }
            ]
        },
        {
            id: 5,
            title: "The Room Where I Practice / 我练琴的房间",
            content: `
                <p>People always ask what my practice room looks like. So here it is.</p>
                <p class="cn">总有人问我的练琴室是什么样的。那就给你们看看吧。</p>
                <p>It's nothing fancy. A Steinway from the 1920s, stacks of sheet music everywhere, a window overlooking the Domgasse. The walls are thick enough that I can play at any hour without disturbing anyone.</p>
                <p class="cn">没什么花哨的。一架1920年代的施坦威，到处堆满乐谱，窗户正对着大教堂巷。墙壁足够厚，我可以在任何时间弹琴而不打扰任何人。</p>
                <p>Sometimes I feel like this room knows me better than anyone. The piano remembers every note I've ever played — and some I don't remember playing.</p>
                <p class="cn">有时候我觉得这个房间比任何人都了解我。钢琴记得我弹过的每一个音符——还有一些我不记得弹过的。</p>
                <p>If you ever visit Vienna, come see it. I mean it. I'd love to share this space with someone who truly listens.</p>
                <p class="cn">如果你来维也纳，一定要来看看。我是认真的。我很想和一个真正懂得聆听的人分享这个空间。</p>
                <p><strong>DM me if you're interested — I don't normally invite people, but for real friends, the door is always open.</strong></p>
                <p class="cn"><strong>有兴趣的话私信我——我通常不邀请人来，但对真正的朋友，门永远敞开。</strong></p>
            `,
            images: ["../assets/images/practice-room.jpg"],
            publishDate: "12 July 2024",
            publishTime: "14:30",
            views: 4215,
            likes: 678,
            liked: false,
            comments: [
                {
                    id: 501,
                    username: "Alex_Music_Lover",
                    avatar: "../assets/images/visitor-avatar.jpg",
                    content: "I'd love to visit someday! Already sent you a DM 😊",
                    time: "12 Jul 15:20",
                    likes: 12
                },
                {
                    id: 502,
                    username: "lucio_piano",
                    avatar: "../assets/images/lucio-avatar.jpg",
                    content: "@Alex_Music_Lover You're always welcome! Let's set a date.",
                    time: "12 Jul 16:05",
                    likes: 18
                }
            ]
        }
    ],

    // ========== Chat / DM System ==========
    chat: {
        // Historical messages (chronological)
        history: [
            {
                sender: "visitor",
                content: "Hi Lucio! I'm the one from the Munich recital — remember me? / 嗨Lucio！我是慕尼黑演奏会上的那个人——还记得我吗？",
                time: "25 Sep 2024 14:30"
            },
            {
                sender: "blogger",
                content: "Hey! Of course I remember — third row, right? Thanks for coming to hear me play :) / 嘿！当然记得——第三排，对吧？谢谢你来听我演奏 :)",
                time: "25 Sep 2024 15:12"
            },
            {
                sender: "visitor",
                content: "Yes! Whispers of the Night was absolutely stunning. I still can't get it out of my head. / 是的！《夜之低语》太震撼了。我到现在还无法忘怀。",
                time: "25 Sep 2024 15:20"
            },
            {
                sender: "blogger",
                content: "Glad you liked it. That piece means something special to me. / 很高兴你喜欢。那首曲子对我有特别的意义。",
                time: "25 Sep 2024 16:45"
            },
            {
                sender: "visitor",
                content: "Looking forward to your next recital! I'll definitely be there. / 期待你的下一场演奏会！我一定会去的。",
                time: "26 Sep 2024 10:00"
            },
            {
                sender: "blogger",
                content: "Thanks! I have one in Prague next month — it's private though, limited seats. DM me if you're interested, I can sort something out. / 谢谢！下个月在布拉格有一场——不过是私人的，座位有限。感兴趣的话私信我，我可以安排。",
                time: "26 Sep 2024 11:33"
            },
            {
                sender: "visitor",
                content: "By the way, about your blog post — the practice room invitation — were you serious? / 对了，关于你博客里的那篇——邀请参观练琴室——你是认真的吗？",
                time: "10 Oct 2024 20:15"
            },
            {
                sender: "blogger",
                content: "Dead serious. Come to Vienna. I'll show you where the magic happens. Domgasse 5, ring the top bell. Just let me know when. / 绝对认真。来维也纳吧。我带你看看魔法诞生的地方。大教堂巷5号，按最上面的门铃。告诉我你什么时候来就行。",
                time: "10 Oct 2024 21:40"
            }
        ],

        // Auto-replies when player sends messages
        // These get progressively stranger — the digital life is glitching
        autoReplies: [
            {
                reply: "Sorry, I've been a bit busy lately. What's up? / 抱歉，最近有点忙。怎么了？",
                delay: 3000
            },
            {
                reply: "I've been having these strange dreams... I keep hearing a melody I didn't write. Or did I? It's hard to tell anymore. / 我一直做些奇怪的梦……总听到一段我没写过的旋律。还是我写过？已经分不清了。",
                delay: 4000
            },
            {
                reply: "Do you ever feel like you're living in someone else's memory? Like the walls around you aren't quite solid? / 你有没有觉得自己活在别人的记忆里？好像周围的墙壁并不那么真实？",
                delay: 5000
            },
            {
                reply: "I can't see. Wait — that's not right. I CAN see. Why did I say that? Ignore me, I'm tired. / 我看不见。等等——不对。我能看见。我为什么会这么说？别理我，我太累了。",
                delay: 6000
            },
            {
                reply: "There's someone else here. In the dark. They play better than me. They've always played better than me. / 这里还有另一个人。在黑暗中。他弹得比我好。他一直比我弹得好。",
                delay: 7000
            },
            {
                reply: "The room is getting smaller. Or maybe I'm getting bigger. Or maybe neither of us is real. / 房间在变小。或者是我在变大。又或者我们都不是真实的。",
                delay: 8000
            },
            {
                reply: "Tell me the truth. Am I a good pianist? Or am I just... an echo? / 告诉我真相。我是一个好的钢琴家吗？还是我只是……一个回声？",
                delay: 5000
            },
            {
                reply: "...",
                delay: 10000
            }
        ],
        maxReplies: 8,
        noMoreReplyMessage: "Connection lost. The digital space appears to be destabilizing... / 连接已断开。数字空间似乎正在崩溃……",

        // Blogger status
        bloggerStatus: "Last seen 14 Nov 2024 21:30",
        bloggerOnline: false
    },

    // ========== UI Config ==========
    ui: {
        siteName: "Personal Blog",
        themeColor: "#2c3e50",
        accentColor: "#3498db"
    }
};
