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

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r(null)));

/**
 * Ask Mux for only sharp renditions, highest first, so playback starts at
 * full quality instead of ramping up from a blurry low-bitrate stream.
 * (Mux playback modifiers: min_resolution, max_resolution, rendition_order.)
 */
const qualityUrl = (src: string, maxResolution: string) => {
  const url = new URL(src);
  url.searchParams.set("max_resolution", maxResolution);
  url.searchParams.set("min_resolution", parseInt(maxResolution) >= 1080 ? "720p" : "540p");
  url.searchParams.set("rendition_order", "desc");
  return url.toString();
};

export async function mountBgVideo(
  host: HTMLElement,
  rawSrc: string,
  maxResolution = "1080p",
  opts: { plus?: boolean } = {}
): Promise<BgVideo> {
  const src = qualityUrl(rawSrc, maxResolution);
  let video: HTMLVideoElement | undefined;
  let playing = false;
  let wantPlay = true;
  let fellBack = false;

  const markPlaying = (el: HTMLElement) => {
    playing = true;
    el.classList.add("is-playing");
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
    if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = src;
      // If Mux rejects the quality modifiers, retry the plain stream once.
      v.addEventListener("error", () => { if (v.src !== rawSrc) { v.src = rawSrc; if (wantPlay) v.play().catch(() => {}); } }, { once: true });
    } else {
      const { default: Hls } = await import("hls.js/light");
      if (!Hls.isSupported()) return;
      const hls = new Hls({
        // Assume a fast connection so the first segment is already sharp,
        // then let normal adaptive switching take over.
        abrEwmaDefaultEstimate: 12_000_000,
        testBandwidth: false,
        capLevelToPlayerSize: true,
        maxBufferLength: 12,
      });
      hls.on(Hls.Events.MANIFEST_PARSED, (_e, data) => {
        hls.startLevel = data.levels.length - 1; // levels are sorted low to high
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
