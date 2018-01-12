import * as OfflinePluginRuntime from 'offline-plugin/runtime';

export default function registerOfflinePlugin() {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install();
  }
}