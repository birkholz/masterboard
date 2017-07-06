from django.conf.urls import include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from django.views.static import serve

from mb_example import views

admin.autodiscover()

urlpatterns = [
    url(r'^players.json$', views.get_players, name='players'),
    url(r'^scores.json$', views.get_scores, name='scores'),
    url(r'^$', TemplateView.as_view(template_name='example.html'), name="example"),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),

]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
