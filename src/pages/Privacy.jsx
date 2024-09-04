import { mdParser } from "../util/md/mdParser";

const md = `
# Privacy Policy

Your privacy is important. This privacy policy explains what data we collect, how we use it, and your options when using this app.

### 1. Data we collect or store
- We do **not** store any personal information or user data.
- We only monitor the **timestamp** and **cost** when questions are asked, anonymously, to help us understand app usage.
- Anonymous aggregate usage data is stored in your local browser to display your own usage to you.

### 2. What we do not collect or store
-  We do **not** save or log your questions or responses.

### 3. Data sent to OpenAI
- When you use this app, **any question or reply you submit is sent to OpenAI to generate answers**.
- By using this app, you agree to share your inputs and generated answers with OpenAI.
- Therefore, **be mindful about submitting sensitive data**, such as proprietary code or private information.
- To learn more about how OpenAI handles your data, please refer to the [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy/)

### 4. Running the app locally 
- For more control over your data, you can **run the app locally** with your own OpenAI API Key and language model of choice ([how to run app locally](https://github.com/clairefro/sos-client?tab=readme-ov-file#devlopment-and-running-locally)).

### 5. Changes to This Policy
- We may update this privacy policy from time to time, but **will never expose your questions or answers to any party but OpenAI**

### Questions?
Message [@clairefroe on X](https://x.com/clairefroe) if you have any questions about this policy.
`;

function Privacy() {
  return (
    <div className="info-page">
      <div
        className="md-body"
        dangerouslySetInnerHTML={{ __html: mdParser.render(md) }}
      ></div>
    </div>
  );
}

export default Privacy;
