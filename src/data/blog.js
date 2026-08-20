/* Blog articles. Add a new entry to `articles` (or drop in another file and
   import it) to publish another post — the Blog list and article pages render
   from this array. Article body is an array of blocks:
     { t: 'p', s }            paragraph
     { t: 'h2', s }           section heading
     { t: 'takeaways', items: [{ lead, rest }] }   numbered lessons

   Source links used in the closing note. */
const SPOTIFY_SHOW = 'https://open.spotify.com/show/6wavsvqx7Sx7viV7H5qOS8'
const APPLE_SHOW =
  'https://podcasts.apple.com/au/podcast/its-not-just-the-numbers/id1570577993'
const YOUTUBE_EPISODE = 'https://www.youtube.com/watch?v=O6-O-L5vxJg'

export const articles = [
  {
    slug: 'ai-in-accounting',
    title: 'AI in Accounting: Team Member, Tool, or Both?',
    excerpt:
      'Artificial intelligence has arrived in accounting, but not in the way many expected. It’s not a single app or a single process. It’s everywhere, embedded in workflows, changing how firms scope engagements, price cleanup work, and train their people.',
    blocks: [
      {
        t: 'p',
        s: 'Artificial intelligence has arrived in accounting, but not in the way many expected. It’s not a single app or a single process. It’s everywhere, embedded in workflows, changing how firms scope engagements, price cleanup work, and train their people.',
      },
      {
        t: 'p',
        s: 'In the latest episode of It’s Not Just the Numbers, co-hosts Damien Greathead and Penny Breslin explored how AI is reshaping the day-to-day work of accounting firms. Their conversation moved beyond theory to real-world examples of how AI is being used in client engagements, what it means for team development, and why critical thinking, not coding, is the skill every firm must cultivate next.',
      },

      { t: 'h2', s: 'When AI Writes the Proposal' },
      {
        t: 'p',
        s: 'Breslin shared a case study that perfectly captures AI’s dual role as both team member and tool.',
      },
      {
        t: 'p',
        s: 'Her firm, MoneyPenny LLC, was asked to review the books of a new Canadian client. The client’s file was complex—multiple years behind, multiple currencies, and mixed classifications of assets and loans. Breslin’s offshore accounting team spent five hours dissecting the data and compiling a detailed Excel summary. But rather than spend another half-day translating that data into a client-ready proposal, Breslin turned to Claude, an AI assistant similar to ChatGPT.',
      },
      {
        t: 'p',
        s: 'She stripped the file of identifying details and uploaded it with a detailed prompt: describe the cleanup project in plain English, estimate the hours required based on three minutes per transaction, and include consulting time for the lead accountant.',
      },
      {
        t: 'p',
        s: 'Within minutes, the AI generated a professional two-page proposal—complete with task breakdowns, time estimates, and language that a non-accountant could understand.',
      },
      {
        t: 'p',
        s: '“It came back with 159 hours of work and broke it down by balance sheet, P&L, payables, GST/PST reconciliation—everything,” Breslin explained. “Then I asked it to redo the proposal assuming we’d only work on 2022 forward. It recalculated instantly, realized it had made an error, apologized, and corrected itself to 139 hours.”',
      },

      {
        t: 'p',
        s: 'The result wasn’t just efficiency, it was insight. When the proposal was sent to the firm’s client, the accountant admitted she would never have charged appropriately without seeing the full scope in writing. “She would have quoted 30 hours,” said Breslin. “Then realized halfway through that it was triple that. AI made it possible to see the real work before starting.”',
      },

      { t: 'h2', s: 'The Hidden Hours Firms Forget to Bill' },
      {
        t: 'p',
        s: 'The exercise also revealed a pervasive issue in most firms: unbilled administrative time. When Breslin’s AI-generated proposal included hours for prep and post-work, what she calls the “pre-flight and landing checks” of accounting, her client questioned the addition. “She said, ‘I didn’t know how much time I was leaving on the table.’”',
      },
      {
        t: 'p',
        s: 'Breslin compared the workflow to aviation: before and after every flight, crews run through checklists. “We’re not flying planes, but the principle is the same. Preparation and review are part of the job. Ignoring that time distorts pricing and burns out teams.”',
      },
      {
        t: 'p',
        s: 'For firm leaders, this anecdote underscores why AI is more than automation, it’s an awareness tool. By converting a mass of transactional detail into a structured summary, AI exposes the true cost of the work.',
      },

      { t: 'h2', s: 'AI as Colleague, Not Competitor' },
      { t: 'p', s: 'So is AI a team member or a tool? Both, says Breslin.' },
      {
        t: 'p',
        s: 'When she’s coding or embedding scripts into a website, it’s a tool—a technical assistant executing commands. But when she’s brainstorming, testing ideas, or analyzing data, AI behaves more like a junior colleague: curious, responsive, and occasionally wrong.',
      },
      {
        t: 'p',
        s: 'Greathead sees the same shift in his own solo consulting practice. “I keep ChatGPT and Perplexity open all day. It’s like having a smart researcher who never sleeps. I ask it to summarize, draft, or brainstorm, and then I review and refine,” he said. “But just like any team member, I have to verify the work.”',
      },
      {
        t: 'p',
        s: 'That verification step is key. In their discussion, both hosts emphasized that accountants who blindly accept AI outputs risk not only factual errors but also reputational damage. Greathead described testing an AI-generated sales-call follow-up email that “missed the tone and context completely.”',
      },
      {
        t: 'p',
        s: '“It got me thinking,” he said. “If you’re not reading, editing, or applying judgment, you’re not just outsourcing writing—you’re outsourcing thinking.”',
      },

      { t: 'h2', s: 'Training the Team for an AI Future' },
      {
        t: 'p',
        s: 'For Breslin, whose firm employs more than 80 accountants in Chennai, India, the question isn’t whether AI will replace bookkeepers or tax preparers, it’s how to prepare her team to move up the value chain.',
      },
      {
        t: 'p',
        s: '“It’s going to take work away, absolutely,” she said. “We’ll need fewer people touching keyboards and more people thinking critically.”',
      },
      {
        t: 'p',
        s: 'To get there, she’s focused on developing critical thinking skills, something she believes traditional accounting education often neglects. Inspired by her own Jesuit schooling, Breslin introduced an unconventional training exercise: reading and discussing a Forbes article on “seeing complex opportunities instead of fixating on crisis.”',
      },
      {
        t: 'p',
        s: 'The article’s metaphor—a rainforest where the trees and roots are interdependent—helped her team understand accounting systems as ecosystems.',
      },
      {
        t: 'p',
        s: '“I told them: stop looking at the general ledger in isolation. Think of the apps, integrations, and data flows as the roots of the forest,” she said. “Everything connects. You can’t fix one thing without understanding the whole environment.”',
      },
      {
        t: 'p',
        s: 'Team leaders were then challenged to apply the “rainforest mindset” to their client work and report back examples. Within days, they shared how it helped them anticipate downstream effects, improve communication, and spot inefficiencies earlier.',
      },
      {
        t: 'p',
        s: 'In Breslin’s view, AI plus critical thinking is the future accounting skill set. “I use AI to gamify learning,” she said. “Sometimes the games are about accounting, sometimes about geography. It’s about keeping the brain curious.”',
      },

      { t: 'h2', s: 'The New Discipline: Questioning the Bot' },
      {
        t: 'p',
        s: 'One recurring theme throughout the episode was the importance of reviewing and questioning AI outputs.',
      },
      {
        t: 'p',
        s: '“Accountants need to learn to talk back to the bot,” Breslin said. “Ask it why it made a decision. Challenge its assumptions. You have knowledge of the client the bot will never have—context, history, empathy.”',
      },
      {
        t: 'p',
        s: 'Greathead likened it to training staff. “You wouldn’t hand a file to an employee without any background or context,” he said. “Yet that’s exactly what people do with AI. If you want quality output, you have to set the scene, define the goal, and give it constraints—just like you would with a person.”',
      },
      {
        t: 'p',
        s: 'This process, sometimes called “prompt design”, is becoming a core professional competency. The better the input, the better the result. Or as Breslin put it, “You have to tell a story to the app to get the response you want.”',
      },

      { t: 'h2', s: 'Beyond Compliance: The Human Advantage' },
      {
        t: 'p',
        s: 'As the discussion wrapped up, both hosts agreed: AI will not eliminate accountants, but it will expose weaknesses in how firms train, communicate, and price their work.',
      },
      {
        t: 'p',
        s: 'Routine data entry, reconciliation, and report preparation will increasingly be automated. What remains is the human layer—judgment, context, and empathy.',
      },
      {
        t: 'p',
        s: '“You have empirical knowledge of the client that the bot’s never going to have,” said Breslin. “You have the ability to see beyond the transaction and understand what’s at stake.”',
      },
      {
        t: 'p',
        s: 'For Greathead, that’s precisely why firms must embed AI literacy into staff development now. “We spend hours training on tax updates and software changes,” he noted. “Maybe it’s time to spend the same energy helping our teams strengthen their critical-thinking muscles.”',
      },

      { t: 'h2', s: 'Takeaway for Accounting Leaders' },
      {
        t: 'p',
        s: 'For professional accountants evaluating where AI fits in their firm, It’s Not Just the Numbers offers five clear lessons:',
      },
      {
        t: 'takeaways',
        items: [
          {
            lead: 'Use AI as both tool and teammate.',
            rest: 'Treat it like a colleague—communicate, verify, and collaborate.',
          },
          {
            lead: 'Leverage AI for scoping and pricing.',
            rest: 'Automate file analysis to expose hidden hours and prevent under-billing.',
          },
          {
            lead: 'Train for thinking, not typing.',
            rest: 'Encourage curiosity, discussion, and systems-level understanding.',
          },
          {
            lead: 'Design prompts with context.',
            rest: 'The quality of your question determines the quality of the output.',
          },
          {
            lead: 'Protect the human advantage.',
            rest: 'Empathy, judgment, and client insight remain irreplaceable.',
          },
        ],
      },
    ],
    source: {
      note: 'This article is based on the episode “AI in Accounting: Team or Tool?” from the podcast It’s Not Just the Numbers, hosted by Damien Greathead and Penny Breslin. The show explores how accountants can build modern Client Accounting Services (CAS) practices that go beyond compliance. Listen on your preferred podcast platform.',
      spotify: SPOTIFY_SHOW,
      apple: APPLE_SHOW,
      youtube: YOUTUBE_EPISODE,
    },
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
