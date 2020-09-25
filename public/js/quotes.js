

const quotes = [
    {
        content:"Innovation is taking two things that exist and putting them together in a new way.",
        author:"Tom Freston, Co-founder of MTV"
    },
    {
        content:"The value of an idea lies in the using of it.",
        author:"Thomas Edison"
    },
    {
        content:"What is the calculus of innovation? The calculus of innovation is really quite simple: Knowledge drives innovation, innovation drives productivity, productivity drives economic growth.",
        author:"William Brody, Scientist"
    },
    {
        content:"Innovation is the unrelenting drive to break the status quo and develop anew where few have dared to go.",
        author: "Steven Jeffes, Marketing"
    },
    {
        content:"Creativity is thinking up new things. Innovation is doing new things.",
        author:"Theodore Levitt, Economist"
    },
    {
        content: "Innovation takes birth in sync with the evolution of customer’s expectations and demands or vice versa. Either way, organizations around the world have to continually innovate themselves and keep up with the people’s wants. The failure to do so or being indifferent to your customer’s need will make your competitors win. And then suddenly, customers become indifferent to you- a high-risk gamble to play at.",
        author: "Ketan Kapoor, Co-founder of Mercer-Mettl"
    },
    {
        content: "If you look at history, innovation doesn’t come just from giving people incentives; it comes from creating environments where their ideas can connect.",
        author: "Steven Johnson, Author"
    },
    {
        content: "I believe you have to be willing to be misunderstood if you're going to innovate.",
        author: "Jeff Bezos, Founder of Amazon "
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
        author: "Unknown, Proverb"
    },
    {
        content: "The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man.",
        author: "George Bernard Shaw, Playwright"
    },
    {
        content: "To stay ahead in innovation, look at horizontal industries and the ones leading your current industry, someone is always doing something new.",
        author: "Jeff Butler, Author"
    },
    {
        content: "The best way to predict the future is to create it.",
        author: "Alan Kay, Scientist"
    },
    {
        content: "I skate to where the puck is going, not where it has been.",
        author: "Wayne Gretsky, Hockey player"
    },
    {
        content: "Innovation is progress in the face of tradition.",
        author:"Divad"
    },
    { 
        content: "You can’t allow tradition to get in the way of innovation. There’s a need to respect the past, but it’s a mistake to revere your past.",
        author:"Bob Iger,Media executive"
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
        author:"Andy Warhol, Artist"
    },
    {
        content: "Don’t be afraid to take big steps when one is indicated. You can’t cross a chasm in two small jumps.",
        author: "David Lloyd George, Politician"
    },
    {
        content: "The riskiest thing we can do is just maintain the status quo.",
        author: "Bob Iger, Media executive"
    },
    {
        content: "Be an innovator, not an imitator.",
        author: "Audrey Carballo, CEO at Phoenix1"
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
        author: "Henry Miller, Writer"
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
        author: "William Shedd, Theologian"
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
        author:"Warren Bennis, Author"
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
        content: "",
        author: ""
    },
    
    
];


export default quotes;