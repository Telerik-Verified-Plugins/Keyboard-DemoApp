(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    window.addEventListener("native.keyboardshow", function (e) {
        document.getElementById("feedback").value = "Keyboard height is " + e.keyboardHeight + ' px';
	});

    window.addEventListener("native.keyboardhide", function (e) {
        document.getElementById("feedback").value = "Keyboard closed";
	});

    DemoViewModel = kendo.data.ObservableObject.extend({

        hideKeyboardAccessoryBar: function () {
            if (!this.checkSimulator()) {
	            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
        },

        showKeyboardAccessoryBar: function () {
            if (!this.checkSimulator()) {
	            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            }
        },

        disableScroll: function () {
            if (!this.checkSimulator()) {
	            cordova.plugins.Keyboard.disableScroll (true);
            }
        },

        enableScroll : function () {
            if (!this.checkSimulator()) {
	            cordova.plugins.Keyboard.disableScroll(false);
            }
        },

        closeKeyboard: function () {
            if (!this.checkSimulator()) {
	            cordova.plugins.Keyboard.close();
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (cordova.plugins.Keyboard === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function(msg) {
            console.log('Succes callback: ' + msg);
        },

        onError: function(msg) {
            alert('Error callback: ' + msg);
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);