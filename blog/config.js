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
            title: "A Night in Prague — Thoughts After the Last Recital",
            content: `
                <p>Last night's performance in Prague was the most satisfying one I've had in years.</p>
                <p>That old private estate, candlelight flickering, only thirty listeners. No camera flashes, no pressure of applause — just music and the sound of breathing.</p>
                <p>I played Moonlight Sonata, Chopin's Nocturnes, and finally my own <em>The Forgotten Waltz</em>.</p>
                <p>An old man wept. He said the piece reminded him of his late wife.</p>
                <p>This is why I choose private recitals — <strong>music should touch the soul, not fill stadiums.</strong></p>
                <p>Heading back to Vienna next month. I need some rest.</p>
                <p><small>P.S. — Woke up again at 3am last night. Found new pages of sheet music on the piano that I don't remember writing. Father says it's my subconscious, that genius expresses itself in strange ways. Maybe he's right. The melodies are always better than anything I write while awake.</small></p>
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
                    content: "Not to be rude but... \"don't remember writing\"? That's not how composing works. Are you crediting the right person for these pieces?",
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
            title: "Rainy Days in Berlin",
            content: `
                <p>Stuck in Berlin for three days. It hasn't stopped raining.</p>
                <p>There's a battered old upright piano in the hotel room, completely out of tune, but I played it all afternoon anyway.</p>
                <p>Sometimes imperfect sounds carry more character. Like this city — scarred but still beautiful.</p>
                <p>Father called again. Same old topics. I've learned to just stay silent.</p>
                <p>He keeps telling me I need to "perform bigger," that I'm "wasting my gift on small rooms." But he doesn't understand. It's not about the size of the room. It's about whether the music is <em>real</em>.</p>
                <p><small>...Is it real? Sometimes I wonder. The notes come so easily in the night, but during the day, when I try to compose, my hands feel like they belong to someone else.</small></p>
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
            title: "New Composition: 'Whispers of the Night' Complete",
            content: `
                <p>Three months of work, and it's finally done.</p>
                <p>This piece is written for someone — someone who may never hear it.</p>
                <p>Some things can't be said out loud. So let the notes speak instead.</p>
                <p>It will premiere at the Munich recital next week. I hope she can feel it.</p>
                <p><em>"The night is gentle, whispers like poetry, only the piano understands my heart."</em></p>
                <p><small>Correction — I should say it was "completed," not that I "finished writing it." I found the last three pages tucked inside the piano bench this morning. My handwriting, apparently, but I have no memory of it. Father's doctor says it could be a form of hypnagogic creativity. I suppose I should be grateful. The third movement is extraordinary — far beyond anything I could write consciously.</small></p>
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
                    content: "I've been analysing your scores. The harmonic language in your 'night compositions' is radically different from your daytime interviews where you discuss theory. Almost like two different composers. Fascinating.",
                    time: "21 Sep 02:14",
                    likes: 3
                }
            ]
        },
        {
            id: 4,
            title: "On 'Inheritance'",
            content: `
                <p>Many people ask me why I won't take over the family business.</p>
                <p>The empire my father built is impressive, but it's not my world. Steel is cold; music is warm.</p>
                <p>He doesn't understand. He probably never will. But I no longer need his understanding.</p>
                <p>Life is short. I only want to do what makes my soul burn.</p>
                <p>This might be the last time I publicly discuss family matters. From now on, only music.</p>
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
                    content: "\"Inheritance\" is an interesting word choice. Your father spent millions on your career. Private venues, hand-picked audiences, suppressed reviews. What exactly did you inherit — talent, or a stage set?",
                    time: "6 Aug 01:47",
                    likes: 2
                }
            ]
        },
        {
            id: 5,
            title: "The Room Where I Practice",
            content: `
                <p>People always ask what my practice room looks like. So here it is.</p>
                <p>It's nothing fancy. A Steinway from the 1920s, stacks of sheet music everywhere, a window overlooking the Domgasse. The walls are thick enough that I can play at any hour without disturbing anyone.</p>
                <p>Sometimes I feel like this room knows me better than anyone. The piano remembers every note I've ever played — and some I don't remember playing.</p>
                <p>If you ever visit Vienna, come see it. I mean it. I'd love to share this space with someone who truly listens.</p>
                <p><strong>DM me if you're interested — I don't normally invite people, but for real friends, the door is always open.</strong></p>
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
                content: "Hi Lucio! I'm the one from the Munich recital — remember me?",
                time: "25 Sep 2024 14:30"
            },
            {
                sender: "blogger",
                content: "Hey! Of course I remember — third row, right? Thanks for coming to hear me play :)",
                time: "25 Sep 2024 15:12"
            },
            {
                sender: "visitor",
                content: "Yes! Whispers of the Night was absolutely stunning. I still can't get it out of my head.",
                time: "25 Sep 2024 15:20"
            },
            {
                sender: "blogger",
                content: "Glad you liked it. That piece means something special to me.",
                time: "25 Sep 2024 16:45"
            },
            {
                sender: "visitor",
                content: "Looking forward to your next recital! I'll definitely be there.",
                time: "26 Sep 2024 10:00"
            },
            {
                sender: "blogger",
                content: "Thanks! I have one in Prague next month — it's private though, limited seats. DM me if you're interested, I can sort something out.",
                time: "26 Sep 2024 11:33"
            },
            {
                sender: "visitor",
                content: "By the way, about your blog post — the practice room invitation — were you serious?",
                time: "10 Oct 2024 20:15"
            },
            {
                sender: "blogger",
                content: "Dead serious. Come to Vienna. I'll show you where the magic happens. Domgasse 5, ring the top bell. Just let me know when.",
                time: "10 Oct 2024 21:40"
            }
        ],

        // Auto-replies when player sends messages
        // These get progressively stranger — the digital life is glitching
        autoReplies: [
            {
                reply: "Sorry, I've been a bit busy lately. What's up?",
                delay: 3000
            },
            {
                reply: "I've been having these strange dreams... I keep hearing a melody I didn't write. Or did I? It's hard to tell anymore.",
                delay: 4000
            },
            {
                reply: "Do you ever feel like you're living in someone else's memory? Like the walls around you aren't quite solid?",
                delay: 5000
            },
            {
                reply: "I can't see. Wait — that's not right. I CAN see. Why did I say that? Ignore me, I'm tired.",
                delay: 6000
            },
            {
                reply: "There's someone else here. In the dark. They play better than me. They've always played better than me.",
                delay: 7000
            },
            {
                reply: "The room is getting smaller. Or maybe I'm getting bigger. Or maybe neither of us is real.",
                delay: 8000
            },
            {
                reply: "Tell me the truth. Am I a good pianist? Or am I just... an echo?",
                delay: 5000
            },
            {
                reply: "...",
                delay: 10000
            }
        ],
        maxReplies: 8,
        noMoreReplyMessage: "Connection lost. The digital space appears to be destabilizing...",

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
