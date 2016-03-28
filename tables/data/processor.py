from django.conf import settings
import xlsx_to_json
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#
# states = {
#     'Arizona': 'AZ',
#     'Alabama': 'AL',
#     'Alaska': 'AK',
#     'Arkansas': 'AR',
#     'California': 'CA',
#     'Colorado': 'CO',
#     'Connecticut': 'CT',
#     'Delaware': 'DE',
#     'Florida': 'FL',
#     'Georgia': 'GA',
#     'Hawaii': 'HI',
#     'Idaho': 'ID',
#     'Illinois': 'IL',
#     'Indiana': 'IN',
#     'Iowa': 'IA',
#     'Kansas': 'KS',
#     'Kentucky': 'KY',
#     'Louisiana': 'LA',
#     'Maine': 'ME',
#     'Maryland': 'MD',
#     'Massachusetts': 'MA',
#     'Michigan': 'MI',
#     'Minnesota': 'MN',
#     'Mississippi': 'MS',
#     'Missouri': 'MO',
#     'Montana': 'MT',
#     'Nebraska': 'NE',
#     'Nevada': 'NV',
#     'New Hampshire': 'NH',
#     'New Jersey': 'NJ',
#     'New Mexico': 'NM',
#     'New York': 'NY',
#     'North Carolina': 'NC',
#     'North Dakota': 'ND',
#     'Ohio': 'OH',
#     'Oklahoma': 'OK',
#     'Oregon': 'OR',
#     'Pennsylvania': 'PA',
#     'Rhode Island': 'RI',
#     'South Carolina': 'SC',
#     'South Dakota': 'SD',
#     'Tennessee': 'TN',
#     'Texas': 'TX',
#     'Utah': 'UT',
#     'Vermont': 'VT',
#     'Virginia': 'VA',
#     'Washington': 'WA',
#     'West Virginia': 'WV',
#     'Wisconsin': 'WI',
#     'Wyoming': 'WY',
# }
#
#
# def clean_state(d):
#     if d in states:
#         return states[d].lower()
#     else:
#         logging.error('unable to clean state=%s' % d)
#     return d
#
#
# def clean_name(d):
#     return d.title()
#
#
# def sample(row):
#     if row['Total exceedances'] > 1:
#         return [row['Minimum Lead (in ppb)'], row['Maximum Lead (in ppb)']]
#     else:
#         return [row['Minimum Lead (in ppb)']]
#
#
# filters = [
#     {
#
#         'column': 'PWS Name',
#         'name': 'name',
#         'clean': clean_name
#     },
#     {
#         'column': 'Counties Served',
#         'name': 'county'
#     },
#     {
#         'column': 'Total exceedances',
#         'name': 'exceedances'
#     },
#     {
#         'column': 'STATE',
#         'name': 'state',
#         'clean': clean_state
#     },
#     {
#         'combine': sample,
#         'name': 'sample'
#     }
# ]
#
# xlsx_to_json.convert('EPA_lead_interactive_03222016.xlsx', filters, export_path='data.json', compress=True)
#
# print 'All Done!'
import_path = BASE_DIR + '/static/data/sample.xlsx'
export_path = BASE_DIR + '/static/data/sample.json'

xlsx_to_json.convert(import_path, export_path=export_path, compress=True)
