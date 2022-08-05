import { red } from 'kolorist'

import { createApp, updateApp } from './app'
import { cwdContainsPkg } from './libs/npm'
import { logStep, promptForDirectory, promptForName } from './libs/prompt'

async function run() {
  try {
    const pkgFound = await cwdContainsPkg()

    if (pkgFound) {
      logStep('Found `package.json` in the current directory, the existing app will be updated.')

      await updateApp()
    } else {
      const name = await promptForName()
      const path = await promptForDirectory(name)

      await createApp(name, path)
    }
  } catch (error) {
    const isError = error instanceof Error

    console.error(red(`\nSomething went wrong: ${isError ? error.message : error}`))

    if (isError && error.cause) {
      console.error(error.cause)
    }

    process.exit(1)
  }
}

run()
