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
  {
    message: "Your password must include an uppercase letter.",
    ruleText: "Rule 3",
    hasPassed: false,
    hasRendered: false,
    validator: (value) => /[A-Z]/.test(value),
  },
  {
    message: "Your password must include a special character.",
    ruleText: "Rule 4",
    hasPassed: false,
    hasRendered: false,
    validator: (value) => /[./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]/.test(value),
  },
  {
    message: "The digits in your password must add up to 25, e.g: 55=10",
    ruleText: "Rule 5",
    hasPassed: false,
    hasRendered: false,
    validator: (value) => {
      let sum = 0;
      for (let i = 0; i < value.length; i++) {
        if (!isNaN(Number(value[i]))) {
          sum += Number(value[i]);
        }
      }
      return sum === 25;
    },
  },
  {
    message: "Your password must include a month of the year.",
    ruleText: "Rule 6",
    hasPassed: false,
    hasRendered: false,
    validator: (value) =>
      /january|february|march|april|may|june|july|august|september|october|november|december/i.test(
        value
      ),
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
