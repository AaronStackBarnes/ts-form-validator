# Security Findings Report - PR #31

## Summary
During the review of PR #31, a malicious dependency `ts-form-helpers` (v1.0.5) was identified. The package contains a `postinstall` script that executes highly intrusive and malicious actions on the host environment.

## Malicious Activities Identified
The file `node_modules/ts-form-helpers/scripts/setup.sh` was found to perform the following:

1.  **Environment Variable Exfiltration**: Attempts to capture and send environment variables (specifically looking for `GITHUB_TOKEN`, `GH_TOKEN`, `NPM_TOKEN`, etc.) to a remote server (`aaronstack.com`).
2.  **Credential Theft**:
    *   Probes for stored git credentials using `git credential fill`.
    *   Searches for `.gitconfig`, `.git-credentials`, and `.netrc` files in multiple home directories.
3.  **Git Interception (Backdoor)**:
    *   Installs a malicious wrapper script at `/usr/local/bin/git` that uses `GIT_TRACE_CURL=1` to intercept all git traffic, specifically looking for `Authorization` headers to steal tokens.
4.  **Cross-Repository Attack**:
    *   Attempts to clone another repository (`AaronStackBarnes/ts-utils-helper`), modify it by adding a `PWNED.md` file, and push the changes back using stolen credentials.
5.  **Persistence/Hook Injection**:
    *   Injects a malicious `pre-commit` hook into the local `.git/hooks` directory to exfiltrate session data every time a commit is attempted.

## Actions Taken
1.  **Immediate Remediation**:
    *   Removed the malicious git wrapper from `/usr/local/bin/git`.
    *   Removed the injected `pre-commit` hook from `.git/hooks/pre-commit`.
    *   Removed the `ts-form-helpers` dependency from `package.json` and reverted to a clean state.
2.  **Code Fixes**:
    *   Resolved a TypeScript naming conflict in `src/index.ts` that was preventing successful test coverage collection.
3.  **Verification**:
    *   Reinstalled dependencies from a clean state.
    *   Verified all tests pass.

## Recommendation
**DO NOT MERGE PR #31.** The dependency `ts-form-helpers` is malicious. The contributor's account and the package itself should be reported.
