// Copyright (c) 2021, Patrner Team and contributors
// For license information, please see license.txt

frappe.ui.form.on('Rent Contract', {
	onload:function(frm) {
		console.log("Load");

		var v = cur_frm.doc.rent_request;
		cur_frm.set_value("rent_request", "");
		cur_frm.set_value("rent_request", v);
		console.log("last3");

		// frappe.ui.form.on(frm.doctype, "date", function(){
		// 	var v = cur_frm.doc.rent_request;
		// 	cur_frm.set_value("rent_request", "");
		// 	cur_frm.set_value("rent_request", v);
		// 	console.log("last");


		// });
	},

	refresh: function(frm) {
		frm.events.make_custom_buttons(frm);
	},

	make_custom_buttons: function(frm) {
		if (frm.doc.status != 'Open' && frm.doc.docstatus == 0){
			console.log("frm.doc.docstatus  " + frm.doc.docstatus + " frm.doc.status  " + frm.doc.status);
			frm.add_custom_button(__("Add Tenant"),
			() => frm.events.make_transaction(frm
				,'pav_propms.pav_property_management_solution.doctype.rent_contract.rent_contract.make_request_for_tenant_add')
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
