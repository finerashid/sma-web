# Gallery content folder

Every immediate folder inside this directory becomes one visible gallery album.
The folder name is displayed exactly as the album heading, and supported images
inside that folder appear under it.

Supported extensions: `.avif`, `.gif`, `.jpeg`, `.jpg`, `.png`, `.webp`.

Example:

```text
public/gallery/
├── Campus/
│   ├── college-entrance.webp
│   └── campus-night.webp
└── Yoga Day 2026/
    ├── morning-session.jpg
    └── student-demonstration.jpg
```

The website will show the album headings `Campus` and `Yoga Day 2026`. Image
captions and accessible alternative text are generated from filenames.

After adding, removing or renaming folders or images, commit the change and
redeploy the website on Vercel. The gallery is generated during the build.
