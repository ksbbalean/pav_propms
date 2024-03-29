// Copyright (c) 2021, Patrner Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Rent Request', {
	// refresh: function(frm) {

	// }

	refresh: function(frm) {
		frm.events.make_custom_buttons(frm);
	},

	make_custom_buttons: function(frm) {
		// if (frm.doc.status != 'Open'){
		// 	frm.add_custom_button(__("Rent Contract"),
		// 	() => frm.events.make_transaction(frm
		// 		,'pav_propms.pav_property_management_solution.doctype.rent_request.rent_request.make_request_for_rent_contract')
		// 		, __('Create'));
		// }

		frm.add_custom_button(__("Rent Contract"), function () {
			frappe.model.open_mapped_doc({
				method: "pav_propms.pav_property_management_solution.doctype.rent_request.rent_request.make_request_for_rent_contract",
				frm: frm
			});
		},__('Create'));
		frm.page.set_inner_btn_group_as_primary(__('Create'));
	},

	make_transaction: function (frm,method_path='') {
		return frappe.call({
			method: method_path,
			args: {
				"target_doc": frm.doc.doctype,
				"source_name": frm.doc.name
			},
			callback: function (r) {
				console.log(r);
				var doclist = frappe.model.sync(r.message);
				frappe.set_route("Form", doclist[0].doctype, doclist[0].name);				
			}
		}); 
	},

});
