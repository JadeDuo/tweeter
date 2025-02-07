# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

## Final Product

![Desktop](https://github.com/JadeDuo/tweeter/blob/master/views/desktop.png?raw=true)
![Mobile](https://github.com/JadeDuo/tweeter/blob/master/views/mobile.png?raw=true)

## Getting Started

1. Clone this repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Chance
- Body parser
- MD5


## How to use

Tweeter is a Single page app that displays content as it's generated without the need for refresh.

Start off by clicking on "Write a new tweet" in the top right corner. This will toggle the input for your tweets! Click it again if you would like to minimize it out of view. 

Tell the world what you have to say...as long as it's 140 characters or less! Any more, and you'll have to find a different messaging platform for your needs.

Press `enter` or click `tweet` to send your message, and it will add your tweet to the top of the feed. Tweets are listed in chronological order for your convenience.



## Things to consider
At this time, this application does not utilize a proper database, and entries are stored in JSON server-side. This means any time the host server is terminated or offline, all entries except those hard coded into the DB will be erased.