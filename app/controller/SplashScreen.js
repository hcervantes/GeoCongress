/*
 * File: app/controller/SplashScreen.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('GeoCon.controller.SplashScreen', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            "#selectState": {
                change: 'onStateChange'
            },
            "#lookupBtn": {
                tap: 'onLookupTap'
            },
            "#settingsBtn": {
                tap: 'onSettingsTap'
            }
        }
    },

    onStateChange: function(selectfield, newValue, oldValue, options) {
        if (newValue) {
            this.currentState = newValue;
        }
        if (Ext.getCmp('districtSpinner')) {
            this.updateDistrict();
        }
    },

    onLookupTap: function(button, e, options) {
        this.currentDistrict = Ext.getCmp('districtSpinner').getValue();
        this.loadLegislators();
        this.onSettingsTap();
    },

    onSettingsTap: function(button, e, options) {
        if (!this.hasLocation) {
            this.onLocationError();
            return;
        }
        var splashScreen = Ext.getCmp('splashScreen');

        if (splashScreen.getActiveItem() == Ext.getCmp('settingsForm')) {
            splashScreen.setActiveItem(Ext.getCmp('legislatorList'));
        } else {
            splashScreen.setActiveItem(Ext.getCmp('settingsForm'));
        }
    },

    init: function() {
        this.location = Ext.create('Ext.util.Geolocation', {
            autoUpdate: false,
            listeners: {
                locationupdate: 'onLocationUpdate',
                locationerror: 'onLocationError',
                scope: this
            }
        });
        this.location.updateLocation();
    },

    onLocationUpdate: function() {
        this.hasLocation = true;
        Ext.getStore('Districts').load({
            params: {
                latitude: this.location.getLatitude(),
                longitude: this.location.getLongitude()
            },
            callback: function(records) {
                var district = records && records[0];

                if (district) {
                    var store = Ext.getStore('States'),
                        idx = store.find('abbr', district.data.state),
                        state = store.getAt(idx);

                    this.currentDistrict = district.data.number;

                    if (state) {
                        this.currentState = state;
                        this.loadLegislators();
                        this.updateSettings();
                    }
                }
            },
            scope: this
        });
    },

    onLocationError: function() {
        this.hasLocation = true;
        Ext.getStore('Districts').load({
            params: {
                latitude: 37.381592,
                longitude: -122.135672
            },
            callback: function(records) {
                var district = records && records[0];

                this.onSettingsTap();

                if (district) {
                    var store = Ext.getStore('States'),
                        idx = store.find('abbr', district.data.state),
                        state = store.getAt(idx);

                    this.currentDistrict = district.data.number;

                    if (state) {
                        this.currentState = state;
                        this.loadLegislators();
                        this.updateSettings();
                    }
                }
                Ext.Msg.alert('Geolocation Unavailable', 'Setting your default location to Sencha HQ');
            },
            scope: this
        });
    },

    updateSettings: function() {
        Ext.getCmp('selectState').setValue(this.currentState.data.abbr);
        this.updateDistrict();
    },

    updateDistrict: function() {
        Ext.getCmp('districtSpinner').setMaxValue(this.currentState.data.maxDistrict);
        Ext.getCmp('districtSpinner').setValue(this.currentDistrict || 0);
    },

    loadLegislators: function() {
        var title = this.currentState.data.abbr + ' District ' + this.currentDistrict,
            store = Ext.getStore('Legislators'),
            splashToolbar = Ext.getCmp('splashToolbar');

        // If the current legislators are already loaded, don't re-load
        if (splashToolbar.getTitle() == title) {
            return;
        }

        splashToolbar.setTitle(title);

        // First look up the Representative, then the senators for the state.
        // The current API doesn't support this in a single query
        store.load({
            params: {
                state: this.currentState.data.abbr,
                district: this.currentDistrict
            },
            callback: function() {
                store.load({
                    params: {
                        state: this.currentState.data.abbr,
                        title: 'Sen'
                    },
                    addRecords: true
                });
            },
            scope: this
        });
    }

});