"""application URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from rest_framework.routers import DefaultRouter
from core.views import UserViewSet, react
from rest_framework.authtoken import views
from events.views import EventViewSet
from likes.views import LikeViewSet
from posts.views import PostViewSet
from subscriptions.views import SubscriptionViewSet

router = DefaultRouter()
router.register('posts', PostViewSet)
router.register('users', UserViewSet)
router.register('events', EventViewSet)
router.register('subscriptions', SubscriptionViewSet)
router.register('likes', LikeViewSet)
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/token-auth/', views.obtain_auth_token),
    url(r'^social/', include('social_django.urls', namespace='social')),
    url(r'^$',react, name='react'),
    url(r'^search/', include('haystack.urls')),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls))
    ]
