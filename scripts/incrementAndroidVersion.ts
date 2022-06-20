import expoConfig from '../app.json'
import appConfig from '../package.json'
import fs from 'fs'
import path from 'path'
import * as semver from 'semver'

async function updateVersion() {
    const version = semver.parse(appConfig.version)!
    version.inc('patch')

    expoConfig.expo.version = version.format()
    expoConfig.expo.android.versionCode = version.patch

    appConfig.version = version.format()

    const appConfigFilePath = path.join(__dirname, '..', 'package.json')
    fs.writeFileSync(appConfigFilePath, JSON.stringify(appConfig, null, 2))

    const expoConfigFilePath = path.join(__dirname, '..', 'app.json')
    fs.writeFileSync(expoConfigFilePath, JSON.stringify(expoConfig, null, 2))
}

updateVersion()
