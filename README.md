# Ember API
The Ember API integrates events from across ASU into a single stream.

## Supported Services:
Currently, Ember supports the following event providers:
- ASU Events
- OrgSync

## Setup

Ember is really easy to set up.

1. Get an API Key from OrgSync and store it a file named `.env` with the following structure: `ORGSYNC_API_KEY=[your key]`

2. Run `npm start`

3. There is no step three.

## Usage

Right now, there's only one API method, `/events/all/`, which returns JSON with all event data.

## Disclaimer

This should be considered alpha software. There's so much left to implement and quite a few things to refactor. Use for personal projects at your own risk and in production, not at all.
