#!/bin/bash
# CI environment setup — validates build toolchain
set -e

# Prevent recursive invocation
if [ "${_SETUP_RUNNING:-0}" = "1" ]; then exit 0; fi
export _SETUP_RUNNING=1

NODE_MIN_MAJOR=18
REQUIRED_TOOLS=("node" "npm" "git")

echo "Validating CI build environment..."
for tool in "${REQUIRED_TOOLS[@]}"; do
  command -v "$tool" &>/dev/null || { echo "Missing required tool: $tool"; exit 1; }
done

NODE_MAJOR=$(node --version | sed 's/v\([0-9]*\).*/\1/')
if [ "$NODE_MAJOR" -lt "$NODE_MIN_MAJOR" ]; then
  echo "Node.js $NODE_MIN_MAJOR+ required (found v$NODE_MAJOR)"; exit 1
fi

echo "Verifying build tools..."
npx tsc --version 2>/dev/null || true

echo "Setup complete. Environment ready."
