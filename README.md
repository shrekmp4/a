# 🌱 goGreen 

With **goGreen**, you can make your profile look like you've been hard at work... even if you haven't. 
NodeJs script to make commits to the past (or the future) to go green on GitHub.

## About

**goGreen** helps you create commits on your GitHub profile for any date in the past. Whether you want to fill up your contribution graph or even make cool patterns and artwork.

## Getting Started

Follow these steps to bring your contribution graph to life:

1. **Clone this repository**
```bash
git clone https://github.com/shrekmp4/a.git
cd a
```

2. **Set up your project**
Initialize a new Node.js project:
```bash
npm init -y
```

3. **Install the required npm modules**
You'll need a few modules to get everything running smoothly. Install them all with:
```bash
npm install moment simple-git random jsonfile
```

4. **Use the CommitManager**
```bash
# Hacer commits de prueba
node commitManager.js

# Usar el ejemplo con diferentes opciones
node example.js --demo
node example.js --generate 10
node example.js --range
```

## Features

- **CommitManager Class**: Advanced commit management with JSON storage
- **Custom Patterns**: Create patterns on your contribution graph
- **Date Range Support**: Generate commits for specific date ranges
- **Statistics**: Track and analyze your commit patterns
- **Flexible API**: Easy to use and extend

## Room for Improvement

So, you've got the basics down. What's next?

- **Custom Patterns:** Experiment with different patterns on your contribution graph. Maybe spell out your name or create some cool designs.
- **Density Control:** Play around with the number of commits per day to adjust the shades of green.
- **Input Strings:** Convert input strings to X-Y mapped contributions.

## npm Modules Used

- [`moment`](https://www.npmjs.com/package/moment) - Handles date and time manipulation.
- [`simple-git`](https://www.npmjs.com/package/simple-git) - For easy Git commands.
- [`random`](https://www.npmjs.com/package/random) - To generate random numbers for the commits.
- [`jsonfile`](https://www.npmjs.com/package/jsonfile) - For JSON file operations.

## Credits

Huge thanks to [Akshay Saini](https://github.com/akshaymarch7) for the original video behind this project.
