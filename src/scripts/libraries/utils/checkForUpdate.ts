import { onMounted, onUnmounted } from 'vue'
import { PluginListenerHandle, Plugins } from '@capacitor/core'
import axios from 'axios'
import { openURL } from 'quasar'
import packageJson from '../../../../package.json'
const { LocalNotifications } = Plugins

export function useCheckForUpdate(): () => void {
  let versionNotifHandle: PluginListenerHandle

  function checkForUpdate() {
    axios
      .get(
        // `https://api.github.com/repos/${packageJson.author}/${packageJson.name}/releases`
        `https://api.github.com/repos/octokit/request.js/releases`
      )
      .then(response => {
        const releases = response.data as GithubResponse[]
        if (
          releases &&
          releases.length &&
          // ts-ignore
          checkNewVersion(releases[0].tag_name, packageJson.version)
        )
          // ts-ignore
          showNotification(releases[0].tag_name)
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

    for (let i = 0; i < currentVersion.length; i++) {
      if (Number(newVersionArray[i]) > Number(currentVersionArray[i]))
        return true
    }
    return false
  }

  async function showNotification(version: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: `New Version of ${packageJson.productName} available`,
          body: `Tap to download version ${version}`,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 3) }, // 3s delay
          actionTypeId: 'NEW_VERSION'
        }
      ]
    })
  }

  onMounted(() => {
    // Check for updates
    versionNotifHandle = LocalNotifications.addListener(
      'localNotificationActionPerformed',
      n => {
        if (n.actionId === 'DOWNLOAD_NEW_VERSION')
          openURL(
            `https://github.com/${packageJson.author}/${packageJson.name}`
          )
      }
    )
    LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'NEW_VERSION',
          actions: [{ id: 'DOWNLOAD_NEW_VERSION', title: 'Download' }]
        }
      ]
    })
  })

  onUnmounted(() => {
    versionNotifHandle.remove()
  })

  return checkForUpdate
}

class GithubResponse {
  public tag_name!: string
}
