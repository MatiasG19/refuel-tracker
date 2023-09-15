import { onMounted, onUnmounted } from 'vue'
import { PluginListenerHandle } from '@capacitor/core'
import {
  LocalNotifications,
  ActionPerformed
} from '@capacitor/local-notifications'
import axios from 'axios'
import { openURL } from 'quasar'
import packageJson from '../../../../package.json'
import { db } from 'src/boot/dexie'

export function useCheckForUpdate(): () => Promise<void> {
  let versionNotifHandle: PluginListenerHandle

  async function checkForUpdate() {
    if (await checkInterval())
      axios
        .get(
          `https://api.github.com/repos/${packageJson.author}/${packageJson.name}/releases`
        )
        .then(response => {
          const releases = response.data as GithubResponse[]
          if (
            releases &&
            releases.length &&
            checkNewVersion(releases[0].tag_name, packageJson.version)
          ) {
            registerDownloadActionListener(releases[0].tag_name)
            showNotification(releases[0].tag_name)
          }
        })
        .catch(response =>
          console.debug('Could not check for updates! Response: ', response)
        )
    setLastUpdateInDb()
  }

  function checkNewVersion(
    versionFromApi: string,
    currentVersion: string
  ): boolean {
    const newVersionArray = versionFromApi.replace('v', '').split('.')
    const currentVersionArray = currentVersion.replace('v', '').split('.')
    if (newVersionArray.length !== currentVersionArray.length) return false

    for (let i = 0; i < 3; i++) {
      if (Number(newVersionArray[i]) > Number(currentVersionArray[i]))
        return true
    }
    return false
  }

  async function checkInterval(): Promise<boolean> {
    const lastUpdate = await getLastUpdateFromDb()

    const diffTime = new Date(Date.now()).getTime() - lastUpdate.getTime()

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays >= 7) return true
    return false
  }

  async function getLastUpdateFromDb(): Promise<Date> {
    const settings = await db.settings.toArray()
    return settings[0].lastUpdateCheck
  }

  async function setLastUpdateInDb() {
    const settings = await db.settings.toArray()
    settings[0].lastUpdateCheck = new Date(Date.now())
    await db.settings.put(settings[0])
  }

  async function showNotification(version: string) {
    const status = await LocalNotifications.checkPermissions()
    LocalNotifications.requestPermissions()
    if (status.display !== 'granted') LocalNotifications.requestPermissions()
    await LocalNotifications.schedule({
      notifications: [
        {
          title: `New version of ${packageJson.productName} available`,
          body: `Tap to download version ${version}`,
          id: 1,
          schedule: { at: new Date(Date.now() + 100) },
          actionTypeId: 'NEW_VERSION'
        }
      ]
    })
  }

  function registerDownloadActionListener(version: string) {
    versionNotifHandle = LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (n: ActionPerformed) => {
        if (n.actionId === 'DOWNLOAD_NEW_VERSION')
          openURL(
            `https://github.com/${packageJson.author}/${packageJson.name}/releases/download/${version}/${packageJson.name}-${version}.apk`
          )
      }
    )
  }

  onMounted(() => {
    LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'NEW_VERSION',
          actions: [
            {
              id: 'DOWNLOAD_NEW_VERSION',
              title: 'Download',
              foreground: true
            }
          ]
        }
      ]
    })
  })

  onUnmounted(() => {
    versionNotifHandle?.remove()
  })

  return checkForUpdate
}

class GithubResponse {
  public tag_name!: string
}
