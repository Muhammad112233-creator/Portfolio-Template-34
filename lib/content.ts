/**
 * START HERE: the portfolio's editable content.
 * Elliot, the companies, outcomes and products below are fictional template examples.
 * Replace them with your own real work before presenting this as a personal portfolio.
 */
export const site = {
  name: 'Elliot Westbrook',
  firstName: 'Elliot',
  initials: ['E', 'W'],
  role: 'Principal Product Designer',
  email: 'hello@example.com',
  studio: 'Fieldnotes Studio',
  description: 'Independent product designer. Making complex software feel a little more human.',
  url: 'https://example.com', // Set your live URL after publishing.
  seasonal: true, // An understated autumn edition, inspired by the reference's seasonal treatment.
  announcement:
    'A portfolio is a working document, not a museum. A few things are new, a few are being rethought. Thanks for looking around — there’s always something on the workbench.',
  socials: {
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    x: 'https://x.com/',
    bluesky: 'https://bsky.app/',
    mastodon: 'https://mastodon.social/',
    newsletter: 'https://substack.com/',
    youtube: 'https://www.youtube.com/',
  },
};

export const navItems = [
  ['Cases', 'cases'],
  ['Products', 'building'],
  ['Code', 'code'],
  ['Misc', 'misc'],
  ['Notes', 'notes'],
  ['AIUX', 'aiux'],
  ['Resume', 'resume'],
  ['Work together', 'work-together'],
  ['Shop', 'shop'],
] as const;

export const statistics = [
  { label: 'Years of experience', value: 12 },
  { label: 'In design leadership', value: 6 },
  { label: 'Largest team led', value: 42 },
  { label: 'Designers hired', value: 25 },
  { label: 'Projects delivered', value: 68 },
  { label: 'Industries served', value: 14 },
];

export type Project = {
  slug: string;
  client: string;
  title: string;
  description: string;
  year: string;
  sector: string;
  role: string;
  timeline: string;
  accent: string;
  screen: string;
  locked?: boolean;
  outcomes: [string, string][];
  challenge: string;
  decision: string;
};
export const projects: Project[] = [
  {
    slug: 'verdant',
    client: 'Verdant',
    title: 'A marketplace for plant people, grown around trust',
    description:
      'An independent nursery could tell you the whole story of a plant. A listing could barely tell you its height. We set out to close that gap — without making buying a plant feel like filling out a form.',
    year: '2026',
    sector: 'Marketplace · 0 → 1',
    role: 'Product strategy, brand, research, design system',
    timeline: 'Six months, from first conversation to launch',
    accent: '#9ab76c',
    screen: 'verdant',
    outcomes: [
      ['86', 'Independent growers onboarded'],
      ['12k+', 'Plants in the first collection'],
      ['6', 'Months to a working marketplace'],
      ['3', 'Steps from photograph to listing'],
    ],
    challenge:
      'People do not buy a living thing in quite the same way they buy a book. They want to know who grew it, whether it will survive the journey, and what happens when something goes wrong. The existing marketplaces answered those questions only after the purchase. We moved the answers into the browsing experience.',
    decision:
      'The most useful decision was also the least glamorous: put the grower’s name on every card. It made provenance part of the product rather than a story buried on an about page. From there, care requirements, delivery windows, and a straightforward arrival guarantee followed naturally.',
  },
  {
    slug: 'tally',
    client: 'Tally',
    title: 'Modernizing the close, without stopping the business',
    description:
      'Month-end is not a good time to discover a new interface. A careful, incremental rebuild of the workspace finance teams depend on when the stakes are highest.',
    year: '2025–26',
    sector: 'Enterprise · Financial operations',
    role: 'Design direction, product design, systems',
    timeline: 'Nine months, delivered in three releases',
    accent: '#b4a0f6',
    screen: 'tally',
    outcomes: [
      ['38%', 'Fewer repeated actions in core tasks'],
      ['4', 'Legacy workflows brought together'],
      ['24', 'Research sessions with finance teams'],
      ['1', 'Shared system across three releases'],
    ],
    challenge:
      'The interface was dated, but familiarity was doing real work. People navigated by muscle memory, often under deadline. A visual refresh would have been easy. Moving the furniture without interrupting the work was the hard part.',
    decision:
      'We separated a change in appearance from a change in behavior. The new shell shipped around the old task model first. Only after teams were comfortable did we shorten the paths through it, one well-instrumented workflow at a time.',
  },
  {
    slug: 'margin',
    client: 'Margin',
    title: 'An AI workspace that can tell you where its answers came from',
    description:
      'Search across a company’s documents is easy to demonstrate and surprisingly hard to trust. Margin makes the boundary between a source, an interpretation, and a guess visible.',
    year: '2026',
    sector: 'Enterprise AI · Knowledge work',
    role: 'Founding product design, interaction model',
    timeline: 'Four months to a private pilot',
    accent: '#80b8ba',
    screen: 'margin',
    outcomes: [
      ['18', 'Teams in the research pilot'],
      ['3', 'Clear levels of answer confidence'],
      ['2×', 'Faster source verification in testing'],
      ['0', 'Documents sent outside the workspace'],
    ],
    challenge:
      'The first prototype answered every question in the same confident voice. It looked impressive in a demo and created extra work in practice: people had to verify every sentence. Our task was not to make the model sound cleverer. It was to make checking cheap.',
    decision:
      'We designed the citation before the chat bubble. A source opens beside the answer, already scrolled to the relevant passage. The model’s interpretation has a different visual treatment from the quoted fact. Missing context is a first-class result, not a footnote.',
  },
  {
    slug: 'hearth',
    client: 'Hearth Collective',
    title: 'A member portal, and a system that makes room for everyone',
    description:
      'One place for a growing community to find the practical things: benefits, events, resources, and a real person when the website is not enough.',
    year: '2025',
    sector: 'Community · Member services',
    role: 'Research, service design, product design',
    timeline: 'Five months, with a community advisory group',
    accent: '#d6a274',
    screen: 'hearth',
    outcomes: [
      ['7', 'Member services in one place'],
      ['92%', 'Task completion in usability testing'],
      ['2', 'Languages available at launch'],
      ['AA', 'Accessibility target across core flows'],
    ],
    challenge:
      'Every department had its own form and its own idea of a member. People had learned to call a particular person to get something done. We needed to bring the services together without losing the care that made the community work.',
    decision:
      'Instead of organizing around departments, we organized around the moment someone needed help. Every service page explains what you need, how long it takes, and who is on the other end. A small content system keeps those promises maintainable.',
  },
  {
    slug: 'soundcheck',
    client: 'Soundcheck',
    title: 'A native research app that lets the moderator stay in the room',
    description:
      'A quiet Mac workspace for running multi-device studies, capturing the interesting moments, and turning hours of recordings into something a team can use.',
    year: '2024–25',
    sector: 'Native software · Research tools',
    role: 'Interaction design, prototyping, delivery',
    timeline: 'Two quarters, working with a small Mac team',
    accent: '#8bade6',
    screen: 'soundcheck',
    outcomes: [
      ['4', 'Synchronized camera sources'],
      ['1', 'Timeline for every observation'],
      ['16', 'Moderators in weekly testing'],
      ['60%', 'Less time preparing a session'],
    ],
    challenge:
      'A moderator was watching a participant, checking three devices, taking notes, and trying not to look distracted. The existing software made every one of those activities another window. We wanted the tool to disappear into the session.',
    decision:
      'The session is the unit of work. Devices, notes, prompts, and recordings all belong to it. A single keyboard action marks a moment across every stream, so the moderator can return to the conversation immediately.',
  },
  {
    slug: 'dispatch',
    client: 'Dispatch',
    title: 'Two email products, one experience that finally fits together',
    description:
      'Bringing a developer-first delivery platform into a larger marketing product — without asking either audience to pretend they were the other.',
    year: '2025',
    sector: 'B2B SaaS · Developer experience',
    role: 'Principal product designer',
    timeline: 'Eight months, embedded with the platform team',
    accent: '#d58a9c',
    screen: 'dispatch',
    locked: true,
    outcomes: [
      ['2', 'Products brought together'],
      ['1', 'Account and billing model'],
      ['6', 'Core flows redesigned'],
      ['3', 'Teams working from one system'],
    ],
    challenge:
      'Developers came for logs, keys, and a reliable API. Marketers came for audiences, campaigns, and results. A shared navigation alone would not make the products feel related. We had to find the right boundary between a shared foundation and a specialized workspace.',
    decision:
      'We kept the tools specific and made the account universal. Billing, team permissions, and setup became shared surfaces. Once inside a workspace, the vocabulary and density belong to the people doing that work.',
  },
  {
    slug: 'wayfinder',
    client: 'Wayfinder',
    title: 'Helping field teams get the right work to the right place',
    description:
      'A dispatch board that respects what a map cannot tell you: local knowledge, shift changes, and the person who knows the customer.',
    year: '2024',
    sector: 'Operations · Geospatial',
    role: 'Product direction and interaction design',
    timeline: 'Four months',
    accent: '#84b7a2',
    screen: 'atlas',
    outcomes: [
      ['28%', 'Less time planning a shift'],
      ['12', 'Regional teams in the pilot'],
      ['3', 'Views of one shared plan'],
      ['1', 'Place for every handoff'],
    ],
    challenge:
      'Dispatchers had a map, a spreadsheet, and a phone full of messages. Each told a different part of the truth. The challenge was bringing them together without turning local judgment into another field to fill in.',
    decision:
      'We put the schedule next to the map and kept both on the screen. Constraints are visible before a job is moved, and a short handoff note travels with the work rather than disappearing into a chat thread.',
  },
  {
    slug: 'relay',
    client: 'Relay Health',
    title: 'Making the next step in care easier to see',
    description:
      'A patient workspace built around the space between appointments, where most of the questions actually happen.',
    year: '2024',
    sector: 'Health · Patient experience',
    role: 'Research, prototyping, product design',
    timeline: 'Six months',
    accent: '#8ebfcb',
    screen: 'hearth',
    outcomes: [
      ['32', 'Patient interviews'],
      ['5', 'Care journeys mapped'],
      ['88%', 'Found their next step unaided'],
      ['1', 'Shared language for the care team'],
    ],
    challenge:
      'The portal was a record of what had happened. Patients needed to know what was going to happen next. We reoriented the experience around a care plan that could be understood in the five minutes between everything else.',
    decision:
      'Every appointment ends with a small, explicit next step. Instructions, documents, and the person to contact sit together. Clinical detail remains available without being the first thing a worried person has to interpret.',
  },
];

export const experiments = [
  {
    slug: 'token-trails',
    name: 'Token Trails',
    title: 'Every token and component in a design system, drawn as a map you can follow',
    tags: ['Static analysis', 'Node + SVG', 'Design systems'],
    image: 'graph',
    description:
      'A tiny source-code explorer that makes the relationship between design decisions and the screens that use them visible.',
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    title: 'A live dispatch map with believable telemetry and a little room for the unexpected',
    tags: ['Next.js', 'Realtime', 'Geospatial'],
    image: 'atlas',
    description:
      'A working exploration of dense operational software, made with simulated data and a very real respect for the people watching the map.',
  },
  {
    slug: 'storyforge',
    name: 'Storyforge',
    title: 'A tabletop character sheet that keeps the story attached to the numbers',
    tags: ['React + AI', 'Generative art', 'Tabletop'],
    image: 'storyforge',
    description:
      'An experiment in persistent character identity: change the equipment without losing the person underneath it.',
  },
  {
    slug: 'pencil',
    name: 'Pencil',
    title: 'A quieter assistant for teachers, from the first rough thought to tomorrow’s lesson',
    tags: ['Next.js', 'Voice', 'Education'],
    image: 'pencil',
    description:
      'Lesson planning, parent notes, and small practical things — designed around how a teacher actually has time to ask.',
  },
  {
    slug: 'fieldkit',
    name: 'Fieldkit',
    title: 'The smallest useful starting point for a consistent product interface',
    tags: ['React', 'Tokens', 'Open source'],
    image: 'tally',
    description:
      'A collection of intentionally ordinary primitives that leave more room to think about the interesting part of the product.',
  },
];

export const notes = [
  {
    slug: 'prototypes-are-conversations',
    title: 'A prototype is a conversation, not a promise',
    date: 'September 29, 2026',
    iso: '2026-09-29',
    image: 'note-prototype',
    category: 'Process',
    excerpt:
      'The most useful prototype is usually the one that makes a disagreement specific. Build enough to find the difficult question, then stop polishing long enough to ask it.',
    sections: [
      [
        'The wrong kind of impressive',
        'A few years ago I took a very polished prototype into a review. Every transition worked. The sample data looked plausible. Everyone liked it. Three weeks later we discovered that two people in the room had completely different ideas about what happened when the main action failed. The polish had helped us avoid the question instead of answer it.',
      ],
      [
        'Build the disagreement',
        'Now I start by writing down the decision the prototype is supposed to help us make. Not the feature it demonstrates, and not the screen it represents. A decision. If we cannot name one, we are probably making a presentation. That is sometimes useful, but it is a different artifact with a different job.',
      ],
      [
        'Leave the right edges rough',
        'Roughness is information. A plain button says that the wording is still open. An obviously simulated response says that the timing needs to be discussed. The trick is to be deliberate about which parts are unfinished. Accidental gaps make a prototype hard to use; intentional gaps make it easier to talk about.',
      ],
      [
        'Put real constraints in early',
        'I want a slow response, a long name, an empty account, and one very awkward piece of data before I want a nicer shadow. These are not edge cases in the abstract. They are the ordinary conditions the product will have to live in. If the idea only makes sense with ideal data, it is not quite an idea yet.',
      ],
      [
        'Know when to stop',
        'Once the question is answerable, more fidelity is usually a choice about communication, not discovery. Sometimes that choice is worth making. Often the better use of the afternoon is to put the thing in front of someone who has not been looking at it all week.',
      ],
    ],
  },
  {
    slug: 'systems-that-survive',
    title: 'Design systems should survive a busy Tuesday',
    date: 'September 21, 2026',
    iso: '2026-09-21',
    image: 'note-system',
    category: 'Systems',
    excerpt:
      'A system is not the tidy library you open during a presentation. It is what happens when someone needs to ship before lunch and you are not there to help.',
    sections: [
      [
        'The test is the ordinary day',
        'Most design systems look convincing in isolation. The spacing is clean, the component names are sensible, and the examples have exactly the right amount of content. The useful test happens somewhere else: a person with a deadline needs to make a screen the library did not anticipate. What happens next tells you whether you have a system or a collection.',
      ],
      [
        'Make the easy path the right path',
        'Rules that require a designer to remember a page of documentation will lose to a deadline. A useful primitive makes the intended choice easier than the escape hatch. The right token is already in the component. The layout behaves sensibly with too much text. The empty state does not need to be invented from scratch.',
      ],
      [
        'Treat exceptions as research',
        'An exception is not automatically a failure of discipline. It may be a missing concept. I keep a small record of the places people work around the library and review them with the team. A repeated workaround is a request, even when nobody has written a ticket.',
      ],
      [
        'Less ceremony, more maintenance',
        'The teams that get the most value from a system tend to give it a small, steady amount of care. They do not wait for a redesign budget. They fix the awkward thing when they encounter it, leave a note, and make sure the next person does not have to solve it again.',
      ],
    ],
  },
  {
    slug: 'a-useful-second-opinion',
    title: 'What I actually want from an AI design review',
    date: 'September 8, 2026',
    iso: '2026-09-08',
    image: 'note-review',
    category: 'AI & design',
    excerpt:
      'Not a score, and not another list of generic best practices. A second opinion is useful when it points at something concrete enough for a person to disagree with.',
    sections: [
      [
        'A long list is not a diagnosis',
        'The first automated review I tried gave me dozens of findings. Almost all were reasonable in the abstract. Very few told me what to do on Monday. The model had identified patterns without knowing which ones mattered to this product. That distinction is most of the work.',
      ],
      [
        'Give it a job it can finish',
        'I have better luck asking bounded questions. Can a keyboard user complete this path? Where does this view use a color outside the token set? Which labels change between these three screens? A narrow question has a result that can be checked. A request to make the experience better does not.',
      ],
      [
        'Ask for evidence, then verify it',
        'Every finding should point to a specific state, a way to reproduce it, and the consequence for a person using the product. If the tool cannot supply those things, the finding stays a hypothesis. The point is to reduce the cost of looking, not to outsource the responsibility for deciding.',
      ],
      [
        'Keep the human decision small',
        'The best output is a short list with enough context that I can say yes, no, or not yet. That is where the leverage is: more ground covered, less time reconstructing what the reviewer meant, and a clear owner for what happens next.',
      ],
    ],
  },
];

export type Pattern = {
  title: string;
  category: string;
  description: string;
  tags: string;
  icon: string;
};
export const patterns: Pattern[] = [
  {
    title: 'Start with a task, not a blank box',
    category: 'Interaction model',
    description:
      'A new person should be able to see what is possible before they need to invent a prompt. Offer a useful first action, then let the conversation find its own shape.',
    tags: 'onboarding · affordances · chat',
    icon: 'chat',
  },
  {
    title: 'Make checking cheaper than guessing',
    category: 'Trust & uncertainty',
    description:
      'The answer is only as useful as the effort required to verify it. Put the relevant source beside the claim, already open to the part that matters.',
    tags: 'trust · sources · verification',
    icon: 'shield',
  },
  {
    title: 'Give a wrong answer somewhere to go',
    category: 'Failure & recovery',
    description:
      'A dead end is not a recovery path. Let someone correct the assumption, keep the useful part, or hand the task to a person without starting from zero.',
    tags: 'errors · recovery · continuity',
    icon: 'alert',
  },
  {
    title: 'Leave the door open to undo',
    category: 'Failure & recovery',
    description:
      'Fast action and careful action are not opposites. Separate a reversible change from the moment it becomes permanent, and make that boundary visible.',
    tags: 'agents · undo · control',
    icon: 'undo',
  },
  {
    title: 'Show what leaves the room',
    category: 'Data boundaries',
    description:
      'People should not need to understand a system diagram to know where their information is going. Explain the boundary at the moment their data crosses it.',
    tags: 'privacy · permissions · export',
    icon: 'lock',
  },
  {
    title: 'Keep a small set of hard examples',
    category: 'Measurement',
    description:
      'A demo of the best answer is not an evaluation. Return to the same awkward real tasks after every change and watch what the interface lets a person do.',
    tags: 'evaluation · process · quality',
    icon: 'chart',
  },
  {
    title: 'Do not hurry an unverified claim',
    category: 'Foundations',
    description:
      'A sentence feels settled once someone has read it. If the next step could invalidate it, wait to display it or make its provisional status unmissable.',
    tags: 'streaming · latency · confidence',
    icon: 'spark',
  },
  {
    title: 'A little character needs a real state',
    category: 'Foundations',
    description:
      'An animated companion should help someone understand what the product is doing. Listening, working, waiting, and needing help deserve different behavior.',
    tags: 'identity · motion · state',
    icon: 'smile',
  },
  {
    title: 'Let people see that they are heard',
    category: 'Foundations',
    description:
      'A microphone icon tells us a feature exists. A responsive signal tells us it is working. Distinguish silence from a missed input, continuously and calmly.',
    tags: 'voice · feedback · liveness',
    icon: 'mic',
  },
  {
    title: 'Keep the version worth keeping',
    category: 'Memory & context',
    description:
      'A second attempt should not erase a good first one. Keep alternatives close enough to compare, and make it clear which decisions carry forward.',
    tags: 'versions · regeneration · comparison',
    icon: 'layers',
  },
  {
    title: 'Draw the edge of the available context',
    category: 'Data boundaries',
    description:
      'A fluent response can still be incomplete. Let the interface explain which sources were considered and which useful parts of the world were out of reach.',
    tags: 'context · boundaries · trust',
    icon: 'frame',
  },
  {
    title: 'Earn the interruption',
    category: 'Agency & oversight',
    description:
      'Noticing more things does not give a product permission to demand more attention. An unsolicited insight needs a clear reason to arrive now, and a quiet way to decline.',
    tags: 'proactive · attention · timing',
    icon: 'bell',
  },
  {
    title: 'Separate the record from the forecast',
    category: 'Trust & uncertainty',
    description:
      'A prediction should not wear the same clothes as a measured value. Reserve a consistent visual cue for what the system estimates rather than knows.',
    tags: 'prediction · evidence · charts',
    icon: 'chart',
  },
  {
    title: 'Explain the useful part of the wait',
    category: 'Foundations',
    description:
      'Progress should describe real stages that change what someone can do. A decorative percentage creates a promise the system may not be able to keep.',
    tags: 'progress · latency · honesty',
    icon: 'clock',
  },
  {
    title: 'Put the source in reach',
    category: 'Trust & uncertainty',
    description:
      'A citation is an invitation to inspect the evidence, not a piece of typographic decoration. Keep the destination specific, stable, and close to the claim.',
    tags: 'citations · navigation · evidence',
    icon: 'link',
  },
  {
    title: 'Let the artifact remember its origins',
    category: 'Trust & uncertainty',
    description:
      'The output may travel farther than the conversation. Attach its inputs, date, and review status to the thing itself so the next person does not have to reconstruct them.',
    tags: 'provenance · audit · metadata',
    icon: 'file',
  },
  {
    title: 'Put an action beside an observation',
    category: 'Agency & oversight',
    description:
      'The product has already done the work of noticing. Help the person take the next small step without making them translate the insight into a new task.',
    tags: 'insights · actions · workflow',
    icon: 'arrow',
  },
  {
    title: 'Prefer useful structure to more prose',
    category: 'Retrieval & discovery',
    description:
      'Sometimes the best answer is a filter, a comparison, or a small change to the view. A paragraph is not the only way to return the value of a model call.',
    tags: 'structure · facets · navigation',
    icon: 'grid',
  },
  {
    title: 'Keep the machinery behind the work',
    category: 'Retrieval & discovery',
    description:
      'An embedding is a way to find something, not a way most people want to browse. Start with the object they recognize and disclose the mechanism only when it helps.',
    tags: 'search · retrieval · restraint',
    icon: 'search',
  },
  {
    title: 'Make review a place, not a popup',
    category: 'Agency & oversight',
    description:
      'A growing queue needs ownership, status, and history. A confirmation dialog at the end of every task cannot carry the weight of ongoing supervision.',
    tags: 'review · ownership · accountability',
    icon: 'check',
  },
  {
    title: 'Ask for the inputs before the work',
    category: 'Agency & oversight',
    description:
      'Finding out halfway through that a task needs another permission is expensive for everyone. Show the required access and the expected result before asking someone to begin.',
    tags: 'consent · inputs · agents',
    icon: 'lock',
  },
  {
    title: 'Make visible work interruptible',
    category: 'Agency & oversight',
    description:
      'Watching a long task is not control. If the interface shows the process, it should also offer a meaningful way to pause, redirect, or stop it.',
    tags: 'agents · transparency · control',
    icon: 'pause',
  },
  {
    title: 'Design for the whole collection',
    category: 'Retrieval & discovery',
    description:
      'When processing becomes inexpensive, the useful unit may become the folder, the account, or the entire history. Do not make people repeat a one-item workflow out of habit.',
    tags: 'batch · scale · collections',
    icon: 'layers',
  },
  {
    title: 'Give good work a place to stay',
    category: 'Memory & context',
    description:
      'History is a record of time. A workspace also needs a way to keep the few results that matter, independent of when they were created.',
    tags: 'history · organization · memory',
    icon: 'bookmark',
  },
  {
    title: 'Keep parallel work in peripheral view',
    category: 'Memory & context',
    description:
      'Someone supervising several tasks needs to notice the odd one without opening every tab. Make changes in status legible from a single, calm overview.',
    tags: 'parallel · monitoring · attention',
    icon: 'grid',
  },
  {
    title: 'Name things so they can be found again',
    category: 'Memory & context',
    description:
      'Creating a result may take a sentence. Finding it next week should not require remembering that sentence. Give generated artifacts useful, editable names.',
    tags: 'naming · findability · history',
    icon: 'tag',
  },
  {
    title: 'Show a range, including its limits',
    category: 'Interaction model',
    description:
      'Examples should explain both what the product is good at and what it is not for. An honest edge helps a new person form a workable mental model.',
    tags: 'capability · onboarding · limits',
    icon: 'frame',
  },
  {
    title: 'Make preference gathering worth doing',
    category: 'Interaction model',
    description:
      'A cold-start questionnaire borrows attention against a future promise. Let the first preference change something useful immediately, before asking for the next one.',
    tags: 'personalization · onboarding · value',
    icon: 'sliders',
  },
  {
    title: 'Use the words from the actual job',
    category: 'Interaction model',
    description:
      'People think about preparing a lesson or resolving a ticket. Name the action after that outcome, not after the operation the model performs underneath it.',
    tags: 'language · affordances · tasks',
    icon: 'type',
  },
  {
    title: 'Keep the surrounding interface familiar',
    category: 'Interaction model',
    description:
      'If the core behavior is already new, ordinary navigation is a kindness. Spend novelty where it explains the product, not where it makes a button harder to recognize.',
    tags: 'conventions · platform · familiarity',
    icon: 'layout',
  },
  {
    title: 'Meet the work where it already lives',
    category: 'Craft & production',
    description:
      'A small capability inside a daily tool can be more useful than an impressive new destination. Remembering to visit is a cost paid on every use.',
    tags: 'integration · adoption · workflow',
    icon: 'link',
  },
  {
    title: 'Animate state, not reassurance',
    category: 'Failure & recovery',
    description:
      'Motion should describe a change the system actually knows about. A confident flourish cannot make an uncertain result more reliable, and may make it harder to question.',
    tags: 'motion · feedback · honesty',
    icon: 'spark',
  },
  {
    title: 'Prevent the predictable bad request',
    category: 'Failure & recovery',
    description:
      'Known limits belong in the input experience. Help people ask a workable question instead of accepting a request the product already knows it cannot fulfill.',
    tags: 'constraints · inputs · guardrails',
    icon: 'shield',
  },
  {
    title: 'Decide what stays the same',
    category: 'Consistency',
    description:
      'An edit is recognizable because something survives it. Choose the identity, layout, or meaning that should remain stable before offering another generation.',
    tags: 'identity · consistency · editing',
    icon: 'anchor',
  },
  {
    title: 'Make repeated requests unsurprising',
    category: 'Consistency',
    description:
      'People bring expectations from deterministic software. Explain when the same action may produce a different result, especially when it also has a different cost.',
    tags: 'caching · cost · mental models',
    icon: 'repeat',
  },
  {
    title: 'Do not fill a factual gap with decoration',
    category: 'Consistency',
    description:
      'Smoothing a visual transition is presentation. Inventing an unmeasured value is a new claim. Keep the distinction clear in both the data model and the interface.',
    tags: 'visualization · interpolation · evidence',
    icon: 'chart',
  },
  {
    title: 'Populate the prototype with ordinary life',
    category: 'Craft & production',
    description:
      'A realistic account has old work, incomplete work, and an awkward name or two. Useful demo data helps the team evaluate the product instead of admiring an empty shell.',
    tags: 'demo data · prototyping · review',
    icon: 'users',
  },
  {
    title: 'Generate within a dependable system',
    category: 'Craft & production',
    description:
      'Let a model suggest content and controlled variables. Let ordinary code own the accessible, predictable composition of the interface around them.',
    tags: 'tokens · components · systems',
    icon: 'code',
  },
  {
    title: 'Choose the signal before the screen',
    category: 'Measurement',
    description:
      'Agree on what would count as a useful change while the idea is still cheap to revise. Otherwise the easiest event to instrument becomes the definition of success.',
    tags: 'metrics · experiments · instrumentation',
    icon: 'target',
  },
  {
    title: 'Test the range, not the hero result',
    category: 'Measurement',
    description:
      'When outputs vary, one beautiful example is not the product. Review several ordinary inputs, a few difficult ones, and the behavior that connects them.',
    tags: 'variance · evaluation · prototyping',
    icon: 'layers',
  },
];

export const roles = [
  {
    company: 'Threadspace',
    role: 'Founder & Designer',
    date: 'Sep 2026 — Present',
    logo: 'thread',
    description:
      'Building Threadnote, a small Mac app for the things you mean to return to, and Threadbase, the local-first graph underneath it. A long-running idea, finally getting the attention it deserves.',
  },
  {
    company: 'Northstar Software',
    role: 'Principal, AI Product Design',
    date: 'Mar 2025 — Present',
    logo: 'north',
    description:
      'Leading product design across a family of specialist software businesses. Working with small, capable teams to turn legacy workflows into clearer, more useful experiences — and finding the places where intelligent assistance actually earns its screen space. Building the shared patterns, prototypes, and practical design habits that make the work repeatable.',
  },
  {
    company: 'Fieldnotes Studio',
    role: 'Independent Product Designer',
    date: 'Jan 2023 — Present',
    logo: 'initials',
    description:
      'A deliberately small practice for teams working through a difficult product question. Partnering with founders from the first research conversation to the release that reaches real people. Recent work includes Verdant, Margin, Tally, and a handful of early-stage teams whose best work is still quietly taking shape.',
  },
  {
    company: 'Parallel',
    role: 'Design Director',
    date: 'Feb 2020 — Dec 2022',
    logo: 'parallel',
    description:
      'Grew an independent product design team from eight to twenty-two. Led complex enterprise engagements, established a practical research practice, and spent a lot of time helping good people become confident leads.',
  },
  {
    company: 'Common Practice',
    role: 'Lead Product Designer',
    date: 'Apr 2018 — Jan 2020',
    logo: 'common',
    description:
      'Led a small multidisciplinary team across health, education, and financial services. Worked closely with engineering on accessible systems and prototypes that were useful beyond the presentation.',
  },
  {
    company: 'Sundial',
    role: 'Senior Product Designer',
    date: 'Jun 2016 — Mar 2018',
    logo: 'sun',
    description:
      'Designed the core workspace for a growing analytics product. Learned why a quiet table can sometimes do more for a customer than the most impressive chart in the room.',
  },
  {
    company: 'Small Hours',
    role: 'Product Designer',
    date: 'Aug 2014 — May 2016',
    logo: 'moon',
    description:
      'End-to-end design for early-stage software teams: research, visual identity, interface design, and a fair amount of front-end work when that was the fastest way to make the idea real.',
  },
  {
    company: 'Open Assembly',
    role: 'Interaction Designer',
    date: 'Sep 2013 — Jul 2014',
    logo: 'grid',
    description:
      'Worked on websites and early mobile products alongside a generous group of designers and developers. A good place to learn how much of the work happens between the disciplines.',
  },
  {
    company: 'The beginning',
    role: 'Independent Designer',
    date: '2012 — 2013',
    logo: 'pencil',
    description:
      'Small websites, local businesses, and the first few projects that taught me to ask a better question before opening the design tool.',
  },
];

export const shopItems = [
  {
    slug: 'good-company',
    name: 'Good Company',
    description: 'Milo, sit. “I was already being good.”',
    edition: 50,
    image: 'milo-sit',
  },
  {
    slug: 'low-profile',
    name: 'Low Profile',
    description: 'Milo, down. “A very important meeting.”',
    edition: 30,
    image: 'milo-loaf',
  },
  {
    slug: 'one-small-favor',
    name: 'One Small Favor',
    description: 'Milo, please. “You know the one.”',
    edition: 20,
    image: 'milo-beg',
  },
  {
    slug: 'ready-when-you-are',
    name: 'Ready When You Are',
    description: 'Milo, play. “I have cleared my afternoon.”',
    edition: 10,
    image: 'milo-play',
  },
  {
    slug: 'off-the-clock',
    name: 'Off the Clock',
    description: 'Milo, rest. “My assistant will reply.”',
    edition: 20,
    image: 'milo-loaf',
  },
];

export const galleryItems = [
  { image: 'verdant-screen', title: 'Verdant — the grower-led collection', kind: 'Product design' },
  { image: 'tally-screen', title: 'Tally — a calmer month-end close', kind: 'Enterprise systems' },
  { image: 'poster-form', title: 'Common ground, uncommon detail', kind: 'Identity study' },
  { image: 'graph', title: 'Token Trails — following a design decision', kind: 'Code experiment' },
  { image: 'hearth-screen', title: 'Hearth — the next useful step', kind: 'Member experience' },
  { image: 'margin-screen', title: 'Margin — answers with a paper trail', kind: 'AI workspace' },
  { image: 'poster-type', title: 'Make the ordinary work beautifully', kind: 'Typography study' },
  { image: 'atlas', title: 'Atlas — every job has a place', kind: 'Geospatial interface' },
  {
    image: 'soundcheck-screen',
    title: 'Soundcheck — stay in the conversation',
    kind: 'Native Mac app',
  },
  { image: 'poster-shapes', title: 'A small vocabulary of useful shapes', kind: 'System study' },
  { image: 'pencil', title: 'Pencil — tomorrow’s lesson, together', kind: 'Education' },
  {
    image: 'storyforge',
    title: 'Storyforge — a character, not just a sheet',
    kind: 'Creative tools',
  },
  {
    image: 'tally-screen',
    title: 'Tally — review without the busywork',
    kind: 'Financial operations',
  },
  {
    image: 'poster-grid',
    title: 'Draw the relationship, not the decoration',
    kind: 'Graphic study',
  },
  { image: 'margin-screen', title: 'Margin — a source stays in reach', kind: 'Interaction detail' },
  {
    image: 'hearth-screen',
    title: 'Hearth — room for a growing community',
    kind: 'Service design',
  },
  { image: 'graph', title: 'Token Trails — seeing the whole system', kind: 'Static analysis' },
  { image: 'poster-form', title: 'An identity with room to move', kind: 'Brand exploration' },
];
