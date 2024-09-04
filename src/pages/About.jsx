import { mdParser } from "../util/md/mdParser";
import Contributors from "../components/info/Contributors";

const md = `## An homage to Stack Overflow
Once upon a time, when programmers got stuck they relied on epiphanies in the shower and help from other humans. 

The real [Stack Overflow](https://stackoverflow.com), created in 2008 by Jeff Atwood and Joel Spolsky, is one of the world's largest communities for coders seeking help, with over 24 million questions and 34 million answers shared by users.

Stack Overflow, like any community, has a culture. There's an art to asking questions that solve niche problems while still being helpful to other developers, who stumble upon the answers when they hit their own roadblocks. 

Some user answers are incredibly detailed and generous, showcasing both human kindness and how well the ingenuity of the platform's gamification system. 

At the same time the site also has an endearing reputation for nerdy snobbery. It's a rite of passage to be told to "just RTFM (Read the F****ing Manual)", or be rebuked for expressing a little gratitude that adds no value to an answer. 

Nowadays that's an experience less and less developers are having, as they can get instant coding help from AI copilots in code editors, chat tools like ChatGPT, and offline solutions like Ollama, without having to wait for a human or being told to RTFM.

In fact, [some analysis](https://observablehq.com/@ayhanfuat/the-fall-of-stack-overflow) suggests that in the year or so since the widespread adoption of AI near 2023, Stack Overflow traffic is down 35% and post activity is down 50%. 

In homage to a relic staple of internet dev culture, this site is a free, functional, "open cloud museum" that attempts to simulate the old experience of using [Stack Overlflow](https://stackoverflow.com/), whether you're a newer dev who wants a taste of their elders' tales, a veteran dev nostalgic for that special flavor of help. 

## It's also a social commentary on AI

WIP


This site is also an art project pointing out the irony of AI and raising questions about the meaning of copyright and creation. 

SO profitted off free user contibutions 

So this site is a parody of both 

irony is you are still being indirectly helped by humans. 

Overflow AI

For as long as humans are in the picture, LLMs will still rely on human curated content. 

I thought it would be ironic 

## What's missing from AI 

AI's ability to provide instant answers to novel questions is a testament to human collaboration. LLMs rely on _human_ content, refined by _human_ feedback, and built with _human-made_ software and hardware. The ironic side effect of this technology is that it can distance us from seeking new connections with other humans.

While automated AI solutions may be convenient, they are void of the chance to appreciate the humans who take the time and effort to understand, tinker with, and explain a solution to your problem - for free.

Plus there is something sweet about looking back on your naive questions from a decade ago. It lets you not only see your personal growth, but also how your "stupid question" may have helped thousands of other developers.

![Screenshot of Stack Overflow user dashboard](https://github.com/user-attachments/assets/2a73185f-07a4-4308-b418-66c141c37dd4)

_A real Stack Overflow user dashboard - in itself a museum_

## So you want to sue me
I've tried to make it explicitly clear this site is a parody, and an honorific one at that. I'm no lawyer, but I did ChatGPT Stack Overflow's terms and conditions to give an earnest shot at complience.

So come on! Contrary to damaging your brand, I'm singing your praises, giving you free advertising and linking to directly to your site. 

That said, if you work at Stack Overflow and suffer from a stick up your butt, I'll sign a cease and desist agreement for [800 potatoes](https://buymeacoffee.com/clairefro) 

## How is this free? 
I made it as a joke but accidentally found it useful and funny, so I felt like sharing.

It costs me about $10/month to run publicly. Your generous [donations of potatoes](https://buymeacoffee.com/clairefro) help keep it running.

You can always [run your own local version of the app](https://github.com/clairefro/sos-client?tab=readme-ov-file#devlopment-and-running-locally)

## Contribute
Something missing or misrepresented? Improve the simulation by making a pull request to the [system prompt](https://github.com/clairefro/sos-api/blob/main/src/lib/prompts/generateThread.ts).

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
          href="https://x.com/clairefroe)"
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
