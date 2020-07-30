# sec-track

A quick weekend project created between mates for tracking holdings (securities) over the stock market and calculating P/E values 

## Technical

Fully written in TypeScript, utilising Socket.IO for client/server interface, and React for web client

Using the excellent [Finnhub API](https://finnhub.io/) for data polling of stocks!

### Running

The project could be started locally in development mode by `npm start`, concurrently running `nodemon`/`create-react-app`

* A build process was not implemented, although the building blocks and tooling is in
* The Finnhub API token inside `config.ts` has been invalidated and requires setting up your own

![Screenshot](https://i.imgur.com/KTTSfg7.png)
