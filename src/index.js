// Libraries
const { app, BrowserWindow, BrowserView, ipcMain } = require( 'electron' );
const ejs = require('ejs-electron');
const path = require('path');

// Objects
let mainWindow;
let view;

// Config
const windowSize = { width: 1280, height: 768 };
const title = "Dandelion";

// App events
app.on('ready', function() {
	mainWindow = new BrowserWindow({
        width: windowSize.width,
        height: windowSize.height,
        minWidth: 800,
        minHeight: 600,
	    icon: path.join(__dirname, 'assets/img/logo.png'),
	    modal: true, 
        frame: false, 
        center: true, 
        resizable: true, 
        title: title,
	    backgroundColor: '#111',
	    webPreferences: {
	      	nodeIntegration: true
	    }
  	});

  	view = new BrowserView( {
        webPreferences: {
            nodeIntegration: true
        }
    } );

  	mainWindow.setBrowserView( view );
  	view.setBounds( { x: 1, y: 29, width: windowSize.width - 2, height: windowSize.height - 30 } );

  	mainWindow.loadFile(path.join(__dirname, 'views', 'titlebar.ejs'));
    view.webContents.loadURL(path.join(__dirname, 'views', 'main.ejs'))
      
    // mainWindowwebContents.openDevTools()
  	view.webContents.openDevTools();

  	// Main Window Events
  	mainWindow.on( 'closed', function () {
        mainWindow = null;
    });

    mainWindow.on( 'resize', function() {
        const windowSize = mainWindow.getSize();

        if ( mainWindow.isMaximized() ) {
            view.setBounds( { x: 1, y: 29, width: windowSize[0]-2, height: windowSize[1]-45 } );
        } else {
            view.setBounds( { x: 1, y: 29, width: windowSize[0]-2, height: windowSize[1]-30 } );
        }
    } );


    // View Events
    view.webContents.on( 'did-navigate-in-page', function() {
        view.webContents.insertCSS( `
            /* width */
            ::-webkit-scrollbar {
                width: 8px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                background: #232323;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #666;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
        ` );
    } );
});

app.on('window-all-closed', function () {
 	app.quit();
});

// IPC Events
ipcMain.on('app-close', function() {
    console.log("Clossing dandelion application")
    app.exit();
});

ipcMain.on('view-reload', function() {
	view.webContents.reload();
});

ipcMain.on('view-home', function() {
	view.webContents.loadURL( webUrl );
});

ipcMain.on('view-back', function() {
	view.webContents.executeJavaScript('history.go(-1);');
});

ipcMain.on('view-next', function() {
	view.webContents.executeJavaScript('history.go(1);');
});