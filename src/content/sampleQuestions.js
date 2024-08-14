const sampleQuestions = [
  `How do I center my div? 

\`\`\`html
<html>
  <body>
    <div id="myDiv">Help!</div>
  </body>
</html>
\`\`\`
`,
  `
I have a simple anchor tag component that extends the native \`<a>\` tag.

I've defined my typescript interface to extend \`React.HTMLAttributes<HTMLAnchorElement>\`, but when I attempt to use component \`A\` and pass props like \`rel\` and \`target\` I get IntrinsicAttributes errors. 

How can I extend the anchor tag properly?

Component definition:
\`\`\`tsx
interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
}

export const A: FC<Props> = ({ href, className, children, ...rest }) => {
  const baseClasses = "text-mb-green-200";
  const classes = \`\${baseClasses} \${className ? className : ""}\`;

  return (
    <a {...rest} href={href} className={classes}>
      {children}
    </a>
  );
};
\`\`\`

Attempted use: 
\`\`\`tsx
<A {...rest} href={href} className={classes} rel={rel} target={target}>
   {children}
</A>
\`\`\`

TS Error: 
\`\`\`
Type '{ children: ReactNode; href: string; className: string; target: string; }' is not assignable to type 'IntrinsicAttributes & Props & { children?: ReactNode; }'.
  Property 'rel' does not exist on type 'IntrinsicAttributes & Props & { children?: ReactNode; }'.ts(2322)
\`\`\`
`,
  `what unix command can I use to see currently available RAM?`,
  `
  how can I do this in Python?

\`\`\`js
function pluck(arr) {
    if (!arr || !arr.length) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
\`\`\`
  `,
];

export { sampleQuestions };
