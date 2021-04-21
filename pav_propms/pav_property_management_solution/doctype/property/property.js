// Copyright (c) 2018, Aakvatech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {
	refresh: function(frm) {

	},
	setup: function(frm) {
		frm.set_query("cost_center", function() {
			return {
				"filters": {
                    "company": frm.doc.company,
				},
			};
		});

		frm.set_query("parent_property", function() {
			return {
				"filters": {
                    "is_group": 1,
				},
			};
		});
	},
	company: function(frm) {
		frm.set_value("cost_center", "");
	},
});


