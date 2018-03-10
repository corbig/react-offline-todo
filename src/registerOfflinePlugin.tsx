import * as React from 'react';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Button from 'material-ui/Button';
import * as ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';

const reloadWindow = () => window.location.reload();

const renderSnackBarUpdate = () => {

  const buttonSnackBar = (<Button color="secondary" onClick={reloadWindow}>Update</Button>);

  const snackBar = (
    <Snackbar
      open={true}
      message={<span>An update is Available</span>}
      action={buttonSnackBar}
    />
  );

  ReactDOM.render(snackBar, document.getElementById('reload-snack') as HTMLElement);

};

export default function registerOfflinePlugin() {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
      onUpdateReady: () => {
        // Tells to new cache/SW to take control immediately
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: () => {
        // Display the reload snack-bar
        renderSnackBarUpdate();
      }
    });
  }
}