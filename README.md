## Create React Linters 🚀
Setup all the linters you like and don't let 💩 slip into your code base!

[Eslint](https://eslint.org/) 
| [Stylelint](https://stylelint.io/)
| [Commitlint](https://commitlint.js.org/#/)
| [Prettier](https://prettier.io/)
| [EditorConfig](https://editorconfig.org/)
| [Commitizen](https://www.npmjs.com/package/commitizen)


<p align="center">
  <img src="https://user-images.githubusercontent.com/52167824/150801732-025d68f8-6c70-482f-b1b3-a8042e3fcdb1.PNG">
</p>

## Usage
Prerequisites:
 - [Node.js](https://nodejs.org/) (`^12.22.0`, `^14.17.0`, or `>=16.0.0`)
 - Project initialized with `git` and `package.json`

```sh
npx create-react-linters@latest
```
## 🎯 Eslint
**Find and fix problems in your JavaScript code.**\
We are extending `airbnb` configurations. No extra rules are added.
### Provided:
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript) `Typescript Only`
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) `Typescript Only`
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) `Typescript Only`
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- [eslint-plugin-jest-dom](https://www.npmjs.com/package/eslint-plugin-jest-dom)
- [eslint-plugin-testing-library](https://www.npmjs.com/package/eslint-plugin-testing-library)

### Scripts
```sh
npm run eslint:check
```
```sh
npm run eslint:fix
```


## ✨ Stylelint
**A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.**\
We are extending `standard` configurations. No extra rules are added.

### Provided:
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-config-standard-scss](https://www.npmjs.com/package/stylelint-config-standard-scss) `SCSS/SASS Only`

### Scripts
```sh
npm run stylelint:check
```
```sh
npm run stylelint:fix
```


## 🛑 Commitlint
**Helps your team to adhere to a commit convention. By supporting npm-installed configurations, it makes sharing of commit conventions easy.**\
We are extending `config-conventional` configurations. No extra rules are added.

> Learn more about conventional commits. [here](https://www.conventionalcommits.org/)

### Provided:
- [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)
- [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) 

## 💄 Prettier
**An opinionated code formatter**\
`.prettierrc.json` is created with some configurations, feel free to update them.

> Learn more about prettier options. [here](https://prettier.io/docs/en/options.html)

### Provided:
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) `if.eslintrc.json found`
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) `if.eslintrc.json found`
- [stylelint-config-prettier](https://www.npmjs.com/package/stylelint-config-prettier) `if.stylelintrc.json found`
- [stylelint-prettier](https://www.npmjs.com/package/stylelint-prettier) `if.stylelintrc.json found`

### Scripts
```sh
npm run prettier:check
```
```sh
npm run prettier:fix
```


## 📃 EditorConfig
**Maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.**\
Default `.editorconfig` generated file is used.


## 💻 Commitizen
**When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time.**
```sh
npm run commit
```

## 🐶 Husky & Lint-Staged
**Run linters against staged git files and don't let  💩  slip into your code base!**
> pre-commit | eslint, stylelint and prettier
> commit | commitlint
