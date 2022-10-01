import { onMounted, onUnmounted } from 'vue'
import { PluginListenerHandle, Plugins } from '@capacitor/core'
import axios from 'axios'
import { useQuasar, openURL } from 'quasar'
import packageJson from '../../../../package.json'
import { useSettingsStore } from 'src/stores'

export function useCheckForUpdate(): () => void {
  const settingsStore = useSettingsStore()
  const $q = useQuasar()
  const { LocalNotifications } = Plugins
  let versionNotifHandle: PluginListenerHandle

  function checkForUpdate() {
    if (settingsStore.checkForUpdate)
      axios
        .get(
          `https://api.github.com/repos/${packageJson.author}/${packageJson.name}/releases`
        )
        .then(response => {
          const releases = response.data as GithubResponse[]
          if (
            releases &&
            releases.length &&
            // ts-ignore
            checkNewVersion(releases[0].tag_name, packageJson.version)
          ) {
            // ts-ignore
            showNotification(releases[0].tag_name)
          }
          settingsStore.checkForUpdate = false
        })
        .catch(response =>
          console.debug('Could not check for updates! Response: ', response)
        )
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

  async function showNotification(version: string) {
    if ($q.capacitor) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `New version of ${packageJson.productName} available`,
            body: `Tap to download version ${version}`,
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) },
            actionTypeId: 'NEW_VERSION'
          }
        ]
      })
    }
  }

  onMounted(() => {
    if ($q.capacitor) {
      // Check for updates
      versionNotifHandle = LocalNotifications.addListener(
        'localNotificationActionPerformed',
        n => {
          if (n.actionId === 'DOWNLOAD_NEW_VERSION')
            openURL(
              `https://github.com/${packageJson.author}/${packageJson.name}/releases`
            )
        }
      )
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
    }
  })

  onUnmounted(() => {
    versionNotifHandle?.remove()
  })

  return checkForUpdate
}

class GithubResponse {
  public tag_name!: string
}
