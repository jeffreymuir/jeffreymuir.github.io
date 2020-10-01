

const quotes = [
    {
        content:"Innovation is taking two things that exist and putting them together in a new way.",
        author:"Tom Freston"
    },
    {
        content:"The value of an idea lies in the using of it.",
        author:"Thomas Edison"
    },
    {
        content:"What is the calculus of innovation? The calculus of innovation is really quite simple: Knowledge drives innovation, innovation drives productivity, productivity drives economic growth.",
        author:"William Brody"
    },
    {
        content:"Innovation is the unrelenting drive to break the status quo and develop anew where few have dared to go.",
        author: "Steven Jeffes"
    },
    {
        content:"Creativity is thinking up new things. Innovation is doing new things.",
        author:"Theodore Levitt"
    },
    {
        content: "Innovation takes birth in sync with the evolution of customer’s expectations and demands or vice versa. Either way, organizations around the world have to continually innovate themselves and keep up with the people’s wants. The failure to do so or being indifferent to your customer’s need will make your competitors win. And then suddenly, customers become indifferent to you- a high-risk gamble to play at.",
        author: "Ketan Kapoor"
    },
    {
        content: "If you look at history, innovation doesn’t come just from giving people incentives; it comes from creating environments where their ideas can connect.",
        author: "Steven Johnson"
    },
    {
        content: "I believe you have to be willing to be misunderstood if you're going to innovate.",
        author: "Jeff Bezos"
    },
    {
        content: "If I had asked the public what they wanted, they would have said a faster horse.",
        author: "Henry Ford"
    },
    {
        content: "The secret of change is to focus all of your energy, not on fighting the old, but building on the new.",
        author: "Socrates"
    },
    {
        content: "When the winds of change blow, some people build walls and others build windmills.",
        author: "Proverb"
    },
    {
        content: "The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man.",
        author: "George Bernard Shaw"
    },
    {
        content: "To stay ahead in innovation, look at horizontal industries and the ones leading your current industry, someone is always doing something new.",
        author: "Jeff Butler"
    },
    {
        content: "The best way to predict the future is to create it.",
        author: "Alan Kay"
    },
    {
        content: "I skate to where the puck is going, not where it has been.",
        author: "Wayne Gretsky"
    },
    {
        content: "Innovation is progress in the face of tradition.",
        author:"Divad"
    },
    { 
        content: "You can’t allow tradition to get in the way of innovation. There’s a need to respect the past, but it’s a mistake to revere your past.",
        author:"Bob Iger"
    },
    {
        content: "Insanity is doing the same thing over and over again and expecting different results.",
        author:"Unknown (not Einstein)"
    },
    {
        content: "Most innovation involves doing the things we do every day a little bit better rather than creating something completely new and different.",
        author:"Darin"
    },
    {
        content:"They always say time changes things, but you actually have to change them yourself.",
        author:"Andy Warhol"
    },
    {
        content: "Don’t be afraid to take big steps when one is indicated. You can’t cross a chasm in two small jumps.",
        author: "David Lloyd George"
    },
    {
        content: "The riskiest thing we can do is just maintain the status quo.",
        author: "Bob Iger"
    },
    {
        content: "Be an innovator, not an imitator.",
        author: "Audrey Carballo"
    },
    {
        content: "There’s a way to do it better. Find it.",
        author: "Thomas Edison"
    },
    {
        content: "Innovation comes from saying NO to 1000 things.",
        author: "Steve Jobs"
    },
    {
        content: "Innovation survives only when people believe in their own ideas.",
        author: "Levo League"
    },
    {
        content: "There’s always an element of chance and you must be willing to live with that element. If you insist on certainty, you will paralyze yourself.",
        author: "J.P. Getty"
    },
    {
        content: "If at first the idea is not absurd, then there is no hope for it.",
        author: "Albert Einstein"
    },
    {
        content: "Confusion is a word we have invented for an order that is not yet understood.",
        author: "Henry Miller"
    },
    {
        content: "When looking to innovate—fail forward. Innovation can be a chaotic process, embrace it and learn from your failures.",
        author: "Luke Wester"
    },
    {
        content: "About 95 percent of new products fail.",
        author: "Clayton Christensen"
    },
    {
        content: "Innovation is more likely to come from a person who sits down and does the same thing every single day until they become an expert than from a person who sits down once because they feel inspired.",
        author: "Stacy Caprio"
    },
    {
        content: "A ship is safe in harbor, but that’s not what ships are for.",
        author: "William Shedd"
    },
    {
        content: "There is no innovation and creativity without failure. Period.",
        author: "Brené Brown"
    },
    {
        content: "If I have a thousand ideas and only one turns out to be good, I am satisfied.",
        author: "Alfred Nobel"
    },
    {
        content:"Innovation- any new idea- by definition will not be accepted at first. It takes repeated attempts, endless demonstrations, monotonous rehearsals before innovation can be accepted and internalized by an organization. This requires courageous patience.",
        author:"Warren Bennis"
    },
    {
        content:"Everything you’ve ever wanted is on the other side of fear.",
        author:"George Addair"
    },
    {
        content: "What good is an idea if it remains an idea? Try. Experiment. Fail. Try again. Change the world.",
        author: "Simon Sinek"
    },
    {
        content: "I have not failed. I’ve just found 10,000 ways that won’t work.",
        author: "Thomas Edison"
    },
    {
        content: "You can have brilliant ideas, but if you can’t get them across, your ideas won’t get you anywhere.",
        author: "Lee Iacocca"
    },
    {
        content: "Listen to anyone with an original idea, no matter how absurd it may sound at first. If you put fences around people, you get sheep. Give people the room they need.",
        author: "William McKnight"
    },
    {
        content: "Ideas are like rabbits. You get a couple and learn how to handle them, and pretty soon you have a dozen.",
        author: "John Steinbeck"
    },
    {
        content: "A dream will not become an innovation if there is no realization.",
        author: "Ciputra"
    },
    {
        content: "Never tell people how to do things. Tell them what to do and they will surprise you with their ingenuity.",
        author: "George Patton"
    },
    {
        content: "You can’t wait for inspiration, you have to go after it with a club.",
        author: "Albert Einstein"
    },
    {
        content: "The way to get good ideas is to get lots of ideas and throw the bad ones away.",
        author: "Linus Pauling"
    },
    {
        content: "You can’t just ask customers what they want and then try to give that to them. By the time you get it built, they’ll want something new.",
        author: "Steve Jobs"
    },
    {
        content: "It’s easy to come up with new ideas; the hard part is letting go of what worked for you two years ago, but will soon be out of date.",
        author: "Roger von Oech"
    },
    {
        content: "You miss 100 percent of the shots you never take.",
        author: "Wayne Gretzky"
    },
    {
        content: "He who asks a question is a fool for 5 minutes. He who does not ask a question remains a fool forever.",
        author: "Ancient proverb"
    },
    {
        content: "Daring ideas are like chessmen moved forward; they may be beaten, but they may start a winning game",
        author: "William Blake"
    },
    {
        content: "Short cuts make long delays.",
        author: "J.R.R. Tolkien"
    },
    {
        content: "A pile of rocks ceases to be a rock pile when somebody contemplates it with the idea of a cathedral in mind.",
        author: "Antoine Saint-Exupéry"
    },
    {
        content: "The world needs dreamers and the world needs doers. But above all what the world needs most are dreamers that do.",
        author: "Sarah Ban Breathnach"
    },
    {
        content: "The creation of a thousand forests is in one acorn.",
        author: "Ralph Waldo Emerson"
    },
    {
        content: "You can’t use up creativity. The more you use, the more you have.",
        author: "Maya Angelou"
    },
    {
        content: "The Stone Age didn’t end because they ran out of stones.",
        author: "Unknown"
    },
    {
        content: "They did not know it was impossible so they did it.",
        author: "Mark Twain"
    },
    {
        content: "If the only tool you have is a hammer, you tend to see every problem as a nail.",
        author: "Abraham Maslow"
    },
    {
        content: "Finding opportunity is a matter of believing it’s there.",
        author: "Barbara Corcoran"
    },
    {
        content: "The uncreative mind can spot wrong answers, but it takes a very creative mind to spot wrong questions.",
        author: "Antony Jay"
    },
    {
        content: "Modern society is built upon two things: truth, which is discovered, and innovation, which is created.",
        author: "True Tamplin"
    },
    {
        content: "When something is important enough, you do it even if the odds are not in your favor.",
        author: "Elon Musk"
    },
    {
        content: "Genius is one percent inspiration, ninety-nine percent perspiration.",
        author: "Thomas Edison"
    },
    {
        content: "Before anything else, preparation is the key to success.",
        author: "Alexander Graham Bell"
    },
    {
        content: "All creative people want to do the unexpected.",
        author: "Hedy Lamarr"
    },
    {
        content: "Either write something worth reading or do something worth writing.",
        author: "Benjamin Franklin"
    },
    {
        content: "Education is the key to unlock the golden door of freedom.",
        author: "George Washington Carver"
    },
    {
        content: "If we worked on the assumption that what is accepted as true really is true, then there would be little hope for advance.",
        author: "Orville and Wilbur Wright"
    },
    {
        content: "Science knows no country, because knowledge belongs to humanity, and is the torch which illuminates the world.",
        author: "Louis Pasteur"
    },
    {
        content:"Innovation distinguishes between a leader and a follower.",
        author:"Steve Jobs"
    },
    {
        content:"Business has only two functions - marketing and innovation.",
        author:"Milan Kundera"
    },
    {
        content: "The true sign of intelligence is not knowledge but imagination.",
        author: "Albert Einstein"
    },
    {
        content: "Without change there is no innovation, creativity, or incentive for improvement. Those who initiate change will have a better opportunity to manage the change that is inevitable.",
        author: "William Pollard"
    },
    {
        content: "Our future growth relies on competitiveness and innovation, skills and productivity... and these in turn rely on the education of our people.",
        author: "Julia Gillard"
    },
    {
        content: "Every once in a while, a new technology, an old problem, and a big idea turn into an innovation.",
        author: "Dean Kamen"
    },
    {
        content: "Software innovation, like almost every other kind of innovation, requires the ability to collaborate and share ideas with other people, and to sit down and talk with customers and get their feedback and understand their needs.",
        author: "Bill Gates"
    },
    {
        content: "Without tradition, art is a flock of sheep without a shepherd. Without innovation, it is a corpse.",
        author: "Winston Churchill"
    },
    {
        content: "For good ideas and true innovation, you need human interaction, conflict, argument, debate.",
        author: "Margaret Heffernan"
    },
    {
        content: "Changes call for innovation, and innovation leads to progress.",
        author: "Li Keqiang"
    },
    {
        content: "There are different ways to do innovation. You can plant a lot of seeds, not be committed to any particular one of them, but just see what grows. And this really isn’t how we’ve approached this. We go mission-first, then focus on the pieces we need and go deep on them and be committed to them.",
        author: "Mark Zuckerberg"
    },
    {
        content:"Exploration is the engine that drives innovation.Innovation drives economic growth.",
        author: "Edith Widder"
    },    
    {
        content: "The only way you survive is you continuously transform into something else.It’s this idea of continuous transformation that makes you an innovation company.",
        author:"Ginni Rometty"
    },
    {
        content: "You can expect no influence if you are not susceptible to influence.",
        author: "Carl Jung"
    },
    {
        content: "If you have always done it that way, it is probably wrong.",
        author: "Charles Kettering"
    },
    {
        content: "There is only one thing stronger than all the armies of the world: and that is an idea whose time has come.",
        author: "Victor Hugo"
    },
    {
        content: "There’s no good idea that cannot be improved on.",
        author: "Michael Eisner"
    },
    {
        content: "What is now proved was once only imagined.",
        author: "William Blake"
    },
    {
        content: "Collaboration is important not just because it's a better way to learn. The spirit of collaboration is penetrating every institution and all of our lives. So learning to collaborate is part of equipping yourself for effectiveness, problem solving, innovation and life-long learning in an ever-changing networked economy.",
        author: "Don Tapscott"
    },
    {
        content: "Imagination is not only the uniquely human capacity to envision that which is not, and therefore the fount of all invention and innovation. In its arguably most transformative and revelatory capacity, it is the power to that enables us to empathize with humans whose experiences we have never shared.",
        author: "J. K. Rowling"
    },
    {
        content: "Once you have an innovation culture, even those who are not scientists or engineers - poets, actors, journalists - they, as communities, embrace the meaning of what it is to be scientifically literate. They embrace the concept of an innovation culture. They vote in ways that promote it. They don't fight science and they don't fight technology.",
        author: "Neil deGrasse Tyson"
    },
    {
        content: "The five essential entrepreneurial skills for success: Concentration, Discrimination, Organization, Innovation and Communication.",
        author: "Harold S. Geneen"
    },
    {
        content: "Ultimately, progress and innovation win.",
        author: "Travis Kalanick"
    },
    {
        content: "Most people have a very strong sense of organizational ownership, but I think what people have to own is an innovation agenda, and everything is shared in terms of the implementation.",
        author: "Satya Nadella"
    },
    {
        content: "New ideas for innovation grow out of the minds of each new generation. Having an institution of higher learning that can help young people put those ideas into action is critical.",
        author: "Jay Samit"
    },

    {
        content: "Innovation is the calling card of the future.",
        author: "Anna Eshoo"
    },

    {
        content: "Sometimes life hits you in the head with a brick. Don't lose faith.",
        author: "Steve Jobs"
    },

    {
        content: "Change almost never fails because it's too early. It almost always fails because it's too late.",
        author: "Seth Godin"
    },

    {
        content: "I define anxiety as experiencing failure in advance.",
        author: "Seth Godin"
    },

    {
        content: "The secret to being wrong isn't to avoid being wrong! The secret is being willing to be wrong. The secret is realizing that wrong isn't fatal.",
        author: "Seth Godin"
    },

    {
        content: "The secret of leadership is simple: Do what you believe in. Paint a picture of the future. Go there. People will follow.",
        author: "Seth Godin"
    },

    {
        content: "An artist is someone who uses bravery, insight, creativity, and boldness to challenge the status quo. And an artist takes it personally.",
        author: "Seth Godin"
    },

    {
         content: 
`People don't believe what you tell them.
They rarely believe what you show them.
They often believe what their friends tell them.
They always believe what they tell themselves.`,
         author: "Seth Godin"
     },

    {
        content: "If you are deliberately trying to create a future that feels safe, you will willfully ignore the future that is likely.",
        author: "Seth Godin"
    },

    {
        content: "How dare you settle for less when the world has made it so easy for you to be remarkable?",
        author: "Seth Godin"
    },

    {
        content: "Soon is not as good as now.",
        author: "Seth Godin"
    },

    {
        content: "There are two mistakes one can make along the road to truth. Not going all the way, and not starting.",
        author: "Siddhrtha Gautama"
    },

    {
        content: "In a battle between two ideas, the best one doesn't necessarily win. No, the idea that wins is the one with the most fearless heretic behind it.",
        author: "Seth Godin"
    },

    {
        content: "Change isn't made by asking permission. Change is made by asking forgiveness, later.",
        author: "Seth Godin"
    },

    {
        content: "Reject the tyranny of picked. Pick yourself.",
        author: "Seth Godin"
    },

    {
        content: "Art is a personal act of courage, something one human does that creates change in another.",
        author: "Seth Godin"
    },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },

    // {
    //     content: "",
    //     author: ""
    // },



];


export default quotes;