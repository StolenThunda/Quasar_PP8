export default {
  // ...

  methods: {
    minimize () {
      if ( process.env.MODE === 'electron' ) {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
        console.log("mini")
      }
    },
    
    maximize () {
      if ( process.env.MODE === 'electron' ) {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()
        console.log("max")
        
        if ( win.isMaximized() ) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },
    
    closeApp () {
      if ( process.env.MODE === 'electron' ) {
        console.log("closing")
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}