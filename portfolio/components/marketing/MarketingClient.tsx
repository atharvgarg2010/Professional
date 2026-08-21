'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data Structure ---
export interface ThesisData {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  readTime: string;
  sections: {
    heading: string;
  }[];
  downloadUrl?: string;
  readTime?: string; // Kept for backwards compatibility but calculated dynamically if omitted
}

const calculateReadTime = (thesis: ThesisData) => {
  const text = thesis.sections.map(s => s.content.join(' ')).join(' ');
  const words = text.split(/\s+/).length;
  // Assume ~200 words per minute reading speed
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} MIN READ`;
};

const theses: ThesisData[] = [
  {
    id: 'one8-launch',
    title: 'ONE8 Launch',
    subtitle: 'From Launch Event to Origin Story',
    summary: 'Reframing the launch of Virat Kohli\'s ONE8 sportswear brand from a conventional celebrity launch into a story about origins, ambition, legacy, and passing the journey forward.',
    downloadUrl: '/one8-thesis.md',
    sections: [
      {
        heading: "ONE8 — From Launch Event to Origin Story",
        content: [
          "## Brand Strategy Concept",
          "**Concept:** Reframe the launch of Virat Kohli's ONE8 sportswear brand from a conventional celebrity launch into a story about **origins, ambition, legacy, and passing the journey forward**.",
          "> **The journey that built Virat begins the next chapter in the place where it began.**",
          "## 1. The Strategic Opportunity",
          "A conventional sportswear launch can generate attention through:",
          "- Celebrity presence",
          "- Limited-edition products",
          "- Scarcity",
          "- Influencers",
          "- Launch events",
          "- Immediate sales",
          "The proposed strategy goes one step further.",
          "Instead of making the launch primarily about **a new product**, make it about **the meaning behind the brand**.",
          "Virat Kohli's strongest asset is not simply his celebrity status. It is the story attached to his career: a young Delhi cricketer who dreamed, trained, competed, and eventually became one of India's most recognizable athletes.",
          "ONE8 can use that existing emotional equity to establish a deeper brand identity.",
          "The central thought is:",
          "> **Don't launch ONE8 where Virat is today. Launch it where the journey started.**"
        ]
      },
      {
        heading: "2. The Core Idea — Return to the Beginning",
        content: [
          "Instead of making the final launch another polished mall or commercial event, the campaign would take Virat back to **Meerabagh / Paschim Vihar, Delhi**, the area associated with his early life and cricket journey.",
          "The location becomes more than a venue.",
          "It becomes a **brand asset**.",
          "The launch communicates:",
          "- This is where the dream started.",
          "- This is where the discipline was built.",
          "- This is where the journey began.",
          "- Now the next chapter begins from the same roots.",
          "This gives ONE8 an origin story rather than simply an announcement."
        ]
      },
      {
        heading: "3. Why the Location Matters",
        content: [
          "A conventional venue gives the brand visibility.",
          "A meaningful location gives the brand **context**.",
          "Launching from Virat's roots creates an immediate contrast:",
          "**Traditional launch:**",
          "> Celebrity → stage → product → audience",
          "**Proposed launch:**",
          "> Childhood → ambition → journey → legacy → ONE8",
          "The second structure gives the product a reason to exist inside the story.",
          "The location also makes the campaign feel less manufactured. Instead of constructing an artificial emotional setting, the campaign uses a place that already has meaning in Virat's story."
        ]
      },
      {
        heading: "4. Campaign Architecture",
        content: [
          "The campaign would be structured in three major phases:",
          "## PHASE I — Reel Series",
          "### Build the story.",
          "## PHASE II — ONE8 Launch in Meerabagh",
          "### Create the symbolic climax.",
          "## PHASE III — Ground Visit & Gifting",
          "### Pass the journey forward.",
          "The order matters.",
          "The audience first becomes emotionally invested in the story, then experiences the launch, and finally sees the story turn outward toward the next generation."
        ]
      },
      {
        heading: "5. Phase I — The Reel Series",
        content: [
          "The campaign should not reveal everything immediately.",
          "Instead, ONE8 can release a short cinematic reel series following Virat as he revisits important parts of his early journey in Delhi.",
          "### Possible episodes",
          "#### Episode 1 — The City",
          "Virat returns to Delhi.",
          "The episode establishes the city and the atmosphere without immediately revealing the entire campaign.",
          "The idea:",
          "> Before the stadiums, there was Delhi.",
          "#### Episode 2 — The School",
          "Virat revisits his school and memories associated with his early years.",
          "The focus should not be on a generic celebrity appearance.",
          "It should focus on:",
          "- early ambition",
          "- discipline",
          "- memories",
          "- the person before the fame",
          "#### Episode 3 — The Ground",
          "Virat returns to a cricket ground associated with his early playing years.",
          "This becomes the emotional bridge between:",
          "**Virat the young cricketer**",
          "and",
          "**Virat the athlete whose journey inspired ONE8.**",
          "#### Episode 4 — The Beginning",
          "The storytelling becomes more reflective.",
          "The audience sees the contrast between:",
          "**Where he started**",
          "and",
          "**where he is now.**",
          "The ONE8 reveal is still held back.",
          "#### Final Episode — The Next Chapter",
          "Virat returns to Meerabagh.",
          "The campaign finally reveals that this isn't only a trip down memory lane.",
          "It is the beginning of another chapter.",
          "This leads directly into the launch."
        ]
      },
      {
        heading: "6. Phase II — The Meerabagh Launch",
        content: [
          "The final launch should happen in the place connected to the beginning of Virat's journey.",
          "The visual language should be cinematic but grounded.",
          "The objective is not to create the biggest possible spectacle.",
          "The objective is to create the **most meaningful visual**.",
          "A rooftop or elevated location could create a powerful visual of Virat looking over the area where his early journey began.",
          "The symbolism:",
          "> He is looking back at where he came from while beginning where he is going next.",
          "The launch itself becomes the climax of the reel series.",
          "This is important because the audience has already followed the journey.",
          "The event therefore has **narrative context**, rather than functioning as an isolated launch event."
        ]
      },
      {
        heading: "7. The Product Reveal",
        content: [
          "The ONE8 product should appear naturally within the story rather than becoming the first thing shown.",
          "The audience should first understand:",
          "**Who Virat was.**",
          "Then:",
          "**What he became.**",
          "Then:",
          "**What ONE8 represents.**",
          "Then:",
          "**The product.**",
          "This makes the product feel like an extension of the story rather than merchandise attached to a celebrity."
        ]
      },
      {
        heading: "8. Phase III — Return to the Ground",
        content: [
          "After the launch, Virat returns to a local cricket ground.",
          "This is where the campaign changes direction.",
          "The story moves from:",
          "> **Virat's beginning**",
          "to:",
          "> **Someone else's beginning.**",
          "Virat interacts with young cricketers and gives selected children limited-edition ONE8 products.",
          "The products could include:",
          "- shoes",
          "- jerseys",
          "- training apparel",
          "- other launch-specific sportswear",
          "The important part is not the free product.",
          "It is the symbolism."
        ]
      },
      {
        heading: "9. The Passing-the-Torch Idea",
        content: [
          "This is the emotional payoff of the campaign.",
          "Virat once stood on a local ground dreaming about becoming a cricketer.",
          "Now he returns as an established athlete and gives young players something that represents the next step in their own journey.",
          "The message becomes:",
          "> **The place where one dream began can be the place where another dream begins.**",
          "This makes ONE8 relevant to sport itself.",
          "It is no longer only:",
          "> Virat Kohli's sportswear brand.",
          "It becomes associated with:",
          "- ambition",
          "- discipline",
          "- beginnings",
          "- sport",
          "- aspiration",
          "- the next generation"
        ]
      },
      {
        heading: "10. Why Gifting Comes AFTER the Launch",
        content: [
          "The sequence is intentional.",
          "If the gifting happens first, it can feel like promotional activity.",
          "After the launch, it becomes the emotional resolution of the campaign.",
          "The structure becomes:",
          "### Reel Series",
          "**Remember the beginning.**",
          "↓",
          "### Meerabagh Launch",
          "**Begin the next chapter.**",
          "↓",
          "### Ground Gifting",
          "**Pass the journey forward.**",
          "This gives the campaign a beginning, climax, and emotional resolution."
        ]
      },
      {
        heading: "11. Brand Meaning",
        content: [
          "The campaign should establish ONE8 around a few central ideas:",
          "### Ambition",
          "You can start anywhere.",
          "### Discipline",
          "The journey is built through repeated effort.",
          "### Roots",
          "Success doesn't erase where you started.",
          "### Sport",
          "ONE8 belongs to the culture of athletes and aspiring athletes.",
          "### Progression",
          "Every generation begins somewhere.",
          "### Legacy",
          "The journey continues beyond one person.",
          "These ideas give ONE8 a philosophy beyond product specifications."
        ]
      },
      {
        heading: "12. Why This Is Different From a Conventional Launch",
        content: [
          "A conventional launch mainly answers:",
          "> **What are we selling?**",
          "This campaign tries to answer:",
          "> **Why does this brand exist?**",
          "That distinction is important.",
          "The product becomes part of a larger narrative.",
          "Instead of:",
          "> Virat launched ONE8.",
          "The audience receives:",
          "> Virat returned to the place where his journey began to start the next chapter of ONE8.",
          "That is a much more memorable story."
        ]
      },
      {
        heading: "13. Social Media Strategy",
        content: [
          "The campaign is designed for short-form content.",
          "Each reel becomes a standalone piece while also contributing to the larger narrative.",
          "Potential content types:",
          "- cinematic reels",
          "- childhood/early-career memories",
          "- school revisit",
          "- Delhi visuals",
          "- cricket-ground footage",
          "- behind-the-scenes moments",
          "- launch reveal",
          "- young cricketer reactions",
          "- limited-edition product reveal",
          "The audience should be encouraged to follow the sequence rather than consume everything as one advertisement."
        ]
      },
      {
        heading: "14. Cultural Timing",
        content: [
          "The campaign becomes more powerful when launched during a period in which Virat's career is already generating strong public emotion and conversations around his legacy.",
          "The strategic opportunity is to connect:",
          "**Virat's current legacy**",
          "with",
          "**the place where his journey began.**",
          "This creates a natural emotional bridge between the athlete's past, present, and future.",
          "The timing should, however, be evaluated against the actual launch calendar, cricket schedule, product readiness, and current public sentiment rather than assuming that a particular moment will automatically generate virality."
        ]
      },
      {
        heading: "15. The Commercial Logic",
        content: [
          "The campaign should not be judged only by views.",
          "Its business objectives could include:",
          "### Brand Awareness",
          "Increase recognition of ONE8 as a sportswear brand rather than simply a celebrity label.",
          "### Brand Positioning",
          "Associate ONE8 with ambition, sport, discipline, and youth.",
          "### Product Launch",
          "Create demand around the first major product drop.",
          "### Community Building",
          "Create an emotional relationship between ONE8 and aspiring athletes.",
          "### Earned Media",
          "Generate organic coverage because the story itself is newsworthy.",
          "### Social Growth",
          "Use the reel series to build anticipation before the launch."
        ]
      },
      {
        heading: "16. Combining Emotion With the Existing Scarcity Model",
        content: [
          "A particularly strong version would not necessarily replace an existing scarcity-based launch strategy.",
          "Instead:",
          "**Storytelling creates desire.**",
          "**Scarcity creates urgency.**",
          "For example:",
          "1. Reel series builds emotional anticipation.",
          "2. Meerabagh launch creates the cultural moment.",
          "3. Limited-edition ONE8 product creates scarcity.",
          "4. Public drop / access mechanism creates participation.",
          "5. Ground gifting provides emotional closure.",
          "This combines two different psychological mechanisms:",
          "### Emotional motivation",
          "\"I want to be part of this story.\"",
          "### Scarcity motivation",
          "\"I need to act now.\"",
          "That can be more powerful than either mechanism alone."
        ]
      },
      {
        heading: "17. Visual Direction",
        content: [
          "The visual identity should avoid making the campaign look like a generic luxury commercial.",
          "The strongest aesthetic would balance:",
          "- Delhi realism",
          "- cricket-ground textures",
          "- nostalgia",
          "- modern sportswear",
          "- cinematic lighting",
          "- restrained product shots",
          "The campaign should feel **real before it feels expensive**.",
          "That authenticity is central to the concept."
        ]
      },
      {
        heading: "18. What Could Go Wrong",
        content: [
          "A strong concept can still fail through execution.",
          "### Risk 1 — Over-dramatization",
          "If every moment is made excessively cinematic, the authenticity disappears.",
          "**Solution:** Keep some scenes raw and documentary-like.",
          "### Risk 2 — The campaign becomes only about Virat",
          "If the audience remembers Virat but not ONE8, the brand loses.",
          "**Solution:** Every chapter should reinforce what ONE8 represents.",
          "### Risk 3 — Weak product connection",
          "The story could become a Virat nostalgia campaign rather than a sportswear campaign.",
          "**Solution:** Connect the narrative to athletic ambition, movement, training, and the next generation of athletes.",
          "### Risk 4 — Manufactured gifting",
          "If the ground interaction looks staged, the emotional payoff weakens.",
          "**Solution:** Keep the interaction natural and community-oriented.",
          "### Risk 5 — Viral but commercially weak",
          "Millions of views don't automatically mean sales.",
          "**Solution:** Connect the campaign to a clear product drop, landing page, limited edition, retail availability, and measurable conversion funnel."
        ]
      },
      {
        heading: "19. Success Metrics",
        content: [
          "The campaign should be measured across multiple levels.",
          "## Awareness",
          "- Reel reach",
          "- Video completion rate",
          "- Organic mentions",
          "- Press coverage",
          "- Search interest",
          "## Engagement",
          "- Shares",
          "- Saves",
          "- Comments",
          "- Follower growth",
          "- Sentiment",
          "## Brand",
          "- Association of ONE8 with sportswear",
          "- Association with Virat's athletic identity",
          "- Brand recall",
          "## Commercial",
          "- Product page visits",
          "- Conversion rate",
          "- Sell-through",
          "- Average order value",
          "- Repeat purchases",
          "## Community",
          "- Participation from young athletes",
          "- User-generated content",
          "- Local engagement",
          "The objective is not simply:",
          "> **Go viral.**",
          "It is:",
          "> **Turn attention into brand equity and brand equity into demand.**"
        ]
      },
      {
        heading: "20. The Core Campaign Statement",
        content: [
          "The entire strategy can ultimately be reduced to one thought:",
          "> **ONE8 — From where the dream began to where the next one begins.**",
          "The first half belongs to Virat.",
          "The second half belongs to everyone who is still dreaming.",
          "And that is what makes the campaign larger than a celebrity endorsement.",
          "## Portfolio Takeaway",
          "This concept demonstrates my approach to brand strategy:",
          "**I look beyond the product and ask what story, cultural moment, and emotional meaning can make a brand worth remembering.**",
          "For ONE8, the opportunity wasn't simply to create a bigger launch.",
          "It was to make the launch feel like it **belonged to Virat's story.**"
        ]
      }
    ]
  },
  {
    id: 'arora-lemon',
    title: 'Arora Lemon',
    subtitle: 'A Brand & Marketing Thesis',
    summary: 'A strategic exploration of how a familiar lemon beverage can become more culturally relevant to a younger generation without losing its everyday accessibility.',
    downloadUrl: '/arora-lemon-thesis.md',
    sections: [
      {
        heading: "ARORA LEMON",
        content: [
          "## A Brand & Marketing Thesis",
          "> A strategic exploration of how a familiar lemon beverage can become more culturally relevant to a younger generation without losing its everyday accessibility."
        ]
      },
      {
        heading: "01 — THE BRAND",
        content: [
          "## Arora Lemon",
          "Arora Lemon is the subject of this marketing thesis.",
          "The project looks beyond simply selling a lemon beverage and asks a broader question:",
          "> **How can an existing, accessible product become more desirable to a younger generation?**",
          "The answer explored through this thesis is not to completely replace the existing brand.",
          "Instead, the strategy is to build a second layer around it."
        ]
      },
      {
        heading: "02 — THE CORE PROBLEM",
        content: [
          "The central challenge identified was:",
          "## How do you make an everyday beverage feel exciting to Gen Z without making the entire brand feel inaccessible?",
          "A complete repositioning toward a premium audience could alienate existing consumers.",
          "At the same time, keeping the brand visually and culturally static makes it harder to create excitement among younger consumers.",
          "This creates a tension:",
          "**Accessibility vs. Aspiration**",
          "**Everyday consumption vs. Collectability**",
          "**Existing identity vs. New-generation relevance**",
          "The strategy was developed around resolving that tension rather than choosing one side."
        ]
      },
      {
        heading: "03 — THE STRATEGIC IDEA",
        content: [
          "## Don't premiumise everything.",
          "Instead:"
        ]
      },
      {
        heading: "Make premiumisation an experience.",
        content: [
          "The everyday Arora product can remain the accessible, familiar product.",
          "The premium and experimental side can appear through:",
          "- Limited seasonal releases",
          "- Festive packaging",
          "- Bold Gen-Z visual design",
          "- Collectible cans",
          "- Short-term campaigns",
          "- Special editions",
          "This allows Arora to experiment with a younger, more premium visual identity without forcing the entire brand to abandon its existing positioning."
        ]
      },
      {
        heading: "04 — WHY THIS APPROACH?",
        content: [
          "A permanent premium repositioning creates unnecessary risk.",
          "The brand doesn't need to become something completely different.",
          "Instead, it can create moments of novelty around the existing product.",
          "The strategic logic is:",
          "**Existing Product**",
          "↓",
          "**Existing Accessibility**",
          "↓",
          "**Seasonal Opportunity**",
          "↓",
          "**Limited Edition**",
          "↓",
          "**Visual Excitement**",
          "↓",
          "**Collectability**",
          "↓",
          "**Social Sharing**",
          "↓",
          "**Brand Relevance**",
          "The limited nature of the product itself becomes part of the marketing."
        ]
      },
      {
        heading: "05 — THE TWO-LAYER BRAND MODEL",
        content: [
          "## LAYER 01",
          "### Everyday Arora",
          "The regular product remains:",
          "- Accessible",
          "- Familiar",
          "- Easy to purchase",
          "- Suitable for everyday consumption",
          "The goal is not to unnecessarily disrupt this side of the brand.",
          "## LAYER 02",
          "### Seasonal Arora",
          "The seasonal layer becomes the experimental playground.",
          "It can introduce:",
          "- Bold packaging",
          "- Limited-edition cans",
          "- Collectible designs",
          "- Festive themes",
          "- More expressive typography",
          "- More experimental visual communication",
          "- Social-first campaigns",
          "The seasonal product becomes something people can discover, photograph, share, and collect."
        ]
      },
      {
        heading: "06 — WHY GEN Z?",
        content: [
          "The strategy is not simply:",
          "> \"Make it look Gen Z.\"",
          "The more important opportunity is creating something that feels worth **sharing and talking about**.",
          "A limited-edition product creates a reason to engage with the brand beyond simply consuming the beverage.",
          "The can itself becomes part of the experience.",
          "Instead of:",
          "**Drink → Finish → Forget**",
          "the desired behaviour becomes:",
          "**Discover → Buy → Experience → Photograph → Share → Collect**"
        ]
      },
      {
        heading: "07 — THE COLLECTIBLE CAN IDEA",
        content: [
          "## The can becomes media.",
          "Rather than treating packaging as only a container, the seasonal can becomes a marketing surface.",
          "Each limited edition can can have its own:",
          "- Visual identity",
          "- Artwork",
          "- Theme",
          "- Typography",
          "- Colour treatment",
          "- Collectible character",
          "The objective is to make the packaging interesting enough that the consumer wants to keep it.",
          "This transforms packaging from a passive product component into an active part of the brand's communication."
        ]
      },
      {
        heading: "08 — FESTIVE STRATEGY",
        content: [
          "The bold packaging direction is specifically intended for **festive / seasonal periods**.",
          "This is important.",
          "The strategy is NOT:",
          "> \"Make all Arora packaging crazy.\"",
          "It is:",
          "> **Use cultural and seasonal moments as permission to experiment.**",
          "Festivals naturally create:",
          "- Higher visual attention",
          "- Gift-giving behaviour",
          "- Special purchases",
          "- Limited-edition opportunities",
          "- Social content opportunities",
          "Arora can use those moments to temporarily enter a more premium and collectible visual world."
        ]
      },
      {
        heading: "09 — REGULAR VS. FESTIVE",
        content: [
          "| | Regular Arora | Seasonal Arora |",
          "|---|---|---|",
          "| Purpose | Everyday consumption | Excitement & discovery |",
          "| Positioning | Accessible | Premium / limited |",
          "| Packaging | Familiar | Bold & collectible |",
          "| Visual language | Consistent | Experimental |",
          "| Availability | Regular | Limited |",
          "| Main objective | Purchase | Purchase + collect + share |",
          "The two layers should feel related, not like two completely different brands."
        ]
      },
      {
        heading: "10 — THE VISUAL DIRECTION",
        content: [
          "The seasonal identity should be:",
          "### Bold",
          "Strong visual presence that can compete on a shelf or social feed.",
          "### Gen-Z oriented",
          "Contemporary rather than traditionally \"premium.\"",
          "### Collectible",
          "The packaging should feel worth keeping.",
          "### Festive",
          "The design should respond to the cultural moment.",
          "### Experimental",
          "The limited edition gives the brand permission to do things the regular product cannot."
        ]
      },
      {
        heading: "11 — PACKAGING AS A MARKETING TOOL",
        content: [
          "The packaging is not treated as an isolated graphic-design exercise.",
          "It serves several marketing purposes simultaneously.",
          "### 01. Differentiation",
          "A limited design can stand apart from the regular product.",
          "### 02. Attention",
          "A visually unusual can has greater potential to interrupt scrolling or shelf browsing.",
          "### 03. Collectability",
          "Multiple designs create a reason to look for another edition.",
          "### 04. Social Content",
          "The packaging itself can become something consumers photograph and share.",
          "### 05. Brand Memory",
          "A distinctive visual treatment can make the seasonal release easier to remember."
        ]
      },
      {
        heading: "12 — THE SOCIAL MEDIA STRATEGY",
        content: [
          "The seasonal campaign should not only announce the product.",
          "The campaign should build anticipation.",
          "A possible communication sequence:",
          "## PHASE 01 — TEASE",
          "Don't reveal everything.",
          "Show:",
          "- Cropped details",
          "- Typography",
          "- Colours",
          "- Partial can artwork",
          "- Close-up textures",
          "Goal:",
          "**Create curiosity.**",
          "## PHASE 02 — REVEAL",
          "Reveal the complete limited-edition can.",
          "Focus on:",
          "- The artwork",
          "- The seasonal concept",
          "- The limited nature of the release",
          "Goal:",
          "**Create desire.**",
          "## PHASE 03 — COLLECTION",
          "Show the different designs together.",
          "If multiple editions exist, present them as a collection rather than unrelated cans.",
          "Goal:",
          "**Create collectability.**",
          "## PHASE 04 — CONSUMER CONTENT",
          "Encourage consumers to photograph and share their cans.",
          "Potential content:",
          "- Shelf shots",
          "- Desk shots",
          "- Festival setups",
          "- Outfit + can combinations",
          "- Collection shots",
          "Goal:",
          "**Turn consumers into part of the campaign.**"
        ]
      },
      {
        heading: "13 — THE PREMIUMISATION LOGIC",
        content: [
          "Premium does not necessarily mean:",
          "- Expensive-looking",
          "- Minimal",
          "- Luxury",
          "- Dark",
          "- Gold",
          "For Arora, the premium opportunity explored here is based on:",
          "**Scarcity + Design + Cultural Relevance + Collectability**",
          "The product feels premium because the experience around it feels special."
        ]
      },
      {
        heading: "14 — WHY LIMITED EDITIONS?",
        content: [
          "Limited editions introduce a natural reason for urgency.",
          "A regular product communicates:",
          "> \"You can buy this whenever you want.\"",
          "A limited edition communicates:",
          "> \"This exists for a particular moment.\"",
          "That difference changes the psychology of the purchase.",
          "The consumer is not simply buying another beverage.",
          "They are buying something associated with a specific moment or season."
        ]
      },
      {
        heading: "15 — THE ROLE OF FESTIVALS",
        content: [
          "Festivals provide the natural framework for these drops.",
          "Rather than creating generic \"festival offers,\" the strategy is to make the **product itself participate in the festival.**",
          "That means:",
          "**Festival**",
          "+",
          "**Limited Packaging**",
          "+",
          "**Collectibility**",
          "+",
          "**Social Campaign**",
          "instead of simply:",
          "**Festival**",
          "+",
          "**Discount**",
          "The objective is to build brand value rather than relying entirely on price."
        ]
      },
      {
        heading: "16 — THE GEN-Z ANGLE",
        content: [
          "The Gen-Z direction should not rely purely on slang, memes, or internet trends.",
          "Instead, the strategy focuses on behaviours:",
          "- Discovery",
          "- Self-expression",
          "- Collecting",
          "- Sharing",
          "- Visual identity",
          "- Limited drops",
          "- FOMO",
          "- Cultural participation",
          "The packaging becomes something that can participate in a person's visual world."
        ]
      },
      {
        heading: "17 — THE CAMPAIGN ECOSYSTEM",
        content: [
          "The seasonal launch can extend across:",
          "### Packaging",
          "Limited-edition cans.",
          "### Instagram",
          "Teasers, reveals, collection posts.",
          "### Reels",
          "Short-form visual campaign content.",
          "### Stories",
          "Countdowns, polls, reveals.",
          "### In-store",
          "Shelf visibility and collection displays.",
          "### Festive displays",
          "Seasonal point-of-sale communication.",
          "### User-generated content",
          "Consumers showing their editions.",
          "The same visual identity should connect all of these touchpoints."
        ]
      },
      {
        heading: "18 — THE MARKETING FUNNEL",
        content: [
          "## AWARENESS",
          "Bold visuals and teasers.",
          "↓",
          "## CURIOSITY",
          "Partial reveals and limited-edition messaging.",
          "↓",
          "## DESIRE",
          "Complete product reveal.",
          "↓",
          "## PURCHASE",
          "Availability during the seasonal window.",
          "↓",
          "## COLLECTION",
          "Multiple designs / editions.",
          "↓",
          "## SHARING",
          "Consumers photograph and post the product.",
          "↓",
          "## REPEAT INTEREST",
          "Future seasonal drops become something consumers look forward to."
        ]
      },
      {
        heading: "19 — THE LONG-TERM OPPORTUNITY",
        content: [
          "The seasonal strategy can become a recurring brand property.",
          "Instead of one isolated limited edition:",
          "### ARORA SEASONAL DROPS",
          "Every major seasonal opportunity can introduce a new visual world.",
          "The audience begins to anticipate:",
          "> \"What will Arora release this time?\"",
          "That turns limited-edition packaging from a one-time campaign into a recurring reason to engage with the brand."
        ]
      },
      {
        heading: "20 — WHAT THIS STRATEGY ACHIEVES",
        content: [
          "The strategy attempts to solve several problems simultaneously.",
          "### For the existing customer",
          "The regular product remains familiar and accessible.",
          "### For younger consumers",
          "The seasonal editions create something visually relevant and culturally interesting.",
          "### For the brand",
          "The brand gets room to experiment without completely changing its core identity.",
          "### For marketing",
          "The product itself becomes campaign content.",
          "### For social media",
          "The limited editions create naturally shareable visual material.",
          "### For future growth",
          "The strategy creates a repeatable framework for future seasonal launches."
        ]
      },
      {
        heading: "21 — THE CENTRAL THESIS",
        content: [
          "The entire project can be reduced to one thought:",
          "> **Arora doesn't need to become a completely different brand to become more exciting.**",
          "It can keep its everyday identity while creating moments where it becomes:",
          "**Bolder.**",
          "**More experimental.**",
          "**More collectible.**",
          "**More culturally relevant.**",
          "The regular product serves the everyday consumer.",
          "The seasonal drop creates the excitement.",
          "Together, they allow the brand to grow without abandoning what already works."
        ]
      },
      {
        heading: "22 — CREATIVE EXECUTION",
        content: [
          "The final campaign presentation should show the strategy becoming tangible.",
          "### Show:",
          "- Regular product positioning",
          "- Seasonal concept",
          "- Limited-edition can designs",
          "- Festive packaging",
          "- Campaign key visual",
          "- Instagram posts",
          "- Instagram stories",
          "- Teaser creatives",
          "- Product reveal",
          "- Collection presentation",
          "- Festive mockups",
          "- Social campaign applications",
          "Every execution should clearly connect back to the strategic idea."
        ]
      },
      {
        heading: "23 — WHAT I LEARNED",
        content: [
          "This project changed the way I think about marketing.",
          "A brand does not always need a complete reinvention.",
          "Sometimes the stronger strategy is to identify what already works, protect it, and create a controlled space where the brand can experiment.",
          "The most interesting part of the Arora thesis is therefore not the can design itself.",
          "It is the system behind it:",
          "**Everyday product → Seasonal moment → Limited edition → Collectability → Social behaviour → Brand relevance**"
        ]
      },
      {
        heading: "FINAL THOUGHT",
        content: [
          "## Don't change the brand.",
          "## Change the moment.",
          "**ARORA LEMON**",
          "*An exploration of everyday accessibility, seasonal premiumisation, and Gen-Z collectability.*"
        ]
      }
    ]
  },
    {
    id: 'us-polo',
    title: 'US Polo',
    subtitle: 'From Apparel Brand to Lifestyle Ecosystem',
    summary: 'A strategic case study exploring whether US Polo should expand beyond apparel into lifestyle categories like watches and sunglasses.',
    downloadUrl: '/us-polo-thesis.md',
    sections: [
      {
        heading: "US POLO — FROM APPAREL BRAND TO LIFESTYLE ECOSYSTEM",
        content: [
          "## Strategic Brand Expansion Case Study",
          "### The Core Question",
          "**Should US Polo expand beyond apparel and footwear into lifestyle categories such as watches and sunglasses, or should it protect and deepen its existing apparel-led positioning?**"
        ]
      },
      {
        heading: "01 — THE CASE",
        content: [
          "US Polo is an established fashion brand with strong recognition in apparel and footwear.",
          "Its existing strength lies in its association with:",
          "* Polo culture",
          "* Classic American-inspired fashion",
          "* Premium-looking everyday apparel",
          "* Aspirational lifestyle",
          "* Accessible premium positioning",
          "However, its category presence remains relatively concentrated.",
          "The strategic opportunity is therefore:",
          "> **Can US Polo evolve from an apparel and footwear brand into a broader lifestyle brand without weakening the brand equity that made it successful?**",
          "One proposed route is to enter adjacent lifestyle categories such as:",
          "* Watches",
          "* Sunglasses",
          "* Accessories",
          "* Other lifestyle products",
          "The ambition would be to create a broader ecosystem similar to how major fashion houses extend their identities across multiple categories.",
          "But expansion creates a critical risk:",
          "> **A brand can grow its category presence while simultaneously weakening its original positioning.**",
          "The question is therefore not simply:",
          "> \"Can US Polo sell watches?\"",
          "It is:",
          "> **\"Has US Polo earned the right to sell watches?\"**"
        ]
      },
      {
        heading: "02 — THE STRATEGIC DILEMMA",
        content: [
          "There are two obvious strategic choices.",
          "## OPTION A — Expand",
          "US Polo enters lifestyle categories such as watches and sunglasses.",
          "### Potential advantages",
          "* New revenue streams",
          "* Larger addressable market",
          "* Greater customer lifetime value",
          "* More consumer touchpoints",
          "* Stronger lifestyle positioning",
          "* Increased brand visibility",
          "### Potential risks",
          "* Brand dilution",
          "* Consumer confusion",
          "* Product-quality expectations",
          "* High marketing costs",
          "* Cannibalization or distraction from core apparel",
          "* Difficulty establishing credibility in specialist categories",
          "## OPTION B — Stay Focused",
          "US Polo continues concentrating primarily on apparel and footwear.",
          "### Potential advantages",
          "* Protect existing brand equity",
          "* Maintain category expertise",
          "* Lower execution risk",
          "* Stronger focus on core business",
          "* Avoid unnecessary brand dilution",
          "### Potential risks",
          "* Limited category expansion",
          "* Lower potential customer lifetime value",
          "* Missed lifestyle opportunities",
          "* Greater dependence on apparel and footwear"
        ]
      },
      {
        heading: "03 — MY STRATEGIC POSITION",
        content: [
          "I would **not immediately transform US Polo into a full lifestyle brand.**",
          "I would follow a:",
          "> **Test → Learn → Scale strategy.**",
          "The objective is to determine whether consumers genuinely want US Polo to enter these categories before committing significant capital and brand equity.",
          "The first step would therefore be extensive consumer and market research."
        ]
      },
      {
        heading: "04 — STEP ONE: UNDERSTAND THE EXISTING BRAND",
        content: [
          "Before launching anything, US Polo should understand its current perception.",
          "The first questions should be:",
          "### How do consumers currently perceive US Polo?",
          "Is it:",
          "* Affordable premium?",
          "* Premium apparel?",
          "* Aspirational fashion?",
          "* Casual American lifestyle?",
          "* Youth fashion?",
          "* Polo-inspired heritage?",
          "And importantly:",
          "> **What does the consumer believe US Polo is qualified to sell?**",
          "A customer may trust US Polo for a ₹2,100 shirt but not automatically trust the same brand for a ₹5,000–₹6,000 watch.",
          "That difference is strategically important."
        ]
      },
      {
        heading: "05 — THE BRAND-EXTENSION PROBLEM",
        content: [
          "A customer does not transfer trust equally across categories.",
          "If I trust a brand for clothing, it does not automatically mean I trust it for:",
          "* Watches",
          "* Sunglasses",
          "* Perfumes",
          "* Cars",
          "* Electronics",
          "Each category has its own expectations.",
          "For watches, consumers may consider:",
          "* Craftsmanship",
          "* Design",
          "* Reliability",
          "* Heritage",
          "* Materials",
          "* Brand prestige",
          "* Perceived value",
          "Therefore, US Polo must establish:",
          "> **Why should consumers believe that US Polo has the authority to make a premium watch?**"
        ]
      },
      {
        heading: "06 — MY INITIAL STRATEGY: LIMITED-EDITION TEST",
        content: [
          "Instead of immediately investing heavily in a complete watch and sunglasses portfolio, I would launch a **controlled pilot**.",
          "### Phase 1",
          "Conduct consumer research.",
          "Understand:",
          "* Current US Polo perception",
          "* Willingness to buy accessories",
          "* Price expectations",
          "* Desired designs",
          "* Existing watch ownership",
          "* Brand associations",
          "* Category credibility",
          "Then introduce a **limited-edition watch and/or sunglasses collection**.",
          "The objective is not immediate mass-market penetration.",
          "The objective is:",
          "> **Market validation.**"
        ]
      },
      {
        heading: "07 — WHY LIMITED EDITIONS?",
        content: [
          "A limited launch reduces the risk of a large-scale failure.",
          "It allows US Polo to test:",
          "* Demand",
          "* Pricing",
          "* Design acceptance",
          "* Brand credibility",
          "* Customer response",
          "* Purchase intent",
          "* Repeat interest",
          "without committing the entire brand to the category.",
          "This is essentially a controlled experiment."
        ]
      },
      {
        heading: "08 — THE KEY METRICS",
        content: [
          "The pilot should not be judged simply by:",
          "> \"Did people buy it?\"",
          "We need multiple indicators.",
          "## Consumer Metrics",
          "* Purchase intent",
          "* Actual conversion",
          "* Product ratings",
          "* Customer feedback",
          "* Brand-category association",
          "* Willingness to recommend",
          "## Commercial Metrics",
          "* Sell-through rate",
          "* Gross margin",
          "* Customer acquisition cost",
          "* Average order value",
          "* Return rate",
          "* Repeat purchase",
          "## Brand Metrics",
          "Most importantly:",
          "> **Does the product strengthen or weaken US Polo's premium perception?**"
        ]
      },
      {
        heading: "09 — THE PRICE-POSITIONING QUESTION",
        content: [
          "One of the most important questions is:",
          "> If a consumer comfortably purchases a ₹2,100 US Polo shirt, will they perceive a ₹5,000–₹6,000 US Polo watch as credible?",
          "This is not simply a pricing problem.",
          "It is a:",
          "> **brand architecture problem.**",
          "If the consumer thinks:",
          "> \"US Polo makes affordable premium clothes.\"",
          "they may not automatically think:",
          "> \"US Polo makes premium watches.\"",
          "The brand therefore needs to build a bridge between its existing perception and the new category."
        ]
      },
      {
        heading: "10 — PRODUCT DIRECTION",
        content: [
          "US Polo should not enter watches with a product that feels disconnected from its existing identity.",
          "For example, an extremely technical or aggressive watch design could conflict with the brand's existing aesthetic.",
          "Instead, the initial collection should emphasize:",
          "* Classic design",
          "* Minimalism",
          "* Premium finishing",
          "* Heritage",
          "* Polo-inspired lifestyle",
          "* Versatility",
          "* Understated luxury",
          "The watch should feel like:",
          "> **US Polo translated into a watch.**",
          "Not:",
          "> **A random watch carrying the US Polo logo.**"
        ]
      },
      {
        heading: "11 — THE BRAND STORY",
        content: [
          "US Polo already has a strong lifestyle territory around:",
          "* Polo culture",
          "* Classic fashion",
          "* Heritage",
          "* Aspirational living",
          "* American-inspired aesthetics",
          "The lifestyle expansion should deepen this world.",
          "The consumer should be able to imagine:",
          "> US Polo shirt",
          ">",
          "> * US Polo watch",
          "> * US Polo sunglasses",
          "> * US Polo accessories",
          "as part of the same lifestyle.",
          "This creates an ecosystem effect."
        ]
      },
      {
        heading: "12 — THE \"US POLO LIFESTYLE\" IDEA",
        content: [
          "The long-term opportunity is to make US Polo more than something a consumer wears.",
          "It becomes something that participates in the consumer's lifestyle.",
          "For example:",
          "### Apparel",
          "What I wear.",
          "### Watch",
          "What I carry on my wrist.",
          "### Sunglasses",
          "How I complete my look.",
          "### Accessories",
          "How I express the lifestyle.",
          "The objective is:",
          "> **One brand, multiple lifestyle touchpoints.**"
        ]
      },
      {
        heading: "13 — BUT THERE IS A LIMIT",
        content: [
          "The biggest danger is trying to become a lifestyle brand too quickly.",
          "If US Polo launches:",
          "* Watches",
          "* Sunglasses",
          "* Perfumes",
          "* Bags",
          "* Home products",
          "* Accessories",
          "all at once, the brand could become less distinctive.",
          "The consumer might begin asking:",
          "> \"What exactly does US Polo stand for?\"",
          "Therefore:",
          "> **Expansion should follow brand permission, not merely market opportunity.**"
        ]
      },
      {
        heading: "14 — THE LONG-TERM BRAND ARCHITECTURE",
        content: [
          "If the lifestyle pilot performs strongly, the next strategic question emerges:",
          "### Should everything continue under the US Polo master brand?",
          "My answer:",
          "> **Not necessarily.**",
          "If lifestyle products eventually become significantly more premium than the core apparel business, US Polo could consider creating a more elevated sub-brand."
        ]
      },
      {
        heading: "15 — THE SUB-LUXURY POSSIBILITY",
        content: [
          "The idea is similar to how large automotive groups create different brands for different levels of positioning.",
          "For example:",
          "**Toyota → Lexus**",
          "The purpose is not simply changing the logo.",
          "It creates a separate psychological space.",
          "US Polo could eventually create a more elevated lifestyle label if the market demonstrates sufficient demand.",
          "This could allow:",
          "### US Polo",
          "Accessible premium apparel and lifestyle.",
          "### Elevated sub-brand",
          "More luxurious watches, accessories, and selected lifestyle products.",
          "The customer can therefore evolve without necessarily leaving the broader brand ecosystem."
        ]
      },
      {
        heading: "16 — WHY THIS MATTERS",
        content: [
          "Imagine a customer who begins with:",
          "> US Polo polo shirt",
          "Then progresses toward:",
          "> US Polo premium apparel",
          "Then:",
          "> US Polo accessories",
          "Then:",
          "> Elevated US Polo lifestyle products",
          "The objective is to increase:",
          "> **Customer lifetime value.**",
          "Instead of losing a customer as their purchasing power and aspirations increase, the brand creates a pathway for them to remain within its ecosystem."
        ]
      },
      {
        heading: "17 — MARKETING STRATEGY",
        content: [
          "The launch should not simply advertise:",
          "> \"US Polo now sells watches.\"",
          "Instead, the communication should sell the lifestyle.",
          "The campaign should communicate:",
          "> **The US Polo lifestyle is expanding.**",
          "Visual language could focus on:",
          "* Classic styling",
          "* Polo culture",
          "* Heritage",
          "* Minimalism",
          "* Premium environments",
          "* Timeless fashion",
          "* Everyday luxury",
          "The watch or sunglasses become part of the lifestyle rather than the entire story."
        ]
      },
      {
        heading: "18 — COLLABORATION STRATEGY",
        content: [
          "For the early stage, partnerships can reduce risk.",
          "US Polo could explore collaborations with:",
          "* Established watch manufacturers",
          "* Design partners",
          "* Premium accessory specialists",
          "* Lifestyle brands",
          "* Sports organizations",
          "* Cultural platforms",
          "The advantage is that US Polo does not necessarily need to build every capability internally from zero.",
          "A capable manufacturing or category partner can provide:",
          "* Existing expertise",
          "* Product development",
          "* Supply chain",
          "* Category knowledge",
          "while US Polo contributes:",
          "* Brand equity",
          "* Distribution",
          "* Marketing",
          "* Customer base",
          "This can reduce initial capital exposure."
        ]
      },
      {
        heading: "19 — FINANCIAL THINKING",
        content: [
          "The expansion should not be approved simply because the category appears attractive.",
          "The pilot must have a clear financial model.",
          "Important variables include:",
          "* Manufacturing cost",
          "* Marketing expenditure",
          "* Distribution cost",
          "* Retail margins",
          "* Gross margin",
          "* Inventory risk",
          "* Return rates",
          "* Customer acquisition cost",
          "* Break-even volume",
          "A high-margin product is particularly useful during the launch phase because it provides greater room to absorb:",
          "* Marketing expenditure",
          "* Sampling",
          "* Influencer activity",
          "* Retail activation",
          "* Launch campaigns",
          "But margin should never come at the cost of product quality."
        ]
      },
      {
        heading: "20 — THE TEST-AND-SCALE FRAMEWORK",
        content: [
          "The overall strategy becomes:",
          "### STEP 1 — Research",
          "Understand current brand perception.",
          "↓",
          "### STEP 2 — Identify consumer permission",
          "Determine whether consumers are willing to accept US Polo in watches/sunglasses.",
          "↓",
          "### STEP 3 — Limited launch",
          "Introduce a controlled collection.",
          "↓",
          "### STEP 4 — Measure",
          "Track sales, margins, perception, and customer response.",
          "↓",
          "### STEP 5 — Improve",
          "Modify product, pricing, design, and communication.",
          "↓",
          "### STEP 6 — Scale",
          "Expand only if the evidence supports it.",
          "↓",
          "### STEP 7 — Consider brand architecture",
          "If the category becomes significantly more premium, consider an elevated sub-brand."
        ]
      },
      {
        heading: "21 — THE DECISION TREE",
        content: [
          "### If the pilot fails:",
          "Do not force expansion.",
          "Return focus to:",
          "* Apparel",
          "* Footwear",
          "* Existing brand strengths",
          "The failure itself becomes useful market intelligence.",
          "### If the pilot performs moderately:",
          "Continue with:",
          "* Limited collections",
          "* Seasonal releases",
          "* Selected collaborations",
          "Keep the category controlled.",
          "### If the pilot performs exceptionally:",
          "Increase investment.",
          "Expand:",
          "* Product range",
          "* Distribution",
          "* Marketing",
          "* Partnerships",
          "* Lifestyle ecosystem",
          "Then evaluate whether a separate premium architecture is justified."
        ]
      },
      {
        heading: "22 — THE CORE STRATEGIC PRINCIPLE",
        content: [
          "The goal is **not**:",
          "> \"Make US Polo sell everything.\"",
          "The goal is:",
          "> **\"Make US Polo earn the right to enter new categories.\"**",
          "That distinction protects the existing brand while still allowing growth."
        ]
      },
      {
        heading: "23 — FINAL RECOMMENDATION",
        content: [
          "As a senior manager, I would **not choose between immediate expansion and complete stagnation.**",
          "I would choose a third option:",
          "> **Controlled expansion backed by consumer evidence.**",
          "US Polo should first understand:",
          "1. What consumers currently believe about the brand.",
          "2. What categories consumers are willing to associate with it.",
          "3. What price points feel credible.",
          "4. Whether the new category strengthens or weakens premium perception.",
          "5. Whether the economics justify scaling.",
          "Then launch a limited-edition collection.",
          "If the market validates the idea, scale gradually.",
          "If the brand eventually develops enough demand for genuinely premium lifestyle products, consider an elevated sub-brand rather than stretching the core US Polo identity beyond its credibility."
        ]
      },
      {
        heading: "24 — THE ONE-LINE STRATEGY",
        content: [
          "> **Don't make US Polo a lifestyle brand because it can enter more categories; make it a lifestyle brand only when consumers give it permission to.**",
          "## Portfolio Takeaway",
          "This case study demonstrates a **test-before-scale approach to brand expansion**.",
          "The strategic focus is not simply growth.",
          "It is balancing:",
          "**Brand equity + consumer psychology + financial risk + category expansion + long-term brand architecture.**",
          "The core belief is:",
          "> **Growth should expand a brand's meaning, not dilute it.**"
        ]
      }
    ]
  }
];

// --- Subcomponents ---

function ThesisReader({ thesis, onClose }: { thesis: ThesisData, onClose: () => void }) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Reader Navbar */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '1.5rem 2rem',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif', fontWeight: 600, color: 'var(--fg)' }}>
            {thesis.title}
          </div>
          <span className="mono-label" style={{ color: 'var(--dim)', opacity: 0.5 }}>/</span>
          <div className="mono-label" style={{ color: 'var(--dim)' }}>
            {thesis.subtitle}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          [ CLOSE ]
        </button>
      </div>

      {/* Reader Body */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '4rem 2rem 8rem',
        }}
      >
        <article style={{ maxWidth: '680px', margin: '0 auto' }}>
          
            <header style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="mono-label" style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--fg)', color: 'var(--bg)', borderRadius: '999px' }}>
                  THESIS
                </span>
                <span className="mono-label" style={{ color: 'var(--dim)' }}>
                  {thesis.readTime || calculateReadTime(thesis)}
                </span>
              </div>
              {thesis.downloadUrl && (
                <a 
                  href={thesis.downloadUrl}
                  download
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--fg)',
                    border: '1px solid var(--border)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--fg) 5%, transparent)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  DOWNLOAD FULL (.MD)
                </a>
              )}
            </div>
            
            <h1 style={{ 
              fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--fg)',
              marginBottom: '1rem'
            }}>
              {thesis.title}
            </h1>
            
            <h2 style={{ 
              fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 500,
              color: 'var(--dim)',
              marginBottom: '2rem'
            }}>
              {thesis.subtitle}
            </h2>

            <blockquote style={{ 
              padding: '2rem', 
              backgroundColor: 'color-mix(in srgb, var(--fg) 2%, transparent)', 
              borderLeft: '4px solid var(--accent, var(--fg))',
              borderRadius: '0 12px 12px 0'
            }}>
              <p style={{ 
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                fontStyle: 'italic',
                color: 'var(--fg)',
                margin: 0
              }}>
                &ldquo;Undersell the claim. Oversell the thinking.&rdquo;
              </p>
            </blockquote>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {thesis.sections.map((sec, idx) => (
              <section key={idx}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                  <span className="mono-label" style={{ color: 'var(--dim)', opacity: 0.5 }}>
                    0{idx + 1}
                  </span>
                  <h3 style={{ 
                    fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    margin: 0
                  }}>
                    {sec.heading}
                  </h3>
                </div>
                <div style={{ paddingLeft: '2.5rem' }}>
                  {sec.content.map((para, pIdx) => {
                    // Simple inline markdown parsing
                    let html = para
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>');

                    const isH4 = html.startsWith('#### ');
                    const isSubHeading = html.startsWith('### ');
                    const isHeading = html.startsWith('## ');
                    const isQuote = html.startsWith('> ');
                    const isListItem = html.startsWith('- ') || html.startsWith('* ');
                    const isInstruction = html.startsWith('[');

                    if (isH4) {
                      return (
                        <h6 key={pIdx} style={{ 
                          fontSize: '1rem', 
                          fontWeight: 600, 
                          color: 'var(--dim)', 
                          marginTop: '1.25rem', 
                          marginBottom: '0.25rem',
                          fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif'
                        }} dangerouslySetInnerHTML={{ __html: html.replace('#### ', '') }} />
                      );
                    }

                    if (isSubHeading) {
                      return (
                        <h5 key={pIdx} style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          color: 'var(--fg)', 
                          marginTop: '1.5rem', 
                          marginBottom: '0.25rem',
                          fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase'
                        }} dangerouslySetInnerHTML={{ __html: html.replace('### ', '') }} />
                      );
                    }

                    if (isHeading) {
                      return (
                        <h4 key={pIdx} style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: 700, 
                          color: 'var(--fg)', 
                          marginTop: '2rem', 
                          marginBottom: '0.5rem',
                          fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif'
                        }} dangerouslySetInnerHTML={{ __html: html.replace('## ', '') }} />
                      );
                    }

                    if (isQuote) {
                      return (
                        <blockquote key={pIdx} style={{ 
                          borderLeft: '4px solid var(--dim)', 
                          paddingLeft: '1.5rem', 
                          fontStyle: 'italic', 
                          color: 'color-mix(in srgb, var(--fg) 70%, transparent)', 
                          margin: '2rem 0',
                          fontSize: '1.25rem',
                          lineHeight: 1.6,
                          fontFamily: 'var(--font-serif, serif)'
                        }}>
                          <span dangerouslySetInnerHTML={{ __html: html.replace('> ', '') }} />
                        </blockquote>
                      );
                    }

                    if (isListItem) {
                      return (
                        <li key={pIdx} style={{ 
                          fontSize: '1.1rem', 
                          lineHeight: 1.7, 
                          color: 'color-mix(in srgb, var(--fg) 85%, transparent)',
                          marginLeft: '1.5rem',
                          marginBottom: '0.5rem'
                        }} dangerouslySetInnerHTML={{ __html: html.replace(/^[-*]\s/, '') }} />
                      );
                    }

                    return (
                      <p key={pIdx} style={{ 
                        fontSize: isInstruction ? '0.85rem' : '1.1rem', 
                        lineHeight: 1.7, 
                        color: 'color-mix(in srgb, var(--fg) 85%, transparent)',
                        marginBottom: pIdx === sec.content.length - 1 ? 0 : '1.5rem',
                        fontFamily: isInstruction ? 'var(--font-mono)' : 'inherit',
                        opacity: isInstruction ? 0.6 : 1
                      }} dangerouslySetInnerHTML={{ __html: html }} />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

        </article>
      </div>
    </motion.div>
  );
}

// --- Main Component ---

export default function MarketingClient() {
  const [activeThesis, setActiveThesis] = useState<ThesisData | null>(null);

  return (
    <div style={{ maxWidth: '1536px', margin: '0 auto', padding: '0 2rem 8rem' }}>
      
      {/* The Thesis Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '2rem' 
        }}
      >
        {theses.map((thesis) => (
          <motion.div
            key={thesis.id}
            whileHover={{ y: -8 }}
            onClick={() => setActiveThesis(thesis)}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--fg) 2%, transparent)',
              backdropFilter: 'blur(20px)',
              border: '1px solid color-mix(in srgb, var(--fg) 8%, transparent)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05), inset 0 1px 0 color-mix(in srgb, var(--fg) 15%, transparent)',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '380px'
            }}
          >
            {/* Top metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span className="mono-label" style={{ color: 'var(--dim)', border: '1px solid var(--border)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                {thesis.readTime || calculateReadTime(thesis)}
              </span>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent, var(--fg))' }} />
            </div>

            {/* Title / Subtitle */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ 
                fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--fg)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '0.5rem'
              }}>
                {thesis.title}
              </h2>
              <h3 style={{ 
                fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'var(--dim)',
              }}>
                {thesis.subtitle}
              </h3>
            </div>

            {/* Summary */}
            <p style={{ 
              marginTop: '1.5rem', 
              fontSize: '1rem', 
              lineHeight: 1.5, 
              color: 'var(--dim)',
              position: 'relative',
              zIndex: 10,
              flex: 1
            }}>
              {thesis.summary}
            </p>

            {/* Bottom Button */}
            <div style={{ marginTop: '2rem', position: 'relative', zIndex: 10 }}>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.85rem', 
                color: 'var(--bg)', 
                backgroundColor: 'var(--fg)', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px',
                display: 'inline-block',
                fontWeight: 600
              }}>
                READ THESIS
              </div>
            </div>

            {/* Subtle background gradient pattern */}
            <div 
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '150%',
                height: '150%',
                background: 'radial-gradient(circle, color-mix(in srgb, var(--fg) 5%, transparent) 0%, transparent 70%)',
                pointerEvents: 'none',
                opacity: 0.5
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* The Reader Modal */}
      <AnimatePresence>
        {activeThesis && (
          <ThesisReader thesis={activeThesis} onClose={() => setActiveThesis(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
