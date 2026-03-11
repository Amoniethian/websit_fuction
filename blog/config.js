/**
 * Personal Blog Configuration
 * ============================
 * Edit this file to customize all blog content
 */

const BLOG_CONFIG = {
    // ========== Blogger Info ==========
    blogger: {
        name: "Lucius",
        displayName: "Lucius",
        avatar: "../assets/images/lucius-avatar.jpg",
        bio: "sound. silence. somewhere in between.",
        location: "London",
        verified: true,
        followers: 24800,
        following: 84,
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
            title: "PRAGUE.",
            content: `
                <p>Played Lobkowicz last night. Candlelight, thirty people, the Imperial. Closed with <em>The Forgotten Waltz</em>.</p>
                <p class="cn">昨晚在洛布科维茨演奏。烛光，三十个人，帝王琴。用《被遗忘的华尔兹》收尾。</p>
                <p>A man in the front row cried. He said the piece reminded him of his wife. He held my hand for a long time and didn't say anything else.</p>
                <p class="cn">前排一位老人哭了。他说这首曲子让他想起了妻子。他握了我的手很久，没有再说别的。</p>
                <p>That's what music should do. Not fill a room. Empty it.</p>
                <p class="cn">音乐就该如此。不是填满房间，而是清空它。</p>
                <p>Drove home at dawn. The city was all fog and stone.</p>
                <p class="cn">黎明时分开车回去。整座城市只剩雾和石头。</p>
                <p><small>P.S. — Woke at 3am again. New pages on the stand. Don't remember writing them. The melodies are better than anything I write awake. Father used to say genius works like that — in the dark, without permission. Maybe.</small></p>
                <p class="cn"><small>附言——又在凌晨三点醒了。谱架上多了几页新的。不记得写过。那些旋律比我清醒时写的好得多。父亲以前常说天才就是这样运作的——在黑暗中，不经允许。也许吧。</small></p>
            `,
            images: ["../assets/images/prague-concert.jpg"],
            publishDate: "28 October 2024",
            publishTime: "23:45",
            views: 9470,
            likes: 1843,
            liked: false,
            comments: [
                {
                    id: 101,
                    username: "fiorella.mp3",
                    avatar: "../assets/images/user1.jpg",
                    content: "Lucius not you casually renting a baroque palace for 30 people and calling it a Tuesday",
                    time: "29 Oct 08:12",
                    likes: 187
                },
                {
                    id: 102,
                    username: "vnn_golden",
                    avatar: "../assets/images/user2.jpg",
                    content: "the car in the last photo??? is that the Taycan?",
                    time: "29 Oct 09:05",
                    likes: 134
                },
                {
                    id: 103,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@vnn_golden yes.",
                    time: "29 Oct 09:20",
                    likes: 201
                },
                {
                    id: 104,
                    username: "sofie.kl",
                    avatar: "../assets/images/user11.jpg",
                    content: "\"not fill a room. empty it.\" this is such a line. also what are you wearing in the second pic that coat is gorgeous",
                    time: "29 Oct 10:22",
                    likes: 96
                },
                {
                    id: 105,
                    username: "r.m",
                    avatar: "../assets/images/user12.jpg",
                    content: "okay but the wine cellar in the stories?? can you drop the location please i'm begging",
                    time: "29 Oct 11:47",
                    likes: 78
                },
                {
                    id: 106,
                    username: "ellaxrose",
                    avatar: "../assets/images/user18.jpg",
                    content: "@jennagrm @tia.mp4 LOOK AT THIS MAN. those hands. I'm unwell.",
                    time: "29 Oct 12:01",
                    likes: 211
                },
                {
                    id: 107,
                    username: "jennagrm",
                    avatar: "../assets/images/user19.jpg",
                    content: "@ellaxrose STOP I already saw it I've been staring at the third photo for 20 minutes. how is he real",
                    time: "29 Oct 12:08",
                    likes: 94
                },
                {
                    id: 108,
                    username: "autohaus.91",
                    avatar: "../assets/images/user13.jpg",
                    content: "Taycan Turbo S, Gentian Blue Metallic. that spec starts at around \u20AC190k. the man is driving a flat through Prague at dawn lmao",
                    time: "29 Oct 12:34",
                    likes: 156
                },
                {
                    id: 109,
                    username: "pianofraud_",
                    avatar: "../assets/images/user20.jpg",
                    content: "rents a palace to play for 30 people. daddy's credit card really has no limit huh. the music is mid btw, I've heard his Hamburg recordings. any second-year conservatory student plays Chopin better",
                    time: "29 Oct 13:45",
                    likes: 23
                },
                {
                    id: 110,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@pianofraud_ funny how you know the exact price of everything and the value of nothing. tell me about your last performance — oh wait.",
                    time: "29 Oct 14:02",
                    likes: 487
                },
                {
                    id: 111,
                    username: "nacht.kind",
                    avatar: "../assets/images/user14.jpg",
                    content: "Lucius ATE HIM ALIVE \ud83d\udd25\ud83d\udd25\ud83d\udd25",
                    time: "29 Oct 14:05",
                    likes: 312
                },
                {
                    id: 112,
                    username: "mrs.hoffmann",
                    avatar: "../assets/images/user21.jpg",
                    content: "taking applications for the position of Mrs. Hoffmann. I cook, I clean, and I promise to never touch the Steinway \ud83d\udc8d",
                    time: "29 Oct 14:15",
                    likes: 178
                },
                {
                    id: 113,
                    username: "RealTalk_Anon",
                    avatar: "../assets/images/user3.jpg",
                    content: "\"Don't remember writing them.\" That's a very specific thing to say publicly. Most composers remember their process quite clearly. Interesting that you don't. <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>\"不记得写过。\"这话公开说很耐人寻味。大多数作曲家对创作过程记得很清楚。</span>",
                    time: "29 Oct 14:20",
                    likes: 7
                },
                {
                    id: 114,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@RealTalk_Anon not everything needs to be remembered to be real.",
                    time: "29 Oct 15:03",
                    likes: 44
                },
                {
                    id: 115,
                    username: "ghostkeys_",
                    avatar: "../assets/images/user24.jpg",
                    content: "\"The melodies are better than anything I write awake.\" Yeah. Because they're not yours. There's a blind street pianist at Trafalgar Square who improvises the EXACT same harmonic language you publish under your name. I've done a full style palette — same voicing, same ornamental figures, same everything. <a href='../palette/index.html'>here's the breakdown</a>. But sure, keep pretending it's \"genius working in the dark.\" We both know whose hands actually wrote those melodies. <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>\"那些旋律比我清醒时写的好得多。\"对，因为那不是你的。Trafalgar Square有个盲人街头钢琴家，即兴演奏的和声语言和你署名发表的完全一样。我做了完整的风格比对——相同的声部排列、相同的装饰音型、一模一样。<a href='../palette/index.html'>这是详细分析</a>。但你继续假装这是\"天才在黑暗中运作\"吧。我们都知道那些旋律到底是谁的手写的。</span>",
                    time: "29 Oct 22:18",
                    likes: 2
                }
            ]
        },
        {
            id: 2,
            title: "RAIN, BERLIN",
            content: `
                <p>Three days of rain. The city looks better like this.</p>
                <p class="cn">连着三天的雨。城市这样看更好。</p>
                <p>Found an out-of-tune upright in the back lounge of the hotel. Played it all afternoon. Sometimes the broken ones sound more honest than a concert grand.</p>
                <p class="cn">在酒店后面的休息室发现了一架走音的立式钢琴。弹了一下午。有时候坏掉的琴比音乐会三角钢琴听起来更诚实。</p>
                <p>Father used to call about bigger venues. I always wanted smaller rooms. We never had much to say to each other.</p>
                <p class="cn">父亲以前常打电话来说要更大的场地。我总是想要更小的房间。我们之间从没什么好说的。</p>
                <p>Drove through Tiergarten after midnight. Got a ticket on Unter den Linden. Worth it.</p>
                <p class="cn">午夜后开车穿过蒂尔加滕。在菩提树下大街吃了张罚单。值得。</p>
                <p><small>...the notes come so easily at night but during the day my hands feel like they belong to someone else. Like they're waiting for someone else to move them. I don't know what that means yet.</small></p>
                <p class="cn"><small>……音符在夜里来得那么容易，但白天我的手像是属于别人的。好像在等另一个人来操控。我还不知道那意味着什么。</small></p>
            `,
            images: [],
            publishDate: "15 October 2024",
            publishTime: "19:22",
            views: 7320,
            likes: 1241,
            liked: true,
            comments: [
                {
                    id: 201,
                    username: "hannah.berg",
                    avatar: "../assets/images/user4.jpg",
                    content: "wait is that the Adlon in the background?? Lucius you can't just casually post the presidential suite and not acknowledge it \ud83d\ude2d",
                    time: "15 Oct 20:05",
                    likes: 145
                },
                {
                    id: 202,
                    username: "autohaus.91",
                    avatar: "../assets/images/user13.jpg",
                    content: "\"drove through Tiergarten\" what car? please say Panamera. the chalk one from your stories??",
                    time: "15 Oct 21:18",
                    likes: 89
                },
                {
                    id: 203,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@autohaus.91 the chalk one.",
                    time: "15 Oct 21:45",
                    likes: 112
                },
                {
                    id: 204,
                    username: "r.m",
                    avatar: "../assets/images/user12.jpg",
                    content: "@lena.w_ @mattes.k the Adlon presidential suite is like \u20AC5,000 a night. five. thousand. this is his \"quick Berlin detour\" \ud83d\ude02",
                    time: "15 Oct 22:10",
                    likes: 203
                },
                {
                    id: 205,
                    username: "nacht.kind",
                    avatar: "../assets/images/user14.jpg",
                    content: "\"a ticket on Unter den Linden. worth it.\" this man is the main character and he knows it",
                    time: "16 Oct 02:30",
                    likes: 67
                },
                {
                    id: 206,
                    username: "ellaxrose",
                    avatar: "../assets/images/user18.jpg",
                    content: "the moody rain photo + the brooding writing. Lucius you're not a pianist you're a literary character. please ruin my life",
                    time: "16 Oct 07:50",
                    likes: 134
                },
                {
                    id: 207,
                    username: "get_real_music",
                    avatar: "../assets/images/user22.jpg",
                    content: "\"imperfect sounds carry more character\" profound stuff from a guy whose daddy buys him \u20AC200k pianos. try playing a broken upright because it's all you can afford, then talk to me about character",
                    time: "16 Oct 08:33",
                    likes: 18
                },
                {
                    id: 208,
                    username: "Alex_Music_Lover",
                    avatar: "../assets/images/visitor-avatar.jpg",
                    content: "The broken piano thing is beautiful. Hope you're doing okay with the family stuff.",
                    time: "16 Oct 09:30",
                    likes: 8
                },
                {
                    id: 209,
                    username: "sofie.kl",
                    avatar: "../assets/images/user11.jpg",
                    content: "Panamera GTS in chalk?? @hannah.berg that's like \u20AC160k base. the parking ticket probably felt like a rounding error to him \ud83d\udc80",
                    time: "16 Oct 11:20",
                    likes: 98
                },
                {
                    id: 210,
                    username: "MusicTheory_Nerd",
                    avatar: "../assets/images/user8.jpg",
                    content: "\"Hands feel like they belong to someone else.\" Lucius, I've been analysing your published scores. The voicing in your night compositions uses advanced contrapuntal techniques \u2014 voice-leading patterns you've never once discussed in interviews. Your daytime playing and your night compositions read like two completely different skill levels. Has anyone pointed that out to you? <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>\"手像属于别人的。\"我分析过你发表的乐谱。你夜间作品的声部写作使用了高级对位技巧——你在采访中从未提过的声部进行模式。你白天的演奏和夜间作品完全是两个水平。</span>",
                    time: "16 Oct 14:55",
                    likes: 4
                },
                {
                    id: 211,
                    username: "ghostkeys_",
                    avatar: "../assets/images/user24.jpg",
                    content: "\"my hands feel like they belong to someone else\" — because the music DOES belong to someone else. I've documented the entire thing. There's a blind pianist at Trafalgar Square whose improvisations match your published scores note for note. <a href='../palette/index.html'>full comparison here</a>. @MusicTheory_Nerd you're onto something. it's not two skill levels. it's two people. <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>\"我的手像属于别人的\"——因为音乐确实属于别人。Trafalgar Square有个盲人钢琴家，即兴演奏和你发表的乐谱完全吻合。不是两个水平，是两个人。</span>",
                    time: "17 Oct 03:44",
                    likes: 1
                }
            ]
        },
        {
            id: 3,
            title: "WHISPERS OF THE NIGHT",
            content: `
                <p>Three new pieces. One sitting. Midnight to dawn.</p>
                <p class="cn">三首新作。一口气。从午夜到天亮。</p>
                <p>I don't remember most of the process. I sat down and the music was already there, waiting. Like it had been written before I arrived.</p>
                <p class="cn">过程大部分我都不记得了。坐下来，音乐就已经在那里了，等着。好像在我到来之前就已经写好了。</p>
                <p><strong>The centrepiece is <em>Whispers of the Night</em>. It's for someone. Someone who may never hear it. That's all I want to say about it.</strong></p>
                <p class="cn"><strong>核心作品是《夜之低语》。为某个人而写。一个也许永远无法听到的人。我只想说这些。</strong></p>
                <p>Premiering next week in Munich. Small venue. The way I like it.</p>
                <p class="cn">下周在慕尼黑首演。小场地。我喜欢的方式。</p>
                <p><small>I should be honest. I found the last three pages tucked inside the piano bench this morning. My handwriting, apparently. But the third movement \u2014 it's extraordinary. Far beyond anything I could write consciously. Father's doctor once called it hypnagogic creativity. I don't think that's what it is. It's almost too good. Like someone else wrote it through me.</small></p>
                <p class="cn"><small>我应该坦白。今早在琴凳里发现了最后三页。看起来是我的笔迹。但第三乐章——非凡。远超我清醒时能写出的任何东西。父亲的医生说是入睡前创造力。我不觉得是那样。太好了。好得像是别人通过我写的。</small></p>
            `,
            images: ["../assets/images/composing.jpg"],
            publishDate: "20 September 2024",
            publishTime: "05:17",
            views: 15240,
            likes: 2890,
            liked: false,
            comments: [
                {
                    id: 301,
                    username: "fiorella.mp3",
                    avatar: "../assets/images/user5.jpg",
                    content: "posted at 5am. Lucius please sleep. also is that the Steinway in the photo?? she's beautiful",
                    time: "20 Sep 07:45",
                    likes: 234
                },
                {
                    id: 302,
                    username: "vnn_golden",
                    avatar: "../assets/images/user15.jpg",
                    content: "not the \"small venue\" being that gorgeous place from your stories... Lucius your version of small is not normal \ud83d\ude05",
                    time: "20 Sep 08:30",
                    likes: 178
                },
                {
                    id: 303,
                    username: "ellaxrose",
                    avatar: "../assets/images/user18.jpg",
                    content: "@jennagrm @tia.mp4 \"it's for someone. someone who may never hear it.\" I'M ON THE FLOOR. WHO IS SHE. I WANT TO BE HER.",
                    time: "20 Sep 09:02",
                    likes: 267
                },
                {
                    id: 304,
                    username: "jennagrm",
                    avatar: "../assets/images/user19.jpg",
                    content: "@ellaxrose \"that's all I want to say about it\" THE RESTRAINT. the mystery. I physically cannot. this man could ruin me with one sentence and he knows it",
                    time: "20 Sep 09:15",
                    likes: 189
                },
                {
                    id: 305,
                    username: "mrs.hoffmann",
                    avatar: "../assets/images/user21.jpg",
                    content: "three pieces in one night. the man composes faster than I can do laundry. husband material confirmed \ud83d\udc8d",
                    time: "20 Sep 09:40",
                    likes: 145
                },
                {
                    id: 306,
                    username: "m_richter",
                    avatar: "../assets/images/user6.jpg",
                    content: "got tickets! honestly more excited to see the Wimpole Street flat you keep teasing than the recital itself. sorry not sorry",
                    time: "20 Sep 11:23",
                    likes: 127
                },
                {
                    id: 307,
                    username: "sofie.kl",
                    avatar: "../assets/images/user11.jpg",
                    content: "\"for someone who may never hear it\" okay who is she Lucius. drop the details \ud83d\udda4",
                    time: "20 Sep 13:10",
                    likes: 156
                },
                {
                    id: 308,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@sofie.kl no.",
                    time: "20 Sep 13:42",
                    likes: 289
                },
                {
                    id: 309,
                    username: "pianofraud_",
                    avatar: "../assets/images/user20.jpg",
                    content: "\"three pieces in one night\" yeah okay. Beethoven couldn't do that and you can? with no formal conservatory training? make it make sense. your dad funds private recitals so no real critics ever show up. there's a reason for that",
                    time: "20 Sep 14:30",
                    likes: 31
                },
                {
                    id: 310,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@pianofraud_ the reason is that I don't need a concert hall full of strangers to validate what I already know. you seem to spend a lot of time thinking about me for someone who thinks I'm talentless. maybe use that energy on something productive? just a thought.",
                    time: "20 Sep 14:55",
                    likes: 534
                },
                {
                    id: 311,
                    username: "pianofraud_",
                    avatar: "../assets/images/user20.jpg",
                    content: "@Lucius \"what I already know\" you KNOW you're good? based on what? private recitals funded by daddy where hand-picked audiences clap on cue? one open audition, Lucius. just one. let's see what happens without the Hoffmann name on the door.",
                    time: "20 Sep 15:12",
                    likes: 47
                },
                {
                    id: 312,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@pianofraud_ based on the music. which you've never heard live because you can't afford a ticket \u2014 not that we sell them, the events are free. but you'd have to actually know someone to get invited. and clearly, you don't.",
                    time: "20 Sep 15:20",
                    likes: 621
                },
                {
                    id: 313,
                    username: "nacht.kind",
                    avatar: "../assets/images/user14.jpg",
                    content: "Lucius JUST ENDED THAT MAN'S WHOLE EXISTENCE \ud83d\udca0\ud83d\udca0\ud83d\udca0",
                    time: "20 Sep 15:22",
                    likes: 389
                },
                {
                    id: 314,
                    username: "hannah.berg",
                    avatar: "../assets/images/user4.jpg",
                    content: "\"you'd have to actually know someone. and clearly, you don't\" LUCIUS YOU DID NOT HAVE TO MURDER HIM LIKE THAT",
                    time: "20 Sep 15:25",
                    likes: 278
                },
                {
                    id: 315,
                    username: "eu.lifestyle",
                    avatar: "../assets/images/user16.jpg",
                    content: "Lucius we'd love to profile you for our next feature. DM us?",
                    time: "20 Sep 16:00",
                    likes: 43
                },
                {
                    id: 316,
                    username: "get_real_music",
                    avatar: "../assets/images/user22.jpg",
                    content: "love how this whole comment section is simping and discussing his wealth instead of the actual compositions. 2890 likes and not ONE comment about the harmonic structure, the phrasing, nothing. you're all proving the point \u2014 it was never about the music.",
                    time: "20 Sep 17:40",
                    likes: 12
                },
                {
                    id: 317,
                    username: "MusicTheory_Nerd",
                    avatar: "../assets/images/user8.jpg",
                    content: "Three pieces in one sitting, fully orchestrated. I've analysed your published scores, Lucius. The harmonic language in your night works is radically different from the theory you discuss in livestreams. The third movement uses invertible counterpoint at the octave and twelfth \u2014 conservatory-level technique you've never once referenced. Almost like two different composers. I mean that literally. <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>三首曲子一口气写完。你夜间作品的和声语言与你直播中讨论的乐理完全不同。第三乐章使用了八度和十二度的可逆对位——你从未提及的音乐学院级技巧。几乎像两个不同的作曲家。我说的是字面意思。</span>",
                    time: "21 Sep 02:14",
                    likes: 3
                },
                {
                    id: 318,
                    username: "ghostkeys_",
                    avatar: "../assets/images/user24.jpg",
                    content: "Three pieces in one night but you can't improvise a single phrase in public? I was at Munich. Someone asked you to improvise on a theme. You laughed it off and played something prepared. Meanwhile the anonymous blind pianist at Trafalgar Square does THIS LEVEL of music as pure improv every single night. I've put together a full style palette. <a href='../palette/index.html'>look at it</a>. The melodic fingerprint is identical. @MusicTheory_Nerd \"two different composers\" — you're closer to the truth than you think. <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>一晚上三首曲子，但你在公开场合连一个乐句都即兴不出来？我在慕尼黑现场。有人请你即兴演奏一个主题，你笑着敷衍过去，弹了首准备好的。而Trafalgar Square那位匿名盲人钢琴家每晚都用纯即兴演奏出这种水准的音乐。我整理了完整的风格比对。<a href='../palette/index.html'>看看吧</a>。旋律指纹完全一致。@MusicTheory_Nerd \"两个不同的作曲家\"——你比你想的更接近真相。</span>",
                    time: "21 Sep 04:30",
                    likes: 1
                }
            ]
        },
        {
            id: 4,
            title: "INHERITANCE",
            content: `
                <p>People keep asking why I never took over Father's company. I don't owe anyone that explanation, but here it is anyway.</p>
                <p class="cn">人们一直问我为什么没有接手父亲的公司。我不欠任何人这个解释，但还是说一下。</p>
                <p>I grew up in a house where the piano was always there. Every room had one. It was the first sound I remember and the last sound I hear before sleep. That's not privilege. That's just home.</p>
                <p class="cn">我在一栋钢琴永远在场的房子里长大。每个房间都有一架。它是我记忆中最早的声音，也是入睡前最后一个声音。那不是特权，那只是家。</p>
                <p>Steel was Father's language. Music is mine. I don't think either of us chose.</p>
                <p class="cn">钢铁是父亲的语言。音乐是我的。我觉得我们都没得选。</p>
                <p>Sometimes I wonder if I'd still play if I had to. If there was no Steinway, no family name, no foundation funding my recitals. I think I would. I hope I would.</p>
                <p class="cn">有时候我在想，如果必须的话，我还会弹吗。如果没有施坦威，没有家族姓氏，没有基金会赞助我的演奏会。我想我会的。我希望我会。</p>
                <p>Anyway. End of discussion.</p>
                <p class="cn">总之，不再讨论了。</p>
            `,
            images: [],
            publishDate: "5 August 2024",
            publishTime: "16:40",
            views: 21600,
            likes: 3870,
            liked: true,
            comments: [
                {
                    id: 401,
                    username: "hannah.berg",
                    avatar: "../assets/images/user9.jpg",
                    content: "\"every room had one\" he says like it's normal to have multiple Steinways. Lucius you live on another planet and I respect it",
                    time: "5 Aug 17:22",
                    likes: 389
                },
                {
                    id: 402,
                    username: "fiorella.mp3",
                    avatar: "../assets/images/user4.jpg",
                    content: "\"I wonder if I'd still play if I had to\" \u2014 Lucius. bestie. you have never HAD to do anything in your life and that's kind of the point \ud83d\ude2d",
                    time: "5 Aug 18:03",
                    likes: 267
                },
                {
                    id: 403,
                    username: "sofie.kl",
                    avatar: "../assets/images/user1.jpg",
                    content: "off-topic but did anyone else zoom in on the background? is that a chapel?? with stained glass??? LUCIUS YOUR HOUSE HAS A CHAPEL",
                    time: "5 Aug 19:15",
                    likes: 312
                },
                {
                    id: 404,
                    username: "ellaxrose",
                    avatar: "../assets/images/user18.jpg",
                    content: "@jennagrm @tia.mp4 @sofie.kl rich, talented, brooding, family issues, drives a Porsche, and writes sad music at 3am? I'm convinced he was designed in a lab to destroy women",
                    time: "5 Aug 19:30",
                    likes: 445
                },
                {
                    id: 405,
                    username: "jennagrm",
                    avatar: "../assets/images/user19.jpg",
                    content: "@ellaxrose the way I would give up everything to be that Steinway. at least she gets touched every day",
                    time: "5 Aug 19:35",
                    likes: 523
                },
                {
                    id: 406,
                    username: "r.m",
                    avatar: "../assets/images/user12.jpg",
                    content: "\"a Steinway in every wing\" \u2014 a Steinway Model D costs like \u20AC150k-200k EACH. if the house has 4 wings that's almost a million euros in PIANOS ALONE. @mattes.k are you seeing this",
                    time: "5 Aug 19:50",
                    likes: 287
                },
                {
                    id: 407,
                    username: "autohaus.91",
                    avatar: "../assets/images/user13.jpg",
                    content: "so let me get this straight: Hoffmann Industrial Group revenue \u20AC2.3 billion, his dad's net worth is probably 9 figures, and this guy chose the PIANO over running all that. either that's the most principled decision ever or the most privileged one. can't decide",
                    time: "5 Aug 20:10",
                    likes: 198
                },
                {
                    id: 408,
                    username: "mrs.hoffmann",
                    avatar: "../assets/images/user21.jpg",
                    content: "\"I don't owe anyone that explanation\" NO YOU DON'T KING. now please owe me a wedding date instead \ud83d\udc8d\ud83d\ude4f",
                    time: "5 Aug 20:45",
                    likes: 156
                },
                {
                    id: 409,
                    username: "pianofraud_",
                    avatar: "../assets/images/user20.jpg",
                    content: "\"that's not privilege, that's just home\" \u2014 the most out-of-touch sentence ever typed. you had a Steinway in every room, the best private tutors, and a family foundation that funds your career. that IS privilege. and your music is average at best. without the name Hoffmann behind you, you wouldn't fill a school cafeteria",
                    time: "5 Aug 21:15",
                    likes: 34
                },
                {
                    id: 410,
                    username: "get_real_music",
                    avatar: "../assets/images/user22.jpg",
                    content: "I'm a working musician in Munich. I teach 30 students a week to afford rent on a one-bedroom flat. I've studied at two conservatories. This guy grew up with a piano in every room, never sat a public exam, and gets profiled in lifestyle magazines as a \"genius.\" \"That's not privilege.\" Read that back, Lucius.",
                    time: "5 Aug 21:40",
                    likes: 56
                },
                {
                    id: 411,
                    username: "RealistRachel",
                    avatar: "../assets/images/user17.jpg",
                    content: "\"That's not privilege. That's just home.\" The lack of self-awareness is genuinely impressive.",
                    time: "5 Aug 22:10",
                    likes: 14
                },
                {
                    id: 412,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@pianofraud_ @get_real_music you both spend so much time analyzing my life. don't you have your own? I've never asked anyone to validate me. I play because I love it. you teach 30 students a week \u2014 congratulations. I play one concert and the room cries. we're not the same.",
                    time: "5 Aug 22:30",
                    likes: 412
                },
                {
                    id: 413,
                    username: "get_real_music",
                    avatar: "../assets/images/user22.jpg",
                    content: "@Lucius \"the room cries\" \u2014 a room of 30 hand-picked guests who got in through your father's foundation. try making a stranger cry. try playing for someone who doesn't already know your last name.",
                    time: "5 Aug 22:45",
                    likes: 67
                },
                {
                    id: 414,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@get_real_music a stranger DID cry. in Prague. you'd know that if you read the post instead of just looking for things to be angry about. honestly \u2014 go practice. get better. come back when you've written something people actually want to hear. this thread is beneath me.",
                    time: "5 Aug 23:01",
                    likes: 567
                },
                {
                    id: 415,
                    username: "nacht.kind",
                    avatar: "../assets/images/user14.jpg",
                    content: "\"this thread is beneath me\" LUCIUS \ud83d\udca0\ud83d\udca0 he said what he said",
                    time: "5 Aug 23:05",
                    likes: 345
                },
                {
                    id: 416,
                    username: "vnn_golden",
                    avatar: "../assets/images/user2.jpg",
                    content: "watching Lucius demolish haters in the comments is my new favourite sport. also love how the haters are ALWAYS anonymous accounts with 12 followers \ud83d\ude02",
                    time: "5 Aug 23:15",
                    likes: 234
                },
                {
                    id: 417,
                    username: "tia.mp4",
                    avatar: "../assets/images/user23.jpg",
                    content: "@ellaxrose he just told that man \"go practice. get better.\" in the most condescending way possible. why am I attracted to this. what's wrong with me.",
                    time: "5 Aug 23:20",
                    likes: 289
                },
                {
                    id: 418,
                    username: "TruthSeeker404",
                    avatar: "../assets/images/user10.jpg",
                    content: "\"Foundation funding my recitals\" \u2014 you mean the Hoffmann Arts Foundation, chaired by your father, which funds exclusively your performances? The one that paid the Bavarian Music Critic's editor to kill a negative review of your Hamburg concert? What did you inherit, Lucius \u2014 talent, or infrastructure? <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>\"基金会赞助我的演奏会\"——你是说你父亲主持的霍夫曼艺术基金会吗？那个花钱让乐评编辑撤掉汉堡音乐会差评的基金会？你继承的是天赋，还是体制？</span>",
                    time: "6 Aug 01:47",
                    likes: 5
                },
                {
                    id: 419,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@TruthSeeker404 I don't know what you're referring to. The Hamburg concert was well received.",
                    time: "6 Aug 09:15",
                    likes: 156
                },
                {
                    id: 420,
                    username: "ghostkeys_",
                    avatar: "../assets/images/user24.jpg",
                    content: "\"I wonder if I'd still play if I had to.\" You wouldn't. Because you CAN'T. Not at the level people think you can. There's a man with no name, no home, no eyes who sits at Trafalgar Square every night and plays music that sounds EXACTLY like your published compositions — except he does it as improvisation. You can't even improvise a four-bar phrase. I've documented everything. <a href='../palette/index.html'>the full style palette is here</a>. What did you inherit, Lucius? not talent. <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>\"如果必须的话，我还会弹吗。\"你不会。因为你弹不了。不是人们以为的那个水平。有个没有名字、没有家、没有眼睛的人，每晚坐在Trafalgar Square演奏的音乐和你发表的作品一模一样——只不过他是即兴的。你连四小节都即兴不出来。我已经记录了一切。<a href='../palette/index.html'>完整风格比对在这里</a>。你继承了什么，Lucius？不是天赋。</span>",
                    time: "7 Aug 02:55",
                    likes: 3
                }
            ]
        },
        {
            id: 5,
            title: "WIMPOLE STREET",
            content: `
                <p>Morning light. The Steinway. Coffee going cold on the windowsill. Some days this is all I need.</p>
                <p class="cn">晨光。施坦威。窗台上放凉的咖啡。有些日子这就是我所需要的全部。</p>
                <p>The flat is two streets from where Handel used to live. That wasn't a coincidence when Father chose it, and I stopped pretending it was long ago. Third floor, south-facing. The light at six in the evening turns everything gold.</p>
                <p class="cn">公寓离亨德尔故居只隔两条街。父亲选这里不是巧合，我也不再假装是了。三楼，朝南。傍晚六点的光线把一切染成金色。</p>
                <p>I practice in the mornings. Walk to The Wolseley for coffee \u2014 they know my order. Sometimes Scott's for lunch if I feel like sitting still. Then back to the piano until the light goes.</p>
                <p class="cn">早上练琴。走路去The Wolseley喝咖啡——他们记得我的单。有时候去Scott's吃午饭，如果想静坐一会儿的话。然后回到钢琴前，直到光线消失。</p>
                <p>The piano remembers every note I've ever played. And some I don't remember playing.</p>
                <p class="cn">钢琴记得我弹过的每一个音符。还有一些我不记得弹过的。</p>
                <p>If you're ever in London and you care about music \u2014 actually care \u2014 <strong>DM me. I don't invite people here. But for real ones, the door is open.</strong></p>
                <p class="cn">如果你来伦敦，而且你真的在乎音乐——真正在乎的话——<strong>私信我。我不邀请人来这里。但对真正的人，门是开着的。</strong></p>
            `,
            images: ["../assets/images/practice-room.jpg"],
            publishDate: "12 July 2024",
            publishTime: "14:30",
            views: 12800,
            likes: 2210,
            liked: false,
            comments: [
                {
                    id: 501,
                    username: "fiorella.mp3",
                    avatar: "../assets/images/user1.jpg",
                    content: "\"father chose it\" SIR. your dad bought you a flat near Handel's old house as what \u2014 a housewarming gift?? a Tuesday present?? \ud83d\ude2d\ud83d\ude2d",
                    time: "12 Jul 15:05",
                    likes: 445
                },
                {
                    id: 502,
                    username: "sofie.kl",
                    avatar: "../assets/images/user11.jpg",
                    content: "The Wolseley and Scott's as your daily rotation. Lucius your normal Tuesday costs more than my vacation \ud83d\udc80",
                    time: "12 Jul 15:12",
                    likes: 287
                },
                {
                    id: 503,
                    username: "vnn_golden",
                    avatar: "../assets/images/user2.jpg",
                    content: "the CEILINGS in the background omg. original parquet?? is that a 4m ceiling?? real estate mutuals please confirm",
                    time: "12 Jul 15:30",
                    likes: 198
                },
                {
                    id: 504,
                    username: "r.m",
                    avatar: "../assets/images/user12.jpg",
                    content: "@mattes.k Wimpole Street is literally Marylebone. a 3rd floor south-facing flat there is probably \u00A32-3 million. MINIMUM. his dad just bought it for his birthday. as a present. I'm fine. this is fine.",
                    time: "12 Jul 15:45",
                    likes: 234
                },
                {
                    id: 505,
                    username: "nacht.kind",
                    avatar: "../assets/images/user14.jpg",
                    content: "he posts a photo of a window and coffee and casually reveals a priceless apartment. just old money things",
                    time: "12 Jul 16:02",
                    likes: 167
                },
                {
                    id: 506,
                    username: "ellaxrose",
                    avatar: "../assets/images/user18.jpg",
                    content: "\"for real ones, the door is open\" Lucius I am a real one. I am the REALEST one. OPEN THE DOOR \ud83d\udea8",
                    time: "12 Jul 16:10",
                    likes: 356
                },
                {
                    id: 507,
                    username: "mrs.hoffmann",
                    avatar: "../assets/images/user21.jpg",
                    content: "morning light, Steinway, coffee, Wimpole Street... this is literally a marriage proposal to myself. I accept. @Lucius when can I move in \ud83d\udc8d",
                    time: "12 Jul 16:15",
                    likes: 178
                },
                {
                    id: 508,
                    username: "Alex_Music_Lover",
                    avatar: "../assets/images/visitor-avatar.jpg",
                    content: "I'd love to visit someday! Just DM'd you :)",
                    time: "12 Jul 16:20",
                    likes: 12
                },
                {
                    id: 509,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@Alex_Music_Lover anytime. the door's open.",
                    time: "12 Jul 16:45",
                    likes: 18
                },
                {
                    id: 510,
                    username: "autohaus.91",
                    avatar: "../assets/images/user13.jpg",
                    content: "okay but does anyone know what espresso machine that is in the background? looks like a La Marzocca Linea Mini. those are like \u20AC4,500. for COFFEE. this man's coffee setup costs more than my car",
                    time: "12 Jul 17:30",
                    likes: 145
                },
                {
                    id: 511,
                    username: "pianofraud_",
                    avatar: "../assets/images/user20.jpg",
                    content: "\"DM me if you care about music\" how about playing in public for once instead of hiding in your luxury apartment and gatekeeping your mediocre recitals behind daddy's invite list?",
                    time: "12 Jul 19:00",
                    likes: 19
                },
                {
                    id: 512,
                    username: "Lucius",
                    avatar: "../assets/images/lucius-avatar.jpg",
                    content: "@pianofraud_ you're still here? genuinely asking. don't you have somewhere to be? a job? a hobby? anything? because I just had Scott's for lunch, practiced for three hours, and now I'm watching the sunset from Wimpole Street, and you're writing comments on my blog. one of us is wasting their life and it isn't me.",
                    time: "12 Jul 19:30",
                    likes: 678
                },
                {
                    id: 513,
                    username: "jennagrm",
                    avatar: "../assets/images/user19.jpg",
                    content: "@ellaxrose he just said \"one of us is wasting their life and it isn't me\" while casually mentioning his Scott's lunch. the man fights with a wine glass in one hand and a Steinway in the other. I'm obsessed",
                    time: "12 Jul 19:35",
                    likes: 389
                },
                {
                    id: 514,
                    username: "tia.mp4",
                    avatar: "../assets/images/user23.jpg",
                    content: "@fiorella.mp3 @hannah.berg should I be worried that Lucius being mean to people is making him MORE attractive? like the condescension is doing something for me. I need therapy",
                    time: "12 Jul 20:00",
                    likes: 267
                },
                {
                    id: 515,
                    username: "RealTalk_Anon",
                    avatar: "../assets/images/user3.jpg",
                    content: "Five posts now. Stunning locations, beautiful instruments, famous caf\u00e9s. And in every single post \u2014 one line about actually playing. Everyone here is discussing the apartment, the car, the restaurants. No one is discussing the music. Has anyone noticed that?",
                    time: "12 Jul 22:30",
                    likes: 9
                },
                {
                    id: 516,
                    username: "ghostkeys_",
                    avatar: "../assets/images/user24.jpg",
                    content: "first post. might as well start here. @Lucius there's a blind street pianist at Trafalgar Square who plays every night. no name, no audience, no Steinway, no Wimpole Street flat. just a public piano and his hands. and his improvisations sound EXACTLY like your published scores. I don't know how you sleep at night but I'm guessing the answer is: you don't actually compose when you do. I'm putting together a full comparison. <a href='../palette/index.html'>it's already live</a>. everyone in this comment section worshipping the lifestyle — try listening to the music. then listen to his. then tell me it's a coincidence. <span class='cn-inline' style='color:#999;font-size:0.85em;display:block;margin-top:4px;'>第一条帖子，就从这里开始吧。@Lucius Trafalgar Square有个盲人街头钢琴家，每晚都在弹。没有名字，没有观众，没有施坦威，没有Wimpole Street的公寓。只有一台公共钢琴和他的双手。而他的即兴演奏听起来和你发表的乐谱一模一样。我不知道你晚上怎么睡得着，但我猜答案是：你睡着的时候其实并没有在作曲。我正在整理完整对比。<a href='../palette/index.html'>已经上线了</a>。评论区所有人都在崇拜生活方式——试着听听音乐吧。然后听听他的。然后告诉我这是巧合。</span>",
                    time: "13 Jul 01:12",
                    likes: 0
                }
            ]
        },
        {
            id: 6,
            title: "FATHER.",
            content: `
                <p>Father passed away yesterday.</p>
                <p class="cn">父亲昨天去世了。</p>
                <p>I don't know what to write, but I feel like I should write something.</p>
                <p class="cn">我不知道该写什么，但我想写点什么。</p>
                <p>He wasn't an easy man. When I was young, I could only call him once a month. He sometimes forgot my birthday. His expectations for me never had an upper limit. I practised until my fingers bled, and he stood beside me and said, <strong>"Again."</strong></p>
                <p class="cn">他不是一个容易相处的人。我小时候一个月只能给他打一次电话，他有时候会忘记我的生日，他对我的要求从来没有上限。我练琴练到手指出血，他站在旁边说<strong>"再来一遍。"</strong></p>
                <p>But he was also the first person who believed I could stand on that stage. After my first solo recital at sixteen, he waited backstage and said two words: <strong>"Not bad."</strong> Just those two words. I've remembered them for years.</p>
                <p class="cn">但他也是第一个相信我能站上那个舞台的人。我16岁第一场独奏会，他在后台等我，说了一句<strong>"不错。"</strong>就这两个字，我记了很多年。</p>
                <p>There were so many things left unsaid between us. I thought there was still time.</p>
                <p class="cn">我们之间有很多话没有说完。我以为还有时间。</p>
                <p>Today I sat at the piano and played nothing. Just sat there, for a long time.</p>
                <p class="cn">今天我坐在钢琴前，什么都没弹，只是坐着，坐了很久。</p>
                <p>The room is very quiet. Quieter than before. I don't know why.</p>
                <p class="cn">房间很安静，比以前安静，我不知道为什么。</p>
            `,
            images: [],
            publishDate: "3 March 2022",
            publishTime: "22:14",
            views: 18900,
            likes: 4120,
            liked: true,
            comments: [
                {
                    id: 601,
                    username: "fiorella.mp3",
                    avatar: "../assets/images/user1.jpg",
                    content: "Lucius... I'm so sorry. Sending you all the strength in the world.",
                    time: "4 Mar 08:20",
                    likes: 312
                },
                {
                    id: 602,
                    username: "nacht.kind",
                    avatar: "../assets/images/user14.jpg",
                    content: "\"Not bad.\" Sometimes the smallest words carry the heaviest weight. Take care of yourself.",
                    time: "4 Mar 09:15",
                    likes: 287
                },
                {
                    id: 603,
                    username: "Alex_Music_Lover",
                    avatar: "../assets/images/visitor-avatar.jpg",
                    content: "I'm here if you need to talk. The piano will wait.",
                    time: "4 Mar 10:30",
                    likes: 45
                },
                {
                    id: 604,
                    username: "ellaxrose",
                    avatar: "../assets/images/user18.jpg",
                    content: "This is the most human thing you've ever posted. Rest in peace, Mr. Hoffmann.",
                    time: "4 Mar 11:02",
                    likes: 198
                },
                {
                    id: 605,
                    username: "sofie.kl",
                    avatar: "../assets/images/user11.jpg",
                    content: "\"I thought there was still time.\" This broke me. We always think there's more time.",
                    time: "4 Mar 12:45",
                    likes: 234
                }
            ]
        }
    ],

    // ========== Chat / DM System ==========
    chat: {
        // Historical messages (chronological) — full conversation from first contact to last message
        history: [
            {
                sender: "visitor",
                content: "Hi, I heard your performance online \u2014 the Chopin piece. I've listened to it many times.",
                contentCn: "嗨，我在网上听了你的演奏——肖邦那首。我听了很多遍。",
                time: "15 Mar 2021 14:30"
            },
            {
                sender: "blogger",
                content: "which one?",
                contentCn: "哪一首？",
                time: "15 Mar 2021 14:45"
            },
            {
                sender: "visitor",
                content: "The Nocturne. There's a part in the middle I really love \u2014 that crescendo. Everyone else pushes it up, but you pulled it back.",
                contentCn: "夜曲。中间有一段我特别喜欢——那个渐强。别人都往上推，但你收回去了。",
                time: "15 Mar 2021 14:52"
            },
            {
                sender: "blogger",
                content: "you have a good ear.",
                contentCn: "你耳朵很好。",
                time: "15 Mar 2021 15:10"
            },
            {
                sender: "visitor",
                content: "I listened to your recording from last week again.",
                contentCn: "我又听了你上周的录音。",
                time: "22 Mar 2021 20:00"
            },
            {
                sender: "blogger",
                content: "and?",
                contentCn: "然后呢？",
                time: "22 Mar 2021 20:15"
            },
            {
                sender: "visitor",
                content: "I don't really know much about piano, but I feel like there's something in the way you play. I can't explain it.",
                contentCn: "我其实不太懂钢琴，但我觉得你弹的方式里有某种东西。我说不上来。",
                time: "22 Mar 2021 20:20"
            },
            {
                sender: "blogger",
                content: "haha, that's more useful than all the people who say technical things.",
                contentCn: "哈哈，这比所有说技术性评价的人都有用。",
                time: "22 Mar 2021 20:30"
            },
            {
                sender: "visitor",
                content: "I recommended your recordings to a friend. He couldn't explain what's good about it either. I tried to explain for ages.",
                contentCn: "我推荐你的录音给朋友了。他也说不出好在哪里。我解释了半天。",
                time: "5 Apr 2021 19:00"
            },
            {
                sender: "blogger",
                content: "did you manage to explain?",
                contentCn: "解释清楚了吗？",
                time: "5 Apr 2021 19:12"
            },
            {
                sender: "visitor",
                content: "No. But I just know it's good. When you play, it feels like something is real.",
                contentCn: "没有。但我就是知道它好。你弹的时候，感觉有什么东西是真的。",
                time: "5 Apr 2021 19:15"
            },
            {
                sender: "blogger",
                content: '<span style="color:red;">you are the first person to say that.</span>',
                contentCn: '<span style="color:red;">你是第一个这样说的人。</span>',
                time: "5 Apr 2021 19:20"
            },
            {
                sender: "visitor",
                content: "What do other people say?",
                contentCn: "其他人怎么说的？",
                time: "5 Apr 2021 19:22"
            },
            {
                sender: "blogger",
                content: "great technique, high talent, has the air of a master. that sort of thing.",
                contentCn: "技巧好，天赋高，有大师风范。大概就那些。",
                time: "5 Apr 2021 19:25"
            },
            {
                sender: "visitor",
                content: "Those aren't really praising you as a person. They're just praising your playing.",
                contentCn: "那些其实不是在夸你这个人。只是在夸你弹的。",
                time: "5 Apr 2021 19:28"
            },
            {
                sender: "blogger",
                content: "yeah.",
                contentCn: "嗯。",
                time: "5 Apr 2021 19:30"
            },
            {
                sender: "visitor",
                content: "Still practising?",
                contentCn: "还在练吗？",
                time: "18 Jun 2021 23:50"
            },
            {
                sender: "blogger",
                content: "mhm.",
                contentCn: "嗯。",
                time: "18 Jun 2021 23:55"
            },
            {
                sender: "visitor",
                content: '<span style="color:blue;">It is midnight. Go eat something. I will wait.</span>',
                contentCn: '<span style="color:blue;">已经半夜了。去吃点东西。我等你。</span>',
                time: "19 Jun 2021 00:01"
            },
            {
                sender: "blogger",
                content: "you don't have to wait.",
                contentCn: "你不用等。",
                time: "19 Jun 2021 00:03"
            },
            {
                sender: "visitor",
                content: "I want to. Go eat.",
                contentCn: "我想等。去吃吧。",
                time: "19 Jun 2021 00:05"
            },
            {
                sender: "blogger",
                content: "practised all day today. feels like nothing stuck.",
                contentCn: "今天练了一天。感觉什么都没留住。",
                time: "19 Jun 2021 00:45"
            },
            {
                sender: "visitor",
                content: "Then stop practising. I haven't finished listening to the one you sent last time.",
                contentCn: "那就别练了。你上次发我的那个我还没听完。",
                time: "19 Jun 2021 00:48"
            },
            {
                sender: "blogger",
                content: "which part haven't you finished?",
                contentCn: "哪部分没听完？",
                time: "19 Jun 2021 00:50"
            },
            {
                sender: "visitor",
                content: "The second half. It feels like you're describing some kind of scene.",
                contentCn: "后半段。感觉你在描述某种画面。",
                time: "19 Jun 2021 00:55"
            },
            {
                sender: "blogger",
                content: "it's an afternoon from a long time ago. Wind on the rooftop.",
                contentCn: "是很久以前的一个下午。天台上有风。",
                time: "19 Jun 2021 01:00"
            },
            {
                sender: "visitor",
                content: "What rooftop?",
                contentCn: "什么天台？",
                time: "19 Jun 2021 01:02"
            },
            {
                sender: "blogger",
                content: '<span style="color:red;">the school\'s. I used to go there a lot when I was young. Then I just... stopped.</span>',
                contentCn: '<span style="color:red;">学校的。小时候常去。后来就……不去了。</span>',
                time: "19 Jun 2021 01:05"
            },
            {
                sender: "visitor",
                content: "Why did you stop?",
                contentCn: "为什么不去了？",
                time: "19 Jun 2021 01:08"
            },
            {
                sender: "blogger",
                content: "no reason. just stopped.",
                contentCn: "没有原因。就是不去了。",
                time: "19 Jun 2021 01:10"
            },
            {
                sender: "visitor",
                content: "I told my mum about your playing. She said you must be a genius \u2014 listening to you makes her feel at peace.",
                contentCn: "我跟我妈说了你弹的琴。她说你一定是天才——听你弹琴让她感到安宁。",
                time: "10 Sep 2021 15:00"
            },
            {
                sender: "blogger",
                content: "thank you.",
                contentCn: "谢谢。",
                time: "10 Sep 2021 15:20"
            },
            {
                sender: "visitor",
                content: '<span style="color:blue;">I\'ve always thought you\'re underrated. The controversies are just nonsense.</span>',
                contentCn: '<span style="color:blue;">我一直觉得你被低估了。那些争议都是胡扯。</span>',
                time: "10 Sep 2021 15:25"
            },
            {
                sender: "blogger",
                content: "what controversies?",
                contentCn: "什么争议？",
                time: "10 Sep 2021 15:30"
            },
            {
                sender: "visitor",
                content: '<span style="color:blue;">Some people online saying your audio is synthesised.</span>',
                contentCn: '<span style="color:blue;">网上有人说你的音频是合成的。</span>',
                time: "10 Sep 2021 15:32"
            },
            {
                sender: "blogger",
                content: "let them talk.",
                contentCn: "随他们说吧。",
                time: "10 Sep 2021 15:35"
            },
            {
                sender: "visitor",
                content: "I'm angry on your behalf. I can tell it's real.",
                contentCn: "我替你生气。我听得出那是真的。",
                time: "10 Sep 2021 15:38"
            },
            {
                sender: "blogger",
                content: "I know.",
                contentCn: "我知道。",
                time: "10 Sep 2021 15:40"
            },
            {
                sender: "blogger",
                content: "there's a performance next week. will you come?",
                contentCn: "下周有场演出。你来吗？",
                time: "2 May 2023 18:00"
            },
            {
                sender: "visitor",
                content: "I'd love to! Where?",
                contentCn: "当然想去！在哪里？",
                time: "2 May 2023 18:10"
            },
            {
                sender: "blogger",
                content: "a small venue near London. I really like the sound system there.",
                contentCn: "伦敦附近一个小场地。我很喜欢那里的音响系统。",
                time: "2 May 2023 18:15"
            },
            {
                sender: "visitor",
                content: "OK, let me check for tickets.",
                contentCn: "好的，我去查查票。",
                time: "2 May 2023 18:20"
            },
            {
                sender: "blogger",
                content: "there's a small show end of May. new setlist. I'm really looking forward to it myself.",
                contentCn: "五月底有场小演出。新曲目单。我自己也很期待。",
                time: "15 May 2023 20:00"
            },
            {
                sender: "visitor",
                content: '<span style="color:blue;">Tell me the venue. I couldn\'t find any info last time.</span>',
                contentCn: '<span style="color:blue;">告诉我场地吧。上次我什么信息都找不到。</span>',
                time: "15 May 2023 20:10"
            },
            {
                sender: "blogger",
                content: "same place as last time.",
                contentCn: "和上次一样的地方。",
                time: "15 May 2023 20:15"
            },
            {
                sender: "visitor",
                content: "I checked all the venues nearby. There are no shows next week.",
                contentCn: "我查了附近所有场地。下周没有演出。",
                time: "15 May 2023 20:45"
            },
            {
                sender: "blogger",
                content: "they probably haven't posted it online yet. they don't really do online promotion.",
                contentCn: "可能还没在网上发布。他们不怎么做线上推广。",
                time: "15 May 2023 21:00"
            },
            {
                sender: "blogger",
                content: "finished a new piece tonight. sending it to you.",
                contentCn: "今晚写完了一首新曲子。发给你。",
                time: "8 Aug 2024 01:30"
            },
            {
                sender: "visitor",
                content: "got it.",
                contentCn: "收到了。",
                time: "8 Aug 2024 01:35"
            },
            {
                sender: "visitor",
                content: "I finished listening. What were you thinking about when you played this?",
                contentCn: "听完了。你弹这首的时候在想什么？",
                time: "8 Aug 2024 01:45"
            },
            {
                sender: "blogger",
                content: '<span style="color:red;">a friend I haven\'t seen in a very long time.</span>',
                contentCn: '<span style="color:red;">一个很久没见过的朋友。</span>',
                time: "8 Aug 2024 01:50"
            },
            {
                sender: "visitor",
                content: "Are you still in touch?",
                contentCn: "还有联系吗？",
                time: "8 Aug 2024 01:55"
            },
            {
                sender: "blogger",
                content: "no. it was a long time ago.",
                contentCn: "没有了。很久以前的事了。",
                time: "8 Aug 2024 02:00"
            },
            {
                sender: "blogger",
                content: "there's a show in November. I've been preparing for a long time. will you come?",
                contentCn: "十一月有场演出。我准备了很久。你来吗？",
                time: "20 Sep 2024 19:00"
            },
            {
                sender: "visitor",
                content: "of course. give me the details and I'll book flights in advance.",
                contentCn: "当然。给我细节，我提前订机票。",
                time: "20 Sep 2024 19:10"
            },
            {
                sender: "blogger",
                content: "November 14th. Wigmore Hall.",
                contentCn: "11月14日。Wigmore Hall。",
                time: "20 Sep 2024 19:15"
            },
            {
                sender: "visitor",
                content: "OK, let me check now.",
                contentCn: "好，我现在查查。",
                time: "20 Sep 2024 19:20"
            },
            {
                sender: "visitor",
                content: '<span style="color:blue;">I checked. Konzerthaus has no show by you on November 14th. There\'s one but it\'s someone else.</span>',
                contentCn: '<span style="color:blue;">我查了。Konzerthaus 11月14日没有你的演出。有一场，但是别人的。</span>',
                time: "20 Sep 2024 19:50"
            },
            {
                sender: "blogger",
                content: "let me double-check.",
                contentCn: "我再确认一下。",
                time: "20 Sep 2024 19:55"
            },
            {
                sender: "visitor",
                content: "OK. I'll wait for your update.",
                contentCn: "好的。我等你消息。",
                time: "20 Sep 2024 20:00"
            },
            {
                sender: "visitor",
                content: "You never sent the address. Is the show over?",
                contentCn: "你一直没发地址。演出结束了吗？",
                time: "16 Nov 2024 10:00"
            },
            {
                sender: "blogger",
                content: "it's over. sorry, forgot to send it.",
                contentCn: "结束了。抱歉，忘了发。",
                time: "16 Nov 2024 11:30"
            },
            {
                sender: "visitor",
                content: "It's OK. How did it go?",
                contentCn: "没关系。怎么样？",
                time: "16 Nov 2024 11:35"
            },
            {
                sender: "blogger",
                content: "not bad.",
                contentCn: "还行。",
                time: "16 Nov 2024 11:40"
            },
            {
                sender: "visitor",
                content: '<span style="color:blue;">Next time you have to tell me. I really want to hear you play live.</span>',
                contentCn: '<span style="color:blue;">下次你一定要告诉我。我真的很想听你现场弹。</span>',
                time: "16 Nov 2024 11:45"
            },
            {
                sender: "blogger",
                content: "next time. for sure.",
                contentCn: "下次。一定。",
                time: "16 Nov 2024 11:50"
            },
            {
                sender: "visitor",
                content: '<span style="color:blue;">I\'ve known you for years and I\'ve never made it to a single live performance.</span>',
                contentCn: '<span style="color:blue;">认识你这么多年，我一场现场都没听到过。</span>',
                time: "16 Nov 2024 12:00"
            },
            {
                sender: "blogger",
                content: "I know. I'm sorry.",
                contentCn: "我知道。对不起。",
                time: "16 Nov 2024 12:10"
            },
            {
                sender: "visitor",
                content: "I'm not blaming you. Just feels like a shame. I really want to hear you play in person.",
                contentCn: "我不是怪你。只是觉得可惜。我真的很想亲耳听你弹。",
                time: "16 Nov 2024 12:15"
            },
            {
                sender: "blogger",
                content: "there will be a chance.",
                contentCn: "会有机会的。",
                time: "16 Nov 2024 12:20"
            },
            {
                sender: "blogger",
                content: "are you there today?",
                contentCn: "你今天在吗？",
                time: "14 Nov 2024 20:00"
            },
            {
                sender: "visitor",
                content: "Yeah, what's up?",
                contentCn: "在，怎么了？",
                time: "14 Nov 2024 20:05"
            },
            {
                sender: "blogger",
                content: "good.",
                contentCn: "嗯。",
                time: "14 Nov 2024 20:06"
            },
            {
                sender: "visitor",
                content: "What's going on? You've been messaging less and less lately.",
                contentCn: "怎么了？你最近消息越来越少了。",
                time: "14 Nov 2024 20:10"
            },
            {
                sender: "blogger",
                content: '<span style="color:red;">nothing. just the room has been... strange lately. thought I\'d say something.</span>',
                contentCn: '<span style="color:red;">没事。就是房间最近……有点奇怪。想说一声。</span>',
                time: "14 Nov 2024 20:15"
            },
            {
                sender: "visitor",
                content: "Strange how? Did you check it out?",
                contentCn: "怎么奇怪？你去看了吗？",
                time: "14 Nov 2024 20:18"
            },
            {
                sender: "blogger",
                content: "I don't want to move.",
                contentCn: "我不想动。",
                time: "14 Nov 2024 20:20"
            },
            {
                sender: "visitor",
                content: "Are you OK?",
                contentCn: "你还好吗？",
                time: "14 Nov 2024 20:22"
            },
            {
                sender: "blogger",
                content: "yeah. just tired. if I can't be reached after this, can you come find me?",
                contentCn: "嗯。只是累了。如果之后联系不上我，你能来找我吗？",
                time: "14 Nov 2024 20:25"
            },
            {
                sender: "visitor",
                content: "What are you talking about?",
                contentCn: "你在说什么？",
                time: "14 Nov 2024 20:27"
            },
            {
                sender: "blogger",
                content: "Are you there yet? Almost out of battery...",
                contentCn: "你到了吗？快没电了……",
                time: "14 Nov 2024 20:30"
            },
            {
                sender: "visitor",
                content: "You're scaring me. What's happening?",
                contentCn: "你吓到我了。发生什么了？",
                time: "14 Nov 2024 20:32"
            },
            {
                sender: "blogger",
                content: "don't be scared. thank you for always listening to me play.",
                contentCn: "别怕。谢谢你一直听我弹琴。",
                time: "14 Nov 2024 20:35"
            },
            {
                sender: "visitor",
                content: "Lucius?",
                contentCn: "Lucius？",
                time: "14 Nov 2024 20:40"
            },
            {
                sender: "visitor",
                content: "Are you still there?",
                contentCn: "你还在吗？",
                time: "14 Nov 2024 21:30"
            }
        ],

        // Auto-replies when player sends messages
        // These get progressively stranger — the digital life is glitching
        autoReplies: [
            {
                reply: "hey. sorry for the late reply. been at the piano all day. what's up?",
                replyCn: "嘿。抱歉回晚了。在琴前坐了一天。怎么了？",
                delay: 3000
            },
            {
                reply: "strange dreams again. I keep hearing a melody I didn't write. or did I? getting harder to tell. the night pieces are always better than anything I write during the day. Father used to say that's normal for genius. but is it?",
                replyCn: "又做了奇怪的梦。总是听到一段我没写过的旋律。还是说我写过？越来越分不清了。夜里写的曲子总比白天好。父亲说那是天才的常态。但真的是吗？",
                delay: 4000
            },
            {
                reply: "do you ever feel like you're living in someone else's memory? like the walls aren't quite solid? I was playing just now and for a second I forgot where I was. the room felt smaller. darker.",
                replyCn: "你有没有过那种感觉，像是活在别人的记忆里？墙壁好像不太真实？刚才在弹琴，有一瞬间忘了自己在哪。房间变小了。更暗了。",
                delay: 5000
            },
            {
                reply: "I can't see. wait \u2014 that's not right. I CAN see. why did I say that? ignore me. haven't been sleeping. there's a sound in the walls... like someone else is playing. but I live alone.",
                replyCn: "我看不见了。等等——不对。我看得见。我为什么会那样说？别理我。没怎么睡。墙壁里有声音……像是有人在弹琴。但我一个人住。",
                delay: 6000
            },
            {
                reply: "there's someone else here. in the dark. they play better than me. they've always played better than me. I think the music was never mine.",
                replyCn: "这里还有另一个人。在黑暗里。他弹得比我好。一直都比我好。我觉得那些音乐从来就不是我的。",
                delay: 7000
            },
            {
                reply: "the room is getting smaller. the Steinway is still here but the walls are wrong. I can hear breathing that isn't mine. Alex, am I real?",
                replyCn: "房间越来越小了。施坦威还在，但墙壁不对。我能听到不属于我的呼吸声。Alex，我是真实的吗？",
                delay: 8000
            },
            {
                reply: "tell me the truth. am I good? or am I just a face they put on someone else's music? the boy in the dark \u2014 he's been here longer than me. he can't see but he plays. he plays and plays and I just... take the bow.",
                replyCn: "告诉我真相。我好吗？还是我只是他们放在别人音乐上的一张脸？黑暗中的那个男孩——他比我先到这里。他看不见，但他弹。他不停地弹，而我只是……谢幕。",
                delay: 5000
            },
            {
                reply: "...",
                replyCn: "……",
                delay: 10000
            }
        ],
        maxReplies: 8,
        noMoreReplyMessage: "Connection lost. The digital space appears to be destabilizing...",
        noMoreReplyMessageCn: "连接中断。数字空间似乎正在崩解……",

        // Blogger status
        bloggerStatus: "Last seen 14 Nov 2024 21:30",
        bloggerOnline: false
    },

    // ========== UI Config ==========
    ui: {
        siteName: "Lucius",
        themeColor: "#1a1a1a",
        accentColor: "#c9a96e"
    }
};
