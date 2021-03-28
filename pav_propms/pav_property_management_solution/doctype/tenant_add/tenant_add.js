// Copyright (c) 2021, Patrner Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tenant Add', {
	// refresh: function(frm) {

	// }

	refresh: function(frm) {
		frm.events.make_custom_buttons(frm);
	},

	make_custom_buttons: function(frm) {
		if (frm.doc.status != 'Open'){
			frm.add_custom_button(__("Property Delivery Order"),
			() => frm.events.make_transaction(frm
				,'pav_propms.pav_property_management_solution.doctype.tenant_add.tenant_add.make_request_for_property_delivery')
				, __('Create'));
		}
	},

	make_transaction: function (frm,method_path='') {
		return frappe.call({
			method: method_path,
			args: {
				"dt": frm.doc.doctype,
				"dn": frm.doc.name
			},
			callback: function (r) {
				console.log(r);
				var doclist = frappe.model.sync(r.message);
				frappe.set_route("Form", doclist[0].doctype, doclist[0].name);
				
			}
		}); 
	},

});