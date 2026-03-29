# Dependency Notes

## Legacy Peer Dependencies

We are currently using `legacy-peer-deps=true` in `.npmrc` to work around a peer dependency conflict between:
- `eslint@10.1.0` (newest version)
- `eslint-plugin-react-hooks@7.0.1` (requires eslint@^9.0.0 or lower)

### Why This Is Needed

The `eslint-plugin-react-hooks` package version 7.0.1 does not yet support eslint 10.x. Using `legacy-peer-deps` allows us to keep the newest versions of eslint and vitest while working around this peer dependency conflict.

### Action Items

- [ ] Check for new versions of `eslint-plugin-react-hooks` that support eslint 10.x
- [ ] When available, update `eslint-plugin-react-hooks` to the newest version
- [ ] Remove `legacy-peer-deps=true` from `.npmrc` once the peer dependency conflict is resolved
- [ ] Test that the build still works without the legacy flag

### Current Versions

- `eslint`: `^10.1.0` (newest)
- `vitest`: `^3.2.4` (newest)
- `eslint-plugin-react-hooks`: `^7.0.1` (latest, but doesn't support eslint 10.x)

### Related Files

- `.npmrc` - Contains `legacy-peer-deps=true`
- `package.json` - Contains the dependency versions
- `netlify.toml` - Build configuration
