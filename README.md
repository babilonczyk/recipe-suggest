## recipe-suggest

api -> https://recipe-suggest-4ef83f6f8450.herokuapp.com/
web -> https://recipe-suggest-web-lac.vercel.app/

## Before running

```
cd apps/be
rails db::create
rails db:migrate
rails db::seed
```

## How to run?

Before install dependencies

```sh
yarn install
```

### recipe-suggest web

React single page app for the web version of the app.

```sh
yarn workspace recipe-suggest dev
```

### recipe-suggest be

Backend business logic for recipe suggest app.

```sh
cd apps/be
rails s
```

## User stories

1. As a user, I want to select ingredients I currently have at home, so that I can find recipes I can cook right now.

2. As a user, I want to view recipes that match the ingredients I selected, so that I can quickly choose something to cook.

3. As a user, I want to understand what quantities are expected in recipes, so I can check if I have enough of each ingredient.

## Left to do / ideas

Stuff I made as a cut scope, because I didn't have enough time:

- rate limiting
- display information on found_recipe page on how many ingrediants user has and how many he needs to buy
- allow passing image of the items and send request to the openai to find what ingrediants user has. Than search recipes based on that output

## Interesting cases/observations

- I was thinking on implementing infinite scrolling on the be, to don't end up with memory problem on the clint side when displaying all ingrediants/recipes. But I found the 'window-react' lib which solves the issue on the clinet side

- I've spend some time debugging cors issue. For some reason clinet could make some request, but other were being blocked. Turnes out I have passed / at the end of https://recipe-suggest-web-lac.vercel.app in cors.rb initializer which was creating some formating issue

- I've had select all ingrediants working on the local environment, but when dealing with thousands of records I've been reaching the limit of how long request can be when passing ?imgrediant_ids=... filter. So I've removed it.

## Vision

Simplicity. My goal was to create a simple tool for finding recipes.
