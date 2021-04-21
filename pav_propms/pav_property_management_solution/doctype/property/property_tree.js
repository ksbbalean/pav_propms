frappe.provide("frappe.treeview_settings");

frappe.treeview_settings['Property'] = {
	get_tree_nodes: "pav_propms.pav_property_management_solution.doctype.property.property.get_children",
	add_tree_node:  "pav_propms.pav_property_management_solution.doctype.property.property.add_node",
	filters: [
		{
			fieldname: "projects",
			fieldtype:"Link",
			options: "Project",
			label: __("Project"),
		},
		{
			fieldname: "property",
			fieldtype:"Link",
			options: "Property",
			label: __("Property"),
			get_query: function() {
				var me = frappe.treeview_settings['Property'];
				var project = me.page.fields_dict.projects.get_value();
				var args = [["Property", 'is_group', '=', 1]];
				if(project){
					args.push(["Property", 'projects', "=", project]);
				}
				return {
					filters: args
				};
			}
		}
	],
	breadcrumb: "Projects",
	get_tree_root: false,
	root_label: "All Property",
	ignore_fields: ["parent_property"],
	onload: function(me) {
		frappe.treeview_settings['Property'].page = {};
		$.extend(frappe.treeview_settings['Property'].page, me.page);
		me.make_tree();
	},
	toolbar: [
		{
			label:__("Add Multiple"),
			condition: function(node) {
				return node.expandable;
			},
			click: function(node) {
				this.data = [];
				const dialog = new frappe.ui.Dialog({
					title: __("Add Multiple Property"),
					fields: [
						{
							fieldname: "multiple_property", fieldtype: "Table",
							in_place_edit: true, data: this.data,
							get_data: () => {
								return this.data;
							},
							fields: [{
								fieldtype:'Data',
								fieldname:"name",
								in_list_view: 1,
								reqd: 1,
								label: __("Property")
							}]
						},
					],
					primary_action: function() {
						dialog.hide();
						return frappe.call({
							method: "pav_propms.pav_property_management_solution.doctype.property.property.add_multiple_property",
							args: {
								data: dialog.get_values()["multiple_property"],
								parent: node.data.value
							},
							callback: function() { }
						});
					},
					primary_action_label: __('Create')
				});
				dialog.show();
			}
		}
	],
	extend_toolbar: true
};