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

## Usage

```bash
docker run --rm -it -p 8000:80 tech-radar:latest
```

## Software Tags and Versioning

Learn about our tagging policy and the difference between rolling tags and immutable tags [on our documentation page⁠](https://github.com/sommerfeld-io/.github/blob/main/docs/tags-and-versions.md).

## Run locally from source

Build and serve the radar (starts server on <http://localhost:8080>):

```bash
task radar:run
```

### Adding a Technology

To add a new technology to the radar:

- Edit `radar/radar.yml`
- Add a new entry to the `technologies` list:

  ```yaml
    - name: "Technology Name"
      quadrant: "Languages|Tools|Platforms|Techniques"
      ring: "Adopt|Trial|Assess|Hold"
  ```

## Contact

Feel free to contact me via <sebastian@sommerfeld.io> or [raise an issue in this repository][file-issues].
