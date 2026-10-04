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

export async function mountBgVideo(host: HTMLElement, src: string, maxResolution = "1080p"): Promise<BgVideo> {
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
    } else {
      const { default: Hls } = await import("hls.js/light");
      if (!Hls.isSupported()) return;
      const hls = new Hls({ capLevelToPlayerSize: true, maxBufferLength: 10 });
      hls.loadSource(src);
      hls.attachMedia(v);
    }
    video = v;
    if (wantPlay) v.play().catch(() => {});
  };

  try {
    await preloadEngine();
    const el = document.createElement("mux-background-video") as MuxEl;
    el.className = "bgv";
    el.setAttribute("max-resolution", maxResolution);
    el.setAttribute("src", src);
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
