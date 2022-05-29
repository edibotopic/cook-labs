# CookLabs

**CookLabs** is a website designed to assist with recipe documentation, iteration and optimisation.

It is currently in prototype form and contains examples taken largely from the field of [molecular gastronomy](https://en.wikipedia.org/wiki/Molecular_gastronomy).

The website uses _mostly_ vanilla JavaScript, HTML and CSS. It is hoped that this will make it accessible as a pedagogical tool, especially for people who are not professional programmers.

## How Does it Work

Each recipe is stored in a structured plaintext format, written using the [Cooklang language specification](https://cooklang.org/docs/spec/).

> **Note**
> Please refer to the link above to understand how Cooklang recipes are written.

The user selects a recipe, which triggers the parsing of a source recipe (`.cook` file). The parsed recipe (in `.json` format) is then use to extract key information (metadata, equipment, ingredients, quantities) to be displayed on the
website.

Source recipes are also shown in _Cooklang format_ to facilitate copying by users who might wish to recreate, modify or update the recipe. 

> **Note**
> Syntax highlighters for `.cook` files are available for several text editors (Vim, VSCode, Obsidian), which makes writing Cooklang files easier (and more colorful).

For example, a recipe may contain a line as follows:

```ruby
Coagulate the @soy milk{} with @hydrochloric acid{2%splashes}
-- TODO: ambiguous quantity
```

When this line is parsed it will output that two "splashes" of hydrochloric acid are required (ambiguous and possibly dangerous). The `--` signifies a comment in Cooklang, only intended to be read by humans. Subsequently, a collaborator may copy the recipe and submit the following revision:

```ruby
Coagulate the @soy milk{500%mL} with @1.0 N hydrochloric acid{25%mL}
```

The revised version specifies precisely the **N**ormality (i.e, strength) as well as volume of hydrochloric acid required to achieve coagulation. Given that the files are stored in plaintext in a public repository, such collaboration and revision can benefit from Git(hub)-based [version control](https://www.atlassian.com/git/tutorials/what-is-version-control) practices.

## Opinionated by Design

The approach to recipe creation for CookLabs is opinionated by design, demanding clarity and precision through the imposition of specific authoring standards.

- Each recipe is written as a `.cook` file using the Cooklang language in accordance with the [Cooklang specification](https://cooklang.org/docs/spec)

- The filename is written in :camel:CamelCase (e.g., `ApplePie.cook`) to facilitate parsing and to avoid issues with handling of spaces in filenames on different Operating Systems

- All recipes contain essential metadata at the top, specifically the recipe _name_ and _author_. Other optional metadata can include (but is not limited to): _DSF formula_, _source information_, _preparation time_ and _tags_.

- Times specified in the `~{<number>%units}` format should only follow a verb specifying an action. For example, the phrase `hydrate ~{2%hours}` will be translated into `hydrate for 2 hours` - in such cases there is no need to explicitly state 'for'.

- Quantities should always be specified in precise terms, where possible, preferably using an SI unit of measurement. "Sprinkles" and "spoonfuls" are unlikely to yield sufficient clarity of expression and should be followed by a comment highlighting the need for revision.

- Recipe names should be kept short and descriptive, preferably 1, 2 or --- if absolutely necessary --- 3 words long. Additional detail can be provided in the metadata as needed.

### Comment: Recipes as Algorithms

In the computer science literature analogies between algorithms and recipes have frequently been made.

> Let us try to compare the concept of an algorithm with that of a cookbook recipe
> --- Donald Knuth from _The Art of Computer Programming_

Often, however, recipes can generate an output in spite of deficiencies that would be fatal to a computer program. While ambiguous or poorly written code may not be compiled at runtime, a sloppy recipe can still produce a desirable outcome if the cook is sufficiently skilled. The latter case is more a testament to the interpretive capacities of humans than a demonstration that recipes do not require precision.

In the fields of food science and molecular gastronomy, it is often suggested that scientific recipes and "formulations" must be rendered more definite than their everyday counterparts. In other words: _scientists often aim to make the process of combining and transforming ingredients more algorithmic_. This may involve --- for example --- the precise specification of quantities and units.

Despite this ambition, the documentation of recipes and methods in these fields remains inconsistent and scattered. While software-based approaches to managing recipes are used industrially, they often requires expensive proprietary software. This software is typically closed-source and not available to educators. Precise descriptions of formulations can be found in the scientific literature, but "trivial" details are often omitted and many of the articles are behind a paywall.

> **Note**
> Some links to other topics, tools and ideas relating to digital food can be [found here](https://github.com/edibotopic/digital-food)

### Comment: Openness, Versioning and Education

Software engineers have long understood the benefit of version control systems. Tools like _Git_ allow programmers to track and manage changes in their projects. These _local_ Git repositories can then be "pushed" to _remote_ repositories on services like GitHub and GitLab. Collaborators can read the code, copy or "clone" it to their own devices, highlight issues and submit suggested changes for review ("pull requests").

[Many people use Git and GitHub for non-code projects](https://www.brendanschlagel.com/2018/09/28/repos-beyond-code-a-collection-of-creative-uses-of-github/) and [there are many food-related projects that can be found on Github](https://github.com/jzarca01/awesome-food). Gestures towards version control have been seen in food product development; for example, in its press releases the "meal-replacer" _Soylent_ has invoked versions, such as [Soylent Original Powder 1.9](https://soylent.com/blogs/news/original-powder-1-9-is-coming), although this functions --- at least in part --- as marketing rhetoric. In addition, it can be assumed that many food companies have some method to track different product iterations, although the methods for doing so --- where they do exist --- are opaque.

The goal for CookLabs, or similar implementations, should be the transparent documentation of recipe creation and innovation, in a manner that is open to educators, students and the public.

## Similar Websites

There are several excellent implementations of the Cooklang markup language in web applications to document recipes. My initial research into some of these revealed sophisticated front-end frameworks and build systems that I did not fully understand :smile:, which was part of my motivation for creating this website. 

The websites that I am aware of are:

- [briansunter.com](https://briansunter.com/recipes/)
- [net-mist-cooking-book](https://net-mist-cooking-book.netlify.app)
- [nicholaswilde.io](https://nicholaswilde.io/recipes/)

The website in its current form would not be possible without:

- The JavaScript/TypeScript parser for Cooklang recipes developed by [deathau](https://github.com/deathau/cooklang-js) that generates the `json`
- The Cooklang language and supporting tools developed by [Alexey Dubovskoy](https://github.com/dubadub)
- The authors of the [Handbook of Molecular Gastronomy](https://www.waterstones.com/book/handbook-of-molecular-gastronomy/roisin-burke/alan-kelly/9781466594784) which served as the source for several of the current example recipes
- Free images taken from [Unsplash](https://unsplash.com)

## Usage

### Consuming

Simply click around the website and find a recipe that interests you!

### Contributing

> **Note**
> I plan on contributing *personally* to the website and do not imagine a significant volume of contributions from others at this point. If that changes I will be happy to facilitate issues and PRs.

Each recipe is written in a file with the `.cook` extension
in the `/recipes/` directory. Every recipe has an accompanying image in either `.png` or `.jpeg` format. A shell script `/recipes/popson.sh`
extracts the names of the recipes and prints them to `/recipes/recipes.json`.

The names of the files are extracted from `recipes.json` and listed at the top of the page as buttons.
Clicking on <kbd>Sparkling Meringue</kbd>, for example, will automatically populate
the page with the relevant data from that recipe, namely:

- Author
- Equipment
- Ingredients
- Steps

If you want to contribute a recipe to the existing CookLabs site you can clone the repo, add your file and image to `/recipes/` and submit a pull request (PR). Alternatively, you can edit an existing recipe and submit a PR.

The raw Cooklang file is also printed with
syntax highlighting. The syntax highlighting is
a bit of a hack, as it uses the `Ruby` highlighter
from `highlight.js`. I got this idea from [Brian Sunter's blog](https://briansunter.com/blog/cooklang/) on managing recipes in Git, where Ruby-based highlighting was also used for Cooklang markup.

This source code can be copied by clicking the red button in the top right corner of the markup block.

Ruby-based syntax highlighting is not perfect.
Some issues include `#` commenting out everything that follows on a line, meaning that an Equipment
name will be highlighted along with everthing that
follows on that line:

```ruby
pierce the @apple then stew it in a #pot for five minutes
```

To avoid this one can simply write the recipe as follows:

```ruby
pierce the @apple then stew ~{5%min} in a #pot
```

A further issue is the highlighting of keywords from the Ruby language, such as `for` and `if`.

Alas, it works OK for now and will have to do
until I implement my own highlighter or at least a
modified/stripped-down version of the Ruby one.

#### Use-case

The envisaged use-case is a laboratory, kitchen or business that
collaboratively generates and modifies recipes or methods.

There is an interest in cataloging this information in a
consistent manner, using an approach with the following
characteristics:

- **Consistent**: clearly enforced authoring style for content
- **Versioned**: ability to track iterations of a given recipe
- **Open**: information made available to internal and external collaborators
- **Extensible**: code can be modified to fit user needs

Each member of the team can clone the repository. They can write and
test recipes before submitting a `pull request` outlining the
purpose of the recipe and the justification for its inclusion. A history of changes is automatically maintained by Git and Github.
Pull requests are reviewed and ones that are accepted are merged into
the recipes list.

Alternatively,
a sufficiently novel deviation from an existing recipe may require a
new `branch` that can become a new recipe in its own right.

### Building

When a new `.cook` file is added the `/recipes/recipes.json`
is updated when `make` invokes `popson.sh` in that directory.

The list of selectable recipes on the website depends on the existence of a suitably populated JSON,
which means the makefile must be run before the site is
pushed to Github.

```bash
cd cook-labs
make
```

To build the site yourself simply do a `git clone` and create
a remote repo on Github. Write your own `.cook` recipes using
your favourite text editor and save them to `/recipes/`. Style the website, give it a name and when
you're ready to push the contents run:

```bash
make git m="your commit message here"
git push origin main
```

Note: you will need to setup your repo as a GH-pages environment to
share the results.

#### Cooklang CLI

If you have the [Cookang-CLI](https://github.com/cooklang/CookCLI) tool installed you can also simply
`git clone` this repo, `cd` into `/recipes/` and run the
following command to print a recipe to your terminal:

```bash
cook recipe read "AlginateBeads.cook"
```

Alternatively, in the same directory you can run the
following to serve a local webpage:

```bash
cook server
```

Then open [http://127.0.0.1:9080](http://127.0.0.1:9080) in your browser.

### Limitations

#### Dependencies

The project has [jq](https://stedolan.github.io/jq/) as a dependency. This is used to parse the
recipe files and split the filename from the filetype. Platform-specific (Windows, Linux, Mac) versions of `jq` are available.

When `make` is run in the root directory this invokes `popson.sh`,
which itself runs `jq`.

To successfully run the `make` file you need to have `jq`
installed and on your _path_. I have only tested this on Linux,
so if you run into issues please let me know.

#### Scale and Scope

This app is not written in the expectation that there will
be thousands of users. It is also not written for use-cases
where enterprises wish to store recipe information securely
and/or privately.

It is better suited for individuals or collaborators who wish
to share, document and improve recipes or methods in a free and
open-source manner.

Lastly, this also functions simply as an *idea* of what formalising recipe development and documentation might look like, especially in fields such as food science and molecular gastronomy.

### Roadmap

- [ ] More _recipes_
- [ ] *Less* _readme_
- [ ] Show info, source, pairing and tags
- [ ] Fix CSS animation for images
- [ ] Add note on images (source and representation)
- [ ] _Methods_ page
- [ ] _About_ page
- [ ] Implement _tags_
- [ ] _Style_ guide
- [ ] Clean up code
- [ ] Add diagrams to readme
- [ ] Investigate other ideas (esp. generators)
