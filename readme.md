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


## How to use: 

- clone the repo as you usually do `git clone https://github.com/ghassanmas/mfes-repo`
- Install dependencies  `npm install` // make sure you on node v16 first and also on `npm` `8.5.*`
- 