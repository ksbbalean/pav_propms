# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	config = [
		{
			"label": _("PAV Property Management Solution"),
			"items": [
				{
					"type": "doctype",
					"name": "Property",
					"description": _("Property that needs to be managed."),
				},
				{
					"type": "doctype",
					"name": "Rent Request",
				},
				{
					"type": "doctype",
					"name": "Rent Contract",
				},
				{
					"type": "doctype",
					"name": "Tenant Add",
				},
				{
					"type": "doctype",
					"name": "Property Delivery Order",
				},
                {
					"type": "doctype",
					"name": "Rent Warning",
				},	
                {
					"type": "doctype",
					"name": "Property Evacuate",
				},
                {
					"type": "doctype",
					"name": "Receipt Note",
				},
                {
					"type": "doctype",
					"name": "Property Assets",
				},
                {
					"type": "doctype",
					"name": "Property Contents",
				},
			]
		},
		{
			"label": _("Services"),
			"icon": "fa fa-cog",
			"items": [
				{
					"type": "doctype",
					"name": "Assigning Maintenance",
				},
				{
					"type": "doctype",
					"name": "Electricity Invoice",
				},
				{
					"type": "doctype",
					"name": "Residents Complaints",
				},
				{
					"type": "doctype",
					"name": "Technical Services Report",
				},				
			]
		},
		{
			"label": _("Property Settings"),
			"items": [
				{
					"type": "doctype",
					"name": "Meter Readings",
				},
                {
					"type": "doctype",
					"name": "Meter Readings",
				},
			]
		}
	]
	return config
