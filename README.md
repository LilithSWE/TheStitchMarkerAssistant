# The Stitch Marker Assistant

A webservice/ application made with React and Typescript that will assist you in your
knitting and crochet endeavors.

The main feature being multiple row counters with
easy-to-read information, specific to the row you are currently on, for your various
saved projects. Type in your patterns once and see
instruction row for row as you hit the “+” button on the counter.

Link to live project: [The Stitch Marker Assistant](https://lilithswe.github.io/TheStitchMarkerAssistant/)

## Purpose

I came up with this idea while surfing around for a good knitting/ crochet app on my
phone that would cover all my needs. Patterns, row counters with only the row I'm currently at on
display, rather than the entire pattern. Being one of the easily distracted crowd, I
wished for an app that doesn’t just let me keep track of where I am, but what that row
entails without having the read half the pattern for the -umft time. When I couldn’t find
exactly what I needed, I figured I could build it myself during my degree project.

## Tech stack:

- HTML 5
- CSS 3 + Sass
- React TypeScript + Vite
- Supabase (database)

## Author

Amanda Hansson - [LilithSWE](https://github.com/LilithSWE)

## Lessons Learned

- Setting up a registration with my custom SMTP server
- Planning, designing and building a project from scratch om my own.
- Optimization of styling to minimize the amount of css needed.
- Figuring out what logic I'd like to use for the user experience to work as seemlessly as possible.
- Testing on "real clients" (volonteers) and recieving great feedback from both hobbyists and none hobbyists which lead to an improved application.
- Derivating from the original plan to focus more on adressing the feedback from the testers rather than implementing extra features works out better in the end.

## Personal Thoughts From The Programmer

I'm rather pleased with what I managed to build in 5,5 weeks. I have spent most of my time creating the database in a way that would work with my planned logic. A bit of trial and error, and 3 itterations of the database later, I managed to create a relatively easy to use system that let's the user enter patterns and connect them to the rowcounter.

Some features I would have liked to add before time ran away from me would be:

- Toggle to repeat part in rowcounter.
- Button to display notes on part in rowcounter.
- Ability to upload img connected to your patterns in patternform.

But in the end I decided to focus on the feedback I got back from my testers and adressed things such as loading animations and features like "reset my password" instead. Which I feel gave more to the webpage in the end n terms of user friendliness. I will likely add the abovementioned features in the future though if I continue to use the webpage myself.

## Screenshots

### Mobile

<img src="screenshots/mobile home.png" alt="Mobile Home" width="300">
<img src="screenshots/mobile pattern.png" alt="Mobile Pattern" width="300">
<img src="screenshots/mobile rowcounter.png" alt="Mobile Rowcounter" width="300">
<img src="screenshots/mobile pattern 2.png" alt="Mobile Pattern Landscape" width="600">
<img src="screenshots/mobile rowcounter 2.png" alt="Mobile Rowcounter Landscape" width="600">

### Tablet

<img src="screenshots/tablet home.png" alt="Tablet Home" width="400">
<img src="screenshots/tablet rowcounter.png" alt="Tablet Rowcounter" width="400">
<img src="screenshots/tablet single pattern.png" alt="Tablet Single Pattern" width="400">
<img src="screenshots/tablet edit pattern.png" alt="Tablet Edit Pattern" width="400">

### Desktop

<img src="screenshots/desktop home.png" alt="Desktop Home" width="700">
<img src="screenshots/desktop patterns.png" alt="Desktop Patterns" width="700">
<img src="screenshots/desktop settings.png" alt="Desktop Settings" width="700">
<img src="screenshots/desktop login.png" alt="Desktop Login" width="700">
