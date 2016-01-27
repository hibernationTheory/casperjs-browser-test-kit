# CasperJS Browser Tests Starting Kit

A Starting Kit for writing CasperJS Browser tests.

## How to Use?

Create a test inside the `./tests` folder. The test should expect to receive a `url` argument that stands for the url of the page to be visited. Also populate the `data.json` file with urls to perform tests on. 

Then you can run:

`npm run main`

which executes the run.js file, and logs the results in a log.xml.

According to the variables that are defined inside `run.js`, npm run main is either going to run:
- *All* the tests that are inside the `./tests` folder if a config file is not provided by `run.js`.
- If a config file is provided by `run.js`, then it would run the tests in the `./tests` folder as specified with the `tests` array in the config file.

By default, two sets of tests are included with the starter kit.
- A page status test suite that checks to see if the given url is up and running.
- An accessibility tests suite that checks against certain accessibility requirements.

## TO DO

- Make the page status test suite a prerequisite for all other tests (Not much reason to run further tests if this one is failing)