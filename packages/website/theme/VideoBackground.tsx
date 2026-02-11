import { useEffect, useRef, useState } from 'react';
import { withBase } from '@rspress/core/runtime';

/**
 * Full-screen looping video background for the homepage hero section.
 *
 * Dark mode  → /home-bg.webm
 * Light mode → /home-bg-light.webm
 *
 * Listens for theme changes (class toggle on <html>) and swaps the source.
 */
export default function VideoBackground(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isDarkMode = () =>
    document.documentElement.classList.contains('dark');

  const [dark, setDark] = useState(true);

  useEffect(() => {
    // Sync initial state after mount (SSR-safe)
    setDark(isDarkMode());

    // Watch for theme toggles
    const observer = new MutationObserver(() => {
      setDark(isDarkMode());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Re-trigger play whenever the source changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        // Autoplay blocked – the video stays paused until user interaction.
      });
    }
  }, [dark]);

  const src = withBase(dark ? '/home-bg.webm' : '/home-bg-light.webm');

  return (
    <div className="spk-video-bg-wrap">
      <video
        ref={videoRef}
        className="spk-video-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        key={src}
      >
        <source src={src} type="video/webm" />
      </video>
    </div>
  );
}
