const { BrowserWindow, app } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        // width: 800,
        // height: 600,
        // frame:false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.maximize()
    win.show()
    win.loadURL('http://localhost:3000')
}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})