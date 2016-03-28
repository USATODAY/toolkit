from openpyxl import load_workbook
import json
import os.path


def convert(path, filters=None, export_path=None, compress=False):
    if not os.path.isfile(path):
        raise Exception('unable to find file at %s' % path)
    data = extract_data(path)
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


def extract_data(file_path):
    data = []
    column_headers = {}
    wb = load_workbook(filename=file_path)
    ws = wb.active
    for row in range(1, ws.max_row + 1):
        row_data = {}
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
