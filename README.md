# Tauqeer Ahmed - Engineering Portfolio

[![Live portfolio](https://img.shields.io/badge/Live_Portfolio-View_site-ff6b35?style=for-the-badge&logo=githubpages&logoColor=white)](https://taukhir.github.io/portfolio/)
[![Deploy portfolio to GitHub Pages](https://github.com/taukhir/portfolio/actions/workflows/pages.yml/badge.svg)](https://github.com/taukhir/portfolio/actions/workflows/pages.yml)

A responsive engineering portfolio for **Tauqeer Ahmed**, a Lead Backend
Engineer specializing in Java, Spring Boot, microservices, Kafka, Kubernetes,
cloud platforms, and enterprise system design.

The site presents:

- Professional summary and engineering impact
- Career experience across Nagarro, HCLTech, Morgan Stanley, Optum, and Tecnotree
- ShopVerse microservices architecture and project details
- Backend, cloud, data, observability, quality, and leadership skills
- Engineering principles, working style, resume, and contact links

## Live Site

**Portfolio:** [https://taukhir.github.io/portfolio/](https://taukhir.github.io/portfolio/)

## How the Portfolio Works

This is a dependency-free static website:

1. `index.html` contains the content, semantic page structure, metadata, and
   accessible navigation.
2. `styles.css` provides the responsive layout, visual system, animations,
   themes, and mobile navigation.
3. `script.js` adds progressive enhancements such as theme and font controls,
   reveal animations, project interactions, and contact utilities.
4. Files in `assets/` are served directly by GitHub Pages.
5. Browser preferences are stored in `localStorage`, so the selected theme and
   font remain active on later visits.

No framework, package manager, application server, database, or build step is
required. GitHub Pages serves the repository files directly over HTTPS.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- GitHub Actions
- GitHub Pages

## Repository Structure

```text
portfolio/
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- assets/
|   |-- shopverse-architecture-flow.svg
|   `-- Tauqeer-Ahmed-Resume.pdf
|-- .nojekyll
|-- favicon.svg
|-- index.html
|-- robots.txt
|-- script.js
|-- sitemap.xml
|-- styles.css
`-- README.md
```

`.nojekyll` tells GitHub Pages to publish the files as they are without Jekyll
processing.

## Run Locally

The simplest option is to open `index.html` in a browser.

For behavior that works best over HTTP, start a local static server from the
repository:

```powershell
cd "D:\BE Projects\portfolio"
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## GitHub Pages Deployment

The deployment is defined in
[`pages.yml`](.github/workflows/pages.yml). It runs whenever code is pushed to
the `master` branch and can also be started manually.

### Initial GitHub setup

1. Create the public repository `taukhir/portfolio`.
2. Push the project to the `master` branch:

   ```powershell
   cd "D:\BE Projects\portfolio"
   git init
   git add .
   git commit -m "Create engineering portfolio"
   git branch -M master
   git remote add origin https://github.com/taukhir/portfolio.git
   git push -u origin master
   ```

3. On GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the **Actions** tab and confirm that
   **Deploy portfolio to GitHub Pages** completes successfully.
6. Visit `https://taukhir.github.io/portfolio/`.

### What the workflow does

On each push to `master`, GitHub Actions:

1. Checks out the repository.
2. Configures the GitHub Pages environment.
3. Uploads the repository as a static Pages artifact.
4. Deploys the artifact to GitHub Pages.

The workflow uses only the permissions needed to read the repository and
publish to Pages. Concurrent deployments are grouped so a newer deployment can
replace an older in-progress run.

### Publish future updates

```powershell
cd "D:\BE Projects\portfolio"
git add .
git commit -m "Update portfolio"
git push
```

The push starts the deployment automatically. Deployment progress is available
on the repository's
[Actions page](https://github.com/taukhir/portfolio/actions).

## Updating Portfolio Content

- Edit professional content and links in `index.html`.
- Update visual styles and responsive behavior in `styles.css`.
- Update interactive behavior in `script.js`.
- Replace the resume while keeping
  `assets/Tauqeer-Ahmed-Resume.pdf` unchanged, or update every reference to the
  new filename.
- Keep the canonical URL, Open Graph URL, profile README, and contact links in
  sync when the public URL changes.

## Verification Checklist

Before publishing:

- Confirm every local `href` and `src` points to an existing file or section.
- Check desktop and mobile layouts.
- Test navigation, theme controls, resume links, and contact actions.
- Run `node --check script.js`.
- Confirm the GitHub Actions deployment succeeds.
- Open the live URL and check the browser console for errors.

## Related Repositories

- [GitHub profile repository](https://github.com/taukhir/taukhir)
- [ShopVerse microservices platform](https://github.com/taukhir/shopverse)

## Contact

- **Email:** [ahmedtaukhir@gmail.com](mailto:ahmedtaukhir@gmail.com)
- **LinkedIn:** [tauqeer-ahmed-379803173](https://www.linkedin.com/in/tauqeer-ahmed-379803173)
- **GitHub:** [github.com/taukhir](https://github.com/taukhir)
