DreamHouse Web App
------------------

This sample app is a mobile web app for [DreamHouse](https://dreamhouse-site.herokuapp.com/) that runs on Heroku and optionally uses Heroku Connect to get data from Salesforce.  Check out a demo:

[![Demo](http://img.youtube.com/vi/sSoUGkqveMo/0.jpg)](http://www.youtube.com/watch?v=sSoUGkqveMo)

This app is built with Ionic and Node.js so you can easily run it locally and on Heroku.

Run Locally:

1. [Install and start Postgres](https://wiki.postgresql.org/wiki/Detailed_installation_guides)
1. [Install Node.js](https://nodejs.org/en/)
1. Create a database in Postgres named `dreamhouse`
1. Fetch the NPM dependencies: `npm install`
1. Start the app: `npm run dev`
1. Check out the app: [http://localhost:8200/](http://localhost:8200/)

Run on Heroku:

1. [![Deploy on Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/dreamhouseapp/dreamhouse-web-app)
1. Check out the app: `http://<YOUR APP NAME>.herokuapp.com`

Use Heroku Connect:

1. [Signup for a Salesforce Developer Org](https://developer.salesforce.com/signup)
1. [Install the DreamHouse package into the org](https://dreamhouse-site.herokuapp.com/installation/)
1. [Add the Heroku Connect Addon to your Heroku app](https://elements.heroku.com/addons/herokuconnect)
1. Setup Heroku Connect by clicking on *Heroku Connect* in the Resources tab of the app's management dashboard: `https://dashboard.heroku.com/apps/YOUR_APP_NAME/resources`
1. Add a read-only mapping for `Property__c` with the fields: `address__c, baths__c, beds__c, broker__c, city__c, description__c, location__latitude__s, location__longitude__s, picture__c, price__c, state__c, tags__c, thumbnail__c, title__c`
1. Add a read-only mapping for `Broker__c` with the fields: `email__c, mobile_phone__c, phone__c, picture__c, title__c`
1. In Salesforce Setup's Object Manager, navigate to the *Fields & Relationships* for the *Favorite* object and add a new *Text* field with a label of `Id`, length of `36`, *Unique - case insensetive* and check the *External ID* box
1. Create a read-write mapping in Heroku Connect for `Favorite__c` with `id__c` selected for the unique id for writes and add the `property__c` field to the mapping
1. Restart the app so the new database tables are used
1. Check out the app and verify that sync works by changing a property's price in Salesforce
