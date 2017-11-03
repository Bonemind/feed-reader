# Feed reader

This is a basic rss-feed aggregator with a backend and frontend.

The backend is a simple script that reads `config.json` which contains an array of
feeds to parse. This file also defines how long feed are cached before they are refreshed,
in minutes.

For an example, see `config.example.json`.

The frontend is built on preact and communicates with the backend via an nginx proxy.

Both the back and frontend have a docker image available, and for running the whole application, a docker-compose is available.

## Usage

To change the defaults, mount your own `config.json` in the backend image at `/app/config.json`.

Then simply `docker-compose up`. This will build and bring the images up.

