const stepDetails = {
    1: {
        name: "Agent App",
        h2: "Install Agent App",
        content: `<p>
             The agent app can be installed directly from the <a href="https://www.zendesk.com/marketplace/">Zendesk Marketplace</a>
             </p>
             <p>Guidance on using the Agent App can be found <a href="https://sendsafely.zendesk.com/hc/en-us/articles/360035678771-Installing-the-Zendesk-Agent-App">here</a>.</p>
            `,
        figContent: "Some more details here"
    },
    2: {
        name: "Macrolink",
        h2: "Create Macrolink to Dropzone",
        content: "something, something, from JS",
        figContent: "Some more details here"
    },
    3: {
        name: "Create Connector",
        h2: "Create Dropzone&ndash;Zendesk Connector",
        content: "something, something, from JS",
        figContent: "Some more details here"
    },
    4: {
        name: "Complete Connector",
        h2: "Configure Dropzone to use Connector",
        content: "something, something, from JS",
        figContent: "Some more details here"
    }
};

const getDetailsElem = (stepNum, detailsOfSteps) => {
    const stepDetails = detailsOfSteps[stepNum];
    return `<section class="step_details" id="step-${stepNum}">
                <h2>Details: ${stepDetails['h2']}</h2>
                <p>${stepDetails['content']}</p>
            </section>`;
}

const getStepNum = (elem) => {
    let elemTarget = elem;
    if(elem.tagName === "LI") {
        elemTarget = elemTarget.children[0];
    }
    return elemTarget.getAttribute('href').split('-')[1];
};

const updateNav = (targetElem, stepSelectionElem) => {
    stepSelectionElem
        .querySelectorAll('.selected')
        .forEach(e => {
            e.classList.remove('selected');
        });
    targetElem.classList.add('selected');
    return targetElem.parentNode.classList.add('selected');
};

const updateFigure = (stepNum, detailsOfStep, figElem) => {
    const stepDetails = detailsOfStep[stepNum];
    return figElem.querySelector('figcaption').innerHTML = `<b>${stepDetails.name}:</b> ${stepDetails.figContent}`;
};

(function navToggleAndUpdatePage(){
    const stepSelection = document.getElementById('step_selection');
    const step = document.getElementById('step');
    const figure = document.getElementById('step_figure')
    const defaultStep = 1;
    step.innerHTML = getDetailsElem(defaultStep, stepDetails);
    updateFigure(defaultStep, stepDetails, figure);
    document.addEventListener('click', ev =>{
        const target = ev.target;
        if(target.classList.contains('step_select')) {
            ev.preventDefault();
            const stepNum = getStepNum(target);
            updateNav(target, stepSelection);
            updateFigure(stepNum, stepDetails, figure);
            step.innerHTML = getDetailsElem(stepNum, stepDetails);
        }
    });
})();