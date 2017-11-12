import * as OfflinePluginRuntime from 'offline-plugin/runtime';

export default function registerOfflinePlugin() {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
      onUpdateReady: () => {
        // Tells to new SW / Cache to take control immediately
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: () => {
        // Reload the webpage to load into the new version
        window.location.reload();
      }
    });
  }
}