import { useEffect, useRef, useState } from 'react';
import type { Segment } from '../backend';
import { Loader2 } from 'lucide-react';

interface SnakeCanvasProps {
  segments: Segment[];
  isLoading: boolean;
}

export function SnakeCanvas({ segments, isLoading }: SnakeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle canvas resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = Math.min(600, Math.max(400, width * 0.6));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Snake animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const segmentLength = segments.length || 5; // Minimum 5 segments for visual appeal
    const segmentSize = 16;
    const segmentSpacing = 4;

    const animate = () => {
      timeRef.current += 0.02;
      const time = timeRef.current;

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
      gradient.addColorStop(0, 'oklch(0.98 0.02 160)');
      gradient.addColorStop(0.5, 'oklch(0.96 0.03 180)');
      gradient.addColorStop(1, 'oklch(0.94 0.04 200)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw grid pattern
      ctx.strokeStyle = 'oklch(0.9 0.01 180 / 0.3)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Calculate snake path using sine wave
      const centerY = dimensions.height / 2;
      const amplitude = dimensions.height * 0.25;
      const frequency = 0.015;
      const speed = 50;

      // Draw snake segments
      for (let i = 0; i < segmentLength; i++) {
        const offset = i * (segmentSize + segmentSpacing);
        const x = ((time * speed - offset) % (dimensions.width + 200)) - 100;
        const y = centerY + Math.sin((x + offset) * frequency) * amplitude;

        // Skip if off screen
        if (x < -segmentSize || x > dimensions.width + segmentSize) continue;

        // Calculate color based on position (gradient from head to tail)
        const hue = 160 + (i / segmentLength) * 20; // Green to teal
        const lightness = 0.55 - (i / segmentLength) * 0.15;
        const chroma = 0.15 + (i / segmentLength) * 0.05;

        // Draw segment shadow
        ctx.fillStyle = 'oklch(0.3 0.05 160 / 0.2)';
        ctx.beginPath();
        ctx.arc(x + 2, y + 2, segmentSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw segment with gradient
        const segmentGradient = ctx.createRadialGradient(x, y, 0, x, y, segmentSize / 2);
        segmentGradient.addColorStop(0, `oklch(${lightness + 0.1} ${chroma} ${hue})`);
        segmentGradient.addColorStop(1, `oklch(${lightness} ${chroma} ${hue})`);
        ctx.fillStyle = segmentGradient;
        ctx.beginPath();
        ctx.arc(x, y, segmentSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw segment border
        ctx.strokeStyle = `oklch(${lightness - 0.1} ${chroma + 0.05} ${hue})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw highlight
        ctx.fillStyle = 'oklch(0.95 0.02 160 / 0.4)';
        ctx.beginPath();
        ctx.arc(x - segmentSize / 4, y - segmentSize / 4, segmentSize / 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw eyes on the head (first segment)
        if (i === 0) {
          const eyeSize = 3;
          const eyeOffset = 5;
          ctx.fillStyle = 'oklch(0.2 0.05 160)';
          ctx.beginPath();
          ctx.arc(x - eyeOffset, y - 3, eyeSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + eyeOffset, y - 3, eyeSize, 0, Math.PI * 2);
          ctx.fill();

          // Eye highlights
          ctx.fillStyle = 'oklch(0.95 0.02 160)';
          ctx.beginPath();
          ctx.arc(x - eyeOffset + 1, y - 4, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + eyeOffset + 1, y - 4, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [segments, dimensions]);

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-auto"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium">Loading snake data...</span>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-emerald-200/50 dark:border-emerald-800/30">
        <p className="text-sm font-medium text-foreground">
          Snake Length: <span className="text-emerald-600 dark:text-emerald-400">{segments.length}</span> segments
        </p>
      </div>
    </div>
  );
}
