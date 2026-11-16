/** The same named destination used to verify the published travel distances. */
export function campusDirectionsUrl(origin?: string) {
  const params = new URLSearchParams({
    api: "1",
    destination: "SMA Medical College Parwaliya Sadak Bhopal",
    travelmode: "driving",
  });
  if (origin) params.set("origin", origin);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
