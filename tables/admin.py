# Register your models here.
from django.contrib import admin
from models import TableViz
from django.core.urlresolvers import reverse
from django.core.signing import Signer

signer = Signer()


@admin.register(TableViz)
class VizAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'file', 'edit_link', 'prod_link')

    def prod_link(self, table):
        if table.published:
            link = 'http://www.gannett-cdn.com/experiments/usatoday/responsive/data-tables/?id=%s' % table.id
            return '<a href="%s">%s</a>' % (link, 'Prod')
        else:
            return ''

    def edit_link(self, table):
        token = signer.sign(table.id)
        link = '%s/edit/%s' % (reverse('editor'), token)
        return '<a href="%s">%s</a>' % (link, 'Edit')

    edit_link.allow_tags = True
    prod_link.allow_tags = True
#     TODO add edit link
#   TODO add live link if published



