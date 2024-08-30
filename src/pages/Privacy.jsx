function Privacy() {
  return (
    <div className="info-page">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important. This privacy policy explains what data we
        collect, how we use it, and your options when using this app.
      </p>
      <h3>1. Data We Collect or Store</h3>
      <ul>
        <li>
          We do <strong>not</strong> store any personal information or user
          data.
        </li>
        <li>
          We only monitor the <strong>timestamp</strong> and{" "}
          <strong>cost</strong> when questions are asked, anonymously, to help
          us understand app usage.
        </li>
        <li>Anonymous usage data is stored in your local browser</li>
      </ul>
      <h3>2. Data Sent to OpenAI</h3>
      <ul>
        <li>
          When you use this app, any information you submit is sent to OpenAI to
          generate answers.
        </li>
        <li>
          By using the app,{" "}
          <strong>you agree to share your data with OpenAI.</strong>
        </li>
        <li>
          {" "}
          To learn more about how OpenAI handles your data, please refer to the{" "}
          <a
            href="https://openai.com/policies/privacy-policy/"
            target="_blank"
            rel="noopener noreffer"
          >
            OpenAI Privacy Policy
          </a>
          .
        </li>
        <li>
          For this reason, <strong>do not submit any sensitive data</strong>{" "}
          such as proprietary code or private information
        </li>
        <li>
          For more control over your data, you can download and run the app
          locally with your own OpenAI API Key or use a different language model
          (
          <a
            href="https://github.com/clairefro/sos-client?tab=readme-ov-file#devlopment-and-running-locally"
            target="_blank"
            rel="noopener noreffer"
          >
            instructions
          </a>
          )
        </li>
      </ul>
      <h3>3. What We Do Not Collect or Store</h3>
      <ul>
        <li>
          We do <strong>not</strong> save or log your questions or responses.
        </li>
      </ul>
      <h3>4. Changes to This Policy</h3>
      <ul>
        <li>
          We may update this privacy policy from time to time, but will never
          expose your questions or answers to any party but OpenAI.{" "}
        </li>
      </ul>
      <h3>Questions?</h3>
      <p>
        If you have any questions about this policy, DM{" "}
        <a
          href="https://x.com/clairefroe"
          target="_blank"
          rel="noopener noreferrer"
        >
          @clairefroe
        </a>{" "}
        on X
      </p>
    </div>
  );
}

export default Privacy;
