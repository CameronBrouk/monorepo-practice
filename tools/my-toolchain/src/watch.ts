#!/usr/bin/env node

import * as colors from 'colors'
import * as child_process from 'child_process'

console.log('Invoking my-toolchain...')

child_process.execSync('tsc --watch', { stdio: 'inherit' })

console.log(colors.green('Success!'))
