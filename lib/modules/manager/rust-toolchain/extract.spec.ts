import { extractPackageFile } from '.';

describe('modules/manager/rust-toolchain/extract', () => {
  describe('extractPackageFile()', () => {
    it('returns result when fully qualified version is set', () => {
      const res = extractPackageFile(`
        [toolchain]
        components = [ "rustfmt", "rustc-dev" ]
        channel = "1.82.0"
        targets = [ "wasm32-unknown-unknown", "thumbv2-none-eabi" ]
        profile = "minimal"`);
      expect(res.deps).toEqual([
        {
          currentValue: '1.82.0',
          datasource: 'github-releases',
          depName: 'rust',
          packageName: 'rust-lang/rust',
        },
      ]);
    });

    it('returns result when major.minor version is set', () => {
      const res = extractPackageFile(`
        [toolchain]
        components = [ "rustfmt", "rustc-dev" ]
        channel = "1.82"`);
      expect(res.deps).toEqual([
        {
          currentValue: '1.82',
          datasource: 'github-releases',
          depName: 'rust',
          packageName: 'rust-lang/rust',
        },
      ]);
    });

    it('returns all deps when multiple channels are set', () => {
      const res = extractPackageFile(`
        [toolchain]
        components = [ "rustfmt", "rustc-dev" ]
        channel = "1.83"
        channel = "1.82"`);
      expect(res.deps).toEqual([
        {
          currentValue: '1.83',
          datasource: 'github-releases',
          depName: 'rust',
          packageName: 'rust-lang/rust',
        },
        {
          currentValue: '1.82',
          datasource: 'github-releases',
          depName: 'rust',
          packageName: 'rust-lang/rust',
        },
      ]);
    });

    it('returns result when stable release channel is set', () => {
      const res = extractPackageFile(`
        [toolchain]
        components = [ "rustfmt", "rustc-dev" ]
        channel = "stable"`);
      expect(res.deps).toEqual([
        {
          currentValue: 'stable',
          datasource: 'github-releases',
          depName: 'rust',
          packageName: 'rust-lang/rust',
        },
      ]);
    });

    it('returns result when channel with named release set', () => {
      const res = extractPackageFile(`
        [toolchain]
        components = [ "rustfmt", "rustc-dev" ]
        channel = "nightly-2020-07-10"
        targets = [ "wasm32-unknown-unknown", "thumbv2-none-eabi" ]
        profile = "minimal"`);
      expect(res.deps).toEqual([
        {
          currentValue: 'nightly-2020-07-10',
          datasource: 'github-releases',
          depName: 'rust',
          packageName: 'rust-lang/rust',
        },
      ]);
    });

    it('returns result when channel with prerelease set', () => {
      const res = extractPackageFile(`
        [toolchain]
        components = [ "rustfmt", "rustc-dev" ]
        channel = "1.82.0-beta.1"
        targets = [ "wasm32-unknown-unknown", "thumbv2-none-eabi" ]
        profile = "minimal"`);
      expect(res.deps).toEqual([
        {
          currentValue: '1.82.0-beta.1',
          datasource: 'github-releases',
          depName: 'rust',
          packageName: 'rust-lang/rust',
        },
      ]);
    });

    it('returns empty when no channel entry is present', () => {
      const res = extractPackageFile(`
        [toolchain]
        components = [ "rustfmt", "rustc-dev" ]
        targets = [ "wasm32-unknown-unknown", "thumbv2-none-eabi" ]
        profile = "minimal"`);
      expect(res.deps).toEqual([]);
    });
  });
});
