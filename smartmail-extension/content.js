function addSmartMailButton() {
  const composeBox = document.querySelector('div[aria-label="Message Body"]');
  if (!composeBox) return;

  if (document.getElementById("smartmail-container")) return;

  const container = document.createElement("div");
  container.id = "smartmail-container";
  container.style.marginTop = "10px";

  const toneSelect = document.createElement("select");
  toneSelect.id = "smartmail-tone";

  ["Professional", "Friendly", "Formal", "Casual"].forEach(tone => {
    const option = document.createElement("option");
    option.value = tone;
    option.text = tone;
    toneSelect.appendChild(option);
  });

  const button = document.createElement("button");
  button.innerText = "Generate AI Reply";
  button.id = "smartmail-btn";
  button.style.marginLeft = "10px";
  button.style.padding = "6px 10px";
  button.style.backgroundColor = "#4CAF50";
  button.style.color = "white";
  button.style.border = "none";
  button.style.cursor = "pointer";

  button.addEventListener("click", generateReply);

  container.appendChild(toneSelect);
  container.appendChild(button);

  composeBox.parentElement.appendChild(container);
}

async function generateReply() {
  try {
    const composeBox = document.querySelector('div[aria-label="Message Body"]');
    const emailBody = composeBox?.innerText.trim();
    const selectedTone =
     document.getElementById("smartmail-tone")?.value || "Professional";

    if (!emailBody) {
      alert("No email content found.");
      return;
    }

    const response = await fetch("http://127.0.0.1:8080/api/email/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailContent: emailBody,
        tone: selectedTone
      })
    });

    const data = await response.json();
    console.log("API RESPONSE:", data);

    composeBox.focus();
    composeBox.innerHTML = data.generateReply.replace(/\n/g, "<br>");

  } catch (error) {
    console.error("Extension Error:", error);
    alert("Error generating reply.");
  }
}


const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (
        node.nodeType === 1 &&
        node.querySelector &&
        node.querySelector('div[aria-label="Message Body"]')
      ) {
        addSmartMailButton();
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});