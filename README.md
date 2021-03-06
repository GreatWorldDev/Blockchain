## What is it?

KaleidoKards is a lightweight application using React for frontend browser interaction and the web3 JavaScript library to format and send the blockchain-specific JSON RPC calls to the backend network.  This project aims to serve as a template for developers seeking to craft their first decentralized application against an Ethereum network.  The server side node code and the solidity smart contract contain extensive comments in an effort to add clarity to the various APIs and methods.  

## Narrative and origin

The KaleidoKards application manifested out of a recurring request to supply a sample DApp as an accompaniment to the platform experience.  The use case is not complicated and we even have a [fun animation video](https://www.youtube.com/watch?v=X45Drshd_Ng&feature=youtu.be) built into the app, so for the sake of brevity here’s a quick synopsis. You and your friend Joe have decided to use distributed ledger technology as a way to build out digital card collections and establish nonrepudiation over asset ownership. You each have 100 ether with which you can purchase cards from an online vendor. This act of purchasing is truly an invocation of the smart contract that accompanies the trading application. The card vendor owns the smart contract and, by extension, the ether that is sent to it. Once you’ve purchased cards, you have the ability to propose trades with Joe. Joe might accept or he might not.  That's it.

We've also written a rather comprehensive [blog](https://kaleido.io/dude-wheres-my-kard/) that goes into more details surrounding the origins of the application and the web3.js implementation.

## Usage

There are two approaches available for running the KaleidoKards Application:
* cloud hosted via [Glitch](https://glitch.com/about/)
* locally hosted

### Cloud Hosted

The cloud hosted method leverages [Glitch](https://glitch.com/about/), a platform providing a free and secure deployment pipeline that also contains an interactive code editor for rapid development and ideation.  Each application instance is provisioned a unique URL, with key files and data stores isolated to that namespace.  

Prior to launching the application, you must visit the [Kaleido console](https://console.kaleido.io) and acquire an administrative API Key (this is mandatory regardless of hosting method).  The application is configured to automatically provision Kaleido network resources (e.g. environment, nodes, application credentials, etc.) and requires this key in order to authenticate with the backend servers.  The provisioned resources will be confined to your Kaleido Organization.

Note that the default Kaleido resource limitations imposes a threshold of two consortia per Kaleido Org.  As a result, if your organization is already hosting two consortia, then the application will be unable to successfully provision the network resources.  Ensure that you have one or fewer consortia prior to launching the app.

With your API Key in hand, proceed to build the project by clicking this button - [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/kaleidokards).  
* This will provision you your own unique instance of the application, which you can edit and tinker with as you please.
* Within the Glitch console, you can click the **Logs** tab on the far left of the screen to see the progress of the build.  The entire process should take roughly one minute.
* Once the build has finished, you will see an output in the logs stating `listening on port 3000`.
* You will also see a green **Live** indicator at the top left of the screen.
* Click the **Show App** option next to **Live** to start up the app.
* In the new window, select a region where you would like to host the blockchain resources.  Your choices are US, Europe or Asia Pacific, with Sydney and Seoul available as sub-locales for the APAC region.  
* Next, paste your API Key in the empty box and click the **Launch** button.
* You will be presented with a short animation video outlining the use case for the KaleidoKards Trading Application.  In the background, a three step status bar will display the progress of the network creation and smart contract deployment calls.  The application is usable once the checkmark is highlighted.  If you are reusing the application against an existing environment, you can opt to skip the video and jump straight to the console.
* The trading console is fronted by a brief information panel outlining the steps to purchase and trade.  Click the **Got It** button to close this window.
* From within the trading console, you can elect to purchase either `standard` or `platinum` cards.  This act of purchasing will invoke one of two functions (`buyStandardPack` or `buyPlatinumPack`) in the solidity smart contract and update the ledger for the three participants - Card Vendor, Joe and yourself.  The ledger for the Card Vendor is not exposed in the application dashboard, however this network node will maintain an identical copy of the blockchain and state database.  The environment is configured with a Geth + PoA orchestration, and all transactions are executed publicly.  
* You also have the option to propose trades with your counterparty, Joe.  Accepted trades will lead to an invocation of the smart contract's transfer function and an updated view of the collections will manifest once the transaction has been executed.
* The application consumes events emitted by the smart contract (purchases and transfers) and uses these events as a trigger for ledger updates.  As such, the only blocks exposed in the console are those containing successfully executed transactions.

### Locally hosted

If you prefer to run the application locally on your machine, ensure that you have [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed on your system.  NPM, by default, accompanies a node.js download.  Testing has exhibited a functioning application runtime with the following versions:
* node.js ≥ 8.9.1
* npm     ≥ 5.7.1

To get started, navigate to a working directory and clone the KaleidoKards github repository:

`git clone https://github.com/GreatWorldDev/Blockchain.git`

Change into the directory and install the node modules at the root of the project:

`cd KaleidoKards && npm i`

Launch the application:

`npm start`

The app is served at `localhost:3000`.  If you are running the app for the first time, simply input a valid API Key into the console and click **Launch**.  If you are re-running the application, ensure that the auto-provisioned resources (consortia, memberships, environment, nodes and application credentials) are still present in your Kaleido Organization.  The application retains knowledge of these resource details via a hidden `.data` directory at the root of the project (more on this in the next section).  Note that Kaleido environments are configured to quiesce after 24 hours of inactivity.  As a result, you should log into the Kaleido console and ensure that your environment is active prior to reusing an older instance of the application.  There are two approaches for reviving an environment - UI or API:
* **UI**:  Log into the Kaleido console and navigate to the KaleidoKards consortium.  Click the dropdown for the KaleidoKards environment and select `Wake Environment`.  The alternative approach via the UI, is to hover over the grayed-out pause icon on the far left of the environment row.  This will reveal a play icon which you can click to restart the environment.
* **API**: Please refer to the [API 101](https://console.kaleido.io/docs/docs/api101/) tutorial for proper usage of the Kaleido API.  Once you have properly configured your content and authorization headers, as well as your `$APIKEY` and `$APIURL` environment variables, you can send a PATCH to the targeted environment and change the state.  For example:

`curl -X PATCH -d '{"state":"live"}' -H "$HDR_AUTH" -H "$HDR_CT" \ "$APIURL/consortia/{consortia_id}/environments/{environment_id}"`

If you want a brand new instance of the application or if you have deleted one or more of the existing resources and rendered the original application inaccessible, you will need to remove the hidden keystore file prior to launching the new instance.  From the root of your directory, remove the hidden `.data` directory:

`rm -rf .data`

Once the `.data` directory has been deleted, proceed to paste a valid API key and launch the app.  

## Data and Resources

The application itself requires a subset of these resources in order to successfully communicate with the blockchain layer.  In particular, the application ingests your Kaleido API Key for the resource creation calls and then uses the fully qualified RPC endpoints for each node along with the deployed smart contract address to exercise the Web3.js `call` and `send` methods.  The artifacts are stored as a `keystore.json` within a hidden `.data` directory at the root of the project.  To view the file, simply click the **Logs** tab at the top left of the screen and select the **Console** option on the bottom left of the window.  The console opens up a standard command line interface that you can navigate through in a similar fashion to your local terminal.   

## Smart Contract

**TL;DR** - This is a rather in depth exploration on one potential approach to randomization in public and private chains.  Feel free to skip this section and jump straight to the app.

The solidity smart contract is a straightforward series of logic with intuitively named functions and extensive comments in an attempt to enhance readability.  However, there is one specific feature of the smart contract that is worth drawing attention to:  randomization.  With regards to solidity contracts and their inherent requirement to execute deterministically, implementing an effective and non-manipulatable random function is a complex undertaking.  Certain approaches, for example using the block timestamp to ensure a consistent transaction input, provide a solution for the problem of determinism, but are untenable in the scope of public blockchains.  The issue arises when we peel back the layers of block construction and transaction mining.  Using the block timestamp as the critical input parameter provides a surface for miners to repeatedly alter this value until they reach a desired output.  This is a micro calculation (hashing the block timestamp along with any additional constants) that can quickly be iterated upon to yield the targeted result.  With an engineered timestamp in hand, the miner can calculate a nonce that solves for the network difficulty (standard proof of work) and propose this ostensibly valid block to the rest of the network.  The fellow nodes will have no purview into the timestamp manipulation.  Their sole task is to verify that the supplied nonce combined alongside the contents of the block header (previous hash, merkle root, version, difficulty target, magic number and block size) lead to a hashed output in accordance with the network's difficult target.  If the nonce is valid, the fellow nodes would accept this block and update their state tree with the mining node's desired outcome.  

The dangers of using a modifiable input parameter in a public Proof of "X" chain are readily apparent, but do these same pitfalls extend to private chains (i.e. Kaleido) where users do not possess direct access to the computational processes of the node?  The answer is NO, and it's because the node process runs in a locked down container that does not allow outside intervention into the core blockchain operations - block mining, consensus and transaction execution.  As a permissioned implementation of distributed ledger technology, Kaleido requires all network participants to be both clearly identifiable entities (non-anonymized) and authenticated to the environment by existing members.  This first class security barrier prevents foreign and potentially malicious actors from accessing the system, and allows for the usage of high-speed consensus algorithms that do not rely on computational investment.  More importantly though, it's the isolated and inaccessible nature of the node runtime that allows for less rigid smart contract orchestrations.  As such, the solidity code in this application makes usage of a block timestamp to achieve transaction randomization because we have confidence that the block proposer will behave honestly.  

## Contributing

We gladly welcome pull requests. To get started, just fork this repo, clone it locally and submit your PR.  In the body of the pull request please include a link to the working version of your Glitch environment.  That way we can test on our end and confirm the expected behavior.  Note that you **DO NOT** need to utilize the `share` feature within the Glitch IDE.  If you do elect to share your namespace, then you are granting access to your secret credentials and node endpoints to the invited individuals.  The Kaleido team neither wants nor needs this information.  We simply want a link to your working library of code.
