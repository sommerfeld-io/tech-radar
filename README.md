# Tech Radar

[file-issues]: https://github.com/sommerfeld-io/tech-radar/issues
[project-board]: https://github.com/orgs/sommerfeld-io/projects/1/views/1

The technology radar for the [Sommerfeld.io](https://github.com/sommerfeld-io) GitHub organization. It provides an overview of technologies, tools, frameworks, and practices we use, assess, or have on our radar for future consideration.

- [sommerfeldio/tech-radar](https://hub.docker.com/r/sommerfeldio/tech-radar) on Docker Hub
- [GitHub Repository](https://github.com/sommerfeld-io/tech-radar)
- [How to Contribute](https://github.com/sommerfeld-io/.github/blob/main/CONTRIBUTING.md)
- [Where to file issues][file-issues]
- [Project Board for Issues and Pull Requests][project-board]

> [!NOTE]
> The tech radar implementation (visualization, build scripts, and HTML/CSS/JS) is AI-generated.

## Software Tags and Versioning

Learn about our tagging policy and the difference between rolling tags and immutable tags [on our documentation page⁠](https://github.com/sommerfeld-io/.github/blob/main/docs/tags-and-versions.md).

## How to use

To run the image as-is with the default radar configuration (which contains the technologies we use at [Sommerfeld.io](https://github.com/sommerfeld-io)), execute:

```bash
docker run --rm -it -p 8000:80 sommerfeldio/tech-radar:latest
```

## How to use with custom configuration

The image comes in two variants:

- The `latest` variant serves the radar using a pre-bundled `radar-data.json` file or a mounted `radar-data.json` file
- The `latest-yaml2json` variant is a tool to convert a `radar.yml` configuration file into the required `radar-data.json` format.

To use a custom radar configuration, create a `radar.yml` file and populate it with your desired configuration.

```yaml
---
title: "Tech Radar"
description: Your Technology Radar
copyright: "Copyright © sommerfeld.io" # optional
githubUrl: "https://github.com/<your-org>/<your-repo>" # optional

quadrants:
  - name: "Languages, Frameworks and Tooling"
    color: "#8e7cc3"
    description: "Programming languages, frameworks, and libraries we use to build software"
  - name: "Development and Delivery Practices"
    color: "#6fa8dc"
    description: "Methodologies, practices, and approaches for software development and delivery"
  - name: "Platforms"
    color: "#93c47d"
    description: "Infrastructure platforms, cloud services, and deployment environments"
  - name: "Infrastructure"
    color: "#f6b26b"
    description: "Tools, automation, and infrastructure management solutions"

rings:
  - name: "Adopt"
    description: "Technologies we have high confidence in and use in production"
    color: "#6fae5e"
  - name: "Trial"
    description: "Technologies worth pursuing, being used successfully in some projects"
    color: "#d4b636"
  - name: "Assess"
    description: "Technologies worth exploring to understand their potential"
    color: "#e89850"
  - name: "Hold"
    description: "Technologies to proceed with caution or phase out"
    color: "#c76b6b"

technologies:
  - name: "Grafana k6"
    quadrant: "Infrastructure"
    ring: "Assess"
  - name: "Arch Linux"
    quadrant: "Platforms"
    ring: "Adopt"
  - name: "TDD"
    quadrant: "Development and Delivery Practices"
    ring: "Trial"
  - name: "Java"
    quadrant: "Languages, Frameworks and Tooling"
    ring: "Hold"
```

Transform the `radar.yml` file into JSON by running the following command in the folder where the `radar.yml` file is located:

```bash
docker run --rm -it -u "$(id -u):$(id -g)" \
  --volume "$(pwd)/radar.yml:/src/radar/radar.yml" \
  --volume "$(pwd):/src/radar/public" \
  sommerfeldio/tech-radar:latest-yaml2json
```

Mount the generated `radar-data.json` file into the container to run the radar with your custom configuration:

```bash
docker run --rm -it --volume "$(pwd)/radar-data.json:/usr/share/nginx/html/radar-data.json" -p 8000:80 sommerfeldio/tech-radar:latest
```

## Run locally from source

Build and serve the radar (starts server on <http://localhost:8080>):

```bash
task radar:run
```

## Contact

Feel free to contact me via <sebastian@sommerfeld.io> or [raise an issue in this repository][file-issues].
