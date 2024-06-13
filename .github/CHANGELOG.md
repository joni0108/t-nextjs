<h1>CHANGE<span style="color: red;">LOG</span></h1>

<h2><span style="color: #1069da;">Major</span> v1.0.0</h2>
This is the initial version of this template, it does have the following:

### Development Enchances

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
- We have created an `.demo.env` file with all the environmental variables it does need.
- Added a demo test suit, and benchmark test.
- Added the initial folder structure.
- Added a healthcheck at `/api` route.
- Added the common folder structure for the projects, with demo example on each.
- Added a project configuration file at `src/config.ts`

### UI and Components
- We added the light/dark theme to the template.
- We added a whole colors pallete configuration ready to be used on tailwind, compatible with light and dark version. See [**tailwind.config.ts**](./tailwind.config.ts) file

### Bugs fixed and Issues Addressed

As this is the initial version of this template, bugs or issues are being reported or were changed.