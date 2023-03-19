import { useState } from "react";
import Head from "next/head";
import Typewriter from "typewriter-effect";

const Home = () => {
  // Perosonalized Data for better results

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  // Base user input for API call
  const [ask, setAsk] = useState("");

  // API Call

  const [apiOutput, setApiOutput] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // callGenerateEndpoint - provides the API with user input and generate output.

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ask }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied....");

    let solutions = JSON.parse(output);

    setApiOutput(solutions);
    console.log(apiOutput);
    setIsGenerating(false);
  };

  const onUserChangeText = (event) => {
    setAsk(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>
          DocCompanion - Your mental health superhero, always by your side
        </title>
      </Head>
      <div className="bgr">
        <div className="bgrin">
          <div className="container">
            <div className="animation">
              <span className="first">Therapist</span>
              <span className="slide">
                <span className="second">AI</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="containerc">
        <div className="header-subtitle">
          <Typewriter
            options={{
              strings: [
                "Your mental health superhero, always by your side",
                "Are you feeling the blues?",
                "Therapist.ai got your back.",
              ],
              autoStart: true,
              loop: true,
            }}
          />

          <div className="prompt-container">
            <textarea
              placeholder="What's been troubling you? Let us help you feel better!"
              className="prompt-box"
              value={ask}
              onChange={onUserChangeText}
            />

            <div className="prompt-buttons">
              <a
                className={
                  isGenerating ? "generate-button loading" : "generate-button"
                }
                onClick={callGenerateEndpoint}
              >
                <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Ask</p>}
                </div>
              </a>
            </div>

            {/* Output */}
            {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Probable Solutions</h3>
                  </div>
                </div>
                <div className="output-content">
                  {apiOutput.map((sol, index) => {
                    return (
                      <div key={index}>
                        <h2>{sol.solution}</h2>
                        <p>{sol.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="badge-container grow">
            <a
              href="https://github.com/NemesisLW/Therapist-AI"
              target="_blank"
              rel="noreferrer"
            >
              <div className="badge">
                <p>Identity Crisis</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
