# Tech Radar

[file-issues]: https://github.com/sommerfeld-io/tech-radar/issues
[project-board]: https://github.com/orgs/sommerfeld-io/projects/1/views/1

> [!NOTE]
> The tech radar implementation (visualization, build scripts, and HTML/CSS/JS) is AI-generated. The only manual input is the data in `radar/radar.yml`, which defines the technologies, quadrants, and rings displayed in the radar.

This repository contains the technology radar for the [Sommerfeld.io](https://github.com/sommerfeld-io) GitHub organization. It provides an overview of technologies, tools, frameworks, and practices we use, assess, or have on our radar for future consideration.

- [Where to file issues][file-issues]
- [Project Board for Issues and Pull Requests][project-board]

## Usage

Build and serve the radar (starts server on <http://localhost:8080>):

```bash
task radar:run
```

## Adding a Technology

To add a new technology to the radar:

- Edit `radar/radar.yml`
- Add a new entry to the `technologies` list:

  ```yaml
    - name: "Technology Name"
      quadrant: "Languages|Tools|Platforms|Techniques"
      ring: "Adopt|Trial|Assess|Hold"
  ```

- Build the radar with above command

## Contact

Feel free to contact me via <sebastian@sommerfeld.io> or [raise an issue in this repository][file-issues].
