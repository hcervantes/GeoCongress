/*
 * File: app/model/Vote.js
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

Ext.define('GeoCon.model.Vote', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'bill_id',
                type: 'string'
            },
            {
                name: 'chamber',
                type: 'string'
            },
            {
                name: 'how',
                type: 'string'
            },
            {
                name: 'number',
                type: 'float'
            },
            {
                name: 'passage_type',
                type: 'string'
            },
            {
                name: 'question',
                type: 'string'
            },
            {
                name: 'required',
                type: 'string'
            },
            {
                name: 'result',
                type: 'string'
            },
            {
                name: 'roll_id',
                type: 'string'
            },
            {
                name: 'roll_type',
                type: 'string'
            },
            {
                name: 'session',
                type: 'float'
            },
            {
                name: 'vote_breakdown',
                type: 'object'
            },
            {
                name: 'vote_type',
                type: 'string'
            },
            {
                name: 'voted_at',
                type: 'date'
            },
            {
                convert: function(v, rec) {
                    return Ext.Date.format(rec.data.voted_at, 'F j, Y');
                },
                name: 'voted_at_str',
                type: 'string'
            },
            {
                name: 'voter_ids',
                type: 'object'
            },
            {
                name: 'year',
                type: 'float'
            }
        ]
    }
});