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

1. clone the repo as you usually do `git clone https://github.com/ghassanmas/mfes-mono`
2. Install dependencies  `npm install` // make sure you on node v16 first and also on `npm` `8.5.5`
3. Clone the repo with `node cloneMFEs.js` // This will clone with https, from openedx org, targeting the nutmeg. 
4. To overcome the challenge above run `node updateToLatestversion.js`

Notes: 
- The 4 step didn't change front-app-learning, given it was already using the maximum version of all dependencies. Though technically we have rewrote the package.json but **given we used the exact style, indentation, git didn't detect any changes**.

## Next Todo: (Not-exclusive)

- How to clone and link shared dependencies, such that when I change something in common/shared-lib/** I would be able to reflect that on all MFEs. 
- a script to commit changes of repos. 
- Decide how to deal with this nested git repos structure. i.e. git submodule or git substree. 
 