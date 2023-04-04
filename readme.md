
# Genshinautogift

This program will get the newset genshin promotional code and redeem it


## Usage/Examples
Go to https://genshin.hoyoverse.com/en/gift 
> After that login into your mihoyo account
- After that open the Developer console and paste the code below according to your account server



```js
//Initialize MakeJson
var script = document.createElement('script');script.type = 'text/javascript';script.src = 'https://cdn.jsdelivr.net/gh/gamersindo1223/genshinautogift@latest/js/makejson.min.js';document.head.appendChild(script);
//Run make json
setTimeout(() =>{
await run()
}, 500)
```
After that go to 
Go to https://github.com/YOUR_USERNAME/YOUR_REPO/settings/variables/actions

add a new variables with the with the name "login_data", and the value is the result of above code.

And then make a new Github Workflows/actions with the value like this
```yml
on:
  schedule:
    # Runs every 40 minutes or use crontab.guru for custom cron execution
    - cron: '*/30 * * * *'
  workflow_dispatch:

jobs:
  checking-and-redeem-codes:
    name: check-latest-codes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: genshinautogift check
        uses: MoonLGH@/genshinautogift@main
 ```
