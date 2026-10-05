/**
 * Silent, looping background video from a Mux HLS stream.
 *
 * Tries Mux's tiny background engine first (~4 KB, needs "basic" or
 * "premium" video quality). If that hasn't started playing within a few
 * seconds or errors (for example on a "plus" quality asset), it swaps to a
 * plain <video> driven by native HLS (Safari/iOS) or hls.js light, which
 * plays every Mux quality level.
 *
 * Both elements get the class "bgv"; it gains "is-playing" once frames show.
 */

type MuxEl = HTMLElement & { video?: HTMLVideoElement };

export type BgVideo = {
  play(): void;
  pause(): void;
};

let engine: Promise<unknown> | null = null;
/** Start downloading the Mux engine early (e.g. when a section scrolls near). */
export const preloadEngine = () => (engine ??= import("@mux/mux-background-video/html"));

let hlsLib: Promise<typeof import("hls.js/light")> | null = null;
/** Start downloading the HLS player early (used by the hero so it doesn't wait). */
export const preloadHls = () => (hlsLib ??= import("hls.js/light"));

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r(null)));

/**
 * Ask Mux for only sharp renditions, highest first, so playback starts at
 * full quality instead of ramping up from a blurry low-bitrate stream.
 * (Mux playback modifiers: min_resolution, max_resolution, rendition_order.)
 */
const qualityUrl = (src: string, maxResolution: string) => {
  const url = new URL(src);
  url.searchParams.set("max_resolution", maxResolution);
  url.searchParams.set("min_resolution", parseInt(maxResolution) >= 1080 ? "1080p" : "720p");
  url.searchParams.set("rendition_order", "desc");
  return url.toString();
};

export async function mountBgVideo(
  host: HTMLElement,
  rawSrc: string,
  maxResolution = "1080p",
  opts: { plus?: boolean; startAt?: number } = {}
): Promise<BgVideo> {
  const src = qualityUrl(rawSrc, maxResolution);
  let video: HTMLVideoElement | undefined;
  let playing = false;
  let wantPlay = true;
  let fellBack = false;

  // Only fade the video in once real frames from the right point are on
  // screen. "playing" can fire before the first frame is painted, or while
  // the player is still jumping to the start position, which flickers.
  const startAt = opts.startAt ?? 0;
  const markPlaying = (el: HTMLElement) => {
    if (playing) return;
    const v = (el instanceof HTMLVideoElement ? el : (el as MuxEl).video) ?? video;
    const show = () => {
      if (playing) return;
      playing = true;
      el.classList.add("is-playing");
    };
    if (!v) return show();
    const ready = () => v.currentTime >= startAt && v.readyState >= 3;
    if (typeof v.requestVideoFrameCallback === "function") {
      const tick = () => (ready() ? v.requestVideoFrameCallback(() => show()) : v.requestVideoFrameCallback(tick));
      v.requestVideoFrameCallback(tick);
    } else {
      const onTime = () => {
        if (!ready()) return;
        v.removeEventListener("timeupdate", onTime);
        show();
      };
      v.addEventListener("timeupdate", onTime);
    }
  };

  const fallback = async (muxEl?: HTMLElement) => {
    if (playing || fellBack) return;
    fellBack = true;
    muxEl?.remove();
    const v = document.createElement("video");
    v.className = "bgv";
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.autoplay = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("disablepictureinpicture", "");
    host.append(v);
    v.addEventListener("playing", () => markPlaying(v));
    // Prefer hls.js wherever Media Source is available (Chrome, Edge, Firefox,
    // desktop Safari) so we control quality; Safari's built-in HLS player
    // picks its own rendition and tends to stay low on short loops.
    const { default: Hls } = await preloadHls();
    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: false,
        abrEwmaDefaultEstimate: 20_000_000,
        testBandwidth: false,
        maxBufferLength: 30,
        startFragPrefetch: true,
        startPosition: opts.startAt ?? -1,
      });
      hls.on(Hls.Events.MANIFEST_PARSED, (_e, data) => {
        // Levels are sorted low to high. Lock to the sharpest one: these are
        // short silent loops, so there's no reason to ever drop quality.
        // (loadLevel, not currentLevel: setting currentLevel flushes the
        // buffer and reloads, which flickers right as playback starts.)
        const top = data.levels.length - 1;
        hls.startLevel = top;
        hls.loadLevel = top;
        if (wantPlay) v.play().catch(() => {});
      });
      // If Mux rejects the quality modifiers, fall back to the plain stream.
      let retried = false;
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (!data.fatal) return;
        if (!retried) {
          retried = true;
          hls.loadSource(rawSrc);
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls.recoverMediaError();
        }
      });
      hls.loadSource(src);
      hls.attachMedia(v);
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
      // Older iPhones: native HLS. rendition_order=desc makes it start on the sharpest version.
      v.src = src;
      if (opts.startAt) v.addEventListener("loadedmetadata", () => (v.currentTime = opts.startAt!), { once: true });
      v.addEventListener("error", () => { if (v.src !== rawSrc) { v.src = rawSrc; if (wantPlay) v.play().catch(() => {}); } }, { once: true });
    }
    video = v;
    if (wantPlay) v.play().catch(() => {});
  };

  try {
    if (opts.plus) throw new Error("plus quality: use the HLS player directly");
    await preloadEngine();
    const el = document.createElement("mux-background-video") as MuxEl;
    el.className = "bgv";
    el.setAttribute("max-resolution", maxResolution);
    el.setAttribute("src", rawSrc); // the Mux engine picks the sharpest rendition itself
    host.append(el);
    await nextFrame();
    video = el.video;
    video?.addEventListener("playing", () => markPlaying(el));
    video?.addEventListener("error", () => fallback(el), { once: true });
    // If nothing is playing shortly after we asked it to, switch players.
    window.setTimeout(() => wantPlay && fallback(el), 2500);
  } catch {
    await fallback();
  }

  return {
    play() {
      wantPlay = true;
      video?.play().catch(() => {});
    },
    pause() {
      wantPlay = false;
      video?.pause();
    },
  };
}
