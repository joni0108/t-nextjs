//@ts-nocheck
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useViewport } from './useViewport';

describe('useViewport', () => {
    let originalWindow: any;
    
  beforeEach(() => {
    if(typeof window === "undefined") {
        originalWindow = global.window;
        global.window = {
            innerWidth: 1024,
            innerHeight: 768,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        };
    }

    // Set initial window size
    window.innerWidth = 1024;
    window.innerHeight = 768;

    // Dispatch a resize event
    window.dispatchEvent(new Event('resize'));
  });

  afterEach(() => {
    if(typeof window === "undefined") {
        originalWindow = global.window;
        global.window = {
            innerWidth: 1024,
            innerHeight: 768,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        };
    }

    // Dispatch a resize event
    window.dispatchEvent(new Event('resize'));
  });

  it('should return the correct initial viewport dimensions', () => {
    const { result } = renderHook(() => useViewport());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should update dimensions on window resize', () => {
    const { result } = renderHook(() => useViewport());

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });
});
