import { describe, expect, it } from 'bun:test';
import { tailwind } from '../src/index';

describe('@manicjs/tailwind', () => {
  it('returns plugin descriptor', () => {
    const plugin = tailwind();
    expect(plugin.name).toBe('@manicjs/tailwind');
  });
});
