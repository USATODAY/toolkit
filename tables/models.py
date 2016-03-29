from __future__ import unicode_literals
from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver


class Document(models.Model):
    def __unicode__(self):
        return self.file.name

    file = models.FileField(upload_to='documents')


# Receive the pre_delete signal and delete the file associated with the model instance.
@receiver(pre_delete, sender=Document)
def document_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.file.delete(False)
