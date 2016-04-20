from __future__ import unicode_literals
from django.db import models
from django.db.models.signals import pre_delete, post_save
from django.dispatch.dispatcher import receiver
from tables.data import xlsx_to_json
from django.core.files.base import ContentFile
import ftp_manager
import json
import logging
from datetime import datetime


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, datetime):
        # time is not set, convert date
        if obj.hour == 0 and obj.minute == 0 and obj.second == 0:
            serial = obj.strftime('%b %d, %Y')
        else:
            serial = obj.strftime('%b %d, %Y %H:%M:%S')
        return serial

    raise TypeError("Type not serializable")


class TableViz(models.Model):
    def __unicode__(self):
        return "%s" % self.file.name

    title = models.TextField(default=None, blank=True, null=True)
    chatter = models.TextField(default=None, blank=True, null=True)
    source = models.TextField(default=None, blank=True, null=True)
    file = models.FileField(upload_to='documents')
    json = models.FileField(upload_to='documents', default=None, blank=True, null=True)
    published = models.BooleanField(default=False, blank=False, null=False)


# Receive the pre_delete signal and delete the file associated with the model instance.
@receiver(pre_delete, sender=TableViz)
def document_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.file.delete(False)
    instance.json.delete(False)
    # remove published files
    if instance.published:
        file_name = '%s.json' % instance.id
        ftp_manager.delete(file_name)


@receiver(post_save, sender=TableViz)
def create_json(sender, instance, **kwargs):
    if instance.json.name is None:
        try:
            json_filename = instance.file.path[instance.file.path.rindex('/') + 1:instance.file.path.rindex('.')] + '.json'
            contents = xlsx_to_json.convert(instance.file.path, compress=True)
            instance.json.save(json_filename, ContentFile(json.dumps(contents, default=json_serial)))
        except Exception as e:
            instance.delete()
            logging.error(e.message)
            pass
