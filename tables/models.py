from __future__ import unicode_literals
from django.db import models
from django.db.models.signals import pre_delete, post_save
from django.dispatch.dispatcher import receiver
from tables.data import xlsx_to_json
from django.core.files.base import ContentFile
import json


class Viz(models.Model):
    def __unicode__(self):
        return "%s" % self.file.name

    title = models.TextField(default=None, blank=True, null=True)
    chatter = models.TextField(default=None, blank=True, null=True)
    source = models.TextField(default=None, blank=True, null=True)
    file = models.FileField(upload_to='documents')
    json = models.FileField(upload_to='documents', default=None, blank=True, null=True)



# Receive the pre_delete signal and delete the file associated with the model instance.
@receiver(pre_delete, sender=Viz)
def document_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.file.delete(False)
    instance.json.delete(False)


@receiver(post_save, sender=Viz)
def create_json(sender, instance, **kwargs):
    if instance.json.name is None:
        json_filename = instance.file.path[instance.file.path.rindex('/') + 1:instance.file.path.rindex('.')] + '.json'
        contents = xlsx_to_json.convert(instance.file.path, compress=True)
        instance.json.save(json_filename, ContentFile(json.dumps(contents)))
