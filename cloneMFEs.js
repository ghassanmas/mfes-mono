tools = require("workspace-tools");
GITHUB_PREFIX = "https://github.com/openedx/"
MFEs = ["account", "profile", "learning", "gradebook"];
release = "nutmeg";
MFEs.forEach(mfe => {
    tools.git([
        "clone",
        `${GITHUB_PREFIX}frontend-app-${mfe}`,
        "--branch",
        `open-release/${release}.master`,
        `apps/frontend-app-${mfe}`
    ])
})