define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function(){function e(){t(this,e)}return e.prototype.configureRouter=function(e,t){this.router=t,e.title="Teamcity radiator",e.map([{route:"failed/:baseUrl",name:"Faled Build Overview",moduleId:"view/failed-build-overview"},{route:"running/:baseUrl",name:"Running Build Overview",moduleId:"view/running-build-overview"},{route:"config/:baseUrl",name:"Build Type Configuration",moduleId:"view/build-types-configuration"}])},e}()}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(e,t){"use strict";function i(e){e.use.standardConfiguration().feature("resources"),n.default.debug&&e.use.developmentLogging(),n.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=i;var n=function(e){return e&&e.__esModule?e:{default:e}}(t);Promise.config({warnings:{wForgottenReturn:!1}})}),define("anticorruptionlayer/teamcity-build-adapter",["exports","../communicationlayer/http-client-router","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){var i={method:"GET",headers:new Headers({Accept:"application/json","X-Requested-With":"Fetch"})};return e.fetch(t,i).then(function(e){return e.json()}).then(function(e){return e.buildType.filter(function(e){return e.builds.build.length>0}).map(function(e){return{id:e.id,name:e.name,url:e.webUrl,buildNumber:e.builds.build[0].number,status:e.builds.build[0].status,statusText:e.builds.build[0].statusText,drawAttention:!1}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamcityBuildAdapter=void 0;var r,l;e.TeamcityBuildAdapter=(r=(0,i.inject)(t.HttpClientRouter))(l=function(){function e(t){n(this,e),this.clientRouter=t}return e.prototype.getAllLatestFinishedBuilds=function(e){var t="http://"+e+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,webUrl,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,t)},e.prototype.getAllLatestRunningBuilds=function(e){var t="http://"+e+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,webUrl,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,t)},e}())||l}),define("anticorruptionlayer/teamcity-build-type-adapter",["exports","../communicationlayer/http-client-router","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamcityBuildTypeAdapter=void 0;var u,r;e.TeamcityBuildTypeAdapter=(u=(0,i.inject)(t.HttpClientRouter))(r=function(){function e(t){n(this,e),this.clientRouter=t}return e.prototype.getBuildTypes=function(e){function t(e){function t(e){return e.split(" :: ").map(function(e){return{name:e}}).reduce(function(e,t){return t.label=e,t})}return e.buildType.map(function(e){return{id:e.id,name:e.name,label:t(e.projectName)}})}return this.clientRouter.fetch("http://"+e+"/guestAuth/app/rest/buildTypes",function(){return{method:"GET",headers:new Headers({Accept:"application/json","X-Requested-With":"Fetch"})}}()).then(function(e){return e.json()}).then(function(e){return t(e)})},e}())||r}),define("communicationlayer/http-client-router",["exports","aurelia-fetch-client","./teamcitystub/team-city-http-client-stub","aurelia-framework"],function(e,t,i,n){"use strict";function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.HttpClientRouter=void 0;var r,l;e.HttpClientRouter=(r=(0,n.inject)(t.HttpClient,i.TeamCityHttpClientStub))(l=function(){function e(t,i){u(this,e),this.realHttpClient=t,this.teamCityHttpClientStub=i}return e.prototype.fetch=function(e,t){return e.includes("stub")?this.teamCityHttpClientStub.fetch(e):this.realHttpClient.fetch(e,t)},e}())||l}),define("resources/index",["exports"],function(e){"use strict";function t(e){}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t}),define("view/build-types-configuration",["exports","../domain/services/build-type-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildTypesConfiguration=void 0;var u,r;e.BuildTypesConfiguration=(u=(0,i.inject)(t.BuildTypeService))(r=function(){function e(t){n(this,e),this.service=t,this.buildTypesGroupedByLabel={}}return e.prototype.activate=function(e){var t=this;this.service.getBuildTypesGroupedByLabel(e.baseUrl).then(function(e){return t.buildTypesGroupedByLabel=e})},e}())||r}),define("view/failed-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.FailedBuildOverview=void 0;var u,r,l=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();e.FailedBuildOverview=(u=(0,i.inject)(t.BuildService))(r=function(){function e(t){n(this,e),this.service=t}return e.prototype.activate=function(e){function t(e){var t=this;this.service.getAllFailedBuilds(e.baseUrl).then(function(e){t.builds=e})}this.url=e.baseUrl,t.bind(this)(e),setInterval(t.bind(this),3e4,e)},l(e,[{key:"baseUrl",get:function(){return this.url}},{key:"hasFailedBuilds",get:function(){return!!(this.builds&&this.builds.length>0)}}]),e}())||r}),define("view/running-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.RunningBuildOverview=void 0;var u,r,l=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();e.RunningBuildOverview=(u=(0,i.inject)(t.BuildService))(r=function(){function e(t){n(this,e),this.buildService=t}return e.prototype.activate=function(e){function t(e){var t=this;this.buildService.getAllLatestRunningBuilds(e.baseUrl).then(function(e){t.builds=e})}this.url=e.baseUrl,t.bind(this)(e),setInterval(t.bind(this),3e4,e)},l(e,[{key:"baseUrl",get:function(){return this.url}}]),e}())||r}),define("communicationlayer/teamcitystub/team-city-all-agents-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={count:13,href:"/guestAuth/app/rest/agents",agent:[{id:3,name:"SomeAgent_1",typeId:3,href:"/guestAuth/app/rest/agents/id:3"},{id:2,name:"SomeAgent_2",typeId:2,href:"/guestAuth/app/rest/agents/id:2"},{id:1,name:"SomeAgent_3",typeId:1,href:"/guestAuth/app/rest/agents/id:1"},{id:20,name:"SomeAgent_4",typeId:20,href:"/guestAuth/app/rest/agents/id:20"},{id:21,name:"SomeAgent_5",typeId:21,href:"/guestAuth/app/rest/agents/id:21"},{id:17,name:"SomeAgent_6",typeId:17,href:"/guestAuth/app/rest/agents/id:17"},{id:18,name:"SomeAgent_7",typeId:18,href:"/guestAuth/app/rest/agents/id:18"},{id:19,name:"SomeAgent_8",typeId:19,href:"/guestAuth/app/rest/agents/id:19"},{id:10,name:"SomeAgent_9",typeId:10,href:"/guestAuth/app/rest/agents/id:10"},{id:6,name:"SomeAgent_10",typeId:6,href:"/guestAuth/app/rest/agents/id:6"},{id:9,name:"SomeAgent_11",typeId:9,href:"/guestAuth/app/rest/agents/id:9"},{id:13,name:"SomeAgent_12",typeId:13,href:"/guestAuth/app/rest/agents/id:13"},{id:12,name:"SomeAgent_13",typeId:12,href:"/guestAuth/app/rest/agents/id:12"}]}}),define("communicationlayer/teamcitystub/team-city-build-types-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={count:11,href:"/httpAuth/app/rest/buildTypes",buildType:[{id:"build_1_id",name:"build 1",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_1_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_1_id"},{id:"build_2_id",name:"build 2",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_2_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_2_id"},{id:"build_3_id",name:"build 3",projectName:"Proj2 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_3_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_3_id"},{id:"build_4_id",name:"build 4",projectName:"Proj2 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_4_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_4_id"},{id:"build_5_id",name:"same name as other build",projectName:"Proj1 :: SubProj2",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_5_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_5_id"},{id:"build_6_id",name:"same name as other build",projectName:"Proj1 :: SubProj4",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_6_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_6_id"},{id:"build_7_id",name:"build 7",projectName:"Proj1 :: SubProj2",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_7_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_7_id"},{id:"build_8_id",name:"build 8",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_8_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_8_id"},{id:"build_9_id",name:"build 9",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_9_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_9_id"},{id:"build_10_id",name:"build 10",projectName:"Proj1 :: SubProj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_10_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_10_id"},{id:"build_25_id",name:"build 25",projectName:"Proj5",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_25_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_25_id"}]}}),define("communicationlayer/teamcitystub/team-city-http-client-stub",["exports","./team-city-latest-builds-response","./team-city-latest-running-builds-response","./team-city-build-types-response"],function(e,t,i,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e){return new Promise(function(t,i){setTimeout(function(){t(e)},500)})}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamCityHttpClientStub=void 0;var d=u(t),a=u(i),s=u(n);e.TeamCityHttpClientStub=function(){function e(){r(this,e)}return e.prototype.fetch=function(e){if(e.includes("running:false"))return l({json:function(){return d.default}});if(e.includes("running:true"))return l({json:function(){return a.default}});if(e.endsWith("/guestAuth/app/rest/buildTypes"))return l({json:function(){return s.default}});throw new Error("team city http client stub doesn't support "+e)},e}()}),define("communicationlayer/teamcitystub/team-city-latest-builds-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={buildType:[{id:"build_1_id",name:"build 1",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_1_id",builds:{build:[{number:"3.1.70.17327",status:"FAILURE",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_2_id",name:"build 2",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_2_id",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_3_id",builds:{build:[{number:"123",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_4_id",name:"build 4",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_4_id",builds:{build:[{number:"3.1.54.17253",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_5_id",name:"same name as other build",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_5_id",builds:{build:[{number:"3.1.54.17287",status:"FAILURE",statusText:"Tests failed: 4 (1 new), passed: 31"}]}},{id:"build_6_id",name:"same name as other build",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_6_id",builds:{build:[{number:"1.2.54.17287",status:"FAILURE",statusText:"Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: build 6"}]}},{id:"build_7_id",name:"build 7",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_7_id",builds:{build:[{number:"3.5.54.17287",status:"FAILURE",statusText:"Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: build 7"}]}},{id:"build_8_id",name:"build 8",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_8_id",builds:{build:[{number:"3.5.87.17287",status:"SUCCESS",statusText:"Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: build 8"}]}},{id:"build_9_id",name:"build 9",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_9_id",builds:{build:[{number:"3.5.99.17287",status:"FAILURE",statusText:"Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: build 9"}]}},{id:"build_10_id",name:"build 10",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_3_id",builds:{build:[{number:"3.5.99.21",status:"FAILURE",statusText:"Tests failed: 10, passed: 25"}]}}]}}),define("communicationlayer/teamcitystub/team-city-latest-running-builds-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={buildType:[{id:"build_1_id",name:"build 1",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_1_id",builds:{build:[{number:"3.1.70.17328",status:"SUCCESS",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_25_id",name:"build 25",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_25_id",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_3_id",builds:{build:[{number:"120",status:"FAILURE",statusText:"Tests passed: 35"}]}},{id:"build_4_id",name:"build 4",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_4_id",builds:{build:[{number:"3.1.54.17255",status:"FAILURE",statusText:"Tests passed: 35"}]}}]}}),define("communicationlayer/teamcitystub/team-city-notconnected-agents-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={count:13,href:"/guestAuth/app/rest/agents?locator=connected:true",agent:[{id:9,name:"SomeAgent_11",typeId:9,href:"/guestAuth/app/rest/agents/id:9"},{id:19,name:"SomeAgent_8",typeId:19,href:"/guestAuth/app/rest/agents/id:19"}]}}),define("domain/services/build-service",["exports","../../anticorruptionlayer/teamcity-build-adapter","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e){return!this.getBlackListBuilds().includes(e.id)}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildService=void 0;var r,l;e.BuildService=(r=(0,i.inject)(t.TeamcityBuildAdapter))(l=function(){function e(t){n(this,e),this.teamcityBuildAdapter=t}return e.prototype.getAllFailedBuilds=function(e){var t=this;return Promise.all([this.teamcityBuildAdapter.getAllLatestFinishedBuilds(e),this.teamcityBuildAdapter.getAllLatestRunningBuilds(e)]).then(function(e){var i=e[0],n=e[1];return i.filter(function(e){return"FAILURE"===e.status}).filter(function(e){return u.bind(t)(e)}).map(function(e){function t(){return n.filter(function(t){return t.id===e.id})[0]}if(function(){return void 0!==t()&&t().buildNumber>e.buildNumber}()){var i=t();return i.drawAttention=!0,i}return e})})},e.prototype.getAllLatestRunningBuilds=function(e){var t=this;return this.teamcityBuildAdapter.getAllLatestRunningBuilds(e).then(function(e){return e.filter(function(e){return u.bind(t)(e)}).map(function(e){return e.drawAttention=!0,e})})},e.prototype.addToBlackListBuilds=function(e){localStorage.blackListBuilds=JSON.stringify(this.getBlackListBuilds().concat(e))},e.prototype.removeFromBlackListBuilds=function(e){localStorage.blackListBuilds=JSON.stringify(this.getBlackListBuilds().filter(function(t){return t!==e}))},e.prototype.getBlackListBuilds=function(){return localStorage.blackListBuilds?JSON.parse(localStorage.blackListBuilds):[]},e.prototype.isInBlackListBuilds=function(e){return this.getBlackListBuilds().includes(e)},e}())||l}),define("domain/services/build-type-service",["exports","../../anticorruptionlayer/teamcity-build-type-adapter","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildTypeService=void 0;var u,r;e.BuildTypeService=(u=(0,i.inject)(t.TeamcityBuildTypeAdapter))(r=function(){function e(t){n(this,e),this.teamcityBuildTypeAdapter=t}return e.prototype.getBuildTypesGroupedByLabel=function(e){return this.teamcityBuildTypeAdapter.getBuildTypes(e).then(function(e){return e.reduce(function(e,t){function i(e){!function(){e.label&&i(e.label)}(),function(){n[e.name]||function(){n[e.name]=function(){return e.id}()?function(){return{id:e.id,type:"build"}}():function(){return{type:"label"}}()}()}(),function(){n=n[e.name]}()}var n=e;return i(t),e},{type:"label"})})},e}())||r}),define("view/elements/build-overview",["exports","aurelia-framework","../../domain/services/build-service"],function(e,t,i){"use strict";function n(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildOverview=void 0;var r,l,d,a;e.BuildOverview=(r=(0,t.inject)(i.BuildService))((d=function(){function e(t){u(this,e),n(this,"builds",a,this),this.buildService=t,this.showBlackList=!1}return e.prototype.getBuildStatusCssClass=function(e){if("SUCCESS"===e.status)return"alert-success";if("FAILURE"===e.status)return"alert-danger";throw new Error('The buildstatus "'+e.status+'" is invalid')},e.prototype.getDrawAttentionCssClass=function(e){if(!0===e.drawAttention)return"draw-attention";if(!1===e.drawAttention)return"";throw new Error('The drawAttention "'+e.drawAttention+'" is invalid')},e.prototype.startDrag=function(e){return this.showBlackList=!0,e.dataTransfer.setData("id",e.target.id),!0},e.prototype.endDrag=function(e){this.showBlackList=!1},e.prototype.preventEventPropagation=function(e){e.preventDefault()},e.prototype.drop=function(e){var t=this;this.buildService.addToBlackListBuilds(e.dataTransfer.getData("id")),this.builds=this.builds.filter(function(e){return!t.buildService.getBlackListBuilds().includes(e.id)}),this.showBlackList=!1},e}(),a=function(e,t,i,n,u){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},r),u&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(u):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}(d.prototype,"builds",[t.bindable],{enumerable:!0,initializer:null}),l=d))||l}),define("view/elements/build-type-label",["exports","aurelia-framework","../../domain/services/build-service"],function(e,t,i){"use strict";function n(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildTypeLabel=void 0;var r,l,d,a,s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();e.BuildTypeLabel=(r=(0,t.inject)(i.BuildService))((d=function(){function e(t){u(this,e),n(this,"buildTypesGroupedByLabel",a,this),this.buildService=t}return e.prototype.isNotABuildType=function(e){return!this.isABuildType(e)},e.prototype.isABuildType=function(e){return"build"===this.buildTypesGroupedByLabel[e].type},e.prototype.getId=function(e){return this.isABuildType(e)?this.buildTypesGroupedByLabel[e].id:""},e.prototype.isChecked=function(e){return!this.buildService.isInBlackListBuilds(this.getId(e))},e.prototype.changeStatusBuildType=function(e){var t=this;({false:function(){return t.buildService.addToBlackListBuilds(e.target.id)},true:function(){return t.buildService.removeFromBlackListBuilds(e.target.id)}})[e.target.checked]()},s(e,[{key:"labelsBuildTypeGroupedByLabel",get:function(){return Object.keys(this.buildTypesGroupedByLabel).filter(function(e){return"type"!==e})}}]),e}(),a=function(e,t,i,n,u){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},r),u&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(u):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}(d.prototype,"buildTypesGroupedByLabel",[t.bindable],{enumerable:!0,initializer:null}),l=d))||l}),define("text!app.html",["module"],function(e){e.exports='<template>\n  <require from="css/custom.css"></require>\n  <router-view></router-view>\n</template>'}),define("text!css/custom.css",["module"],function(e){e.exports="@keyframes fadeIn { \n  from { opacity: 0; } \n}\n\n.draw-attention {\n    animation: fadeIn 1s infinite alternate;\n}\n\na:link {\n    text-decoration: none;\n}\n\na:visited {\n    text-decoration: none;\n}\n\na:hover {\n    text-decoration: none;\n}\n\na:active {\n    text-decoration: none;\n}\n\n.fullScreen {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    z-index: 10; \n}\n\n.green {\n    background: green;\n}\n\n.red {\n    background: red;\n}"}),define("text!view/build-types-configuration.html",["module"],function(e){e.exports='<template>\n    <require from="./elements/build-type-label"></require>\n    <div class="container-fluid">\n        <div class="row">\n            <div class="col-md-12">\n                <build-type-label build-types-grouped-by-label.bind="buildTypesGroupedByLabel"></build-type-label>\n            </div>\n        </div>\n    </div>\n</template>'}),define("text!view/failed-build-overview.html",["module"],function(e){e.exports='<template>\n\t<a href="http://${baseUrl}" target="_blank">\n\t\t<div class="fullScreen ${hasFailedBuilds ? \'red\' : \'green\'}">\n\t\t\t<require from="./elements/build-overview"></require>\n\t\t\t<build-overview class="nobuilds" builds.bind="builds"></build-overview>\n\t\t</div>\n\t</a>\n</template>'}),define("text!view/running-build-overview.html",["module"],function(e){e.exports='<template>\n\t<a href="http://${baseUrl}" target="_blank">\n\t\t<div class="fullScreen">\n\t\t\t<require from="./elements/build-overview"></require>\n\t\t\t<build-overview builds.bind="builds"></build-overview>\n\t\t</div>\n\t</a>\n</template>'}),define("text!view/elements/build-overview.html",["module"],function(e){e.exports='<template>\n    <div class="container">\n        <div class="row">\n            <a href="${build.url}" target="_blank" repeat.for="build of builds">\n                <div id="${build.id}" class="col-md-4 text-center ${getBuildStatusCssClass(build)} ${getDrawAttentionCssClass(build)} alert"\n                    role="alert " draggable="true" dragstart.delegate="startDrag($event)" dragend.delegate="endDrag($event)">\n                    <h1>${build.name}</h1>\n                    <p>${build.statusText}</p>\n        </div>\n        </a>\n    </div>\n    <div class="row" show.bind="showBlackList">\n        <div class="col-md-12 text-center alert alert-warning" drop.delegate="drop($event)" dragover.delegate="preventEventPropagation($event)">\n            <h1>Blacklist</h1>\n        </div>\n    </div>\n    </div>\n</template>'}),define("text!view/elements/build-type-label.html",["module"],function(e){e.exports='<template>\n    <require from="./build-type-label"></require>\n    <ul>\n        <li  repeat.for="label of labelsBuildTypeGroupedByLabel">\n            <input if.bind="isABuildType(label)" id="${getId(label)}" type="checkbox" checked.one-way="isChecked(label)" change.delegate="changeStatusBuildType($event)"/>\n            <label for="${getId(label)}">${label}</label>\n            <build-type-label if.bind="isNotABuildType(label)" build-types-grouped-by-label.bind="buildTypesGroupedByLabel[label]"></build-type-label>\n        </li>\n    </ul>\n</template>'});