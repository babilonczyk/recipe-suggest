## recipe-suggest

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

## Todo

- [ ] Indexes
- [ ] Add GET recipes endpoint
- [ ] Add GET ingrediants endpoint
- [ ] Add GET ingrediant endpoint
- [ ] Set API_KEY so the API is accessed and authorised by one client
- [ ] Configure cors
- [ ] Add Rate limiting
- [ ] Finish recipes list in fe, display recipe in modal
- [ ] Host both apps
