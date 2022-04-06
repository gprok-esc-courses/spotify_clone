"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.views.generic.base import TemplateView

import tracks.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("tracks.urls")),
    path('accounts/', include('django.contrib.auth.urls')),
    path('test/add/album', tracks.views.add_album),
    path('test/api/add/album', tracks.views.api_add_album),
    path('test/api/cover/<int:id>', tracks.views.cover),
    path('test/song/<int:id>', tracks.views.song),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    # path('api/login', tracks.views.login),
    # path('api/search', tracks.views.search),
    # path('api/home', tracks.views.login),
    # path('api/song/{id}', tracks.views.login),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
