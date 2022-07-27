# MFE Mono

This an expreinamtal/dsiscovery project regarding Open edX MFEs. in Open edX each MFE (Microfrontend app) is an self contained React APP. 
However all MFEs share common libraries. Following are some of them:

```js
SHARED = ["@edx/frontend-component-header", "@edx/frontend-component-footer",
    "@edx/frontend-platform", "@edx/paragon"
]
SHARED_DEV = ["@edx/frontend-build"]
```
By creating a mono project of all these apps. We we would be able to: 
- Easily change the ecosystem . i.e. (Change paragon and then it would be easy to see the changes in other MFEs)
- Install time: by utilizing npm workspace feateur. npm would **link** simliar packages. 


## Challenges:

### In consistant dependency version
MFE don't have a constant dependency of a shared library. To overcome this the `updateToLatestversion.js` was created. The script simply does the following: 

1- It would find the max version of the shared dependency among the used MFEs. (Read package.json of each MFE)
2- It would then loop again on each MFE and update the version of its shared dependency to the max. (Rewrite Package.json of each MFE)


Find latest version of package: 

header:   v2.4.6
footer:   v10.2.2
build:    v9.1.4
platform: v1.15.6
paragon:  v19.14.1


cloneing: 


```bash
git clone git@github.com:ghassanmas/frontend-app-learning.git --branch open-release/nutmeg.master --depth 1
git clone git@github.com:ghassanmas/frontend-app-account.git --branch open-release/nutmeg.master --depth 1
git clone git@github.com:ghassanmas/frontend-app-profile.git --branch open-release/nutmeg.master --depth 1
git clone git@github.com:ghassanmas/frontend-app-gradebook.git --branch open-release/nutmeg.master --depth 1
```
