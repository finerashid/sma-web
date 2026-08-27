import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { imageAltFromFilename, scanGalleryDirectory } from "../lib/gallery-core.mjs";

test("uses the exact folder name as the album name and groups its images", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sma-gallery-"));
  try {
    const album = path.join(root, "Yoga Day 2026");
    fs.mkdirSync(album);
    fs.writeFileSync(path.join(album, "student-demonstration.jpg"), "fixture");
    fs.writeFileSync(path.join(album, "notes.txt"), "ignored");

    const result = scanGalleryDirectory(root);
    assert.equal(result.length, 1);
    assert.equal(result[0].name, "Yoga Day 2026");
    assert.equal(result[0].images.length, 1);
    assert.equal(result[0].images[0].alt, "Student Demonstration");
    assert.equal(result[0].images[0].src, "/gallery/Yoga%20Day%202026/student-demonstration.jpg");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("sorts albums and images naturally", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sma-gallery-"));
  try {
    for (const name of ["Album 10", "Album 2"]) {
      fs.mkdirSync(path.join(root, name));
      fs.writeFileSync(path.join(root, name, "photo-10.webp"), "fixture");
      fs.writeFileSync(path.join(root, name, "photo-2.webp"), "fixture");
    }

    const result = scanGalleryDirectory(root);
    assert.deepEqual(result.map((album) => album.name), ["Album 2", "Album 10"]);
    assert.deepEqual(result[0].images.map((image) => image.filename), ["photo-2.webp", "photo-10.webp"]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("returns a readable caption from an image filename", () => {
  assert.equal(imageAltFromFilename("high-angle_campus-view.webp"), "High Angle Campus View");
});
