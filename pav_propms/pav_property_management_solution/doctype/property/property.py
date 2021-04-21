# -*- coding: utf-8 -*-
# Copyright (c) 2019, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt


import json

import frappe
from frappe import _, throw
from frappe.utils import add_days, cstr, date_diff, get_link_to_form, getdate
from frappe.utils.nestedset import NestedSet
from frappe.desk.form.assign_to import close_all_assignments, clear
from frappe.utils import date_diff

class CircularReferenceError(frappe.ValidationError): pass
class EndDateCannotBeGreaterThanProjectEndDateError(frappe.ValidationError): pass

class Property(NestedSet):
	nsm_parent_field = 'parent_property'


 
@frappe.whitelist()
def get_children(doctype, parent, property=None, projects=None, is_root=False):

	filters = [['docstatus', '<', '2']]

	if property:
		filters.append(['parent_property', '=', property])
	elif parent and not is_root:
		# via expand child
		filters.append(['parent_property', '=', parent])
	else:
		filters.append(['ifnull(`parent_property`, "")', '=', ''])

	if projects:
		filters.append(['projects', '=', projects])

	activities = frappe.get_list(doctype, fields=[
		'name as value',
		'property_code as title',
		'is_group as expandable'
	], filters=filters, order_by='name')

	# return activities
	return activities

@frappe.whitelist()
def add_node():
	from frappe.desk.treeview import make_tree_args
	args = frappe.form_dict
	args.update({
		"name_field": "property_code"
	})
	args = make_tree_args(**args)

	if args.parent_property == 'All Property' or args.parent_property == args.projects:
		args.parent_property = None

	frappe.get_doc(args).insert()

@frappe.whitelist()
def add_multiple_property(data, parent):
	data = json.loads(data)
	new_doc = {'doctype': 'Property', 'parent_property': parent if parent!="All Property" else ""}
	new_doc['projects'] = frappe.db.get_value('Property', {"name": parent}, 'projects') or ""
	new_doc['company'] = frappe.db.get_value('Property', {"name": parent}, 'company') or ""
	new_doc['cost_center'] = frappe.db.get_value('Property', {"name": parent}, 'cost_center') or ""

	for d in data:
		if not d.get("name"): continue
		new_doc['name'] = d.get("name")
		new_property = frappe.get_doc(new_doc)
		new_property.insert()

