NodeServer
==========

Benefit Assist Application server utilizes the Node.js technology. Here's how and what all is needed to run Node server locally.

## Getting Started

* Confirm you have the necessary command line utilities
  * `which git && which node && which npm` - should output the location of each
  * if you don't have, go install them globally
    * [Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Mac)
    * [Install node and npm](https://nodejs.org/download/)

## SSH setup your git
* Login to github.intuit.com
* Click on "Settings" on top right corner of homepage of github or directly go to https://github.intuit.com/settings/profile
* Click on "SSH Keys" from left side nav bar(under personal settings) or go to https://github.intuit.com/settings/ssh
* If you don't have any SSH keys configured here for Node; Follow steps from https://help.github.com/articles/generating-ssh-keys/

## Running Code:
* Pull the latest code from https://github.intuit.com/BenefitAssist/NodeServer
* Ask any developer to send 'application.json' file.
* Copy that file to NodeServer/Config directory.
* Run npm install in NodeServer.
	* If you have error like "Command failed: git clone --template=/Users/dsachdev/.npm/_git-remotes/_templates --mirror ssh://git@github.intuit.com/servicesplatform-node/sp-core.git" ----  Delete that directory manually and re run npm install.
* Run app.js

## SourceTree Setup:
* Install SourceTree
* Sign up for an github account
* Sign in and go to File -> New/Clone
* Select New Repository -> clone from url. Enter Url. Click OK

## Webstorm Setup:
* Install WebStorm and Open the Project (E.g. NodeServer)
* Go to Run / Debug configuration
* Click on plus sign to add new configuration. Select Node.js
* Give any name in ‘Name’ tab
* Select working directory : NodeServer directory
* Select JavaScript file : app.js
* Accept other default values and click OK.

