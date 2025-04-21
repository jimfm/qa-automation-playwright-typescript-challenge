# Code exercise 

## Design

* Built in a cookie injected "token" to allow simple session control or user switching.
* Added functionality to add to cart through local storage to make generating test data faster.
* Add visual tests. Playwright makes this very easy and is a quick win for UI validation.
* Page object model was a pretty straightforward choice given the very linear nature of the site.

## Result

1. Session cookie login utility to access app without explicitly signing into with username/password.
2. Page object definition with BasePage. Includes their basic functions.
3. Tests basic functionality of:
    * Login - Login, Logout, Errors
    * Inventory - select items, check pricing add/subtract
    * Cart
    * Checkout workflow pages fields & submit, errors.
4. Error tests to call out the errors that could be found using other test user accounts.
5. Visual tests turn up UI issues when run.
6. End to End workflow test.
7. Confirmed consistent result across all 3 browsers. 

## Did not add

1. Performance testing
2. Mobile format
3. Form field validation rules
4. Page logic during workflow. e.g. Being able to check out an empty cart.
5. Did not invest in the global.setup/teardown features, other than loading dotenv
