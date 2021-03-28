# -*- coding: utf-8 -*-
# Copyright (c) 2021, Patrner Team and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc

class RentRequest(Document):
	def validate(self):
		frappe.msgprint("Hi")
	def get_feed(self):
		pass

@frappe.whitelist()
def make_request_for_rent_contract(source_name, target_doc=None):
	# doc = frappe.get_doc(dt, dn)
	# rc = frappe.new_doc("Rent Contract")
	# rc.rent_request = doc
	# #frappe.msgprint("Hi=={0}".format(doc.requster_name))
	# return rc

	mapped = get_mapped_doc("Rent Request", source_name, {
		"Rent Request": {
			"doctype": "Rent Contract",			
		}
	}, target_doc)
	#frappe.msgprint(mapped)
	return mapped
