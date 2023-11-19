const rules = [
  {
    message: "Your password must be atleast 5 characters.",
    ruleText: "Rule 1",
    hasPassed: false,
    hasRendered: false,
    validator: (value) => value.length >= 5,
    id: 1,
  },

  {
    message: "Your password must include a number.",
    ruleText: "Rule 2",
    hasPassed: false,
    hasRendered: false,
    validator: (value) => /[0123456789]/.test(value),
    id: 2,
  },
];

const promptContainer = document.getElementById("promptContainer");
const customInput = document.getElementById("customInput");
const centerContainer = document.getElementById("center-container");

const checkPass = (value) => {
  rules.forEach((obj) => {
    obj.hasPassed = obj.validator(value);
  });
};

const checkRender = () => {
  rules.forEach((obj, i) => {
    const previousRule = rules[i - 1];
    if (!previousRule || (previousRule.hasPassed && previousRule.hasRendered)) {
      obj.hasRendered = true;
    }
  });
};

const renderRules = () => {
  rules.forEach((rule) => {
    if (rule.hasRendered) {
      divMaker(rule.message, rule.ruleText, rule.hasPassed);
    }
  });
};

customInput.oninput = () => {
  const textBoxVal = document.getElementById("customInput").value;
  promptContainer.innerHTML = "";
  checkPass(textBoxVal);
  checkRender();
  renderRules();
};

const divMaker = (ruleText, ruleNum, outcome) => {
  const newDivWrapper = document.createElement("div");
  const headerBarDiv = document.createElement("div");
  const textHolderDiv = document.createElement("div");
  const ruleTextEl = document.createTextNode(ruleText);
  const ruleNo = document.createTextNode(ruleNum);
  const passFailSvg = document.createElement("img");
  passFailSvg.setAttribute("class", "svg");
  headerBarDiv.appendChild(passFailSvg);
  headerBarDiv.appendChild(ruleNo);
  textHolderDiv.appendChild(ruleTextEl);
  newDivWrapper.appendChild(headerBarDiv);
  newDivWrapper.appendChild(textHolderDiv);
  promptContainer.appendChild(newDivWrapper);

  if (outcome) {
    newDivWrapper.setAttribute("class", "pass-container");
    headerBarDiv.setAttribute("class", "pass-header");
    textHolderDiv.setAttribute("class", "pass-text-holder");
    passFailSvg.setAttribute(
      "src",
      "https://neal.fun/password-game/checkmark.svg"
    );
  } else {
    newDivWrapper.setAttribute("class", "fail-container");
    headerBarDiv.setAttribute("class", "fail-header");
    textHolderDiv.setAttribute("class", "fail-text-holder");
    passFailSvg.setAttribute("src", "https://neal.fun/password-game/error.svg");
  }
};
