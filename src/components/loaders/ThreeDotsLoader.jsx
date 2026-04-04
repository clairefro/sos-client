import { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

const LOADING_PHRASES = [
  "Summoning nerds...",
  "Rage baiting...",
  "Luring keyboard warriors...",
  "Waking up the basement dwellers...",
  "Attracting pedants...",
  "Consulting the rubber duck...",
  "Asking someone who has rep to lose...",
  "Bribing a 10x developer...",
  "Poking the hive mind...",
  "Dispatching the RTFM brigade...",
  "Activating nerd mode...",
  "Alerting the Stack Overflow police...",
  "Warming up the downvote fingers...",
  "Enticing a senior engineer to procrastinate...",
  "Channeling the ghosts of forecoders past...",
];

function useRotatingPhrase(intervalMs = 5000) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * LOADING_PHRASES.length)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % LOADING_PHRASES.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return LOADING_PHRASES[index];
}

const ThreeDotsLoader = (props) => {
  const phrase = useRotatingPhrase();

  return (
    <div style={{ textAlign: "center" }}>
      <ContentLoader
        viewBox="0 0 400 160"
        height="5rem"
        width="100%"
        backgroundColor="transparent"
        title={phrase}
        {...props}
      >
        <circle cx="150" cy="86" r="8" />
        <circle cx="194" cy="86" r="8" />
        <circle cx="238" cy="86" r="8" />
      </ContentLoader>
      <p
        style={{
          margin: "0.25rem 0 0",
          fontSize: "0.85rem",
          color: "var(--color-black-300)",
          fontStyle: "italic",
          animation: "three-dots-loader-pulse 1.5s ease-in-out infinite",
        }}
      >
        {phrase}
      </p>
      <style>{`
        @keyframes three-dots-loader-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default ThreeDotsLoader;
