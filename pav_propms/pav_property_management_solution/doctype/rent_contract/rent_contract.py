# -*- coding: utf-8 -*-
# Copyright (c) 2021, Patrner Team and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RentContract(Document):
	pass

@frappe.whitelist()
def make_request_for_tenant_add(dt,dn):
	doc = frappe.get_doc(dt, dn)
	rc = frappe.new_doc("Tenant Add")
	rc.rent_request = doc
	return rc
