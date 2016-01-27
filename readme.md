# MotionSickNess Template
This template is built off the shoulders off gaints. I just refactored the code to clean it up.
- Handlebars HTML templates with Panini
- Sass compilation and prefixing
- JavaScript concatenation
- Image Optimination tasks for interchange (requires mac)
- Built-in BrowserSync server

## Under Development 
(Code being refactored, themed or otherwise rewritten)
- Custom Components:
  - Animated Pricing Table (based on codrops)
  - Morphing Buttons (based codrops)
  - Background video player 
  - Input Effect (based on codrops)
  	- icons (Fumi, Kohana)
  	- Makiko (search)
  - Animated Checkboxes and Radio Buttons
  - Text Animations
  - Navigation Patterns (mostly done).





## Installation

New to Mac? Awesome so am i, now run the following.
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" && brew install node && npm i -g gulp && npm i -g foundation-cli && foundation new --framework sites --template motionsickness && cd motionsickness && npm i && bower i && gulp

DONE


To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

This template may ?LATER? be installed with the Foundation CLI, or downloaded and set up manually.

### Using the CLI

Install the Foundation CLI with this command:

```bash
npm install foundation-cli --global
```

Use this command to set up a blank Foundation for Sites project with this template:

```bash
foundation new --framework sites --template motionsickness
```

The CLI will prompt you to give your project a name. The template will be downloaded into a folder with this name.

### Manual Setup

To manually set up the template, first download it with Git:

```bash
git clone https://github.com/zurb/foundation-zurb-template projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run Gulp. Your finished site will be created in a folder called `dist`, viewable at this URL:

```
http://localhost:8000
```

To create compressed, production-ready assets, run `npm run build`.
