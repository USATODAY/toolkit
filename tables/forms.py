from django import forms
from django.core.exceptions import ValidationError
import os


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.xls', '.csv', '.xlsx']
    if ext not in valid_extensions:
        raise ValidationError(u'File type "%s" is not supported' % ext)


class DocumentForm(forms.Form):
    file = forms.FileField(
        label='Select a file',
        help_text='max. 42 megabytes',
        validators=[validate_file_extension]
    )
