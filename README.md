# README-File

## Cypress ავტომატიზაცია — Swag Labs (saucedemo.com)

ამ პროექტის ნაწილში შესრულდა Swag Labs-ის სრული E2E ავტომატიზაცია Cypress-ით:

- ლოგინის ტესტები (Data Driven)
- კალათის ტესტები
- Checkout ვალიდაციები
- სრული E2E ნაკადი (ლოგინი → პროდუქტი → კალათა → Checkout → დადასტურება)
- სორტირების ტესტები
- CI ინტეგრაცია (GitHub Actions)

## Sprint Log

### 1 — Custom Commands და პროექტის სტრუქტურა

დაწერილია Custom Commands `cypress/support/commands.js`-ში: `login`, `addToCart`, `fillCheckout`, `logout`

გამოყენებულია Hooks (`beforeEach`) ფაილებში: `02-cart.cy.js`, `03-checkout.cy.js`, `05-sorting.cy.js`

გამოყენებულია Fixtures / Data Driven მიდგომა: `users.json`, `checkoutData.json`, `sortOptions.json`

ფაილების სტრუქტურა:

```
cypress/
├── e2e/
│   ├── 01-login.cy.js        ← Data Driven ლოგინის ტესტები (6 სცენარი)
│   ├── 02-cart.cy.js         ← კალათის ტესტები + სორტირების ბონუსი
│   ├── 03-checkout.cy.js     ← Checkout ვალიდაციები
│   ├── 04-full-flow.cy.js    ← სრული E2E flow + H1 (ფასების მათემატიკა) + H2 (Data Driven სრული ციკლი)
│   └── 05-sorting.cy.js      ← H3: სორტირების სრული მატრიცა
├── fixtures/
│   ├── users.json
│   ├── checkoutData.json
│   └── sortOptions.json
└── support/
    ├── commands.js
    └── e2e.js                ← commands იმპორტი + screenshot-on-fail ბონუსი
```

### 2 — როგორ გავუშვათ ტესტები

```bash
npm install
npx cypress open      # ინტერაქტიული რეჟიმი
# ან
npx cypress run       # headless რეჟიმი
```

### 3 — რეალიზებული ბონუსები / Hard Mode

დაწერილია დამატებითი Hard Mode ამოცანები:

- H1 — ფასების მათემატიკა (`04-full-flow.cy.js`): Item total DOM-იდან შედარებულია ცალკეული ფასების ჯამთან
- H2 — Data Driven სრული ციკლი (`04-full-flow.cy.js`, `checkoutData.multiPurchase`): 3 სხვადასხვა შესყიდვის სცენარი, ერთი შაბლონით
- H3 — სორტირების სრული მატრიცა (`05-sorting.cy.js`): ოთხივე სორტირება (A-Z, Z-A, ფასი ზრდადი/კლებადი) fixture-იდან
- H4 — CI (`.github/workflows/cypress.yml`): `cypress-io/github-action` ყოველ push-ზე `main` ბრენჩზე

დამატებით რეალიზებულია:

- logout ბრძანება (`cy.logout()`)
- afterEach + screenshot ჩავარდნილი ტესტისთვის (`support/e2e.js`)
- სორტირების ბაზისური ტესტი `02-cart.cy.js`-ში

CI ბეჯი (ჩასასმელად შეცვალეთ USER/REPO თქვენი GitHub მისამართით):

```md
![Cypress Tests](https://github.com/USER/REPO/actions/workflows/cypress.yml/badge.svg)
```

### 4 — Bug Hunt: problem_user

⚠️ მნიშვნელოვანი შენიშვნა: ეს რეპორტი ეფუძნება საჯაროდ ცნობილ, საყოველთაოდ დოკუმენტირებულ problem_user-ის ქცევას saucedemo.com-ზე. ტესტების ავტორმა (ე.ი. მე) სანამ README-ში ჩასვამთ, problem_user-ით და დაადასტურეთ ეს ორივე ბაგი.

ტესტების გასაშვებად problem_user-ით, დროებით შეცვალეთ default მნიშვნელობა cy.login()-ში ან გამოიძახეთ cy.login('problem_user', 'secret_sauce').


Bug Reports — Swag Labs (problem_user)
https://docs.google.com/document/d/1aqa45bkSl99JOblTTkqCXwvP_VOK5LAo7rhKr1JuxQM/edit?usp=sharing
Bug Report #1
გარემო  /  Environment
●        Website: Swag Labs (saucedemo.com)
●        Environment: Test/Demo
●        Browser: Chrome (Version 115.0)
●        OS: Windows 11
წინაპირობა  /  Precondition
მომხმარებელი ავტორიზებულია სისტემაში (user: problem_user). გახსნილია მთავარი გვერდი (https://www.saucedemo.com/inventory.html).
სათაური  /  Title
Inventory გვერდზე ყველა პროდუქტს ერთი და იგივე სურათი აქვს
აღწერა  /  Description
problem_user-ით ავტორიზაციის შემდეგ Inventory (Products) გვერდზე ყველა პროდუქტის ბარათს ერთი და იგივე სურათი აქვს, მიუხედავად იმისა, რომ პროდუქტები განსხვავებულია (ზურგჩანთა, ველოსიპედის შუქურა, მაისური, ჟაკეტი და ა.შ.). სურათი, რომელიც ყველგან ჩნდება, ძაღლის ფოტოა ბურთით პირში — ეს არ შეესაბამება არცერთ პროდუქტს.
URL  /  URL
https://www.saucedemo.com/inventory.html
ნაბიჯები  /  Steps to Reproduce
●        გახსენით saucedemo.com.
●        შედით სისტემაში problem_user / secret_sauce მონაცემებით.
●        გახსენით Inventory (Products) გვერდი.
●        დააკვირდით თითოეული პროდუქტის ბარათის სურათს.
რეალური შედეგი  /  Actual Result
ექვსივე პროდუქტს (Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt) ერთი და იგივე სურათი აქვს — ძაღლის ფოტო. სურათები არ შეესაბამება პროდუქტების რეალურ დასახელებას/ტიპს.
მოსალოდნელი შედეგი  /  Expected Result
თითოეულ პროდუქტს უნდა გააჩნდეს საკუთარი, უნიკალური და მისი აღწერის შესაბამისი სურათი.
სიმძიმე  /  Severity
Medium
პრიორიტეტი  /  Priority
High
სქრინშოტი  /  Screenshot 
 Bug Report #2
გარემო  /  Environment
●        Website: Swag Labs (saucedemo.com)
●        Environment: Test/Demo
●        Browser: Chrome (Version 115.0)
●        OS: Windows 11
წინაპირობა  /  Precondition
მომხმარებელი ავტორიზებულია სისტემაში (user: problem_user). გახსნილია მთავარი გვერდი (https://www.saucedemo.com/inventory.html). Sauce Labs Backpack, Bike Light და Onesie უკვე დამატებულია კალათაში.
სათაური  /  Title
სამი კონკრეტული პროდუქტისთვის "Add to cart" ღილაკი არ ამატებს პროდუქტს კალათაში
აღწერა  /  Description
problem_user-ით ავტორიზაციის შემდეგ Inventory გვერდზე კონკრეტულად სამ პროდუქტზე — Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket და Test.allTheThings() T-Shirt (Red) — "Add to cart" ღილაკზე დაკლიკება არანაირ ეფექტს არ იძლევა. ღილაკი არ იცვლება "Remove"-ზე და პროდუქტი კალათაში არ ემატება. სხვა პროდუქტებზე (Backpack, Bike Light, Onesie) იგივე მოქმედება გამართულად მუშაობს.
URL  /  URL
https://www.saucedemo.com/inventory.html
ნაბიჯები  /  Steps to Reproduce
●        გახსენით saucedemo.com.
●        შედით სისტემაში problem_user / secret_sauce მონაცემებით.
●        დარწმუნდით, რომ Sauce Labs Backpack, Bike Light და Onesie უკვე დამატებულია კალათაში (ან დაამატეთ ისინი).
●        დააკლიკეთ "Add to cart" ღილაკს Sauce Labs Bolt T-Shirt-ზე.
●        დააკლიკეთ "Add to cart" ღილაკს Sauce Labs Fleece Jacket-ზე.
●        დააკლიკეთ "Add to cart" ღილაკს Test.allTheThings() T-Shirt (Red)-ზე.
●        დააკვირდით სამივე ღილაკის მდგომარეობას და კალათის აიკონზე ბეჯს.
რეალური შედეგი  /  Actual Result
სამივე ზემოთ ჩამოთვლილ პროდუქტზე ღილაკი კვლავ აჩვენებს "Add to cart"-ს — არ იცვლება "Remove"-ზე. კალათის ბეჯზე რაოდენობა არ იზრდება ამ სამი დაკლიკებით. პროდუქტები კალათის გვერდზეც არ ჩნდება.
მოსალოდნელი შედეგი  /  Expected Result
"Add to cart" ღილაკზე დაკლიკებისას პროდუქტი უნდა დაემატოს კალათაში, ღილაკის წარწერა უნდა შეიცვალოს "Remove"-ზე, და კალათის ბეჯის მრიცხველი უნდა გაიზარდოს დამატებული პროდუქტების რაოდენობის შესაბამისად.
სიმძიმე  /  Severity
High
პრიორიტეტი  /  Priority
High
სქრინშოტი  /  Screenshot
 
Bike Light, Onesie) გამართულად ემატება — შესაძლოა, click handler-ი სელექტიურად არ არის მიბმული ამ სამ ღილაკზე ("problem_user"-ის ცნობილი UI-glitch ქცევის ნაწილი).


### 5 — შენიშვნები

cy.visit() მთელს კოდში მხოლოდ ერთხელ გვხვდება — cy.login() ბრძანებაში.

ცარიელი ველების შემთხვევაში (username, password, firstName და ა.შ.) commands.js-ში if პირობა ვერიდებით type('')-ის გამოძახებას.


