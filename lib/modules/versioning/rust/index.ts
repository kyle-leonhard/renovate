import { RegExpVersioningApi } from '../regex';
import type { VersioningApi } from '../types';

export const id = 'rust';
export const displayName = 'Rust';
export const urls = [
  'https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file',
];
export const supportsRanges = false;

export class RustVersioningApi extends RegExpVersioningApi {
  // Format described in https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file
  // Examples: 1.82.1, 1.82
  private static readonly versionRegex =
    '^(?<major>\\d+)\\.(?<minor>\\d+)(\\.(?<patch>\\d+))?$';

  public constructor() {
    super(RustVersioningApi.versionRegex);
  }
}

export const api: VersioningApi = new RustVersioningApi();

export default api;
