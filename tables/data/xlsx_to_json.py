from openpyxl import load_workbook
import json
import os.path
import collections
import xlrd
import csv
from openpyxl.workbook import Workbook
from openpyxl.reader.excel import load_workbook, InvalidFileException
#
# def open_xls_as_xlsx(filename):
#     # first open using xlrd
#     book = xlrd.open_workbook(filename)
#     index = 0
#     nrows, ncols = 0, 0
#     while nrows * ncols == 0:
#         sheet = book.sheet_by_index(index)
#         nrows = sheet.nrows
#         ncols = sheet.ncols
#         index += 1
#
#     # prepare a xlsx sheet
#     book1 = Workbook()
#     sheet1 = book1.get_active_sheet()
#
#     for row in xrange(0, nrows):
#         for col in xrange(0, ncols):
#             sheet1.cell(row=row, column=col).value = sheet.cell_value(row, col)
#
#     return book1


def convert(path, filters=None, export_path=None, compress=False):
    if not os.path.isfile(path):
        raise Exception('unable to find file at %s' % path)
    extension = path[path.rfind('.'):]
    if extension == '.xlsx':
        data = extract_data_from_xlsx(path)
    if extension == '.csv':
        data = extract_data_from_csv(path)
    if filters is not None:
        data = filter_data(data, filters)
    if compress:
        data = compress_data(data)
    if export_path:
        export_to_json(data, export_path)
    return data


def compress_data(data):
    compressed_data = {
        'fields': data[0].keys(),
        'values': []
    }
    for item in data:
        compressed_data['values'].append(item.values())
    return compressed_data


def filter_data(data_rows, filters):
    filtered_data = []
    try:
        for row in data_rows:
            filtered_data_row = {}
            for filter in filters:
                data_field = None
                data_val = None
                # default field is the column name
                if 'column' in filter:
                    data_field = filter['column']
                # override data field with name in filters
                if 'name' in filter:
                    data_field = filter['name']
                # extract value from row
                if 'column' in filter and filter['column'] in row:
                    data_val = row[filter['column']]
                if 'combine' in filter:
                    data_val = filter['combine'](row)
                if data_val is not None and 'clean' in filter:
                    data_val = filter['clean'](data_val)
                if data_field is None:
                    raise Exception('Unable to set data fieldin row = %s' % row)
                if data_val is None:
                    raise Exception('Unable to set data value in row = %s' % row)
                if data_field is not None and data_val is not None:
                    filtered_data_row[data_field] = data_val
            filtered_data.append(filtered_data_row)
    except Exception, e:
        print 'ERROR: failed due to %s' % e
        pass
    return filtered_data


def extract_data_from_csv(file_path):
    data = []
    column_headers = {}
    csv_file = open(file_path)
    csv_file_reader = csv.reader(csv_file)
    for row_idx, row in enumerate(csv_file_reader):
        row_data = {}
        for column, cell_val in enumerate(row):
            # populate column headers
            if row_idx == 0:
                column_headers[column] = cell_val
            # populate data
            else:
                row_data[column_headers[column]] = cell_val
        if row_idx != 0:
            data.append(row_data)
    return data


def extract_data_from_xlsx(file_path):
    data = []
    column_headers = {}
    wb = load_workbook(filename=file_path)
    ws = wb.active
    for row in range(1, ws.max_row + 1):
        row_data = collections.OrderedDict()
        for column in range(1, ws.max_column + 1):
            cell_val = ws.cell(row=row, column=column).value
            # populate column headers
            if row == 1:
                column_headers[column] = cell_val
            # populate data
            else:
                row_data[column_headers[column]] = cell_val
        if row != 1:
            data.append(row_data)
    return data


def export_to_json(data, filename='data.json'):
    if data is not None:
        with open(filename, 'w') as outfile:
            json.dump(data, outfile)
