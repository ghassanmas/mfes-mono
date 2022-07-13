const { version } = require("os");

tools = require("workspace-tools");
fs = require("fs")

SHARED = ["@edx/frontend-component-header", "@edx/frontend-component-footer",
    "@edx/frontend-platform", "@edx/paragon"
]
SHARED_DEV = ["@edx/frontend-build"]

const root = tools.getWorkspaceRoot();
const pkgs = tools.getPackageInfos(root);

function findMax(pkgs) {
    result = {};
    installedApps = Object.keys(pkgs)
    installedApps.forEach(app => {
        SHARED.forEach(dep => {
            let version = pkgs[app]["dependencies"][dep]
            console.log(version, app, dep)
            if ((result[dep] === undefined)) {
                result[dep] = version
                console.log("what")
            }
            console.log(result[dep].localeCompare(version, undefined, { numeric: true, sensitivity: 'base' }))
            if (result[dep].localeCompare(version, undefined, { numeric: true, sensitivity: 'base' }) === -1) {
                result[dep] = version
                console.log("here")
            }

        })
        SHARED_DEV.forEach(dep => {
            let version = pkgs[app]["devDependencies"][dep]
            if ((result[dep] === undefined)) {
                result[dep] = version
            }
            if (result[dep].localeCompare(version, undefined, { numeric: true, sensitivity: 'base' }) == -1) {
                result[dep] = version
            }
        })

    })
    return result
}

function updateVersions(pkgs, versions) {
    installedApps = Object.keys(pkgs)
    installedApps.forEach(app => {
        jsonPath = pkgs[app]["packageJsonPath"];
        packageJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        console.log(typeof(packageJson))
        SHARED.forEach(dep => {
            packageJson["dependencies"][dep] = versions[dep]
        })
        SHARED_DEV.forEach(dep => {
            packageJson["devDependencies"][dep] = versions[dep]
        })
        fs.writeFileSync(jsonPath, JSON.stringify(packageJson, null, 2));
    })

}

let versions = findMax(pkgs)
console.log(versions)
updateVersions(pkgs, versions)