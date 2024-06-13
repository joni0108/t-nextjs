## Contributing to Our Project

Hello Developers,

Thank you for your interest in contributing to our project! We welcome contributions in various forms, and your efforts are highly appreciated. Please review the guidelines below to ensure smooth collaboration.

### Ways to Contribute
You can contribute in several ways, including but not limited to:

- **Reporting Bugs & Issues**: Help us identify and fix problems by reporting bugs.
- **Requesting Features or Improvements**: Suggest new features or improvements to existing ones.
- **Implementing Solutions**: Submit pull requests with your solutions to issues or feature requests.
- **Starring and Forking**: Show your support by starring the repository or forking it for personal use.
- **Sharing**: Share the repository with others who might benefit from it.

### Quickstart

1. Clone the repository.
2. Run `npm run init`. This will run the pre-defined script that will in the background will `install all packages`, install `pnpm` globally (as is the package loader this project uses.), and will `run all tests` to ensure everything is working file.
3. Enjoy!

### Pull Request Guidelines

To make sure your pull request **will not fail**, please run `pnpm git-prepare` before commiting to the branch, this will make sure all the validations are passing on your contribution, so they will do it on the pull request.

To maintain the quality and consistency of the project, please adhere to the following guidelines when submitting a pull request:

1. **Pre-Commit Hooks**: Ensure you have run all pre-commit hooks locally. These hooks will also run during the pull request process, but running them locally first helps ensure that your pull request passes all tests.
2. **Folder Structure**: Follow the existing folder structure. Each folder in this project has a specific purpose.
3. **Testing**: Add test suites for any new code or features you have added. This ensures that your changes are stable and do not introduce new issues.

We run the following tests on each pull requests:

```bash
pnpm format # Formatting check
pnpm lint   # Code errors and bad practices check
pnpm test   # Run all the test suites
```

### Additional Guidelines

- **Code Style**: Follow the project's coding standards and style guidelines. Consistent code style helps with readability and maintenance.
- **Documentation**: Update or add documentation as necessary. Well-documented code is easier to understand and use.
- **Commit Messages**: Write clear and concise commit messages. Good commit messages help others understand the changes in your pull request.
- **Review Process**: Be prepared to engage in the review process. Address any feedback or changes requested by reviewers promptly.

Thank you for your contributions and for helping us improve this project!

Happy coding!
