# Media plan (Mux)

Every video on the site streams from Mux. Stills (posters, thumbnails, social images) are pulled from the same videos through Mux's image API, so you only manage one set of files. Paste each playback ID into `src/data/media.ts` (or `src/data/projects.ts` for gallery clips) and rebuild. Empty slots stay hidden, so you can add media one piece at a time.

## Upload settings

| Setting | Value | Why |
|---|---|---|
| Video quality | **basic** or **premium** | Required by the lightweight background-video engine (plus is not supported) |
| Max resolution tier | **2160p** for the hero and project film, **1080p** for the rest | The site caps phones at 720p and desktops at 1080p/1440p automatically |
| Playback policy | **public** | |
| Audio | Remove it from background loops | Smaller files. Keep audio only on the project film |

Fill in `uploadDate` (and ideally `duration`) for each clip. Google needs these for video rich results, and the site only emits VideoObject schema once they're set.

## Shot list

Shoot in 4K at 24 or 30 fps, on a gimbal or drone, with slow and steady moves. Avoid fast pans, since the loops play muted and should read as calm. Get model releases from any homeowner whose house is recognizable.

| Slot (`media.ts`) | Length | Framing | What to film |
|---|---|---|---|
| `hero` | 8 to 15 s loop | 16:9 | Slow drone push-in or orbit over a crew installing shingles or tile on a Sacramento home, late afternoon light. The left third of the frame should be quieter, because the headline sits there. |
| `heroMobile` | 8 to 15 s loop | **9:16** | Vertical cut of the same moment, so phones don't get a cropped landscape shot. |
| `projectFilm` | 60 to 120 s, with sound | 16:9 | One full replacement: walking the roof at inspection, tear-off, decking repair, underlayment, new roof going on, cleanup, a homeowner at the final walkthrough. Light music plus a short voiceover from the owner. |
| `services["roof-replacement-sacramento"]` | 8 to 12 s loop | 16:9 | Tear-off, or new shingles being nailed in a row. |
| `services["roof-repair-sacramento"]` | 8 to 12 s loop | 16:9 | Close-up of flashing being sealed around a vent or chimney, or a damaged section being replaced. |
| `services["tile-roofing-sacramento"]` | 8 to 12 s loop | 16:9 | Concrete or clay tile being set, or a slow pan across a finished tile roof. |
| `services["roof-inspections-sacramento"]` | 8 to 12 s loop | 16:9 | An inspector walking a roof and photographing a valley or vent. |
| `services["residential-roofing-sacramento"]` | 8 to 12 s loop | 16:9 | Wide drone shot of a finished home in a Sacramento neighborhood. |
| `services["commercial-roofing-sacramento"]` | 8 to 12 s loop | 16:9 | Crew on a commercial or multi-unit roof. |
| `projects` (gallery, 3 to 9 clips) | 5 to 8 s each | 4:5 vertical-ish | Finished roofs: slow reveal or orbit of each completed project. Note the city for the caption. |

Tip: in `media.ts`, `posterTime` picks which second of the video becomes the still image. Choose a sharp, well-lit frame.

## How loading stays fast

- The poster still loads first as a normal responsive WebP image (480 to 2560 px wide, picked per device), so pages paint immediately.
- The ~4 KB streaming engine only loads after the page finishes and once a video is near the screen.
- Visitors with reduced motion or data saver turned on only get the still image.
- Videos pause when scrolled out of view.
- The full Mux Player for the project film only downloads when someone presses play.
