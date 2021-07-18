const Main = imports.ui.main
const PanelMenu = imports.ui.panelMenu
const PopupMenu = imports.ui.popupMenu
const St = imports.gi.St
const Lang = imports.lang
const Meta = imports.gi.Meta
const Shell = imports.gi.Shell
const Util = imports.misc.util

function _aboutThisDistro() {
	Util.spawn(['gnome-control-center', 'info-overview'])
}

function _systemPreferences() {
	Util.spawn(['gnome-control-center'])
}

function _appStore() {
	Util.spawn(['io.elementary.appcenter'])
}

function _missionControl() {
	Main.overview.toggle();
}

function _forceQuit() {
	Util.spawn(['xkill'])
}

function _sleep() {
	Util.spawn(['systemctl', 'suspend'])
}

function _restart() {
	Util.spawn(['systemctl', 'reboot'])
}

function _shutdown() {
	Util.spawn(['systemctl', 'poweroff', '-prompt'])
}

function _lockScreen() {
	Util.spawn(['xdg-screensaver lock'])
}

function _logOut() {
	Util.spawn(['gnome-session-quit'])
}



// function _hover() {
// 	button.remove_actor(icon)

// 	const icon_hover = new St.Icon({
// 		style_class: 'menu-button-hover'
// 	})
	
// 	button.add_actor(icon_hover)
// }


const MenuButton = new Lang.Class({
    Name: "MenuButton",
    Extends: PanelMenu.Button,

    _init: function () {
        this.parent(null, "MenuButton")

        // Icon
        this.icon = new St.Icon({
            style_class: 'menu-button'
        })
        this.add_actor(this.icon)

        // Menu
	this.item1 = new PopupMenu.PopupMenuItem('About This Distro')
	this.item2 = new PopupMenu.PopupSeparatorMenuItem()
	this.item3 = new PopupMenu.PopupMenuItem('System Preferences...')
	this.item4 = new PopupMenu.PopupMenuItem('App Store...')
	this.item5 = new PopupMenu.PopupSeparatorMenuItem()
	this.item6 = new PopupMenu.PopupMenuItem('Active Items')
	this.item6.add_child( new St.Label({ text : '                                        >'}) );
	this.item7 = new PopupMenu.PopupSeparatorMenuItem()
	this.item8 = new PopupMenu.PopupMenuItem('Force Quit App')
	this.item8.add_child( new St.Label({ text : '                       ⌥⇧⌘⎋'}) );
	this.item9 = new PopupMenu.PopupSeparatorMenuItem()
	this.item10 = new PopupMenu.PopupMenuItem('Sleep')
	this.item11 = new PopupMenu.PopupMenuItem('Restart...')
	this.item12 = new PopupMenu.PopupMenuItem('Shut Down...')
	this.item13 = new PopupMenu.PopupSeparatorMenuItem()
	this.item14 = new PopupMenu.PopupMenuItem('Lock Screen')
	this.item14.add_child( new St.Label({ text : '                                ⌃⌘Q'}) );
	this.item15 = new PopupMenu.PopupMenuItem('Log Out Gnome...')
	this.item15.add_child( new St.Label({ text : '             ⇧⌘Q'}) );
					
	this.item1.connect('activate', Lang.bind(this, _aboutThisDistro))
	this.item3.connect('activate', Lang.bind(this, _systemPreferences))
	this.item4.connect('activate', Lang.bind(this, _appStore))
	this.item6.connect('activate', Lang.bind(this, _missionControl))
	this.item8.connect('activate', Lang.bind(this, _forceQuit))
	this.item10.connect('activate', Lang.bind(this, _sleep))
	this.item11.connect('activate', Lang.bind(this, _restart))
	this.item12.connect('activate', Lang.bind(this, _shutdown))
	this.item14.connect('activate', Lang.bind(this, _lockScreen))
	this.item15.connect('activate', Lang.bind(this, _logOut))
			
	this.menu.addMenuItem(this.item1)
	this.menu.addMenuItem(this.item2)
	this.menu.addMenuItem(this.item3)
	this.menu.addMenuItem(this.item4)
	this.menu.addMenuItem(this.item5)
	this.menu.addMenuItem(this.item6)
	this.menu.addMenuItem(this.item7)
	this.menu.addMenuItem(this.item8)
	this.menu.addMenuItem(this.item9)
	this.menu.addMenuItem(this.item10)
	this.menu.addMenuItem(this.item11)
	this.menu.addMenuItem(this.item12)
	this.menu.addMenuItem(this.item13)
	this.menu.addMenuItem(this.item14)
	this.menu.addMenuItem(this.item15)

		}
})

function init() {
}
 
function enable() {
	const activitiesButton = Main.panel.statusArea['activities']
	if (activitiesButton) {
		activitiesButton.container.hide()
	}

	let indicator = new MenuButton()
	Main.panel.addToStatusArea('menuButton', indicator, 0, 'left')

	// hide
	Main.panel.statusArea['menuButton'].visible = false

	// change icon
	//Main.panel.statusArea['menuButton'].icon.icon_name = "appointment-soon-symbolic"

	// show
	Main.panel.statusArea['menuButton'].visible = true
}
 
function disable() {
	const activitiesButton = Main.panel.statusArea['activities']
	if (activitiesButton) {
		activitiesButton.container.show()
	}

	Main.panel.statusArea['menuButton'].destroy()
}
