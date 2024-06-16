<h1>CHANGE<span style="color: red;">LOG</span></h1>

> [!IMPORTANT]
> The version **v0.1.1** have all the minimum standard structure, but version **v1.0.0** and higher will have all the packages that solves **commonly tasks** while building a web application. So if you want to 'start from scratch', use the version v0.1.1 instead.

<h2><span style="color: #1069da;">Major</span> v1.0.0</h2>
This update brings some services, features and customizations to the project. See what's new below:

### Development Enhances
- Added `twMerge()` (tailwind merge) dev dependency to help working with dynamic classes.
- Added `CryptoHash` static class for handling encryptation related tasks.
- Added a custom react hook `useViewport()` to handle real-time width and height of the current viewport.
- Added `DataValidation` static class for handling data validation tasks.
- Added `Clerk Auth` service to handle auth sessions and basic user information.
- Added `Mailing` service to send emails using Resend api.

### UI and Components
- Added the Theme context to handle light and dark mode on the application.
- Added `ThemeSwitcher` component to switch themes, raw styling, you can re-style it as you like.
- You can use any component from `Clerk Auth`, see docs.
- Added some `/auth` page routes as example of usage of Clerk Auth.

### Bugs fixed and Issues Addressed
- We added the command `pnpm build` to validator.yml file to run at dev branch on any push/pull request, as preview were only running with pull requests and the builds were not being tested on pushes.

<h2><span style="color: #1069da;">Major</span> v0.1.1</h2>
This is the initial version of this template, it does have the following:

### Development Enhances

- We added multiple development useful package that includes:
    - `@biomejs/biome`: For code formatting and lint. It will be substituting ESlint and Prettier.
    - `vitest`: The fastest coding testing library that exists. Including some plugins/dependencies for react testing and coverage.
    - `husky`: To run pre-commit scripts to make sure the code meets the standards before commiting to the branch.
    - All the default NextJS libraries like `typescript`, `tailwind`, etc.
- We added the following scripts:
    - `lint`: Now connected to biomejs, will run a lint check.
    - `format`: Will run a formatting check.
    - `format:fix`: Will fix all formatting divergences.
    - `test`: Will run all the test files with vitest.
    - `coverage`: Will run all tests and generate a converage report.
    - `bench`: Will run all the benchmarks test you have.
    - `init`: Will initialize all the needed files, packages, and commands when trying to create your project and/or contribute.
    - `git-prepare`: Only for contributors, will run all the scripts that are ran on each pull request, so you make sure your code will pass the minimum requirements and contributing guidelines.
- We have created an `.demo.env` file with all the environmental variables it does need.
- Added a demo test suit, and benchmark test.
- Added the initial folder structure.
- Added a healthcheck at `/api` route.
- Added the common folder structure for the projects, with demo example on each.
- Added a project configuration file at `src/config.ts`
- Added github workflows
- Added tests for all the demo components (**100% coverage**)
- Added `@/components/SEO.tsx` file to handle SEO on the home page. Also added `robots.txt` and `manifest.json` files.

### UI and Components
- We added the light/dark theme to the template.
- We added a whole colors pallete configuration ready to be used on tailwind, compatible with light and dark version. See [**tailwind.config.ts**](./tailwind.config.ts) file

### Bugs fixed and Issues Addressed

As this is the initial version of this template, bugs or issues are being reported or were changed.