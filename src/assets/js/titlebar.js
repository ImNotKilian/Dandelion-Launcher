const { remote, ipcRenderer: ipc } = require( 'electron' );
const mainWindow = remote.getCurrentWindow();

document.getElementById( 'btn-minimize' ).addEventListener( 'click', function() {
    mainWindow.minimize();
});
    
document.getElementById( 'btn-maximize' ).addEventListener( 'click', function() {
    if ( !mainWindow.isMaximized() ) {
        mainWindow.maximize();
    } else {
        mainWindow.unmaximize();
    }
} );

document.getElementById( 'btn-refresh' ).addEventListener( 'click', function() {
    ipc.send('view-reload');
} );
        
document.getElementById( 'btn-close' ).addEventListener( 'click', function() {
    ipc.send('app-close')
} );