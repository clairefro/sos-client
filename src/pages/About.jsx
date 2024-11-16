import { mdParser } from "../util/md/mdParser";
import Contributors from "../components/info/Contributors";

const md = `**Stack Overflow Simulator is a free, functional, open cloud museum that attempts to simulate the experience of asking for coding help on Stack Overlflow using AI.**

Whether you're a newer developer who grew up in the AI age and wants to taste the lore of their forecoders, or a seasoned developer nostalgic for that unique flavor of (sometimes condescending) help, you're in the right spot.

[View on Github](https://github.com/clairefro/sos-client)

## An homage to Stack Overflow
Once upon a time, when programmers got stuck they relied on epiphanies in the shower and help from other humans. 

The real [Stack Overflow](https://stackoverflow.com), created in 2008 by Jeff Atwood and Joel Spolsky, is one of the world's largest communities for coders seeking help, with over 24 million questions and 34 million answers shared by users.

Like any community, Stack Overflow has a culture. There's an art to asking questions that solve niche problems while still being helpful to other developers facing similar issues. 

Some user answers are incredibly detailed and generous, showcasing both human kindness and the effectiveness of the platform's gamification system. 

At the same time the platform also has an endearing reputation for nerdy snobbery. It's a rite of passage to be told to "just RTFM" (Read the F****ing Manual), or be rebuked for expressing a little gratitude that adds no value to an answer. 

Nowadays that's an experience developers are having less and less, as they can get instant coding help from AI copilots in code editors, chat tools like ChatGPT, even offline solutions like [Ollama](https://ollama.com/), without having to wait for a human or being told to RTFM.

In fact, [some analysis](https://observablehq.com/@ayhanfuat/the-fall-of-stack-overflow) suggests that in the year or so since the widespread adoption of AI circa 2023, Stack Overflow traffic is down 35% and posting activity is down 50%. Will the art of ancient times be lost soon?


## It's also deliberate satire


There's irony in simulating Stack Overflow with OpenAI, since OpenAI’s models may have been trained on Stack Overflow data, raising concerns about copyright and attribution. 

Stack Overflow’s content is licensed under Creative Commons, which requires proper credit, but LLMs blend data from countless sources making attribution nearly impossible. 

It's also funny because Stack Overflow explicitly bans AI-generated content to protect answer quality, and sidestep the attribution issue above.

Maybe realizing they are better together, Stack Overflow and OpenAI [reached a deal](https://openai.com/index/api-partnership-with-stack-overflow/) in May 2024. The deal allows OpenAI to legally use Stack Overflow's data, while giving Stack Overflow access to OpenAI’s models for their Overflow AI product. Some developers reacted by sabotaging their old answers, frustrated by changing data policies. In reality their removed data may have already been used for training, and Stack Overflow had been profiting from it long before OpenAI did. 

This Reddit [thread](https://www.reddit.com/r/MachineLearning/comments/1cm64jk/d_stack_overflow_partnership_with_open_ai/) presents some interesting thoughts that highlight the inter-dependence of AI and quality human contributions: 

![image](https://github.com/user-attachments/assets/6652ce9c-a628-4185-98c3-4c53399dae97)

Data partnerships like the one between Stack Overflow and OpenAI are becoming more common and necessary to keep with the times. Questions about fair use are valid and expected as we explore new territory in our evolved relationship with data. 

In the midst of this, I thought it would be funny to use OpenAI to simulate Stack Overflow, not only since they symbolic big players in data farming for AI, but also because developers are currently wondering how much of a role humans will have in coding in the future, if any, let alone need to ask questions about it.


## What AI can't ever replace 

AI's ability to provide instant answers to novel questions is a monument of human collaboration. LLMs rely on _human_ content, refined by _human_ feedback, and built with _human_-made software and hardware. 

Funnily enough, this technology's convenience can make us less connected with new humans. 

As convenient as automated AI solutions are, they do not invite the same appreciation for the humans who put in the time-effort to understand, tinker with, and explain solutions to your problem for free. I hope Stack Overflow Simulator will make users keenly aware of this irreplaceable human element.

Plus there is something sweet about looking back on your naive questions on Stack Overflow from a decade ago. It lets you not only see your personal growth, but also how your "stupid question" may have helped thousands of other developers.


![Screenshot of Stack Overflow user dashboard](https://github.com/user-attachments/assets/2a73185f-07a4-4308-b418-66c141c37dd4)

_A real Stack Overflow user dashboard - in itself a museum_

## So you want to sue me
This site is a love letter to StackOverflow. I've tried to make it clear this site is a appreciative parody and, with the help of my lawyer ChatGPT, made every effort to comply with Stack Overflow's terms and conditions.

Contrary to damaging the brand, StackOverflow gets free advertising and direct links to their platform from this site to encourage discovery and use. 

That said, if you work at Stack Overflow and suffer from an allergy to fun, I'll sign a cease and desist agreement for [800 potatoes](https://buymeacoffee.com/clairefro) 

## How is this free? 
This was made as a joke but I accidentally found it useful and funny, so I wanted to share it.

It costs me about $10/month to run this site. Your generous [donations of potatoes](https://buymeacoffee.com/clairefro) help keep it running.

You can always [run your own local version of the app](https://github.com/clairefro/sos-client?tab=readme-ov-file#devlopment-and-running-locally) with your own OpenAI API key.

## Contribute
Something missing or misrepresented? Community contributions to improve the simulation by adjusting the [system prompt](https://github.com/clairefro/sos-api/blob/main/src/lib/prompts/generateThread.ts) are welcome!

## Attributions
Red stamp effect in logo generated with [Textstudio Font generator](https://www.textstudio.com/)
`;

function About() {
  return (
    <div>
      <div
        className="md-body"
        dangerouslySetInnerHTML={{ __html: mdParser.render(md) }}
      ></div>

      <h2>Contributors</h2>
      <Contributors />
      <br />
      <p>
        Created by{" "}
        <a
          target="_blank"
          href="https://x.com/clairefroe"
          rel="noopener noreffer"
        >
          Claire Froelich
        </a>{" "}
        2024
      </p>
    </div>
  );
}

export default About;
